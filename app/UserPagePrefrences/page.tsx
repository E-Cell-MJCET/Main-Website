"use client";
import React, { useState } from "react";

import Step1Welcome from "@/components/AdvanceProfile/UserPreferences/Step1";
import Step2Welcome from "@/components/AdvanceProfile/UserPreferences/Step2";// Themes
import Step3Welcome from "@/components/AdvanceProfile/UserPreferences/Step3";
import Step4Welcome from "@/components/AdvanceProfile/UserPreferences/Step4";
import Step5Welcome from "@/components/AdvanceProfile/UserPreferences/Step5";
import Step6Welcome from "@/components/AdvanceProfile/UserPreferences/Step6";
import Step7Welcome from "@/components/AdvanceProfile/UserPreferences/Step7";
import Step8Welcome from "@/components/AdvanceProfile/UserPreferences/Step8";
import Step9Welcome from "@/components/AdvanceProfile/UserPreferences/Step9";
import Step10Welcome from "@/components/AdvanceProfile/UserPreferences/Step10";

function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 10)); // Adjust max to 10 for total steps
  };

  const handleComplete = () => {
    console.log("Pushing Data to database....")
    // Data pushing to DB Here
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Adjust min to the first step
  };

  return (
    <div>
      {/* Render steps dynamically based on currentStep */}
      {currentStep === 1 && <Step1Welcome onNext={handleNext} />}
      {currentStep === 2 && <Step2Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 3 && <Step3Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 4 && <Step4Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 5 && <Step5Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 6 && <Step6Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 7 && <Step7Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 8 && <Step8Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 9 && <Step9Welcome onNext={handleNext} onPrevious={handlePrevious} />}
      {currentStep === 10 && <Step10Welcome onComplete={handleComplete} onPrevious={handlePrevious} />}
      {/* Navigation Buttons */}
      <div className="fixed inset-x-4 bottom-4 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 shadow transition hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        {currentStep < 10 && (
          <button
            onClick={handleNext}
            className="ml-auto rounded-md bg-indigo-500 px-4 py-2 text-white shadow transition hover:bg-indigo-600"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Page;
