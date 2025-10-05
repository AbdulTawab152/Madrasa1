"use client";

import Image from "next/image";
import Link from "next/link";
import IslamicHeader from "../components/IslamicHeader";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap, Target, Lightbulb, Star, CheckCircle, Quote } from "lucide-react";
import img from "../../../public/1.jpg";

const AboutPage = () => {
  const values = [
    {
      icon: BookOpen,
      title: "Authentic Knowledge",
      description: "Rooted in the Qur'an and Sunnah, ensuring pure Islamic teachings."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Highest standards of Islamic knowledge and moral development."
    },
    {
      icon: Heart,
      title: "Faith & Character",
      description: "Nurturing Islamic values of compassion, respect, and sincerity."
    },
    {
      icon: Users,
      title: "Community",
      description: "Serving Muslim communities with dedication and care."
    }
  ];

  const stats = [
    { icon: Clock, value: "63+", label: "Years" },
    { icon: GraduationCap, value: "500+", label: "Graduates" },
    { icon: Sparkles, value: "100%", label: "Authentic" },
    { icon: Award, value: "50+", label: "Scholars" }
  ];

  const timeline = [
    {
      year: "1961",
      title: "Foundation",
      description: "Established by Maulana Abdul Qadir Sahib"
    },
    {
      year: "1970s",
      title: "Growth",
      description: "First graduates and facility expansion"
    },
    {
      year: "1980s",
      title: "Community Hub",
      description: "Central Islamic education center"
    },
    {
      year: "2000s",
      title: "Modern Era",
      description: "Traditional and contemporary integration"
    },
    {
      year: "2024",
      title: "Future",
      description: "Continuing legacy with innovation"
    }
  ];

  return (
    <div className="bg-white">
      <IslamicHeader 
        pageType="about"
        title="About Anwarul Uloom"
        subtitle="For over six decades, we've been committed to spreading authentic Islamic knowledge and nurturing hearts and minds."
      />
      
      {/* Stats */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-amber-600">Impact</span> in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Six decades of dedicated service to Islamic education and community development
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-amber-200 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-2xl mb-6">
                  <stat.icon className="h-8 w-8 text-amber-600" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-amber-600">Mission</span> & <span className="text-amber-600">Vision</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Guided by our core principles, we strive to create a lasting impact in Islamic education and community development
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                <Target className="h-5 w-5 mr-2" />
                Our Mission
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Spreading <span className="text-amber-600">Authentic Knowledge</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to provide authentic Islamic education rooted in the Qur'an and Sunnah, 
                fostering spiritual growth, moral character, and intellectual excellence.
              </p>
              <div className="space-y-4">
                {["Qur'an & Hadith Studies", "Islamic Jurisprudence", "Arabic Language", "Character Building"].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full border border-amber-200">
                <Lightbulb className="h-5 w-5 mr-2" />
                Our Vision
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Building <span className="text-amber-600">Future Leaders</span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                We envision a world where Islamic knowledge is accessible to all, creating generations 
                of scholars, leaders, and community builders who embody Islamic values.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["Global Reach", "Digital Learning", "Community Service", "Interfaith Dialogue"].map((goal, index) => (
                  <div key={index} className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-center">
                    <div className="text-amber-700 font-semibold text-sm">{goal}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Founder */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Our <span className="text-amber-600">History</span> & <span className="text-amber-600">Founder</span>
            </h2>
            <p className="text-black max-w-2xl mx-auto">
              A journey of faith, knowledge, and community building spanning over six decades
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Founder Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
                <Star className="h-4 w-4 mr-2" />
                Our Founder
              </div>
              <h3 className="text-2xl font-bold text-black">
                Maulana <span className="text-amber-600">Abdul Qadir Sahib</span>
              </h3>
              <p className="text-black leading-relaxed">
                A visionary scholar and dedicated educator, Maulana Abdul Qadir Sahib established 
                Anwarul Uloom in 1961 with a clear vision of providing authentic Islamic education.
              </p>
              <p className="text-black leading-relaxed">
                His deep knowledge of Islamic sciences, combined with his commitment to community 
                service, laid the foundation for what has become one of the region's most respected 
                Islamic educational institutions.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-[300px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={img}
                  alt="Anwarul Uloom building"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-black text-center mb-8">
              Our <span className="text-amber-600">Journey</span> Through Time
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-amber-200"></div>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
                        <div className="text-xl font-bold text-amber-600 mb-2">{item.year}</div>
                        <h4 className="text-lg font-bold text-black mb-2">{item.title}</h4>
                        <p className="text-black text-sm">{item.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-600 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Our <span className="text-amber-600">Core Values</span>
            </h2>
            <p className="text-black max-w-2xl mx-auto">
              These fundamental principles guide our approach to Islamic education
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors border border-amber-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-xl mb-4">
                  <value.icon className="h-8 w-8 text-amber-600" />
                </div>
                <h4 className="text-lg font-bold text-black mb-2">
                  {value.title}
                </h4>
                <p className="text-black text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Our <span className="text-amber-200">Community</span>
          </h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Be part of our legacy of Islamic education and spiritual growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-amber-600 font-medium rounded-md hover:bg-amber-50 transition-colors shadow-sm text-sm"
            >
              Explore Courses
              <svg
                className="ml-2 h-3 w-3"
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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 border border-white text-white font-medium rounded-md hover:bg-white hover:text-amber-600 transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
