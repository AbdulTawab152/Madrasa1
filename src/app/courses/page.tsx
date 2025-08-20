// app/courses/page.tsx
import CoursesSection from "./../components/courses/courseCard";
import { CoursesApi } from "../../lib/api"; // مسیر درست API

export default async function CoursesPage() {
  // fetch تمام کورس‌ها
  const res = await CoursesApi.getAll();
  const courses = res.data;

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">لیست کورس‌ها</h1>
      <CoursesSection courses={courses} showAll={true} />
    </main>
  );
}
