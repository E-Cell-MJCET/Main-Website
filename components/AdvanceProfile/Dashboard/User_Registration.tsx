/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import { supabase } from "@/utils/supabase";

interface UserRegistrationProps {
  onComplete: (success: boolean, message: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Function to generate a unique random username
const generateUniqueUsername = (() => {
  // Closure to store previously generated usernames
  const usedUsernames = new Set();
  
  // More variety in word choices
  const adjectives = ['Happy', 'Clever', 'Brave', 'Bright', 'Swift', 'Calm', 'Bold', 'Smart', 
                      'Witty', 'Nimble', 'Agile', 'Mighty', 'Noble', 'Keen', 'Vivid', 'Jovial'];
  const nouns = ['Eagle', 'Tiger', 'Dolphin', 'Falcon', 'Wolf', 'Lion', 'Hawk', 'Fox',
                'Raven', 'Panda', 'Lynx', 'Bear', 'Shark', 'Owl', 'Cobra', 'Dragon'];
  
  return () => {
    let username;
    let attempts = 0;
    
    do {
      // Get current timestamp in milliseconds
      const timestamp = Date.now().toString().slice(-5);
      
      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      
      // Add more entropy with both timestamp and random number
      const randomNumber = Math.floor(Math.random() * 10000);
      
      username = `${randomAdjective}${randomNoun}${randomNumber}${timestamp}`;
      attempts++;
      
      // Safety valve to prevent infinite loops (extremely unlikely)
      if (attempts > 100) {
        username += `_${Math.random().toString(36).substring(2, 8)}`;
        break;
      }
    } while (usedUsernames.has(username));
    
    // Store this username to prevent future duplicates
    usedUsernames.add(username);
    
    return username;
  };
})();

export default function UserRegistration({ onComplete, isOpen, onClose }: UserRegistrationProps) {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [isPermittedMember, setIsPermittedMember] = useState(false);
  const [showPermissionError, setShowPermissionError] = useState(false);

  useEffect(() => {
    if (isOpen && isLoaded && isSignedIn && user) {
      checkPermittedMember();
    }
  }, [isOpen, isLoaded, isSignedIn, user]);

  // Check if user's email is in PermittedMembers table
  const checkPermittedMember = async () => {
    if (!user) return;
    
    try {
      setIsProcessing(true);
      setProcessingStep("Checking membership status...");
      setProgress(10);
      
      // Get user's primary email
      const userEmail = user.primaryEmailAddress?.emailAddress;
      
      if (!userEmail) {
        throw new Error("Could not verify email address");
      }
      
      setProcessingStep("Verifying membership...");
      setProgress(30);
      
      // Fetch all emails from PermittedMembers table
      const { data, error } = await supabase
        .from("PermittedMembers")
        .select("email");
        
      if (error) {
        throw error;
      }
      
      // Extract all emails into an array
      const permittedEmails = data.map(item => item.email);
      
      // Check if user's email exists in the permitted emails list
      const isEmailPermitted = permittedEmails.includes(userEmail);
      
      // If user is permitted, proceed with registration
      if (isEmailPermitted) {
        setIsPermittedMember(true);
        setProcessingStep("Membership verified, proceeding with registration...");
        setProgress(40);
        handleRegistration();
      } else {
        setIsPermittedMember(false);
        setProcessingStep("Membership verification failed");
        setProgress(100);
        setShowPermissionError(true);
        
        setTimeout(() => {
          setIsProcessing(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error checking permitted member status:", error);
      setProcessingStep("Membership verification failed");
      setProgress(100);
      setShowPermissionError(true);
      
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  };

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
      setProcessingStep("Initializing registration...");
      setProgress(40);

      // Generate a session ID
      const sessionId = uuidv4();
      const currentTime = new Date().toISOString();
      
      setProcessingStep("Checking existing records...");
      setProgress(60);

      // Check if user already exists in Team table
      const { data: existingUser, error: fetchError } = await supabase
        .from("Team")
        .select("*")
        .eq("clerk_user_id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      setProgress(70);
      
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
        const randomUsername = generateUniqueUsername();
        
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

  // Handle redirect to membership page
  const handleMembershipRedirect = () => {
    onClose();
    router.push('/membership');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          {isProcessing ? "Processing" : showPermissionError ? "Membership Required" : "User Registration"}
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
        ) : showPermissionError ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              You need to be an E-Cell member to register for the dashboard.
              Join our community to get full access.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleMembershipRedirect}
                className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Become a Member
              </button>
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
                onClick={checkPermittedMember}
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