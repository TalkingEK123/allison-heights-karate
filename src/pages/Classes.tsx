
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Classes = () => {
  const classes = [
    {
      name: "Karate Foundations",
      age: "Ages 5+",
      schedule: "Monday & Thursday, 6:00–7:00 PM",
      description:
        "A comprehensive class focused on traditional and competitive karate fundamentals. Students build strong foundations in technique, movement, and discipline. Suitable for all levels and a great entry point for new members.",
      level: "All Levels",
      color: "bg-blue-600"
    },
    {
      name: "Performance Karate",
      age: "Ages 10+ (Invitation-Based)",
      schedule: "Monday & Thursday, 7:00–8:00 PM, Fridays, 6:00-8:00 PM",
      description:
        "Intensive training focused on the competitive side of karate. Emphasis on kata, sparring, advanced combinations, tournament prep, and performance under pressure. Designed for dedicated students seeking to compete at a high level.",
      level: "Advanced",
      color: "bg-red-600"
    }
  ];

  const beltLevels = [
    /*{ name: "White Belt", description: "Beginning level - Basic stances and techniques" },
    { name: "Yellow Belt", description: "Basic kata and controlled sparring introduction" },
    { name: "Orange Belt", description: "Intermediate techniques and self-defense" },
    { name: "Green Belt", description: "Advanced kata and sparring combinations" },
    { name: "Blue Belt", description: "Complex techniques and teaching preparation" },
    { name: "Brown Belt", description: "Pre-black belt mastery and leadership" },
    { name: "Black Belt", description: "Mastery level - Continuous learning and teaching" }*/
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">Classes</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find the perfect class for your age and skill level. All classes focus on traditional and competitive karate while building confidence, discipline, and physical fitness.
          </p>
        </div>

        {/* Class Schedule */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Class Schedule</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {classes.map((classItem, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-xl">{classItem.name}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${classItem.color}`}>
                      {classItem.level}
                    </span>
                  </div>
                  <div className="text-red-400 font-medium">{classItem.age}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-1">Schedule:</h4>
                      <p className="text-gray-300">{classItem.schedule}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Description:</h4>
                      <p className="text-gray-300">{classItem.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Belt System */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-white"></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {beltLevels.map((belt, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-red-400 text-lg">{belt.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm text-center">{belt.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-red-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-red-100">
            Contact us today to schedule your first class and begin your karate journey.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-300">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-red-600 hover:bg-gray-300 hover:text-red-600">
              <Link to="/karate-info">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
