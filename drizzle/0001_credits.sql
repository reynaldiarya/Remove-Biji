CREATE TABLE IF NOT EXISTS "credits" (
	"id" integer PRIMARY KEY NOT NULL,
	"amount" integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "credits" ADD CONSTRAINT "credits_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
