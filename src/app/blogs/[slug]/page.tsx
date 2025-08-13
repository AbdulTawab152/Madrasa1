// app/blog/[slug]/page.tsx
import Image from 'next/image';

interface BlogDetail {
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

async function fetchBlogDetail(slug: string): Promise<BlogDetail> {
  const API_URL = `https://lawngreen-dragonfly-304220.hostingersite.com/api/blog/${slug}`;
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("خطا در دریافت اطلاعات وبلاگ");

  return res.json(); // مستقیم JSON رو می‌گیریم
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await fetchBlogDetail(params.slug);

  if (!blog) return <div>وبلاگی یافت نشد.</div>;

  return (
    <main className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{blog.name}</p>

      <Image
        src={blog.image || "https://via.placeholder.com/600x400"}
        alt={blog.title}
        className="w-full h-auto rounded-lg mb-6"
      />

      <p className="text-gray-700 leading-relaxed">{blog.description}</p>

      <div className="mt-6 text-gray-600 text-sm space-y-1">
        <p>Date: {new Date(blog.date).toLocaleDateString()}</p>
        <p>Category ID: {blog.category_id}</p>
        <p>Top Blog: {blog.is_top ? "Yes" : "No"}</p>
        <p>Published: {blog.is_published ? "Yes" : "No"}</p>
      </div>
    </main>
  );
}
