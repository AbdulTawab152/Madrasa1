import IftahQuestionForm from "@/app/components/iftah/IftahQuestionForm";

// App Configuration
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Anwarul Uloom',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Islamic Learning Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const;

// API Configuration
const defaultApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawngreen-dragonfly-304220.hostingersite.com/api';

const inferStorageBase = () => {
  if (process.env.NEXT_PUBLIC_API_STORAGE_URL) {
    return process.env.NEXT_PUBLIC_API_STORAGE_URL;
  }

  // Try the correct storage path structure
  const baseUrl = defaultApiBase.replace('/api', '');
  return `${baseUrl}/madrasa/public/storage`;
};

export const apiConfig = {
  baseUrl: defaultApiBase, // Always use domain-based API
  storageBaseUrl: inferStorageBase(),
  cache: {
    duration: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '300'), // 5 minutes for better performance
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_INTERVAL || '300'), // 5 minutes
  },
} as const;

// Generate endpoints from base URL
export const endpoints = {
  blogs: `${apiConfig.baseUrl}/blogs`,
  courses: `${apiConfig.baseUrl}/courses`,
  // course: `${apiConfig.baseUrl}/course`,
  authors: `${apiConfig.baseUrl}/authors`,
  books: `${apiConfig.baseUrl}/books`,
  book: `${apiConfig.baseUrl}/book`,
  events: `${apiConfig.baseUrl}/events`,  // لیست
  event: `${apiConfig.baseUrl}/event`, 
  iftah: `${apiConfig.baseUrl}/iftah`,
  articles: `${apiConfig.baseUrl}/articles`,
  graduated: `${apiConfig.baseUrl}/graduations`,
  awlyaa: `${apiConfig.baseUrl}/awlyaa`,
  gallery: `${apiConfig.baseUrl}/gallery`,
  donation: `${apiConfig.baseUrl}/donate-info-for-web`,
  tasawwuf: `${apiConfig.baseUrl}/tasawwuf`,
  contact: `${apiConfig.baseUrl}/contact`,
  IftahQuestionForm: `${apiConfig.baseUrl}/iftah-question`,
} as const;


// Feature Flags
export const features = {
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  notifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
  search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
} as const;

// Navigation Configuration
export const navigation = {
  main: [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Courses', href: '/courses', icon: 'course' },
    { name: 'iftah', href: '/iftah', icon: 'fatwa' },
  
    { name: 'Article', href: '/articles', icon: 'article' },
    { name: 'Awalyaa', href: '/awlayaa', icon: 'awlayaa' },
   
    { name: 'Books', href: '/book', icon: 'book' },
    { name: 'Donation', href: '/donation', icon: 'donation' },
    { name: 'Blogs', href: '/blogs', icon: 'blog' },
    { name: 'Author', href: '/authors', icon: 'author' },

    { name: 'Event', href: '/event', icon: 'event' },
    { name: 'Tasawof', href: '/tasawwuf', icon: 'tasawwuf' },
    { name: 'Graduation', href: '/graduated-students', icon: 'graduation' },
  
    {name : "contact" ,  href: "/contact"}
  
    // { name: 'Gallery', href: '/gallery', icon: '' },
  ],
} as const;
