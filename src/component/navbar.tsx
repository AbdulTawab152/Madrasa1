'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', route: '/' },
    { name: 'Blogs', route: '/blogs' },
    { name: 'Fatwa', route: '/iftah' },
    { name: 'Author', route: '/authors' },
    { name: 'Book', route: '/book' },
    { name: 'Courses', route: '/courses' },
    { name: 'Event', route: '/event' },
    { name: 'Tasawof', route: '/tasawwuf' },
    { name: 'Donation', route: '/donation' },
    { name: 'Graduation', route: '/graduated-students' },
    { name: 'Article', route: '/articles' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/">
            <span className="text-2xl font-bold text-blue-600">MyApp</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.route;
              return (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className={`font-medium transition duration-300 underline-offset-4 ${
                      isActive
                        ? 'text-blue-600 underline'
                        : 'text-gray-700 hover:text-blue-600 hover:underline'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          {navItems.map((item) => {
            const isActive = pathname === item.route;
            return (
              <Link
                key={item.route}
                href={item.route}
                className={`block px-6 py-3 font-medium transition duration-300 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
