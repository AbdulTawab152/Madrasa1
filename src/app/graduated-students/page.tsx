// app/graduations/page.tsx
import GraduationsSection from "./../components/graduation/graduationCard"; // مسیر درست کامپوننت
import { GraduationsApi } from "../../lib/api"; // مسیر درست API

interface Graduation {
  id: number;
  name: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_featured: boolean;
  faculty?: string;
  degree?: string;
  location?: string;
  organizer?: string;
  duration?: string;
}

export default async function GraduationsPage() {
  // گرفتن تمام graduations
  const res = await GraduationsApi.getAll();
  const graduations = Array.isArray(res.data) ? (res.data as Graduation[]) : [];

  return (
    <main className="max-w-6xl mt-32 mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">لیست فراغت‌ها</h1>
      <GraduationsSection graduations ={graduations} showAll={true} />
    </main>
  );
}
