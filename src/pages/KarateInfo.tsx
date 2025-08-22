/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CLUB_NEWS, type NewsItem as SharedNewsItem } from "@/data/news";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** ============ tiny util ============ */
function cn(...cls: (string | false | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

/** ============ Reveal on view (matches About vibe) ============ */
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

    const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduce) {
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
      className={cn("transition-all duration-700 ease-out will-change-[opacity,transform]", className)}
    >
      {children}
    </Tag>
  );
}


type BeltKey =
  | "white-yellow"
  | "yellow-orange"
  | "orange-green"
  | "green-blue"
  | "blue-brown"
  | "brown-black";

type BeltDetail = {
  name: string;
  time: string;
  techniques: string[];
  kata: string[];
  stances: string[];
  sparring: string;
  notes?: string[];
};

const BELTS: Record<BeltKey, BeltDetail> = {
  "white-yellow": {
    name: "White → Yellow",
    time: "3–4 months",
    techniques: ["Basic blocks & punches", "Front kick", "Basic combinations"],
    kata: ["Heian Shodan"],
    stances: ["Zenkutsu-dachi", "Kiba-dachi"],
    sparring: "Light contact intro, control first",
  },
  "yellow-orange": {
    name: "Yellow → Orange",
    time: "4–5 months",
    techniques: ["Side kick", "Roundhouse", "Knife‑hand strike"],
    kata: ["Heian Nidan"],
    stances: ["Kokutsu-dachi", "Zenkutsu-dachi"],
    sparring: "Controlled contact, basic tactics",
  },
  "orange-green": {
    name: "Orange → Green",
    time: "5–6 months",
    techniques: ["Back kick", "Hook punch", "Elbows"],
    kata: ["Heian Sandan"],
    stances: ["Fudo-dachi", "Kokutsu-dachi"],
    sparring: "Free sparring basics",
  },
  "green-blue": {
    name: "Green → Blue",
    time: "6–8 months",
    techniques: ["Advanced combos", "Sweeps/throws (intro)", "Joint control basics"],
    kata: ["Heian Yondan"],
    stances: ["Dynamic zenkutsu", "Transitions"],
    sparring: "Intermediate free sparring",
  },
  "blue-brown": {
    name: "Blue → Brown",
    time: "8–12 months",
    techniques: ["Advanced kata focus", "Pressure handling", "Counter‑timing"],
    kata: ["Heian Godan", "Bassai Dai (intro)"],
    stances: ["Power lines & stability", "Explosive transitions"],
    sparring: "Advanced strategy & ringcraft",
  },
  "brown-black": {
    name: "Brown → Black",
    time: "12–18 months",
    techniques: ["Refine everything", "Lead/assist coaching segments", "Testing scenarios"],
    kata: ["Bassai Dai", "Kanku Dai"],
    stances: ["Efficiency under fatigue"],
    sparring: "Expert competition prep",
    notes: ["Higher technical precision expected", "Video review recommended"],
  },
};

const KATA_GEAR = [
  { item: "Karate Gi", note: "Clean, fitted" },
  { item: "Belt", note: "Current rank" },
];

const KUMITE_GEAR = [
  { item: "Gloves", note: "WKF‑approved" },
  { item: "Shin/Instep", note: "WKF‑approved" },
  { item: "Mouth Guard", note: "Mandatory" },
  { item: "Groin Protection", note: "Mandatory for male athletes" },
  { item: "Headgear", note: "As applicable" },
];

const DOCS = [
  { name: "Athlete Development Program (Team NB)", href: "/docs/athlete-development.pdf" },
  { name: "WKF Rules", href: "/docs/wkf-rules.pdf" },
  { name: "Photo / Media Consent", href: "/docs/photo-consent.pdf" },
];

/** ============ Subcomponents ============ */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-8 md:mb-10", center ? "text-center" : "")}>
      {eyebrow && (
        <p className="text-xs tracking-[0.22em] uppercase text-white/70">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl mx-auto text-white/80 text-sm md:text-base">{subtitle}</p>
      )}
    </div>
  );
}

