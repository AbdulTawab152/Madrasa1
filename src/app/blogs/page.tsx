import BlogsSection from "../components/blog/BlogCard";

async function fetchBlogsData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/blogs";
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت لیست وبلاگ‌ها");
  return res.json();
}

export default async function BlogsPage() {
  const blogs = await fetchBlogsData();
  return (
    <div>
      <BlogsSection blogs={blogs} showAll={true} />
    </div>
  );
}
