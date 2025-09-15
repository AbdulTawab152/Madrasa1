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
                className="flex items-center text-amber-600 hover:text-amber-700 transition-colors"
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
                className="text-amber-600 hover:text-amber-700 transition-colors"
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
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <span className="text-gray-600 font-medium text-base">
                  {(blog.author || "A")[0]}
                </span>
              </div>
            </div>
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

          {/* Blog Content */}
          {/* {blog.content && (
            <div className="prose prose-xl max-w-none 
                          prose-headings:font-extrabold prose-headings:text-gray-900 
                          prose-p:text-gray-800 prose-p:leading-relaxed
                          prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline 
                          prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-xl
                          prose-strong:text-gray-900 
                          prose-ol:list-decimal prose-ul:list-disc
                          prose-img:rounded-xl prose-img:shadow-lg
                          first-letter:text-7xl first-letter:font-extrabold first-letter:text-orange-500 first-letter:mr-3 first-letter:float-left first-letter:mt-2
                          prose-pre:bg-gray-800 prose-pre:rounded-xl
                          prose-hr:border-gray-300"
              
            />
          )} */}

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

          {/* Social Sharing */}
          {/* <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-300 shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                </svg>
              </button>
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors duration-300 shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </div>
          </div> */}
        </article>

        {/* Author Bio (if available) */}
        {blog.author && (
          <div className="bg-white rounded-2xl p-6 mb-12 border border-gray-200 shadow-md">
            <div className="flex items-start">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mr-5 shadow-sm">
                <span className="text-gray-700 font-bold text-2xl">
                  {(blog.author || "A")[0]}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  About the Author
                </h3>
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {blog.author} is a passionate contributor to our blog, sharing
                  insightful perspectives and deep expertise in their field.
                  Their articles aim to inspire and inform our readers.
                </p>
                <div className="flex space-x-3 mt-4">
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    View all articles
                  </button>
                  <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  className="group rounded-2xl overflow-hidden border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl flex flex-col h-full bg-white"
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
                      {rb.excerpt || rb.description}
                    </p>
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

        {/* CTA Section */}
        {/* <div className="mt-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-10 text-center shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to learn more?</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">Explore our wide range of courses and start your learning journey today.</p>
          <Link 
            href="/courses"
            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Browse Courses →
          </Link>
        </div> */}

        {/* Navigation */}
        {/* <div className="flex justify-between border-t border-gray-200 pt-8">
          <Link 
            href="/blogs" 
            className="flex items-center text-amber-600 hover:text-amber-800 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All Blogs
          </Link>
          <Link 
            href="/" 
            className="flex items-center text-amber-600 hover:text-amber-800 font-medium transition-colors"
          >
            Homepage
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div> */}
      </div>
    </main>
  );
}
