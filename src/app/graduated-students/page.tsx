// app/graduations/page.tsx
import GraduationsSection from "./../components/graduation/graduationCard"; // مسیر درست کامپوننت
import { GraduationsApi } from "../../lib/api"; // مسیر درست API
import { Graduation } from "../../lib/types";

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
