import type { Context } from "@/api/utils/context";
import { Hono } from "hono/tiny";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/api/database/database";
import {
  contactUsTable,
  respondToContactUsTable,
} from "@/api/database/schema/contactUs.schema";
import { ApiResponse } from "@/api/utils/types";
import {
  ContactUsResponse,
  contactUsSchema,
  RespondToContactUs,
  trackContactUsSchema,
} from "@/api/routes/contactUs/contactUs.zod";
import { eq } from "drizzle-orm";
import { sendContactUsFilledFormAcceptanceEmail } from "@/api/mail/mail.settings";

export const contactUsRouter = new Hono<Context>()
  .post("/new", zValidator("json", contactUsSchema), async (c) => {
    const { email, message } = c.req.valid("json");

    const inquiryId = crypto.randomUUID();

    const contactUs = await db
      .insert(contactUsTable)
      .values({
        id: inquiryId,
        email,
        message,
      })
      .returning();

    // Send email notification with inquiry ID
    sendContactUsFilledFormAcceptanceEmail(email, email, message, inquiryId);

    return c.json<ApiResponse<ContactUsResponse>>({
      success: true,
      message: `Message ${contactUs[0].id} sent successfully`,
      data: {
        ...contactUs[0],
        response: null,
      },
    });
  })
  .get("/find/:id", zValidator("param", trackContactUsSchema), async (c) => {
    const { id } = c.req.valid("param");

    // First check if the contact form exists
    const [contactForm] = await db
      .select()
      .from(contactUsTable)
      .where(eq(contactUsTable.id, id))
      .limit(1);

    if (!contactForm) {
      return c.json<ApiResponse<RespondToContactUs>>({
        success: false,
        message: "Contact form not found",
        data: null,
      });
    }

    // Get the response if it exists
    const [response] = await db
      .select()
      .from(respondToContactUsTable)
      .where(eq(respondToContactUsTable.contactUsID, id))
      .limit(1);

    // Return the contact form data even if no response exists yet
    return c.json<ApiResponse<RespondToContactUs>>({
      success: true,
      message: response
        ? "Response found"
        : "Contact form found, but no response yet",
      data: response || {
        id: "",
        contactUsID: contactForm.id,
        message: "",
        author: "",
        createdAt: null,
        updatedAt: null,
      },
    });
  });
