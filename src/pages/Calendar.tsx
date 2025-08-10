import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar as DayPicker } from "@/components/ui/calendar";
import { enCA } from "date-fns/locale";

/** ===================== Config =====================
 * Set the calendar week start here:
 * 0 = Sunday (common for Canada), 1 = Monday (ISO 8601)
 */
const WEEK_START: 0 | 1 = 0;

/** ===================== Types & Data ===================== */
type EventType = "Training" | "Competition" | "Testing" | "Seminar" | "Special";

type Event = {
  id: string;
  title: string;
  type: EventType;
  start: string; // ISO date (YYYY-MM-DD) or ISO datetime
  end?: string;  // ISO date for multi-day spans
  time: string;  // human-friendly time
  location: string;
  url?: string;  // optional registration/info link
};

/**
 * 🔧 EDIT THIS ARRAY to add/remove events.
 * Dates: "YYYY-MM-DD". Add `end` for multi‑day spans. Add `url` for registration.
 */
const EVENTS: Event[] = [
  { id: "knb-open-2025-09-14", title: "Karate New Brunswick Open Team Training", type: "Training", start: "2025-09-14", time: "9:30 AM – 3:00 PM", location: "KV Karate Club (Saint John, NB)" },
  { id: "knb-gp-2025-09-20", title: "Karate New Brunswick Grand Prix", type: "Competition", start: "2025-09-20", time: "9:00 AM – 4:00 PM", location: "Tracadie, NB" },
  { id: "knb-open-2-2025-09-14", title: "Karate New Brunswick Open Training", type: "Training", start: "2025-09-14", time: "9:30 AM – 5:00 PM", location: "Saint John, NB" },
  { id: "knb-gp-2-2025-09-20", title: "Karate New Brunswick Grand Prix", type: "Competition", start: "2025-09-20", time: "9:30 AM – 5:00 PM", location: "Tracadie, NB" },
  { id: "knb-clinic-2025-09-21", title: "Karate New Brunswick Clinic", type: "Training", start: "2025-09-21", time: "9:00 AM – 1:00 PM", location: "Tracadie, NB" },
  { id: "knb-fitness-2025-09-27", title: "KNB Fitness Test (CSIA)", type: "Testing", start: "2025-09-27", time: "1:00 PM – 5:00 PM", location: "Fredericton, NB" },
  { id: "nss-kumite-2025-10-03", title: "Nova Scotia Kumite Clinic (Yevhen)", type: "Seminar", start: "2025-10-03", end: "2025-10-05", time: "All day", location: "Halifax, NS", url: "https://example.com/register" },
  { id: "knb-open-2025-10-12", title: "Karate New Brunswick Open Training", type: "Training", start: "2025-10-12", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "atlantic-champs-2025-11-01", title: "Atlantic Championship", type: "Competition", start: "2025-11-01", time: "All day", location: "Moncton, NB", url: "https://example.com/atlantic" },
  { id: "kc-regional-2025-11-02", title: "Karate Canada Regional Camp", type: "Special", start: "2025-11-02", time: "9:30 AM – 4:00 PM", location: "Moncton, NB" },
  { id: "knb-open-2025-11-16", title: "Karate New Brunswick Open Training", type: "Training", start: "2025-11-16", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "ns-gp-2025-11-22", title: "Karate Nova Scotia Grand Prix", type: "Competition", start: "2025-11-22", time: "9:30 AM – 4:30 PM", location: "Spryfield, Halifax, NS" },
  { id: "knb-open-2025-12-14", title: "Karate New Brunswick Open Training", type: "Training", start: "2025-12-14", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "knb-open-2026-01-18", title: "Karate New Brunswick Open Training", type: "Training", start: "2026-01-18", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "knb-gp-2026-02-07", title: "Karate New Brunswick Grand Prix", type: "Competition", start: "2026-02-07", time: "9:30 AM – 5:00 PM", location: "Moncton, NB" },
  { id: "knb-clinic-2026-02-08", title: "Karate New Brunswick Clinic", type: "Training", start: "2026-02-08", time: "9:00 AM – 1:00 PM", location: "TBD" },
  { id: "knb-closed-2026-03-08", title: "Karate New Brunswick Closed Training", type: "Training", start: "2026-03-08", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "knb-closed-2026-03-22", title: "Karate New Brunswick Closed Training", type: "Training", start: "2026-03-22", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "knb-closed-2026-04-05", title: "Karate New Brunswick Closed Training", type: "Training", start: "2026-04-05", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "knb-closed-2026-04-19", title: "Karate New Brunswick Closed Training", type: "Training", start: "2026-04-19", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "knb-closed-2026-04-26", title: "Karate New Brunswick Closed Training", type: "Training", start: "2026-04-26", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
  { id: "knb-closed-2026-05-03", title: "Karate New Brunswick Closed Training", type: "Training", start: "2026-05-03", time: "9:30 AM – 3:00 PM", location: "Saint John, NB" },
];

/** High‑contrast colors on dark background */
const TYPE_COLOR: Record<EventType, { chip: string; dot: string; label: string }> = {
  Competition: { chip: "bg-[#D7263D] text-white", dot: "bg-[#D7263D]", label: "Competition" }, // crimson
  Training:    { chip: "bg-[#22C55E] text-black", dot: "bg-[#22C55E]", label: "Training" },    // green
  Testing:     { chip: "bg-[#0072CE] text-white", dot: "bg-[#0072CE]", label: "Testing" },     // bright blue
  Seminar:     { chip: "bg-[#CFAE53] text-black", dot: "bg-[#CFAE53]", label: "Seminar" },     // gold
  Special:     { chip: "bg-[#A855F7] text-white", dot: "bg-[#A855F7]", label: "Special" },     // violet
};

/** ===================== Utils ===================== */
const ymd = (d: string | Date) => {
  const date = typeof d === "string" ? new Date(d) : d;
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, "0");
  const dd = `${date.getDate()}`.padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const enumerateDates = (startISO: string, endISO?: string) => {
  const out: string[] = [];
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : new Date(startISO);
  const cur = new Date(start);
  while (cur <= end) {
    out.push(ymd(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return out;
};

/** ===================== Component ===================== */
export default function Calendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [filters, setFilters] = useState<Record<EventType, boolean>>({
    Competition: true,
    Training: true,
    Testing: true,
    Seminar: true,
    Special: true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Map day -> events (handles multi-day)
  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>();
    EVENTS.forEach((e) => {
      enumerateDates(e.start, e.end).forEach((d) => {
        const arr = map.get(d) ?? [];
        arr.push(e);
        map.set(d, arr);
      });
    });
    map.forEach((arr) =>
      arr.sort((a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title))
    );
    return map;
  }, []);

  // Filtered upcoming list
  const upcoming = useMemo(() => {
    const today = new Date(ymd(new Date())); // strip time
    return [...EVENTS]
      .filter((e) => new Date(e.end ?? e.start) >= today)
      .filter((e) => filters[e.type])
      .sort((a, b) => +new Date(a.start) - +new Date(b.start));
  }, [filters]);

  // Refs for jumping the list to the selected day
  const listRef = useRef<HTMLDivElement | null>(null);
  const dayRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const key = selected ? ymd(selected) : undefined;
    if (!key) return;
    const node = dayRefs.current[key];
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected]);

  // Deep-link support (scroll on initial load only)
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // Day has any event?
  const hasAnyEvent = (day: Date) => (eventsByDay.get(ymd(day)) ?? []).length > 0;

  // Larger Day cells + colored dots inside the calendar
  const DayContent = (props: any) => {
    const day: Date = props.date;
    const key = ymd(day);
    const evts = (eventsByDay.get(key) ?? []).slice(0, 4);
    return (
      <div className="relative flex flex-col items-center leading-none">
        <span className="font-semibold">{day.getDate()}</span>
        {evts.length > 0 && (
          <span className="mt-1 flex gap-1">
            {evts.map((e) => (
              <span
                key={e.id}
                className={`ahk-dot inline-block size-2 md:size-2.5 rounded-full ring-1 ring-black/60 ${TYPE_COLOR[e.type].dot}`}
                aria-hidden="true"
                title={e.title}
              />
            ))}
          </span>
        )}
      </div>
    );
  };

  // Copy shareable link to clipboard (does NOT scroll the page)
  const copyLink = async (id: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {
      setCopiedId(null);
    }
  };

  // Locale with explicit week start (prevents header/day misalignment)
  const locale = useMemo(
    () => ({ ...enCA, options: { ...enCA.options, weekStartsOn: WEEK_START } }),
    []
  );

  return (
    <main id="main" className="bg-brand-900 text-primary">
      {/* Ensure selected-day dots stay visible */}
      <style jsx global>{`
        /* Keep event dots readable when a day is selected or today */
        .rdp-day_selected .ahk-dot,
        .rdp-day_today .ahk-dot {
          box-shadow:
            inset 0 0 0 2px rgba(255, 255, 255, 0.85),
            0 0 0 1px rgba(0, 0, 0, 0.6);
        }
        /* Slightly stronger weekday/header contrast on dark */
        .rdp-head_cell { color: rgba(255, 255, 255, 0.92); }
      `}</style>

      {/* Header */}
      <header className="section-y border-b border-steel/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <p className="text-white/80 uppercase tracking-[0.2em] text-xs md:text-sm">Events</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold uppercase tracking-[0.02em]">Calendar</h1>
          <p className="mt-4 max-w-3xl mx-auto text-white/90">
            All our upcoming karate events in one place.
          </p>
        </div>
      </header>

      {/* Calendar + List */}
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid gap-8 lg:grid-cols-[700px,1fr]">
          {/* LEFT: Larger Calendar + Filters */}
          <div className="rounded-lg border border-steel/40 bg-black/30 p-5 md:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.02em]">Event Calendar</h2>
              <Link to="/contact" className="btn-primary" aria-label="Contact us about events">
                Ask a Question
              </Link>
            </div>

            <div className="mt-4">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                showOutsideDays={false}
                locale={locale}
                className="rounded-md"
                /* Bigger & readable on dark; selection uses outline instead of a solid fill
                   so dots + numbers remain visible with AA contrast */
                classNames={{
                  months: "flex flex-col sm:flex-row gap-4",
                  caption_label: "text-white text-2xl md:text-3xl font-semibold",
                  nav_button: "text-white/90 hover:text-white",
                  head_row: "grid grid-cols-7 gap-1",
                  head_cell: "text-white/90 font-semibold text-sm md:text-base",
                  table: "border-separate border-spacing-1",
                  row: "grid grid-cols-7 gap-1",
                  cell: "p-0",
                  day: "h-16 w-16 md:h-20 md:w-20 text-base md:text-lg text-white/90 hover:bg-white/5 rounded-md focus:outline-none relative",
                  day_outside: "opacity-60",
                  day_selected:
                    "ring-2 ring-white/70 bg-white/10 text-white rounded-md", // neutral selection
                  day_today:
                    "ring-1 ring-white/50 bg-white/[0.04] rounded-md",
                }}
                components={{ DayContent }}
                modifiers={{ hasAnyEvent }}
                modifiersClassNames={{
                  hasAnyEvent: "ring-0 hover:ring-1 hover:ring-steel/40",
                  selected: "ahk-selected",
                }}
              />
            </div>

            {/* Legend / Filters */}
            <div className="mt-6">
              <p className="text-white/80 mb-2 uppercase tracking-[0.2em]">Filter</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(TYPE_COLOR) as EventType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilters((f) => ({ ...f, [t]: !f[t] }))}
                    className={`px-3 py-1 rounded-md text-xs font-semibold border border-steel/40 transition
                      ${filters[t] ? "opacity-100" : "opacity-50"}
                    `}
                    aria-pressed={filters[t]}
                  >
                    <span className={`inline-block size-2 rounded-full mr-2 align-middle ${TYPE_COLOR[t].dot}`} />
                    {TYPE_COLOR[t].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Upcoming list */}
          <div className="rounded-lg border border-steel/40 bg-black/20 p-0">
            <div ref={listRef} className="max-h-[76vh] overflow-y-auto scroll-smooth">
              {groupByMonth(upcoming).map(({ monthLabel, items }) => (
                <div key={monthLabel}>
                  <div className="sticky top-0 z-10 bg-brand-900/95 backdrop-blur supports-[backdrop-filter]:bg-brand-900/70 border-b border-steel/40 px-4 md:px-6 py-3">
                    <h3 className="text-sm md:text-base font-semibold uppercase tracking-[0.1em]">
                      {monthLabel}
                    </h3>
                  </div>
                  <div className="p-4 md:p-6 space-y-6">
                    {groupByDay(items).map(({ dayKey, dayLabel, events }) => (
                      <div key={dayKey} ref={(el) => (dayRefs.current[dayKey] = el)}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-lg font-bold text-white">{dayLabel}</span>
                          <div className="h-px flex-1 bg-steel/40" />
                        </div>
                        <ul className="space-y-3">
                          {events.map((e) => (
                            <li key={e.id} id={e.id}>
                              <article className="rounded-lg border border-steel/40 bg-brand-900/70 p-4 transition-transform duration-200 hover:scale-[1.01]">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <h4 className="font-bold uppercase tracking-[0.02em] text-white">{e.title}</h4>
                                    <p className="text-white/90 mt-1 text-sm">{formatDateRange(e)}</p>
                                    <p className="text-white/90 text-sm">{e.time}</p>
                                    <p className="text-white/90 text-sm">{e.location}</p>
                                  </div>
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${TYPE_COLOR[e.type].chip}`}>
                                    {TYPE_COLOR[e.type].label}
                                  </span>
                                </div>
                                <div className="mt-3 flex gap-2">
                                  {e.url && (
                                    <a
                                      href={e.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn-primary !px-3 !py-1 text-xs"
                                      aria-label={`Open registration for ${e.title}`}
                                    >
                                      Register
                                    </a>
                                  )}
                                  <button
                                    onClick={() => copyLink(e.id)}
                                    className="inline-flex items-center rounded-md border border-steel/40 px-2 py-1 text-xs text-white/90 hover:text-white"
                                    aria-live="polite"
                                  >
                                    {copiedId === e.id ? "Copied!" : "Share Link"}
                                  </button>
                                </div>
                              </article>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {upcoming.length === 0 && (
                <div className="p-6">
                  <p className="text-white/80">No upcoming events match your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/** ===================== Pure helpers ===================== */
function groupByMonth(items: Event[]) {
  const out: { monthLabel: string; items: Event[] }[] = [];
  items.forEach((e) => {
    const d = new Date(e.start);
    const label = d.toLocaleString(undefined, { month: "long", year: "numeric" });
    const bucket = out.find((b) => b.monthLabel === label);
    if (bucket) bucket.items.push(e);
    else out.push({ monthLabel: label, items: [e] });
  });
  return out;
}

function groupByDay(items: Event[]) {
  const map = new Map<string, Event[]>();
  items.forEach((e) => {
    const key = ymd(e.start);
    const arr = map.get(key) ?? [];
    arr.push(e);
    map.set(key, arr);
  });
  return [...map.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([dayKey, events]) => ({
      dayKey,
      dayLabel: new Date(dayKey).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      events,
    }));
}

function formatDateRange(e: Event) {
  const s = new Date(e.start);
  if (!e.end) {
    return s.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  const en = new Date(e.end);
  const sameMonth = s.getMonth() === en.getMonth() && s.getFullYear() === en.getFullYear();
  if (sameMonth) {
    return `${s.toLocaleDateString(undefined, { month: "short", day: "numeric" })}–${en.toLocaleDateString(undefined, { day: "numeric", year: "numeric" })}`;
  }
  return `${s.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${en.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`;
}
