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
  objectPos?: string;
};

const coaches: Coach[] = [
  {
    name: "Youssef Ismail",
    role: "Head Coach • Kumite",
    photo: "/images/IMG_5591.JPG",
    creds: ["Active Team Canada athlete (Kumite)",
            "Team New Brunswick Coach",
            "International medalist & high-performance mentor",],
    objectPos: "38% 25%",
  },
  {
    name: "Emmanuel Leblanc",
    role: "Sensei • Founder",
    photo: "/images/Many_headshot.jpeg",
    creds: ["National Referee, Karate Canada",
            "Traditional Shotokan mentor",
            "Over 30 years of coaching & leadership"],
    objectPos: "[object-position:50%_20%]",
  },
  {
    name: "Julie Losier",
    role: "Coach • Kata",
    photo: "/images/image6.jpeg",
    creds: ["Former national-level Kata competitor",
            "Mentor for women in sport",
            "Technical specialist in form & precision",],
    objectPos: "[object-position:50%_20%]",
  },
  {
    name: "Denis Leblanc",
    role: "Coach • Youth Program",
    photo: "/images/Denis_headshot.jpeg",
    creds: ["Experienced youth coach & team manager",
            "Specialist in athlete development (ages 5–12)",
            "Building confidence and fundamentals in young athletes"],
    objectPos: "[object-position:50%_20%]",
  },
];

export default function About() {
  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main id="main" className="bg-brand-900 text-primary">
      {/* ===== Hero ===== */}
      <header
        className="relative min-h-[92svh] flex items-center border-b border-steel/40"
        aria-labelledby="about-hero-title"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.03),transparent_35%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 text-center md:text-left">
          <p className="text-primary/80 uppercase tracking-[0.2em] text-xs md:text-sm">
            About Allison Heights Karate
          </p>
          <h1
            id="about-hero-title"
            className="mt-2 text-4xl md:text-6xl font-bold uppercase tracking-[0.02em] leading-tight"
          >
            Tradition Builds Character. Competition Raises Champions.
          </h1>
          <p className="mt-4 max-w-3xl text-primary/85">
            Rooted in <strong>Shotokan tradition</strong>, driven by
            <strong> high-performance sport</strong>. Beginners develop solid basics,
            while athletes train for <strong>Team NB</strong> and <strong>Team Canada</strong>—all in a family-first environment that values respect and discipline.
          </p>
          <div className="mt-8 flex gap-4 justify-center md:justify-start">
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
      </header>

      {/* ===== Story ===== */}
      <Reveal id="story" className="border-b border-steel/40 section-y">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 items-center gap-10 px-4 md:px-6">
          <figure className="relative rounded-xl overflow-hidden border border-steel/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] aspect-[4/3] md:aspect-[5/4]">
            <img
              src="/images/old_pic_many.jpeg"
              alt="Focused athletes practicing combinations"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/55" />
          </figure>
          <div className="md:pl-2">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.02em]">
              Our Story & Leadership
            </h2>
            <p className="mt-4 text-primary">
              Allison Heights Karate began with Sensei Emmanuel Leblanc, a national referee and lifelong Shotokan mentor. His vision was simple: build a dojo where etiquette, discipline, and respect come first.

              Today, that tradition is carried forward by Coach Youssef Ismail—an active Team Canada athlete and Team New Brunswick coach—who brings international experience directly to the mats. Under his leadership, the dojo blends strong fundamentals with modern, high-performance training, guiding athletes from their first belt to national and international success.

              Together, our leadership team connects heritage with innovation—a dojo grounded in tradition, yet fully alive in today’s competitive sport.
            </p>
            {/* <ul className="mt-6 space-y-3 text-primary">
              <li>• Tradition upheld by an active national referee</li>
              <li>• Leadership that still competes at the highest level</li>
              <li>• Family-friendly culture with high standards</li>
            </ul> */}
          </div>
        </div>
      </Reveal>

      {/* ===== Training Style ===== */}
      <Reveal id="training" className="border-b border-steel/40 section-y">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 items-center gap-10 px-4 md:px-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.02em]">
              Training Style
            </h2>
            <p className="mt-5 space-y-3 text-primary">
              Every class starts with the same foundation: clean Shotokan basics—stances, footwork, and etiquette. From there, students explore both kata and kumite, developing a complete skill set that strengthens mind and body.

              For athletes pursuing competition, we layer in performance-focused training: structured drills, video feedback, strength and mobility work. But we never lose sight of balance—each student, from age five to adult, trains in an environment that is welcoming, disciplined, and motivating.
            </p>
          </div>
          <figure className="relative rounded-xl overflow-hidden border border-steel/40 shadow-[0_20px_60px_rgba(0,0,0,0.6)] aspect-[4/3] md:aspect-[5/4]">
            <img
              src="/images/group_podium.JPG"
              alt="Athletes celebrating on podium"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/55" />
          </figure>
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
                    className={`h-full w-full object-cover ${c.objectPos ?? "object-center"}`}
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
