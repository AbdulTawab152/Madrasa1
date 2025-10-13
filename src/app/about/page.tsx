"use client";

import Image from "next/image";
import Link from "next/link";
import IslamicHeader from "../components/IslamicHeader";
import { BookOpen, Award, Heart, Users, Sparkles, Clock, GraduationCap, Target, Lightbulb, Star, CheckCircle, Quote, Trophy } from "lucide-react";
import img from "../../../public/1.jpg";

const AboutPage = () => {
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
      {/* Modern Hero Section with Background Shapes */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Circle */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full opacity-60"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-blue-100 to-blue-200 rounded-full opacity-50"></div>
          
          {/* Medium Shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl rotate-12 opacity-70"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full opacity-60"></div>
          
          {/* Small Decorative Elements */}
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full opacity-80"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl -rotate-12 opacity-60"></div>
          
          {/* Additional shapes for more visual interest */}
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full opacity-50"></div>
          <div className="absolute top-1/6 right-1/6 w-8 h-8 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full opacity-70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              د اسلامي تعلیماتو مرکز
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              د <span className="text-amber-600">انوارالعلوم</span> په اړه
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full mb-8"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 max-w-4xl mx-auto leading-relaxed">
              شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)
            </h2>
            <p className="text-xl text-amber-700 font-medium mb-6">
              مشهور (په ارغندي خلیفه صاحب) قدس الله سره
            </p>
            <p className="text-lg text-gray-600 max-w-5xl mx-auto leading-relaxed">
              د اسلامي تعلیماتو او روحاني رشد مرکز چې د ۱۹۶۳ کال راهیسې د افغانستان په مختلفو سیمو کې د علم او معرفت د پړاوونو خدمت کوي
            </p>
          </div>

          {/* Stats Section with Background Shapes */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/50">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">زموږ د خدمتونو احصائیه</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">د ۶۳ کلونو د خدمت په ترڅ کې د زموږ د بریاوو لنډه احصائیه</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">63+</h3>
                <p className="text-sm text-gray-600 font-medium">کلونه خدمت</p>
                <p className="text-xs text-gray-500 mt-1">د ۱۹۶۳ راهیسې</p>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">700+</h3>
                <p className="text-sm text-gray-600 font-medium">فارغان</p>
                <p className="text-xs text-gray-500 mt-1">د پنځلسو کلونو په ترڅ کې</p>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">500-700</h3>
                <p className="text-sm text-gray-600 font-medium">د کال شاګردان</p>
                <p className="text-xs text-gray-500 mt-1">د لیلي شاګردانو شمیر</p>
              </div>
              
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">50+</h3>
                <p className="text-sm text-gray-600 font-medium">علماء</p>
                <p className="text-xs text-gray-500 mt-1">د لوړو درجو څښتنان</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
      
          <div className="space-y-8 text-gray-700 leading-relaxed">
            {/* Comprehensive Founder Biography w/ Image */}
            <div className="rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-4 mb-6">
                  {/* Founder Real Photo (replace src='/images/khalifa-sahib.jpg' with the real path) */}
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg bg-white">
                    <img
                      src="/about1.jpg"
                      alt="خلیفه صاحب فضل الدین (رح)"
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    {/* Optionally, BookOpen icon at bottom right of image */}
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  {/* -- or fallback if no image --
                  <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  */}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  شیخ القران والحدیث أنوار المشائخ الحاج خلیفه صاحب فضل الدین (رح)
                </h3>
                <p className="text-xl text-amber-700 font-medium mb-4">
                  مشهور (په ارغندي خلیفه صاحب) قدس الله سره
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                {/* Optionally, add a horizontal image here for more visual */}
                {/* Introduction */}
                <div className="p-6 rounded-lg">
                  <p className="text-lg font-medium mb-4">
                    <strong className="text-amber-700">انوار المشایخ جناب حضرت مولانا مؤید الدین خلیفه صاحب فضل الدین</strong> مشهور په خلیفه صاحب د ارغندی رحمه الله د افغانستان له نومياليو عالمانو او لویو عارفانو څخه ؤ.
                  </p>
                  <p>
                    پلار یې محمد زرين نومېده چې یو نیک خویه او متقی انسان و. نوموړي تقريبا (۶) کاله د خپل کلي په ښوونځي کې ليک لوست زده کړه. بیا ېې د افغانستان په مختلفو ديني مدارسو کې مروجه دينـي عـلـوم سـرته ورسول د تفسیر د زده کړې دپاره د جناب شیخ الحدیث حضرت مولانا عبدالغفار ننگرهاری نوموړي د شیخ الحدیث حضرت مولانـا نـصـير الـدين غرغشتوی قدس سره شاګرد او د غزني په نورالمدارس مدرسه کې شیخ الحديث ؤ.
                  </p>
                </div>

                {/* Education Journey */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
                    د علمي سفر کیسه
                  </h4>
                  <p>
                    ده ته ورغی او د تفسیر علم یې ترېنه حاصل کړ بیا د حديثو د زده کړې لپاره کابل ته راغی او د شیخ الحدیث حضرت مولانا سلطان جان صاحب نه يي سند او اجازه د حدیثو واخیسته او په ۱۳۳۶هـ.ش کال د قلعـه جـواد کې د حضرت صاحب د مدرسې نه فارغ شو.
                  </p>
                </div>

                {/* Optionally, add another image between journey */}
                {/* Spiritual Journey */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-amber-500 rounded-full mr-3"></div>
                    د روحاني سفر کیسه
                  </h4>
                  <p>
                    خليفـه صـاحب قدس الله سره د طـالـب علمـی پـه دوران کی د حضرت نورالمشايخ فضل عمر مجددي قدس الله سره سره بيعت وکړ بیا چی کله حضرت نورالمشایخ صاحب نور الله مرقده وفات شو نو د بیعت تجديد يې له حضرت ضياء المشايخ محمد ابراهیم جان مجددی قدس الله سره وکړ او په ۱۳۴۹هـ.ش کال د علم باطن نه فارغ اود سلوک منازل يې سرته ورسول اود جناب حضرت ضياء المشايخ صاحب په مبارکو لاسونو ورته د خلافت دستار وتړل شـو.
                  </p>
                </div>

                {/* First Madrasa Establishment - inset image on side for more visual */}
                <div className="p-6 rounded-lg flex flex-col lg:flex-row gap-6 items-center">
                  <div className="flex-shrink-0">
                    <img
                      src="/hero1.jpg"
                      alt="مدرسه ارغندي بنسټ"
                      className="rounded-xl w-44 h-32 object-cover shadow-lg border border-amber-100"
                      loading="lazy"
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
                    <img
                      src="/1.jpg"
                      alt="هجرت دوره خلیفه صاحب"
                      className="rounded-xl w-44 h-32 object-cover shadow-lg border border-gray-100"
                      loading="lazy"
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
                    <img
                      src="/about2.jpg"
                      alt="خلیفه صاحب په وروستیو کلونو کې"
                      className="rounded-xl w-32 h-32 object-cover shadow-md border border-gray-200"
                      loading="lazy"
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
                    <img
                      src="/about3.jpg"
                      alt="د مدرسې بیا ځلي بنسټ اېښودنه"
                      className="rounded-xl w-36 h-24 object-cover shadow-md border border-amber-100"
                      loading="lazy"
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

            {/* Enhanced Academic Services */}
            <div className="rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">د جامعې علمي خدمتونه</h3>
                  <p className="text-blue-600 font-medium">د اسلامي او عصري علومو د تدریس مرکز</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                په نوموړې مدرسه کې د ديني او عصري علومو تدریس په منظم ډول تر سره کېږي، چې مهمې څانګې یې دا دي:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {[
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
                ].map((subject, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 hover:bg-gray-50 transition-colors duration-300">
                    <div className="text-center">
                      <div className={`w-12 h-12 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <span className="text-2xl">{subject.icon}</span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-800">{subject.name}</h4>
                    </div>
                  </div>
                ))}
            </div>

              <div className="bg-white rounded-xl p-6">
                <p className="text-center text-gray-600 italic">
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
      <section className="py-16 bg-amber-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            زموږ <span className="text-amber-200">ټولنې</span> سره یوځای شئ
          </h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            زموږ د اسلامي تعلیماتو او روحاني ودې د میراث برخه شئ.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-amber-600 font-medium rounded-md hover:bg-amber-50 transition-colors shadow-sm text-sm"
            >
              کورسونو ته وګورئ
              <svg
                className="ml-2 h-3 w-3"
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
              className="inline-flex items-center justify-center px-4 py-2 border border-white text-white font-medium rounded-md hover:bg-white hover:text-amber-600 transition-colors text-sm"
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
