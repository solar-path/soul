import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Heading,
  Hr,
  Link,
} from "@react-email/components";

interface PasswordResetEmailProps {
  email: string;
  token: string;
  appName?: string;
  baseUrl?: string;
  supportEmail?: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  email,
  token,
  appName,
  baseUrl,
  supportEmail,
}) => {
  const resetUrl = `${baseUrl}/auth/reset/${token}`;

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>{appName}</Heading>
          <Section style={styles.section}>
            <Heading as="h2" style={styles.subheading}>
              Password Reset Request
            </Heading>

            <Text style={styles.text}>Hello {email},</Text>

            <Text style={styles.text}>
              We received a request to reset your password for your {appName}{" "}
              account. Click the button below to set a new password. This link will expire in 1 hour:
            </Text>

            <Button
              href={resetUrl}
              style={{
                ...styles.button,
                padding: "12px 20px",
              }}
            >
              Reset Password
            </Button>

            <Text style={styles.text}>
              If the button doesn't work, you can also copy and paste the
              following link into your browser:
            </Text>

            <Text style={styles.link}>
              <Link href={resetUrl} style={styles.link}>
                {resetUrl}
              </Link>
            </Text>

            <Text style={styles.text}>
              This link will expire in 1 hour. If you did not request to change
              your password, you can disregard this email.
            </Text>

            <Hr style={styles.hr} />

            <Text style={styles.text}>
              Thank you for choosing {appName}. If you have any questions or
              need assistance, please don't hesitate to contact our support team
              at{" "}
              <Link href={`mailto:${supportEmail}`} style={styles.link}>
                {supportEmail}
              </Link>
              .
            </Text>

            <Text style={styles.text}>Best regards,</Text>
            <Text style={styles.text}>The {appName} Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  },
  container: {
    margin: "0 auto",
    padding: "20px 0",
    maxWidth: "600px",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    padding: "40px",
  },
  heading: {
    color: "#333",
    fontSize: "32px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "30px 0",
  },
  subheading: {
    color: "#333",
    fontSize: "22px",
    fontWeight: "bold",
    margin: "15px 0",
  },
  text: {
    color: "#4c4c4c",
    fontSize: "16px",
    lineHeight: "24px",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: "4px",
    color: "#fff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    width: "100%",
    marginBottom: "20px",
  },
  link: {
    color: "#2563EB",
    textDecoration: "underline",
    wordBreak: "break-all" as const,
  },
  hr: {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  },
};

export default PasswordResetEmail;
