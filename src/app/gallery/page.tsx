// src/app/gallery/page.tsx
import Gallery from "./../components/gallery/Gallery";

async function getImages() {
  const res = await fetch(
    "https://lawngreen-dragonfly-304220.hostingersite.com/api/gallery",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.json();
}

export default async function GalleryPage() {
  const images = await getImages();

  return <Gallery initialImages={images} />;
}
