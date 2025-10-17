import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../component/navbar";
import Footer from "@/component/footer";
import I18nProvider from "@/components/I18nProvider";

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
    <html data-scroll-behavior="smooth" dir="rtl" lang="ps">
      <body>
        <I18nProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer/>
        </I18nProvider>
      </body>
    </html>
  );
}
