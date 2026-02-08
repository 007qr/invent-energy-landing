import { integer, text, sqliteTable, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey().default(sql`(uuid4())`),
  visitorId: text("visitor_id").notNull(),
  fullName: text("full_name"),
  email: text("email").unique(),
  phone: text("phone"),
  address: text("address"),
  powerBill: integer("power_bill"),
  homeType: text("home_type", { enum: ["single", "mobile"] }),
  ownHome: integer("own_home", { mode: "boolean" }),
  ipAddress: text("ip_address"),
  city: text("city"),
  region: text("region"),
  country: text("country"),
  postalCode: text("postal_code"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date()
  ),
}, (table) => {
  return {
    visitorIdIdx: uniqueIndex("visitor_id_idx").on(table.visitorId),
  };
});
