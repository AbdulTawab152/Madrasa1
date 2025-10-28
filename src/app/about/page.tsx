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

  return (
    <div className="bg-white mt-32">
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4 ml-2" />
              د مدرسې پېژندنه
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight text-center">
              د انوارالعلوم اسلامي مدرسې لنډه پېژندنه
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-8"></div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            {/* Founder Biography Section */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-200 mb-8">
              <div className="text-center mb-8">
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src="/about111.jpg"
                    alt="شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full rounded-full border-4 border-amber-300 shadow-lg"
                      priority
                    />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">
                  شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)
                </h2>
                <p className="text-lg text-amber-800 font-medium mb-4">
                  مشهور (په ارغندي خلیفه صاحب) قدس الله سره
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">د ژوند لنډه پېژندنه</h3>
                  <p className="text-base leading-relaxed text-center">
                    انوار المشایخ جناب حضرت مولانا مؤید الدین خلیفه صاحب فضل الدین مشهور په خلیفه صاحب د ارغندی رحمه الله د افغانستان له نومياليو عالمانو او لویو عارفانو څخه ؤ. پلار یې محمد زرين نومېده چې یو نیک خویه او متقی انسان و.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
                      د تعلیم سفر
                    </h4>
                    <p className="text-sm leading-relaxed">
                      نوموړي تقريبا (۶) کاله د خپل کلي په ښوونځي کې ليک لوست زده کړه. بیا ېې د افغانستان په مختلفو ديني مدارسو کې مروجه دينـي عـلـوم سـرته ورسول د تفسیر د زده کړې دپاره د جناب شیخ الحدیث حضرت مولانا عبدالغفار ننگرهاری نوموړي د شیخ الحدیث حضرت مولانـا نـصـير الـدين غرغشتوی قدس سره شاګرد او د غزني په نورالمدارس مدرسه کې شیخ الحديث ؤ.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
                      د حدیثو زده کړه
                  </h4>
                    <p className="text-sm leading-relaxed">
                      ده ته ورغی او د تفسیر علم یې ترېنه حاصل کړ بیا د حديثو د زده کړې لپاره کابل ته راغی او د شیخ الحدیث حضرت مولانا سلطان جان صاحب نه يي سند او اجازه د حدیثو واخیسته او په ۱۳۳۶هـ.ش کال د قلعـه جـواد کې د حضرت صاحب د مدرسې نه فارغ شو.
                  </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">د طریقت سفر</h4>
                  <p className="text-base leading-relaxed text-center">
                    خليفـه صـاحب قدس الله سره د طـالـب علمـی پـه دوران کی د حضرت نورالمشايخ فضل عمر مجددي قدس الله سره سره بيعت وکړ بیا چی کله حضرت نورالمشایخ صاحب نور الله مرقده وفات شو نو د بیعت تجديد يې له حضرت ضياء المشايخ محمد ابراهیم جان مجددی قدس الله سره وکړ او په ۱۳۴۹هـ.ش کال د علم باطن نه فارغ اود سلوک منازل يې سرته ورسول اود جناب حضرت ضياء المشايخ صاحب په مبارکو لاسونو ورته د خلافت دستار وتړل شـو.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="order-2 lg:order-1">
                    <Image
                      src="/hero1.jpg"
                      alt="د ارغندی د مدرسې بنسټ"
                      width={300}
                      height={200}
                      className="rounded-xl w-full h-48 object-cover shadow-lg"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <h4 className="text-xl font-bold text-amber-800 mb-4 text-center">د ارغندی د مدرسې بنسټ</h4>
                    <p className="text-base leading-relaxed mb-4">
                      كلـه چې حضرت خلیفه صاحب قدس سره د ظاهري او باطنی علومو څخه فارغ شو نو په تدريس يې شروع وکړه د میدان ولایت د چارکی په مدرسه کې يې څه موده تیره کړه بیاله هغه ځایه د کابل ولایت پغمان ولسوالی برې ارغندۍ د بازید خيلو ته لاړهلته یې په لومړی ځل مدرسه تأسیس کړه
                    </p>
                    <div className="bg-amber-100 rounded-lg p-4 text-center">
                      <p className="text-lg font-bold text-amber-800 mb-1">ارغندی اول ځل:</p>
                      <p className="text-base text-amber-700">٦ / ١ / ١٣٨٣ هـ ق</p>
                      <p className="text-base text-amber-700">٨ / ٣ / ١٣٤٢ هـ ش</p>
                      <p className="text-base text-amber-700">٢٩ / ٥ / ١٩٦٣ م</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">د هجرت دوره</h4>
                  <p className="text-base leading-relaxed text-center mb-4">
                    نوموړي د تره کي د حکومت په دوره کې له خپل ګران هیواد څخه هجرت وکړ او د پاکستان په شمالی وزیرستان میرانشاه کې يې استوګنه غوره کړه د هجرت په ټاټوبي کې يې یوه ستره ديني مدرسه د انوار العلوم الاسلامیة په نامه دوهم ځل په میرانشاه کې جوړه کړه چې په سلګونو طالبانو به په کې ديني علوم زده کول.
                  </p>
                  <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <p className="text-lg font-bold text-blue-800 mb-1">میرانشاه د مدرسې بنسټ:</p>
                    <p className="text-base text-blue-700">٦ / ٩ / ١٤٠٥ هـ ق</p>
                    <p className="text-base text-blue-700">۴ / ۳ / ۱۳۶۴ هـ ش</p>
                  </div>
                    </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">د وفات او میراث</h4>
                    <p className="text-base leading-relaxed mb-4">
                      حضرت انوار المشائخ خلیفه صاحب ارغندي قدس الله سره، ته په وروستيو کالو کې سخته مريضي ور پېښه شوه او د هماغې مريضي نـه پـه ۱۹۹۵م كـال وفـات شـو او د میرانشاه د شهیدانو په هدیره کې خاورو ته وسپارل شو. وايي چې د ده په جنازه کې په زرګونو مسلمانانو شرکت کړی ؤ چې زياتره يـې عالمان او دينې طالبان ؤ.
                    </p>
                  </div>
                  <div>
                    <Image
                      src="/about2.jpg"
                      alt="د خلیفه صاحب میراث"
                      width={300}
                      height={200}
                      className="rounded-xl w-full h-48 object-cover shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-8">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center mb-6">
                د انوارالعلوم اسلامي مدرسه د جناب شیخ القرآن والحدیث حضرت انوارالمشائخ خلیفه صاحب فضل‌الدین ارغندی رحمة‌الله علیه په مبارک لاس د ۱۳۸۳ هـ ق / ۱۳۴۲ هـ ش / ۱۹۶۳ م کال د جوزا په اتمه نېټه د کابل ولایت د پغمان ولسوالۍ د ارغندي علیا په سیمه کې تأسیس شوه.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
                له نوموړي د وفات وروسته، د مدرسې د اهتمام چارې د هغه ورور حضرت تاج‌المشائخ خلیفه صاحب سدوزی غریقي رحمة‌الله علیه ته وسپارل شوې. ورپسې، د تاج‌المشائخ رح له وفات وروسته د مدرسې اداره د حضرت ارغندی خلیفه صاحب د کشر زوی او د تاج‌المشائخ رح وراره حضرت قلب‌المشائخ خلیفه صاحب محمد شفیق فضلي حفظه‌الله تعالی ته وسپارل شوه. نوموړی تر ننه د دې جامعې د علمي او روحاني چارو څارنه کوي او د تصوف څانګه یې په ځانګړي ډول د پام وړ وده کړې ده.
              </p>
            </div>

            {/* Academic Services */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-blue-200 mb-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  د جامعې علمي خدمتونه
                </h2>
                <p className="text-base text-gray-700">
                  په نوموړې مدرسه کې د ديني او عصري علومو تدریس په منظم ډول تر سره کېږي، چې مهمې څانګې یې دا دي:
                  </p>
                </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
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
                  <div key={index} className="text-center p-4 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-sm">
                    <div className="text-3xl mb-2">{subject.icon}</div>
                    <p className="text-sm font-medium text-gray-800">{subject.name}</p>
                  </div>
                ))}
                </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 italic">
                  دغه علوم په درجوي (صنفي) او متفرقه ډول تدریس کېږي.
                    </p>
                  </div>
                </div>

            {/* Teachers Section */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-green-200 mb-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-4">
                  <Users className="h-8 w-8 text-white" />
                  </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  د جامعې مشایخ او استادان
                </h2>
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                  <div key={index} className="bg-white rounded-xl p-4 hover:bg-green-50 transition-all duration-300 shadow-sm">
                    <p className="text-sm font-medium text-gray-800 text-center">{teacher}</p>
                      </div>
                    ))}
                  </div>
                </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 shadow-lg border border-amber-200">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">د شاګردانو داخله</h3>
                </div>
                <p className="text-base text-gray-700 text-center">
                  هر کال شاوخوا ۵۰۰ تر ۷۰۰ پورې لیلي شاګردانو ته داخله ورکول کېږي.
              </p>
            </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg border border-green-200">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mb-3">
                    <GraduationCap className="h-6 w-6 text-white" />
                </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">فارغین</h3>
              </div>
                <p className="text-base text-gray-700 text-center">
                  د تېرو پنځلسو کلونو په ترڅ کې شاوخوا ۷۰۰ تنه فارغین یې د علمي پړاوونو څخه فارغ شوي او ټولنې ته وړاندې شوي دي.
              </p>
            </div>
          </div>

            {/* Family and Successors Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-indigo-200 mb-8">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  د کورنۍ او ځای ناستو پېژندنه
                </h2>
              </div>

              <div className="space-y-6">
                {/* Brothers */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">د ارغندی د خلیفه صاحب وروڼه</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-bold text-indigo-800 mb-2">محترم احمدزی</h4>
                      <p className="text-sm text-gray-700">ده ښو اخلاقوڅښتن اومتقی شخص وه.</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-bold text-indigo-800 mb-2">جناب تاج المشائخ خلیفه صاحب سدوزی غریقي رحمه الله</h4>
                      <p className="text-sm text-gray-700">د ارغندی خلیفه صاحب ورور او په علمي ډګر کې ځای ناستی وو. د وخت جید عالم، مدرس، پیاوړۍ مجاهد او لـوی عـارف وو.</p>
            </div>
            </div>
          </div>

                {/* Sons */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">د ارغندي خلیفه صاحب پنځه زامن</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">جناب الحاج قاری صاحب عبدالعلیم فضلي</h4>
                      <p className="text-sm text-gray-700">مشر زوى، د ښواخلاقو څښتن اوزړه سواند شخصیت ده.</p>
                </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">جناب الحاج خلیفه صاحب نعمت الله فضلي</h4>
                      <p className="text-sm text-gray-700">د قوي عزم خاوند، د تصوف او سلوک په ډګر کې د جناب قطب المشائخ لخوا ورته د خلافت دستار ور په سر کړل شو.</p>
              </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">انجینر رحمت الله فضلي</h4>
                      <p className="text-sm text-gray-700">دحلم او زغم نمونه ده.</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 md:col-span-2 lg:col-span-3">
                      <h4 className="font-bold text-green-800 mb-2">جناب قلب المشائخ الحاج خلیفه صاحب محمدشفیق فضلي دام الله حیاته وفیوضاته</h4>
                      <p className="text-sm text-gray-700">جید عالم او کامل متبع د شریعت چې ده. جناب تاج المشائخ رحمه الله د وفات څخه وروسته د انوار العلوم اسلامي مدرسې مهتمم شیخ الحدیث او دخلیفه صاحب ځاي ناستي ده، اوس مهال د تصوف اوسلوک په ډګر کې یو لا مثال شخصیت ده.</p>
            </div>
                  </div>
              </div>

                {/* Famous Khalifas */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">د ده مشهور خليفه ګان</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div key={index} className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-purple-800">{khalifa}</p>
                  </div>
                    ))}
            </div>
          </div>

                {/* Successors */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">د خلافت ځای ناستي</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-blue-800 text-center">{successor}</p>
                </div>
              ))}
            </div>
          </div>

                {/* Re-establishment */}
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">د مدرسې بیا بنسټ</h3>
                  <p className="text-base leading-relaxed text-center mb-4">
                    دجناب ارغندی خلیفه صاحب کورنی دهجرت له دیارڅخه چې کله بېرته راستنه شوه نو په دوهم ځل یې دکابل پغمان ارغندی بازید خېل سیمه کې دمدرسې بنیاد دجناب تاج المشائخ خلیفه صاحب سدوزی غریقی. او دارغندی خلیفه صاحب د زامنو، علماءو او دمخورو په لاس په تاریخ ښود ل شو.
                  </p>
                  <div className="bg-emerald-200 rounded-lg p-4 text-center">
                    <p className="text-lg font-bold text-emerald-800 mb-1">د مدرسې بیا بنسټ:</p>
                    <p className="text-base text-emerald-700">۱۷ / ٦ / ١٤٢٦ هـ ق</p>
                    <p className="text-base text-emerald-700">۱ / ۵ / ١٣٨۴ هـ ش</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Teacher Qualifications */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-purple-200 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  د استادانو علمي سویه
                </h2>
                <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
                  د جامعې استادان د لوړو علمي سطحو څښتنان دي، چې د ماسټري، دوکتورا او تخصصي درجې لري.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-600 to-green-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              دعا او امید
            </h2>
            <p className="text-lg sm:text-xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              الله ج دې ترقیامته پورې دا پور نوره روانه بېړی روانه لری
            </p>
            <div className="bg-white/10 rounded-xl p-6 mb-8">
              <p className="text-base text-white italic">
                "د ده روح دې تر قيـامـتـه ښـاد وي او د ده فيض دې جـاري وي"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-amber-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
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
