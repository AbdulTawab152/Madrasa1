// app/tasawwuf/page.tsx
import TasawwufList from "../components/tasawuuf/TasawwufList";

export default function TasawwufPage() {
  return (
    <div className="min-h-screen mt-28 bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Hero Section with Orange Theme */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse-slower"></div>
        </div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-lg rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-white rotate-12"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30 mb-6">
              <span className="text-sm font-medium">Spiritual Enlightenment</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              The Path of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-200">Tasawwuf</span>
            </h1>
            
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Discover the spiritual dimensions of Islam through the timeless wisdom of Tasawwuf. 
              Journey inward to find divine love and purification of the heart.
            </p>
          </div>
          
          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-500">
              <div className="text-4xl font-bold text-amber-300 mb-3">100+</div>
              <h3 className="text-lg font-semibold mb-2">Sacred Articles</h3>
              <p className="text-amber-100 text-sm">Spiritual guidance and wisdom</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-500">
              <div className="text-4xl font-bold text-amber-300 mb-3">7</div>
              <h3 className="text-lg font-semibold mb-2">Spiritual Stations</h3>
              <p className="text-amber-100 text-sm">Stages of spiritual development</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-500">
              <div className="text-4xl font-bold text-amber-300 mb-3">500+</div>
              <h3 className="text-lg font-semibold mb-2">Seekers Monthly</h3>
              <p className="text-amber-100 text-sm">Growing community of travelers</p>
            </div>
          </div>
          
          {/* CTA Button */}
        
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-sm text-amber-200 mb-2">Explore Articles</span>
            <div className="w-6 h-10 border-2 border-amber-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-300 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-orange-900 mb-6">Sacred Knowledge Repository</h2>
          <p className="text-orange-800 max-w-2xl mx-auto text-lg">
            Explore the depths of Islamic spirituality through our curated collection of articles on Tasawwuf
          </p>
        </div>
     
      
        
        <TasawwufList />
      </section>

      {/* Newsletter Section */}
 
    </div>
  );
}