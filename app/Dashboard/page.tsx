"use client";
import React, { useState, useEffect } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
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
  BookOpen,
  WandSparkles,
  UserPlus,
  AlertCircle,
} from "lucide-react";

import { supabase } from "@/utils/supabase";
import Main_Dashboard from "@/components/AdvanceProfile/Dashboard/MainDashboard";
import Profile_Themes from "@/components/AdvanceProfile/Dashboard/ProfileThemes";
import UserRegistration from "@/components/AdvanceProfile/Dashboard/User_Registration";
import UserPagePrefrences_Dashboard from "@/components/AdvanceProfile/Dashboard/CompleteUserPagePrefrences";
import Team from "@/components/AdvanceProfile/Dashboard/Team";
// import Additional from '@/components/AdvanceProfile/Dashboard/Additional';

const DashboardPage = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<{
    success: boolean;
    message: string;
    show: boolean;
  }>({ success: false, message: "", show: false });

  // New states for user validation
  const [isValidating, setIsValidating] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [validationMessage, setValidationMessage] = useState(
    "Initializing dashboard..."
  );

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

  // Check if user is registered in Team table
  useEffect(() => {
    const validateUser = async () => {
      if (!isLoaded) return;

      if (!isSignedIn || !user) {
        setIsValidating(false);

        return;
      }

      try {
        setIsValidating(true);
        setValidationMessage("Checking user registration status...");

        // Delay to ensure message is visible
        await new Promise((resolve) => setTimeout(resolve, 800));

        setValidationMessage("Connecting to database...");

        // Check if user exists in Team table
        const { data, error } = await supabase
          .from("Team")
          .select("*")
          .eq("clerk_user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        // Set registration status based on query result
        setIsRegistered(!!data);

        // If not registered, set active tab to settings
        if (!data) {
          setActiveTab("settings");
        }

        setValidationMessage("Preparing dashboard...");
        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsValidating(false);
      } catch (error) {
        console.error("Error validating user:", error);
        setValidationMessage("Something went wrong. Please refresh the page.");

        // Still allow access after error, but default to settings
        setActiveTab("settings");
        setIsRegistered(false);

        setTimeout(() => {
          setIsValidating(false);
        }, 1500);
      }
    };

    validateUser();
  }, [isLoaded, isSignedIn, user]);

  // Handle registration completion
  const handleRegistrationComplete = (success: boolean, message: string) => {
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

  // Sidebar navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="size-5" /> },
    { id: "events", label: "Events", icon: <Calendar className="size-5" /> },
    { id: "team", label: "Team", icon: <Users className="size-5" /> },
    {
      id: "theme",
      label: "Profile Themes",
      icon: <WandSparkles className="size-5" />,
    },
    {
      id: "prefrences",
      label: "User Page Prefrences",
      icon: <BookOpen className="size-5" />,
    },
    // { id: 'Aditional', label: 'Additional', icon: <BarChart2 className="size-5" /> },
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

  // Handle tab click with registration check
  const handleTabClick = (tabId: any) => {
    // Always allow settings tab
    if (tabId === "settings" || isRegistered) {
      setActiveTab(tabId);
      if (isMobile) setSidebarOpen(false);
    } else if (isSignedIn && !isRegistered) {
      // Show registration prompt if trying to access restricted tabs
      setRegistrationStatus({
        success: false,
        message: "Please register your account first to access this feature",
        show: true,
      });

      setTimeout(() => {
        setRegistrationStatus((prev) => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Main_Dashboard />;
      case "events":
        return (
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Upcoming Events</h2>
            <p>Manage and view all E-Cell events here.</p>
          </div>
        );
      case "prefrences":
        return <UserPagePrefrences_Dashboard />;
      case "team":
        return <Team />;
      case "theme":
        return <Profile_Themes />;
      case "analytics":
        return (
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Analytics</h2>
            <p>View performance metrics and analytics.</p>
          </div>
        );
      case "settings":
        return (
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Settings</h2>
            <p className="mb-6">
              Configure dashboard settings and preferences.
            </p>
            {isSignedIn && !isRegistered && (
              <div className="mb-6 rounded-md bg-amber-50 p-4 dark:bg-amber-900/20">
                <div className="flex">
                  <div className="shrink-0">
                    <AlertCircle className="size-5 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-amber-400">
                      Registration Required
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      <p>
                        Your account needs to be registered to access all
                        dashboard features.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isSignedIn && (
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
                  onClick={() => setShowRegistration(true)}
                  className={`flex items-center rounded-md px-4 py-2 text-white ${
                    isRegistered
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  disabled={isValidating}
                >
                  <UserPlus className="mr-2 size-4" />
                  {isRegistered ? "Update Registration" : "Register Account"}
                </button>
              </div>
            )}
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
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              E-Cell
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Updated to remove gap with header in desktop view */}
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
        {/* Main Content - Adjusted to work with collapsible sidebar */}
        <main
          className={`flex-1 overflow-auto p-6 transition-all duration-300 ${sidebarOpen && !isMobile ? "md:ml-0" : "md:ml-0"}`}
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
                <h1 className="mb-6 text-2xl font-bold">
                  {navItems.find((item) => item.id === activeTab)?.label ||
                    "Dashboard"}
                </h1>
                {renderContent()}
              </>
            )}
          </div>
        </main>
      </div>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-0 bg-gray-600/50 transition-opacity md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
      {/* User Registration Modal */}
      <UserRegistration
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
        onComplete={handleRegistrationComplete}
      />
    </div>
  );
};

export default DashboardPage;
