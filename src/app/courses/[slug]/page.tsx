// app/event/[slug]/page.tsx
import Image from "next/image";

interface CourseDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  publish_date: string;
  created_date: string;
  duration?: string;
  video_quantity?: number;
  resolution?: "hd" | string;
  space?: number;
  short_video?: boolean;
  image?: string;
  video?: string;
  is_published: boolean;
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Fetches the details of a course by its slug.
 * 
 * @param {string} slug - The slug of the course.
 * @returns {Promise<CourseDetail>} A promise that resolves to the course's details.
 * @throws {Error} If the fetch request fails.
 */
/*******  0d699b95-e1de-47a5-b600-4ed8a931d36b  *******/async function fetchCourseDetail(slug: string): Promise<CourseDetail> {
  const API_URL = `https://lawngreen-dragonfly-304220.hostingersite.com/api/course/${slug}`;
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch course detail");
  return res.json();
}

const getFileUrl = (path?: string) => {
  if (!path) return null;
  return path.startsWith("http")
    ? path
    : `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${path}`;
};

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await fetchCourseDetail(params.slug);
  if (!course) return <div>دوره‌ای یافت نشد.</div>;

  return (
    <main className="min-h-screen relative">
      {/* Fullscreen hero */}
      <div className="relative h-[600px] w-full">
        
          <Image
            src={getFileUrl(course.image) || "https://via.placeholder.com/1920x1080"}
            alt={course.title}
            fill
            className="object-cover"
          />
       

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50  flex-col justify-center items-center p-6">
          <span className="absolute left-1/3 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-xl md:text-6xl font-bold  text-white mb-4">{course.title}</h1>
          <p className="text-lg md:text-3xl w-[400px] text-white max-w-3xl">{course.description}</p>
          </span>
        </div>
      </div>

      {/* Course stats (optional, below hero) */}
      <div className="max-w-6xl absolute top-[620px] left-10 w-full  mx-auto bg-white  shadow-lg p-10 -mt-24  z-10">
        <div className="grid grid-cols-2  md:grid-cols-4 gap-4 text-gray-700">
          {/* <div>
            <p className="font-semibold">Publish Date</p>
            <p>{new Date(course.publish_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Created Date</p>
            <p>{new Date(course.created_date).toLocaleDateString()}</p>
          </div> */}
          {course.duration && (
            <div>
              <p className="font-semibold">Duration</p>
              <p>{course.duration}</p>
            </div>
          )}
          {course.video_quantity !== undefined && (
            <div>
              
              <p className="font-semibold">Video Quantity</p>
              <p>{course.video_quantity}</p>
            </div>
          )}
          {course.resolution && (
            <div>
              <p className="font-semibold">Resolution</p>
              <p>{course.resolution}</p>
            </div>
          )}
          {course.space !== undefined && (
            <div>
              <p className="font-semibold">Space</p>
              <p>{course.space} MB</p>
            </div>
          )}
         
        </div>
        
      </div>
      <div className="p-24">
      
          <div>
            <p className="font-semibold">Published</p>
            <p>{course.is_published ? "Yes" : "No"}</p>
              <video
            src={getFileUrl(course.video) || ""}
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          </div>

             <p className="font-semibold">Published</p>
            <p>{course.is_published ? "Yes" : "No"}</p>

          </div>
    </main>
  );
}
