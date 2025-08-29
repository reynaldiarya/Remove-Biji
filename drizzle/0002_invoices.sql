CREATE TABLE IF NOT EXISTS "invoices" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"status" varchar DEFAULT 'UNPAID' NOT NULL,
	"expired_time" timestamp with time zone NOT NULL,
	"package" integer NOT NULL,
	"amount" integer NOT NULL,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"checkout_url" text,
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
