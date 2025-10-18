"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import { getImageUrlWithFallback } from "@/lib/utils";
import { useTranslation } from '@/hooks/useTranslation';
import { getTranslation } from '@/lib/translations';

interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  category: string;
  image: string;
  featured?: boolean;
}

// Mini Slider Component
const MiniSlider = ({
  images,
  title,
  translate,
}: {
  images: GalleryItem[];
  title: string;
  translate: (key: string) => string;
}) => {
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

  if (!images || images.length === 0 || !images[currentSlide]) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl group bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">{translate('about.biography.gallerySection.noImagesAvailable')}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl group">
      <img
        src={getImageUrlWithFallback(images[currentSlide]?.image, "/placeholder-about.biography.gallerySection.jpg")}
        alt={images[currentSlide]?.title || "Gallery image"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-flex items-center px-3 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full mb-2">
            <Sparkles size={12} className="mr-1" />
            {title}
          </div>
          <p className="text-white font-semibold text-sm">
            {images[currentSlide].title || translate('about.biography.gallerySection.untitled')}
          </p>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white hover:scale-110"
      >
        <ChevronLeft size={16} className="text-gray-800" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white hover:scale-110"
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

export default function Gallery({
  initialImages,
}: {
  initialImages: GalleryItem[];
}) {
  const { t, i18n } = useTranslation('common', { useSuspense: false });
  
  // Create a more reliable translation function that always returns a string
  const translate = (key: string): string => {
    const translation = t(key);
    
    // Ensure we always return a string, not an array
    if (typeof translation === 'string') {
      return translation;
    }
    
    // If translation failed, return the key as fallback
    return key;
  };
  const [images] = useState<GalleryItem[]>(() => {
    // Ensure we have a valid array and filter out any invalid items
    if (!Array.isArray(initialImages)) {
      console.warn('Gallery received non-array initialImages:', initialImages);
      return [];
    }
    
    const validImages = initialImages.filter(item => {
  const isValid = item && 
    typeof item === 'object' && 
    item.image && 
    item.title &&
    item.image !== null &&
    item.image !== undefined;
      
      if (!isValid) {
        console.warn('Gallery filtered out invalid item:', item);
      }
      
      return isValid;
    });
    
    console.log('Gallery initialized with', validImages.length, 'valid images');
    return validImages;
  });
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllImages, setShowAllImages] = useState(false);

  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");

  // Get unique categories
  const categories = ["All", ...new Set(images.filter(img => img && img.category).map((img) => img.category))];

  // Filter images by category
  const filteredImages =
    activeCategory === "All"
      ? images.filter(img => img && img.image && img.title)
      : images.filter((img) => img && img.category === activeCategory && img.image && img.title);

  // Create slider groups (each slider will have 3 images)
  const sliderGroups = [];
  for (let i = 0; i < filteredImages.length; i += 3) {
    sliderGroups.push(filteredImages.slice(i, i + 3));
  }

  const openLightbox = (index: number) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  const showPrev = () =>
    setCurrentIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredImages.length) % filteredImages.length
        : 0
    );

  const showNext = () =>
    setCurrentIndex((prev) =>
      prev !== null ? (prev + 1) % filteredImages.length : 0
    );

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





  // Early return if no valid images
  if (!images || images.length === 0) {
    return (
      <section className="py-16 mt-[100px] bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {translate('about.biography.gallerySection.title')}{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                {translate('about.biography.gallerySection.collection')}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              {translate('about.biography.gallerySection.unavailable') || 'ګالري اوس مهال شتون نلري. مهرباني وکړئ وروسته بیا وګورئ.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 mt-[100px] bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
  {/* Title */}
  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
    {translate('about.biography.gallerySection.title') || 'مدرسه'}{" "}
    <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
      {translate('about.biography.gallerySection.collection') || 'ګالري'}
    </span>
  </h2>

  {/* Decorative underline */}
  <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-6"></div>

  {/* Description */}
  <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
    {translate('about.biography.gallerySection.description') || 'زموږ د مدرسې د بیاځلي علم او روحاني تعلیماتو د ښکلا کشف وکړئ، چې د ذهنونو او زړونو روزنې ته وقف دي ترڅو د رښتیني او روښانه راتلونکي جوړولو لپاره.'}
  </p>
</div>


        {/* Controls */}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="space-y-6">
            {/* Mobile: Show only slider and 3 images */}
            <div className="md:hidden space-y-4">
              {/* Main slider */}
              <div
                className="h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => openLightbox(0)}
              >
                <MiniSlider
                  images={filteredImages.slice(0, 6)}
                  title=""
                  translate={translate}
                />
              </div>

              {/* Three more images */}
              <div className="grid grid-cols-1 gap-4 bg-black/5 p-2 rounded-xl">
                {filteredImages.slice(0, 3).map((img, index) => {
                  if (!img) return null;
                  return (
                    <div
                      key={`mobile-item-${img.id}-${index}`}
                      className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-48"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="relative h-full overflow-hidden">
                        <img
                          src={getImageUrlWithFallback(img.image, "/placeholder-about.biography.gallerySection.jpg")}
                          alt={img.title || "Gallery image"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="font-semibold text-white text-sm mb-1">
                              {img.title || translate('about.biography.gallerySection.untitled')}
                            </p>
                            <p className="text-xs text-white/80">{img.category || translate('about.biography.gallerySection.general')}</p>
                          </div>
                        </div>

                       
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show All Button */}
           

              {/* Mobile: Show all images when button is clicked */}
              {showAllImages && (
                <div className="space-y-4">
                  <div className="text-center">
                    <button
                      onClick={() => setShowAllImages(false)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                      {translate('about.biography.gallerySection.showLess')}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {filteredImages.slice(3).map((img, index) => {
                      if (!img) return null;
                      return (
                        <div
                          key={`mobile-all-item-${img.id}-${index + 3}`}
                          className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-48"
                          onClick={() => openLightbox(index + 3)}
                        >
                          <div className="relative h-full overflow-hidden">
                            <img
                              src={getImageUrlWithFallback(img.image, "/placeholder-about.biography.gallerySection.jpg")}
                              alt={img.title || "Gallery image"}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4">
                                <p className="font-semibold text-white text-sm mb-1">
                                  {img.title || translate('about.biography.gallerySection.untitled')}
                                </p>
                                <p className="text-xs text-white/80">{img.category || translate('about.biography.gallerySection.general')}</p>
                              </div>
                            </div>

                           
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop: Full grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* First item - large slider */}
            <div
                className="row-span-2 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => openLightbox(0)}
            >
              <MiniSlider
                images={filteredImages.slice(0, 6)}
                title={translate('about.biography.gallerySection.featuredCollection')}
                translate={translate}
              />
            </div>

            {/* First three regular image items */}
            {filteredImages.slice(0, 3).map((img, index) => {
              if (!img) return null;
              return (
                <div
                  key={`grid-item-${img.id}-${index}`}
                    className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative overflow-hidden">
            <img
              src={getImageUrlWithFallback(img.image, "/placeholder-about.biography.gallerySection.jpg")}
                      alt={img.title || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-semibold text-white text-sm mb-1">
                          {img.title || translate('about.biography.gallerySection.untitled')}
                        </p>
                        <p className="text-xs text-white/80">{img.category || translate('about.biography.gallerySection.general')}</p>
                      </div>
                    </div>

                    {img.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                          {translate('about.biography.gallerySection.featured')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Fourth item - second slider */}
            <div
              className=" hidden md:flex md:row-span-2 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              onClick={() => openLightbox(4)}
            >
              <MiniSlider
                images={filteredImages.slice(4, 7)}
                title={translate('about.biography.gallerySection.productionProcess')}
                translate={translate}
              />
            </div>

            {filteredImages.slice(4, 8).map((img, index) => {
              if (!img) return null;
              // image #5 overall → index 1 in this slice
              const isBig = index === 2;

              return (
                <div
                  key={`grid-item-${img.id}-${index + 4}`}
                  className={` hidden md:flex relative group overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl 
                ${isBig ? "md:col-span-2 md:row-span-2 h-[255px]" : "h-64"}
              `}
                          onClick={() => openLightbox(index + 3)} // slice starts at 3 → offset by 3
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={getImageUrlWithFallback(img.image, "/placeholder-about.biography.gallerySection.jpg")}
                      alt={img.title || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-semibold text-white text-sm mb-1">
                          {img.title || translate('about.biography.gallerySection.untitled')}
                        </p>
                        <p className="text-xs text-white/80">{img.category || translate('about.biography.gallerySection.general')}</p>
                      </div>

                      
                    </div>

                    {img.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                          {translate('about.biography.gallerySection.featured')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Final images (8-10) */}
            {filteredImages.slice(8, 11).map((img, index) => {
              if (!img) return null;
              return (
                <div
                  key={`grid-item-${img.id}-${index + 8}`}
                  className="relative group overflow-hidden rounded-4xl shadow-lg cursor-pointer bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-64"
                  onClick={() => openLightbox(index + 8)}
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={getImageUrlWithFallback(img.image, "/placeholder-about.biography.gallerySection.jpg")}
                      alt={img.title || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-semibold text-white text-sm mb-1">
                          {img.title || translate('about.biography.gallerySection.untitled')}
                        </p>
                        <p className="text-xs text-white/80">{img.category || translate('about.biography.gallerySection.general')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {currentIndex !== null && filteredImages[currentIndex] && (
      <div className="fixed inset-0 bg-primary-950/90 flex items-center justify-center z-50 p-4">
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
                src={getImageUrlWithFallback(filteredImages[currentIndex].image, "/placeholder-about.biography.gallerySection.jpg")}
                alt={filteredImages[currentIndex].title || "Gallery image"}
                className="max-h-[85vh] max-w-full mx-auto object-contain rounded-lg"
              />

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold mb-1">
                  {filteredImages[currentIndex].title || translate('about.biography.gallerySection.untitled')}
                </h3>
                <p className="text-sm text-white/80 mb-3">
                  {filteredImages[currentIndex].category || translate('about.biography.gallerySection.general')}
                </p>
                {filteredImages[currentIndex].description && (
                  <p className="text-sm">
                    {filteredImages[currentIndex].description}
                  </p>
                )}
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
                  src={
                    getImageUrl(img.image, "/placeholder-about.biography.gallerySection.jpg") ||
                    "/placeholder-about.biography.gallerySection.jpg"
                  }
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}

            {/* Image counter */}
            <div className="absolute top-5 left-5 text-white/80 text-sm">
              {currentIndex + 1} {translate('about.biography.gallerySection.of')} {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
