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
} from "./contactUs.zod";
import { eq } from "drizzle-orm";

export const contactUsRouter = new Hono<Context>()
  .post("/new", zValidator("json", contactUsSchema), async (c) => {
    const { email, message } = c.req.valid("json");

    const contactUs = await db
      .insert(contactUsTable)
      .values({
        id: crypto.randomUUID(),
        email,
        message,
      })
      .returning();

    // TODO: Send email notification

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

    // Get the response if it exists
    const [response] = await db
      .select()
      .from(respondToContactUsTable)
      .where(eq(respondToContactUsTable.contactUsID, id))
      .limit(1);

    return c.json<ApiResponse<RespondToContactUs>>({
      success: true,
      message: response ? "Response found" : "No response found",
      data: response || null,
    });
  });
