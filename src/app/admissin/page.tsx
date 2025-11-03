"use client";
import React, { useState } from "react";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    grandfather_name: "",
    dob: "",
    phone: "",
    whatsapp_no: "",
    blood_type: "",
    permanent_province: "",
    permanent_distract: "",
    permanent_vilage: "",
    current_province: "",
    current_distract: "",
    current_vilage: "",
    previous_degree: "",
    previous_madrasa: "",
    location_madrasa: "",
    location: "",
    degree_id: 1,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://lawngreen-dragonfly-304220.hostingersite.com/api/admissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error sending data!");

      const data = await response.json();
      console.log("✅ Success:", data);
      alert("Form submitted successfully!");
      setFormData({
        first_name: "",
        last_name: "",
        father_name: "",
        grandfather_name: "",
        dob: "",
        phone: "",
        whatsapp_no: "",
        blood_type: "",
        permanent_province: "",
        permanent_distract: "",
        permanent_vilage: "",
        current_province: "",
        current_distract: "",
        current_vilage: "",
        previous_degree: "",
        previous_madrasa: "",
        location_madrasa: "",
        location: "",
        degree_id: 1,
      });
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Failed to send data. Check console.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Admission Form</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {Object.keys(formData).map((key) => (
          key !== "degree_id" && (
            <input
              key={key}
              name={key}
              value={(formData as any)[key]}
              onChange={handleChange}
              placeholder={key.replaceAll("_", " ")}
              className="border p-2 rounded"
            />
          )
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
