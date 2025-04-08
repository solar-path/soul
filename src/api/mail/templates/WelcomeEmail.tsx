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

interface WelcomeEmailProps {
  email: string;
  appName?: string;
  baseUrl?: string;
  supportEmail?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appName,
  baseUrl,
  supportEmail,
}) => {
  const loginUrl = `${baseUrl}/login`;

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>{appName}</Heading>
          <Section style={styles.section}>
            <Heading as="h2" style={styles.subheading}>
              Welcome to {appName}!
            </Heading>

            <Text style={styles.text}>Dear {appName} customer,</Text>

            <Text style={styles.text}>
              Thanks for verifying your account with {appName}.
            </Text>

            <Text style={styles.text}>
              Welcome to the {appName} family! We're thrilled to have you on
              board and look forward to providing you with an exceptional
              experience.
            </Text>

            <Text style={styles.text}>
              You can now sign in to your account using the button below:
            </Text>

            <Button
              href={loginUrl}
              style={{
                ...styles.button,
                padding: "12px 20px",
              }}
            >
              Sign In to Your Account
            </Button>

            <Text style={styles.text}>
              If the button doesn't work, you can also copy and paste the
              following link into your browser:
            </Text>

            <Text style={styles.link}>
              <Link href={loginUrl} style={styles.link}>
                {loginUrl}
              </Link>
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
    backgroundColor: "#4361EE",
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

export default WelcomeEmail;
