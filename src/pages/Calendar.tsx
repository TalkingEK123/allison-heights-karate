import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useEffect, useRef, useState } from "react";

type Event = {
  date: string;
  title: string;
  time: string;
  location: string;
  type: string;
};

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events] = useState<Event[]>([
    {
      date: "September 14, 2025",
      title: "Karate New Brunswick Open Team Training",
      time: "9:30 AM - 3:00 PM",
      location: "Kv Karate club",
      type: "Training",
    },
    {
      date: "September 20, 2025",
      title: "Karate New Brunswick Grand Prix",
      time: "9:00 AM - 4:00 PM",
      location: "Tracadie",
      type: "Competition",
    },
    {
      date: "September 14, 2025",
      title: "Karate New  Brunswick open training",
      time: "9:30 AM - 5:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "September 20, 2025",
      title: "Karate New  Brunswick Grand Prix",
      time: "9:30 AM - 5:00 PM",
      location: "Tracadie\, NB\, Canada",
      type: "Competition",
    },
    {
      date: "September 21, 2025",
      title: "Karate New  Brunswick Clinic",
      time: "9:00 AM - 1:00 PM",
      location: "Tracadie\, NB\, Canada",
      type: "Training",
    },
    {
      date: "September 27, 2025",
      title: "Karate New  Brunswick Fitness test CSIA",
      time: "1:00 PM - 5:00 PM",
      location: "Fredericton\, NB\, Canada",
      type: "Testing",
    },
    {
      date: "October 3 - 5, 2025",
      title: "Karate Nova Scotia Kumite clinic (Yevhen)",
      time: "All day",
      location: "Halifax\, NS\, Canada",
      type: "Seminar",
    },
    {
      date: "October 12, 2025",
      title: "Karate New  Brunswick open training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    /*{
      date: "October 25, 2025",
      title: "Clinic/Grading (Denis Beaudoin)",
      time: "10:00 AM - 5:00 PM",
      location: "TBD",
      type: "Training",
    },*/
    {
      date: "November 1, 2025",
      title: "Atlantic Championship",
      time: "All day",
      location: "Moncton\, NB\, Canada",
      type: "Competition",
    },
    {
      date: "November 2, 2025",
      title: "Karate Canada Regional camp",
      time: "9:30 PM - 4:00 PM",
      location: "Moncton\, NB\, Canada",
      type: "Special Event",
    },
    {
      date: "November 16, 2025",
      title: "Karate New  Brunswick open training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "November 22, 2025",
      title: "Karate Nova Scotia Grand Prix",
      time: "9:30 AM - 4:30 PM",
      location: "Spryfield\, Halifax\, NS\, Canada",
      type: "Competition",
    },
    {
      date: "December 14, 2025",
      title: "Karate New  Brunswick Open training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John",
      type: "Training",
    },
    {
      date: "January 18, 2026",
      title: "Karate New  Brunswick open training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "February 7, 2026",
      title: "Karate New  Brunswick Grand Prix",
      time: "9:30 AM - 5:00 PM",
      location: "Moncton\, NB\, Canada",
      type: "Competition",
    },
    {
      date: "February 8, 2026",
      title: "Karate New  Brunswick clinic",
      time: "9:00 AM - 1:00 PM",
      location: "TBD",
      type: "Training",
    },
    {
      date: "March 8, 2026",
      title: "Karate New  Brunswick closed training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "March 22, 2026",
      title: "Karate New  Brunswick closed training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "April 5, 2026",
      title: "Karate New  Brunswick closed training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "April 19, 2026",
      title: "Karate New  Brunswick closed training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "April 26, 2026",
      title: "Karate New  Brunswick closed training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
    {
      date: "May 3, 2026",
      title: "Karate New  Brunswick closed training",
      time: "9:30 AM - 3:00 PM",
      location: "Saint John\, NB\, Canada",
      type: "Training",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);
  const eventRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const selectedStr = date?.toDateString();

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Competition":
        return "bg-red-600";
      case "Testing":
        return "bg-blue-600";
      case "Seminar":
        return "bg-green-600";
      case "Special Event":
        return "bg-purple-600";
      case "Training":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const eventMap = new Map(
    events.map((event) => [new Date(event.date).toDateString(), event])
  );

  const sortedEvents = [...events].sort((a, b) => {
    const aMatch = new Date(a.date).toDateString() === selectedStr;
    const bMatch = new Date(b.date).toDateString() === selectedStr;
    return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
  });

  const modifiers = {
    competitionDay: (day: Date) =>
      eventMap.get(day.toDateString())?.type === "Competition",
    testingDay: (day: Date) =>
      eventMap.get(day.toDateString())?.type === "Testing",
    seminarDay: (day: Date) =>
      eventMap.get(day.toDateString())?.type === "Seminar",
    specialDay: (day: Date) =>
      eventMap.get(day.toDateString())?.type === "Special Event",
    Training: (day: Date) =>
      eventMap.get(day.toDateString())?.type === "Training",
  };

  const modifiersClassNames = {
    selected: "rdp-day_selected",
    today: "border border-white",
    competitionDay: "dot-indicator-red",
    testingDay: "dot-indicator-blue",
    seminarDay: "dot-indicator-green",
    specialDay: "dot-indicator-purple",
    Training: "dot-indicator-orange",
  };

  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    const key = d?.toDateString();
    const match = events.filter((e) => new Date(e.date).toDateString() === key);
    setSelectedDateEvents(match);
    if (match.length > 0) {
      const scrollKey = `${match[0].title}-${match[0].date}`;
      const el = eventRefs.current[scrollKey];
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">Calendar</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay up to date with upcoming tournaments, belt testing, seminars,
            and special events at Allison Heights Karate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar Widget */}
          <div className="flex justify-center">
            <Card className="bg-gray-600 border-gray-700 p-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-white text-xl">
                  Event Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-2">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md border-gray-600"
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                />
                <button
                  onClick={() => setShowModal(true)}
                  className="text-sm mt-1 text-blue-400 hover:underline"
                >
                  View Events on This Day
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Upcoming Events</h2>
            <div className="space-y-4">
              {sortedEvents.map((event, index) => {
                const refKey = `${event.title}-${event.date}`;
                return (
                  <div key={index} ref={(el) => (eventRefs.current[refKey] = el)}>
                    <Card className="bg-gray-800 border-gray-700 hover:border-red-600 transition">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">
                              {event.title}
                            </h3>
                            <p className="text-red-400 font-medium">{event.date}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getEventTypeColor(
                              event.type
                            )}`}
                          >
                            {event.type}
                          </span>
                        </div>
                        <div className="space-y-1 text-gray-300 text-sm">
                          <div className="flex">
                            <span className="font-medium mr-2">Time:</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex">
                            <span className="font-medium mr-2">Location:</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md text-white relative">
            <h3 className="text-xl font-bold mb-4">Events on {selectedStr}</h3>
            {selectedDateEvents.length > 0 ? (
              <ul className="space-y-3">
                {selectedDateEvents.map((event, i) => (
                  <li key={i}>
                    <strong>{event.title}</strong> — {event.time} @ {event.location}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events on this day.</p>
            )}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Dot and calendar styles */}
      <style>{`
        .rdp-day {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          font-weight: 600;
          color: #f1f5f9;
          transition: background-color 0.2s;
          padding: 0.3rem;
        }

        .rdp-day:hover {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 0.375rem;
        }

        .rdp-day_selected {
          background-color: #ef4444 !important;
          color: white !important;
          border-radius: 8px;
        }

        .dot-indicator-red::after,
        .dot-indicator-blue::after,
        .dot-indicator-green::after,
        .dot-indicator-purple::after,
        .dot-indicator-orange::after {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          margin-top: 4px;
        }

        .dot-indicator-red::after {
          background-color: #dc2626;
        }

        .dot-indicator-blue::after {
          background-color: #2563eb;
        }

        .dot-indicator-green::after {
          background-color: #16a34a;
        }

        .dot-indicator-purple::after {
          background-color: #9333ea;
        }
        .dot-indicator-orange::after {
          background-color: #db5d23ff;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
