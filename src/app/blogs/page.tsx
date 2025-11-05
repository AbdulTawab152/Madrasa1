import BlogsSection from "../components/blog/BlogCard";
import IslamicHeader from "../components/IslamicHeader";
import Breadcrumb from "@/components/Breadcrumb";

export default function BlogsPage() {
  return (
    <main className="w-full space-y-10">
      <IslamicHeader pageType="blogs" />
      <Breadcrumb />
      <div className="pb-16">
        <BlogsSection homePage={false} />
      </div>
    </main>
  );
}
