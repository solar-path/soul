import type { Context } from "@/api/utils/context";
import { db } from "@/api/database/database";
import type { ApiResponse } from "@/api/utils/types";
import { zValidator } from "@hono/zod-validator";
import { and, isNotNull, or, eq } from "drizzle-orm/sql";
import { Hono } from "hono";
import {
  companyTable,
  countryTable,
  industryTable,
  orgchartTable,
} from "@/api/database/schema/business.schema";
import {
  companySchema,
  IndustryResponse,
  Company,
  Country,
} from "@/api/routes/business/business.zod";

export const businessRouter = new Hono<Context>()
  .get("/country", async (c) => {
    const countryList = await db.select().from(countryTable);
    return c.json<ApiResponse<Country[]>>({
      success: true,
      message: "Countries fetched successfully",
      data: countryList,
    });
  })
  .get("/industry", async (c) => {
    const industryList = await db
      .select()
      .from(industryTable)
      .where(
        and(
          isNotNull(industryTable.parentID),
          isNotNull(industryTable.description)
        )
      );
    return c.json<ApiResponse<IndustryResponse[]>>({
      success: true,
      message: "Industries fetched successfully",
      data: industryList,
    });
  })
  .post("/createCompany", zValidator("json", companySchema), async (c) => {
    const { title, bin, countryID, industryID, logo, author } =
      c.req.valid("json");

    // check company
    const [existingCompany] = await db
      .select()
      .from(companyTable)
      .where(
        or(
          // Condition 1: bin, country (residenceID) and title all match
          and(
            eq(companyTable.bin, bin),
            eq(companyTable.countryID, countryID),
            eq(companyTable.title, title)
          ),
          // Condition 2: bin and country (residenceID) match
          and(eq(companyTable.bin, bin), eq(companyTable.countryID, countryID))
        )
      )
      .limit(1);

    // return error if company exists
    if (existingCompany) {
      return c.json<ApiResponse<Company>>({
        success: false,
        message: "Company already exists",
        data: null,
      });
    }

    await db.transaction(async (tx) => {
      // create a new company
      const [newCompany] = await tx
        .insert(companyTable)
        .values({
          id: crypto.randomUUID(),
          title,
          bin,
          logo,
          countryID,
          industryID,
        })
        .returning();

      // create a new orgchart
      await tx
        .insert(orgchartTable)
        .values({
          id: crypto.randomUUID(),
          companyID: newCompany.id,
          employeeID: author,
        })
        .returning();
    });

    return c.json<ApiResponse>({
      success: true,
      message: "Company created",
      data: null,
    });
  });
