import ScrollToTop from "@/components/ScrollToTop";

export default function IftahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}

