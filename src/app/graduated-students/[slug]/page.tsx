import Image from 'next/image';
import { fetchWithCache } from '../../../lib/api';
import { endpoints } from '../../../lib/config';
import { Graduation } from '../../../lib/types';

interface GraduationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchGraduation(slug: string): Promise<Graduation> {
  try {
    const data = await fetchWithCache<Graduation>(`${endpoints.events}/graduations/${slug}`);
    return data;
  } catch (error) {
    throw new Error("Graduation not found");
  }
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

export default async function GraduationDetailPage({ params }: GraduationPageProps) {
  const { slug } = await params;

  try {
    const graduation = await fetchGraduation(slug);

    return (
      <main className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              {graduation.photo ? (
                <Image
                  src={getImageUrl(graduation.photo)}
                  alt={graduation.studentName}
                  className="w-full h-96 md:h-full object-cover"
                  width={400}
                  height={600}
                />
              ) : (
                <div className="w-full h-96 md:h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No Photo</span>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{graduation.studentName}</h1>
              
              <div className="space-y-4 text-gray-600">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Graduation Date:</strong> {new Date(graduation.graduationDate).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Course:</strong> {graduation.course || "N/A"}
                  </div>
                  <div>
                    <strong>Grade:</strong> {graduation.grade || "N/A"}
                  </div>
                </div>
                
                {graduation.testimonial && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Testimonial</h3>
                    <p className="text-gray-700 italic">"{graduation.testimonial}"</p>
                  </div>
                )}
                
                {graduation.achievements && graduation.achievements.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Achievements</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {graduation.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {graduation.certificate && (
                  <div className="mt-6">
                    <a
                      href={graduation.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Certificate
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Graduation Not Found</h1>
          <p className="text-gray-600">The requested graduation record could not be found.</p>
        </div>
      </main>
    );
  }
}
