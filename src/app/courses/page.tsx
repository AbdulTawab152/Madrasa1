// app/courses/page.tsx
import CoursesSection from "./../components/courses/courseCard";
import { CoursesApi } from "../../lib/api";

interface Course {
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
  rating?: number;
  lessons?: number;
  enrolled?: string;
}

export default async function CoursesPage() {
  // fetch تمام کورس‌ها
  const res = await CoursesApi.getAll();
  const courses = Array.isArray(res.data) ? res.data as Course[] : [];

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white pt-20">
      <div className="w-full mx-auto  py-12">
        {/* @ts-expect-error: Type mismatch between Course types */}
        <CoursesSection courses={courses} showAll={true} />
      </div>
    </main>
  );
}
