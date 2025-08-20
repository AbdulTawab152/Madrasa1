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
      <body >
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
