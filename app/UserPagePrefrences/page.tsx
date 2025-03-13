"use client";
import React, { useState } from "react";

import Step1Welcome from "@/components/AdvanceProfile/UserPreferences/Step1";
import Step2Welcome from "@/components/AdvanceProfile/UserPreferences/Step2"; // Themes
import Step3Welcome from "@/components/AdvanceProfile/UserPreferences/Step3";
import Step4Welcome from "@/components/AdvanceProfile/UserPreferences/Step4";
import Step5Welcome from "@/components/AdvanceProfile/UserPreferences/Step5";
import Step6Welcome from "@/components/AdvanceProfile/UserPreferences/Step6";
import Step7Welcome from "@/components/AdvanceProfile/UserPreferences/Step7";
import Step8Welcome from "@/components/AdvanceProfile/UserPreferences/Step8";
import Step9Welcome from "@/components/AdvanceProfile/UserPreferences/Step9";
import Step10Welcome from "@/components/AdvanceProfile/UserPreferences/Step10";
import Step11Welcome from "@/components/AdvanceProfile/UserPreferences/Step11";
import Step12Welcome from "@/components/AdvanceProfile/UserPreferences/Step12";
import Step13Welcome from "@/components/AdvanceProfile/UserPreferences/Step13";
import Step14Welcome from "@/components/AdvanceProfile/UserPreferences/Step14";
import Step15Welcome from "@/components/AdvanceProfile/UserPreferences/Step15";
import Step16Welcome from "@/components/AdvanceProfile/UserPreferences/Step16";

function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 16;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS)); // Use TOTAL_STEPS constant
  };

  const handleComplete = () => {
    console.log("Pushing Data to database....");
    // Data pushing to DB Here
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Ensure we don't go below step 1
  };

  // Helper function to render the current step component
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={handleNext} />;
      case 2:
        return <Step2Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <Step3Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <Step4Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <Step5Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 6:
        return <Step6Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 7:
        return <Step7Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 8:
        return <Step8Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 9:
        return <Step9Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 10:
        return <Step10Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 11:
        return <Step11Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 12:
        return <Step12Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 13:
        return <Step13Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 14:
        return <Step14Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 15:
        return <Step15Welcome onNext={handleNext} onPrevious={handlePrevious} />;
      case 16:
        return <Step16Welcome onComplete={handleComplete} onPrevious={handlePrevious} />;
      default:
        return <Step1Welcome onNext={handleNext} />;
    }
  };

  // Render progress indicator
  const renderProgressIndicator = () => {
    return (
      <div className="mb-4 flex justify-center">
        <div className="flex items-center space-x-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full ${
                i + 1 <= currentStep ? "bg-indigo-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
        <div className="ml-4 text-sm font-medium text-gray-700">
          Step {currentStep} of {TOTAL_STEPS}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Progress indicator */}
      {renderProgressIndicator()}
      {/* Render current step component */}
      {renderStepComponent()}
      {/* Navigation Buttons (Only render if not handled by step components) */}
      <div className="fixed inset-x-4 bottom-4 flex items-center justify-between">
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 shadow transition hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        {currentStep < TOTAL_STEPS && currentStep > 1 && (
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