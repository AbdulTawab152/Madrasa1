"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "../app/herosection/page";
import About from "../app/about/page";
import Blogs from "../app/components/blog/BlogCard";
import Course from "../app/components/courses/courseCard";

async function fetchBlogsData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/blogs";
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت لیست وبلاگ‌ها");
  return res.json();
}
async function fetchCourseData() {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/courses";
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت لیست وبلاگ‌ها");
  return res.json();
}

export default async function HomePage() {
  const blogs = await fetchBlogsData();
  const course = await fetchCourseData();
  return (
    <div>
      <Hero />
      <About />
      <Blogs blogs={blogs} showAll={false} />
      <Course courses={blogs} showAll={false} />
    </div>
  );
}
