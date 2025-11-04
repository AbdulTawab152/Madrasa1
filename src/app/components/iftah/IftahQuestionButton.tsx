"use client";

import { useState } from "react";
import IftahQuestionForm from "./IftahQuestionForm";
import { FaQuestionCircle } from "react-icons/fa";

interface IftahQuestionButtonProps {
  variant?: "header" | "prominent";
}

export default function IftahQuestionButton({ variant = "header" }: IftahQuestionButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const buttonClasses = variant === "prominent" 
    ? "inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
    : "inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 px-5 py-3 rounded-lg transition-all duration-300 group border border-white/20 backdrop-blur-sm";

  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className={buttonClasses}
      >
        <FaQuestionCircle className={`${variant === "prominent" ? "w-6 h-6" : "w-5 h-5"} group-hover:scale-110 transition-transform ${variant === "prominent" ? "text-white" : "text-white"}`} />
        <span className={`${variant === "prominent" ? "text-white font-bold" : "font-medium text-white"}`}>
          {variant === "prominent" ? "سوال شرعی بپرسید" : "سوال بپرسید"}
        </span>
      </button>

      <IftahQuestionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}

