import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen, Star } from "lucide-react";

interface Blog {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_top: boolean;
  category_id: number;
}

interface BlogsSectionProps {
  blogs: Blog[];
  showAll?: boolean;
}

export default function BlogsSection({ blogs, showAll = false }: BlogsSectionProps) {
  const sortedBlogs = blogs
    .filter(blog => blog.is_published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayBlogs = showAll ? sortedBlogs : sortedBlogs.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="relative">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 h-[500px] overflow-hidden z-0">
        <Image
          src="/1.jpg"
          alt="Islamic Knowledge Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-blue-900/70 to-transparent"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 pt-32 pb-48 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Islamic Knowledge Repository
          </h1>
          <div className="h-1.5 w-32 bg-white/70 mx-auto rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
            Explore our collection of authentic Islamic teachings, spiritual guidance, and practical wisdom from trusted scholars
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blogs"
              className="px-8 py-4 bg-white text-green-800 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300 shadow-lg"
            >
              Browse Articles
            </Link>
            <Link
              href="/iftah"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 shadow-lg"
            >
              View Fatwa Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Main Blog Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent inline-block mb-3">
              {showAll ? "Islamic Knowledge Articles" : "Latest Insights"}
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {showAll
                ? "Explore our collection of articles on Islamic teachings, spirituality, and practical guidance"
                : "Discover wisdom and guidance from authentic Islamic sources"}
            </p>
          </div>

          {displayBlogs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-100">
              <p className="text-xl text-gray-500">No articles available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBlogs.map(blog => (
                <div
                  key={blog.id}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden aspect-video">
                    {blog.image ? (
                      <Image
                        src={getImageUrl(blog.image)}
                        alt={blog.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400/20 to-blue-400/20 flex items-center justify-center">
                        <BookOpen size={48} className="text-green-500/50" />
                      </div>
                    )}
                    
                    {/* Date badge */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-green-700 text-sm rounded-full shadow-lg">
                        <Calendar size={14} className="mr-1.5" />
                        {formatDate(blog.date)}
                      </div>
                    </div>
                    
                    {/* Featured badge */}
                    {blog.is_top && (
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm text-white text-sm rounded-full shadow-lg">
                          <Star size={14} className="mr-1.5" />
                          Featured
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <div className="h-0.5 w-16 bg-gradient-to-r from-green-300 to-blue-300 rounded-full mb-4"></div>
                    
                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6">
                      {blog.description || "No description available for this article."}
                    </p>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md group"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!showAll && displayBlogs.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Link
                href="/blogs"
                className="inline-flex items-center px-8 py-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300 shadow-md group"
              >
                <span>Explore All Articles</span>
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
