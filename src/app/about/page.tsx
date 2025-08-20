"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap } from "lucide-react";
import img from "../../../public/1.jpg";

const About = () => {
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

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6">
            Our Legacy
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-amber-600">Anwarul Uloom</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            For over six decades, we've been committed to spreading authentic Islamic knowledge and nurturing hearts and minds.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
                <stat.icon className="h-8 w-8 text-amber-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Our <span className="text-amber-600">Heritage</span>
            </h3>
            <div className="space-y-6 text-gray-600">
              <p>
                Founded in 1961, Anwarul Uloom has been a beacon of Islamic education for over six decades. 
                We focus on both scholarly excellence and moral upbringing, creating generations of knowledgeable Muslims.
              </p>
              <p>
                We believe education is the foundation of a strong society, and we strive to empower our students 
                with both knowledge and character, preparing them to be leaders in their communities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Learn More
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-3 border border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors"
              >
                Our Courses
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-[500px]">
              <Image
                src={img}
                alt="Anwarul Uloom building"
                className="rounded-2xl object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-100 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-600">Values</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide our approach to Islamic education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-amber-50 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-6">
                <value.icon className="h-8 w-8 text-amber-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h4>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
