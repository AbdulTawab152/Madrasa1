"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard";

interface Blog {
  id: number;
  slug: string;
  title: string;
  image: string;
  excerpt: string;
}

export default function TopBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        // گرفتن Top Blogs
        const topRes = await fetch(
          "https://lawngreen-dragonfly-304220.hostingersite.com/api/top-blogs"
        );
        const topData: Blog[] = await topRes.json();

        // گرفتن Blogs معمولی (برای پر کردن کمبود)
        const blogRes = await fetch(
          "https://lawngreen-dragonfly-304220.hostingersite.com/api/blogs"
        );
        const blogData: Blog[] = await blogRes.json();

        // ترکیب داده‌ها
        const merged = [...topData];
        if (merged.length < 4) {
          const extraNeeded = 4 - merged.length;
          const extras = blogData.filter(
            (b) => !merged.some((tb) => tb.id === b.id)
          );
          merged.push(...extras.slice(0, extraNeeded));
        }

        setBlogs(merged.slice(0, 4));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading Top Blogs...</p>;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Top Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
