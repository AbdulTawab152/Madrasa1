// app/blogs/page.tsx
import BlogsSection from "./../components/blog/BlogCard";

export default function BlogsPage() {
  return (
    <main className="w-full">
      <BlogsSection homePage={false} />
    </main>
  );
}
