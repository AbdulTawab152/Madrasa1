"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

// کامپوننت نمایش 3 مقاله برتر
export function TopArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('https://lawngreen-dragonfly-304220.hostingersite.com/api/top-articles')
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log('API data:', data);
      setArticles(data.slice(0, 3));
      setLoading(false);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setLoading(false);
    });
}, []);

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (articles.length === 0) return <p className="text-center mt-10">مقاله‌ای پیدا نشد.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map(article => (
        <Link key={article.id} href="/article">
          <a className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">{article.title}</h2>
            <p className="text-gray-700 line-clamp-3">
              {article.description || article.excerpt || article.content || 'بدون توضیح'}
            </p>
          </a>
        </Link>
      ))}
    </div>
  );
}

// کامپوننت ساده نمایش یک مقاله (مثال)
export function ArticleSimple({ article }) {
  return (
    <article className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">{article.title}</h1>
      <p className="text-gray-500 italic mb-8">منتشر شده در {article.publishedAt || 'تاریخ نامشخص'}</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">توضیحات</h2>
        <p className="text-gray-700 leading-relaxed">{article.description || article.content || 'بدون محتوا'}</p>
      </section>

      <footer className="border-t pt-4 text-gray-600">نوشته شده توسط {article.author || 'ناشناس'}</footer>
    </article>
  );
}
