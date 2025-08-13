import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

/** Reveal on view (no deps, honors reduced motion) */
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

type Coach = {
  name: string;
  role: string;
  photo: string;
  creds: string[];
};

const coaches: Coach[] = [
  {
    name: "Youssef Ismail",
    role: "Head Coach • Kumite",
    photo: "/placeholders/coach-youssef.jpg",
    creds: ["Team Canada Athlete (Kumite)", "Team New Brunswick Coach", "First Aid / CPR"],
  },
  {
    name: "Emmanuel Leblanc",
    role: "Sensei • Founder",
    photo: "/placeholders/coach-emmanuel.jpg",
    creds: ["National Referee", "Traditional Shotokan Mentor", "Dojo Etiquette & Values"],
  },
  {
    name: "Maya Chen",
    role: "Strength & Mobility",
    photo: "/placeholders/coach-maya.jpg",
    creds: ["CSCS", "Mobility for Combat Sports", "Sport Taping Certified"],
  },
];

export default function About() {
  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main
      id="main"
      // Make <main> the scroll container so snapping works everywhere
      className="bg-brand-900 text-primary h-[105svh] overflow-y-auto overscroll-y-contain snap-y snap-proximity scroll-smooth"
    >
      {/* ===== Hero (unchanged) ===== */}
      <header
        className="relative min-h-[105svh] flex items-center border-b border-steel/40 snap-center"
        aria-labelledby="about-hero-title"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_35%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-primary/80 uppercase tracking-[0.2em] text-xs md:text-sm">
            About Allison Heights Karate
          </p>
          <h1
            id="about-hero-title"
            className="mt-2 text-4xl md:text-6xl font-bold uppercase tracking-[0.02em] leading-tight"
          >
            Tradition Shapes Us. Competition Drives Us.
          </h1>
          <p className="mt-4 max-w-3xl text-primary/85">
            We’re a welcoming, family‑oriented dojo with <strong>traditional Shotokan roots</strong> and a clear
            path to <strong>high‑performance sport</strong>. Beginners learn clean basics; developing athletes push
            toward <strong>Team NB</strong> and <strong>Team Canada</strong> standards—without losing the joy of training.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/classes" className="btn-primary">View Programs</Link>
            <button
              onClick={() => scrollTo("story")}
              className="inline-flex items-center rounded-md border border-steel/40 px-4 py-2 text-sm"
              aria-label="Scroll to Our Story"
            >
              Learn More
            </button>
          </div>
        </div>
        <button
          onClick={() => scrollTo("story")}
          aria-label="Scroll to next section"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-secondary hover:text-primary transition-colors"
        >
          <span className="block text-xs uppercase tracking-[0.2em] text-center">Scroll</span>
          <span className="mx-auto mt-1 block h-6 w-px bg-secondary" />
        </button>
      </header>

      {/* ===== Section 2A: Our Story & Leadership ===== */}
      <Reveal
        id="story"
        className="snap-center border-b border-steel/40"
      >
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 items-center gap-y-10 gap-x-8 md:gap-x-14 xl:gap-x-20 px-4 md:px-6 py-12 md:py-16 min-h-[70svh]">
          <div className="flex justify-center md:justify-start">
            <figure
              className="
                relative rounded-xl overflow-hidden border border-steel/40
                shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                w-full max-w-[720px] aspect-[4/3] md:aspect-[5/4]
                md:h-[56vh]
                transition-transform duration-500 md:-translate-y-1 md:hover:-translate-y-2
              "
            >
              <img
                src="public/images/Karate_Photos/old_pic_many.jpeg"
                alt="Focused athletes practicing combinations"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 600px"
              />
              <span className="absolute inset-0 bg-black/55" aria-hidden="true" />
            </figure>
          </div>

          <div className="md:pl-2">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.02em]">
              Our Story & Leadership
            </h2>
            <div className="mt-4 space-y-4 text-primary">
              <p>
                Founded by <strong>Sensei Emmanuel Leblanc</strong>—traditional Shotokan and
                <strong> national referee</strong>—our dojo keeps standards, etiquette, and respect at its core.
              </p>
              <p>
                Led today by <strong>Coach Youssef</strong>, an <strong>active Team Canada athlete</strong> and Team
                New Brunswick coach, we connect lineage with live international experience.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-steel/40 p-4">
                <p className="font-semibold uppercase tracking-[0.02em]">What Makes Us Different</p>
                <ul className="mt-3 space-y-2 text-primary">
                  <li className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-accent/90" aria-hidden="true" />
                    Tradition carried forward by an active national referee.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-accent/90" aria-hidden="true" />
                    Leadership that still competes—current international insight.
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-accent/90" aria-hidden="true" />
                    Family‑friendly culture; high standards with real support.
                  </li>
                </ul>
              </div>
              <div className="rounded-md border border-steel/40 p-4">
                <p className="font-semibold uppercase tracking-[0.02em]">Quick Cred</p>
                <ul className="mt-3 grid grid-cols-1 gap-2 text-primary">
                  <li className="rounded border border-steel/40 px-3 py-2 text-sm text-center">
                    <strong>Team Canada</strong> athlete leadership
                  </li>
                  <li className="rounded border border-steel/40 px-3 py-2 text-sm text-center">
                    <strong>5+ athletes</strong> coached to Team NB
                  </li>
                  <li className="rounded border border-steel/40 px-3 py-2 text-sm text-center">
                    <strong>Ages 5+</strong> beginner to elite
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ===== Section 2B: Training Style & What You Get ===== */}
      <Reveal
        id="training"
        className="snap-center border-b border-steel/40"
      >
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 items-center gap-y-10 gap-x-8 md:gap-x-14 xl:gap-x-20 px-4 md:px-6 py-12 md:py-16 min-h-[70svh]">
          <div className="md:pr-2 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.02em]">
              Training Style & What You Get
            </h2>

            <ul className="mt-5 space-y-3 text-primary">
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-accent/90" aria-hidden="true" />
                <span><strong>Foundations first:</strong> clear Shotokan basics, etiquette, and footwork.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-accent/90" aria-hidden="true" />
                <span><strong>Kata + Kumite for all:</strong> everyone trains both for complete skill.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-accent/90" aria-hidden="true" />
                <span><strong>Performance with care:</strong> comp‑aligned drills, video feedback, mobility & strength.</span>
              </li>
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-steel/40 px-4 py-3 text-center">
                <p className="text-lg font-bold">Clear Pathway</p>
                <p className="text-primary/80 text-xs">Belts → Team NB → Team Canada</p>
              </div>
              <div className="rounded-md border border-steel/40 px-4 py-3 text-center">
                <p className="text-lg font-bold">Welcoming</p>
                <p className="text-primary/80 text-xs">Family vibe, ages 5+</p>
              </div>
              <div className="rounded-md border border-steel/40 px-4 py-3 text-center">
                <p className="text-lg font-bold">Focused</p>
                <p className="text-primary/80 text-xs">Efficient, high‑energy classes</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <figure
              className="
                relative rounded-xl overflow-hidden border border-steel/40
                shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                w-full max-w-[720px] aspect-[4/3] md:aspect-[5/4]
                md:h=[56vh]
                transition-transform duration-500 md:-translate-y-1 md:hover:-translate-y-2
              "
            >
              <img
                src="/placeholders/about-training.jpg"
                alt="Fast kumite exchange under strong lighting"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 600px"
              />
              <span className="absolute inset-0 bg-black/55" aria-hidden="true" />
            </figure>
          </div>
        </div>
      </Reveal>

      {/* ===== Coaches ===== */}
      <Reveal id="coaches" className="section-y snap-center">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-primary/85 uppercase tracking-[0.2em] text-xs md:text-sm">The Team</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold uppercase tracking-[0.02em]">Coaches</h2>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coaches.map((c) => (
              <li
                key={c.name}
                className="rounded-lg border border-steel/40 bg-brand-900/70 overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
              >
                <figure className="relative aspect-[4/3]">
                  <img
                    src={c.photo}
                    alt={`${c.name} — ${c.role}`}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/25" aria-hidden="true" />
                </figure>
                <div className="p-5">
                  <h3 className="text-lg font-bold uppercase tracking-[0.02em]">{c.name}</h3>
                  <p className="mt-1 text-primary/90">{c.role}</p>
                  <ul className="mt-4 space-y-2 text-primary">
                    {c.creds.map((cr) => (
                      <li key={cr} className="flex gap-2">
                        <span className="mt-2 inline-block size-1.5 rounded-full bg-accent/90" aria-hidden="true" />
                        <span className="text-sm">{cr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <Link to="/contact" className="btn-primary" aria-label="Contact us to train with our coaches">
              Train With Us
            </Link>
          </div>

          <p className="mt-6 text-xs text-secondary text-center">
            Photos are placeholders — swap with real portraits once your shoot is ready.
          </p>
        </div>
      </Reveal>
    </main>
  );
}
