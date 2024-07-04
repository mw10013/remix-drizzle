CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`organization_id` text NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`status` text NOT NULL,
	`marketing_consent` integer DEFAULT false NOT NULL,
	`locked_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`ordering` real NOT NULL,
	`course_id` text NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `membership_roles` (
	`id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `memberships` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_id` text NOT NULL,
	`user_id` text NOT NULL,
	`membership_role` text NOT NULL,
	FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`membership_role`) REFERENCES `membership_roles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`public` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `prices` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`description` text NOT NULL,
	`name` text,
	`unit_price_amount` integer NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`customer_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users_to_roles` (
	`user_id` text NOT NULL,
	`role` text NOT NULL,
	PRIMARY KEY(`role`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`role`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_unique_organization_id_and_name_index` ON `courses` (`organization_id`,`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `customers_user_id_unique` ON `customers` (`user_id`);--> statement-breakpoint
CREATE INDEX `customers_user_id_index` ON `customers` (`user_id`);--> statement-breakpoint
CREATE INDEX `customers_updated_at_index` ON `customers` (`updated_at`);--> statement-breakpoint
CREATE INDEX `lessons_course_id_and_order_index` ON `lessons` (`course_id`,`ordering`);--> statement-breakpoint
CREATE UNIQUE INDEX `memberships_unique_organization_id_and_user_id_index` ON `memberships` (`organization_id`,`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_name_unique` ON `organizations` (`name`);--> statement-breakpoint
CREATE INDEX `organizations_name_index` ON `organizations` (`name`);--> statement-breakpoint
CREATE INDEX `organizations_public_index` ON `organizations` (`public`);--> statement-breakpoint
CREATE INDEX `prices_product_id_index` ON `prices` (`product_id`);--> statement-breakpoint
CREATE INDEX `prices_updated_at_index` ON `prices` (`updated_at`);--> statement-breakpoint
CREATE INDEX `products_updated_at_index` ON `products` (`updated_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_customer_id_unique` ON `subscriptions` (`customer_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_customer_id_index` ON `subscriptions` (`customer_id`);--> statement-breakpoint
CREATE INDEX `subscriptions_updated_at_index` ON `subscriptions` (`updated_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);