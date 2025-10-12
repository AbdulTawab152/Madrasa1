import { Suspense, lazy } from "react";
import Hero from "../app/herosection/page";
import About from "./components/about/page";
import Blogs from "../app/components/blog/BlogCard";
import Course from "../app/components/courses/courseCard";
import Link from "next/link";
import Contact from "../app/components/contact/ContactForm"

// Lazy load heavy components
const LazyEventSection = lazy(() => import("./components/LazyEventSection"));
const GraduationsSection = lazy(
  () => import("./components/graduation/TopGraduations.tsx")
);
const LazyGallerySection = lazy(
  () => import("./components/LazyGallerySection")
);
const BooksSection = lazy(() => import("./components/books/BooksSection"));

// import { ArticlesApi } from "../lib/api"; // move your fetch function to lib
// import ArticlesList from "./components/Articles";

// Removed getImages function - now handled by LazyGallerySection

import { CoursesApi, extractArray } from "../lib/api";
import { Course as CourseType } from "../lib/types";

async function fetchCourseData(): Promise<CourseType[]> {
  try {
    const response = await CoursesApi.getAll();
    if (!response.success) {
      throw new Error(response.error || "Failed to load courses");
    }

    return extractArray<CourseType>(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default async function HomePage() {
  // Only fetch essential data for initial page load
  const courses = await fetchCourseData();
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
     



      {/* Courses Section */}
      <section className="py-6 bg-gradient-to-b from-gray-50 to-white">
    


        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Simple Hero Text */}
          <div className="mb-8">
            <p className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
              Explore Knowledge
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Our <span className="text-amber-600">Popular Courses</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto sm:text-sm">
              Discover our most popular courses, designed to provide authentic Islamic knowledge rooted in the{" "}
              <span className="font-semibold text-amber-700">Qur'an</span> and{" "}
              <span className="font-semibold text-amber-700">Sunnah</span>.
            </p>
          </div>

          {/* Simple Courses Section */}
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Loading courses...</span>
                </div>
              }
            >
              <div className="relative">
                <Course courses={courses} showAll={false} />

                {/* Simple Call to Action */}
                <div className="mt- text-center">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <span>View All Courses</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      {/* gragurtion */}

      {/* Events Section - Lazy Loaded */}
      <section className="py-10 ">
        <div className="max-w-7xl mx-auto px-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                <span className="ml-4 text-gray-600 font-medium">
                  Loading events...
                </span>
              </div>
            }
          >
            <LazyEventSection />
          </Suspense>
        </div>
      </section>

      {/* Books */}

      <section className="relative py-12 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Simple Hero Text */}
          <div className="mb-8">
            <p className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-4">
              Explore Knowledge
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our <span className="text-amber-600">Books</span>
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Rooted in the{" "}
              <span className="font-semibold text-amber-700">Qur'an</span> and{" "}
              <span className="font-semibold text-amber-700">Sunnah</span>, our
              books provide authentic Islamic knowledge.
            </p>
          </div>

          {/* Simple Books Section */}
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Loading books...</span>
                </div>
              }
            >
              <div className="relative">
                <BooksSection showAll={false} />

                {/* Simple Call to Action */}
                <div className="mt-8 text-center">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <span>View All Books</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Gallery - Lazy Loaded */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 font-medium">
              Loading gallery...
            </span>
          </div>
        }
      >
        <LazyGallerySection />
      </Suspense>

      {/* gragutaion */}

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        {/* Animated Gradient Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse z-0" />
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e42' fill-opacity='0.08'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          {/* Hero Text */}
          <div className="mb-14">
            <div className="inline-flex items-center px-5 py-2 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-6 shadow-sm animate-fade-in">
              🎓 Celebrating Success
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight animate-fade-in-up">
              Our{" "}
              <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 bg-clip-text text-transparent">
                Graduates
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-100">
              Highlighting the achievements and journeys of students who have
              successfully completed their courses{" "}
              <span className="inline-block animate-bounce">🌟</span>
            </p>
          </div>
          {/* Graduates Section */}
          <div className="mt-12 relative">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-16">
                  <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                  <span className="ml-4 text-gray-600 font-medium">
                    Loading graduates...
                  </span>
                </div>
              }
            >
              <div className="animate-fade-in-up">
                <GraduationsSection showAll={false} />
              </div>
              {/* Call to Action */}
               <div className="mt-10 text-center">
                  <Link
                    href="/graduated-students"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <span>View All Graduation</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
            </Suspense>
          </div>
        </div>
      </section>

      {/* blogs Section */}
   

 <section className="relative py-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
  {/* Animated Gradient Blobs */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse z-0" />
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse z-0" />

  {/* Subtle Pattern Overlay */}
  <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e42' fill-opacity='0.08'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z'/%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  </div>

  <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
    {/* Hero Text */}
    <div className="mb-14">
      <div className="inline-flex items-center px-5 py-2 bg-orange-100 text-orange-700 text-sm font-semibold rounded-full mb-6 shadow-sm animate-fade-in">
        📝 Read Our Blog
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 leading-tight animate-fade-in-up">
        Explore Our{" "}
        <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 bg-clip-text text-transparent">
          Blog
        </span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light animate-fade-in-up delay-100">
        Discover the latest articles, insights, and stories from our students{" "}
        <span className="inline-block animate-bounce">🌟</span>
      </p>
    </div>

    {/* Blog Section */}
    <div className="mt-12 relative">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-16">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 font-medium">
              Loading blog posts...
            </span>
          </div>
        }
      >
        <div className="animate-fade-in-up">
          <Blogs limit={3} homePage={true} />
        </div>
         <div className="mt-4 text-center">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <span>View All Blogs</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
      </Suspense>
    </div>
  </div>
