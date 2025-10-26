"use client";
import Image from "next/image";
import Link from "next/link";
import IslamicHeader from "../components/IslamicHeader";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap, Target, Lightbulb, Star, CheckCircle, Quote, Trophy } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { getLanguageDirection } from '@/lib/i18n';
import { getTranslation } from '@/lib/translations';
import img from "../../../public/1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-all duration-300 group border border-gray-200"
    aria-label="Next slide"
  >
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-blue-600 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-all duration-300 group border border-gray-200"
    aria-label="Previous slide"
  >
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-blue-600 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const AboutPage = () => {
  const { t: tRaw, i18n } = useTranslation('common', { useSuspense: false });
  const isRTL = getLanguageDirection(i18n?.language || 'ps') === 'rtl';
  
  // Create a string-safe wrapper function for string contexts
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };
  
  // Create a function for array contexts
  const tArray = (key: string): string[] => {
    const result = tRaw(key, { returnObjects: true });
    return Array.isArray(result) ? result : [];
  };

  const subjects = [
    { name: t('about.subjects.tajweed'), icon: "📖", color: "bg-blue-500" },
    { name: t('about.subjects.hifz'), icon: "💎", color: "bg-green-500" },
    { name: t('about.subjects.tafsir'), icon: "🔍", color: "bg-purple-500" },
    { name: t('about.subjects.hadith'), icon: "📚", color: "bg-amber-500" },
    { name: t('about.subjects.fiqh'), icon: "⚖️", color: "bg-red-500" },
    { name: t('about.subjects.usulFiqh'), icon: "📋", color: "bg-indigo-500" },
    { name: t('about.subjects.logic'), icon: "🧠", color: "bg-pink-500" },
    { name: t('about.subjects.maani'), icon: "💭", color: "bg-teal-500" },
    { name: t('about.subjects.sarf'), icon: "✍️", color: "bg-orange-500" },
    { name: t('about.subjects.nahw'), icon: "📝", color: "bg-cyan-500" },
    { name: t('about.subjects.hikmat'), icon: "🌟", color: "bg-yellow-500" },
    { name: t('about.subjects.mathematics'), icon: "🔢", color: "bg-gray-500" },
    { name: t('about.subjects.english'), icon: "🌍", color: "bg-blue-600" },
    { name: t('about.subjects.arabic'), icon: "🕌", color: "bg-green-600" },
    { name: t('about.subjects.rhetoric'), icon: "🎤", color: "bg-purple-600" }
  ];

  // Slick Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
  };
  
  const values = [
    {
      icon: BookOpen,
      title: t('about.values.authenticKnowledge'),
      description: t('about.values.authenticKnowledgeDesc')
    },
    {
      icon: Award,
      title: t('about.values.excellence'),
      description: t('about.values.excellenceDesc')
    },
    {
      icon: Heart,
      title: t('about.values.faithAndCharacter'),
      description: t('about.values.faithAndCharacterDesc')
    },
    {
      icon: Users,
      title: t('about.values.community'),
      description: t('about.values.communityDesc')
    }
  ];

  const stats = [
    { icon: Clock, value: "63+", label: t('about.stats.years') },
    { icon: GraduationCap, value: "500+", label: t('about.stats.graduates') },
    { icon: Sparkles, value: "100%", label: t('about.stats.scholars') },
    { icon: Award, value: "50+", label: t('about.stats.scholars') }
  ];

  const timeline = [
    {
      year: "1963",
      title: t('about.timeline.1963'),
      description: t('about.timeline.1963Desc')
    },
    {
      year: "1970s",
      title: t('about.timeline.1970s'),
      description: t('about.timeline.1970sDesc')
    },
    {
      year: "1985",
      title: t('about.timeline.1985'),
      description: t('about.timeline.1985Desc')
    },
    {
      year: "2005",
      title: t('about.timeline.2005'),
      description: t('about.timeline.2005Desc')
    },
    {
      year: "2024",
      title: t('about.timeline.2024'),
      description: t('about.timeline.2024Desc')
    }
  ];

  return (
    <div className="bg-white mt-32">
      {/* Modern Hero Section with Enhanced Background Shapes */}
      <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Enhanced Background Shapes for Mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Primary Shapes */}
          <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full opacity-60"></div>
          <div className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full opacity-50"></div>
          
         
          {/* Small Decorative Elements */}
          {/* <div className="absolute top-1/3 right-1/3 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full opacity-80"></div>
          <div className="absolute bottom-1/3 left-1/3 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl -rotate-12 opacity-60"></div>
           */}
          {/* Additional Mobile-Optimized Shapes */}
          <div className="absolute top-1/2 left-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full opacity-50"></div>
          <div className="absolute top-1/6 right-1/6 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full opacity-70"></div>
          
          {/* New Mobile-Specific Shapes */}
          <div className="absolute top-1/5 left-1/6 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-60"></div>
          <div className="absolute bottom-1/5 right-1/6 w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl rotate-45 opacity-50"></div>
          <div className="absolute top-2/3 left-1/5 w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-100 to-rose-200 rounded-full opacity-70"></div>
          <div className="absolute bottom-1/6 left-1/3 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-100 to-violet-200 rounded-full opacity-60"></div>
          <div className="absolute top-1/8 right-1/4 w-7 h-7 sm:w-11 sm:h-11 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl -rotate-30 opacity-55"></div>
          
          {/* Floating Elements for Mobile */}
            <div className="absolute top-1/2 right-1/5 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-br from-sky-200 to-sky-300 rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute top-3/4 left-1/4 w-3 h-3 sm:w-5 sm:h-5 bg-gradient-to-br from-fuchsia-200 to-fuchsia-300 rounded-full opacity-75 animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-50 text-amber-700 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <BookOpen className={`h-3 w-3 sm:h-4 sm:w-4 ${isRTL ? 'ml-1.5 sm:ml-2' : 'mr-1.5 sm:mr-2'}`} />
              {t('about.subtitle')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight text-center">
              {t('about.title')}
            </h1>
            <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-6 sm:mb-8"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed text-center">
              {t('about.founderTitle')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-amber-700 font-medium mb-4 sm:mb-6 text-center">
              {t('about.founderName')}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed text-center">
              {t('about.founderDescription')}
            </p>
          </div>

          {/* Stats Section with Background Shapes */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/50">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">
                {t('about.stats.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto text-center">
                {t('about.stats.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">63+</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium text-center">{t('about.stats.years')}</p>
                <p className="text-xs text-gray-500 mt-1 text-center">{t('about.stats.since1963')}</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">700+</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium text-center">{t('about.stats.graduates')}</p>
                <p className="text-xs text-gray-500 mt-1 text-center">{t('about.stats.fifteenYears')}</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">500-700</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium text-center">{t('about.stats.students')}</p>
                <p className="text-xs text-gray-500 mt-1 text-center">{t('about.stats.nightStudents')}</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">50+</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium text-center">{t('about.stats.scholars')}</p>
                <p className="text-xs text-gray-500 mt-1 text-center">{t('about.stats.highDegreeHolders')}</p>
              </div>
              </div>
          </div>
        </div>
      </section>

      {/* Academic Services Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
      
          <div className="space-y-8 text-gray-700 leading-relaxed">
            {/* Comprehensive Founder Biography w/ Image */}
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {/* Founder Real Photo (replace src='/images/khalifa-sahib.jpg' with the real path) */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 sm:border-4 border-amber-300 shadow-lg bg-white">
                    <Image
                      src="/about1.jpg"
                      alt="خلیفه صاحب فضل الدین (رح)"
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                      priority
                    />
                    {/* Optionally, BookOpen icon at bottom right of image */}
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border border-white">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>
                  {/* -- or fallback if no image --
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  */}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                  {t('about.biography.introduction')}
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-700 font-medium mb-3 sm:mb-4 text-center">
                  {t('about.founderName')}
                </p>
                <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                {/* Optionally, add a horizontal image here for more visual */}
                {/* Introduction */}
                <div className="p-3 sm:p-4 md:p-6 rounded-lg text-center">
                  <p className="text-sm sm:text-base md:text-lg font-medium mb-3 sm:mb-4 text-center">
                    <strong className="text-amber-700">{t('about.biography.introduction')}</strong>
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-center">
                    {t('about.biography.father')} {t('about.biography.education')}
                  </p>
                </div>

                {/* Education Journey */}
                <div className="text-center">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center">
                    <div className="w-1.5 sm:w-2 h-4 sm:h-6 bg-amber-500 rounded-full mr-2 sm:mr-3"></div>
                    {t('about.biography.educationJourney')}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-center">
                    {t('about.biography.educationJourneyDesc')}
                  </p>
                </div>

                {/* Optionally, add another image between journey */}
                {/* Spiritual Journey */}
                <div className="text-center">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center">
                    <div className="w-1.5 sm:w-2 h-4 sm:h-6 bg-amber-500 rounded-full mr-2 sm:mr-3"></div>
                    {t('about.biography.spiritualJourney')}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-center">
                    {t('about.biography.spiritualJourneyDesc')}
                  </p>
                </div>

                {/* First Madrasa Establishment - inset image on side for more visual */}
                <div className={`p-6 rounded-lg flex flex-col lg:flex-row gap-6 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <Image
                      src="/hero1.jpg"
                      alt={t('about.biography.firstMadrasa')}
                      width={176}
                      height={128}
                      className="rounded-xl w-44 h-32 object-cover shadow-lg border border-amber-100"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-amber-800 mb-4 text-center">{t('about.biography.firstMadrasa')}</h4>
                    <p className="mb-4 text-center">
                      {t('about.biography.firstMadrasaDesc')}
                    </p>
                    <div className="p-4 rounded-lg text-center mb-4">
                      <p className="text-xl font-bold text-amber-600 mb-1">{t('about.biography.firstMadrasaDate')}</p>
                      <p className="text-lg text-gray-600 mb-1">{t('about.biography.firstMadrasaDateShamsi')}</p>
                      <p className="text-lg text-gray-600">{t('about.biography.firstMadrasaDateMiladi')}</p>
                    </div>
                    <p className="text-center">
                      {t('about.biography.firstMadrasaTeaching')}
                    </p>
                  </div>
                </div>

                {/* Migration Period */}
                <div className={`flex flex-col lg:flex-row-reverse gap-6 items-center ${isRTL ? 'lg:flex-row' : ''}`}>
                  <div className="flex-shrink-0">
                    <Image
                      src="/1.jpg"
                      alt={t('about.biography.migration')}
                      width={176}
                      height={128}
                      className="rounded-xl w-44 h-32 object-cover shadow-lg border border-gray-100"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                      <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
                      {t('about.biography.migration')}
                    </h4>
                    <p className="mb-4 text-center">
                      {t('about.biography.migrationDesc')}
                    </p>
                    <div className="p-4 rounded-lg text-center mb-4">
                      <p className="text-lg font-bold text-gray-700 mb-1">{t('about.biography.migrationDate')}</p>
                      <p className="text-base text-gray-600">{t('about.biography.migrationDateShamsi')}</p>
                    </div>
                    <p className="mb-4 text-center">
                      {t('about.biography.migrationTeaching')}
                    </p>
                    <p className="mb-4 text-center">
                      {t('about.biography.migrationLegacy')}
                    </p>
                  </div>
                </div>

                {/* Death and Legacy */}
                <div className={`p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <Image
                      src="/about2.jpg"
                      alt={t('about.biography.death')}
                      width={128}
                      height={128}
                      className="rounded-xl w-32 h-32 object-cover shadow-md border border-gray-200"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">{t('about.biography.death')}</h4>
                    <p className="mb-4 text-center">
                      {t('about.biography.deathDesc')}
                    </p>
                    <p className="mb-4 text-center">
                      {t('about.biography.funeral')}
                    </p>
                    <p className="italic text-gray-600 text-center">
                      {t('about.biography.dream')}
                    </p>
                  </div>
                </div>

                {/* Family */}
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">{t('about.biography.family')}</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2 text-center">{t('about.biography.twoBrothers')}</h5>
                      <p className="text-center">{t('about.biography.brother1')}</p>
                      <p className="text-center">{t('about.biography.brother2')}</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2 text-center">{t('about.biography.fiveSons')}</h5>
                      <div className="space-y-2 text-sm">
                        <p className="text-center">• <strong>{t('about.biography.son1')}</strong></p>
                        <p className="text-center">• <strong>{t('about.biography.son2')}</strong></p>
                        <p className="text-center">• <strong>{t('about.biography.son3')}</strong></p>
                        <p className="text-center">• <strong>{t('about.biography.son4')}</strong></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Famous Khalifas */}
                <div className="p-6 rounded-lg text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">{t('about.biography.famousKhalifas')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {tArray('about.biography.famousKhalifasList').map((khalifa: string, index: number) => (
                      <div key={index} className="flex items-start justify-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-center">{khalifa}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Successor Khalifas */}
                <div className="p-6 rounded-lg text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">{t('about.biography.successorKhalifas')}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {tArray('about.biography.successorKhalifasList').map((successor: string, index: number) => (
                      <div key={index} className="flex items-start justify-center space-x-2">
                        <span className="text-amber-600 font-bold text-xs mt-1">{index + 1}.</span>
                        <span className="text-gray-700 text-center">{successor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Re-establishment */}
                <div className={`p-6 rounded-lg flex flex-col md:flex-row gap-6 items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0">
                    <Image
                      src="/about3.jpg"
                      alt={t('about.biography.reestablishment')}
                      width={144}
                      height={96}
                      className="rounded-xl w-36 h-24 object-cover shadow-md border border-amber-100"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-amber-800 mb-4 text-center">{t('about.biography.reestablishment')}</h4>
                    <p className="mb-4 text-center">
                      {t('about.biography.reestablishmentDesc')}
                    </p>
                    <div className="p-4 rounded-lg text-center mb-4">
                      <p className="text-xl font-bold text-amber-600 mb-1">{t('about.biography.reestablishmentDate')}</p>
                      <p className="text-lg text-gray-600 mb-1">{t('about.biography.reestablishmentDateShamsi')}</p>
                      <p className="text-lg text-gray-600">{t('about.biography.reestablishmentDateMiladi')}</p>
                    </div>
                    <p className="text-center font-medium text-amber-800">
                      {t('about.biography.reestablishmentPrayer')}
                    </p>
                  </div>
                </div>
            </div>
          </div>

            {/* Enhanced Academic Services with Slider */}
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className={`flex items-center mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center ${isRTL ? 'ml-3 sm:ml-4' : 'mr-3 sm:mr-4'}`}>
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('about.academicServices')}</h3>
                  <p className={`text-sm sm:text-base text-blue-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{t('about.academicServicesDesc')}</p>
                </div>
              </div>
              
              <p className={`text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('about.biography.subjectsDescription')}
              </p>
              
              {/* Slick Slider */}
              <div className="relative px-4">
                <Slider {...sliderSettings}>
                  {subjects.map((subject, index) => (
                    <div key={index} className="px-2">
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-100 h-full">
                        <div className="text-center">
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg`}>
                            <span className="text-xl sm:text-2xl md:text-3xl">{subject.icon}</span>
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm md:text-base text-gray-800 leading-tight">{subject.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">د اسلامي علومو څانګه</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
                <p className={`text-center text-xs sm:text-sm text-gray-600 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                  <span className="font-bold text-blue-600">{t('about.biography.subjectsNote')}</span>
                </p>
              </div>
            </div>

            {/* Enhanced Teachers Section */}
            <div className="rounded-2xl p-8">
              <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>{t('about.teachers')}</h3>
                  <p className={`text-green-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>{t('about.teachersDesc')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tArray('about.biography.teachersList').map((teacher: string, index: number) => {
                  const teacherData = teacher.split(' - ');
                  const name = teacherData[0];
                  const title = teacherData[1] || '';
                  const type = name.includes('خلیفه') ? 'خلیفه' : 
                             name.includes('مفتي') ? 'مفتي' : 
                             name.includes('مولوي') ? 'مولوي' : 
                             name.includes('قاري') ? 'قاري' : 'حافظ';
                  return (
                    <div key={index} className="bg-white rounded-xl p-4 hover:bg-gray-50 transition-all duration-300">
                      <div className={`flex items-start ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-3`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          type === 'خلیفه' ? 'bg-amber-500' :
                          type === 'مفتي' ? 'bg-blue-500' :
                          type === 'مولوي' ? 'bg-green-500' :
                          type === 'قاري' ? 'bg-purple-500' :
                          'bg-gray-500'
                        }`}>
                          <span className="text-white text-sm font-bold">
                            {type === 'خلیفه' ? 'خ' :
                             type === 'مفتي' ? 'م' :
                             type === 'مولوي' ? 'م' :
                             type === 'قاري' ? 'ق' :
                             'ح'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm text-gray-800 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                            {name}
                          </h4>
                          {title && (
                            <p className={`text-xs text-green-600 font-medium mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {title}
                            </p>
                          )}
                          <div className="mt-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              type === 'خلیفه' ? 'bg-amber-100 text-amber-700' :
                              type === 'مفتي' ? 'bg-blue-100 text-blue-700' :
                              type === 'مولوي' ? 'bg-green-100 text-green-700' :
                              type === 'قاري' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Students Section */}
          
          </div>
        </div>
      </section>

      {/* Enhanced About Page Content Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
          {/* Short Introduction */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              {t('aboutPage.shortIntroduction')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t('aboutPage.shortIntroduction')}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
            {/* Madrasa Establishment */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">تأسیس مدرسه</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {t('aboutPage.madrasaEstablishment')}
              </p>
            </div>

            {/* After Death */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">د وفات وروسته</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {t('aboutPage.afterDeath')}
              </p>
            </div>
          </div>

          {/* Academic Services */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-100 mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('aboutPage.academicServices')}</h3>
              </div>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                {t('aboutPage.teachingDescription')}
              </p>
            </div>
            
            {/* Subjects Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
              {tArray('aboutPage.subjectsList').map((subject: string, index: number) => (
                <div key={index} className="group text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-amber-50 hover:to-amber-100 transition-all duration-300 border border-gray-200 hover:border-amber-300">
                  <div className={`w-12 h-12 ${subjects[index]?.color || 'bg-gray-500'} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-lg">{subjects[index]?.icon || '📚'}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-amber-800 transition-colors">{subject}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm sm:text-base text-amber-600 font-medium italic">
                {t('aboutPage.teachingMethods')}
              </p>
            </div>
          </div>

          {/* Teachers and Statistics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
            {/* Teachers and Scholars */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('aboutPage.teachersAndScholars')}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tArray('aboutPage.teachersList').slice(0, 8).map((teacher: string, index: number) => {
                  const teacherData = teacher.split(' - ');
                  const name = teacherData[0];
                  const type = name.includes('خلیفه') || name.includes('Khalifa') ? 'خلیفه' : 
                             name.includes('مفتي') || name.includes('Mufti') ? 'مفتي' : 
                             name.includes('مولوي') || name.includes('Maulvi') ? 'مولوي' : 
                             name.includes('قاري') || name.includes('Qari') ? 'قاري' : 'حافظ';
                  return (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        type === 'خلیفه' ? 'bg-amber-500' :
                        type === 'مفتي' ? 'bg-blue-500' :
                        type === 'مولوي' ? 'bg-green-500' :
                        type === 'قاري' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}>
                        <span className="text-white text-xs font-bold">
                          {type === 'خلیفه' ? 'خ' :
                           type === 'مفتي' ? 'م' :
                           type === 'مولوي' ? 'م' :
                           type === 'قاري' ? 'ق' :
                           'ح'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 flex-1">{name}</p>
                    </div>
                  );
                })}
              </div>
              {tArray('aboutPage.teachersList').length > 8 && (
                <div className="text-center mt-4">
                  <span className="text-sm text-gray-500">+ {tArray('aboutPage.teachersList').length - 8} نور</span>
                </div>
              )}
            </div>

            {/* Student Statistics */}
            <div className="space-y-6">
              {/* Admission Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-blue-800">د شاګردانو داخله</h4>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed">{t('aboutPage.admissionDescription')}</p>
              </div>

              {/* Graduates Stats */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-green-800">فارغان</h4>
                </div>
                <p className="text-sm text-green-700 leading-relaxed">{t('aboutPage.graduatesDescription')}</p>
              </div>

              {/* Teacher Qualifications */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-amber-800">{t('aboutPage.teacherQualifications')}</h4>
                </div>
                <p className="text-sm text-amber-700 leading-relaxed">{t('aboutPage.teacherQualificationsDesc')}</p>
              </div>
            </div>
          </div>

          {/* Successor Khalifas */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-100 mb-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mr-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('aboutPage.successorKhalifas')}</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tArray('aboutPage.successorKhalifasList').map((khalifa: string, index: number) => (
                <div key={index} className="group bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 text-center border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <h4 className="font-bold text-sm text-amber-800 group-hover:text-amber-900 transition-colors">{khalifa}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Re-establishment Details */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-amber-200">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mr-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-amber-900">{t('about.biography.reestablishment')}</h3>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-base sm:text-lg text-amber-800 leading-relaxed text-center mb-8">
                {t('aboutPage.reestablishmentDetails')}
              </p>
              
              <div className="bg-white rounded-xl p-6 text-center mb-8 shadow-sm">
                <div className="space-y-2">
                  <p className="text-xl font-bold text-amber-800">{t('aboutPage.reestablishmentDate1')}</p>
                  <p className="text-lg text-amber-700">{t('aboutPage.reestablishmentDate2')}</p>
                </div>
              </div>
              
              <p className="text-base sm:text-lg text-amber-800 font-medium text-center italic leading-relaxed">
                {t('aboutPage.reestablishmentPrayer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-amber-600">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            زموږ <span className="text-amber-200">ټولنې</span> سره یوځای شئ
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-amber-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            زموږ د اسلامي تعلیماتو او روحاني ودې د میراث برخه شئ.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-white text-amber-600 font-medium rounded-md hover:bg-amber-50 transition-colors shadow-sm text-xs sm:text-sm"
            >
              کورسونو ته وګورئ
              <svg
                className="ml-1.5 sm:ml-2 h-3 w-3"
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
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-white text-white font-medium rounded-md hover:bg-white hover:text-amber-600 transition-colors text-xs sm:text-sm"
            >
              اړیکه ونیسئ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
