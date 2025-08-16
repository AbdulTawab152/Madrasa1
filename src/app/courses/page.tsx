import CoursesSection from "../components/courses/courseCard";

async function fetchCoursesData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/courses";
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت لیست کورس‌ها");
  return res.json();
}

export default async function CoursesPage() {
  const courses = await fetchCoursesData();

  return (
    <div>
      <CoursesSection courses={courses} showAll={true} />
    </div>
  );
}
