"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";

import { supabase } from "@/utils/supabase";

interface TeamMember {
  id: string;
  clerk_user_id: string;
  Name: string;
  Tagline: string;
  ProfileImageHeader: string;
  Username: string;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all users that have a clerk_user_id
        const { data, error } = await supabase
          .from("Team")
          .select("clerk_user_id, Name, Tagline, ProfileImageHeader, Username")
          .not("clerk_user_id", "is", null)
          .order("Name", { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          setTeamMembers(data as TeamMember[]);
        }
      } catch (error: any) {
        console.error("Error fetching team members:", error.message);
        setError("Failed to load team members. Please try again later.");
        toast.error("Failed to load team members");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="size-12 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer 
        position="top-center" 
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="mb-8 text-center text-3xl font-bold">Our Team</h1>
      {teamMembers.length === 0 ? (
        <p className="text-center text-gray-500">No team members found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Link 
              href={`/profile/${member.Username || member.id}`} 
              key={member.id}
              className="rounded-lg bg-white p-4 shadow-md transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4 size-32 overflow-hidden rounded-full">
                  {member.ProfileImageHeader ? (
                    <Image
                      src={member.ProfileImageHeader}
                      alt={`${member.Name}'s profile`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback to default icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.classList.add("bg-gray-200", "flex", "items-center", "justify-center");
                          const icon = document.createElement("div");
                          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-16 w-16 text-gray-400">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                          </svg>`;
                          parent.appendChild(icon);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-gray-200">
                      <UserIcon className="size-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <h2 className="mb-1 text-center text-xl font-semibold text-gray-800">
                  {member.Name || "Team Member"}
                </h2>
                <p className="line-clamp-2 text-center text-sm text-gray-600">
                  {member.Tagline || "Team member at our organization"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;