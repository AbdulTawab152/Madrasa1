"use client";

import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, Heart, Users, Sparkles, Clock, MapPin } from "lucide-react";
import img from "../../../public/1.jpg";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Islamic Education",
      description:
        "We provide authentic, high-quality Islamic education rooted in the Qur'an and Sunnah."
    },
    {
      icon: Award,
      title: "Excellence in Teaching",
      description:
        "Our madrasa maintains the highest standards of Islamic knowledge and moral development."
    },
    {
      icon: Heart,
      title: "Faith & Morals",
      description:
        "We nurture students with values of compassion, respect, and sincerity."
    },
    {
      icon: Users,
      title: "Community Service",
      description:
        "We serve our local and global Muslim communities with dedication and care."
    }
  ];

  const stats = [
    { icon: Clock, value: "25+", label: "Years of Service" },
    { icon: MapPin, value: "1000+", label: "Graduates" },
    { icon: Sparkles, value: "100%", label: "Authentic Knowledge" },
    { icon: Award, value: "50+", label: "Scholarly Achievements" }
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Background decorative pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%2316a34a%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            About <span className="text-green-600">Madrasa</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 25 years, we’ve been committed to spreading authentic Islamic knowledge. 
            Our journey began with a small group of scholars and has grown into a trusted center 
            of learning for the community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 md:gap-20 items-center mb-20">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Our <span className="text-green-600">Heritage</span>
              </h3>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Our madrasa was founded with a vision to preserve and teach authentic Islamic traditions. 
                  For generations, we have focused on both scholarly excellence and moral upbringing.
                </p>
                <p className="text-lg">
                  We believe education is the foundation of a strong society, and we strive to empower our students 
                  with both knowledge and character.
                </p>
                <p className="text-lg">
                  Today, we combine classical Islamic scholarship with modern teaching methods to prepare students 
                  for leadership in their communities.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                Learn More
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Our Courses
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 w-full h-[500px]">
              <Image
                src={img}
                alt="Madrasa building and students"
                className="rounded-3xl shadow-2xl object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Our <span className="text-green-600">Values</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These guiding principles shape our approach to Islamic education
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
