import Link from "next/link";
import Image from "next/image";

interface Blog {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_featured: boolean;
  category_id: number;
  author?: string;
  reading_time?: string;
  views?: string;
  tags?: string[];
}

interface BlogsSectionProps {
  blogs: Blog[];
  showAll?: boolean;
}

export default function BlogsSection({ blogs, showAll = false }: BlogsSectionProps) {
  const sortedBlogs =
    blogs
      ?.filter(blog => blog.is_published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const displayBlogs = showAll ? sortedBlogs : sortedBlogs.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  const featuredBlog = sortedBlogs.find(b => b.is_featured);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Hero Section for Featured Blog */}
    {featuredBlog && !showAll && (
  <div className="relative w-full mt-20 md:mt-32 h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl group">
    {/* Hero Image with parallax hover */}
    <Image
      src="/1.jpg"
      alt={featuredBlog.title}
      fill
      className="object-cover brightness-90 transform transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:translate-y-[-10px]"
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent animate-gradient-x"></div>

    {/* Hero Content */}
    <div className="absolute bottom-10 left-6 md:left-16 text-white max-w-2xl z-10">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight animate-fade-in-up">
        {featuredBlog.title}
      </h1>
      <p className="text-lg md:text-xl mb-5 animate-fade-in-up delay-200">
        {featuredBlog.description}
      </p>
      <Link
        href={`/blogs/${featuredBlog.slug}`}
        className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,165,0,0.6)]"
      >
        Read Featured
      </Link>
    </div>

    {/* Floating Shapes */}
    <div className="absolute top-8 left-8 w-6 h-6 bg-orange-400 rounded-full opacity-50 animate-bounce-slow"></div>
    <div className="absolute bottom-16 right-16 w-10 h-10 bg-pink-400 rounded-full opacity-40 animate-bounce-slower"></div>
    <div className="absolute top-32 right-1/3 w-4 h-4 bg-orange-300 rounded-full opacity-50 animate-bounce-slow"></div>
    <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-pink-300 rounded-full opacity-40 animate-bounce-slow"></div>
    <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-orange-200 rounded-full opacity-50 animate-bounce-slower"></div>

    {/* Optional: Subtle blurred circles */}
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-400 rounded-full opacity-20 blur-3xl animate-pulse-slow delay-300"></div>
  </div>
)}

      {/* Section Heading */}
      {!showAll && (
        <div className="text-center mb-12 relative px-4 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse">
            📝 Latest Blogs
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Explore Our <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">Newest Insights</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl mb-8 animate-fade-in-up">
            {showAll
              ? "Explore all our blogs and insights."
              : "Check out our newest and most popular articles."}
          </p>
          <div className="flex justify-center mt-2">
            <span className="w-28 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 rounded-full animate-pulse"></span>
          </div>

          {/* Floating Circles */}
          <div className="absolute top-0 left-10 w-4 h-4 bg-orange-300 rounded-full opacity-50 animate-bounce-slow"></div>
          <div className="absolute top-6 right-10 w-6 h-6 bg-orange-400 rounded-full opacity-40 animate-bounce-slower"></div>
          <div className="absolute bottom-0 left-1/3 w-3 h-3 bg-pink-300 rounded-full opacity-50 animate-bounce-slow"></div>
        </div>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0 justify-items-center">
        {displayBlogs.map(blog => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group w-full max-w-sm">
            <div className="bg-white  rounded-xl overflow-hidden border border-orange-500/20 hover:shadow-lg transition-shadow duration-300 flex flex-col h-[500px]">
              {/* Blog Image */}
              <div className="relative h-56 overflow-hidden">
                {blog.image ? (
                  <Image
                    src={getImageUrl(blog.image)}
                    alt={blog.title}
                    width={400}
                    height={224}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                {blog.is_featured && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md animate-pulse">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Blog Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1 line-clamp-3">{blog.description}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <span key={tag} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                  <span>✍️ {blog.author || "Admin"}</span>
                  <span>⏱️ {blog.reading_time || "5 min read"}</span>
                  <span>👁️ {blog.views || "1.2k"} views</span>
                </div>

                <button className="mt-4 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-semibold py-2 rounded-2xl hover:scale-105 transition-all shadow-md text-sm">
                  Read More
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore All Blogs Button */}
      {!showAll && displayBlogs.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-400 via-orange-500 to-pink-500 text-white font-semibold text-lg rounded-2xl shadow-lg hover:from-orange-500 hover:to-pink-600 hover:scale-105 transition-all duration-300"
          >
            Explore All Blogs
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
