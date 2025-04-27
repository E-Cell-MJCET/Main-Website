/* eslint-disable no-unused-vars */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  ChevronRight,
  ChevronLeft,
  Home,
  Users,
  Calendar,
  Settings,
  Moon,
  Sun,
  WandSparkles,
  UserPlus,
  AlertCircle,
  HomeIcon,
  User,
  LogOut,
  CheckCircle,
  XCircle,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";

import { supabase } from "@/utils/supabase";
import Main_Dashboard from "@/components/AdvanceProfile/Dashboard/MainDashboard";
import Events from "@/components/AdvanceProfile/Dashboard/Events";
import Team from "@/components/AdvanceProfile/Dashboard/Team";
import Profile_Themes from "@/components/AdvanceProfile/Dashboard/ProfileThemes";
import ProfileDashboard from "@/components/AdvanceProfile/Dashboard/ProfileDashboard";
import UserPagePrefrences_Dashboard from "@/components/AdvanceProfile/Dashboard/CompleteUserPagePrefrences";

// Session duration in milliseconds (36 hours)
const SESSION_DURATION = 36 * 60 * 60 * 1000;

const DashboardPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userProfileStat, setUserProfileStat] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    success: boolean;
    message: string;
    show: boolean;
  }>({ success: false, message: "", show: false });
  const [isProcessing, setIsProcessing] = useState(false);

  // Authentication states
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [permittedEmails, setPermittedEmails] = useState<string[]>([]);

  // New states for user validation
  const [isValidating, setIsValidating] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [validationMessage, setValidationMessage] = useState(
    "Initializing dashboard..."
  );

  // New state for permitted member check
  const [isPermittedMember, setIsPermittedMember] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // Session tracking
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [loginLocation, setLoginLocation] = useState<string | null>(null);
  const sessionData = localStorage.getItem("ecellSession");
  let userId: string | null = null;
  if (sessionData) {
    const session = JSON.parse(sessionData);
    userId = session.userId;
  }
  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoaded(false);
      setIsValidating(true);
      setValidationMessage("Checking authentication status...");

      try {
        // Check localStorage for session first
        const sessionData = localStorage.getItem("ecellSession");

        // Fetch permitted emails regardless of session status
        await fetchPermittedEmails();

        if (sessionData) {
          const session = JSON.parse(sessionData);
          const now = new Date().getTime();
          userId = session.userId;

          // Check if session is still valid
          if (session && session.expiry > now) {
            console.log("Session is valid:", session);
            setIsSignedIn(true);
            setEmail(session.email);
            setLastLogin(new Date(session.loginTime).toLocaleString());
            setLoginLocation(session.ipLocation || "Unknown location");
            setIsPermittedMember(true);
            setIsRegistered(true);

            // Check if user's email is permitted and fetch avatar
            const normalizedEmail = session.email.trim().toLowerCase();
            const normalizedPermittedEmails = permittedEmails.map((e) =>
              e.trim().toLowerCase()
            );

            if (normalizedPermittedEmails.includes(normalizedEmail)) {
              setIsPermittedMember(true);

              // Fetch user avatar from PermittedMembers table
              const { data: memberData, error: memberError } = await supabase
                .from("PermittedMembers")
                .select("avatar")
                .eq("email", normalizedEmail)
                .single();

              if (!memberError && memberData && memberData.avatar) {
                // Update session with avatar
                session.avatar = memberData.avatar;
                localStorage.setItem("ecellSession", JSON.stringify(session));
              }
            } else {
              // setIsPermittedMember(false);
              setShowPermissionModal(true);
            }

            // Fetch user data
            await fetchUserData(session.userId);

            // Update last active time
            updateSessionActivity(session.userId);
          } else {
            // Session expired
            localStorage.removeItem("ecellSession");
            setShowAuthModal(true);
          }
        } else {
          // No session found
          setShowAuthModal(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setShowAuthModal(true);
      } finally {
        setIsLoaded(true);
        setIsValidating(false);
      }
    };

    checkAuth();
  }, []);

  // Update session activity
  const updateSessionActivity = async (userId: string) => {
    try {
      const now = new Date().getTime();

      // Update localStorage session
      const sessionData = localStorage.getItem("ecellSession");
      if (sessionData) {
        const session = JSON.parse(sessionData);
        session.lastActive = now;
        localStorage.setItem("ecellSession", JSON.stringify(session));
      }

      // Update Supabase session
      await supabase
        .from("UserSessions")
        .update({
          last_active: new Date(now).toISOString(),
        })
        .eq("user_id", userId)
        .eq("is_active", true);
    } catch (error) {
      console.error("Error updating session activity:", error);
    }
  };

  // Fetch permitted emails from Supabase
  const fetchPermittedEmails = async () => {
    try {
      const { data, error } = await supabase
        .from("PermittedMembers")
        .select("email");

      if (error) {
        console.error("Error fetching permitted emails:", error);

        return;
      }

      if (data) {
        const emails = data.map((item) => item.email);
        setPermittedEmails(emails);
      }
    } catch (error) {
      console.error("Error in fetchPermittedEmails:", error);
    }
  };

  // Fetch user data from Supabase
  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("Team")
        .select("*")
        .eq("clerk_user_id", userId)
        .single();

      if (error) {
        console.log("Error fetching user data:", error);

        return;
      }

      setUserData(data);
      if (data?.Profile_Data_Created) {
        setUserProfileStat(true);
      }

      // Set registration status
      setIsRegistered(!!data);

      // If not registered, set active tab to settings
      if (!data) {
        setActiveTab("settings");
      }
    } catch (err: any) {
      console.log("Error in fetchUserData:", err);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Get session data
      const sessionData = localStorage.getItem("ecellSession");
      if (sessionData) {
        const session = JSON.parse(sessionData);

        // Mark session as inactive in Supabase
        await supabase
          .from("UserSessions")
          .update({ is_active: false })
          .eq("user_id", session.userId)
          .eq("is_active", true);
      }

      // Clear local storage
      localStorage.removeItem("ecellSession");

      // Update state
      setIsSignedIn(false);
      setUserData(null);
      setIsRegistered(false);
      setShowAuthModal(true);

      // Show success message
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error during logout");
    }
  };

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkIfMobile();

    const sessionData = localStorage.getItem("ecellSession");
    if (sessionData) {
      const session = JSON.parse(sessionData);
      userId = session.userId;
    }

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle registration completion
  const handleRegistrationComplete = async (
    success: boolean,
    message: string
  ) => {
    setShowRegistration(false);
    setRegistrationStatus({ success, message, show: true });

    // If registration was successful, update isRegistered state
    if (success) {
      setIsRegistered(true);
    }

    // Hide status message after 5 seconds
    setTimeout(() => {
      setRegistrationStatus((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

  // Function to generate a unique random username
  const generateUniqueUsername = (() => {
    // Closure to store previously generated usernames
    const usedUsernames = new Set();

    // More variety in word choices
    const adjectives = [
      "Happy",
      "Clever",
      "Brave",
      "Bright",
      "Swift",
      "Calm",
      "Bold",
      "Smart",
      "Witty",
      "Nimble",
      "Agile",
      "Mighty",
      "Noble",
      "Keen",
      "Vivid",
      "Jovial",
    ];
    const nouns = [
      "Eagle",
      "Tiger",
      "Dolphin",
      "Falcon",
      "Wolf",
      "Lion",
      "Hawk",
      "Fox",
      "Raven",
      "Panda",
      "Lynx",
      "Bear",
      "Shark",
      "Owl",
      "Cobra",
      "Dragon",
    ];

    return () => {
      let username;
      let attempts = 0;

      do {
        // Get current timestamp in milliseconds
        const timestamp = Date.now().toString().slice(-5);

        const randomAdjective =
          adjectives[Math.floor(Math.random() * adjectives.length)];
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

  // Handle account registration
  const handleRegisterAccount = async () => {
    try {
      setRegistrationStatus({
        show: false,
        success: false,
        message: "",
      });

      // Get session data
      const sessionData = localStorage.getItem("ecellSession");
      if (!sessionData) {
        toast.error("Session expired. Please login again");
        handleLogout();

        return;
      }

      const session = JSON.parse(sessionData);
      const userId = session.userId;
      const userEmail = session.email;

      // Check if user already exists in Team table
      const { data: existingUser, error: userCheckError } = await supabase
        .from("Team")
        .select("*")
        .eq("email", userEmail);

      if (userCheckError) {
        console.error("Error checking user:", userCheckError);
        toast.error("Failed to check user status");

        return;
      }

      // Get member data from PermittedMembers
      const { data: memberData, error: memberError } = await supabase
        .from("PermittedMembers")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (memberError || !memberData) {
        console.error("Error fetching member data:", memberError);
        toast.error("Failed to fetch member data");

        return;
      }

      let result;

      if (existingUser && existingUser.length > 0) {
        // Update existing user
        const { error: updateError } = await supabase
          .from("Team")
          .update({
            custom_auth_userID: userId,
            // avatar: session.avatar || memberData.avatar || null,
            updated_at: new Date().toISOString(),
          })
          .eq("email", userEmail);

        if (updateError) {
          console.error("Error updating user:", updateError);
          toast.error("Failed to update registration");

          return;
        }

        result = "updated";
      } else {
        // Create new user
        const { error: insertError } = await supabase.from("Team").insert({
          email: userEmail,
          custom_auth_userID: userId,
          // name: memberData.name || userEmail.split('@')[0],
          // Member_Type: memberData.Member_Type || "Associate",
          // Portfolio: memberData.Portfolio || "General",
          updated_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Error creating user:", insertError);
          toast.error("Failed to complete registration");

          return;
        }

        result = "created";
      }

      // Update PermittedMembers to mark as registered
      const { error: updateMemberError } = await supabase
        .from("PermittedMembers")
        .update({
          signedUp: true,
          signup_date: new Date().toISOString(),
        })
        .eq("email", userEmail);

      if (updateMemberError) {
        console.error("Error updating member status:", updateMemberError);
      }

      // Set user as registered
      setIsRegistered(true);

      // Send registration success email using the API route
      try {
        console.log(`Sending registration success email to ${userEmail}`);

        const response = await fetch("/api/registration-success-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        });

        const emailResult = await response.json();

        if (emailResult.success) {
          console.log("Registration success email sent successfully");
        } else {
          console.error(
            "Failed to send registration success email:",
            emailResult.error
          );
        }
      } catch (emailError) {
        console.error("Error sending registration success email:", emailError);
      }

      // Show success message
      setRegistrationStatus({
        show: true,
        success: true,
        message:
          result === "created"
            ? "Account registered successfully! You now have full access to all features."
            : "Account registration updated successfully!",
      });

      // Fetch updated user data
      await fetchUserData(userId);
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationStatus({
        show: true,
        success: false,
        message: "Failed to register account. Please try again later.",
      });
    }
  };

  // Sidebar navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="size-5" /> },
    { id: "profile", label: "My Profile", icon: <User className="size-5" /> },
    { id: "events", label: "Events", icon: <Calendar className="size-5" /> },
    { id: "team", label: "Team", icon: <Users className="size-5" /> },
    {
      id: "theme",
      label: "Profile Themes",
      icon: <WandSparkles className="size-5" />,
    },
    {
      id: "forms",
      label: userProfileStat ? "Edit Profile" : "Create Profile",
      icon: <User className="size-5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="size-5" />,
    },
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle tab click with registration and permission check
  const handleTabClick = (tabId: any) => {
    // Always allow settings tab
    if (tabId === "settings") {
      setActiveTab(tabId);
      if (isMobile) setSidebarOpen(false);
    }
    // Check if user is a permitted member
    else if (!isPermittedMember) {
      setShowPermissionModal(true);
    }
    // Check if user is registered
    else if (isSignedIn && !isRegistered) {
      // Show registration prompt if trying to access restricted tabs
      toast.error("Please register your account first to access this feature");
    }
    // User is both permitted and registered
    else if (isPermittedMember && isRegistered) {
      setActiveTab(tabId);
      if (isMobile) setSidebarOpen(false);
    }
  };

  // Handle redirect to membership page
  const handleMembershipRedirect = () => {
    router.push("/membership");
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Main_Dashboard />;
      case "events":
        return <Events user_id={userId} />;
      case "profile":
        return <ProfileDashboard userId={userId} />;
      case "team":
        return <Team />;
      case "theme":
        return <Profile_Themes userId={userId} />;
      case "forms":
        return <UserPagePrefrences_Dashboard userId={userId} />;
      case "settings":
        return (
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Settings</h2>
            {isSignedIn && (
              <div className="mb-6 space-y-6">
                {/* Account Information */}
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h3 className="mb-3 text-lg font-medium">
                    Account Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Email:
                      </span>
                      <span className="font-medium">{email}</span>
                    </div>
                    {lastLogin && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Last Login:
                        </span>
                        <div className="flex items-center">
                          <Clock className="mr-1 size-4 text-gray-500" />
                          <span>{lastLogin}</span>
                        </div>
                      </div>
                    )}
                    {loginLocation && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Login Location:
                        </span>
                        <span>{loginLocation}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Account Status:
                      </span>
                      <div className="flex items-center">
                        {isRegistered ? (
                          <>
                            <CheckCircle className="mr-1 size-4 text-green-500" />
                            <span className="text-green-600 dark:text-green-400">
                              Registered
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-1 size-4 text-amber-500" />
                            <span className="text-amber-600 dark:text-amber-400">
                              Not Registered
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Member Status:
                      </span>
                      <div className="flex items-center">
                        {isPermittedMember ? (
                          <>
                            <Shield className="mr-1 size-4 text-blue-500" />
                            <span className="text-blue-600 dark:text-blue-400">
                              Permitted Member
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="mr-1 size-4 text-red-500" />
                            <span className="text-red-600 dark:text-red-400">
                              Not a Member
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Registration Section */}
                <div className="mt-4">
                  <h3 className="mb-2 text-lg font-medium">
                    Account Registration
                  </h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {isRegistered
                      ? "Your account is registered and has full access to all features."
                      : "Register your account with our system to enable all features."}
                  </p>
                  <button
                    onClick={handleRegisterAccount}
                    className={`flex items-center rounded-md px-4 py-2 text-white ${
                      isRegistered
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={isProcessing}
                  >
                    <UserPlus className="mr-2 size-5" />
                    {isRegistered ? "Update Registration" : "Register Account"}
                  </button>
                  {/* Registration Status Message */}
                  {registrationStatus.show && (
                    <div
                      className={`mt-4 rounded-md p-3 text-sm ${
                        registrationStatus.success
                          ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {registrationStatus.message}
                    </div>
                  )}
                </div>
                {/* Theme Settings */}
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h3 className="mb-3 text-lg font-medium">Theme Settings</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Dark Mode
                    </span>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="flex h-6 w-11 items-center rounded-full bg-gray-200 p-1 transition-colors duration-300 focus:outline-none dark:bg-gray-700"
                      aria-pressed={darkMode}
                    >
                      <div
                        className={`size-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                          darkMode ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Sidebar Default
                    </span>
                    <button
                      onClick={() => {
                        if (!isMobile) {
                          setSidebarOpen(!sidebarOpen);
                          localStorage.setItem(
                            "sidebarOpen",
                            (!sidebarOpen).toString()
                          );
                        }
                      }}
                      className="flex h-6 w-11 items-center rounded-full bg-gray-200 p-1 transition-colors duration-300 focus:outline-none dark:bg-gray-700"
                      aria-pressed={sidebarOpen}
                      disabled={isMobile}
                    >
                      <div
                        className={`size-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                          sidebarOpen ? "translate-x-5" : ""
                        } ${isMobile ? "opacity-50" : ""}`}
                      />
                    </button>
                  </div>
                </div>
                {/* Account Security */}
                <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <h3 className="mb-3 text-lg font-medium">Account Security</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-gray-600 dark:text-gray-400">
                        Your session will expire after 36 hours of inactivity.
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="mr-1 size-4" />
                        <span>
                          {lastLogin
                            ? `Last active: ${lastLogin}`
                            : "No recent activity"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      <LogOut className="mr-2 size-5" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Email Management - Only visible to Governing Body or HR Executive */}
            {userData &&
              (userData.Member_Type === "Governing Body" ||
                (userData.Member_Type === "Executive" &&
                  userData.Portfolio === "Human Resource")) && (
                <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
                  <h3 className="mb-4 text-lg font-medium">Email Management</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    Add permitted email addresses for new members.
                  </p>
                  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="newEmail"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          New Member Email
                        </label>
                        <input
                          type="email"
                          id="newEmail"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="memberType"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Member Type
                        </label>
                        <select
                          id="memberType"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="Executive">Executive</option>
                          <option value="Associate">Associate</option>
                          <option value="Governing Body">Governing Body</option>
                        </select>
                      </div>
                      <button className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                        <UserPlus className="mr-2 size-5" />
                        Add Member
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-md mb-2 font-medium">
                      Current Permitted Members
                    </h4>
                    <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                          {permittedEmails.map((email, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="text-sm text-gray-900 dark:text-gray-200">
                                  {email}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                  Active
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            {/* System Information */}
            <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
              <h3 className="mb-3 text-lg font-medium">System Information</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Version:</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Environment:</span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Production
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">
              Welcome to E-Cell Dashboard
            </h2>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        );
    }
  };

  // Loading screen component
  const LoadingScreen = () => (
    <div className="flex size-full flex-col items-center justify-center">
      <div className="mb-4 size-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {validationMessage}
      </p>
    </div>
  );

  // Authentication Modal with simplified authentication flow (no IP tracking)
  const AuthModal = () => {
    // Local state for authentication
    const [localEmail, setLocalEmail] = useState("");
    const [localOtp, setLocalOtp] = useState("");
    const [localAuthError, setLocalAuthError] = useState("");
    const [localOtpSent, setLocalOtpSent] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [otpExpiry, setOtpExpiry] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [resendDisabled, setResendDisabled] = useState(false);

    // OTP timer effect
    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (otpExpiry && otpExpiry > Date.now()) {
        setTimeLeft(Math.floor((otpExpiry - Date.now()) / 1000));

        interval = setInterval(() => {
          const newTimeLeft = Math.floor((otpExpiry - Date.now()) / 1000);

          if (newTimeLeft <= 0) {
            clearInterval(interval);
            setTimeLeft(0);
            setResendDisabled(false);
          } else {
            setTimeLeft(newTimeLeft);
          }
        }, 1000);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }, [otpExpiry]);

    // Format time left
    const formatTimeLeft = () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Handle email input change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalEmail(e.target.value);
    };

    // Handle OTP input change
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow numbers
      const value = e.target.value.replace(/\D/g, "");
      setLocalOtp(value);
    };

    // Handle avatar image upload
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          setLocalAuthError("Image size exceeds 2MB limit");

          return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatarImage(reader.result as string);
        };

        reader.readAsDataURL(file);
      }
    };

    // Send OTP
    const handleSendOtpClick = async () => {
      setLocalAuthError("");
      setIsProcessing(true);

      try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(localEmail)) {
          setLocalAuthError("Please enter a valid email address");
          setIsProcessing(false);

          return;
        }

        // Ensure we have the latest permitted emails
        if (permittedEmails.length === 0) {
          await fetchPermittedEmails();
        }

        // Normalize email for comparison
        const normalizedEmail = localEmail.trim().toLowerCase();
        const normalizedPermittedEmails = permittedEmails.map((e) =>
          e.trim().toLowerCase()
        );

        // Check if email is permitted
        if (!normalizedPermittedEmails.includes(normalizedEmail)) {
          setLocalAuthError(
            "This email is not authorized to access the dashboard"
          );
          setIsProcessing(false);

          return;
        }

        // Check if user has already signed up (for signup mode) or not signed up (for login mode)
        const { data: memberData, error: memberError } = await supabase
          .from("PermittedMembers")
          .select("signedUp")
          .eq("email", normalizedEmail)
          .single();

        if (authMode === "signup") {
          // For signup: Check if already signed up
          if (!memberError && memberData && memberData.signedUp) {
            setLocalAuthError(
              "This email has already been registered. Please login instead"
            );
            setIsProcessing(false);

            return;
          }
        } else {
          // For login: Check if NOT signed up
          if (!memberError && memberData && !memberData.signedUp) {
            setLocalAuthError(
              "This email is not registered yet. Please sign up first"
            );
            setIsProcessing(false);

            return;
          }
        }

        // Generate OTP
        const generatedOTP = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        // Set OTP expiry (5 minutes from now)
        const expiryTime = Date.now() + 5 * 60 * 1000;
        setOtpExpiry(expiryTime);
        setTimeLeft(5 * 60);
        setResendDisabled(true);

        // Store OTP in Supabase
        const { error: updateError } = await supabase
          .from("PermittedMembers")
          .update({
            OTP: generatedOTP,
            OTPExpiry: new Date(expiryTime).toISOString(),
          })
          .eq("email", normalizedEmail);

        if (updateError) {
          console.error("Error storing OTP:", updateError);
          setLocalAuthError("Failed to send OTP. Please try again");
          setIsProcessing(false);

          return;
        }

        // Update parent state with validated email
        setEmail(localEmail);

        // Send OTP email using the API route instead of direct client-side call
        try {
          console.log(
            `Sending OTP email to ${normalizedEmail} with code: ${generatedOTP}`
          );

          const response = await fetch("/api/otp-email-sender", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: normalizedEmail,
              otp: generatedOTP,
            }),
          });

          const result = await response.json();

          if (result.success) {
            console.log("Email sent successfully");
            toast.success("OTP sent successfully! Please check your email");
          } else {
            throw new Error(result.error || "Failed to send email");
          }
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          // Still continue even if email fails, since we're showing OTP in console for development
          toast.success(
            "OTP sent successfully! Check console for development purposes"
          );
          console.log(`OTP for ${normalizedEmail}: ${generatedOTP}`);
        }

        // Important: Set this state to true to show OTP input UI
        setLocalOtpSent(true);
      } catch (error) {
        console.error("Error sending OTP:", error);
        setLocalAuthError("An error occurred. Please try again");
      } finally {
        setIsProcessing(false);
      }
    };

    // Verify OTP
    const handleVerifyOtpClick = async () => {
      setLocalAuthError("");
      setIsProcessing(true);

      try {
        // Normalize email
        const normalizedEmail = localEmail.trim().toLowerCase();

        // Get stored OTP and expiry from Supabase
        const { data: memberData, error: memberError } = await supabase
          .from("PermittedMembers")
          .select("OTP, OTPExpiry")
          .eq("email", normalizedEmail)
          .single();

        if (memberError || !memberData) {
          setLocalAuthError("Failed to verify OTP. Please try again");
          setIsProcessing(false);

          return;
        }

        // Check if OTP has expired
        if (
          memberData.OTPExpiry &&
          new Date(memberData.OTPExpiry) < new Date()
        ) {
          setLocalAuthError("OTP has expired. Please request a new one");
          setIsProcessing(false);

          return;
        }

        // Verify OTP
        if (localOtp !== memberData.OTP) {
          setLocalAuthError("Invalid OTP. Please try again");
          setIsProcessing(false);

          return;
        }

        // Check if user exists in Team table
        const { data: existingUser, error: userError } = await supabase
          .from("Team")
          .select("custom_auth_userID, clerk_user_id")
          .eq("email", normalizedEmail);

        // Generate or use existing user ID
        let userId;
        let isNewUser = true;

        if (
          !userError &&
          existingUser &&
          existingUser.length > 0 &&
          (existingUser[0].custom_auth_userID || existingUser[0].clerk_user_id)
        ) {
          // Use existing user ID
          userId =
            existingUser[0].custom_auth_userID || existingUser[0].clerk_user_id;
          isNewUser = false;
          console.log("Found existing user ID:", userId);

          // Set isRegistered to true since user exists in Team table
          setIsRegistered(true);
        } else {
          // Generate new user ID
          userId = "user_" + Math.random().toString(36).substring(2, 15);
          console.log("Generated new user ID:", userId);

          // User not registered yet
          setIsRegistered(false);
        }

        // Create session with timestamp
        const now = new Date().getTime();
        const expiryTime = now + SESSION_DURATION;
        const session = {
          userId,
          email: localEmail,
          expiry: expiryTime,
          loginTime: now,
          lastActive: now,
          avatar: avatarImage,
        };

        // Store session in localStorage
        localStorage.setItem("ecellSession", JSON.stringify(session));

        // Check if user has an active session in UserSessions table
        const { data: existingSession, error: sessionCheckError } =
          await supabase
            .from("UserSessions")
            .select("*")
            .eq("user_id", userId)
            .eq("is_active", true);

        if (
          !sessionCheckError &&
          existingSession &&
          existingSession.length > 0
        ) {
          // Update existing session
          const { error: updateError } = await supabase
            .from("UserSessions")
            .update({
              login_time: new Date(now).toISOString(),
              expiry_time: new Date(expiryTime).toISOString(),
              last_active: new Date(now).toISOString(),
            })
            .eq("user_id", userId)
            .eq("is_active", true);

          if (updateError) {
            console.error("Error updating session:", updateError);
          }
        } else {
          // Create new session
          const { error: insertError } = await supabase
            .from("UserSessions")
            .insert({
              user_id: userId,
              email: localEmail,
              login_time: new Date(now).toISOString(),
              expiry_time: new Date(expiryTime).toISOString(),
              is_active: true,
            });

          if (insertError) {
            console.error("Error creating session:", insertError);
          }
        }

        // If this is a signup or avatar is provided, update the PermittedMembers table
        if (authMode === "signup" || avatarImage) {
          console.log(
            "Updating PermittedMembers with avatar:",
            avatarImage ? "Avatar provided" : "No avatar"
          );

          const updateData: any = {
            signedUp: true,
            signup_date: new Date().toISOString(),
          };

          // Only update avatar if it's provided
          if (avatarImage) {
            updateData.avatar = avatarImage;
          }

          const { error: signupError } = await supabase
            .from("PermittedMembers")
            .update(updateData)
            .eq("email", normalizedEmail);

          if (signupError) {
            console.error(
              "Error updating signup status and avatar:",
              signupError
            );
          } else {
            console.log("Successfully updated PermittedMembers with avatar");
          }
        }

        // Clear OTP from Supabase for security
        await supabase
          .from("PermittedMembers")
          .update({ OTP: null, OTPExpiry: null })
          .eq("email", normalizedEmail);

        // Update the Signed Up user to true
        await supabase
          .from("PermittedMembers")
          .update({ signedUp: true })
          .eq("email", normalizedEmail);

        // Update parent state
        setEmail(localEmail);
        setIsSignedIn(true);
        setIsPermittedMember(true);
        setShowAuthModal(false);
        setLastLogin(new Date().toLocaleString());

        // Fetch user data
        await fetchUserData(userId);

        // Show success message
        toast.success(
          isNewUser
            ? "Login successful! Please register your account."
            : "Login successful!"
        );
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setLocalAuthError("An error occurred. Please try again");
      } finally {
        setIsProcessing(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 dark:text-gray-200">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            {authMode === "login"
              ? "Login to Dashboard"
              : "Sign Up for Dashboard"}
          </h2>
          <div className="space-y-4">
            {localAuthError && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {localAuthError}
              </div>
            )}
            {!localOtpSent ? (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={localEmail}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email"
                    disabled={isProcessing}
                  />
                </div>
                {authMode === "signup" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Profile Picture
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex size-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        {avatarImage ? (
                          <Image
                            src={avatarImage}
                            alt="Profile preview"
                            width={64}
                            height={64}
                            className="size-16 rounded-full object-cover"
                          />
                        ) : (
                          <User className="size-8 text-gray-400" />
                        )}
                      </div>
                      <label className="flex cursor-pointer items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600">
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          disabled={isProcessing}
                        />
                        <span>Upload</span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setAuthMode(authMode === "login" ? "signup" : "login")
                      }
                      className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      {authMode === "login"
                        ? "Need to sign up?"
                        : "Already have an account?"}
                    </button>
                  </div>
                  <button
                    onClick={handleSendOtpClick}
                    className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800/50"
                    disabled={
                      !localEmail ||
                      isProcessing ||
                      (authMode === "signup" && !avatarImage)
                    }
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Enter OTP
                    </label>
                    {timeLeft > 0 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Expires in {formatTimeLeft()}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    id="otp"
                    value={localOtp}
                    onChange={handleOtpChange}
                    maxLength={6}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter 6-digit OTP"
                    disabled={isProcessing}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    We sent a 6-digit code to {localEmail}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setLocalOtpSent(false);
                      setLocalOtp("");
                    }}
                    className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    disabled={isProcessing}
                  >
                    Back to Email
                  </button>
                  <button
                    onClick={handleVerifyOtpClick}
                    className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-800/50"
                    disabled={!localOtp || isProcessing || localOtp.length < 6}
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
                {timeLeft === 0 && (
                  <div className="mt-2 text-center">
                    <button
                      onClick={handleSendOtpClick}
                      className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                      disabled={isProcessing || resendDisabled}
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-4 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen && !isMobile ? (
              <ChevronLeft className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
          <div className="flex items-center">
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400 md:text-xl">
              Welcome to E-Cell Dashboard
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-5">
          <Link
            href="/"
            className="hidden text-gray-500 dark:text-gray-400 md:block"
          >
            <HomeIcon className="size-6 text-gray-500 dark:text-gray-400" />
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
          {isSignedIn && (
            <div className="mr-2 flex items-center">
              {(() => {
                // Get avatar from session
                const sessionData = localStorage.getItem("ecellSession");
                const avatar = sessionData
                  ? JSON.parse(sessionData).avatar
                  : null;

                return avatar ? (
                  <Image
                    src={avatar}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="size-8 rounded-full border border-gray-200 object-cover dark:border-gray-700"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                    <User className="size-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                );
              })()}
            </div>
          )}
          {isSignedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 md:px-4 md:py-2 md:text-base"
            >
              <LogOut className="mr-1 size-4 md:mr-2" />
              <span className="xs:inline hidden">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 md:px-4 md:py-2 md:text-base"
            >
              Sign In
            </button>
          )}
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Updated for better responsiveness */}
        <aside
          className={`${
            sidebarOpen ? "w-full md:w-64" : "w-0 md:w-16"
          } fixed inset-y-0 left-0 top-16 z-10 border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 md:static md:top-0 md:translate-x-0 ${
            !sidebarOpen && !isMobile
              ? "translate-x-0"
              : !sidebarOpen
                ? "-translate-x-full"
                : "translate-x-0"
          }`}
        >
          {/* Scrollable sidebar content */}
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="space-y-1 p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium ${
                    activeTab === item.id
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  } ${!sidebarOpen && !isMobile ? "justify-center" : ""} ${
                    !isRegistered && item.id !== "settings"
                      ? "cursor-not-allowed opacity-50 hover:bg-transparent dark:hover:bg-transparent"
                      : ""
                  }`}
                  disabled={
                    isValidating || (!isRegistered && item.id !== "settings")
                  }
                >
                  <div
                    className={`${!sidebarOpen && !isMobile ? "mr-0" : "mr-3"}`}
                  >
                    {item.icon}
                  </div>
                  {(sidebarOpen || isMobile) && (
                    <>
                      <span>{item.label}</span>
                      {activeTab === item.id && (
                        <ChevronRight className="ml-auto size-4" />
                      )}
                      {!isRegistered && item.id !== "settings" && (
                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                          {!sidebarOpen ? "" : "Register first"}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>
        {/* Main Content - Adjusted for better responsiveness */}
        <main
          className={`flex-1 overflow-auto p-3 transition-all duration-300 md:p-6 ${sidebarOpen && !isMobile ? "md:ml-0" : "md:ml-0"}`}
        >
          {/* Status message */}
          {registrationStatus.show && (
            <div
              className={`mb-4 rounded-md p-4 ${
                registrationStatus.success
                  ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-400"
              }`}
            >
              {registrationStatus.message}
            </div>
          )}
          <div className="mx-auto h-full max-w-7xl">
            {isValidating ? (
              <LoadingScreen />
            ) : (
              <>
                <h1 className="mb-4 text-xl font-bold md:mb-6 md:text-2xl">
                  {navItems.find((item) => item.id === activeTab)?.label ||
                    "Dashboard"}
                </h1>
                {renderContent()}
              </>
            )}
          </div>
        </main>
      </div>
      {/* Permission Modal */}
      {/* {showPermissionModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 dark:text-gray-200">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          Membership Required
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            You need to be an E-Cell member to access the dashboard features.
            Join our community to get full access.
          </p>
          <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-3 sm:space-y-0">
            <button
              onClick={() => setShowPermissionModal(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Close
            </button>
            <button
              onClick={handleMembershipRedirect}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Become a Member
            </button>
          </div>
        </div>
      </div>
    </div>
    )} */}
      {/* Authentication Modal */}
      {showAuthModal && <AuthModal />}
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-0 bg-gray-600/50 transition-opacity md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: darkMode ? "#374151" : "#ffffff",
            color: darkMode ? "#f3f4f6" : "#1f2937",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default DashboardPage;