</section>

        
  

    

      {/* Donation Section */}
      <section className="py-16 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          <div className="inline-flex items-center px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full mb-4 backdrop-blur-sm">
            💝 Support Our Mission
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Help Us Continue Our Work
          </h2>
          <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
            Your generous support helps us provide authentic Islamic education
            to future generations and maintain our beautiful campus
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                amount: "$50",
                period: "Monthly Support",
                desc: "Help a student monthly",
              },
              {
                amount: "$100",
                period: "Quarterly Donation",
                desc: "Support our programs",
              },
              {
                amount: "$500",
                period: "Annual Contribution",
                desc: "Transform lives yearly",
              },
            ].map((tier, index) => (
              <div
                key={`tier-${tier.amount}-${index}`}
                className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl font-bold text-white mb-2">
                  {tier.amount}
                </div>
                <div className="text-amber-100 font-semibold mb-2">
                  {tier.period}
                </div>
                <div className="text-amber-200 text-sm">{tier.desc}</div>
              </div>
            ))}
          </div>

          <button className="px-6 py-3 bg-white text-amber-600 font-semibold text-sm rounded-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Donate Now
          </button>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full mb-4">
              📞 Get In Touch
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out for more information about
              our programs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Address",
                    info: "123 Islamic Center, Karachi, Pakistan",
                  },
                  { icon: "📞", title: "Phone", info: "+92 21 1234 5678" },
                  {
                    icon: "✉️",
                    title: "Email",
                    info: "info@anwarululoom.edu.pk",
                  },
                  {
                    icon: "🕒",
                    title: "Hours",
                    info: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
                  },
                ].map((contact, index) => (
                  <div
                    key={`contact-${contact.title}-${index}`}
                    className="flex items-center"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                      <span className="text-2xl">{contact.icon}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {contact.title}
                      </div>
                      <div className="text-gray-600">{contact.info}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send Message
              </h3>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-600 transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-600 transition-colors text-sm"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-amber-600 transition-colors text-sm resize-none"
                ></textarea>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold text-sm rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 transform hover:scale-105 shadow-md">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
