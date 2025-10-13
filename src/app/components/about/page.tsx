"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap } from "lucide-react";
import img from "../../../../public/about1.jpg";
import img1 from "../../../../public/about2.jpg";
import img2 from "../../../../public/about3.jpg";
import img3 from "../../../../public/about4.jpg";

const About = () => {
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

  return (
  <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    {/* Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center px-5 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6">
        زموږ میراث
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        د <span className="text-amber-600">انوارالعلوم</span> په اړه
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        د شپږو لسیزو څخه زیات موږ د اصلي اسلامي علم خپرولو او د زړونو او ذهنونو روزنې ته وقف یو.
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
          <span className="text-amber-600">شیخ القران والحدیث</span> حضرت علامه أنوار المشائخ
        </h3>
        <h4 className="text-xl font-semibold text-amber-700">
          الحاج خلیفه صاحب فضل الدین (رح) مشهور (په ارغندي خلیفه صاحب) قدس الله سره
        </h4>
        <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
          <p>
            <strong>انوار المشائخ جناب حضرت مولانا خلیفه صاحب فضل الدین</strong> مشهور په خلیفه صاحب د ارغندی رحمه الله د افغانستان له نومياليو عالمانو او لویو عارفانو څخه ؤ. پلار یې محمد زرين نومېده چې یو نیک خویه او متقی انسان و. نوموړي دافغانستان غزنی ولایت اندړو ولسوالی دابراهیم ځو مېترګوډل سیمه کې دنیاته سترګې غړولی، بیا تقريبا (۶) کاله یې د خپل کلي په ښوونځي کې ليک لوست زده کړه.
          </p>
          <p>
            بیا ېې د افغانستان په مختلفو ديني مدارسو کې مروجه دينـي عـلـوم سـرته ورسول د تفسیر د زده کړې دپاره د جناب شیخ الحدیث حضرت مولانا عبدالغفار ننگرهاری نوموړي د شیخ الحدیث حضرت مولانـا نـصـير الـدين غرغشتوی قدس سره شاګرد او د غزني په نورالمدارس مدرسه کې شیخ الحديث ؤ. ده ته ورغی او د تفسیر علم یې ترېنه حاصل کړ بیا د حديثو د زده کړې لپاره کابل ته راغی او د شیخ الحدیث حضرت مولانا سلطان جان صاحب نه يي سند او اجازه د حدیثو واخیسته او په ۱۳۳۶هـ.ش کال په قلعـه جـواد کې د حضرت صاحب د مدرسې نه فارغ شو.
          </p>
          <p>
            خليفـه صـاحب قدس الله سره د طـالـب علمـی پـه دوران کی د حضرت نورالمشايخ فضل عمر مجددي قدس الله سره دطریقت (تصووف)بيعت وکړ، بیا چی کله حضرت نورالمشایخ صاحب نور الله مرقده وفات شو نو د بیعت تجديد يې له حضرت ضياء المشايخ محمد ابراهیم جان مجددی قدس الله سره وکړ او په ۱۳۴۹هـ.ش کال د علم باطن نه فارغ اود سلوک منازل يې سرته ورسول اود جناب حضرت ضياء المشائخ صاحب په مبارکو لاسونو ورته د خلافت دستار وتړل شـو.
          </p>
          <p>
            کلـه چې حضرت خلیفه صاحب قدس سره د ظاهري او باطنی علومو څخه فارغ شو نو په تدريس يې شروع وکړه د میدان ولایت د چارکی په مدرسه کې يې څه موده تیره کړه بیاله هغه ځایه د کابل ولایت پغمان ولسوالی برې ارغندۍ بازید خيلو ته لاړ هلته یې په لومړی ځل مدرسه تأسیس کړه:
          </p>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-center">
            <p className="text-lg font-bold text-amber-600">٦ / ١ / ١٣٨٣ هـ ق | ٨ / ٣ / ١٣٤٢ هـ ش | ٢٩ / ٥ / ١٩٦٣ م</p>
          </div>
           <div className="relative w-full mb-8">
          <div className="relative w-full flex lg:hidden  h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
            <Image
              src={img}
              alt="شیخ خلیفه صاحب ارغندی (رح) - د انوارالعلوم بنسټګر"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Clean Border */}
            <div className="absolute inset-0 rounded-2xl border border-amber-200/50"></div>
          </div>
        </div>
          <p>
            اوهلته يې تقریبا (۳۰) کاله مروجه دینی علوم ، حدیث او تفسیر درس کړل د ليرو ليرو ځایونو څخه به طالبان ورته راتلل او د حديثو د فراغت سند او اجازه بـه یـې ترینه اخیستله د دې ترڅنګ د باطنی علومو طالبانو به يې لاس نیوی کاوه او د سلوک منازل به یې سرته رسول.
          </p>
          <p>
            نوموړي د تره کي د حکومت په دوره کې له خپل ګران هیواد څخه هجرت وکړ او د پاکستان په شمالی وزیرستان میرانشاه کې يې استوګنه غوره کړه د هجرت په ټاټوبي کې يې یوه ستره ديني مدرسه د انوار العلوم الاسلامیة په نامه دوهم ځل په میرانشاه کې په کال ٦ / ٩ / ١٤٠٥ هـ ق | ۴ / ۳ / ۱۳۶۴ هـ ش | ۱۹۸۵/۵/۲۵ میلادی جوړه کړه چې په سلګونو طالبانو به په کې ديني علوم زده کول.
          </p>
          <p>
            حضرت انوار المشائخ خلیفه صاحب ارغندي قدس الله سره، ته په وروستيو کالو کې سخته مريضي ور پېښه شوه او د هماغې مريضي نه په ۱۹۹۵م كال وفـات شـو او د میرانشاه د شهیدانو په هدیره کې خاورو ته وسپارل شو. روح یې ښاد یاد دې تل وی.
          </p>
          <p>
            دجناب ارغندی خلیفه صاحب کورنی دهجرت له دیارڅخه چې کله بېرته راستنه شوه نو په دوهم ځل یې دکابل پغمان ارغندی بازید خېل سیمه کې دمدرسې بنیاد دجناب تاج المشائخ خلیفه صاحب سدوزی غریقی. او دارغندی خلیفه صاحب د زامنو، علماءو او دمخورو په لاس په تاریخ ۱۷ / ٦ / ١٤٢٦ هـ ق | ۱ / ۵ / ١٣٨۴ هـ ش | ۲۰۰۵/۷/۱ میلادی کې ښود ل شو. او لله الحمد چې په علمی او روحانی ډګر کې یې خدمات تراوسه لاجاری دی، الله ج دې ترقیامته پورې دا پور نوره روانه بېړی. روانه لری
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          >
            نور معلومات
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
            اړیکه ونیسئ
          </Link>
        </div>
      </div>

      {/* Clean Media Section - Mobile Optimized */}
      <div className="relative w-full">
        {/* Single Hero Image - Mobile Perfect */}
        <div className="relative w-full mb-8">
          <div className="relative w-full hidden lg:flex  h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl group">
            <Image
              src={img2}
              alt="شیخ خلیفه صاحب ارغندی (رح) - د انوارالعلوم بنسټګر"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              priority
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            {/* Clean Border */}
            <div className="absolute inset-0 rounded-2xl border border-amber-200/50"></div>
          </div>
        </div>

       
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
          
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Image Gallery - Mobile Perfect */}
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">د یادښتونو ګالري</h3>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Image 1 */}
            <div className="relative group">
              <div className="relative w-full h-[120px] sm:h-[140px] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={img3}
                  alt="د انوارالعلوم د بنسټګر یادښت"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative group">
              <div className="relative w-full h-[120px] sm:h-[140px] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={img2}
                  alt="د انوارالعلوم د تدریس صحنه"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image 3 */}
            <div className="relative group">
              <div className="relative w-full h-[120px] sm:h-[140px] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={img1}
                  alt="د انوارالعلوم د طالبانو سره د شیخ صاحب یادښت"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image 4 */}
            <div className="relative group">
              <div className="relative w-full h-[120px] sm:h-[140px] rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={img}
                  alt="د انوارالعلوم د مدرسې عمارت"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Info Section */}
        <div className="mt-6 text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h4 className="text-base font-bold text-gray-800">د یادښتونو ګالري</h4>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            د شیخ خلیفه صاحب ارغندی (رح) د ژوند او د انوارالعلوم د تاریخ یادښتونه
          </p>
        </div>
      </div>
    </div>

    {/* Values */}
    <div className="text-center mb-16">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
        زموږ <span className="text-amber-600">ارزښتونه</span>
      </h3>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        دا اصول زموږ د اسلامي تعلیماتو چلند لارښووني کوي
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
