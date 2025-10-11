"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap } from "lucide-react";
import img from "../../../../public/1.jpg";

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
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    {/* Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-5 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6">
        Our Legacy
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        About <span className="text-amber-600">Anwarul Uloom</span>
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        For over six decades, we've been committed to spreading authentic Islamic knowledge 
        and nurturing hearts and minds.
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-20">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-4 rounded-xl hover:bg-amber-50 transition"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
            <stat.icon className="h-8 w-8 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Story */}
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
      {/* Text */}
      <div className="space-y-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
          Our <span className="text-amber-600">Heritage</span>
        </h3>
        <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
          <p>
            Founded in 1961, Anwarul Uloom has been a beacon of Islamic education for 
            over six decades. We focus on both scholarly excellence and moral upbringing, 
            creating generations of knowledgeable Muslims.
          </p>
          <p>
            We believe education is the foundation of a strong society, and we strive to 
            empower our students with both knowledge and character, preparing them to be 
            leaders in their communities.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          >
            Learn More
            <svg
              className="ml-2 h-4 w-4"
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
            className="inline-flex items-center justify-center px-6 py-3 border border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full">
        <div className="relative w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
          <Image
            src={img}
            alt="Anwarul Uloom building"
            className="rounded-2xl object-cover shadow-lg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            priority
          />
        </div>

        {/* Decorative Circles */}
        <div className="absolute -top-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 bg-amber-200 rounded-full opacity-60 blur-md"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-28 sm:h-28 bg-amber-100 rounded-full opacity-40 blur-sm"></div>
      </div>
    </div>

    {/* Values */}
    <div className="text-center mb-16">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        Our <span className="text-amber-600">Values</span>
      </h3>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        These principles guide our approach to Islamic education
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {values.map((value, index) => (
        <div
          key={index}
          className="text-center p-6 sm:p-8 bg-gray-50 rounded-2xl hover:bg-amber-50 transition-colors shadow-sm"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-2xl mb-6">
            <value.icon className="h-7 w-7 sm:h-8 sm:w-8 text-amber-600" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
            {value.title}
          </h4>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
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
