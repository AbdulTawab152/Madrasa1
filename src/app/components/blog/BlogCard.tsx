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
    <div className="w-full">
      {/* Hero Section */}
      {featuredBlog && !showAll && (
        <div className="relative w-full mt-32 h-[400px] rounded-xl overflow-hidden mb-12">
          <Image
            src="/1.jpg"
            alt={featuredBlog.title}
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{featuredBlog.title}</h1>
            <p className="text-lg md:text-xl mb-4">{featuredBlog.description}</p>
            <Link
              href={`/blogs/${featuredBlog.slug}`}
              className="inline-block bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
            >
              Read Featured
            </Link>
          </div>
        </div>
      )}

      {/* Section Heading */}
      {!showAll && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {showAll ? "All Blogs" : "Latest Blogs"}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {showAll
              ? "Explore all our blogs and insights."
              : "Check out our newest and most popular articles."}
          </p>
        </div>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayBlogs.map(blog => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-[450px]">
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
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    ⭐ Featured
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1 line-clamp-3">{blog.description}</p>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                      >
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

                <button className="mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-md text-sm">
                  Read More
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore All Blogs Button */}
      {!showAll && displayBlogs.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-base rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
          >
            Explore All Blogs
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
