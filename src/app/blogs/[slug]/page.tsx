// app/blogs/[slug]/page.tsx
import { BlogsApi } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Blog {
  name: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  featuredImage?: string;
  date: string;
  is_published: boolean;
  is_top: boolean;
  category_id: number;
  excerpt?: string;
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

  // Fetch blogs
  const res = await BlogsApi.getAll();
  const blogs: Blog[] = Array.isArray(res.data) ? res.data : [];
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  const relatedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 3);
  const getImageUrl = (img?: string) =>
    img
      ? img.startsWith("http")
        ? img
        : `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`
      : "/placeholder.jpg";

  return (
    <main className="min-h-screen mt-24 bg-gray-50 font-sans">
      {/* Header with orange gradient */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Enhanced Breadcrumb */}
        <nav className="flex mb-8 bg-white p-4 rounded-xl shadow-sm border border-amber-100">
          <ol className="flex items-center space-x-1 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center text-amber-600 hover:text-amber-700 transition-colors outline-none focus:outline-none focus:ring-0"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                href="/blogs"
                className="text-amber-600 hover:text-amber-700 transition-colors outline-none focus:outline-none focus:ring-0 "
              >
                Blogs
              </Link>
            </li>
            {/* <li className="flex items-center">
              <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700 font-medium truncate max-w-xs md:max-w-md">{blog.title}</span>
            </li> */}
          </ol>
        </nav>

        {/* Article Header */}
        <article className="mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight drop-shadow-sm">
            {blog.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-500">
          
            <div className="h-5 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {new Date(blog.publishedAt || blog.date).toLocaleDateString()}
              </span>
            </div>
            <div className="h-5 w-px bg-gray-300"></div>
            {/* <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{blog.readTime ? `${blog.readTime} min read` : "5 min read"}</span>
            </div> */}
            {blog.is_top && (
              <div className="ml-auto flex items-center bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured Post
              </div>
            )}
          </div>

          {/* Featured Image */}
          {(blog.featuredImage || blog.image) && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-10 group">
              <Image
                src={getImageUrl(blog.featuredImage || blog.image)}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-103 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          )}

          {/* Excerpt */}
          {(blog.excerpt || blog.description) && (
            <div className="relative mb-10">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-orange-400 to-yellow-500 rounded-full"></div>
              <div
                className="prose prose-lg prose-red pl-6"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>
          )}

       

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Article Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blogs/tag/${tag}`}
                    className="px-4 py-2 bg-amber-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 text-amber-800 hover:text-white rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

  
        </article>

        {/* Author Bio (if available) */}
   

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center relative">
              <span className="relative inline-block">
                <svg
                  className="w-7 h-7 mr-3 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                More Articles You Might Like
                <span className="absolute inset-x-0 bottom-[-10px] h-1 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full w-1/3 mx-auto"></span>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((rb) => (
                <Link
                  key={rb.slug}
                  href={`/blogs/${rb.slug}`}
                  className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl flex flex-col h-full bg-white outline-none focus:outline-none focus:ring-0"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={getImageUrl(rb.featuredImage || rb.image)}
                      alt={rb.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {rb.is_top && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                        Featured
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-3">
                      {rb.title}
                    </h3>
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4 flex-1">
                      { rb.description ?.replace(/<[^>]*>/g, "")}
                    </p>


                    {/* <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.description?.replace(/<[^>]*>/g, "")}
                </p>   */}
                    <div className="flex items-center text-xs text-gray-500 mt-auto">
                      <span>
                        {new Date(
                          rb.publishedAt || rb.date
                        ).toLocaleDateString()}
                      </span>
                      <span className="mx-2">•</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

 
      </div>
    </main>
  );
}
