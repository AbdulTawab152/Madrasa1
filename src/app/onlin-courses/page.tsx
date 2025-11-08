'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaYoutube, 
  FaTelegram, 
  FaWhatsapp, 
  FaTwitter 
} from 'react-icons/fa';
import { 
  Clock, 
  UserRound, 
  ExternalLink,
  Users,
  Video,
  Heart,
  Share2,
  MapPin,
  Phone,
  Mail,
  Building
} from 'lucide-react';
import IslamicHeader from '../components/IslamicHeader';
import { useDirection } from '@/hooks/useDirection';
import Breadcrumb from '@/components/Breadcrumb';

// Static Course Data
const onlineCourses = [
  {
    id: 1,
    title: 'تفسیر القرآن الکریم',
    description: 'د قرآن کریم تفسیر د محترم استاذ په لاس',
    image: '/placeholder-course.jpg',
    duration: '۶ میاشتې',
    lessons: 120,
    instructor: 'محترم استاذ',
    level: 'ټول کچه',
    students: 1500,
    language: 'پښتو'
  },
  {
    id: 2,
    title: 'عربي ژبې کورس',
    description: 'د عربي ژبې اساسي او پرمختللي کورس',
    image: '/placeholder-course.jpg',
    duration: '۴ میاشتې',
    lessons: 80,
    instructor: 'محترم استاذ',
    level: 'پیلونکي',
    students: 2200,
    language: 'پښتو'
  },
  {
    id: 3,
    title: 'فقه اسلامی',
    description: 'د فقه الاسلامي اساسات او جزئیات',
    image: '/placeholder-course.jpg',
    duration: '۸ میاشتې',
    lessons: 150,
    instructor: 'محترم استاذ',
    level: 'ټول کچه',
    students: 1800,
    language: 'پښتو'
  },
  {
    id: 4,
    title: 'حدیث شریف',
    description: 'د احادیث شریفه او د هغوی شرح',
    image: '/placeholder-course.jpg',
    duration: '۵ میاشتې',
    lessons: 100,
    instructor: 'محترم استاذ',
    level: 'منځنۍ کچه',
    students: 1300,
    language: 'پښتو'
  },
  {
    id: 5,
    title: 'سیره النبی',
    description: 'د پیغمبر اکرم صلی الله علیه وسلم ژوند او تاریخ',
    image: '/placeholder-course.jpg',
    duration: '۳ میاشتې',
    lessons: 60,
    instructor: 'محترم استاذ',
    level: 'ټول کچه',
    students: 2000,
    language: 'پښتو'
  },
  {
    id: 6,
    title: 'تصوف او اخلاق',
    description: 'د تصوف اساسات او د اخلاقو زیاتوالی',
    image: '/placeholder-course.jpg',
    duration: '۶ میاشتې',
    lessons: 110,
    instructor: 'محترم استاذ',
    level: 'منځنۍ کچه',
    students: 1600,
    language: 'پښتو'
  },
];

