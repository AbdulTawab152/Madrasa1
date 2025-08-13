"use client";

import React from "react";
import AdmissionForm from "../components/AdmissionForm";

interface AdmissionFormData {
  name: string;
  degree: string;
  // add other form fields as needed
}

interface Degree {
  id: number;
  name: string;
}

const degrees: Degree[] = [
  { id: 1, name: "Bachelor" },
  { id: 2, name: "Master" },
  { id: 3, name: "PhD" },
];

export default function AdmissionPage() {
  async function handleSubmit(data: AdmissionFormData) {
    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit admission");
      }
      alert("Admission submitted successfully!");
    } catch (error) {
      alert("Error submitting admission: " + (error as Error).message);
    }
  }

  return <AdmissionForm degrees={degrees} onSubmit={handleSubmit} />;
}
