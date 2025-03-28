CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`fullname` text,
	`is_verified` integer DEFAULT false,
	`avatar` text,
	`dob` text,
	`token` text,
	`gender` text,
	`contact` text,
	`address` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `business_company` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`bin` text NOT NULL,
	`country_id` text NOT NULL,
	`industry_id` text NOT NULL,
	`logo` text,
	`contact` text,
	`address` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `business_country` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`ISO3` text NOT NULL,
	`currency` text NOT NULL,
	`currency_code` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `business_department` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`parent_id` text,
	`headcount` integer,
	`company_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`parent_id`) REFERENCES `business_department`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`company_id`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `business_industry` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`parent_id` text,
	`description` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`parent_id`) REFERENCES `business_industry`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `business_orgchart` (
	`id` text PRIMARY KEY NOT NULL,
	`company_id` text NOT NULL,
	`department_id` text,
	`position_id` text,
	`employee_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`company_id`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`department_id`) REFERENCES `business_department`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`position_id`) REFERENCES `business_position`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`employee_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `business_position` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`company_id` text NOT NULL,
	`job_description` text,
	`salary` text,
	`is_vacant` integer DEFAULT true,
	`parent_id` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`company_id`) REFERENCES `business_company`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_id`) REFERENCES `business_position`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `contact_us` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text
);
--> statement-breakpoint
CREATE TABLE `respond_to_contact_us` (
	`id` text PRIMARY KEY NOT NULL,
	`contact_us_id` text NOT NULL,
	`message` text NOT NULL,
	`author` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text,
	FOREIGN KEY (`contact_us_id`) REFERENCES `contact_us`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`author`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text
);
