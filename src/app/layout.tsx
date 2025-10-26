import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import Navbar from "../component/navbar";
import Footer from "@/component/footer";
import I18nProvider from "@/components/I18nProvider";
import { ToastProvider } from "@/components/Toast";

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
        <Script
          id="gtranslate-settings"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.gtranslateSettings = {
                "default_language": "ps",
                "languages": ["ps", "en", "fa", "ar", "ur", "tr", "uz"],
                "wrapper_selector": ".gtranslate_wrapper"
              };
            `,
          }}
        />
        <Script
          src="https://cdn.gtranslate.net/widgets/latest/float.js"
          strategy="lazyOnload"
        />
        <div className="gtranslate_wrapper"></div>
        <ToastProvider>
          <I18nProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer/>
          </I18nProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
