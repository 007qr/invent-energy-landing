CREATE TABLE `leads` (
	`id` text PRIMARY KEY DEFAULT (uuid4()) NOT NULL,
	`visitor_id` text NOT NULL,
	`full_name` text,
	`email` text,
	`phone` text,
	`address` text,
	`power_bill` integer,
	`home_type` text,
	`own_home` integer,
	`ip_address` text,
	`city` text,
	`region` text,
	`country` text,
	`postal_code` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `leads_email_unique` ON `leads` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `visitor_id_idx` ON `leads` (`visitor_id`);