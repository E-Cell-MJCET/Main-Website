"use client";
import React, { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/utils/supabase";

function SponsorUs() {
  const formRef = useRef<HTMLFormElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current);
      const { error } = await supabase.from("HackCelerate_ContactForm").insert([
        {
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error((error as Error).message || "Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#111", color: "#7BF1A7" } }}
      />

      <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl font-block mb-4 sm:mb-6 text-[#7BF1A7]">
            Interested in Sponsoring?
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
            Join our growing list of sponsors and connect with top talent and
            innovative projects.
          </p>
          <button
            onClick={scrollToContact}
            className="bg-[#7BF1A7] hover:bg-[#65D18F] text-black font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all transform hover:scale-105"
          >
            Become a Sponsor
          </button>
        </div>
      </section>

      <section
        ref={contactRef}
        className="container mx-auto px-4 py-12 sm:py-20"
      >
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-block mb-3 sm:mb-4 text-[#7BF1A7]">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-300 px-4">
            Have questions about HACK-CELERATE? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-4 sm:gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-7 bg-gray-900 p-4 sm:p-8 rounded-2xl">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#7BF1A7]">
              <Send className="text-[#7BF1A7]" size={24} />
              Send us a Message
            </h3>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-gray-800 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BF1A7] text-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="bg-gray-800 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BF1A7] text-white"
                />
              </div>
              <select
                name="subject"
                required
                className="bg-gray-800 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BF1A7] text-white"
              >
                <option value="">Select a subject</option>
                <option value="sponsorship">Sponsorship Inquiry</option>
                <option value="partnership">Registration</option>
                <option value="partnership">General Enquiry</option>
                <option value="partnership">Technical Support</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={6}
                className="bg-gray-800 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BF1A7] text-white"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7BF1A7] hover:bg-[#65D18F] text-black font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7BF1A7] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="md:col-span-5 space-y-4 sm:space-y-8">
            <div className="bg-gray-900 p-4 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-3 sm:mb-4">
                <Mail className="text-[#7BF1A7]" size={24} />
                <h3 className="text-lg sm:text-xl font-semibold text-[#7BF1A7]">
                  Email Us
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Questions? Drop us a line
              </p>
              <a
                href="mailto:sponsors@example.com"
                className="text-[#7BF1A7] hover:text-[#65D18F]"
              >
                ecellmjcet@mjcollege.ac.in
              </a>
            </div>

            <div className="bg-gray-900 p-4 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-3 sm:mb-4">
                <MapPin className="text-[#7BF1A7]" size={24} />
                <h3 className="text-lg sm:text-xl font-semibold text-[#7BF1A7]">
                  Location
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400">Visit Us</p>
              <p className="text-[#7BF1A7]">
                Next to Veg Canteen, MJCET, Banjaara Hills
              </p>
            </div>

            <div className="bg-gray-900 p-4 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-3 sm:mb-4">
                <Phone className="text-[#7BF1A7]" size={24} />
                <h3 className="text-lg sm:text-xl font-semibold text-[#7BF1A7]">
                  Call Us
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Syed Shujauddin, Chief Coordinator
              </p>
              <a
                href="tel:+1234567890"
                className="text-[#7BF1A7] hover:text-[#65D18F]"
              >
                +91 955130124
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SponsorUs;
