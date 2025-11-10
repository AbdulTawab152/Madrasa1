"use client";

import "./WhatsAppButton.css";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+93796148087";
  const message = "اسلام علیکم ورحمته الله و برکاته";
  // Remove spaces and special characters from phone number for WhatsApp URL
  const cleanPhoneNumber = phoneNumber.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  return (
    <div className="fixed bottom-4 right-4 lg:bottom-7 lg:right-6 z-50 flex items-center justify-center">
      <div className="loader">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
          <FaWhatsapp className="text-2xl text-white" />
        </a>
      </div>
    </div>
  );
};

export default WhatsAppButton;