function NewsRow({ item, flip }: { item: SharedNewsItem; flip?: boolean }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-6 md:gap-10 md:items-stretch md:flex-row",
        flip && "md:flex-row-reverse"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[20/22] rounded-xl overflow-hidden md:flex-1 border border-steel/40 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.03]"
          style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 600px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-md bg-white/10 px-2 py-1 text-xs uppercase tracking-wide text-white/90 ring-1 ring-white/20 backdrop-blur">
            {item.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <Card className="md:flex-1 bg-white/[0.06] border-white/10 backdrop-blur-sm rounded-xl transition-transform duration-300 hover:-translate-y-0.5">
        <CardContent className="p-6 md:p-8 h-full flex flex-col">
          <p className="text-white/60 text-xs">
            {new Date(item.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <h3 className="mt-2 text-xl md:text-2xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-white/85">{item.excerpt}</p>
          {item.href && (
            <a
              href={item.href}
              className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
            >
              Read more <span aria-hidden>→</span>
            </a>
          )}
          {/* optional: push CTA to bottom if you add more content later */}
          {/* <div className="mt-auto" /> */}
        </CardContent>
      </Card>
    </article>
  );
}


function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 text-white/90">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[7px] inline-block size-2 rounded-full bg-white/70" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function GearBlock({
  title,
  items,
  accent = "from-[#4F7DFF] to-[#3C64D8]",
}: {
  title: string;
  items: { item: string; note?: string }[];
  accent?: string;
}) {
  return (
    <Card className="bg-white/[0.06] border-white/10 rounded-xl overflow-hidden">
      <div className={cn("h-1 w-full bg-gradient-to-r", accent)} />
      <CardContent className="p-5 md:p-6">
        <h4 className="text-white font-semibold text-lg">{title}</h4>
        <div className="mt-4 grid gap-2">
          {items.map((g, i) => (
            <div key={i} className="flex items-center justify-between text-white/90">
              <span>{g.item}</span>
              {g.note && <span className="text-white/60 text-sm">{g.note}</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/** ============ Page (no hero, sticky tabs) ============ */
export default function KarateInfo() {
  const [beltKey, setBeltKey] = useState<BeltKey>("white-yellow");
  const belt = BELTS[beltKey];

  return (
    <main id="main" className="bg-brand-900 text-primary">
      <section className="py-6 md:py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          {/* Compact title row */}
          <div className="flex items-end justify-between gap-4 mb-4 md:mb-6">
            <div>
              <p className="text-primary/75 uppercase tracking-[0.18em] text-[11px] md:text-xs">
                Allison Heights Karate
              </p>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
                Club Hub
              </h1>
            </div>
          </div>

          {/* Sticky tab bar right under header */}
          <div className="sticky top-0 z-20 -mx-4 md:-mx-6 px-4 md:px-6 bg-brand-900/85 supports-[backdrop-filter]:backdrop-blur border-b border-white/10">
            <Tabs defaultValue="news" className="w-full">
              <div className="py-2">
                <TabsList className="flex w-full flex-wrap gap-2 bg-white/[0.06] border border-white/10 rounded-lg p-1">
                  <TabsTrigger value="news" className="data-[state=active]:bg-white/10">Club News</TabsTrigger>
                  <TabsTrigger value="belts" className="data-[state=active]:bg-white/10">Belt Info</TabsTrigger>
                  <TabsTrigger value="gear" className="data-[state=active]:bg-white/10">Gear</TabsTrigger>
                  <TabsTrigger value="docs" className="data-[state=active]:bg-white/10">Documents</TabsTrigger>
                </TabsList>
              </div>

              {/* ===== Club News ===== */}
              <TabsContent value="news" className="pt-6 pb-10 md:pb-12">
                <Reveal id="club-news">
                  <SectionHeader
                    eyebrow="News"
                    title="Athlete Highlights & Major Updates"
                    subtitle="Big visuals. Clean typography. Mobile‑first, fast to scan."
                  />
                  <div className="grid gap-16 md:gap-20">
                    {CLUB_NEWS.map((n, i) => (
                      <NewsRow key={n.id} item={n} flip={i % 2 === 1} />
                    ))}
                  </div>
                </Reveal>
              </TabsContent>

              {/* ===== Belt Info ===== */}
              <TabsContent value="belts" className="pt-6 pb-10 md:pb-12">
                <Reveal id="belt-info">
                  <SectionHeader
                    eyebrow="Grading"
                    title="Belt Information"
                    subtitle="Select your next level to see exactly what to prepare."
                  />
                  <div className="mx-auto max-w-3xl">
                    <Select value={beltKey} onValueChange={(v) => setBeltKey(v as BeltKey)}>
                      <SelectTrigger className="w-full bg-white/[0.06] border-white/10 text-white">
                        <SelectValue placeholder="Choose belt level" />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-900 text-white border-white/10">
                        <SelectItem value="white-yellow">White → Yellow</SelectItem>
                        <SelectItem value="yellow-orange">Yellow → Orange</SelectItem>
                        <SelectItem value="orange-green">Orange → Green</SelectItem>
                        <SelectItem value="green-blue">Green → Blue</SelectItem>
                        <SelectItem value="blue-brown">Blue → Brown</SelectItem>
                        <SelectItem value="brown-black">Brown → Black</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Detail card */}
                  <div className="mt-8 grid gap-6 md:gap-8">
                    <Card className="bg-white/[0.06] border-white/10 rounded-xl">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <h3 className="text-2xl md:text-3xl font-semibold text-white">{belt.name}</h3>
                          <span className="rounded-md bg-white/10 px-3 py-1 text-sm text-white/85 ring-1 ring-white/15">
                            Typical Time: {belt.time}
                          </span>
                        </div>

                        <div className="mt-6 grid md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-white/90 font-semibold mb-3">Techniques</h4>
                            <BulletList items={belt.techniques} />
                          </div>
                          <div>
                            <h4 className="text-white/90 font-semibold mb-3">Kata</h4>
                            <BulletList items={belt.kata} />
                          </div>
                          <div>
                            <h4 className="text-white/90 font-semibold mb-3">Stances</h4>
                            <BulletList items={belt.stances} />
                          </div>
                        </div>

                        <div className="mt-6 grid md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <h4 className="text-white/90 font-semibold mb-3">Sparring Focus</h4>
                            <p className="text-white/85">{belt.sparring}</p>
                          </div>
                          {belt.notes && belt.notes.length > 0 && (
                            <div>
                              <h4 className="text-white/90 font-semibold mb-3">Notes</h4>
                              <BulletList items={belt.notes} />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Reveal>
              </TabsContent>

              {/* ===== Gear ===== */}
              <TabsContent value="gear" className="pt-6 pb-10 md:pb-12">
                <Reveal>
                  <SectionHeader
                    eyebrow="Equipment"
                    title="Competition & Training Gear"
                    subtitle="Choose quality, keep it clean, and fit it right."
                  />
                  <div className="grid gap-6 md:grid-cols-2">
                    <GearBlock title="Kata Gear" items={KATA_GEAR} accent="from-[#22C55E] to-[#16A34A]" />
                    <GearBlock title="Kumite Gear" items={KUMITE_GEAR} accent="from-[#D7263D] to-[#B71C2A]" />
                  </div>
                  <div className="mt-8 flex justify-center">
                    <Link to="/contact" className="btn-primary">Ask Gear Questions</Link>
                  </div>
                </Reveal>
              </TabsContent>

              {/* ===== Documents ===== */}
              <TabsContent value="docs" className="pt-6 pb-10 md:pb-12">
                <Reveal>
                  <SectionHeader
                    eyebrow="Downloads"
                    title="Documents & Forms"
                    subtitle="For athletes and parents — forms, rules, and policies."
                  />
                  <div className="grid gap-4">
                    {DOCS.map((d) => (
                      <a
                        key={d.name}
                        href={d.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] p-4 text-white/90 hover:bg-white/[0.1] transition"
                      >
                        <span className="font-medium">{d.name}</span>
                        <span className="opacity-80 group-hover:translate-x-0.5 transition">↗</span>
                      </a>
                    ))}
                  </div>
                </Reveal>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}
