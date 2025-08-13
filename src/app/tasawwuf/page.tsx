// app/tasawwuf/page.tsx

import React from "react";

async function fetchTasawwufData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/tasawwuf";
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Failed to fetch Tasawwuf data");

  return res.json();
}



export default async function TasawwufPage() {
  const tasawwufData = await fetchTasawwufData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tasawwuf</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasawwufData.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image || "https://via.placeholder.com/300x200"}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{item.question || item.description}</p>
              <div className="mt-3 text-sm text-gray-500">
                <p>Date: {item.date}</p>
                <p>Shared by: {item.shared_by || "N/A"}</p>
                <p>Category ID: {item.category_id || "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
