// app/blog/page.tsx
import Link from "next/link";

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

async function fetchBlogsData(): Promise<Blog[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/blogs";
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("خطا در دریافت لیست وبلاگ‌ها");

  return res.json(); // مستقیم JSON رو می‌گیریم
}

export default async function BlogsPage() {
  const blogs = await fetchBlogsData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="block group bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={blog.image || "https://via.placeholder.com/300x200"}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-80 transition"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{blog.title}</h2>
              <p className="text-gray-500 text-sm mb-2">
                {/* Fixed locale */}
                {new Date(blog.date).toLocaleDateString("fa-IR")}
              </p>
              <p className="text-gray-600 text-sm line-clamp-3">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
