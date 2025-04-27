"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

import { supabase } from "@/utils/supabase";

const Step5Welcome = ({
  onNext,
  onPrevious,
  userId,
}: {
  onNext: () => void;
  onPrevious: () => void;
  userId: string | null;
}) => {
  const [experiences, setExperiences] = useState([
    { company: "", jobTitle: "", startDate: "", endDate: "", description: "" },
  ]);

  const [education, setEducation] = useState([
    { startDate: "", endDate: "", school: "", degree: "", description: "" },
  ]);

  const [userData, setUserData] = useState<any | null>(null);

  // Toggle for "Present" as end date
  const [currentlyWorkingIndices, setCurrentlyWorkingIndices] = useState<
    number[]
  >([]);
  const [currentlyStudyingIndices, setCurrentlyStudyingIndices] = useState<
    number[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Initiating fetch for: ", userId); // Debugging line
        const { data, error } = await supabase
          .from("Team") // Assuming the table name is 'Team'
          .select("*")
          .eq("custom_auth_userID", userId) // Querying by username in the 'Name' column
          .single(); // Expecting a single row

        if (error) {
          console.log("Error is :-> ", error);
        } else {
          setUserData(data);
        }
      } catch (err: any) {
        console.log(err);
        // setError(
        //   `An error occurred while fetching profile data: ${err.message}`
        // );
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      // Load experience data
      const savedExperiences = localStorage.getItem(`${sessionId}_experiences`);
      const savedWorkingIndices = localStorage.getItem(
        `${sessionId}_working_indices`
      );

      // Load education data
      const savedEducation = localStorage.getItem(`${sessionId}_education`);
      const savedStudyingIndices = localStorage.getItem(
        `${sessionId}_studying_indices`
      );

      // Set state with saved values
      if (savedExperiences && savedExperiences !== "[]") {
        setExperiences(JSON.parse(savedExperiences));
      }

      if (savedWorkingIndices) {
        setCurrentlyWorkingIndices(JSON.parse(savedWorkingIndices));
      }

      if (savedEducation && savedEducation !== "[]") {
        setEducation(JSON.parse(savedEducation));
      }

      if (savedStudyingIndices) {
        setCurrentlyStudyingIndices(JSON.parse(savedStudyingIndices));
      }
    }
  }, []);

  const inputClass =
    "w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500";
  const labelClass = "block mb-2 font-medium text-gray-700";
  const dateInputClass =
    "w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500";

  // Experience handlers
  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));

      // Also remove from currentlyWorkingIndices if present
      if (currentlyWorkingIndices.includes(index)) {
        setCurrentlyWorkingIndices(
          currentlyWorkingIndices
            .filter((i) => i !== index)
            .map((i) => (i > index ? i - 1 : i)) // Adjust indices for items after the removed one
        );
      }
    }
  };

  // Education handlers
  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { startDate: "", endDate: "", school: "", degree: "", description: "" },
    ]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));

      // Also remove from currentlyStudyingIndices if present
      if (currentlyStudyingIndices.includes(index)) {
        setCurrentlyStudyingIndices(
          currentlyStudyingIndices
            .filter((i) => i !== index)
            .map((i) => (i > index ? i - 1 : i)) // Adjust indices for items after the removed one
        );
      }
    }
  };

  const toggleCurrentlyWorking = (index: number) => {
    if (currentlyWorkingIndices.includes(index)) {
      setCurrentlyWorkingIndices(
        currentlyWorkingIndices.filter((i) => i !== index)
      );
      // Clear "Present" and allow date entry
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = { ...updatedExperiences[index], endDate: "" };
      setExperiences(updatedExperiences);
    } else {
      setCurrentlyWorkingIndices([...currentlyWorkingIndices, index]);
      // Set to "Present"
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        endDate: "Present",
      };
      setExperiences(updatedExperiences);
    }
  };

  const toggleCurrentlyStudying = (index: number) => {
    if (currentlyStudyingIndices.includes(index)) {
      setCurrentlyStudyingIndices(
        currentlyStudyingIndices.filter((i) => i !== index)
      );
      // Clear "Present" and allow date entry
      const updatedEducation = [...education];
      updatedEducation[index] = { ...updatedEducation[index], endDate: "" };
      setEducation(updatedEducation);
    } else {
      setCurrentlyStudyingIndices([...currentlyStudyingIndices, index]);
      // Set to "Present"
      const updatedEducation = [...education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        endDate: "Present",
      };
      setEducation(updatedEducation);
    }
  };

  const handleNext = async () => {
    // Filter out completely empty entries
    const filteredExperiences = experiences.filter(
      (exp) => exp.company || exp.jobTitle || exp.startDate || exp.description
    );

    const filteredEducation = education.filter(
      (edu) => edu.school || edu.degree || edu.startDate || edu.description
    );

    console.log("Experiences:", filteredExperiences);
    console.log("Education:", filteredEducation);

    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      // Save experiences data
      localStorage.setItem(
        `${sessionId}_experiences`,
        JSON.stringify(filteredExperiences)
      );
      localStorage.setItem(
        `${sessionId}_working_indices`,
        JSON.stringify(currentlyWorkingIndices)
      );

      // Save education data
      localStorage.setItem(
        `${sessionId}_education`,
        JSON.stringify(filteredEducation)
      );
      localStorage.setItem(
        `${sessionId}_studying_indices`,
        JSON.stringify(currentlyStudyingIndices)
      );
    }

    if (userData && userData.Profile_Data_Created) {
      // store data to supabase
      const { error } = await supabase
        .from("Team")
        .update({
          Experience: filteredExperiences,
          Education: filteredEducation,
        })
        .eq("custom_auth_userID", userId);
      if (error) {
        console.error("Error updating data:", error);
      } else {
        console.log("Data updated successfully!");
        alert("Data updated successfully!");
      }
    }

    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Your Experience & Education
        </h2>
        {/* Experience Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Experience</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Company/Organization</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(index, "company", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleExperienceChange(index, "jobTitle", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Your position"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="size-5" />
                    <span>Start Date</span>
                  </label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "startDate", e.target.value)
                    }
                    className={dateInputClass}
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="size-5" />
                    <span>End Date</span>
                  </label>
                  <div className="space-y-2">
                    {!currentlyWorkingIndices.includes(index) ? (
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className={dateInputClass}
                        disabled={currentlyWorkingIndices.includes(index)}
                      />
                    ) : (
                      <div className="rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700">
                        Present
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`currently-working-${index}`}
                        checked={currentlyWorkingIndices.includes(index)}
                        onChange={() => toggleCurrentlyWorking(index)}
                        className="mr-2 size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`currently-working-${index}`}
                        className="text-sm text-gray-700"
                      >
                        I currently work here
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleExperienceChange(index, "description", e.target.value)
                  }
                  rows={3}
                  className={inputClass}
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExperience}
            className="rounded bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200"
          >
            + Add Experience
          </button>
        </div>
        {/* Education Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Education</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-6 rounded-lg bg-gray-50 p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>School/University</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationChange(index, "school", e.target.value)
                    }
                    className={inputClass}
                    placeholder="School or university name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Degree/Certificate</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(index, "degree", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Your degree or certificate"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="size-5" />
                    <span>Start Date</span>
                  </label>
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      handleEducationChange(index, "startDate", e.target.value)
                    }
                    className={dateInputClass}
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="size-5" />
                    <span>End Date</span>
                  </label>
                  <div className="space-y-2">
                    {!currentlyStudyingIndices.includes(index) ? (
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className={dateInputClass}
                        disabled={currentlyStudyingIndices.includes(index)}
                      />
                    ) : (
                      <div className="rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700">
                        Present
                      </div>
                    )}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`currently-studying-${index}`}
                        checked={currentlyStudyingIndices.includes(index)}
                        onChange={() => toggleCurrentlyStudying(index)}
                        className="mr-2 size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`currently-studying-${index}`}
                        className="text-sm text-gray-700"
                      >
                        I currently study here
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className={labelClass}>Description</label>
                <textarea
                  value={edu.description}
                  onChange={(e) =>
                    handleEducationChange(index, "description", e.target.value)
                  }
                  rows={3}
                  className={inputClass}
                  placeholder="Describe your academic achievements, activities, etc."
                />
              </div>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addEducation}
            className="rounded bg-indigo-100 px-4 py-2 text-indigo-700 hover:bg-indigo-200"
          >
            + Add Education
          </button>
        </div>
        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-lg bg-indigo-500 px-6 py-3 font-semibold text-white transition hover:bg-indigo-600"
          >
            {userData?.Profile_Data_Created ? "Save" : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step5Welcome;
