"use client";

import TasawwufList from "../components/tasawuuf/TasawwufList";
import IslamicHeader from "../components/IslamicHeader";

export default function TasawwufPage() {
  return (
    <main>
      <IslamicHeader pageType="tasawwuf" title="Tasawwuf & Spirituality" />
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <TasawwufList homePage={false} />
        </div>
      </div>
    </main>
  );
}
