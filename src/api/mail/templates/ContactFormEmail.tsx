import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Link,
} from "@react-email/components";

interface ContactFormEmailProps {
  email: string;
  name: string;
  message: string;
  appName?: string;
  supportEmail?: string;
}

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
  name,
  email,
  message,
  appName = "Adam",
  supportEmail = "notify@aneko.io",
}) => {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>{appName}</Heading>
          <Section style={styles.section}>
            <Heading as="h2" style={styles.subheading}>
              Contact Form Submission
            </Heading>

            <Text style={styles.text}>Dear {name || email},</Text>

            <Text style={styles.text}>
              Thank you for contacting us. We have received your message and
              will respond as soon as possible.
            </Text>

            <Text style={styles.text}>Here's a copy of your message:</Text>

            <Section style={styles.messageBox}>
              <Text style={styles.messageText}>{message}</Text>
            </Section>

            <Text style={styles.text}>
              Please keep this email for your records.
            </Text>

            <Hr style={styles.hr} />

            <Text style={styles.text}>
              If you have any additional information to provide, please reply to
              this email or contact our support team at{" "}
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
  messageBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
    border: "1px solid #e1e1e1",
    padding: "15px",
    marginBottom: "20px",
  },
  messageText: {
    color: "#4c4c4c",
    fontSize: "16px",
    lineHeight: "24px",
    whiteSpace: "pre-wrap" as const,
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#f0f0f0",
    padding: "2px 4px",
    borderRadius: "3px",
    fontSize: "14px",
  },
  link: {
    color: "#2563EB",
    textDecoration: "underline",
  },
  hr: {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  },
};

export default ContactFormEmail;
