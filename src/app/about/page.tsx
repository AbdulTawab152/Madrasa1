"use client";
import Image from "next/image";
import Link from "next/link";
import IslamicHeader from "../components/IslamicHeader";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap, Target, Lightbulb, Star, CheckCircle, Quote, Trophy } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { getTranslation } from '@/lib/translations';
import img from "../../../public/1.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Breadcrumb from "@/components/Breadcrumb";

// Custom Arrow Components - RTL version (swapped for RTL)
const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-150 group border border-gray-200"
    aria-label="Next slide"
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

const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-all duration-150 group border border-gray-200"
    aria-label="Previous slide"
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

const AboutPage = () => {
  const { t: tRaw, i18n } = useTranslation('common', { useSuspense: false });
  // Always RTL since website only has RTL languages
  const isRTL = true;
  
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

  return (
    <div className="bg-white mt-32">
      <Breadcrumb />
      <section className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-5 py-2 bg-[#e0f2f2] text-[#4a8a8a] rounded-full text-sm font-semibold mb-6 border border-[#d0e8e8]">
              <BookOpen className="h-4 w-4 ml-2" />
              د مدرسې پېژندنه
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight text-center" style={{ fontFamily: 'Amiri, serif' }}>
              د انوارالعلوم اسلامي مدرسې لنډه پېژندنه
            </h1>
            <div className="w-24 h-1 bg-[#4a8a8a] mx-auto rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="max-w-none">
            {/* Founder Biography Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 mb-12 border border-gray-200 shadow-sm">
              <div className="text-center mb-10">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8">
                  <Image
                    src="/about111.jpg"
                    alt="شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full rounded-full border-4 border-[#e0f2f2] shadow-lg"
                    priority
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                  شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)
                </h2>
                <p className="text-lg text-[#4a8a8a] font-medium mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                  مشهور (په ارغندي خلیفه صاحب) قدس الله سره
                </p>
                <div className="w-24 h-1 bg-[#4a8a8a] mx-auto rounded-full"></div>
              </div>

              <div className="space-y-8 text-gray-700 leading-relaxed">
                <div className="bg-[#e0f2f2] rounded-2xl p-6 md:p-8 border border-[#d0e8e8]">
                  <h3 className="text-2xl font-bold text-[#4a8a8a] mb-6 text-center flex items-center justify-center gap-3" style={{ fontFamily: 'Amiri, serif' }}>
                    <div className="bg-[#4a8a8a] rounded-lg p-2 text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    د ژوند لنډه پېژندنه
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-center text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>
                    انوار المشایخ جناب حضرت مولانا مؤید الدین خلیفه صاحب فضل الدین مشهور په خلیفه صاحب د ارغندی رحمه الله د افغانستان له نومياليو عالمانو او لویو عارفانو څخه ؤ. پلار یې محمد زرين نومېده چې یو نیک خویه او متقی انسان و.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 hover:border-[#4a8a8a] transition-all duration-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{ fontFamily: 'Amiri, serif' }}>
                      <div className="bg-[#4a8a8a] rounded-lg p-2 text-white">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      د تعلیم سفر
                    </h4>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>
                      نوموړي تقريبا (۶) کاله د خپل کلي په ښوونځي کې ليک لوست زده کړه. بیا ېې د افغانستان په مختلفو ديني مدارسو کې مروجه دينـي عـلـوم سـرته ورسول د تفسیر د زده کړې دپاره د جناب شیخ الحدیث حضرت مولانا عبدالغفار ننگرهاری نوموړي د شیخ الحدیث حضرت مولانـا نـصـير الـدين غرغشتوی قدس سره شاګرد او د غزني په نورالمدارس مدرسه کې شیخ الحديث ؤ.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 hover:border-[#4a8a8a] transition-all duration-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3" style={{ fontFamily: 'Amiri, serif' }}>
                      <div className="bg-[#4a8a8a] rounded-lg p-2 text-white">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      د حدیثو زده کړه
                    </h4>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>
                      ده ته ورغی او د تفسیر علم یې ترېنه حاصل کړ بیا د حديثو د زده کړې لپاره کابل ته راغی او د شیخ الحدیث حضرت مولانا سلطان جان صاحب نه يي سند او اجازه د حدیثو واخیسته او په ۱۳۳۶هـ.ش کال د قلعـه جـواد کې د حضرت صاحب د مدرسې نه فارغ شو.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3" style={{ fontFamily: 'Amiri, serif' }}>
                    <div className="bg-[#4a8a8a] rounded-lg p-2 text-white">
                      <Heart className="h-5 w-5" />
                    </div>
                    د طریقت سفر
                  </h4>
                  <p className="text-base md:text-lg leading-relaxed text-center text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>
                    خليفـه صـاحب قدس الله سره د طـالـب علمـی پـه دوران کی د حضرت نورالمشايخ فضل عمر مجددي قدس الله سره سره بيعت وکړ بیا چی کله حضرت نورالمشایخ صاحب نور الله مرقده وفات شو نو د بیعت تجديد يې له حضرت ضياء المشايخ محمد ابراهیم جان مجددی قدس الله سره وکړ او په ۱۳۴۹هـ.ش کال د علم باطن نه فارغ اود سلوک منازل يې سرته ورسول اود جناب حضرت ضياء المشايخ صاحب په مبارکو لاسونو ورته د خلافت دستار وتړل شـو.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <Image
                      src="/hero1.jpg"
                      alt="د ارغندی د مدرسې بنسټ"
                      width={600}
                      height={400}
                      className="rounded-2xl w-full h-64 md:h-80 object-cover border border-gray-200"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3" style={{ fontFamily: 'Amiri, serif' }}>
                      <div className="bg-[#4a8a8a] rounded-lg p-2 text-white">
                        <Target className="h-5 w-5" />
                      </div>
                      د ارغندی د مدرسې بنسټ
                    </h4>
                    <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>
                      كلـه چې حضرت خلیفه صاحب قدس سره د ظاهري او باطنی علومو څخه فارغ شو نو په تدريس يې شروع وکړه د میدان ولایت د چارکی په مدرسه کې يې څه موده تیره کړه بیاله هغه ځایه د کابل ولایت پغمان ولسوالی برې ارغندۍ د بازید خيلو ته لاړهلته یې په لومړی ځل مدرسه تأسیس کړه
                    </p>
                    <div className="bg-[#e0f2f2] rounded-xl p-6 text-center border border-[#d0e8e8]">
                      <p className="text-lg font-bold text-[#4a8a8a] mb-3 flex items-center justify-center gap-2" style={{ fontFamily: 'Amiri, serif' }}>
                        <Clock className="h-5 w-5" />
                        ارغندی اول ځل:
                      </p>
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>٦ / ١ / ١٣٨٣ هـ ق</p>
                        <p className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>٨ / ٣ / ١٣٤٢ هـ ش</p>
                        <p className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>٢٩ / ٥ / ١٩٦٣ م</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3" style={{ fontFamily: 'Amiri, serif' }}>
                    <div className="bg-[#4a8a8a] rounded-lg p-2 text-white">
                      <Star className="h-5 w-5" />
                    </div>
                    د هجرت دوره
                  </h4>
                  <p className="text-base md:text-lg leading-relaxed text-center mb-6 text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>
                    نوموړي د تره کي د حکومت په دوره کې له خپل ګران هیواد څخه هجرت وکړ او د پاکستان په شمالی وزیرستان میرانشاه کې يې استوګنه غوره کړه د هجرت په ټاټوبي کې يې یوه ستره ديني مدرسه د انوار العلوم الاسلامیة په نامه دوهم ځل په میرانشاه کې جوړه کړه چې په سلګونو طالبانو به په کې ديني علوم زده کول.
                  </p>
                  <div className="bg-[#e0f2f2] rounded-xl p-6 text-center border border-[#d0e8e8]">
                    <p className="text-lg font-bold text-[#4a8a8a] mb-3 flex items-center justify-center gap-2" style={{ fontFamily: 'Amiri, serif' }}>
                      <Clock className="h-5 w-5" />
                      میرانشاه د مدرسې بنسټ:
                    </p>
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>٦ / ٩ / ١٤٠٥ هـ ق</p>
                      <p className="text-base font-semibold text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>۴ / ۳ / ۱۳۶۴ هـ ش</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-3" style={{ fontFamily: 'Amiri, serif' }}>
                      <div className="bg-[#4a8a8a] rounded-lg p-2 text-white">
                        <Heart className="h-5 w-5" />
                      </div>
                      د وفات او میراث
                    </h4>
                    <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700" style={{ fontFamily: 'Amiri, serif' }}>
                      حضرت انوار المشائخ خلیفه صاحب ارغندي قدس الله سره، ته په وروستيو کالو کې سخته مريضي ور پېښه شوه او د هماغې مريضي نـه پـه ۱۹۹۵م كـال وفـات شـو او د میرانشاه د شهیدانو په هدیره کې خاورو ته وسپارل شو. وايي چې د ده په جنازه کې په زرګونو مسلمانانو شرکت کړی ؤ چې زياتره يـې عالمان او دينې طالبان ؤ.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/about2.jpg"
                      alt="د خلیفه صاحب میراث"
                      width={600}
                      height={400}
                      className="rounded-2xl w-full h-64 md:h-80 object-cover border border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 mb-12 border border-gray-200 shadow-sm">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center mb-6" style={{ fontFamily: 'Amiri, serif' }}>
                د انوارالعلوم اسلامي مدرسه د جناب شیخ القرآن والحدیث حضرت انوارالمشائخ خلیفه صاحب فضل‌الدین ارغندی رحمة‌الله علیه په مبارک لاس د ۱۳۸۳ هـ ق / ۱۳۴۲ هـ ش / ۱۹۶۳ م کال د جوزا په اتمه نېټه د کابل ولایت د پغمان ولسوالۍ د ارغندي علیا په سیمه کې تأسیس شوه.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'Amiri, serif' }}>
                له نوموړي د وفات وروسته، د مدرسې د اهتمام چارې د هغه ورور حضرت تاج‌المشائخ خلیفه صاحب سدوزی غریقي رحمة‌الله علیه ته وسپارل شوې. ورپسې، د تاج‌المشائخ رح له وفات وروسته د مدرسې اداره د حضرت ارغندی خلیفه صاحب د کشر زوی او د تاج‌المشائخ رح وراره حضرت قلب‌المشائخ خلیفه صاحب محمد شفیق فضلي حفظه‌الله تعالی ته وسپارل شوه. نوموړی تر ننه د دې جامعې د علمي او روحاني چارو څارنه کوي او د تصوف څانګه یې په ځانګړي ډول د پام وړ وده کړې ده.
              </p>
            </div>

            {/* Academic Services */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 mb-12 border border-gray-200 shadow-sm">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4a8a8a] rounded-2xl mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                  د جامعې علمي خدمتونه
                </h2>
                <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: 'Amiri, serif' }}>
                  په نوموړې مدرسه کې د ديني او عصري علومو تدریس په منظم ډول تر سره کېږي، چې مهمې څانګې یې دا دي:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mt-8">
                {[
                  { name: 'تجوید', icon: '📖' },
                  { name: 'حفظ', icon: '💎' },
                  { name: 'تفسیر', icon: '🔍' },
                  { name: 'حدیث', icon: '📚' },
                  { name: 'فقه', icon: '⚖️' },
                  { name: 'اصول الفقه', icon: '📋' },
                  { name: 'منطق', icon: '🧠' },
                  { name: 'معاني', icon: '💭' },
                  { name: 'صرف', icon: '✍️' },
                  { name: 'نحو', icon: '📝' },
                  { name: 'حکمت', icon: '🌟' },
                  { name: 'ریاضي', icon: '🔢' },
                  { name: 'انګلیسي', icon: '🌍' },
                  { name: 'عربي', icon: '🕌' },
                  { name: 'فن بیان', icon: '🎤' }
                ].map((subject, index) => (
                  <div key={index} className="text-center p-4 md:p-6 bg-white rounded-xl hover:bg-[#e0f2f2] hover:border-[#4a8a8a] transition-all duration-200 shadow-sm border border-gray-200">
                    <div className="text-4xl md:text-5xl mb-3">{subject.icon}</div>
                    <p className="text-sm md:text-base font-semibold text-gray-800" style={{ fontFamily: 'Amiri, serif' }}>{subject.name}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-base md:text-lg text-gray-600 bg-[#e0f2f2] rounded-xl p-4 inline-block border border-[#d0e8e8]" style={{ fontFamily: 'Amiri, serif' }}>
                  دغه علوم په درجوي (صنفي) او متفرقه ډول تدریس کېږي.
                </p>
              </div>
            </div>

            {/* Teachers Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 mb-12 border border-gray-200 shadow-sm">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4a8a8a] rounded-2xl mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                  د جامعې مشایخ او استادان
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  'خلیفه صاحب محمد شفیق فضلي (حفظه‌الله)',
                  'مفتي صاحب محمد حسن حسان (حفظه‌الله)',
                  'مفتي صاحب سیف الرحمن سعید (حفظه‌الله)',
                  'الحاج مولوي محمد پزیر فاروقي (حفظه‌الله)',
                  'مولوي صاحب محب‌الله',
                  'مولوي صاحب شفیق الرحمن اخوند زاده',
                  'مولوي صاحب احمد نبي',
                  'مولوي صاحب صادق سکندر',
                  'مولوي صاحب طاهر بلال',
                  'مولوي صاحب رفیع‌الله ابوالسیف',
                  'مولوي صاحب محمد شریف عمر فضلي',
                  'مولوي صاحب ضیاءالله عمري',
                  'مولوي صاحب سمیع‌الله فهام',
                  'مولوي صاحب سمیع‌الله راشد',
                  'قاري صاحب محمد میرویس تحسین',
                  'حافظ صاحب رحمن‌الله قائد',
                  'حافظ صاحب صدیق‌الله'
                ].map((teacher, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 md:p-6 hover:bg-[#e0f2f2] hover:border-[#4a8a8a] transition-all duration-200 shadow-sm border border-gray-200">
                    <p className="text-sm md:text-base font-semibold text-gray-800 text-center" style={{ fontFamily: 'Amiri, serif' }}>{teacher}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4a8a8a] rounded-2xl mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Amiri, serif' }}>د شاګردانو داخله</h3>
                </div>
                <p className="text-base md:text-lg text-gray-700 text-center leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                  هر کال شاوخوا ۵۰۰ تر ۷۰۰ پورې لیلي شاګردانو ته داخله ورکول کېږي.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4a8a8a] rounded-2xl mb-4">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Amiri, serif' }}>فارغین</h3>
                </div>
                <p className="text-base md:text-lg text-gray-700 text-center leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                  د تېرو پنځلسو کلونو په ترڅ کې شاوخوا ۷۰۰ تنه فارغین یې د علمي پړاوونو څخه فارغ شوي او ټولنې ته وړاندې شوي دي.
                </p>
              </div>
            </div>

            {/* Family and Successors Section */}
            <div className="bg-gradient-to-br from-indigo-50/50 via-indigo-100/30 to-white rounded-3xl p-6 sm:p-8 md:p-10 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-300/20 rounded-bl-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-tr-full blur-3xl"></div>
              <div className="relative z-10">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-3xl mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent mb-4">
                  د کورنۍ او ځای ناستو پېژندنه
                </h2>
              </div>

              <div className="space-y-8">
                {/* Brothers */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-3">
                    <Users className="h-7 w-7 text-indigo-600" />
                    د ارغندی د خلیفه صاحب وروڼه
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="bg-gradient-to-br from-indigo-50/60 to-indigo-100/40 rounded-xl p-5 md:p-6 hover:scale-105 group transition-all duration-150">
                      <h4 className="font-bold text-indigo-800 mb-3 text-lg group-hover:text-indigo-900 transition-colors">محترم احمدزی</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">ده ښو اخلاقوڅښتن اومتقی شخص وه.</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50/60 to-indigo-100/40 rounded-xl p-5 md:p-6 hover:scale-105 group transition-all duration-150">
                      <h4 className="font-bold text-indigo-800 mb-3 text-lg group-hover:text-indigo-900 transition-colors">جناب تاج المشائخ خلیفه صاحب سدوزی غریقي رحمه الله</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">د ارغندی خلیفه صاحب ورور او په علمي ډګر کې ځای ناستی وو. د وخت جید عالم، مدرس، پیاوړۍ مجاهد او لـوی عـارف وو.</p>
            </div>
            </div>
          </div>

                {/* Sons */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-3">
                    <Users className="h-7 w-7 text-green-600" />
                    د ارغندي خلیفه صاحب پنځه زامن
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-gradient-to-br from-green-50/60 to-green-100/40 rounded-xl p-5 md:p-6 hover:scale-105 group transition-all duration-150">
                      <h4 className="font-bold text-green-800 mb-3 text-base md:text-lg group-hover:text-green-900 transition-colors">جناب الحاج قاری صاحب عبدالعلیم فضلي</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">مشر زوى، د ښواخلاقو څښتن اوزړه سواند شخصیت ده.</p>
                </div>
                    <div className="bg-gradient-to-br from-green-50/60 to-green-100/40 rounded-xl p-5 md:p-6 hover:scale-105 group transition-all duration-150">
                      <h4 className="font-bold text-green-800 mb-3 text-base md:text-lg group-hover:text-green-900 transition-colors">جناب الحاج خلیفه صاحب نعمت الله فضلي</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">د قوي عزم خاوند، د تصوف او سلوک په ډګر کې د جناب قطب المشائخ لخوا ورته د خلافت دستار ور په سر کړل شو.</p>
              </div>
                    <div className="bg-gradient-to-br from-green-50/60 to-green-100/40 rounded-xl p-5 md:p-6 hover:scale-105 group transition-all duration-150">
                      <h4 className="font-bold text-green-800 mb-3 text-base md:text-lg group-hover:text-green-900 transition-colors">انجینر رحمت الله فضلي</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">دحلم او زغم نمونه ده.</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50/60 to-green-100/40 rounded-xl p-5 md:p-6 hover:scale-105 group md:col-span-2 lg:col-span-3 transition-all duration-150">
                      <h4 className="font-bold text-green-800 mb-3 text-base md:text-lg group-hover:text-green-900 transition-colors">جناب قلب المشائخ الحاج خلیفه صاحب محمدشفیق فضلي دام الله حیاته وفیوضاته</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">جید عالم او کامل متبع د شریعت چې ده. جناب تاج المشائخ رحمه الله د وفات څخه وروسته د انوار العلوم اسلامي مدرسې مهتمم شیخ الحدیث او دخلیفه صاحب ځاي ناستي ده، اوس مهال د تصوف اوسلوک په ډګر کې یو لا مثال شخصیت ده.</p>
            </div>
                  </div>
              </div>

                {/* Famous Khalifas */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-3">
                    <Star className="h-7 w-7 text-purple-600" />
                    د ده مشهور خليفه ګان
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {[
                      'سراج المشائخ خلیفه صاحب احمد ضیا قدس الله سره دمیدان وردګو ولایت جغتو ولسوالی',
                      'قطب المشائخ خلیفه صاحب دین محمد قدس الله، د پکتیا ولایت زرمت ولسوالی',
                      'جناب أبو الحسن خليفـه صـاحب مشهور په صوفي صاحب د لوګر ولایت',
                      'جناب عبد الستار خلیفه صاحب د وخت جـيـد عـالـم او لوی روحاني شخصیت وو د لوګر ولایت',
                      'جناب عبد الرشيد خليفه صاحب د لوګر ولایت',
                      'جناب ملا كل خلیفه صاحب د لوګر ولایت',
                      'جناب نعمت الله خلیفه صاحب د لوګر ولایت',
                      'جناب عثمان غنی خلیفه صاحب اصلا دغزنی ولایت اندړو ولسوالی، فعلاً دپکتیکا ولایت نکه ولسوالی اړوند دی'
                    ].map((khalifa, index) => (
                      <div key={index} className="bg-gradient-to-br from-purple-50/60 to-purple-100/40 rounded-xl p-5 md:p-6 hover:scale-105 group transition-all duration-150">
                        <p className="text-sm md:text-base font-semibold text-purple-800 group-hover:text-purple-900 transition-colors leading-relaxed">{khalifa}</p>
                  </div>
                    ))}
            </div>
          </div>

                {/* Successors */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-3">
                    <Award className="h-7 w-7 text-blue-600" />
                    د خلافت ځای ناستي
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {[
                      'تاج المشائخ خلیفه صاحب سدوزی غریقي رحمه الله',
                      'جناب خلیفه صاحب نعمت الله فضلي حفظه الله',
                      'شمس المشائخ خلیفه صاحب دین محمد حفظه الله',
                      'نجم المشائخ خلیفه صاحب داد محمد نوري حفظه الله',
                      'روح المشائخ خلیفه صاحب عبدالحی فقیرالله حفظه الله',
                      'قطب المشائخ خلیفه صاحب محمد انور ابو زبېرحفظه الله',
                      'محب المشائخ خلیفه صاحب محمد معراج روحاني رحمه الله',
                      'جناب خلیفه صاحب محمد عباس حفظه الله',
                      'فخر المشائخ جناب خلیفه صاحب محمد اکرم خادم حفظه الله',
                      'جناب خلیفه صاحب محمد هاشم حفظه الله',
                      'جناب خلیفه صاحب عزت الله حفظه الله',
                      'جناب خلیفه صاحب عاشق الرحمن حفظه الله',
                      'جناب خلیفه صاحب اسماعیل جان حفظه الله',
                      'جناب خلیفه صاحب سید محمد حفظه الله',
                      'جناب خلیفه صاحب بهادر رحمه الله',
                      'جناب خلیفه صاحب فهیم حفظه الله',
                      'جناب خلیفه صاحب حمید الله حفظه الله',
                      'جناب خلیفه صاحب رسول محمد حفظه الله',
                      'جناب خلیفه صاحب وزیر حفظه الله'
                    ].map((successor, index) => (
                      <div key={index} className="bg-gradient-to-br from-blue-50/60 to-blue-100/40 rounded-xl p-4 md:p-5 hover:scale-105 group transition-all duration-150">
                        <p className="text-xs md:text-sm font-semibold text-blue-800 text-center group-hover:text-blue-900 transition-colors leading-relaxed">{successor}</p>
                </div>
              ))}
            </div>
          </div>

                {/* Re-establishment */}
                <div className="bg-gradient-to-br from-emerald-50/50 via-emerald-100/30 to-white rounded-2xl p-6 md:p-8">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent mb-6 text-center flex items-center justify-center gap-3">
                    <Trophy className="h-7 w-7 text-emerald-600" />
                    د مدرسې بیا بنسټ
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-center mb-6 text-gray-700">
                    دجناب ارغندی خلیفه صاحب کورنی دهجرت له دیارڅخه چې کله بېرته راستنه شوه نو په دوهم ځل یې دکابل پغمان ارغندی بازید خېل سیمه کې دمدرسې بنیاد دجناب تاج المشائخ خلیفه صاحب سدوزی غریقی. او دارغندی خلیفه صاحب د زامنو، علماءو او دمخورو په لاس په تاریخ ښود ل شو.
                  </p>
                  <div className="bg-gradient-to-br from-emerald-50/70 to-emerald-100/50 rounded-xl p-6 text-center">
                    <p className="text-xl font-bold text-emerald-800 mb-3 flex items-center justify-center gap-2">
                      <Clock className="h-5 w-5" />
                      د مدرسې بیا بنسټ:
                    </p>
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-emerald-700">۱۷ / ٦ / ١٤٢٦ هـ ق</p>
                      <p className="text-base font-semibold text-emerald-700">۱ / ۵ / ١٣٨۴ هـ ش</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
            
            {/* Teacher Qualifications */}
            <div className="bg-gradient-to-br from-purple-50/50 via-purple-100/30 to-white rounded-3xl p-6 sm:p-8 md:p-10 mb-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-300/20 rounded-bl-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-tr-full blur-3xl"></div>
              <div className="relative z-10">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl mb-6">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent mb-4">
                  د استادانو علمي سویه
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  د جامعې استادان د لوړو علمي سطحو څښتنان دي، چې د ماسټري، دوکتورا او تخصصي درجې لري.
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#4a8a8a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-2xl p-8 sm:p-12 md:p-16 border border-gray-200 shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4a8a8a] rounded-2xl mb-8">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Amiri, serif' }}>
              دعا او امید
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed font-medium" style={{ fontFamily: 'Amiri, serif' }}>
              الله ج دې ترقیامته پورې دا پور نوره روانه بېړی روانه لری
            </p>
            <div className="bg-[#e0f2f2] rounded-2xl p-8 md:p-10 border border-[#d0e8e8]">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Amiri, serif' }}>
                &ldquo;د ده روح دې تر قيـامـتـه ښـاد وي او د ده فيض دې جـاري وي&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8" style={{ fontFamily: 'Amiri, serif' }}>
            زموږ <span className="text-[#4a8a8a]">ټولنې</span> سره یوځای شئ
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-medium" style={{ fontFamily: 'Amiri, serif' }}>
            زموږ د اسلامي تعلیماتو او روحاني ودې د میراث برخه شئ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#4a8a8a] text-white font-bold rounded-xl hover:bg-[#5a9a9a] hover:scale-105 transition-all duration-200 shadow-lg text-base sm:text-lg"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              کورسونو ته وګورئ
              <svg
                className="ml-2 h-5 w-5"
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
            <a
              href={`https://wa.me/+93796148087?text=${encodeURIComponent('اسلام علیکم ورحمته الله وبرکاتو ولیکه')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#4a8a8a] text-[#4a8a8a] font-bold rounded-xl hover:bg-[#e0f2f2] transition-all duration-200 shadow-lg hover:scale-105 text-base sm:text-lg"
              style={{ fontFamily: 'Amiri, serif' }}
            >
              اړیکه ونیسئ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
