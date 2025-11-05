// app/authors/[id]/page.tsx
import Image from "next/image";
import { AuthorsApi } from "../../../lib/api";
import { Author } from "../../../lib/types";
import {
 
  Calendar,
  BookOpen,
  GraduationCap,
 
  Heart,


  Award,
  MapPin,
  BookText,
 
} from "lucide-react";
import { FaPhone, FaUser } from "react-icons/fa6";
import { getImageUrl } from "@/lib/utils";
import Breadcrumb from "@/components/Breadcrumb";

interface AuthorPageProps {
  params: Promise<{ id: string }>;
}

async function fetchAuthor(id: string): Promise<Author> {
  try {
    const response = await AuthorsApi.getById(id);
    if (!response.success) {
      throw new Error(response.error || "Author not found");
    }

    return response.data as Author;
  } catch (error) {
    throw new Error("Author not found");
  }
}

export default async function AuthorDetailPage({ params }: AuthorPageProps) {
  const { id } = await params;
  const author = await fetchAuthor(id);

  return (
    <main className="max-w-4xl mt-32 mx-auto py-12 px-6 bg-gray-50 min-h-screen font-sans">
      <Breadcrumb />
      <div className="bg-white rounded-3xl overflow-hidden p-8">
        {/* Profile Image */}
        <div className="flex flex-col items-center text-center relative">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-500 shadow-lg">
            {author.image ? (
              <Image
                src={
                  getImageUrl(author.image, "/placeholder-author.jpg") ||
                  "/placeholder-author.jpg"
                }
                alt={`${author.first_name} ${author.last_name}`}
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                No Image
              </div>
            )}
            {/* Alive / Dead Dot on Image */}
            <div
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white 
                ${author.is_alive ? "bg-green-500 animate-pulse" : "bg-red-500"}
              `}
            ></div>
          </div>

          {/* Name */}
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            {author.first_name} {author.last_name}
          </h1>
          <div
            className="text-gray-700 text-sm [&_*]:text-[14px]" 
            dangerouslySetInnerHTML={{ __html: (author.bio) }}
          />
        </div>

        {/* Info Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <FaUser className="text-amber-500" size={20} />
            <p>
              <strong>Father:</strong> {author.father_name || "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <FaUser className="text-amber-500" size={20} />
            <p>
              <strong>Grandfather:</strong> {author.grandfather_name || "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <Calendar className="text-amber-500" size={20} />
            <p>
              <strong>DOB:</strong> {author.dob ?.replace(/<[^>]*>/g, "")}
            </p>
          </div>
     


          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <MapPin className="text-amber-500" size={20} />
            <p>
              <strong>Address:</strong> {author.full_address || "N/A"}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
            <FaPhone className="text-amber-500" size={20} />
            <p>
              <strong>Contact:</strong> {author.contact_no || "N/A"}
            </p>
          </div>

          {/* Alive Status */}

          {/* Published Status */}
        </div>
      </div>
    </main>
  );
}
