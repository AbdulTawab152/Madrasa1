// app/blog/[slug]/page.tsx
import Image from "next/image";
import { fetchWithCache } from '../../../lib/api';
import { endpoints } from '../../../lib/config';
import { Blog } from '../../../lib/types';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchBlogDetail(slug: string): Promise<Blog> {
  try {
    const data = await fetchWithCache<Blog>(`${endpoints.blogs}/${slug}`);
    return data;
  } catch (error) {
    throw new Error("خطا در دریافت اطلاعات وبلاگ");
  }
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  let blog: Blog | null = null;

  try {
    blog = await fetchBlogDetail(slug);
  } catch (error) {
    console.error(error);
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-16 left-16 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-16 h-16 bg-red-100 rounded-full opacity-30 animate-bounce"></div>

        <div className="text-center max-w-md relative z-10">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-red-200 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Oops! Blog Not Found</h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            This story seems to have wandered off. Let's find another amazing story!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {blog.image && (
        <div className="h-96 md:h-[600px] overflow-hidden relative">
          <Image
            src={getImageUrl(blog.image)}
            alt={blog.title}
            fill
            className="object-cover transform scale-105"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
        <h1 className="text-4xl font-extrabold text-white">{blog.title}</h1>
        <p className="mt-2 max-w-3xl text-gray-200 text-lg drop-shadow-sm">{blog.name}</p>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <main className="space-y-16">
          <Section title="Description" content={blog.description} />
          <Section title="Content" content={blog.content} />

          <div className="mt-6 text-gray-600 text-sm space-y-1">
            <p>Date: {new Date(blog.date).toLocaleDateString()}</p>
            <p>Category ID: {blog.category_id}</p>
            <p>Top Blog: {blog.is_top ? "Yes" : "No"}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content?: string }) {
  if (!content) return null;

  return (
    <section className="group">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-3 h-16 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full shadow-lg"></div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
          {title}
        </h2>
      </div>
      <div className="w-full">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg md:text-xl font-normal">
          {content}
        </p>
      </div>
    </section>
  );
}
