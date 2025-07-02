
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1544737151-6e4b0f4b7e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            ALLISON HEIGHTS
            <span className="block text-red-500">KARATE</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Building Champions Through Discipline, Respect, and Excellence
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Link to="/classes">Start Training</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              At Allison Heights Karate, we develop strong minds, bodies, and character through traditional martial arts training. 
              Our competitive program builds champions while instilling lifelong values of respect, discipline, and perseverance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">🥋</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Excellence</h3>
                <p className="text-gray-300">
                  Striving for perfection in technique, form, and competitive performance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Competition</h3>
                <p className="text-gray-300">
                  Training champions for local, regional, and national tournaments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Community</h3>
                <p className="text-gray-300">
                  Building a supportive family environment for students of all ages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-8 text-red-100">
            Join our community of martial artists and discover your potential.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Link to="/classes">View Classes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
