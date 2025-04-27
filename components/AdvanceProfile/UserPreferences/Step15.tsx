"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

import { supabase } from "@/utils/supabase";

// Define the type for volunteer experience
type VolunteerContent = {
  title: string;
  description: string;
};

const Step15Welcome = ({
  onNext,
  onPrevious,
  userId,
}: {
  onNext: () => void;
  onPrevious: () => void;
  userId: string | null;
}) => {
  // State for volunteer experience items
  const [volunteerItems, setVolunteerItems] = useState<VolunteerContent[]>([
    { title: "", description: "" },
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
      const savedVolunteerItems = localStorage.getItem(
        `${sessionId}_volunteer_experiences`
      );

      if (savedVolunteerItems && savedVolunteerItems !== "[]") {
        setVolunteerItems(JSON.parse(savedVolunteerItems));
      }
    }
  }, []);

  // Add a new volunteer experience item
  const handleAddVolunteer = () => {
    setVolunteerItems([...volunteerItems, { title: "", description: "" }]);
  };

  // Update a volunteer experience item
  const handleVolunteerChange = (
    index: number,
    field: keyof VolunteerContent,
    value: string
  ) => {
    const updatedVolunteerItems = volunteerItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setVolunteerItems(updatedVolunteerItems);
  };

  // Remove a volunteer experience item
  const handleRemoveVolunteer = (index: number) => {
    setVolunteerItems(volunteerItems.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Filter out completely empty volunteer experience entries
    const validVolunteerItems = volunteerItems.filter(
      (item) => item.title || item.description
    );

    console.log("Volunteer Experience:", validVolunteerItems);

    // Save to localStorage
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      localStorage.setItem(
        `${sessionId}_volunteer_experiences`,
        JSON.stringify(validVolunteerItems)
      );
    }

    if (userData && userData.Profile_Data_Created) {
      // save data to supabase
      const saveVolunteerExperience = async () => {
        try {
          const { error } = await supabase
            .from("Team")
            .update({ VolunteerExperience: validVolunteerItems })
            .eq("custom_auth_userID", userId); // Assuming the table name is 'Team'

          if (error) {
            console.log("Error saving volunteer experience: ", error);
          } else {
            console.log("Volunteer experience saved successfully!");
            alert("Volunteer experience saved successfully!");
          }
        } catch (err: any) {
          console.log(err);
        }
      };
      saveVolunteerExperience();
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
          Volunteer Experience
        </h2>
        <div className="mb-6">
          <p className="mb-4 text-center text-gray-600">
            Share your volunteer experience to showcase your community
            involvement and social impact.
          </p>
          {/* Volunteer Experience Input */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-medium text-gray-700">
              Volunteer Activities
            </h3>
            {volunteerItems.map((item, index) => (
              <div key={index} className="mb-4 rounded-lg border p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Organization or Role"
                    value={item.title}
                    onChange={(e) =>
                      handleVolunteerChange(index, "title", e.target.value)
                    }
                    className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  />
                  <button
                    onClick={() => handleRemoveVolunteer(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove volunteer experience"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <textarea
                  placeholder="Describe your responsibilities, achievements, and the impact of your volunteer work"
                  value={item.description}
                  onChange={(e) =>
                    handleVolunteerChange(index, "description", e.target.value)
                  }
                  className="mb-2 w-full rounded-lg border border-gray-300 p-3"
                  rows={4}
                />
              </div>
            ))}
            <button
              onClick={handleAddVolunteer}
              className="rounded-lg bg-rose-500 px-4 py-2 font-semibold text-white hover:bg-rose-600"
            >
              Add Volunteer Experience
            </button>
          </div>
          {/* Preview section */}
          {volunteerItems.some((item) => item.title || item.description) && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-700">
                Preview
              </h3>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {volunteerItems
                    .filter((item) => item.title || item.description)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-md"
                      >
                        <h4 className="mb-2 text-lg font-semibold text-gray-800">
                          {item.title || "Untitled"}
                        </h4>
                        <p className="mb-3 text-sm text-gray-600">
                          {item.description || "No description"}
                        </p>
                        <a
                          href="#"
                          className="text-sm font-medium text-rose-500 hover:text-rose-700"
                        >
                          Read more
                        </a>
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
            className="rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white hover:bg-pink-600"
          >
            {userData?.Profile_Data_Created ? "Save" : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Step15Welcome;
