import { sendVerificationEmail } from "./mail.settings";

// Test sending a verification email
async function testMailConfig() {
  console.log("Testing email configuration with MailHog...");

  try {
    // Send a test verification email
    const testEmail = "test@example.com";
    const testToken = "test-verification-token-123";

    await sendVerificationEmail(testEmail, testToken);
    console.log(
      "Test email sent successfully! Check MailHog UI at http://localhost:8025"
    );
  } catch (error) {
    console.error("Failed to send test email:", error);
  }
}

// Run the test
testMailConfig();
