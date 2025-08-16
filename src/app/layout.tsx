import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../component/navbar";

export const metadata: Metadata = {
  title: "Madrasa",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar ></Navbar>
        {children}
      </body>
    </html>
  );
}
