/**
 * Company Routes
 *
 * This file contains CRUD endpoints for company operations
 */

import { Hono } from "hono";
// Remove incorrect Json import
import type { Context } from "@/api/utils/context";
import { and, eq, or, isNull, ne } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/api/database/database";
import { loggedIn } from "@/api/utils/loggedIn";
import { createApiResponse } from "@/api/utils/types";
import { generateUniqueSlug } from "@/api/utils/slugify";
import {
  companyTable,
  departmentTable,
  orgchartTable,
  positionTable,
  countryTable,
  industryTable,
} from "@/api/database/schema/business.schema";

import {
  createCompanySchema,
  updateCompanySchema,
  CompanyResponse,
  CompaniesListResponse,
} from "./company.zod";
import { idSchema } from "@/api/utils/id.zod";

// Company routes
export const companyRoutes = new Hono<{ Variables: Context }>()
  // Get all companies
  .get("/companyList", loggedIn, async (c) => {
    try {
      const companies = await db.select().from(companyTable);

      // Parse JSON strings to objects
      const typedCompanies = companies.map((company) => ({
        ...company,
        contact: company.contact ? JSON.parse(company.contact as string) : null,
        address: company.address ? JSON.parse(company.address as string) : null,
      }));

      return c.json(
        createApiResponse<CompaniesListResponse["data"]>(
          true,
          "Companies retrieved successfully",
          typedCompanies
        )
      );
    } catch (error) {
      console.error("Error retrieving companies:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve companies"),
        500
      );
    }
  })
  // Get company by ID
  .get("/:id", loggedIn, zValidator("param", idSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");
      const company = await db
        .select()
        .from(companyTable)
        .where(eq(companyTable.id, id));

      if (!company || company.length === 0) {
        return c.json(createApiResponse(false, "Company not found"), 404);
      }

      // Parse JSON strings to objects
      const typedCompany = {
        ...company[0],
        contact: company[0].contact
          ? JSON.parse(company[0].contact as string)
          : null,
        address: company[0].address
          ? JSON.parse(company[0].address as string)
          : null,
      };

      return c.json(
        createApiResponse<CompanyResponse["data"]>(
          true,
          "Company retrieved successfully",
          typedCompany
        )
      );
    } catch (error) {
      console.error("Error retrieving company:", error);
      return c.json(
        createApiResponse(false, "Failed to retrieve company"),
        500
      );
    }
  })
  .post(
    "/newCompany",
    loggedIn,
    zValidator("json", createCompanySchema),
    async (c) => {
      try {
        const data = c.req.valid("json");
        const user = c.get("user");
        if (!user) {
          return c.json(
            createApiResponse(false, "User not authenticated"),
            401
          );
        }

        // Validate that countryID exists
        const country = await db
          .select()
          .from(countryTable)
          .where(eq(countryTable.id, data.countryID))
          .limit(1);

        if (!country || country.length === 0) {
          return c.json(createApiResponse(false, "Country not found"), 400);
        }

        // Validate that industryID exists
        const industry = await db
          .select()
          .from(industryTable)
          .where(eq(industryTable.id, data.industryID))
          .limit(1);

        if (!industry || industry.length === 0) {
          return c.json(createApiResponse(false, "Industry not found"), 400);
        }
        // Check if company with same BIN and country already exists
        const [existingCompany] = await db
          .select()
          .from(companyTable)
          .where(
            and(
              eq(companyTable.bin, data.bin),
              eq(companyTable.countryID, data.countryID)
            )
          )
          .limit(1);

        if (existingCompany) {
          return c.json(
            createApiResponse(
              false,
              "Company with this BIN already exists in the selected country"
            ),
            400
          );
        }

        // Create company and add current user as employee in transaction
        // Define proper type based on company table structure
        let newCompany: (typeof companyTable.$inferSelect)[] = [];
        await db.transaction(async (tx) => {
          // Generate unique slug for the company
          const slug = await generateUniqueSlug(data.title);

          // Create new company
          const companyId = crypto.randomUUID();
          newCompany = await tx
            .insert(companyTable)
            .values({
              id: companyId,
              title: data.title,
              bin: data.bin,
              countryID: data.countryID,
              industryID: data.industryID,
              slug: slug, // Add the generated slug
              logo: data.logo || null,
              contact: data.contact ? JSON.stringify(data.contact) : null,
              address: data.address ? JSON.stringify(data.address) : null,
              createdAt: new Date().toISOString(),
            })
            .returning();

          // Add current user as employee in orgchart
          await tx.insert(orgchartTable).values({
            id: crypto.randomUUID(),
            companyID: newCompany[0].id,
            employeeID: user.id,
            createdAt: new Date().toISOString(),
          });
        });

        // Parse JSON fields before returning
        const typedCompany = {
          ...newCompany[0],
          contact: newCompany[0].contact
            ? JSON.parse(newCompany[0].contact as string)
            : null,
          address: newCompany[0].address
            ? JSON.parse(newCompany[0].address as string)
            : null,
        };

        return c.json(
          createApiResponse<CompanyResponse["data"]>(
            true,
            "Company created successfully",
            typedCompany
          )
        );
      } catch (error) {
        console.error("Error creating company:", error);
        return c.json(
          createApiResponse(false, "Failed to create company"),
          500
        );
      }
    }
  )
  .patch(
    "/updateCompany/:id",
    loggedIn,
    zValidator("param", idSchema),
    zValidator("json", updateCompanySchema),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const data = c.req.valid("json");

        // Check if company exists
        const company = await db
          .select()
          .from(companyTable)
          .where(eq(companyTable.id, id));

        if (!company || company.length === 0) {
          return c.json(createApiResponse(false, "Company not found"), 404);
        }

        // Check if user is part of the company
        const user = c.get("user");
        if (!user) {
          return c.json(
            createApiResponse(false, "User not authenticated"),
            401
          );
        }

        const [userInCompany] = await db
          .select()
          .from(orgchartTable)
          .where(
            and(
              eq(orgchartTable.companyID, id),
              eq(orgchartTable.employeeID, user.id)
            )
          )
          .limit(1);

        if (!userInCompany) {
          return c.json(
            createApiResponse(
              false,
              "You do not have permission to update this company"
            ),
            403
          );
        }

        // Validate countryID if provided
        if (data.countryID) {
          const country = await db
            .select()
            .from(countryTable)
            .where(eq(countryTable.id, data.countryID))
            .limit(1);

          if (!country || country.length === 0) {
            return c.json(createApiResponse(false, "Country not found"), 400);
          }
        }

        // Validate industryID if provided
        if (data.industryID) {
          const industry = await db
            .select()
            .from(industryTable)
            .where(eq(industryTable.id, data.industryID))
            .limit(1);

          if (!industry || industry.length === 0) {
            return c.json(createApiResponse(false, "Industry not found"), 400);
          }
        }

        // Check if updating to an existing BIN in the same country
        if (data.bin && data.countryID) {
          const [duplicateCompany] = await db
            .select()
            .from(companyTable)
            .where(
              and(
                eq(companyTable.bin, data.bin),
                eq(companyTable.countryID, data.countryID),
                or(isNull(companyTable.id), ne(companyTable.id, id))
              )
            )
            .limit(1);

          if (duplicateCompany) {
            return c.json(
              createApiResponse(
                false,
                "Another company with this BIN already exists in the selected country"
              ),
              400
            );
          }
        }

        // If title is being updated, generate a new slug
        let slug = company[0].slug;
        if (data.title !== undefined && data.title !== company[0].title) {
          slug = await generateUniqueSlug(data.title, id);
        }

        const updatedCompany = await db
          .update(companyTable)
          .set({
            title: data.title !== undefined ? data.title : company[0].title,
            bin: data.bin !== undefined ? data.bin : company[0].bin,
            countryID:
              data.countryID !== undefined
                ? data.countryID
                : company[0].countryID,
            industryID:
              data.industryID !== undefined
                ? data.industryID
                : company[0].industryID,
            slug: slug, // Update the slug if title changed
            logo: data.logo !== undefined ? data.logo : company[0].logo,
            contact:
              data.contact !== undefined
                ? JSON.stringify(data.contact)
                : company[0].contact,
            address:
              data.address !== undefined
                ? JSON.stringify(data.address)
                : company[0].address,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(companyTable.id, id))
          .returning();

        // Parse JSON fields before returning
        const typedCompany = {
          ...updatedCompany[0],
          contact: updatedCompany[0].contact
            ? JSON.parse(updatedCompany[0].contact as string)
            : null,
          address: updatedCompany[0].address
            ? JSON.parse(updatedCompany[0].address as string)
            : null,
        };

        return c.json(
          createApiResponse<CompanyResponse["data"]>(
            true,
            "Company updated successfully",
            typedCompany
          )
        );
      } catch (error) {
        console.error("Error updating company:", error);
        return c.json(
          createApiResponse(false, "Failed to update company"),
          500
        );
      }
    }
  )
  .delete("/:id", loggedIn, zValidator("param", idSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");

      // Check if company exists
      const company = await db
        .select()
        .from(companyTable)
        .where(eq(companyTable.id, id));

      if (!company || company.length === 0) {
        return c.json(createApiResponse(false, "Company not found"), 404);
      }

      // Check if user is part of the company
      const user = c.get("user");
      if (!user) {
        return c.json(createApiResponse(false, "User not authenticated"), 401);
      }

      const [userInCompany] = await db
        .select()
        .from(orgchartTable)
        .where(
          and(
            eq(orgchartTable.companyID, id),
            eq(orgchartTable.employeeID, user.id)
          )
        )
        .limit(1);

      if (!userInCompany) {
        return c.json(
          createApiResponse(
            false,
            "You do not have permission to delete this company"
          ),
          403
        );
      }

      // Check if company has departments
      const [departmentReference] = await db
        .select()
        .from(departmentTable)
        .where(eq(departmentTable.companyID, id))
        .limit(1);

      if (departmentReference) {
        return c.json(
          createApiResponse(
            false,
            "Cannot delete company that has departments. Delete all departments first."
          ),
          400
        );
      }

      // Check if company has positions
      const [positionReference] = await db
        .select()
        .from(positionTable)
        .where(eq(positionTable.companyID, id))
        .limit(1);

      if (positionReference) {
        return c.json(
          createApiResponse(
            false,
            "Cannot delete company that has positions. Delete all positions first."
          ),
          400
        );
      }

      // Delete company and all related orgchart entries in transaction
      await db.transaction(async (tx) => {
        // Delete orgchart entries
        await tx.delete(orgchartTable).where(eq(orgchartTable.companyID, id));

        // Delete company
        await tx.delete(companyTable).where(eq(companyTable.id, id));
      });

      return c.json(createApiResponse(true, "Company deleted successfully"));
    } catch (error) {
      console.error("Error deleting company:", error);
      return c.json(createApiResponse(false, "Failed to delete company"), 500);
    }
  });
