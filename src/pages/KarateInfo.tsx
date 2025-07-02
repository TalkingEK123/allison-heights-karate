
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KarateInfo = () => {
  const beltRequirements = [
    {
      belt: "White to Yellow",
      techniques: ["Basic stances", "Front punch", "Rising block", "Heian Shodan kata"],
      sparring: "Light contact introduction",
      time: "3-4 months"
    },
    {
      belt: "Yellow to Orange",
      techniques: ["Side kick", "Roundhouse kick", "Knife hand strike", "Heian Nidan kata"],
      sparring: "Controlled contact sparring",
      time: "4-5 months"
    },
    {
      belt: "Orange to Green",
      techniques: ["Back kick", "Hook punch", "Elbow strikes", "Heian Sandan kata"],
      sparring: "Free sparring basics",
      time: "5-6 months"
    },
    {
      belt: "Green to Blue",
      techniques: ["Advanced combinations", "Throws", "Joint locks", "Heian Yondan kata"],
      sparring: "Intermediate free sparring",
      time: "6-8 months"
    },
    {
      belt: "Blue to Brown",
      techniques: ["Weapon defense", "Advanced kata", "Teaching basics", "Heian Godan kata"],
      sparring: "Advanced sparring techniques",
      time: "8-12 months"
    },
    {
      belt: "Brown to Black",
      techniques: ["Master all previous", "Create own kata", "Demonstrate teaching", "Board breaking"],
      sparring: "Expert level sparring",
      time: "12-18 months"
    }
  ];

  const gearList = [
    { item: "Karate Gi (Uniform)", required: true, description: "Traditional white karate uniform" },
    { item: "Belt", required: true, description: "Appropriate rank belt" },
    { item: "Sparring Gloves", required: false, description: "For controlled sparring practice" },
    { item: "Shin Guards", required: false, description: "Protection during kicking drills" },
    { item: "Mouth Guard", required: false, description: "Required for tournament competition" },
    { item: "Headgear", required: false, description: "For competitive sparring" },
    { item: "Groin Protection", required: false, description: "Recommended for male students" },
    { item: "Weapons", required: false, description: "Bo staff, nunchucks (advanced students)" }
  ];

  const dojoRules = [
    "Bow when entering and leaving the dojo",
    "Remove shoes before stepping on the training mat",
    "Address all instructors as 'Sensei' or 'Sir/Ma'am'",
    "No talking during instruction",
    "Keep fingernails short and clean",
    "No jewelry during training",
    "Arrive on time and ready to train",
    "Show respect to all students and instructors",
    "Keep your gi clean and properly tied",
    "No food or drinks on the training mat",
    "Cell phones must be off during class",
    "Always give your best effort"
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">Karate Information</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about belt requirements, gear, and dojo etiquette at Allison Heights Karate.
          </p>
        </div>

        <Tabs defaultValue="belts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-8">
            <TabsTrigger value="belts" className="data-[state=active]:bg-red-600">Belt Requirements</TabsTrigger>
            <TabsTrigger value="gear" className="data-[state=active]:bg-red-600">Gear Checklist</TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-red-600">Dojo Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="belts">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-white mb-8">Belt Grading Requirements</h2>
              {beltRequirements.map((requirement, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-red-400 text-xl">{requirement.belt} Belt</CardTitle>
                    <p className="text-gray-300">Training time: {requirement.time}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3">Required Techniques:</h4>
                        <ul className="space-y-1 text-gray-300">
                          {requirement.techniques.map((technique, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                              {technique}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-3">Sparring Level:</h4>
                        <p className="text-gray-300">{requirement.sparring}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gear">
            <div>
              <h2 className="text-3xl font-bold text-center text-white mb-8">Equipment Checklist</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-4">Required Gear</h3>
                  {gearList.filter(item => item.required).map((item, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 mb-4">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-white mb-2">{item.item}</h4>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Optional Gear</h3>
                  {gearList.filter(item => !item.required).map((item, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 mb-4">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-white mb-2">{item.item}</h4>
                        <p className="text-gray-300 text-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rules">
            <div>
              <h2 className="text-3xl font-bold text-center text-white mb-8">Dojo Etiquette & Rules</h2>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-red-400">Essential Dojo Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {dojoRules.map((rule, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <p className="text-gray-300">{rule}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700 mt-8">
                <CardHeader>
                  <CardTitle className="text-red-400">Respect & Discipline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    At Allison Heights Karate, we maintain a traditional environment built on mutual respect, 
                    discipline, and continuous learning. These rules ensure a safe and productive training 
                    environment for all students.
                  </p>
                  <p className="text-gray-300">
                    Remember: Karate begins and ends with respect. This applies not only in the dojo, 
                    but in all aspects of life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KarateInfo;
