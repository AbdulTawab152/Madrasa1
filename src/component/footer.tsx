import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-gradient-to-br from-orange-50 to-amber-50 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Brand & Tagline */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/1.jpg" 
              alt="Madrasa Logo" 
              width={40}
              height={40}
              className="object-contain rounded-full" 
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Madrasa</h3>
              <p className="text-sm text-gray-600">Knowledge for Everyone</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            Dedicated to spreading knowledge and guidance through quality education and community service.
          </p>
          <div className="flex gap-3">
            <button className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
              <Facebook className="h-4 w-4" />
            </button>
            <button className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
              <Twitter className="h-4 w-4" />
            </button>
            <button className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
              <Instagram className="h-4 w-4" />
            </button>
            <button className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-colors">
              <Linkedin className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
  <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
  <ul className="grid  grid-cols-2 gap-2">
    <li>
      <Link href="/blogs" className="text-gray-600 hover:text-orange-600 transition-colors">
        Blogs
      </Link>
    </li>
    <li>
      <Link href="/courses" className="text-gray-600 hover:text-orange-600 transition-colors">
        Courses
      </Link>
    </li>
    <li>
      <Link href="/authors" className="text-gray-600 hover:text-orange-600 transition-colors">
        Authors
      </Link>
    </li>
    <li>
      <Link href="/books" className="text-gray-600 hover:text-orange-600 transition-colors">
        Books
      </Link>
    </li>
    <li>
      <Link href="/events" className="text-gray-600 hover:text-orange-600 transition-colors">
        Events
      </Link>
    </li>
    <li>
      <Link href="/iftah" className="text-gray-600 hover:text-orange-600 transition-colors">
        Iftah
      </Link>
    </li>
    <li>
      <Link href="/articles" className="text-gray-600 hover:text-orange-600 transition-colors">
        Articles
      </Link>
    </li>
    <li>
      <Link href="/graduated" className="text-gray-600 hover:text-orange-600 transition-colors">
        Graduated
      </Link>
    </li>
    <li>
      <Link href="/awlyaa" className="text-gray-600 hover:text-orange-600 transition-colors">
        Awlyaa
      </Link>
    </li>
  </ul>
</div>


        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Contact Info</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Pashtun Zarghon, Herat, Afghanistan</span>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Phone className="h-4 w-4 text-orange-500" />
              <span className="text-sm">+93 700 000 000</span>
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4 text-orange-500" />
              <span className="text-sm">info@madrasa.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Newsletter</h4>
          <p className="text-gray-600 text-sm">
            Subscribe for updates and announcements.
          </p>
          <form className="space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-400"
            />
            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-orange-200 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">&copy; {new Date().getFullYear()} Madrasa. All rights reserved.</span>
            <Heart className="h-4 w-4 text-orange-500" />
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <button className="hover:text-orange-600 transition-colors">Privacy Policy</button>
            <button className="hover:text-orange-600 transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
