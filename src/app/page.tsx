import { Suspense } from "react";
import Image from "next/image";
import Hero from "../app/herosection/page";
import About from "../app/about/page";
import Blogs from "../app/components/blog/BlogCard";
import Course from "../app/components/courses/courseCard";
import FeaturedBooks from "../app/components/books/FeaturedBooks";
import { fetchWithCache } from "../lib/api";
import { endpoints } from "../lib/config";
import { Blog, Course as CourseType } from "../lib/types";

async function fetchBlogsData(): Promise<Blog[]> {
  try {
    const data = await fetchWithCache<Blog[]>(endpoints.blogs);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

async function fetchCourseData(): Promise<CourseType[]> {
  try {
    const data = await fetchWithCache<CourseType[]>(endpoints.courses);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export default async function HomePage() {
  const [blogs, courses] = await Promise.all([
    fetchBlogsData(),
    fetchCourseData()
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />

      {/* Courses Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
        
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
              <span className="ml-4 text-gray-600 font-medium">Loading courses...</span>
            </div>
          }>
            <Course courses={courses} showAll={false} />
          </Suspense>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-8">
              🏛️ Campus Life
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Beautiful Campus</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience our vibrant Islamic learning environment and spiritual atmosphere
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Main Prayer Hall", desc: "Sacred space for worship", icon: "🕌" },
              { title: "Library", desc: "Knowledge and wisdom", icon: "📚" },
              { title: "Garden", desc: "Peaceful learning environment", icon: "🌿" },
              { title: "Classrooms", desc: "Modern learning spaces", icon: "🏫" },
              { title: "Courtyard", desc: "Community gathering area", icon: "🏛️" },
              { title: "Study Rooms", desc: "Quiet reflection spaces", icon: "📖" }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="aspect-square bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-8">
              💬 Student Voices
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from our community about their transformative learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Hassan",
                role: "Graduate",
                text: "Anwarul Uloom provided me with authentic Islamic knowledge and a strong moral foundation that guides me in every aspect of life.",
                avatar: "AH"
              },
              {
                name: "Fatima Ali",
                role: "Current Student",
                text: "The teachers here are incredibly knowledgeable and caring. I've grown both spiritually and academically in ways I never imagined.",
                avatar: "FA"
              },
              {
                name: "Omar Khan",
                role: "Parent",
                text: "My children have flourished here. The Islamic values and education they receive are exceptional and truly life-changing.",
                avatar: "OK"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-amber-600 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-8">
              📅 Upcoming Events
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Participate in spiritual gatherings and educational programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Annual Islamic Conference",
                date: "December 15, 2024",
                time: "9:00 AM - 6:00 PM",
                description: "Join scholars and students for a day of learning and spiritual growth",
                icon: "🎓"
              },
              {
                title: "Weekly Quran Recitation",
                date: "Every Friday",
                time: "After Asr Prayer",
                description: "Beautiful Quran recitation and tafseer sessions for all ages",
                icon: "📖"
              },
              {
                title: "Youth Leadership Program",
                date: "Monthly",
                time: "2:00 PM - 5:00 PM",
                description: "Special programs designed to develop young Muslim leaders",
                icon: "🌟"
              }
            ].map((event, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-4xl mb-4">{event.icon}</div>
                <div className="text-amber-600 font-bold mb-2">{event.date}</div>
                <div className="text-gray-500 text-sm mb-4">{event.time}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-24 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 text-white text-sm font-semibold rounded-full mb-8 backdrop-blur-sm">
            💝 Support Our Mission
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">Help Us Continue Our Work</h2>
          <p className="text-xl text-amber-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your generous support helps us provide authentic Islamic education to future generations and maintain our beautiful campus
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { amount: "$50", period: "Monthly Support", desc: "Help a student monthly" },
              { amount: "$100", period: "Quarterly Donation", desc: "Support our programs" },
              { amount: "$500", period: "Annual Contribution", desc: "Transform lives yearly" }
            ].map((tier, index) => (
              <div key={index} className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="text-4xl font-bold text-white mb-2">{tier.amount}</div>
                <div className="text-amber-100 font-semibold mb-2">{tier.period}</div>
                <div className="text-amber-200 text-sm">{tier.desc}</div>
              </div>
            ))}
          </div>
          
          <button className="px-10 py-4 bg-white text-amber-600 font-bold text-lg rounded-2xl hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Donate Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-8">
              📞 Get In Touch
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Reach out for more information about our programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
              <div className="space-y-6">
                {[
                  { icon: "📍", title: "Address", info: "123 Islamic Center, Karachi, Pakistan" },
                  { icon: "📞", title: "Phone", info: "+92 21 1234 5678" },
                  { icon: "✉️", title: "Email", info: "info@anwarululoom.edu.pk" },
                  { icon: "🕒", title: "Hours", info: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                      <span className="text-2xl">{contact.icon}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{contact.title}</div>
                      <div className="text-gray-600">{contact.info}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Send Message</h3>
              <div className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-600 transition-colors text-lg"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-600 transition-colors text-lg"
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={5}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-amber-600 transition-colors text-lg resize-none"
                ></textarea>
                <button className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-lg rounded-2xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
