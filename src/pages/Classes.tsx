import { Link } from "react-router-dom";

type Program = {
  name: string;
  age: string;
  level: "All Levels" | "Intermediate" | "Advanced";
  schedule: string[];
  price: string;
  badges?: string[];
  photo: string;
  blurb: string;
};

const programs: Program[] = [
  {
    name: "Little Ninjas",
    age: "Ages 5–7",
    level: "All Levels",
    schedule: ["Mon · 6:00–6:45 PM"],
    price: "$45 / month",
    badges: ["Beginner‑friendly", "Fun & Focus"],
    photo: "public/images/allison_pics/Belt_tag.JPG",
    blurb:
      "Play‑based Shotokan foundations and dojo etiquette. Short, high‑energy sessions that build coordination and confidence.",
  },
  {
    name: "Youth Development",
    age: "Ages 8–12",
    level: "Intermediate",
    schedule: ["Mon & Thu · 6:00–7:00 PM"],
    price: "$55 / month",
    badges: ["Kata + Kumite", "Strong Habits"],
    photo: "public/images/allison_pics/young_eric_kick.jfif",
    blurb:
      "Clean basics, kata precision, and light kumite to build timing. A supportive path toward provincial standards.",
  },
  {
    name: "Teens & Adults",
    age: "Ages 13+",
    level: "All Levels",
    schedule: ["Mon & Thu · 6:00–8:00 PM"],
    price: "$60 / month",
    badges: ["Efficient Training", "Conditioning"],
    photo: "public/images/allison_pics/Julie_kata.jpeg",
    blurb:
      "Technical sessions with mobility and practical sparring concepts. Respectful, focused, and welcoming to newcomers.",
  },
  {
    name: "Performance Team",
    age: "Invite • Typically 10+",
    level: "Advanced",
    schedule: ["Mon · 6:00–8:00 PM", "Thu · 6:00–8:00 PM", "Fri · 6:00–8:00 PM"],
    price: "$65 / month",
    badges: ["Tournament Prep", "Team NB / Canada Path"],
    photo: "/placeholders/classes-performance.jpg",
    blurb:
      "Competition‑aligned training cycles, video feedback, and tactics—guided by active international experience.",
  },
];

export default function Classes() {
  return (
    <main id="main" className="bg-brand-900 text-primary">
      {/* Hero / Teaser */}
      <header className="section-y border-b border-steel/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-primary/85 uppercase tracking-[0.2em] text-xs md:text-sm">
            Programs & Schedule
          </p>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold uppercase tracking-[0.02em]">
            Classes
          </h1>
          <p className="mt-4 max-w-2xl text-primary">
            Traditional roots, modern performance. Every athlete learns <em>kata</em> and <em>kumite</em>,
            building toward provincial and national standards — in a welcoming, family environment.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/contact" className="btn-primary" aria-label="Contact us about classes">
              Start Your Trial
            </Link>
            <a
              href="#programs"
              className="inline-flex items-center rounded-md border border-steel/40 px-4 py-2 text-sm"
            >
              View Programs
            </a>
          </div>
        </div>
      </header>

      {/* Pricing stripe (kept simple; removed family discount) 
      <section className="border-b border-steel/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-8 grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-steel/40 px-4 py-3 text-center">
            <p className="text-lg font-bold">Simple Monthly</p>
            <p className="text-primary/80 text-sm">No long contracts • Easy to start</p>
          </div>
          <div className="rounded-md border border-steel/40 px-4 py-3 text-center">
            <p className="text-lg font-bold">Transparent Pricing</p>
            <p className="text-primary/80 text-sm">All fees listed below</p>
          </div>
        </div>
      </section>*/}

      {/* Programs grid */}
      <section id="programs" className="section-y">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-secondary uppercase tracking-[0.2em] text-xs md:text-sm">Programs</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold uppercase tracking-[0.02em]">
                Find Your Track
              </h2>
            </div>
            <Link to="/contact" className="btn-primary" aria-label="Contact us to join a program">
              Join Now
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {programs.map((p) => (
              <li
                key={p.name}
                className="rounded-lg border border-steel/40 bg-black/20 overflow-hidden"
              >
                {/* Media */}
                <figure className="relative aspect-[16/9]">
                  <img
                    src={p.photo}
                    alt={`${p.name} — ${p.age}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle overlay for text separation downstream */}
                  <span className="absolute inset-0 bg-black/20" aria-hidden="true" />
                </figure>

                {/* Content */}
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded px-2 py-1 text-xs border border-steel/40">
                      {p.age}
                    </span>
                    <span className="inline-flex items-center rounded px-2 py-1 text-xs border border-steel/40">
                      {p.level}
                    </span>
                    {p.badges?.slice(0, 2).map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center rounded px-2 py-1 text-xs border border-steel/40"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <h3 className="mt-3 text-lg font-bold uppercase tracking-[0.02em]">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-primary">{p.blurb}</p>

                  {/* Schedule chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.schedule.map((slot) => (
                      <span
                        key={slot}
                        className="rounded-md border border-steel/40 px-2 py-1 text-xs"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="text-primary">
                      <span className="text-xl font-bold">{p.price}</span>
                    </div>
                    <Link
                      to="/contact"
                      className="btn-primary"
                      aria-label={`Enroll in ${p.name}`}
                    >
                      Try A Class
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Notes */}
          <p className="mt-6 text-xs text-secondary">
            Schedule may adjust during holidays and tournament travel. We’ll always confirm by email and on the{" "}
            <Link to="/calendar" className="underline decoration-accent/70 underline-offset-4">
              calendar
            </Link>.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-steel/40">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <div className="rounded-lg border border-steel/40 bg-black/20 px-6 py-8 md:px-10 md:py-12">
            <div className="grid gap-6 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.02em]">
                  Book your first class
                </h2>
                <p className="mt-3 text-primary">
                  Bring water and a positive attitude — we’ll handle the rest. Friendly intro, real training.
                </p>
              </div>
              <div className="md:justify-self-end">
                <Link to="/contact" className="btn-primary" aria-label="Go to contact page to book a class">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-secondary">
            Need policies or grading info? Visit{" "}
            <Link to="/karate-info" className="underline decoration-accent/70 underline-offset-4">
              Karate Info
            </Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