// Social Media Links - د انوارالمشائخ رحمه الله خپرندویه ادارې
const socialMediaLinks = {
  facebook: 'https://www.facebook.com/profile.php?id=100085056932016&mibextid=ZbWKwL',
  youtube: 'https://youtube.com/@Anwar231?si=xp-rKjC7ACzAsyB6',
  telegram: 'https://t.me/+QGCz7NG_fnRlYjVl',
  telegramTranslation: 'https://t.me/+XEVmyCRSSI5iOWI1',
  whatsapp: [
    { name: 'واټساپ لومړی', url: 'https://chat.whatsapp.com/LQYeyCabB1ILZWKLB2h2O2' },
    { name: 'واټساپ دوهم', url: 'https://chat.whatsapp.com/EKk7oSrgNpP2etSthPInpb' },
    { name: 'واټساپ دریم', url: 'https://chat.whatsapp.com/GRGFDzxottaA6GPdwvER6x?mode=ems_copy_t' },
    { name: 'واټساپ څلورم', url: 'https://chat.whatsapp.com/LhpoN8kvoyE9G5vVJKcPcE?mode=ems_copy_t' },
    { name: 'واټساپ پینځم', url: 'https://chat.whatsapp.com/Ci3W7KyPsmIAhcuRGveO7Q?mode=ems_copy_t' },
  ],
  whatsappChannel: 'https://whatsapp.com/channel/0029Va8GAlwIXnlq4oHC6J3q',
  twitter: 'https://twitter.com/khaksarpaktiawa/status/1760494499027931617?t=ep_4SWVp_FHLDvsS2w-cQA&s=19',
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function OnlineCoursesPage() {
  const direction = useDirection();
  const [liked, setLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'آنلاین کورسونه - د انوار العلوم',
          text: 'زموږ آنلاین کورسونو ته وګورئ',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('لینک کاپي شو!');
    }
  };

  return (

    <main className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white" dir={direction}>
      <IslamicHeader
        pageType="courses"
        alignment="center"
      />
      <Breadcrumb />

      {/* Courses Section */}
      <section className="w-full mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              زموږ آنلاین کورسونه
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              د علم او معرفت سفر پیل کړئ زموږ د آنلاین کورسونو سره
            </p>
          </motion.div>

          {/* Courses Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.15 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {onlineCourses.map((course) => (
              <motion.article
                key={course.id}
                variants={cardVariants}
                className="group h-full flex flex-col rounded-3xl border border-gray-200/50 bg-white transition-all duration-200 hover:-translate-y-3 hover:shadow-2xl hover:border-amber-400/50 hover:shadow-amber-100/20"
              >
                {/* Course Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-t-3xl relative">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 90vw"
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-white bg-amber-600/90 px-3 py-1 rounded-full backdrop-blur-sm">
                      {course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <ExternalLink className="h-4 w-4 text-amber-600" />
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="flex-1 flex flex-col gap-3 px-5 py-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-amber-600 transition-colors duration-200">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Course Meta */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-2 rounded-md bg-gray-50/50 px-2 py-1.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600">
                        <Clock className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs font-medium text-gray-700 truncate">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-gray-50/50 px-2 py-1.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600">
                        <Video className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-xs font-medium text-gray-700 truncate">انلاین</span>
                    </div>
                  </div>

                  {/* Instructor & Students */}
                  <div className="flex items-center gap-3 mt-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
                      <UserRound className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{course.instructor}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Users className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{course.students.toLocaleString()} شاګردان</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-3">
                    <a
                      href={`https://wa.me/+93796148087?text=${encodeURIComponent(
                        `Hi! I'm interested in this course:  سلام! زه د «انلاین کورسونو» کې علاقه لرم. کولای شئ ماته د نوم لیکنې، بيې، او د کورس جزییاتو په اړه نور معلومات راکړئ؟?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-2.5 px-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-150 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-500/30 focus:ring-offset-2"
                    >
                      <span className="text-sm">همدا اوس داخله وکړئ</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Like and Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center gap-4 mt-12 mb-8"
          >
            <button
              onClick={handleLike}
              className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-150 ${
                liked
                  ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/50'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-red-300'
              }`}
            >
              <Heart className={`h-5 w-5 transition-all ${liked ? 'fill-current' : ''}`} />
              <span>{liked ? 'ستاسو خوښ شو' : 'خوښ کړئ'}</span>
              {likesCount > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-sm font-bold ${
                  liked ? 'bg-white/30 text-white' : 'bg-red-100 text-red-600'
                }`}>
                  {likesCount}
                </span>
              )}
            </button>

            <button
              onClick={handleShare}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 transition-all duration-150 shadow-lg hover:shadow-xl"
            >
              <Share2 className="h-5 w-5" />
              <span>شیر کړئ</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="w-full bg-[#1A3635] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir={direction}>
        {/* Background Logo */}
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/logo2.png)',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
          />
        </div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              د انوارالمشائخ رحمه الله خپرندویه ادارې ادرسونه
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-2">
              تاسو کولای شئ چې له لاندې ادرسونو څخه زموږ نشرات وڅارئ
            </p>
          </motion.div>

          {/* Social Media Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* Facebook */}
            <motion.a
              href={socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-150 shadow-lg hover:shadow-2xl border border-blue-500/30"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-150">
                <FaFacebook className="text-3xl text-white" />
              </div>
              <span className="text-white font-semibold text-lg">فیسبوک</span>
            </motion.a>

            {/* YouTube */}
            <motion.a
              href={socialMediaLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-150 shadow-lg hover:shadow-2xl border border-red-500/30"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-150">
                <FaYoutube className="text-3xl text-white" />
              </div>
              <span className="text-white font-semibold text-lg">یوټیوب</span>
            </motion.a>

            {/* Twitter */}
            <motion.a
              href={socialMediaLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl hover:from-sky-600 hover:to-sky-700 transition-all duration-150 shadow-lg hover:shadow-2xl border border-sky-400/30"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-150">
                <FaTwitter className="text-3xl text-white" />
              </div>
              <span className="text-white font-semibold text-lg">ټویټر</span>
            </motion.a>

            {/* Telegram Main */}
            <motion.a
              href={socialMediaLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl hover:from-blue-500 hover:to-blue-600 transition-all duration-150 shadow-lg hover:shadow-2xl border border-blue-400/30"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-150">
                <FaTelegram className="text-3xl text-white" />
              </div>
              <span className="text-white font-semibold text-lg">ټیلیګرام</span>
            </motion.a>

            {/* Telegram Translation Channel */}
            <motion.a
              href={socialMediaLinks.telegramTranslation}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-150 shadow-lg hover:shadow-2xl border border-cyan-400/30"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-150">
                <FaTelegram className="text-3xl text-white" />
              </div>
              <span className="text-white font-semibold text-lg text-center">ټیلیګرام د ترجمې چینل</span>
            </motion.a>

            {/* WhatsApp Channel */}
            <motion.a
              href={socialMediaLinks.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-150 shadow-lg hover:shadow-2xl border border-green-400/30"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-150">
                <FaWhatsapp className="text-3xl text-white" />
              </div>
              <span className="text-white font-semibold text-lg text-center">واټساپ چینل</span>
            </motion.a>
          </div>

          {/* WhatsApp Groups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              د WhatsApp ګروپونه
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {socialMediaLinks.whatsapp.map((group, index) => (
                <motion.a
                  key={index}
                  href={group.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center gap-3 p-5 bg-gradient-to-br from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-150 shadow-lg hover:shadow-xl border border-green-500/30"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-150">
                    <FaWhatsapp className="text-xl text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-semibold text-sm block truncate">{group.name}</span>
                    <span className="text-green-100 text-xs">ګروپ</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.2 }}
            className="mt-16 pt-12 border-t border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              د دفتر معلومات
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Address */}
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-150"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">پته</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    کابل، پغمان ولسوالی، ارغندی علیا، د انوار العلوم اسلامي مدرسه
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-150"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">تلیفون</h4>
                  <a 
                    href="tel:+93796148087" 
                    className="text-white/80 text-sm hover:text-white transition-colors block"
                  >
                     796 148 087 93+
                  </a>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-150"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">بریښنالیک</h4>
                  <a 
                    href="mailto:info@anwaraluloom.af" 
                    className="text-white/80 text-sm hover:text-white transition-colors block break-all"
                  >
                    info@anwaraluloom.af
                  </a>
                </div>
              </motion.div>

              {/* Office Hours */}
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-150 sm:col-span-2 lg:col-span-1"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">د کار وخت</h4>
                  <p className="text-white/80 text-sm">
                    شنبه - جمعې: 6:۰۰ بجو - 10:۰۰ بجو
                  </p>
                </div>
              </motion.div>

              {/* Building/Office Name */}
              <motion.div
                whileHover={{ scale: 1.02, y: -3 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-150 sm:col-span-2 lg:col-span-2"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Building className="text-white text-xl" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-2">د انوارالمشائخ رحمه الله خپرندویه اداره</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    د انوار العلوم اسلامي مدرسه د علم، دعوت او خیر خپرولو په برخه کې دنده ترسره کوي
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
