// Define theme information types for Skills component
export interface SkillsThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    backgroundGlow3: string;
    heading: string;
    description: string;
    categoryButtons: {
      active: string;
      inactive: string;
    };
    searchInput: string;
    viewToggle: {
      container: string;
      active: string;
      inactive: string;
    };
    skillCard: {
      container: string;
      title: string;
      categoryBadge: string;
      proficiencyText: string;
      yearsText: string;
      progressBackground: string;
    };
    modal: {
      overlay: string;
      container: string;
      header: string;
      title: string;
      closeButton: string;
      input: string;
      categoryButtonsActive: string;
      categoryButtonsInactive: string;
    };
    proficiencyColors: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
    };
  }
  
  // Define theme-specific styles with explicit values
  export const skillsThemeMap: Record<string, SkillsThemeStyles> = {
    "Gradient Theme": {
      container: "relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-purple-500 opacity-10 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200",
      categoryButtons: {
        active: "bg-pink-600 text-white",
        inactive: "bg-indigo-900/60 text-gray-300 hover:bg-indigo-800/70"
      },
      searchInput: "w-full rounded-full bg-indigo-900/50 px-4 py-2 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-indigo-900/50 p-1",
        active: "bg-indigo-800/70",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-indigo-900/40 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-indigo-800/50 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-pink-900/50 px-2.5 py-1 text-xs font-medium text-pink-200",
        proficiencyText: "text-purple-200",
        yearsText: "text-purple-300/70",
        progressBackground: "bg-indigo-950/50"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl",
        header: "flex items-center justify-between border-b border-purple-800 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-pink-200 hover:bg-purple-800 hover:text-white",
        input: "w-full rounded-lg bg-indigo-800/70 px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500",
        categoryButtonsActive: "bg-pink-600 text-white",
        categoryButtonsInactive: "bg-indigo-800/70 text-purple-200 hover:bg-indigo-700/70"
      },
      proficiencyColors: {
        beginner: "from-pink-300 to-pink-500",
        intermediate: "from-purple-300 to-purple-600",
        advanced: "from-indigo-300 to-indigo-600",
        expert: "from-blue-300 to-blue-600"
      }
    },
    "Monochromatic Theme": {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-white opacity-5 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400",
      categoryButtons: {
        active: "bg-gray-600 text-white",
        inactive: "bg-gray-800 text-gray-300 hover:bg-gray-700"
      },
      searchInput: "w-full rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-gray-800 p-1",
        active: "bg-gray-700",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-gray-800 bg-opacity-60 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-opacity-80 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-300",
        proficiencyText: "text-gray-400",
        yearsText: "text-gray-500",
        progressBackground: "bg-gray-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-800 shadow-2xl",
        header: "flex items-center justify-between border-b border-gray-700 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white",
        input: "w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500",
        categoryButtonsActive: "bg-gray-600 text-white",
        categoryButtonsInactive: "bg-gray-700 text-gray-300 hover:bg-gray-600"
      },
      proficiencyColors: {
        beginner: "from-gray-400 to-gray-500",
        intermediate: "from-gray-300 to-gray-600",
        advanced: "from-gray-200 to-gray-500",
        expert: "from-white to-gray-400"
      }
    },
    "Dark Theme with accent colors": {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-600 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-amber-500 opacity-10 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-blue-400 opacity-10 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200",
      categoryButtons: {
        active: "bg-blue-600 text-white",
        inactive: "bg-gray-900 text-gray-300 hover:bg-gray-800"
      },
      searchInput: "w-full rounded-full bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-gray-900 p-1",
        active: "bg-gray-800",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-gray-900 bg-opacity-60 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-opacity-80 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-blue-900 px-2.5 py-1 text-xs font-medium text-blue-200",
        proficiencyText: "text-amber-400",
        yearsText: "text-gray-500",
        progressBackground: "bg-gray-800"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-900 shadow-2xl",
        header: "flex items-center justify-between border-b border-gray-800 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-amber-400 hover:bg-gray-800 hover:text-white",
        input: "w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
        categoryButtonsActive: "bg-blue-600 text-white",
        categoryButtonsInactive: "bg-gray-800 text-gray-300 hover:bg-gray-700"
      },
      proficiencyColors: {
        beginner: "from-amber-300 to-amber-600",
        intermediate: "from-yellow-300 to-amber-500",
        advanced: "from-blue-300 to-blue-600",
        expert: "from-blue-400 to-blue-700"
      }
    },
    "Default": {
      container: "relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-teal-950 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-teal-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-500 opacity-5 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-teal-400 opacity-5 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400",
      categoryButtons: {
        active: "bg-teal-600 text-white",
        inactive: "bg-gray-800 text-gray-300 hover:bg-gray-700"
      },
      searchInput: "w-full rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-gray-800 p-1",
        active: "bg-gray-700",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-gray-800 bg-opacity-60 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-opacity-80 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-teal-900 px-2.5 py-1 text-xs font-medium text-teal-200",
        proficiencyText: "text-gray-400",
        yearsText: "text-gray-500",
        progressBackground: "bg-gray-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-800 shadow-2xl",
        header: "flex items-center justify-between border-b border-gray-700 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white",
        input: "w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500",
        categoryButtonsActive: "bg-teal-600 text-white",
        categoryButtonsInactive: "bg-gray-700 text-gray-300 hover:bg-gray-600"
      },
      proficiencyColors: {
        beginner: "from-green-300 to-green-500",
        intermediate: "from-blue-300 to-blue-600",
        advanced: "from-purple-300 to-purple-600",
        expert: "from-teal-300 to-teal-600"
      }
    }
  };
  
  // Helper function to get theme styles
  export const getSkillsThemeStyles = (theme: string): SkillsThemeStyles => {
    return skillsThemeMap[theme] || skillsThemeMap["Default"];
  };