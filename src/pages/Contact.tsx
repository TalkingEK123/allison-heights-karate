
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add form handling logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your karate journey? Get in touch with us to schedule a trial class or ask any questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                action="https://formspree.io/f/xyzppkve"  
                method="POST"
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-white">Age (if student)</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Tell us about your karate goals, experience level, or any questions you have..."
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>

          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Dojo Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Address:</h4>
                  <p className="text-gray-300">
                    20 Karolie Rd, <br />
                    Riverview, NB E1B 1R1
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Phone:</h4>
                  <p className="text-gray-300">1(506) 295-3889</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Email:</h4>
                  <p className="text-gray-300">info@allisonheightskarate.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Training Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday, Thursday, Friday :</span>
                    <span className="text-white">6:00 PM - 8:15 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Trial Class</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  New students can try their first class for FREE! Come experience our training 
                  environment and meet our team.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    No equipment needed for trial
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Wear comfortable athletic clothes
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Arrive 10 minutes early
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Our Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <iframe
                  title="Allison Heights Karate Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11061.47373741081!2d-64.7999!3d46.0529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ca0b9a661ffdd23%3A0x6a4b45f9b9a4f6e2!2s20%20Karolie%20Rd%2C%20Riverview%2C%20NB%20E1B%201R1!5e0!3m2!1sen!2sca!4v1693320011100!5m2!1sen!2sca"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-lg"
                ></iframe>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
