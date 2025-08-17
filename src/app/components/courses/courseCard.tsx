import Link from "next/link";
import Image from "next/image";

interface Course {
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
  lessons?: number;
  enrolled?: string;
}

interface CoursesSectionProps {
  courses: Course[];
  showAll?: boolean;
}

export default function CoursesSection({ courses, showAll = false }: CoursesSectionProps) {
  const sortedCourses = courses
    ?.filter(course => course.is_published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  const displayCourses = showAll ? sortedCourses : sortedCourses.slice(0, 3);

  const getImageUrl = (img?: string) => {
    if (img && img.startsWith("http")) return img;
    return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
  };

  return (
    <section className="p-8 bg-green-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-600 relative inline-block">
          {showAll ? "All Courses" : "Latest Courses"}
          <span className="block h-1 w-16 bg-green-500 mx-auto mt-2 rounded"></span>
        </h2>
        <p className="text-gray-500 mt-2">
          {showAll
            ? "Explore all courses and learning paths"
            : "Check out our latest courses"}
        </p>
      </div>

      <div className=" grid grid-cols-3 gap-10">
        {displayCourses.map(course => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="block bg-white w-[400px] h-[500px] shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            {/* Course Image */}
            <div className="relative">
              {course.image ? (
                <Image
                  src={getImageUrl(course.image)}
                  alt={course.title}
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-48 bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">No Image</span>
                </div>
              )}
              {/* Free Badge */}
              {/* <span className="absolute -bottom-10 right-2 bg-blue-600 text-white text-xl  font-semibold px-5 py-6 rounded-full">
                Free
              </span> */}
            </div>

            {/* Course Info */}
            <div className="p-4 relative flex space-y-2 flex-col justify-between h-[152px]">
              <div>
              
                <h2 className="mt-1 text-2xl font-bold text-gray-800">{course.title}</h2>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">{course.name}</h2>
                <h2 className="mt-1 text-2xl font-bold text-gray-800">{course.enrolled}</h2>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 mr-2">
                    {"★".repeat(Math.floor(course.rating || 5))}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {course.rating?.toFixed(1) || "5.0"} ({course.enrolled || "1.2k"})
                  </span>
                </div>

                <hr className="my-3" />

                {/* Lessons & Enrolled - fade & slide on hover */}
                <div className="flex justify-between pt-6 text-gray-600 text-sm transition-all duration-300 transform group-hover:translate-y-[-10px] group-hover:opacity-0">
                  <span className="border w-40 h-10 flex items-center justify-center   rounded-sm">📚 {course.lessons || 8} Lessons</span>
                  <span className="border w-40 h-10 flex items-center justify-center   rounded-sm">👥 {course.enrolled || "25k"} Enrolled</span>
                </div>
              </div>

              {/* Course Details Button - fade & slide in */}
              <div className="mt-4  h-40  transition-all duration-300 transform opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0">
                <button className="w-full absolute h-14 -bottom-0 bg-yellow-500 text-white font-semibold py-2 px-20 hover:bg-yellow-600 transition">
                  Course Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {!showAll && displayCourses.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/courses"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition shadow-lg"
          >
            See All Courses
          </Link>
        </div>
      )}
    </section>
  );
}
