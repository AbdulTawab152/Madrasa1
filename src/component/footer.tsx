"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart, GraduationCap } from "lucide-react";
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { t: tRaw } = useTranslation('common', { useSuspense: false });
  
  // Create a wrapper that always returns a string
  const t = (key: string): string => {
    const result = tRaw(key);
    return typeof result === 'string' ? result : key;
  };

  return (
  <footer className="relative bg-gradient-to-b from-slate-800 to-slate-900 mt-16 overflow-hidden">
    {/* Simple Pattern Background */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3Cpath d='M20 20c0 11.046 8.954 20 20 20V20H20z'/%3E%3C/g%3E%3C/svg%3E")`
    }}></div>
    
    {/* Simple Accent Line */}
    
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
    
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
            <Image
              src="/1.jpg" 
              alt={t('footer.brandName')} 
              width={30}
              height={30}
              className="object-contain rounded"
            />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">{t('footer.brandName')}</h2>
            <p className="text-amber-200 text-sm">{t('footer.tagline')}</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Navigation */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-amber-500 pb-2">
            Navigation
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/courses" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              Courses
            </Link>
            <Link href="/books" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              Books
            </Link>
            <Link href="/authors" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              Authors
            </Link>
            <Link href="/blogs" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              Blogs
            </Link>
            <Link href="/articles" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              Articles
            </Link>
            <Link href="/events" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              Events
            </Link>
            <Link href="/graduated" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              Graduates
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-amber-300 transition-colors text-sm">
              About
            </Link>
          </div>
        </div>


        {/* Contact & Social */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-amber-500 pb-2">
            Contact
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t('footer.address')}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t('footer.phone')}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-amber-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t('footer.email')}</span>
            </div>
          </div>
          
          {/* Social Media */}
          <div className="pt-4">
            <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-slate-700/50 text-gray-300 hover:bg-amber-500 hover:text-white transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-slate-700/50 text-gray-300 hover:bg-amber-500 hover:text-white transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-slate-700/50 text-gray-300 hover:bg-amber-500 hover:text-white transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="w-9 h-9 bg-slate-700/50 text-gray-300 hover:bg-amber-500 hover:text-white transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4 border-b border-amber-500 pb-2">
            Stay Updated
          </h3>
          
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder={t('footer.emailPlaceholder')} 
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-all duration-300 text-sm"
              />
              <Button 
                type="submit" 
                variant="primary"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 rounded-lg transition-all duration-300 text-sm"
              >
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-amber-500/30 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-gray-300">
            <GraduationCap className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-medium">&copy; {new Date().getFullYear()} {t('footer.copyright')}</span>
            <Heart className="h-4 w-4 text-amber-400" />
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Button variant="link" className="text-gray-400 hover:text-amber-300 p-0 h-auto font-medium transition-colors text-sm">
              {t('footer.privacyPolicy')}
            </Button>
            <Button variant="link" className="text-gray-400 hover:text-amber-300 p-0 h-auto font-medium transition-colors text-sm">
              {t('footer.termsOfService')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
