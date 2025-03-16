"use client";
import React, { useState , useEffect } from "react";

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
  // const TOTAL_STEPS = 16;
  const [customStepSequence, setCustomStepSequence] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Base steps that are always included
  const FIXED_STEPS = [1, 2, 3, 16];
  const DEFAULT_MAX_STEP = 16;
  
  // Function to load step sequence from localStorage
  const loadStepSequence = () => {
    const sessionId = localStorage.getItem("personalized_session_id");
    if (sessionId) {
      const savedStepSequence = localStorage.getItem(`${sessionId}_step_sequence`);
      if (savedStepSequence) {
        // Create a complete sequence with fixed steps
        const parsedSequence = JSON.parse(savedStepSequence);
        const completeSequence = [
          ...FIXED_STEPS.slice(0, 3), // Steps 1, 2, 3
          ...parsedSequence,           // User-selected steps
          FIXED_STEPS[3]               // Final step (16)
        ];
        setCustomStepSequence(completeSequence);
        
        return completeSequence; // Return the sequence for immediate use
      }
    }
    
    return []; // Return empty array if no sequence found
  };

  // Load user's selected sections and create a step sequence on component mount
  useEffect(() => {
    loadStepSequence();
    setIsLoading(false);
  }, []);

  // Convert from UI step index to actual step number
  const getStepNumber = (stepIndex: number): number => {
    if (customStepSequence.length > 0) {
      return stepIndex < customStepSequence.length ? customStepSequence[stepIndex] : DEFAULT_MAX_STEP;
    } else {
      return stepIndex + 1; // Default behavior if no custom sequence
    }
  };
  
  // Convert from actual step number to UI step index
  const getStepIndex = (stepNumber: number): number => {
    if (customStepSequence.length > 0) {
      const index = customStepSequence.indexOf(stepNumber);
      
      return index >= 0 ? index : customStepSequence.length - 1;
    } else {
      return stepNumber - 1; // Default behavior if no custom sequence
    }
  };
   
  // Special handler for Step3 completion
  const handleStep3Next = () => {
    // Reload the step sequence from localStorage
    const updatedSequence = loadStepSequence();
    
    // If we have a valid sequence, use it to determine the next step
    if (updatedSequence && updatedSequence.length > 3) {
      // Set to the first custom step after the fixed initial steps (1,2,3)
      setCurrentStep(updatedSequence[3]);
    } else {
      // Fall back to default behavior
      setCurrentStep(4);
    }
  };
  
  const handleNext = () => {
    // If we're on step 3, use the special handler
    if (currentStep === 3) {
      handleStep3Next();
    
      return;
    }

    setCurrentStep((prev) => {
      const currentIndex = getStepIndex(prev);
      const nextIndex = currentIndex + 1;
      const maxIndex = customStepSequence.length > 0 ? customStepSequence.length - 1 : DEFAULT_MAX_STEP - 1;
      
      return getStepNumber(Math.min(nextIndex, maxIndex));
    });
  };
  const handleComplete = () => {
    console.log("Pushing Data to database....");
    // Data pushing to DB Here
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => {
      const currentIndex = getStepIndex(prev);
      const prevIndex = currentIndex - 1;
      
      return getStepNumber(Math.max(prevIndex, 0));
    }); // Ensure we don't go below step 1
  };

  // Helper function to render the current step component
  const renderStepComponent = () => {
    if (isLoading) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }
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

  return (
    <div>
      {renderStepComponent()}
    </div>
  );
}

export default Page;