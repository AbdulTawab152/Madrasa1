// app/graduation/page.tsx
import GraduationSection from "../components/graduation/graduationCard";
import { GraduationsApi } from "../../lib/api"; // Graduation API

interface Graduation {
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
  graduates?: number;
  attendees?: string;
}

export default async function GraduationPage() {
  // fetch all graduations
  const res = await GraduationsApi.getAll();
  const graduations = Array.isArray(res.data) ? res.data as Graduation[] : [];

  return (
    <main className="w-full mt-10 p-8">
      {/* @ts-expect-error: Type mismatch between Graduation types */}
      <GraduationSection graduations={graduations} showAll={true} />
    </main>
  );
}
