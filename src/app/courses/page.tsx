// app/courses/page.tsx
import CoursesSection from "./../components/courses/courseCard";
import { CoursesApi } from "../../lib/api"; // مسیر درست API

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
    <main className="w-full mt-32  p-8">
      <h1 className="text-3xl font-bold  mb-6">لیست کورس‌ها</h1>
      <CoursesSection courses={courses} showAll={true} />
    </main>
  );
}
