import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {
  renderVerificationEmail,
  renderWelcomeEmail,
  renderPasswordResetEmail,
  renderInviteExistingUserEmail,
  renderInviteNewUserEmail,
  renderContactFormEmail,
} from "./mail.renderer";

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOSTNAME || "localhost",
  port: parseInt(process.env.EMAIL_PORT || "1025"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
} as SMTPTransport.Options);

// Email settings
// Bun automatically loads environment variables from .env files
const EMAIL_USER = process.env.EMAIL_USERNAME || "notify@example.com";
const APP_NAME = process.env.APP_NAME || "Adam";
const BASE_URL = process.env.APP_BASE_URL || "http://localhost:5173";

/**
 * Send an email using nodemailer
 *
 * @param to Recipient email address
 * @param subject Email subject
 * @param html HTML content of the email
 * @returns Promise that resolves when the email is sent
 */
export const sendMail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

/**
 * Send an email to verify the user's address
 *
 * @param email Recipient email address
 * @param token Verification token
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const subject = `Email Verification for ${APP_NAME}`;
    const html = await renderVerificationEmail(email, token, {
      appName: APP_NAME,
      baseUrl: BASE_URL,
      supportEmail: EMAIL_USER,
    });

    await sendMail(email, subject, html);
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
};

/**
 * Send an invitation email to an existing user
 *
 * @param email Recipient email address
 * @param workspaceTitle Title of the workspace
 */
export const sendInviteEmailToExistingNewUser = async (
  email: string,
  workspaceTitle: string
) => {
  try {
    const subject = `Invite to ${APP_NAME}`;
    const html = await renderInviteExistingUserEmail(email, workspaceTitle, {
      appName: APP_NAME,
      baseUrl: BASE_URL,
      supportEmail: EMAIL_USER,
    });

    await sendMail(email, subject, html);
  } catch (error) {
    console.error("Failed to send invitation email to existing user:", error);
  }
};

/**
 * Send an invitation email to a new user
 *
 * @param email Recipient email address
 * @param token Invitation token
 * @param workspaceTitle Title of the workspace
 */
export const sendInviteEmailToNotExistingNewUser = async (
  email: string,
  token: string,
  workspaceTitle: string
) => {
  try {
    const subject = `Invite to ${APP_NAME}`;
    const html = await renderInviteNewUserEmail(email, token, workspaceTitle, {
      appName: APP_NAME,
      baseUrl: BASE_URL,
      supportEmail: EMAIL_USER,
    });

    await sendMail(email, subject, html);
  } catch (error) {
    console.error("Failed to send invitation email to new user:", error);
  }
};

/**
 * Send a welcome email to a new user
 *
 * @param email Recipient email address
 */
export const sendWelcomeEmail = async (email: string) => {
  try {
    const subject = `Welcome to ${APP_NAME}`;
    const html = await renderWelcomeEmail(email, {
      appName: APP_NAME,
      baseUrl: BASE_URL,
      supportEmail: EMAIL_USER,
    });

    await sendMail(email, subject, html);

    // Database update logic can be added here if needed
    // Example:
    // await db.update(userTable)
    //   .set({ verified: true })
    //   .where(eq(userTable.email, email));
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
};

/**
 * Send a password reset email
 *
 * @param email Recipient email address
 * @param token Reset token
 */
export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const subject = `Reset Your Password for ${APP_NAME}`;
    const html = await renderPasswordResetEmail(email, token, {
      appName: APP_NAME,
      baseUrl: BASE_URL,
      supportEmail: EMAIL_USER,
    });

    await sendMail(email, subject, html);

    // Database update logic can be added here if needed
    // Example:
    // await db.update(userTable)
    //   .set({ token: token })
    //   .where(eq(userTable.email, email));
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
};

/**
 * Send a confirmation email for a contact form submission
 *
 * @param email Recipient email address
 * @param name Name of the sender
 * @param message Message from the contact form
 * @returns Promise that resolves when the email is sent
 */
export const sendContactUsFilledFormAcceptanceEmail = async (
  email: string,
  name: string,
  message: string
) => {
  try {
    const subject = `Your Contact Form Submission was received`;
    const html = await renderContactFormEmail(email, name, message, {
      appName: APP_NAME,
      supportEmail: EMAIL_USER,
    });

    return await sendMail(email, subject, html);
  } catch (error) {
    console.error("Failed to send contact form confirmation email:", error);
    throw error;
  }
};
