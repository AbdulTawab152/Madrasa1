"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Iftah = {
  id: number;
  tag_id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  date: string;
  note?: string;
  mufti_id: number;
  is_published: boolean;
  attachment?: string;
  is_top?: boolean;
};

type Mufty = {
  id: number;
  full_name: string;
};

export default function IftahListPage() {
  const [iftahs, setIftahs] = useState<Iftah[]>([]);
  const [mufties, setMufties] = useState<Mufty[]>([]);
  const [loading, setLoading] = useState(true);
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const [iftahRes, muftyRes] = await Promise.all([
          fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/iftah"),
          fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/mufties"),
        ]);

        const iftahData: Iftah[] = iftahRes.ok ? await iftahRes.json() : [];
        const muftyData: Mufty[] = muftyRes.ok ? await muftyRes.json() : [];

        setIftahs(iftahData);
        setMufties(muftyData);

        const initialStates: { [key: number]: boolean } = {};
        iftahData.forEach((item) => (initialStates[item.id] = false));
        setOpenStates(initialStates);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleOpen = (id: number) => {
    setOpenStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading)
    return <p className="text-center mt-20 text-lg font-medium text-gray-500">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Iftah Knowledge Hub
      </h1>

      <div className="space-y-8">
        {iftahs.map((item, index) => {
          const mufty = mufties.find((m) => m.id === item.mufti_id);
          const isOpen = openStates[item.id];
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row justify-between p-6 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl ${
                isEven ? "bg-gradient-to-r from-blue-50 to-blue-100" : "bg-gradient-to-r from-purple-50 to-purple-100"
              }`}
            >
              <div className="flex-1 md:pr-6">
                <Link
                  href={`/iftah/${item.slug}`}
                  className="text-2xl font-bold text-gray-800 hover:text-blue-700 hover:underline transition-colors"
                >
                  {item.title}
                </Link>

                {mufty && (
                  <p className="mt-1 text-sm text-gray-500 italic">
                    By <strong>{mufty.full_name}</strong>
                  </p>
                )}

                <button
                  onClick={() => toggleOpen(item.id)}
                  className="mt-4 w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold flex justify-between items-center shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700 text-lg">Q: {item.question}</span>
                  <span className="text-blue-600 font-bold text-xl">{isOpen ? "−" : "+"}</span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-[500px] mt-3" : "max-h-0"
                  }`}
                >
                  <div className="p-4 bg-gray-50 rounded-xl shadow-inner text-gray-700">
                    <strong>Answer:</strong> {item.answer}
                    {item.note && (
                      <p className="mt-2 text-sm text-gray-500">
                        <strong>Note:</strong> {item.note}
                      </p>
                    )}
                    {item.attachment && (
                      <a
                        href={item.attachment}
                        target="_blank"
                        className="mt-2 inline-block text-blue-500 hover:underline"
                      >
                        View Attachment
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-gray-500 text-sm md:text-right flex flex-col gap-1">
                <p className="px-3 py-1 bg-gray-100 rounded-full">{item.date}</p>
                {item.is_top && <p className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full font-semibold">Top Iftah</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
