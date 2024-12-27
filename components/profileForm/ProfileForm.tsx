import React, { useState } from "react";
import { User, Mail, Phone, FileText, Calendar, Palette } from "lucide-react";

import { supabase } from "@/utils/supabase";

import type { ProfileFormData } from "../../types/ProfileTypes";

import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { SocialSection } from "./SocialSection";
import { ProjectsSection } from "./ProjectsSection";
import { AchievementsSection } from "./AchievementsSection";
import { ExtracurricularSection } from "./ExtracurricularSection.";

const initialFormData: ProfileFormData = {
  name: "",
  email: "",
  phoneNo: "",
  portfolio: "",
  profileUrl: "",
  experiences: [
    { company: "", jobTitle: "", startDate: "", endDate: "", description: "" },
  ],
  education: [
    { startDate: "", endDate: "", school: "", degree: "", description: "" },
  ],
  about: "",
  social: {},
  position: "",
  dob: "",
  image: null,
  theme: "",
  projects: [],
  achievements: [],
  branch: "",
  year: "",
  rollno: "",
  extracurricular: [],
};

export function ProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Upload image to Supabase storage if an image is selected
    // let imageUrl = null;
    // if (formData.image) {
    //   const { data, error } = await supabase.storage
    //     .from("profile-images")
    //     .upload(`public/${formData.image.name}`, formData.image);

    //   if (error) {
    //     console.error("Error uploading image:", error);
    //     return;
    //   }

    //   imageUrl = data?.Key;
    // }

    // Insert form data into Supabase
    const { error } = await supabase.from("members").insert([
      {
        name: formData.name,
        email: formData.email,
        roll_no: formData.rollno,
        phone_no: formData.phoneNo,
        experience: formData.experiences,
        about: formData.about,
        social: formData.social,
        portfolio: formData.portfolio,
        position: formData.position,
        dob: formData.dob,
        // image: imageUrl,
        theme: formData.theme,
        education: formData.education,
        projects: formData.projects,
        branch: formData.branch,
        year: formData.year,
        slur: formData.profileUrl,
        achievements: formData.achievements,
        extracurricular: formData.extracurricular,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
    }
  };

  const inputClass =
    "mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-500 focus:ring-blue-500 p-3";
  const labelClass = "block text-sm font-medium text-gray-200";
  const sectionClass =
    "bg-gray-800 rounded-lg shadow-md p-6 space-y-6 border border-gray-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl space-y-8 px-4 py-8"
    >
      {/* Personal Information */}
      <section className={sectionClass}>
        <h2 className="text-2xl font-bold text-gray-100">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Required Fields */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <User className="size-5" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputClass}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Mail className="size-5" />
              <span>Email *</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={inputClass}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Phone className="size-5" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNo}
              onChange={(e) =>
                setFormData({ ...formData, phoneNo: e.target.value })
              }
              className={inputClass}
              placeholder="Ex: +91 73962 11824"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <FileText className="size-5" />
              <span>Branch</span>
            </label>
            <input
              type="text"
              value={formData.branch}
              onChange={(e) =>
                setFormData({ ...formData, branch: e.target.value })
              }
              className={inputClass}
              placeholder="Ex: Computer Science"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Calendar className="size-5" />
              <span>Year</span>
            </label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              className={inputClass}
              placeholder="Ex: 2024"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-1 text-gray-200">
              <FileText className="size-5" />
              <span>Roll No</span>
            </label>
            <input
              type="text"
              value={formData.rollno}
              onChange={(e) =>
                setFormData({ ...formData, rollno: e.target.value })
              }
              className={inputClass}
              placeholder="1604-xx-xxx-xxx"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-gray-200">
              <Palette className="size-5" />
              <span>Theme</span>
            </label>
            <input
              placeholder="Ex: Blue,Red,Purple"
              value={formData.theme}
              onChange={(e) =>
                setFormData({ ...formData, theme: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClass}>About</label>
          <textarea
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            rows={4}
            className={inputClass}
            placeholder="Write a brief description about yourself"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Portfolio</label>
          <input
            type="text"
            value={formData.portfolio}
            onChange={(e) =>
              setFormData({ ...formData, portfolio: e.target.value })
            }
            className={inputClass}
            placeholder="Ex: Editorial and Research"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Position</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
            className={inputClass}
            placeholder="Ex: Execom, GB, Core, Member"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Profile URL *</label>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">ecellmjcet.com/profile/</span>
            <input
              type="text"
              value={formData.profileUrl}
              onChange={(e) =>
                setFormData({ ...formData, profileUrl: e.target.value })
              }
              className={inputClass}
              required
              placeholder="username"
            />
          </div>
        </div>
      </section>
      {/* Experience Section */}
      <section className={sectionClass}>
        <ExperienceSection
          experiences={formData.experiences}
          onChange={(experiences) => setFormData({ ...formData, experiences })}
        />
      </section>
      {/* Education Section */}
      <section className={sectionClass}>
        <EducationSection
          education={formData.education}
          onChange={(education) => setFormData({ ...formData, education })}
        />
      </section>
      {/* Social Links */}
      <section className={sectionClass}>
        <SocialSection
          social={formData.social}
          onChange={(social) => setFormData({ ...formData, social })}
        />
      </section>
      {/* Projects */}
      <section className={sectionClass}>
        <ProjectsSection
          projects={formData.projects}
          onChange={(projects) => setFormData({ ...formData, projects })}
        />
      </section>
      {/* Achievements */}
      <section className={sectionClass}>
        <AchievementsSection
          achievements={formData.achievements}
          onChange={(achievements) =>
            setFormData({ ...formData, achievements })
          }
        />
      </section>
      {/* Extracurricular Activities */}
      <section className={sectionClass}>
        <ExtracurricularSection
          activities={formData.extracurricular}
          onChange={(extracurricular: any) =>
            setFormData({ ...formData, extracurricular })
          }
        />
      </section>
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
}
