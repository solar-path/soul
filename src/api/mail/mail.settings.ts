import nodemailer from "nodemailer";
import { z } from "zod";
import {
  renderVerificationEmail,
  renderWelcomeEmail,
  renderPasswordResetEmail,
  renderInviteExistingUserEmail,
  renderInviteNewUserEmail,
  renderContactFormEmail,
} from "./mail.renderer";

// Define Zod schema for environment variables validation
const EnvSchema = z.object({
  EMAIL_USERNAME: z.string().min(1),
  APP_NAME: z.string().min(1),
  APP_BASE_URL: z.string().min(1),
  EMAIL_HOSTNAME: z.string().min(1),
  EMAIL_PORT: z.coerce.number().min(1),
});

// Parse and validate environment variables
const env = EnvSchema.parse(process.env);

// Email settings from validated environment variables
const EMAIL_USER = env.EMAIL_USERNAME;
const APP_NAME = env.APP_NAME;
const BASE_URL = env.APP_BASE_URL;

// Configure nodemailer to use MailHog for development/testing
// MailHog SMTP server runs on port 1025, web UI on port 8025
const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOSTNAME,
  port: env.EMAIL_PORT,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

// Log that we're using MailHog as our mail server
console.log(
  `Using mail server on ${env.EMAIL_HOSTNAME}:${env.EMAIL_PORT} (Web UI available at http://localhost:8025)`
);

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
    from: `"${APP_NAME}" <${EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${result.messageId}`);
    console.log(`View email in MailHog UI: http://localhost:8025`);
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
    console.log(`Verification email sent to ${email}`);
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
    console.log(`Invitation email sent to existing user: ${email}`);
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
    console.log(`Invitation email sent to new user: ${email}`);
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
    console.log(`Welcome email sent to new user: ${email}`);

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
    console.log(`Password reset email sent to ${email}`);

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

    await sendMail(email, subject, html);
    console.log(`Contact form confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send contact form confirmation email:", error);
    throw error;
  }
};
