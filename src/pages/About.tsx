
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">About Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the story behind Allison Heights Karate and our commitment to excellence in martial arts training.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2010, Allison Heights Karate began as a small dojo with a big vision: 
                to create a premier martial arts training center that develops both exceptional athletes 
                and outstanding individuals.
              </p>
              <p>
                Our founder, Sensei Master Johnson, brought over 25 years of competitive karate experience 
                to establish a program that balances traditional martial arts values with modern training methods. 
                What started with just 15 students has grown into one of the region's most respected karate schools.
              </p>
              <p>
                Today, we're proud to have produced numerous state and national champions while maintaining 
                our core focus on character development, discipline, and respect.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
              alt="Karate training"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Respect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Honoring instructors, fellow students, and the martial arts tradition through proper etiquette and behavior.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Discipline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Developing self-control, focus, and the commitment to consistent practice and improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Perseverance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Never giving up in the face of challenges, always striving to overcome obstacles and improve.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  Pursuing the highest standards in technique, character, and competitive performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-gray-800 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Our Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">500+</div>
              <div className="text-gray-300">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">150+</div>
              <div className="text-gray-300">Tournament Medals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500 mb-2">25+</div>
              <div className="text-gray-300">Black Belts Awarded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
