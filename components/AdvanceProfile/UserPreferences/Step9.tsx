"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react"; // Importing a delete icon

import { supabase } from "@/utils/supabase";

// Define types for the recommendation data structure
type Recommendation = {
  title: string;
  description: string;
  link: string;
};

const Step9Welcome = ({
  onNext,
  onPrevious,
  userId,
}: {
  onNext: () => void;
  onPrevious: () => void;
  userId: string | null;
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    { title: "", description: "", link: "" },
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
      const savedRecommendations = localStorage.getItem(
        `${sessionId}_recommendations`
      );

      if (savedRecommendations && savedRecommendations !== "[]") {
        setRecommendations(JSON.parse(savedRecommendations));
      }
    }
  }, []);

  const handleAddRecommendation = () => {
    setRecommendations([
      ...recommendations,
      { title: "", description: "", link: "" },
    ]);
  };

  const handleRecommendationChange = (
    index: number,
    field: keyof Recommendation,
    value: string
  ) => {
    const updatedRecommendations = recommendations.map((recommendation, i) =>
      i === index ? { ...recommendation, [field]: value } : recommendation
    );
    setRecommendations(updatedRecommendations);
  };

  const handleRemoveRecommendation = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    // Filter out completely empty recommendation entries
    const validRecommendations = recommendations.filter(
      (rec) => rec.title || rec.description || rec.link
    );

    console.log("Recommendations:", validRecommendations);

    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(
        `${sessionId}_recommendations`,
        JSON.stringify(validRecommendations)
      );
    }

    if (userData && userData.Profile_Data_Created) {
      // save data in Supabase
      const { error } = await supabase
        .from("Team")
        .update({ Testimonials: validRecommendations })
        .eq("custom_auth_userID", userId); // Assuming the table name is 'Team'
      alert("Recommendations saved successfully!");
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
          Recommendation Input
        </h2>
        {/* Recommendations Input */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-gray-700">
            Recommendations
          </h3>
          {recommendations.map((recommendation, index) => (
            <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Title"
                  value={recommendation.title}
                  onChange={(e) =>
                    handleRecommendationChange(index, "title", e.target.value)
                  }
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                />
                <button
                  onClick={() => handleRemoveRecommendation(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                  aria-label="Remove recommendation"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <textarea
                placeholder="Description"
                value={recommendation.description}
                onChange={(e) =>
                  handleRecommendationChange(
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="mb-2 w-full rounded-lg border border-gray-300 p-3"
              />
              <input
                type="text"
                placeholder="Link"
                value={recommendation.link}
                onChange={(e) =>
                  handleRecommendationChange(index, "link", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3"
              />
            </div>
          ))}
          <button
            onClick={handleAddRecommendation}
            className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Add Recommendation
          </button>
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
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600"
          >
            {userData?.Profile_Data_Created ? "Save" : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step9Welcome;
