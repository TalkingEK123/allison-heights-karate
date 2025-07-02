
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingEvents = [
    {
      date: "March 15, 2024",
      title: "Spring Tournament",
      time: "9:00 AM - 5:00 PM",
      location: "Regional Sports Center",
      type: "Competition"
    },
    {
      date: "March 22, 2024",
      title: "Belt Testing",
      time: "6:00 PM - 8:00 PM",
      location: "Allison Heights Dojo",
      type: "Testing"
    },
    {
      date: "April 5, 2024",
      title: "Self-Defense Seminar",
      time: "2:00 PM - 4:00 PM",
      location: "Allison Heights Dojo",
      type: "Seminar"
    },
    {
      date: "April 12, 2024",
      title: "Parent-Child Training Day",
      time: "10:00 AM - 12:00 PM",
      location: "Allison Heights Dojo",
      type: "Special Event"
    },
    {
      date: "April 20, 2024",
      title: "State Championship",
      time: "8:00 AM - 6:00 PM",
      location: "State University Arena",
      type: "Competition"
    }
  ];

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
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">Calendar</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay up to date with upcoming tournaments, belt testing, seminars, and special events at Allison Heights Karate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calendar Widget */}
          <div className="flex justify-center">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-white">Event Calendar</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-gray-600"
                />
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-white">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                        <p className="text-red-400 font-medium">{event.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Time:</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Location:</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Event Types Legend */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">Event Types</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-center space-x-2 p-4 bg-gray-800 rounded-lg">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-white">Competition</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-gray-800 rounded-lg">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <span className="text-white">Testing</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-gray-800 rounded-lg">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span className="text-white">Seminar</span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-4 bg-gray-800 rounded-lg">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
              <span className="text-white">Special Event</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
