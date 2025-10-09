// Fallback data for when API is unavailable
export const fallbackData = {
  blogs: [
    {
      id: 1,
      title: "Welcome to Our Islamic Learning Platform",
      slug: "welcome-islamic-learning",
      description: "Discover authentic Islamic knowledge and teachings.",
      image: "/placeholder-blog.jpg",
      created_at: new Date().toISOString(),
      is_published: 1,
      is_top: 1,
      author: { name: "Admin" },
      category: { id: 1, name: "General" },
    },
    {
      id: 2,
      title: "Understanding Islamic Principles",
      slug: "understanding-islamic-principles",
      description: "Learn the fundamental principles of Islam.",
      image: "/placeholder-blog.jpg",
      created_at: new Date().toISOString(),
      is_published: 1,
      is_top: 1,
      author: { name: "Scholar" },
      category: { id: 2, name: "Education" },
    },
    {
      id: 3,
      title: "Daily Islamic Practices",
      slug: "daily-islamic-practices",
      description: "Essential daily practices for Muslims.",
      image: "/placeholder-blog.jpg",
      created_at: new Date().toISOString(),
      is_published: 1,
      is_top: 0,
      author: { name: "Teacher" },
      category: { id: 3, name: "Practice" },
    },
  ],
  courses: [
    {
      id: 1,
      title: "Introduction to Islamic Studies",
      slug: "intro-islamic-studies",
      description: "Learn the fundamentals of Islamic knowledge.",
      image: "/placeholder-course.jpg",
      created_at: new Date().toISOString(),
      is_published: 1,
    },
  ],
  events: [
    {
      id: 1,
      title: "Weekly Islamic Gathering",
      slug: "weekly-gathering",
      description: "Join us for our weekly community gathering.",
      image: "/placeholder-event.jpg",
      created_at: new Date().toISOString(),
      is_published: 1,
    },
  ],
  books: [
    {
      id: 1,
      title: "The Holy Quran",
      slug: "holy-quran",
      description: "The sacred book of Islam.",
      image: "/placeholder-book.jpg",
      created_at: new Date().toISOString(),
      is_published: 1,
    },
  ],
  authors: [
    {
      id: 1,
      name: "Islamic Scholar",
      title: "Respected Scholar",
      image: "/placeholder-author.jpg",
      is_published: true,
      is_alive: true,
    },
  ],
  awlyaa: [
    {
      id: 1,
      name: "Distinguished Scholar",
      title: "Islamic Scholar",
      image: "/placeholder-awlyaa.jpg",
      is_published: 1,
    },
  ],
  gallery: [
    {
      id: 1,
      image: "/placeholder-gallery.jpg",
      title: "Islamic Architecture",
    },
  ],
  tasawwuf: [
    {
      id: 1,
      title: "Spiritual Reflections",
      slug: "spiritual-reflections",
      description: "Offline Tasawwuf content is shown while the connection is unavailable.",
      image: "/placeholder-tasawwuf.jpg",
      shared_by: "Admin",
      created_at: new Date().toISOString(),
      category: { id: 1, name: "Spirituality" },
    },
  ],
};

// Helper function to get fallback data
export function getFallbackData<T>(type: keyof typeof fallbackData): T[] {
  return fallbackData[type] as T[];
}
