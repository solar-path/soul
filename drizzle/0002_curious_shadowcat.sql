ALTER TABLE `business_company` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `business_company_slug_unique` ON `business_company` (`slug`);