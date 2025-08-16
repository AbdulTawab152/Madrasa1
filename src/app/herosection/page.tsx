"use client";
import Image from "next/image";

export default function Hero() {
  return (
  <section className="relative w-full h-screen">
  {/* Background Image */}
  <Image
    src="/1.jpg" // your background image in public folder
    alt="Background"
    fill
    className="object-cover"
  />

  {/* Radial Gradient Overlay */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,78,59,0.1),_rgba(0,0,0,0.9))]"></div>

  {/* Extra Dark Fade at Bottom for Depth */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    {/* Left Text */}
    <div className="text-white max-w-lg space-y-6">
      <button className="border border-white rounded-full px-5 py-2 text-sm hover:bg-white hover:text-black transition">
        Bismillah Hir Rahman Nir Rahim
      </button>
      <h1 className="text-4xl md:text-5xl font-bold">
        Read! in the Name of <span className="text-green-400">Allah</span> <br />
        Who has Created
      </h1>
      <p className="text-gray-200">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
      </p>
      <button className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition">
        Discover More
      </button>
    </div>

    {/* Right Circular Image */}
    <div className="hidden md:block relative w-[380px] h-[400px] rounded-lg overflow-hidden border border-green-200 shadow-[0_0_10px_rgba(0,255,128,0.5)]">
      <Image
        src="/1.jpg" // person image in public folder
        alt="Person"
        fill
        className="object-cover"
      />
    </div>
  </div>

  {/* Donation Button */}
  <button className="absolute top-6 right-6 flex items-center space-x-2 border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition">
    <span>♥</span>
    <span>Donation</span>
  </button>
</section>

  );
}
