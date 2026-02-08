// src/actions/lead.ts
import { db } from "~/lib/db";
import { leads } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { action, query } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";

/**
 * Saves or updates lead data in the database using a browser fingerprint (visitorId).
 * @param data Partial lead data to save/update.
 * @param visitorId The unique browser fingerprint ID.
 */
 export const saveLeadData = action(
   async (data: Partial<typeof leads.$inferInsert>) => {
     "use server";

     if (!data.visitorId) {
       throw new Error("Cannot save lead data without a visitorId.");
     }

     const event = getRequestEvent();
     const rawIp =
       event?.request.headers.get("cf-connecting-ip") ??
       event?.request.headers.get("x-forwarded-for") ??
       event?.clientAddress;

     const ip = rawIp?.split(",")[0]?.trim();
     const geo = ip ? await getCityFromIp(ip) : null;

     const insertValues = clean({
       ...data,
       visitorId: data.visitorId,
       ipAddress: ip,
       city: geo?.city,
       region: geo?.region,
       country: geo?.country,
     });

     const updateValues = clean({
       ...data,
       ipAddress: ip,
       updatedAt: new Date(),
     });

     await db
       .insert(leads)
       //@ts-ignore
       .values(insertValues)
       .onConflictDoUpdate({
         target: leads.visitorId,
         set: updateValues,
       });
   }
 );


 function clean<T extends Record<string, any>>(obj: T) {
   return Object.fromEntries(
     Object.entries(obj).filter(([, v]) => {
       if (v === undefined || v === null) return false;
       if (typeof v === "string" && v.trim() === "") return false;
       return true;
     })
   );
 }


export const getGeoInfo = query(async () => {
  const event = getRequestEvent();
  const rawIp =
    event?.request.headers.get("cf-connecting-ip") ??
    event?.request.headers.get("x-forwarded-for") ??
    event?.clientAddress;

  const ip = rawIp?.split(",")[0]?.trim();

  const geo = ip ? await getCityFromIp(ip) : null;
  return geo;
}, "get-geo-info");

async function getCityFromIp(ip: string | undefined) {
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    return null;
  }

  const res = await fetch(
    `http://ip-api.com/json/${ip}`,
  );

  if (!res.ok) return null;

  const data = await res.json();
  return {
    city: data.city,
    region: data.region,
    country: data.country,
  };
}
