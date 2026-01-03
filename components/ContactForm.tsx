"use client";

import { useState } from "react";

const BUSINESS_ID = "cmjxxmgkw0057gzar8krih4cg";
const API_ENDPOINT = "https://www.easygrow.contractors/api/leads/submit";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessId: BUSINESS_ID,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: "contact_page",
        }),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 p-8 rounded-lg text-center">
        <div className="text-green-600 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && <div className="bg-red-50 text-red-700 p-3 rounded">{errorMessage}</div>}
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name *" required className="w-full p-3 border rounded" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" required className="w-full p-3 border rounded" />
      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-3 border rounded" />
      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your hair goals..." rows={4} className="w-full p-3 border rounded"></textarea>
      <button type="submit" disabled={status === "submitting"} className="w-full bg-primary-600 text-white p-3 rounded font-semibold hover:bg-primary-700 disabled:opacity-50 transition">
        {status === "submitting" ? "Sending..." : "Book Consultation"}
      </button>
    </form>
  );
}
