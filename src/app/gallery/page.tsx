import { GalleryApi, extractArray } from "@/lib/api";
import Gallery from "./../components/gallery/Gallery";
import IslamicHeader from "../components/IslamicHeader";

async function getImages() {
  const response = await GalleryApi.getAll();
  if (!response.success) {
    throw new Error(response.error || "Failed to fetch gallery");
  }

  return extractArray<Record<string, unknown>>(response.data);
}

export default async function GalleryPage() {
  const images = await getImages();

  return (
    <div>
      <IslamicHeader pageType="gallery" title="Photo Gallery" />
      <div className="pb-16">
        <Gallery initialImages={images} />
      </div>
    </div>
  );
}
