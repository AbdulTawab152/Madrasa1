"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { getLanguageDirection } from '@/lib/i18n';
import img from "../../../../public/about1.jpg";
import img1 from "../../../../public/about2.jpg";
import img2 from "../../../../public/about3.jpg";
import img3 from "../../../../public/about4.jpg";

const About = () => {
  const { t: tRaw, i18n } = useTranslation('common', { useSuspense: false });
  const isRTL = getLanguageDirection(i18n?.language || 'ps') === 'rtl';
  
  // Create a string-safe wrapper function
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
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
    { icon: Sparkles, value: "800", label: t('about.stats.students') },
    { icon: Award, value: "18+", label: t('about.stats.scholars') }
  ];

  return (
  <section className="py-20 bg-white relative">
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/20 pointer-events-none z-0"></div>
  <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

    {/* Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-5 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6">
        {t('about.subtitle')}
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
        {t('about.title')}
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
        {t('about.description')}
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
          <div className="text-sm text-gray-600 text-center">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Story */}
    <div
  dir="rtl"
  className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 text-justify"
>
  {/* Text Section */}
  <div className="space-y-8">
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug text-center">
      <span className="text-amber-600">{t('about.founderTitle')}</span>
    </h3>
    <h4 className="text-xl font-semibold text-amber-700 text-center">
      {t('about.founderName')}
    </h4>

    {/* Biography Section */}
    <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
      <p>
        <strong>{t('about.biography.introduction')}</strong>
      </p>
      <p>{t('about.biography.father')}</p>
      <p>{t('about.biography.education')}</p>
      <p>{t('about.biography.educationJourneyDesc')}</p>
      <p>{t('about.biography.spiritualJourneyDesc')}</p>
      <p>{t('about.biography.firstMadrasaDesc')}</p>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-center">
        <p className="text-lg font-bold text-amber-600">
          {t('about.biography.firstMadrasaDate')} |{' '}
          {t('about.biography.firstMadrasaDateShamsi')} |{' '}
          {t('about.biography.firstMadrasaDateMiladi')}
        </p>
      </div>

      {/* Mobile Image */}
      <div className="relative w-full mb-8">
        <div className="relative w-full flex lg:hidden h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
          <Image
            src={img}
            alt="شیخ خلیفه صاحب ارغندی (رح) - د انوارالعلوم بنسټګر"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div className="absolute inset-0 rounded-2xl border border-amber-200/50"></div>
        </div>
      </div>

      <p>{t('about.biography.firstMadrasaTeaching')}</p>
      <p>
        {t('about.biography.migrationDesc')} {t('about.biography.migrationDate')} |{' '}
        {t('about.biography.migrationDateShamsi')} |{' '}
        {t('about.biography.migrationDateMiladi')}{' '}
        {t('about.biography.migrationTeaching')}
      </p>
      <p>{t('about.biography.deathDesc')}</p>
      <p>
        {t('about.biography.reestablishmentDesc')}{' '}
        {t('about.biography.reestablishmentDate')} |{' '}
        {t('about.biography.reestablishmentDateShamsi')} |{' '}
        {t('about.biography.reestablishmentDateMiladi')}{' '}
        {t('about.biography.reestablishmentPrayer')}
      </p>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="/about"
        className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
      >
        {t('about.callToAction.viewCourses')}
        <svg
          className={`h-4 w-4 ${isRTL ? 'mr-2' : 'ml-2'}`}
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
        {t('about.callToAction.contactUs')}
      </Link>
    </div>
  </div>

  {/* Media Section */}
  <div className="relative w-full">
    {/* Large Screen Image */}
    <div className="relative w-full mb-8">
      <div className="relative w-full hidden lg:flex h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
        <Image
          src={img2}
          alt="شیخ خلیفه صاحب ارغندی (رح) - د انوارالعلوم بنسټګر"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute inset-0 rounded-2xl border border-amber-200/50"></div>
      </div>
    </div>

    {/* Video Section */}
    <div className="relative w-full mb-8">
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg group">
        <video
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          autoPlay
          muted
          loop
          poster="/about1.jpg"
        >
          <source src="/1.mp4" type="video/mp4" />
          د ویډیو ملاتړ نشته. مهرباني وکړئ د خپل براوزر تازه کړئ.
        </video>

        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Gallery Section */}
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {t('about.biography.gallery')}
        </h3>
        <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[img3, img2, img1, img].map((image, i) => (
          <div key={i} className="relative group">
            <div className="relative w-full h-[120px] sm:h-[140px] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
              <Image
                src={image}
                alt="Gallery Image"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Info Section is deleted */}

  </div>
</div>


    {/* Values */}
    <div className="text-center mb-16">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
        {t('about.values.title')} <span className="text-amber-600">{t('about.values.subtitle')}</span>
      </h3>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed text-center">
        {t('about.values.description')}
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
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center">
            {value.title}
          </h4>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
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
