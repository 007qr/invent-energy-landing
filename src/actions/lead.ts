// src/actions/lead.ts
import { db } from "~/lib/db";
import { leads } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { action } from "@solidjs/router";

/**
 * Saves or updates lead data in the database using a browser fingerprint (visitorId).
 * @param data Partial lead data to save/update.
 * @param visitorId The unique browser fingerprint ID.
 */
export const saveLeadData = action(async (data: Partial<typeof leads.$inferInsert>, visitorId: string) => {
  "use server";

  if (!visitorId) {
    throw new Error("Cannot save lead data without a visitorId.");
  }

  try {
    const existingLead = await db.select({ id: leads.id })
                                   .from(leads)
                                   .where(eq(leads.visitorId, visitorId))
                                   .limit(1)
                                   .execute();

    if (existingLead.length > 0) {
      // Lead with this visitorId exists, so update it
      await db.update(leads)
              .set(data)
              .where(eq(leads.visitorId, visitorId))
              .execute();
      console.log(`Updated lead for visitorId: ${visitorId}`);
    } else {
      // No lead with this visitorId, so insert a new one
      // Ensure the visitorId is included in the data to be inserted
      const dataToInsert = { ...data, visitorId };
      await db.insert(leads).values(dataToInsert).execute();
      console.log(`Inserted new lead for visitorId: ${visitorId}`);
    }
  } catch (error) {
    console.error("Error saving lead data:", error);
    throw new Error("Failed to save lead data due to a server error.");
  }
});
