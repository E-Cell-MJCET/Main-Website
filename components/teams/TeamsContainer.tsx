"use client";

import { useState, useEffect } from "react";

import GBComponent from "@/components/teams/gb";
import TeamComponent from "@/components/teams/execom-new";
import CoreTeamComponent from "@/components/teams/CoreTeamFixed-new";

interface TeamData {
  year: string;
  governingBody: any[];
  categories: string[];
  execomMembers: any[];
  coreTeamMembers: any[];
}

interface YearSelectorProps {
  selectedYear: string;
  availableYears: string[];
  onYearChange: (year: string) => void;
}

const YearSelector = ({
  selectedYear,
  availableYears,
  onYearChange,
}: YearSelectorProps) => {
  return (
    <div className="mb-8 flex justify-center">
      <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-2 backdrop-blur-sm">
        <div className="flex space-x-2">
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`
                rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300
                ${
                  selectedYear === year
                    ? "scale-105 bg-white text-black shadow-lg"
                    : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                }
              `}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface TeamsWrapperProps {
  teamData: TeamData;
}

const TeamsWrapper = ({ teamData }: TeamsWrapperProps) => {
  const hasAnyData =
    (teamData.governingBody && teamData.governingBody.length > 0) ||
    (teamData.execomMembers && teamData.execomMembers.length > 0) ||
    (teamData.coreTeamMembers && teamData.coreTeamMembers.length > 0);

  if (!hasAnyData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-400">
            No Team Data Available
          </h2>
          <p className="mt-2 text-gray-500">
            Team information for {teamData.year} is not yet available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {teamData.governingBody && teamData.governingBody.length > 0 && (
        <GBComponent data={teamData.governingBody} />
      )}
      {teamData.execomMembers && teamData.execomMembers.length > 0 && (
        <TeamComponent
          categories={teamData.categories}
          teamMembers={teamData.execomMembers}
        />
      )}
      {teamData.coreTeamMembers && teamData.coreTeamMembers.length > 0 && (
        <CoreTeamComponent coreTeamMembers={teamData.coreTeamMembers} />
      )}
    </div>
  );
};

export default function TeamsContainer() {
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const availableYears = ["2024-2025", "2025-2026", "2026-2027"];

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/data/teams/${selectedYear}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load data for ${selectedYear}`);
        }

        const data = await response.json();
        setTeamData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load team data"
        );
        console.error("Error loading team data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, [selectedYear]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="size-12 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="text-lg text-white">Loading team data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-red-400">
            Error Loading Team Data
          </h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-white px-6 py-3 text-black transition-colors hover:bg-gray-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-lg text-white">No team data available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header with Year Selector */}
      <div className="px-4 pb-1 pt-32">
        <div className="mx-auto max-w-7xl text-center">
          {/* <h1 className="mb-4 text-5xl font-bold text-white">Our Team</h1>
          <p className="mb-8 text-xl text-gray-300">
            Meet the amazing people who make our organization thrive
          </p> */}
          <YearSelector
            selectedYear={selectedYear}
            availableYears={availableYears}
            onYearChange={setSelectedYear}
          />
        </div>
      </div>
      {/* Teams Content */}
      <TeamsWrapper teamData={teamData} />
    </div>
  );
}
