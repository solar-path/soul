import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { userTable } from "./auth.schema";

export const countryTable = sqliteTable("business_country", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  ISO3: text("ISO3").notNull(),
  currency: text("currency").notNull(),
  currencyCode: text("currency_code").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const industryTable = sqliteTable("business_industry", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  parentID: text("parent_id").references((): any => industryTable.id),
  description: text("description"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const companyTable = sqliteTable("business_company", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  bin: text("bin").notNull(),
  countryID: text("country_id").notNull(),
  industryID: text("industry_id").notNull(),
  logo: text("logo"),
  contact: text("contact", { mode: "json" }), // Store as JSON string
  address: text("address", { mode: "json" }), // Store as JSON string
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const departmentTable = sqliteTable("business_department", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  parentID: text("parent_id").references((): any => departmentTable.id),
  headcount: integer("headcount"),
  companyID: text("company_id")
    .notNull()
    .references(() => companyTable.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const positionTable = sqliteTable("business_position", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  companyID: text("company_id")
    .notNull()
    .references(() => companyTable.id),
  jobDescription: text("job_description", { mode: "json" }), // Store as JSON string
  salary: text("salary", { mode: "json" }), // Store as JSON string
  isVacant: integer("is_vacant", { mode: "boolean" }).default(true),
  parentID: text("parent_id").references((): any => positionTable.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});

export const orgchartTable = sqliteTable("business_orgchart", {
  id: text("id").primaryKey(),
  companyID: text("company_id")
    .notNull()
    .references(() => companyTable.id),
  departmentID: text("department_id").references(() => departmentTable.id),
  positionID: text("position_id").references(() => positionTable.id),
  employeeID: text("employee_id")
    .notNull()
    .references(() => userTable.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at"),
});
