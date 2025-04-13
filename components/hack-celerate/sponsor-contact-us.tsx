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
      <section className="container mx-auto px-4 py-12 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-4 font-block text-3xl text-[#7BF1A7] sm:mb-6 sm:text-5xl">
            Interested in Sponsoring?
          </h1>
          <p className="mb-6 text-sm text-gray-300 sm:mb-8 sm:text-base">
            Join our growing list of sponsors and connect with top talent and
            innovative projects.
          </p>
          <button
            onClick={scrollToContact}
            className="rounded-lg bg-[#7BF1A7] px-6 py-2 font-semibold text-black transition-all hover:scale-105 hover:bg-[#65D18F] sm:px-8 sm:py-3"
          >
            Become a Sponsor
          </button>
        </div>
      </section>
      <section
        ref={contactRef}
        className="container mx-auto px-4 py-12 sm:py-20"
      >
        <div className="mb-8 text-center sm:mb-16">
          <h2 className="mb-3 font-block text-3xl text-[#7BF1A7] sm:mb-4 sm:text-5xl">
            Get in Touch
          </h2>
          <p className="px-4 text-sm text-gray-300 sm:text-base">
            Have questions about HACK-CELERATE? We&apos;re here to help!
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl gap-4 sm:gap-8 md:grid-cols-12">
          <div className="rounded-2xl bg-gray-900 p-4 sm:p-8 md:col-span-7">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#7BF1A7] sm:mb-6 sm:text-xl">
              <Send className="text-[#7BF1A7]" size={24} />
              Send us a Message
            </h3>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7BF1A7]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7BF1A7]"
                />
              </div>
              <select
                name="subject"
                required
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7BF1A7]"
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
                className="w-full rounded-lg bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7BF1A7]"
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#7BF1A7] px-6 py-2 font-semibold text-black transition-all hover:scale-105 hover:bg-[#65D18F] focus:outline-none focus:ring-2 focus:ring-[#7BF1A7]/50 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="space-y-4 sm:space-y-8 md:col-span-5">
            <div className="rounded-2xl bg-gray-900 p-4 sm:p-8">
              <div className="mb-3 flex items-center gap-4 sm:mb-4">
                <Mail className="text-[#7BF1A7]" size={24} />
                <h3 className="text-lg font-semibold text-[#7BF1A7] sm:text-xl">
                  Email Us
                </h3>
              </div>
              <p className="text-sm text-gray-400 sm:text-base">
                Questions? Drop us a line
              </p>
              <a
                href="mailto:sponsors@example.com"
                className="text-[#7BF1A7] hover:text-[#65D18F]"
              >
                ecellmjcet@mjcollege.ac.in
              </a>
            </div>
            <div className="rounded-2xl bg-gray-900 p-4 sm:p-8">
              <div className="mb-3 flex items-center gap-4 sm:mb-4">
                <MapPin className="text-[#7BF1A7]" size={24} />
                <h3 className="text-lg font-semibold text-[#7BF1A7] sm:text-xl">
                  Location
                </h3>
              </div>
              <p className="text-sm text-gray-400 sm:text-base">Visit Us</p>
              <p className="text-[#7BF1A7]">
                Mount Pleasant, 8-2-249 to 267, Road No. 3, Banjara Hills,
                Hyderabad - 500 034, Telangana State, India
              </p>
            </div>
            <div className="rounded-2xl bg-gray-900 p-4 sm:p-8">
              <div className="mb-3 flex items-center gap-4 sm:mb-4">
                <Phone className="text-[#7BF1A7]" size={24} />
                <h3 className="text-lg font-semibold text-[#7BF1A7] sm:text-xl">
                  Call Us
                </h3>
              </div>
              <p className="text-sm text-gray-400 sm:text-base">
                Syed Shujauddin, Chief Coordinator
              </p>
              <a
                href="tel:+91955130124"
                className="text-[#7BF1A7] hover:text-[#65D18F]"
              >
                +91 955130124
              </a>
              <p className="text-sm text-gray-400 sm:text-base">
                Abid Nafi, Chief Technology Officer
              </p>
              <a
                href="tel:+919491951924"
                className="text-[#7BF1A7] hover:text-[#65D18F]"
              >
                +91 9491951924
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SponsorUs;
