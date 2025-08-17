import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../component/navbar";

export const metadata: Metadata = {
  title: "Madsreqa - Islamic Learning Platform",
  description: "Discover authentic Islamic teachings, connect with scholars, and strengthen your faith",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        <Navbar />
        <main style={{ paddingTop: '90px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
