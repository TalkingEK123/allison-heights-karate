/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CLUB_NEWS, type NewsItem as SharedNewsItem } from "@/data/news"; 


/** =========================================================
 *  Shared: simple reveal-on-scroll (same vibe as About)
 * ======================================================= */
function Reveal({
  id,
  as: Tag = "section",
  className = "",
  children,
}: {
  id?: string;
  as?: any;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      el.classList.remove("opacity-0", "translate-y-6");
      el.classList.add("opacity-100", "translate-y-0");
      return;
    }

    el.classList.add("opacity-0", "translate-y-6");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-6");
            obs.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      id={id}
      ref={ref as any}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${className}`}
    >
      {children}
    </Tag>
  );
}



type EventType = "Training" | "Competition" | "Testing" | "Seminar" | "Special";
type Event = {
  id: string;
  title: string;
  type: EventType;
  start: string;     // ISO YYYY-MM-DD
  end?: string;
  time: string;
  location: string;
  url?: string;
};

const EVENTS: Event[] = [
  { id: "knb-gp-2025-09-20", title: "Karate NB Grand Prix", type: "Competition", start: "2025-09-20", time: "9:00 AM – 4:00 PM", location: "Tracadie, NB" },
  { id: "nss-kumite-2025-10-03", title: "NS Kumite Clinic (Yevhen)", type: "Seminar", start: "2025-10-03", end: "2025-10-05", time: "All day", location: "Halifax, NS" },
  { id: "atlantic-champs-2025-11-01", title: "Atlantic Championship", type: "Competition", start: "2025-11-01", time: "All day", location: "Moncton, NB" },
  // ...you can add more or import from a shared file later
];

/** =========================================================
 *  HERO: Slideshow with dark tint
 * ======================================================= */
const HERO_IMAGES = [
  "public/images/action-1.jpg",
  "public/images/team_kata_2.jpeg",
  "public/images/Eric_Atlantic3.jpg",
  "public/images/team_kata_bow.jpg",
]; 

function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[92svh] min-h-[560px] flex items-center justify-center overflow-hidden bg-black">
      {/* Slides */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src + i}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out`}
            style={{ opacity: idx === i ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              decoding={i === 0 ? "sync" : "async"}
              
            />
            {/* Dark tint & subtle depth */}
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/10 to-brand-900/80" />
          </div>
        ))}
      </div>

      {/* Copy */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-[0.02em] text-white leading-[0.95]">
          ALLISON HEIGHTS
          <span className="block text-[#D7263D]">KARATE</span>
        </h1>
        <p className="mt-5 text-xl md:text-2xl text-white/85">
          Building Champions Through Discipline, Respect, and Excellence.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild size="lg" className="btn-primary uppercase">
            <Link to="/classes">Start Training</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:border-[#D7263D] hover:text-[#D7263D]"
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** =========================================================
 *  Mission (sleek glass cards) — Final copy
 * ======================================================= */
function Mission() {
  const items = [
    {
      title: "Excellence",
      desc: "Precise technique, strong fundamentals, and standards that rise with you in every class.",
    },
    {
      title: "Competition",
      desc: "Elite coaching that builds the skills, mindset, and training to take you from your first medal to international success.",
    },
    {
      title: "Community",
      desc: "A strong, supportive team that raises the standard for everyone on the mats.",
    },
  ];

  return (
    <Reveal className="section-y border-t border-steel/40 bg-brand-900">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs tracking-[0.22em] uppercase text-white/70">Our Mission</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold tracking-tight text-white">
            Strong Karate. Strong People.
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/80">
            Through traditional Shotokan and high‑level training, we build not just champions in sport, but champions in life.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <Card key={it.title} className="bg-white/[0.06] border-white/10 rounded-xl overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#4F7DFF] to-[#3C64D8]" />
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg">{it.title}</h3>
                <p className="mt-2 text-white/85">{it.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Reveal>
  );
}


/** =========================================================
 *  News carousel with tag filters
 * ======================================================= */
function NewsCarousel() {
  const [tag, setTag] = useState<"All" | SharedNewsItem["tag"]>("All");

  const filtered = useMemo(
    () => (tag === "All" ? CLUB_NEWS : CLUB_NEWS.filter((n) => n.tag === tag)),
    [tag]
  );

   // Optional: build tags dynamically from your data so only real tags show
  const tags = useMemo(() => {
    const s = new Set<SharedNewsItem["tag"]>();
    CLUB_NEWS.forEach(n => n.tag && s.add(n.tag));
    return ["All", ...Array.from(s)] as const;
  }, []);

  return (
    <Reveal className="section-y border-t border-steel/40 bg-brand-900">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-white/70">Club News</p>
            <h2 className="mt-1 text-2xl md:text-4xl font-bold tracking-tight text-white">
              Highlights & Updates
            </h2>
          </div>
          <Link to="/karate-info#club-news" className="text-white/80 hover:text-white underline-offset-4 hover:underline">
            View all
          </Link>
        </div>

        {/* Tag filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={
                "rounded-md border px-3 py-1 text-sm transition " +
                (tag === t
                  ? "border-white/30 bg-white/15 text-white"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10")
              }
              aria-pressed={tag === t}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Horizontal scroll / snap carousel */}
        <div className="overflow-x-auto scroll-smooth">
          <ul className="flex gap-5 md:gap-6 snap-x snap-mandatory pe-4">
            {filtered.map((n) => (
              <li key={n.id} className="min-w-[70%] sm:min-w-[50%] md:min-w-[40%] lg:min-w-[30%] snap-start">
                <Link to="/karate-info#club-news" className="group block">
                  <article className="rounded-xl border border-white/10 bg-white/[0.06] overflow-hidden hover:-translate-y-0.5 transition-transform backdrop-blur-sm">
                    <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                      <img
                        src={n.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                        style={n.objectPosition ? { objectPosition: n.objectPosition } : undefined}
                      />
                      <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-xs uppercase tracking-wide text-white/90 ring-1 ring-white/20">
                        {n.tag}
                      </span>
                    </div>
                    <div className="p-4 md:p-5">
                      <p className="text-white/60 text-xs">
                        {new Date(n.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{n.title}</h3>

                      {/* Learn more (keeps the whole card as one link; no nested <a>) */}
                      <span className="mt-2 inline-flex items-center text-white/80 underline-offset-4 group-hover:text-white group-hover:underline">
                        Learn more
                        <span aria-hidden="true" className="ms-1 transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/** =========================================================
 *  Upcoming events (next 3)
 * ======================================================= */
function ymd(d: Date | string) {
  const dd = typeof d === "string" ? new Date(d) : d;
  const y = dd.getFullYear();
  const m = `${dd.getMonth() + 1}`.padStart(2, "0");
  const day = `${dd.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function UpcomingEvents() {
  const next = useMemo(() => {
    const today = new Date(ymd(new Date()));
    return [...EVENTS]
      .filter((e) => new Date(e.end ?? e.start) >= today)
      .sort((a, b) => +new Date(a.start) - +new Date(b.start))
      .slice(0, 3);
  }, []);

  const badge: Record<EventType, string> = {
    Competition: "bg-[#D7263D] text-white",
    Training: "bg-[#22C55E] text-black",
    Testing: "bg-[#0072CE] text-white",
    Seminar: "bg-[#CFAE53] text-black",
    Special: "bg-[#A855F7] text-white",
  };

  return (
    <Reveal className="section-y border-t border-steel/40 bg-brand-900">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-white/70">Calendar</p>
            <h2 className="mt-1 text-2xl md:text-4xl font-bold tracking-tight text-white">
              Next Up
            </h2>
          </div>
          <Link to="/calendar" className="text-white/80 hover:text-white underline-offset-4 hover:underline">
            Full Calendar
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {next.map((e) => (
            <Card key={e.id} className="bg-white/[0.06] border-white/10 rounded-xl overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className={`px-2 py-1 rounded text-[11px] font-semibold ${badge[e.type]}`}>
                    {e.type}
                  </span>
                  <span className="text-white/70 text-sm">
                    {new Date(e.start).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    {e.end ? `–${new Date(e.end).toLocaleDateString(undefined, { month: "short", day: "numeric" })}` : ""}
                  </span>
                </div>
                <h3 className="mt-2 text-white font-semibold">{e.title}</h3>
                <p className="mt-1 text-white/80 text-sm">{e.time}</p>
                <p className="text-white/70 text-sm">{e.location}</p>
                <div className="mt-4">
                  <Link to={`/calendar#${e.id}`} className="inline-flex items-center gap-1 text-sm text-white/90 hover:underline">
                    View in calendar <span aria-hidden>↗</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/** =========================================================
 *  Footer with location
 * ======================================================= */
function Footer() {
  return (
    <footer className="mt-10 border-t border-steel/40 bg-brand-900">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="text-white font-semibold text-lg">Allison Heights Karate</h4>
          <p className="mt-2 text-white/75 max-w-sm">
            Tradition, performance, and community in Riverview, New Brunswick.
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold">Location</h5>
          <p className="mt-2 text-white/85">
            20 Karolie Rd<br />Riverview, NB E1B 1R1
          </p>
          <p className="mt-2">
            <a href="tel:+15062953889" className="text-white/85 hover:underline">(506) 295‑3889</a><br />
            <a href="mailto:info@allisonheightskarate.com" className="text-white/85 hover:underline">info@allisonheightskarate.com</a>
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold">Quick Links</h5>
          <ul className="mt-2 grid gap-1 text-white/85">
            <li><Link to="/classes" className="hover:underline">Classes</Link></li>
            <li><Link to="/calendar" className="hover:underline">Calendar</Link></li>
            <li><Link to="/karate-info#club-news" className="hover:underline">Club News</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Allison Heights Karate. All rights reserved.
      </div>
    </footer>
  );
}

/** =========================================================
 *  Page
 * ======================================================= */
export default function Home() {
  return (
    <main id="main" className="bg-brand-900 text-primary">
      <Hero />
      <Mission />
      <NewsCarousel />
      <UpcomingEvents />
      <Footer />
    </main>
  );
}
