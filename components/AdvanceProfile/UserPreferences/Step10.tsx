"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

import { supabase } from "@/utils/supabase";

// Define the type for honors and awards
type HonorAwardContent = {
  title: string;
  issuer: string;
  date: string;
  description: string;
};

const Step10Welcome = ({
  onNext,
  onPrevious,
  userId,
}: {
  onNext: () => void;
  onPrevious: () => void;
  userId: string | null;
}) => {
  // State for honors and awards items
  const [honorsAwards, setHonorsAwards] = useState<HonorAwardContent[]>([
    { title: "", issuer: "", date: "", description: "" },
  ]);

  const [userData, setUserData] = useState<any | null>(null);

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
      const savedHonorsAwards = localStorage.getItem(
        `${sessionId}_honors_awards`
      );

      if (savedHonorsAwards && savedHonorsAwards !== "[]") {
        setHonorsAwards(JSON.parse(savedHonorsAwards));
      }
    }
  }, []);

  // Add a new honor/award entry
  const handleAddHonorAward = () => {
    setHonorsAwards([
      ...honorsAwards,
      { title: "", issuer: "", date: "", description: "" },
    ]);
  };

  // Update an honor/award entry
  const handleHonorAwardChange = (
    index: number,
    field: keyof HonorAwardContent,
    value: string
  ) => {
    const updatedHonorsAwards = honorsAwards.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setHonorsAwards(updatedHonorsAwards);
  };

  // Remove an honor/award entry
  const handleRemoveHonorAward = (index: number) => {
    setHonorsAwards(honorsAwards.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    // Filter out completely empty entries
    const validHonorsAwards = honorsAwards.filter(
      (honor) => honor.title || honor.issuer || honor.date || honor.description
    );

    console.log("Honors and Awards:", validHonorsAwards);

    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(
        `${sessionId}_honors_awards`,
        JSON.stringify(validHonorsAwards)
      );
    }

    if (userData && userData.Profile_Data_Created) {
      // store data in supabase
      const { error } = await supabase
        .from("Team")
        .update({ Honors: validHonorsAwards })
        .eq("custom_auth_userID", userId); // Assuming the table name is 'Team'
      alert("Honors and Awards saved successfully!");
      if (error) {
        console.log(error);
      }
    }

    onNext();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg sm:p-10"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Honors & Awards
        </h2>
        <div className="mb-6">
          <p className="mb-4 text-center text-gray-600">
            Showcase the recognition you`ve received and the achievements you`re
            proud of.
          </p>
          {/* Honors & Awards Input */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">
              Your Achievements
            </h3>
            {honorsAwards.map((item, index) => (
              <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Award or Honor Title"
                    value={item.title}
                    onChange={(e) =>
                      handleHonorAwardChange(index, "title", e.target.value)
                    }
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                  <button
                    onClick={() => handleRemoveHonorAward(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove honor/award"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={item.issuer}
                    onChange={(e) =>
                      handleHonorAwardChange(index, "issuer", e.target.value)
                    }
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                  <input
                    type="text"
                    placeholder="Date (e.g., May 2023)"
                    value={item.date}
                    onChange={(e) =>
                      handleHonorAwardChange(index, "date", e.target.value)
                    }
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                </div>
                <textarea
                  placeholder="Description of the award and its significance"
                  value={item.description}
                  onChange={(e) =>
                    handleHonorAwardChange(index, "description", e.target.value)
                  }
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  rows={3}
                />
              </div>
            ))}
            <button
              onClick={handleAddHonorAward}
              className="rounded-lg bg-teal-500 px-4 py-2 font-semibold text-white hover:bg-teal-600"
            >
              Add Honor or Award
            </button>
          </div>
          {/* Preview section */}
          {honorsAwards.some((item) => item.title || item.issuer) && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-700">
                Preview
              </h3>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {honorsAwards
                    .filter((item) => item.title || item.issuer)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-md"
                      >
                        <div>
                          <h4 className="mb-1 text-lg font-semibold text-gray-800">
                            {item.title || "Untitled Award"}
                          </h4>
                          <div className="mb-2 flex items-center text-sm text-gray-600">
                            {item.issuer && (
                              <span className="font-medium">{item.issuer}</span>
                            )}
                            {item.issuer && item.date && (
                              <span className="mx-2">•</span>
                            )}
                            {item.date && <span>{item.date}</span>}
                          </div>
                        </div>
                        {item.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrevious}
            className="rounded-lg bg-gray-300 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-400"
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
          >
            {userData?.Profile_Data_Created ? "Save" : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step10Welcome;
