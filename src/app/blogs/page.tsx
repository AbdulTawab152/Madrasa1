// app/blogs/page.tsx
import BlogsSection from "./../components/blog/BlogCard"; // مسیر درست کامپوننت را بزنید
import { BlogsApi } from "../../lib/api"; // مسیر درست API

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
}

export default async function BlogsPage() {
  // fetch تمام بلاگ‌ها
  const res = await BlogsApi.getAll();
  const blogs = Array.isArray(res.data) ? (res.data as Blog[]) : [];

  return (
    <main className="max-w-6xl mt-32 mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">لیست بلاگ‌ها</h1>
      <BlogsSection blogs={blogs} showAll={true} />
    </main>
  );
}
