// app/iftah/page.tsx
import IftahSection from "../components/iftah/IftahSection";
import IftahQuestionFormInline from "../components/iftah/IftahQuestionFormInline";
import { IftahApi } from "../../lib/api"; // مسیر درست API
import Image from 'next/image';
interface Author {
  name: string;
  bio?: string;
}

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  references?: string[];
  isPublished?: boolean;
  viewCount?: number;
  is_published?: boolean;
}

export default async function IftahPage() {
  // fetch تمام افتاح‌ها
  const res = await IftahApi.getAll();
  const iftahItems = Array.isArray(res.data) ? (res.data as Iftah[]) : [];

  return (
    <main className="max-w-full mt-24">
      <IftahSection fatwas={iftahItems} showAll={true} />
      <IftahQuestionFormInline />
    </main>
  );

}
