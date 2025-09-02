// src/data/events.ts
export type EventType = "Training" | "Competition" | "Testing" | "Seminar" | "Special";

export type Event = {
  id: string;
  title: string;
  type: EventType;
  start: string;     // ISO YYYY-MM-DD
  end?: string;      // optional end date for multi-day events
  time: string;
  location: string;
  url?: string;      // optional registration/info link
};

// Helper to format YYYY-MM-DD without time (useful elsewhere)
export const ymd = (d: Date | string) => {
  if (typeof d === "string") return d; // already "YYYY-MM-DD"
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
export const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
// 👉 Paste your master list here (the same EVENTS you’re using in Calendar)
export const EVENTS: Event[] = [
    // ——— 2025 ———
    // for registration add url: "https://mylink.com/atlantic-registration"
    { id: "kns-kata-2025-09-05", 
      title: "KNS Kata Workshop (Claudia Laos‑Loo)", 
      type: "Seminar", 
      start: "2025-09-05", 
      end: "2025-09-07", 
      time: "All day", 
      location: "Halifax, NS", 
      url:"https://karatens.org/events/kata-clinic-claudia-laos-loo/" },

    { id: "knb-open-2025-09-14", 
      title: "KNB Open Development Training #1", 
      type: "Training", 
      start: "2025-09-14", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "knb-gp1-2025-09-20", 
      title: "KNB Grand Prix #1", 
      type: "Competition", 
      start: "2025-09-20", 
      time: "All day", 
      location: "Tracadie, NB", 
      url:"https://can01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.karatenb.com%2Fevents-1%2F2025-knb-grand-prix-1-tracadie-nb&data=05%7C02%7Ceyi1901%40umoncton.ca%7C5c4166b8c1b343fe122608dde9652e97%7C810c295fe8174c4e89969b66369b8012%7C0%7C0%7C638923342991234606%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=jHHUhRXcQY9eBw7FpXD6WoJJJJa8iBno4kmPIqB0M7o%3D&reserved=0" },

    { id: "knb-clinic-2025-09-21", 
      title: "KNB Clinic", 
      type: "Training", 
      start: "2025-09-21", 
      time: "9:30 am - 2:00 pm", 
      location: "Tracadie, NB" },

    { id: "knb-fitness-2025-09-27", 
      title: "KNB Fitness Testing — CSIA High Performance Gym", 
      type: "Testing", 
      start: "2025-09-27", 
      time: "Afternoon", 
      location: "Fredericton, NB" },

    { id: "kns-kumite-yevhen-2025-10-03", 
      title: "KNS Kumite Clinic (Yevhen Motovylin)", 
      type: "Seminar", 
      start: "2025-10-03", 
      end: "2025-10-05", 
      time: "All day", 
      location: "Halifax, NS", 
      url:"https://karatens.org/events/kumite-clinic-yevhen-motovylin/" },

    { id: "atlantic-gp2-2025-11-01", 
      title: "Atlantic Championships / KNB Grand Prix #2", 
      type: "Competition", 
      start: "2025-11-01", 
      time: "All day", 
      location: "Moncton, NB" },

    { id: "kc-regional-2025-11-02", 
      title: "Karate Canada Regional Camp", 
      type: "Special", 
      start: "2025-11-02", 
      time: "All day", 
      location: "Moncton, NB" },

    { id: "parent-info-2025-11-16", 
      title: "Parent Information Session (in‑person/virtual)", 
      type: "Special", 
      start: "2025-11-16", 
      time: "Evening", 
      location: "Saint John, NB" },

    { id: "knb-open-2025-11-16", 
      title: "KNB Open Development Training #2", 
      type: "Training", 
      start: "2025-11-16", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "kns-gp-2025-11-22", 
      title: "KNS Grand Prix", 
      type: "Competition", 
      start: "2025-11-22", 
      time: "All day", 
      location: "Spryfield, NS" },

    { id: "knb-open-2025-12-14", 
      title: "KNB Open Development Training #3 — Weight Check", 
      type: "Training", 
      start: "2025-12-14", 
      time: "Daytime", 
      location: "Saint John, NB" },

    // ——— 2026 ———
    { id: "knb-open-2026-01-18", 
      title: "KNB Open Development Training #4 — Weight Check", 
      type: "Training", 
      start: "2026-01-18", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "kns-gp-2026-01-31", 
      title: "KNS Grand Prix", 
      type: "Competition", 
      start: "2026-01-31", 
      time: "All day", 
      location: "Bridgetown, NS" },

    { id: "knb-gp1-2026-02-07", 
      title: "KNB Grand Prix #3", 
      type: "Competition", 
      start: "2026-02-07", 
      time: "All day", 
      location: "Moncton, NB"},

    { id: "knb-clinic-2026-02-03", 
      title: "KNB Clinic", 
      type: "Training", 
      start: "2026-02-08", 
      time: "9:30 am - 2:00 pm", 
      location: "Moncton, NB" },

    { id: "kc-senior-u21-nats-2026-02-16", 
      title: "Karate Canada Senior & U21 National Championships", 
      type: "Competition", 
      start: "2026-02-16", 
      end: "2026-02-22", 
      time: "All day", 
      location: "Halifax, NS" },

    { id: "knb-closed-2026-03-08", 
      title: "KNB Closed Development #1 — Weight Check & Senior Team Debrief", 
      type: "Training", 
      start: "2026-03-08", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "kns-gp-2026-03-21", 
      title: "KNS Grand Prix", 
      type: "Competition", 
      start: "2026-03-21", 
      time: "All day", 
      location: "Enfield, NS" },

    { id: "knb-closed-2026-03-22", 
      title: "KNB Closed Development #2", 
      type: "Training", 
      start: "2026-03-22", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "kns-kumite-hana-2026-04-12", 
      title: "KNS Kumite Clinic (Hana Furumoto‑Deshais) — Tentative", 
      type: "Seminar", start: "2026-04-12", time: "All day", 
      location: "Halifax, NS" },

    { id: "knb-closed-2026-04-19", 
      title: "KNB Closed Development #3", 
      type: "Training", 
      start: "2026-04-19", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "knb-closed-2026-04-26", 
      title: "KNB Closed Development #4 — Weight Check", 
      type: "Training", start: "2026-04-26", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "knb-closed-2026-05-03", 
      title: "KNB Closed Development #5 — Weight Check", 
      type: "Training", 
      start: "2026-05-03", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "arrive-nats-2026-05-10", 
      title: "Arrive to Nationals", 
      type: "Special", 
      start: "2026-05-10", 
      time: "Travel day", 
      location: "Edmonton, AB" },

    { id: "kc-junior-nats-2026-05-11", 
      title: "2026 Junior Karate Canada National Championships", 
      type: "Competition", 
      start: "2026-05-11", 
      end: "2026-05-17", 
      time: "All day", 
      location: "Edmonton, AB" },

    { id: "knb-fitness-2026-05-30", 
      title: "KNB Fitness Testing — CSIA High Performance Gym (Tent.)", 
      type: "Testing", 
      start: "2026-05-30", 
      time: "All day", 
      location: "Fredericton, NB" },

    { id: "knb-closed-2026-06-07", 
      title: "KNB Closed Development #5 — Debrief", 
      type: "Training", start: "2026-06-07", 
      time: "Daytime", location: "Saint John, NB" },

    { id: "east-coast-games-2026-06-20", 
      title: "East Coast Games", 
      type: "Competition", 
      start: "2026-06-20", 
      end: "2026-06-21", 
      time: "All day", 
      location: "Saint John, NB" },

    { id: "knb-clinic-2026-07-05", 
      title: "KNB Clinic", 
      type: "Training", 
      start: "2026-07-05", 
      time: "Daytime", 
      location: "Saint John, NB" },
    { id: "knb-summer-camp-2026-07-24", 
      title: "KNB Summer Camp", 
      type: "Training", 
      start: "2026-07-24", 
      end: "2026-07-26", 
      time: "All day", 
      location: "Saint John, NB" },

    { id: "knb-open-2026-08-16", 
      title: "KNB Open Development Training #6", 
      type: "Training", 
      start: "2026-08-16", 
      time: "Daytime", 
      location: "Saint John, NB" },

    { id: "jr-pan-am-2026-08-23", 
      title: "Junior Pan American Championships", 
      type: "Competition", 
      start: "2026-08-23", 
      end: "2026-08-29", 
      time: "All day", 
      location: "Lima, Peru" },
];
