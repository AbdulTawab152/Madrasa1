"use client";

import TasawwufList from "../components/tasawuuf/TasawwufList";

export default function TasawwufPage() {
  return (
    <main className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">📿 تصوف Articles</h1>
        <TasawwufList homePage={false} />
      </div>
    </main>
  );
}
