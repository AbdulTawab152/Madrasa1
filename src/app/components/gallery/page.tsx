"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, Heart, Share2, Download, Sparkles, Grid3X3 } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  category: string;
  image: string;
  featured?: boolean;
}

const getImageUrl = (img: string) => {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

// Mini Slider Component
const MiniSlider = ({ images, title }: { images: GalleryItem[], title: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl group">
      <img
        src={getImageUrl(images[currentSlide].image)}
        alt={images[currentSlide].title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-flex items-center px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full mb-2">
            <Sparkles size={12} className="mr-1" />
            {title}
          </div>
          <p className="text-white font-semibold text-sm">{images[currentSlide].title}</p>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={16} className="text-gray-800" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={16} className="text-gray-800" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((img, i) => (
          <div
            key={`dot-${img.id}-${i}`}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              currentSlide === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Gallery({ initialImages }: { initialImages: GalleryItem[] }) {
  const [images] = useState<GalleryItem[]>(initialImages);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");

  // Get unique categories
  const categories = ["All", ...new Set(images.map(img => img.category))];

  // Filter images by category
  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  // Create slider groups (each slider will have 3 images)
  const sliderGroups = [];
  for (let i = 0; i < filteredImages.length; i += 3) {
    sliderGroups.push(filteredImages.slice(i, i + 3));
  }

  const openLightbox = (index: number) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  const showPrev = () =>
    setCurrentIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : 0));
  
  const showNext = () =>
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : 0));

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex !== null) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "ArrowRight") showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, filteredImages.length]);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedImages(prev => 
      prev.includes(id) ? prev.filter(imgId => imgId !== id) : [...prev, id]
    );
  };

  const downloadImage = (imageUrl: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '-')}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  };

  return (
    <section className="py-16 mt- bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
     <div className="text-center mb-12">

  <h2 className="text-4xl font-bold text-gray-900 mb-4">
    Madrasa <span className="text-orange-600">Collection</span>
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto">
    Explore the knowledge and teachings of our well-established madrasa, nurturing minds and hearts for a brighter future
  </p>
</div>


        {/* Controls */}
     
        {/* Grid View */}
   {viewMode === "grid" && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* First item - large slider */}
    <div 
      className=" row-span-2 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={() => openLightbox(0)}
    >
      <MiniSlider 
        images={filteredImages.slice(0, 6)} 
        title="Featured Collection" 
      />
    </div>

    {/* First three regular image items */}
    {filteredImages.slice(0, 3).map((img, index) => (
      <div
        key={`grid-item-${img.id}-${index}`}
        className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
        onClick={() => openLightbox(index)}
      >
        <div className="relative  overflow-hidden">
          <img
            src={getImageUrl(img.image)}
            alt={img.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-semibold text-white text-sm mb-1">{img.title}</p>
              <p className="text-xs text-white/80">{img.category}</p>
            </div>

            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => toggleLike(img.id, e)}
                className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  size={16}
                  className={likedImages.includes(img.id) ? "fill-red-500 text-red-500" : "text-gray-700"}
                />
              </button>
              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <ZoomIn size={16} className="text-gray-700" />
              </button>
            </div>
          </div>

          {img.featured && (
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
      </div>
    ))}

    {/* Fourth item - second slider */}
    <div 
      className="md:row-span-2 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onClick={() => openLightbox(4)}
    >
      <MiniSlider 
        images={filteredImages.slice(4, 7)} 
        title="Production Process" 
      />
    </div>

{filteredImages.slice(4, 8).map((img, index) => {
  // image #5 overall → index 1 in this slice
  const isBig = index === 2;

  return (
    <div
      key={`grid-item-${img.id}-${index + 4}`}
      className={`relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl 
        ${isBig ? "md:col-span-2 md:row-span-2 h-[255px]" : "h-64"}
      `}
      onClick={() => openLightbox(index + 3)} // slice starts at 3 → offset by 3
    >
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={getImageUrl(img.image)}
          alt={img.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-semibold text-white text-sm mb-1">{img.title}</p>
            <p className="text-xs text-white/80">{img.category}</p>
          </div>

          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => toggleLike(img.id, e)}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <Heart
                size={16}
                className={
                  likedImages.includes(img.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-700"
                }
              />
            </button>
            <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
              <ZoomIn size={16} className="text-gray-700" />
            </button>
          </div>
        </div>

        {img.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
    </div>
  );
})}


    {/* Final images (8-10) */}
    {filteredImages.slice(8, 11).map((img, index) => (
      <div
        key={`grid-item-${img.id}-${index + 8}`}
        className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-64"
        onClick={() => openLightbox(index + 8)}
      >
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={getImageUrl(img.image)}
            alt={img.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-semibold text-white text-sm mb-1">{img.title}</p>
              <p className="text-xs text-white/80">{img.category}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

        {/* Slider View
        {viewMode === "slider" && (
          <div className="space-y-6">
            {sliderGroups.map((group, groupIndex) => (
              <div key={`slider-group-${groupIndex}`} className="rounded-2xl overflow-hidden shadow-lg">
                <MiniSlider 
                  images={group} 
                  title={`Collection ${groupIndex + 1}`} 
                />
              </div>
            ))}
          </div>
        )} */}

        {/* Empty state */}
        {/* {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <div className="text-orange-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No images found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )} */}

        {/* Lightbox */}
        {currentIndex !== null && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/20 transition-colors z-10"
            >
              <X size={28} />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={showPrev}
              className="absolute left-5 text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10 md:left-10"
            >
              <ChevronLeft size={36} />
            </button>

            <button
              onClick={showNext}
              className="absolute right-5 text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10 md:right-10"
            >
              <ChevronRight size={36} />
            </button>

            {/* Main image */}
            <div className="relative max-h-[85vh] max-w-4xl w-full">
              <img
                src={getImageUrl(filteredImages[currentIndex].image)}
                alt={filteredImages[currentIndex].title}
                className="max-h-[85vh] max-w-full mx-auto object-contain rounded-lg"
              />
              
              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{filteredImages[currentIndex].title}</h3>
                <p className="text-sm text-white/80 mb-3">{filteredImages[currentIndex].category}</p>
                {filteredImages[currentIndex].description && (
                  <p className="text-sm">{filteredImages[currentIndex].description}</p>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex gap-3">
                <button 
                  onClick={(e) => downloadImage(
                    getImageUrl(filteredImages[currentIndex].image), 
                    filteredImages[currentIndex].title, 
                    e
                  )}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  title="Download image"
                >
                  <Download size={20} />
                </button>
                <button 
                  onClick={(e) => toggleLike(filteredImages[currentIndex].id, e)}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  title="Like image"
                >
                  <Heart 
                    size={20} 
                    className={likedImages.includes(filteredImages[currentIndex].id) ? "fill-red-500 text-red-500" : ""} 
                  />
                </button>
                <button 
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  title="Share image"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnail navigation */}
            {/* <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto py-2">
              {filteredImages.map((img, index) => (
                <button
                  key={`thumbnail-${img.id}-${index}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                    currentIndex === index ? "border-orange-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={getImageUrl(img.image)}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}

            {/* Image counter */}
            <div className="absolute top-5 left-5 text-white/80 text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}