import IslamicHeader from "../components/IslamicHeader";
import PageSkeleton from "@/components/loading/PageSkeleton";

export default function CoursesLoading() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="courses"
        alignment="center"
        cta={{
          label: "Explore All Courses",
          href: "/courses"
        }}
      />
      <div className="w-full mx-auto py-12">
        <PageSkeleton type="courses" showFilters={false} cardCount={6} />
      </div>
    </main>
  );
}