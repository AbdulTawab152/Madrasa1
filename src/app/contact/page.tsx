import ContactForm from "../components/contact/ContactForm";
import IslamicHeader from "../components/IslamicHeader";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <IslamicHeader 
        pageType="contact" 
        title="Contact Us"
        subtitle="Get in touch with us for any questions or support"
        alignment="center"
        cta={{
          label: "Send Message",
          href: "#contact-form"
        }}
      />
      <div className="w-full">
        <ContactForm />
      </div>
    </main>
  );
}
