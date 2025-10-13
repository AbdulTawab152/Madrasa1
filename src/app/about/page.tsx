"use client";
import Image from "next/image";
import Link from "next/link";
import IslamicHeader from "../components/IslamicHeader";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap, Target, Lightbulb, Star, CheckCircle, Quote, Trophy } from "lucide-react";
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
  const subjects = [
    { name: "تجوید", icon: "📖", color: "bg-blue-500" },
    { name: "حفظ", icon: "💎", color: "bg-green-500" },
    { name: "تفسیر", icon: "🔍", color: "bg-purple-500" },
    { name: "حدیث", icon: "📚", color: "bg-amber-500" },
    { name: "فقه", icon: "⚖️", color: "bg-red-500" },
    { name: "اصول الفقه", icon: "📋", color: "bg-indigo-500" },
    { name: "منطق", icon: "🧠", color: "bg-pink-500" },
    { name: "معاني", icon: "💭", color: "bg-teal-500" },
    { name: "صرف", icon: "✍️", color: "bg-orange-500" },
    { name: "نحو", icon: "📝", color: "bg-cyan-500" },
    { name: "حکمت", icon: "🌟", color: "bg-yellow-500" },
    { name: "ریاضي", icon: "🔢", color: "bg-gray-500" },
    { name: "انګلیسي", icon: "🌍", color: "bg-blue-600" },
    { name: "عربي", icon: "🕌", color: "bg-green-600" },
    { name: "فن بیان", icon: "🎤", color: "bg-purple-600" }
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
      title: "اصلي علم",
      description: "د قرآن او سنت پر بنسټ، د پاکو اسلامي تعلیماتو ضمانت."
    },
    {
      icon: Award,
      title: "برترۍ",
      description: "د اسلامي علم او اخلاقي ودې د لوړو معیارونو ساتنه."
    },
    {
      icon: Heart,
      title: "ایمان او څیرې",
      description: "د اسلامي ارزښتونو، د درناوي او صمیمیت روزنه."
    },
    {
      icon: Users,
      title: "ټولنه",
      description: "د مسلمانانو ټولنو ته د وقف او پاملرنې سره خدمت."
    }
  ];

  const stats = [
    { icon: Clock, value: "63+", label: "کلونه" },
    { icon: GraduationCap, value: "500+", label: "فارغان" },
    { icon: Sparkles, value: "100%", label: "اصلي" },
    { icon: Award, value: "50+", label: "علماء" }
  ];

  const timeline = [
    {
      year: "1963",
      title: "لومړی بنسټ",
      description: "شیخ خلیفه صاحب ارغندی د کابل په ارغندي کې لومړی مدرسه جوړه کړه"
    },
    {
      year: "1970s",
      title: "د 30 کلونو تدریس",
      description: "د حدیثو، تفسیر او اسلامي علومو ته وقف تدریس"
    },
    {
      year: "1985",
      title: "هجرت او دوهم بنسټ",
      description: "د هجرت په وخت کې د پاکستان په میرانشاه کې انوارالعلوم جوړ کړ"
    },
    {
      year: "2005",
      title: "بیاځلي بنسټ",
      description: "د شیخ د کورنۍ او شاګردانو لخوا د ارغندي کې مدرسه بیاځلي جوړه شوه"
    },
    {
      year: "2024",
      title: "د میراث دوام",
      description: "د اسلامي تعلیماتو او روحاني لارښوونو کې دوامداره خدمت"
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
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              د اسلامي تعلیماتو مرکز
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              د <span className="text-amber-600">انوارالعلوم</span> په اړه
            </h1>
            <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-6 sm:mb-8"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed">
              شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-amber-700 font-medium mb-4 sm:mb-6">
              مشهور (په ارغندي خلیفه صاحب) قدس الله سره
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed">
              د اسلامي تعلیماتو او روحاني رشد مرکز چې د ۱۹۶۳ کال راهیسې د افغانستان په مختلفو سیمو کې د علم او معرفت د پړاوونو خدمت کوي
            </p>
          </div>

          {/* Stats Section with Background Shapes */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/50">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">زموږ د خدمتونو احصائیه</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">د ۶۳ کلونو د خدمت په ترڅ کې د زموږ د بریاوو لنډه احصائیه</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">63+</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">کلونه خدمت</p>
                <p className="text-xs text-gray-500 mt-1">د ۱۹۶۳ راهیسې</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">700+</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">فارغان</p>
                <p className="text-xs text-gray-500 mt-1">د پنځلسو کلونو په ترڅ کې</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">500-700</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">د کال شاګردان</p>
                <p className="text-xs text-gray-500 mt-1">د لیلي شاګردانو شمیر</p>
              </div>
              
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">50+</h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">علماء</p>
                <p className="text-xs text-gray-500 mt-1">د لوړو درجو څښتنان</p>
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
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-amber-700 font-medium mb-3 sm:mb-4">
                  مشهور (په ارغندي خلیفه صاحب) قدس الله سره
                </p>
                <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                {/* Optionally, add a horizontal image here for more visual */}
                {/* Introduction */}
                <div className="p-3 sm:p-4 md:p-6 rounded-lg">
                  <p className="text-sm sm:text-base md:text-lg font-medium mb-3 sm:mb-4">
                    <strong className="text-amber-700">انوار المشایخ جناب حضرت مولانا مؤید الدین خلیفه صاحب فضل الدین</strong> مشهور په خلیفه صاحب د ارغندی رحمه الله د افغانستان له نومياليو عالمانو او لویو عارفانو څخه ؤ.
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    پلار یې محمد زرين نومېده چې یو نیک خویه او متقی انسان و. نوموړي تقريبا (۶) کاله د خپل کلي په ښوونځي کې ليک لوست زده کړه. بیا ېې د افغانستان په مختلفو ديني مدارسو کې مروجه دينـي عـلـوم سـرته ورسول د تفسیر د زده کړې دپاره د جناب شیخ الحدیث حضرت مولانا عبدالغفار ننگرهاری نوموړي د شیخ الحدیث حضرت مولانـا نـصـير الـدين غرغشتوی قدس سره شاګرد او د غزني په نورالمدارس مدرسه کې شیخ الحديث ؤ.
                  </p>
                </div>

                {/* Education Journey */}
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <div className="w-1.5 sm:w-2 h-4 sm:h-6 bg-amber-500 rounded-full mr-2 sm:mr-3"></div>
                    د علمي سفر کیسه
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base">
                    ده ته ورغی او د تفسیر علم یې ترېنه حاصل کړ بیا د حديثو د زده کړې لپاره کابل ته راغی او د شیخ الحدیث حضرت مولانا سلطان جان صاحب نه يي سند او اجازه د حدیثو واخیسته او په ۱۳۳۶هـ.ش کال د قلعـه جـواد کې د حضرت صاحب د مدرسې نه فارغ شو.
                  </p>
                </div>

                {/* Optionally, add another image between journey */}
                {/* Spiritual Journey */}
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <div className="w-1.5 sm:w-2 h-4 sm:h-6 bg-amber-500 rounded-full mr-2 sm:mr-3"></div>
                    د روحاني سفر کیسه
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base">
                    خليفـه صـاحب قدس الله سره د طـالـب علمـی پـه دوران کی د حضرت نورالمشايخ فضل عمر مجددي قدس الله سره سره بيعت وکړ بیا چی کله حضرت نورالمشایخ صاحب نور الله مرقده وفات شو نو د بیعت تجديد يې له حضرت ضياء المشايخ محمد ابراهیم جان مجددی قدس الله سره وکړ او په ۱۳۴۹هـ.ش کال د علم باطن نه فارغ اود سلوک منازل يې سرته ورسول اود جناب حضرت ضياء المشايخ صاحب په مبارکو لاسونو ورته د خلافت دستار وتړل شـو.
                  </p>
                </div>

                {/* First Madrasa Establishment - inset image on side for more visual */}
                <div className="p-6 rounded-lg flex flex-col lg:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/hero1.jpg"
                      alt="مدرسه ارغندي بنسټ"
                      width={176}
                      height={128}
                      className="rounded-xl w-44 h-32 object-cover shadow-lg border border-amber-100"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-amber-800 mb-4">د ارغندی مدرسې بنسټ اېښودنه</h4>
                    <p className="mb-4">
                      كلـه چې حضرت خلیفه صاحب قدس سره د ظاهري او باطنی علومو څخه فارغ شو نو په تدريس يې شروع وکړه د میدان ولایت د چارکی په مدرسه کې يې څه موده تیره کړه بیاله هغه ځایه د کابل ولایت پغمان ولسوالی برې ارغندۍ د بازید خيلو ته لاړهلته یې په لومړی ځل مدرسه تأسیس کړه:
                    </p>
                    <div className="p-4 rounded-lg text-center mb-4">
                      <p className="text-xl font-bold text-amber-600 mb-1">٦ / ١ / ١٣٨٣ هـ ق</p>
                      <p className="text-lg text-gray-600 mb-1">٨ / ٣ / ١٣٤٢ هـ ش</p>
                      <p className="text-lg text-gray-600">٢٩ / ٥ / ١٩٦٣ م</p>
                    </div>
                    <p>
                      اوهلته يې تقریبا (۳۰) کاله مروجه دینی علوم ، حدیث او تفسیر درس کړل د ليرو لیرو ځایونو څخه به طالبان ورته راتلل او د حديثو د فراغت سند او اجازه بـه یـې ترینه اخیستله د دې ترڅنګ د باطنی علومو طالبانو به يې لاس نیوی کاوه او د سلوک منازل به یې سرته رسول.
                    </p>
                  </div>
                </div>

                {/* Migration Period */}
                <div className="flex flex-col lg:flex-row-reverse gap-6 items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/1.jpg"
                      alt="هجرت دوره خلیفه صاحب"
                      width={176}
                      height={128}
                      className="rounded-xl w-44 h-32 object-cover shadow-lg border border-gray-100"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
                      د هجرت دوره
                    </h4>
                    <p className="mb-4">
                      نوموړي د تره کي د حکومت په دوره کې له خپل ګران هیواد څخه هجرت وکړ او د پاکستان په شمالی وزیرستان میرانشاه کې يې استوګنه غوره کړه د هجرت په ټاټوبي کې يې یوه ستره ديني مدرسه د انوار العلوم الاسلامیة په نامه دوهم ځل په میرانشاه کې په کال:
                    </p>
                    <div className="p-4 rounded-lg text-center mb-4">
                      <p className="text-lg font-bold text-gray-700 mb-1">٦ / ٩ / ١٤٠٥ هـ ق</p>
                      <p className="text-base text-gray-600">۴ / ۳ / ۱۳۶۴ هـ ش</p>
                    </div>
                    <p className="mb-4">
                      جوړه کړه چې په سلګونو طالبانو به په کې ديني علوم زده کول. لنډه دا چې خپـل پـاتـې عـمـر يـې هم د هجرت په کور کې په تدریس ، تبلیغ ، دعوت ، ارشاد او د طريقې په تلقین کې تیر کړ. ډير زیات شمیر مسلمانان د ده له برکته د معنوی فیوضاتو څخه برخمن شول.
                    </p>
                    <p className="mb-4">
                      خليفـه صـاحب د صـوري او معنـوي فضايلو او کمالاتو خاوند و. په صرف ، نحو ، منطق ، ادب ، اصولو ، حدیثو ، تفسیر ، کلام او فقه کې د خپلی زمانې پیاوړی او برلاسی عالم و او زیات شمیر شاگردان یې درلودل په طریقت او معرفت کې د خپلې زمانې بزرگ. د خدای پیژندني په ډیرو اسرارو او رموزو پوه او پرهیز ګاره شخصیت و زیات شمیر مریدان او شاگردان پرې راټول ؤ.
            </p>
          </div>
                </div>

                {/* Death and Legacy */}
                <div className="p-6 rounded-lg flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src="/about2.jpg"
                      alt="خلیفه صاحب په وروستیو کلونو کې"
                      width={128}
                      height={128}
                      className="rounded-xl w-32 h-32 object-cover shadow-md border border-gray-200"
                    />
              </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">د وفات او میراث</h4>
                    <p className="mb-4">
                      حضرت انوار المشائخ خلیفه صاحب ارغندي قدس الله سره، تـه پـه وروستيو کالو کې سخته مريضي ور پېښه شوه او د هماغې مريضي نـه پـه ۱۹۹۵م كـال وفـات شـو او د میرانشاه د شهیدانو په هدیره کې خاورو ته وسپارل شو.
                    </p>
                    <p className="mb-4">
                      وايي چې د ده په جنازه کې په زرګونو مسلمانانو شرکت کړی ؤ چې زياتره يـې عالمان او دينې طالبان ؤ د ده څخه وروسـتـه جنـاب تاج المشائخ خلیفه سـدوزی غریقي صـاحب د ده پـه ځـای کیناست او د ظاهري او باطني علومـو ښـوونه اوروزنه یې طالبانو ته کوله.
                    </p>
                    <p className="italic text-gray-600">
                      تاج المشائخ رحمه الله به ویل چې د ده د مرګ په ورځ یو شخص خوب لیدلی ؤ چې خليفه صاحب ورته وايي: "طالبانه ، مخلصانه ، عاشقانه میرویم - د ده روح دې تر قيـامـتـه ښـاد وي او د ده فيض دې جـاري وي."
                    </p>
                  </div>
                </div>

                {/* Family */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">د کورنۍ پېژندنه</h4>
              <div className="space-y-4">
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2">دوه وروڼه:</h5>
                      <p>• محترم احمدزی - ښو اخلاقوڅښتن اومتقی شخص</p>
                      <p>• جناب تاج المشائخ خلیفه صاحب سدوزی غریقي رحمه الله - د وخت جید عالم، مدرس، پیاوړۍ مجاهد او لـوی عـارف</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 mb-2">پنځه زامن:</h5>
                      <div className="space-y-2 text-sm">
                        <p>• <strong>جناب الحاج قاری صاحب عبدالعلیم فضلي</strong> - د ښواخلاقو څښتن اوزړه سواند شخصیت</p>
                        <p>• <strong>جناب الحاج خلیفه صاحب نعمت الله فضلي</strong> - د قوي عزم خاوند، د تصوف او سلوک په ډګر کې د جناب قطب المشائخ لخوا ورته د خلافت دستار ور په سر کړل شو</p>
                        <p>• <strong>انجینر رحمت الله فضلي</strong> - دحلم او زغم نمونه</p>
                        <p>• <strong>جناب قلب المشائخ الحاج خلیفه صاحب محمدشفیق فضلي</strong> - دام الله حیاته وفیوضاته جید عالم او کامل متبع د شریعت</p>
                      </div>
                    </div>
                  </div>
                    </div>

                {/* Famous Khalifas */}
                <div className="p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">د مشهورو خلیفه ګانو نوملړ</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      "سراج المشائخ خلیفه صاحب احمد ضیا قدس الله سره - میدان وردګو ولایت جغتو ولسوالی",
                      "قطب المشائخ خلیفه صاحب دین محمد قدس الله - پکتیا ولایت زرمت ولسوالی",
                      "جناب أبو الحسن خليفـه صـاحب مشهور په صوفي صاحب - لوګر ولایت",
                      "جناب عبد الستار خلیفه صاحب - د وخت جـيـد عـالـم او لوی روحاني شخصیت - لوګر ولایت",
                      "جناب عبد الرشيد خليفه صاحب - لوګر ولایت",
                      "جناب ملا كل خلیفه صاحب - لوګر ولایت",
                      "جناب نعمت الله خلیفه صاحب - لوګر ولایت",
                      "جناب عثمان غنی خلیفه صاحب - اصلا دغزنی ولایت اندړو ولسوالی، فعلاً دپکتیکا ولایت نکه ولسوالی"
                    ].map((khalifa, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{khalifa}</span>
                  </div>
                ))}
              </div>
            </div>

                {/* Successor Khalifas */}
                <div className="p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">د ځای ناستو خلیفه ګانو نوملړ</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {[
                      "تاج المشائخ خلیفه صاحب سدوزی غریقي رحمه الله",
                      "جناب خلیفه صاحب نعمت الله فضلي حفظه الله",
                      "شمس المشائخ خلیفه صاحب دین محمد حفظه الله",
                      "نجم المشائخ خلیفه صاحب داد محمد نوري حفظه الله",
                      "روح المشائخ خلیفه صاحب عبدالحی فقیرالله حفظه الله",
                      "قطب المشائخ خلیفه صاحب محمد انور ابو زبېرحفظه الله",
                      "محب المشائخ خلیفه صاحب محمد معراج روحاني رحمه الله",
                      "جناب خلیفه صاحب محمد عباس حفظه الله",
                      "فخر المشائخ جناب خلیفه صاحب محمد اکرم خادم حفظه الله",
                      "جناب خلیفه صاحب محمد هاشم حفظه الله",
                      "جناب خلیفه صاحب عزت الله حفظه الله",
                      "جناب خلیفه صاحب عاشق الرحمن حفظه الله",
                      "جناب خلیفه صاحب اسماعیل جان حفظه الله",
                      "جناب خلیفه صاحب سید محمد حفظه الله",
                      "جناب خلیفه صاحب بهادر رحمه الله",
                      "جناب خلیفه صاحب فهیم حفظه الله",
                      "جناب خلیفه صاحب حمید الله حفظه الله",
                      "جناب خلیفه صاحب رسول محمد حفظه الله",
                      "جناب خلیفه صاحب وزیر حفظه الله"
                    ].map((successor, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-amber-600 font-bold text-xs mt-1">{index + 1}.</span>
                        <span className="text-gray-700">{successor}</span>
                  </div>
                ))}
              </div>
            </div>

                {/* Re-establishment */}
                <div className="p-6 rounded-lg flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/about3.jpg"
                      alt="د مدرسې بیا ځلي بنسټ اېښودنه"
                      width={144}
                      height={96}
                      className="rounded-xl w-36 h-24 object-cover shadow-md border border-amber-100"
                    />
          </div>
                  <div>
                    <h4 className="text-xl font-bold text-amber-800 mb-4">د مدرسې بیاځلي بنسټ اېښودنه</h4>
                    <p className="mb-4">
                      دجناب ارغندی خلیفه صاحب کورنی دهجرت له دیارڅخه چې کله بېرته راستنه شوه نو په دوهم ځل یې دکابل پغمان ارغندی بازید خېل سیمه کې دمدرسې بنیاد دجناب تاج المشائخ خلیفه صاحب سدوزی غریقی. او دارغندی خلیفه صاحب د زامنو، علماءو او دمخورو په لاس په تاریخ:
                    </p>
                    <div className="p-4 rounded-lg text-center mb-4">
                      <p className="text-xl font-bold text-amber-600 mb-1">۱۷ / ٦ / ١٤٢٦ هـ ق</p>
                      <p className="text-lg text-gray-600">۱ / ۵ / ١٣٨۴ هـ ش</p>
          </div>
                    <p className="text-center font-medium text-amber-800">
                      کې ښود ل شو. او لله الحمد چې په علمی او روحانی ډګر کې یې خدمات تراوسه لاجاری دی، الله ج دې ترقیامته پورې دا پور نوره روانه بېړی. روانه لری
              </p>
            </div>
              </div>
            </div>
          </div>

            {/* Enhanced Academic Services with Slider */}
            <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">د جامعې علمي خدمتونه</h3>
                  <p className="text-sm sm:text-base text-blue-600 font-medium">د اسلامي او عصري علومو د تدریس مرکز</p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                په نوموړې مدرسه کې د ديني او عصري علومو تدریس په منظم ډول تر سره کېږي، چې مهمې څانګې یې دا دي:
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
                <p className="text-center text-xs sm:text-sm text-gray-600 italic">
                  <span className="font-bold text-blue-600">دغه علوم په درجوي (صنفي) او متفرقه ډول تدریس کېږي.</span>
                </p>
              </div>
            </div>

            {/* Enhanced Teachers Section */}
            <div className="rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">د جامعې مشایخ او استادان</h3>
                  <p className="text-green-600 font-medium">د لوړو علمي درجو څښتنان</p>
        </div>
          </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "خلیفه صاحب محمد شفیق فضلي", title: "حفظه‌الله", type: "خلیفه" },
                  { name: "مفتي صاحب محمد حسن حسان", title: "حفظه‌الله", type: "مفتي" },
                  { name: "مفتي صاحب سیف الرحمن سعید", title: "حفظه‌الله", type: "مفتي" },
                  { name: "الحاج مولوي محمد پزیر فاروقي", title: "حفظه‌الله", type: "مولوي" },
                  { name: "مولوي صاحب محب‌الله", title: "", type: "مولوي" },
                  { name: "مولوي صاحب شفیق الرحمن اخوند زاده", title: "", type: "مولوي" },
                  { name: "مولوي صاحب احمد نبي", title: "", type: "مولوي" },
                  { name: "مولوي صاحب صادق سکندر", title: "", type: "مولوي" },
                  { name: "مولوي صاحب طاهر بلال", title: "", type: "مولوي" },
                  { name: "مولوي صاحب رفیع‌الله ابوالسیف", title: "", type: "مولوي" },
                  { name: "مولوي صاحب محمد شریف عمر فضلي", title: "", type: "مولوي" },
                  { name: "مولوي صاحب ضیاءالله عمري", title: "", type: "مولوي" },
                  { name: "مولوي صاحب سمیع‌الله فهام", title: "", type: "مولوي" },
                  { name: "مولوي صاحب سمیع‌الله راشد", title: "", type: "مولوي" },
                  { name: "قاري صاحب محمد میرویس تحسین", title: "", type: "قاري" },
                  { name: "حافظ صاحب رحمن‌الله قائد", title: "", type: "حافظ" },
                  { name: "حافظ صاحب صدیق‌الله", title: "", type: "حافظ" }
                ].map((teacher, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        teacher.type === 'خلیفه' ? 'bg-amber-500' :
                        teacher.type === 'مفتي' ? 'bg-blue-500' :
                        teacher.type === 'مولوي' ? 'bg-green-500' :
                        teacher.type === 'قاري' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}>
                        <span className="text-white text-sm font-bold">
                          {teacher.type === 'خلیفه' ? 'خ' :
                           teacher.type === 'مفتي' ? 'م' :
                           teacher.type === 'مولوي' ? 'م' :
                           teacher.type === 'قاري' ? 'ق' :
                           'ح'}
                        </span>
                </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-gray-800 leading-tight">
                          {teacher.name}
                </h4>
                        {teacher.title && (
                          <p className="text-xs text-green-600 font-medium mt-1">
                            {teacher.title}
                          </p>
                        )}
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            teacher.type === 'خلیفه' ? 'bg-amber-100 text-amber-700' :
                            teacher.type === 'مفتي' ? 'bg-blue-100 text-blue-700' :
                            teacher.type === 'مولوي' ? 'bg-green-100 text-green-700' :
                            teacher.type === 'قاري' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {teacher.type}
                          </span>
                        </div>
                      </div>
                    </div>
              </div>
            ))}
              </div>
            </div>

            {/* Enhanced Students Section */}
          
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
