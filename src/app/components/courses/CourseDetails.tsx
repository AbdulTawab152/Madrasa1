// app/components/courses/CourseDetails.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/app/courses/data";
import { ArrowLeft } from "lucide-react";

interface CourseDetailsProps {
  course: Course;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10">
      {/* Back Button */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Courses
      </Link>

      {/* Course Image */}
      <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl mb-10 group">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
            {course.title}
          </h1>
        </div>
      </div>

      {/* Recorded By Section */}
      <section className="mt-10 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
    Recorded By
  </h2>

  <div className="flex flex-col sm:flex-row items-center gap-6">
    {/* Image */}
    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md transform hover:scale-105 transition duration-300">
      <Image
        src={course.recorded_by.image || "/images/default-avatar.png"}
        alt={`${course.recorded_by.first_name} ${course.recorded_by.last_name}`}
        fill
        className="object-cover"
      />
    </div>

    {/* Details */}
    <div className="flex-1 space-y-2">
      <p className="text-xl font-semibold text-gray-900 dark:text-white">
        {course.recorded_by.first_name} {course.recorded_by.last_name}
        <span className="text-gray-500 text-sm ml-1">
          ({course.recorded_by.father_name})
        </span>
      </p>

      <div className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
        <p>📍 {course.recorded_by.full_address}</p>
        <p>🎂 DOB: {course.recorded_by.dob}</p>
        {course.recorded_by.contact_no && <p>📞 {course.recorded_by.contact_no}</p>}
        <p className={course.recorded_by.is_alive ? "text-green-600" : "text-red-600"}>
          {course.recorded_by.is_alive ? "🟢 Alive" : "🔴 Deceased"}
        </p>
      </div>

      <hr className="border-gray-200 dark:border-gray-700 my-3" />

      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {course.recorded_by.description}
      </p>
    </div>
  </div>
</section>


      {/* Course Description */}
      <p className="mt-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
        {course.description}
      </p>

      {/* Course Info Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Duration", value: course.duration },
          { label: "Videos", value: `${course.video_quantity} videos` },
          { label: "Resolution", value: course.resolution.toUpperCase() },
          { label: "Space", value: course.space },
          { label: "Publish Date", value: course.publish_date },
          { label: "Created Date", value: course.created_date },
          { label: "Book ID", value: course.book_id },
          { label: "Recorded By ID", value: course.recorded_by_id },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur rounded-xl p-6 shadow hover:shadow-blue-400/40 transition-shadow duration-300 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {label}
            </p>
            <p className="font-semibold text-lg text-gray-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Short Video Preview */}
      {course.short_video && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Preview
          </h2>
          <video
            controls
            src={course.short_video}
            className="w-full rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700"
          />
        </section>
      )}
    </div>
  );
};

export default CourseDetails;
