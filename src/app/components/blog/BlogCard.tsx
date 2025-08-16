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
    <section className="p-8 bg-green-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-600 relative inline-block">
          {showAll ? "All Blogs" : "Latest Blogs"}
          <span className="block h-1 w-16 bg-green-500 mx-auto mt-2 rounded"></span>
        </h2>
        <p className="text-gray-500 mt-2">
          {showAll
            ? "Discover stories, tips, and insights from our team"
            : "Stay updated with our latest insights"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayBlogs.map(blog => (
          <div
            key={blog.id}
            className="group block bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
          >
            <div className="relative overflow-hidden aspect-[4/3]">
              {blog.image ? (
                <Image
                  src={getImageUrl(blog.image)}
                  alt={blog.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
               
                </div>
              )}
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1.5 bg-green-600/80 text-white text-xs rounded-full shadow-lg">
                  {formatDate(blog.date)}
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {blog.description || "No description available for this blog post."}
              </p>

              <div className="mt-4">
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-block w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-center font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && displayBlogs.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/blogs"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition shadow-lg"
          >
            See All Blogs
          </Link>
        </div>
      )}
    </section>
  );
}
