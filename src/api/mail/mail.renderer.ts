import * as React from "react";
import { renderAsync } from "@react-email/components";
import { 
  VerificationEmail, 
  WelcomeEmail, 
  PasswordResetEmail, 
  InviteExistingUserEmail, 
  InviteNewUserEmail, 
  ContactFormEmail 
} from "./templates";

/**
 * Renders a React Email template to HTML
 * 
 * @param component The React component to render
 * @param props The props to pass to the component
 * @returns Promise resolving to HTML string
 */
export async function renderEmailToHtml<T extends Record<string, unknown>>(
  component: React.ComponentType<T>,
  props: T
): Promise<string> {
  const element = React.createElement(component, props);
  return await renderAsync(element);
}

/**
 * Renders a verification email template to HTML
 * 
 * @param email The recipient email address
 * @param token The verification token
 * @param options Additional options for the email
 * @returns Promise resolving to HTML string
 */
export async function renderVerificationEmail(
  email: string, 
  token: string,
  options?: {
    appName?: string;
    baseUrl?: string;
    supportEmail?: string;
  }
): Promise<string> {
  return renderEmailToHtml(VerificationEmail, {
    email,
    token,
    ...options
  });
}

/**
 * Renders a welcome email template to HTML
 * 
 * @param email The recipient email address
 * @param options Additional options for the email
 * @returns Promise resolving to HTML string
 */
export async function renderWelcomeEmail(
  email: string,
  options?: {
    appName?: string;
    baseUrl?: string;
    supportEmail?: string;
  }
): Promise<string> {
  return renderEmailToHtml(WelcomeEmail, {
    email,
    ...options
  });
}

/**
 * Renders a password reset email template to HTML
 * 
 * @param email The recipient email address
 * @param token The reset token
 * @param options Additional options for the email
 * @returns Promise resolving to HTML string
 */
export async function renderPasswordResetEmail(
  email: string,
  token: string,
  options?: {
    appName?: string;
    baseUrl?: string;
    supportEmail?: string;
  }
): Promise<string> {
  return renderEmailToHtml(PasswordResetEmail, {
    email,
    token,
    ...options
  });
}

/**
 * Renders an invite email template for existing users to HTML
 * 
 * @param email The recipient email address
 * @param workspaceTitle The title of the workspace
 * @param options Additional options for the email
 * @returns Promise resolving to HTML string
 */
export async function renderInviteExistingUserEmail(
  email: string,
  workspaceTitle: string,
  options?: {
    appName?: string;
    baseUrl?: string;
    supportEmail?: string;
  }
): Promise<string> {
  return renderEmailToHtml(InviteExistingUserEmail, {
    email,
    workspaceTitle,
    ...options
  });
}

/**
 * Renders an invite email template for new users to HTML
 * 
 * @param email The recipient email address
 * @param token The invitation token
 * @param workspaceTitle The title of the workspace
 * @param options Additional options for the email
 * @returns Promise resolving to HTML string
 */
export async function renderInviteNewUserEmail(
  email: string,
  token: string,
  workspaceTitle: string,
  options?: {
    appName?: string;
    baseUrl?: string;
    supportEmail?: string;
  }
): Promise<string> {
  return renderEmailToHtml(InviteNewUserEmail, {
    email,
    token,
    workspaceTitle,
    ...options
  });
}

/**
 * Renders a contact form confirmation email template to HTML
 * 
 * @param email The recipient email address
 * @param name The name of the sender
 * @param message The message from the contact form
 * @param options Additional options for the email
 * @returns Promise resolving to HTML string
 */
export async function renderContactFormEmail(
  email: string,
  name: string,
  message: string,
  options?: {
    appName?: string;
    supportEmail?: string;
  }
): Promise<string> {
  return renderEmailToHtml(ContactFormEmail, {
    email,
    name,
    message,
    ...options
  });
}
