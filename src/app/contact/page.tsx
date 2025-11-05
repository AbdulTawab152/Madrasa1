import ContactForm from "../components/contact/ContactForm";
import IslamicHeader from "../components/IslamicHeader";
import Breadcrumb from "@/components/Breadcrumb";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="contact" 
        alignment="center"
        cta={{
          label: "پیغام واستوئ",
          href: "#contact-form"
        }}
      />
      <Breadcrumb />
      <div className="w-full">
        <ContactForm />
      </div>
    </main>
  );
}
