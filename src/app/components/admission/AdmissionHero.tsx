"use client";

import { FiBook, FiUser, FiPhone } from "react-icons/fi";

interface AdmissionHeroProps {
  title?: string;
  subtitle?: string;
}

export default function AdmissionHero({
  title = "د محصلینو د نوم لیکنې فورم",
  subtitle = "مهرباني وکړئ خپل معلومات په دقت سره داخل کړئ",
}: AdmissionHeroProps) {
  return (
    <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white overflow-hidden mt-20">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Islamic Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40 40 0 1 1 80 0a40 40 0 1 1 -80 0' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3Cpath d='M50 50m-20 0a20 20 0 1 1 40 0a20 20 0 1 1 -40 0' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3Cpath d='M50 50m-10 0a10 10 0 1 1 20 0a10 10 0 1 1 -20 0' stroke='%23ffffff' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 shadow-xl">
              <FiBook className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-amber-100 mb-6 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FiUser className="w-5 h-5" />
                <span className="font-semibold">شخصي معلومات</span>
              </div>
              <p className="text-sm text-amber-100">د خپلو شخصي معلوماتو ثبت</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FiPhone className="w-5 h-5" />
                <span className="font-semibold">د اړیکو معلومات</span>
              </div>
              <p className="text-sm text-amber-100">د اړیکو معلومات ثبت</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FiBook className="w-5 h-5" />
                <span className="font-semibold">د زده کړو معلومات</span>
              </div>
              <p className="text-sm text-amber-100">د زده کړو معلومات ثبت</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
}


