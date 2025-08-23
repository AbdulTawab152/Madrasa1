// app/blogs/[slug]/page.tsx
import { BlogsApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  name: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_top: boolean;
  category_id: number;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  tags?: string[];
  publishedAt?: string;
  readTime?: number;
}

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailsPage({ params }: Params) {
  const { slug } = await params;

  const res = await BlogsApi.getAll();
  const blogs = Array.isArray(res.data) ? (res.data as Blog[]) : [];
  const blog: Blog | undefined = blogs.find(b => b.slug === slug);

  if (!blog) {
    return <p className="text-center mt-20 text-xl">Blog not found!</p>;
  }

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  const relatedBlogs = blogs.filter(b => b.slug !== slug).slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-12">
      {/* Hero Section */}
      {blog.featuredImage || blog.image ? (
        <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={getImageUrl(blog.featuredImage || blog.image)}
            alt={blog.title}
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center px-4">
              {blog.title}
            </h1>
          </div>
        </div>
      ) : null}

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 text-gray-500 text-sm md:text-base justify-center md:justify-start">
        <span className="flex items-center gap-1">✍️ {blog.author || "Admin"}</span>
        <span className="flex items-center gap-1">📅 {blog.publishedAt || blog.date}</span>
        <span className="flex items-center gap-1">⏱️ {blog.readTime ? `${blog.readTime} min` : "5 min"}</span>
        <span className="flex items-center gap-1">📌 Category ID: {blog.category_id}</span>
        <span className="flex items-center gap-1">⭐ Top Blog: {blog.is_top ? "Yes" : "No"}</span>
        <span className="flex items-center gap-1">📰 Published: {blog.is_published ? "Yes" : "No"}</span>
      </div>

      {/* Description */}
      {blog.excerpt || blog.description ? (
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center md:text-left">
          {blog.excerpt || blog.description}
        </p>
      ) : null}

      {/* Blog Content */}
      {blog.content && (
        <div
          className="prose prose-lg md:prose-xl max-w-full mx-auto"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      )}

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {blog.tags.map(tag => (
            <span
              key={tag}
              className="px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm md:text-base font-medium cursor-pointer hover:bg-amber-200 transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Related Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map(rb => (
              <Link key={rb.slug} href={`/blogs/${rb.slug}`} className="group">
                <div className="overflow-hidden rounded-lg shadow hover:shadow-lg transition">
                  <div className="relative w-full h-40 md:h-48">
                    <Image
                      src={getImageUrl(rb.featuredImage || rb.image)}
                      alt={rb.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-lg">{rb.title}</h3>
                    <p className="text-gray-500 text-sm mt-2">{rb.excerpt || rb.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="text-center mt-12">
        <Link href="/blogs" className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition inline-block">
          ← Back to Blogs
        </Link>
      </div>
    </main>
  );
}
