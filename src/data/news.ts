// src/data/news.ts
export type NewsTag = "Results" | "Selection" | "Clinic" | "Announcement";

export type NewsItem = {
  id: string;
  title: string;
  date: string;       // ISO
  excerpt: string;
  image: string;      // e.g. /images/news/*.jpg
  tag?: NewsTag;
  href?: string;
  objectPosition?: string;
};

export const CLUB_NEWS: NewsItem[] = [
  {
    id: "n-olyvia-panams-2025",
    title: "Olivya Competes at the 2025 Junior Pan American Championships",
    date: "2025-08-18",
    excerpt:
      "After earning her second silver at the 2025 Nationals in Vancouver, Olivya Kanashiro (13) now takes the continental stage for the second time. She competes for Team Canada at the 2025 Junior Pan American Championships in Asunción, Paraguay (Aug 25–31).",
    image: "/images/news_olyvia_portrait_3x4.webp",
    tag: "Selection",
    objectPosition: "38% 25%", // centers her face in tighter crops
    //href: "/karate-info#club-news"
  },
  {
    id: "n-knb-adp-2025",
    title: "KNB Launches 2025–2026 Athlete Development Program",
    date: "2025-08-22",
    excerpt:
      "Karate New Brunswick announces its updated Athlete Development Program for the 2025–2026 season. The ADP provides a clear pathway for athletes across the province—from dojo training to Team NB and Team Canada standards. Key features include province-wide training, qualification tournaments, sport science support, and more.",
    image: "/images/ADP_Poster.png", // save the provided image here
    tag: "Announcement",
    objectPosition: "38% 42%",
    href: "/docs/knb-adp-2025-2026.pdf",
  },
  // {
  //   id: "n-002",
  //   title: "Podium Finish at the Atlantic Championship",
  //   date: "2025-11-01",
  //   excerpt: "A gritty team performance with multiple medals. Sharp tactics and composure under pressure made the difference.",
  //   image: "/images/news/atlantic-podium.jpg",
  //   tag: "Results",
  // },
  // {
  //   id: "n-003",
  //   title: "High-Performance Kumite Clinic",
  //   date: "2025-10-05",
  //   excerpt: "Fast-paced session on distance control, timing entries, and scoring efficiency against elite opposition.",
  //   image: "/images/news/kumite-clinic.jpg",
  //   tag: "Clinic",
  // },
  // {
  //   id: "n-004",
  //   title: "Fall Session Update",
  //   date: "2025-09-01",
  //   excerpt: "New Friday sparring class added. See schedule for details.",
  //   image: "/images/news/fall-session.jpg",
  //   tag: "Announcement",
  // },
];
