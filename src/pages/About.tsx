
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
                Allison Heights Karate was founded in 2005 by Sensei Emmanuel Leblanc, a decorated athlete who proudly 
                represented New Brunswick and Canada at the highest level. After retiring from competition, he became 
                one of the country’s most respected referees, known for his leadership, integrity, and deep commitment 
                to the growth of martial arts.
              </p>

              <p>
                In 2023, Sensei Leblanc entrusted the dojo to me, one of his longtime students. I continue to compete 
                both nationally and internationally, and I serve on the coaching staff for Team New Brunswick. 
                Over the years, I’ve had the privilege of guiding athletes to the provincial team and the national 
                podium - with a clear goal of helping them succeed on the international stage as well.
              </p>

              <p>
                Our dojo teaches traditional Shotokan karate through the Beaudoin Todokai Canada - Japan Shotokan Karate-Do 
                organization. We blend strong foundational technique with modern competitive training to create an environment 
                that’s disciplined, focused, and welcoming to all levels.
              </p>

              <p>
                Whether you're stepping onto the tatami for the first time or training to compete on the world stage, 
                Allison Heights Karate is a place to build confidence, develop skill, and grow at your own pace - in a 
                supportive and challenging environment.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/images/karate-about.png"
              alt="Karate training"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>
        </div> 

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <Card className="bg-gray-800 border-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Respect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  We treat each other, our instructors, and our art with integrity and humility. 
                  Respect is the foundation of everything we do in and out of the dojo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Discipline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  We show up with focus and commitment, building strong habits through consistent training. 
                  Growth in karate and in life starts with discipline.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Perseverance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  We push through challenges, stay committed when it's hard, and always keep moving forward. 
                  Real progress takes time and effort.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-800">
              <CardHeader>
                <CardTitle className="text-center text-red-500">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">
                  We aim for our best in every class, every technique, and every performance. Excellence 
                  is a habit we build together.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>


        {/* Achievements Section */}
        <div className="bg-gray-800 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-xl font-semibold text-red-500 mb-2">Led by Experience</div>
              <div className="text-gray-300">National-level coaching and active competition experience at the highest level.</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-red-500 mb-2">Tradition Meets Sport</div>
              <div className="text-gray-300">Shotokan roots, modern competitive edge, and a strong team culture.</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-red-500 mb-2">All Ages Welcome</div>
              <div className="text-gray-300">From first-timers to future champions - we support every student’s journey.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
