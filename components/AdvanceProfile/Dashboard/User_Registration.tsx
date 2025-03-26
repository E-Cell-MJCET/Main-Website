/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { supabase } from "@/utils/supabase";

interface UserRegistrationProps {
  onComplete: (success: boolean, message: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Function to generate a random username
const generateRandomUsername = () => {
  const adjectives = ['Happy', 'Clever', 'Brave', 'Bright', 'Swift', 'Calm', 'Bold', 'Smart'];
  const nouns = ['Eagle', 'Tiger', 'Dolphin', 'Falcon', 'Wolf', 'Lion', 'Hawk', 'Fox'];
  const randomNumber = Math.floor(Math.random() * 1000);
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${randomAdjective}${randomNoun}${randomNumber}`;
};

export default function UserRegistration({ onComplete, isOpen, onClose }: UserRegistrationProps) {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen && isLoaded && isSignedIn && user) {
      handleRegistration();
    }
  }, [isOpen, isLoaded, isSignedIn, user]);

  // Progress bar animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isProcessing) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 50);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing]);

  const handleRegistration = async () => {
    if (!user) return;
    
    try {
      setIsProcessing(true);
      setProcessingStep("Initializing registration...");
      setProgress(10);

      // Generate a session ID
      const sessionId = uuidv4();
      const currentTime = new Date().toISOString();
      
      setProcessingStep("Checking existing records...");
      setProgress(30);

      // Check if user already exists in Team table
      const { data: existingUser, error: fetchError } = await supabase
        .from("Team")
        .select("*")
        .eq("clerk_user_id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      setProgress(60);
      
      if (existingUser) {
        setProcessingStep("Verifying user identity...");
        
        // Create or update session_Info JSON
        const sessionInfo = existingUser.session_Info || {};
        const updatedSessionInfo = {
          ...sessionInfo,
          first_session_id: sessionInfo.first_session_id || sessionId,
          last_session_id: sessionId,
          created_at: sessionInfo.created_at || currentTime,
          last_login: currentTime,
          login_count: (sessionInfo.login_count || 0) + 1
        };
        
        // User exists, update session info
        const { error: updateError } = await supabase
          .from("Team")
          .update({
            session_Info: updatedSessionInfo
          })
          .eq("clerk_user_id", user.id);
        
        if (updateError) throw updateError;
        
        // Store session ID in localStorage
        localStorage.setItem("personalized_session_id", sessionId);
        
        setProcessingStep("Welcome back! Verification complete.");
        setProgress(100);
        
        setTimeout(() => {
          onComplete(true, "User verified successfully");
          setIsProcessing(false);
        }, 1000);
      } else {
        setProcessingStep("Creating new user profile...");
        
        // Generate random username
        const randomUsername = generateRandomUsername();
        
        // Create session_Info JSON
        const sessionInfo = {
          first_session_id: sessionId,
          last_session_id: sessionId,
          created_at: currentTime,
          last_login: currentTime,
          login_count: 1
        };
        
        // Insert new user into Team table
        const { error: insertError } = await supabase
          .from("Team")
          .insert([
            {
              clerk_user_id: user.id,
              Username: randomUsername,
              session_Info: sessionInfo,
              created_at: currentTime,
              updated_at: currentTime
            }
          ]);
        
        if (insertError) throw insertError;
        
        // Store session ID in localStorage
        localStorage.setItem("personalized_session_id", sessionId);
        
        setProcessingStep("Registration complete!");
        setProgress(100);
        
        setTimeout(() => {
          onComplete(true, `User registered successfully as ${randomUsername}`);
          setIsProcessing(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setProcessingStep("Something went wrong. Please try again.");
      
      setTimeout(() => {
        onComplete(false, "Registration failed");
        setIsProcessing(false);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {isProcessing ? "Processing" : "User Registration"}
        </h2>
        {isProcessing ? (
          <div className="space-y-4">
            <p className="text-gray-600">{processingStep}</p>
            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* Animated dots */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <span className="inline-block size-2 animate-bounce rounded-full bg-indigo-600" style={{ animationDelay: "0ms" }}></span>
                <span className="inline-block size-2 animate-bounce rounded-full bg-indigo-600" style={{ animationDelay: "150ms" }}></span>
                <span className="inline-block size-2 animate-bounce rounded-full bg-indigo-600" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              Click the button below to register your account with our system.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRegistration}
                className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                disabled={!isSignedIn}
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}