// Define theme styles interface
export interface VolunteerExperienceThemeStyles {
    container: string;
    backgroundGradient: string;
    decorativeElement1: string;
    decorativeElement2: string;
    mainHeading: string;
    mainDescription: string;
    emptyContainer: string;
    emptyText: string;
    cardContainer: string;
    card: string;
    cardTitle: string;
    cardTitleHover: string;
    cardIcon: string;
    cardDescription: string;
    cardLink: string;
    modalOverlay: string;
    modalContainer: string;
    modalIconContainer: string;
    modalIconColor: string;
    modalTitle: string;
    modalDescriptionBox: string;
    modalDescriptionTitle: string;
    modalDescriptionText: string;
    closeButton: string;
  }
  
  // Define theme-specific styles
  export const volunteerExperienceThemeMap: Record<string, VolunteerExperienceThemeStyles> = {
    "Gradient Theme": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950",
      decorativeElement1: "bg-indigo-500 opacity-10 blur-3xl",
      decorativeElement2: "bg-purple-500 opacity-10 blur-3xl",
      mainHeading: "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent",
      mainDescription: "text-indigo-200",
      emptyContainer: "bg-indigo-800/50",
      emptyText: "text-indigo-200",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-indigo-800/70 to-indigo-950/70",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-purple-300",
      cardIcon: "text-purple-400",
      cardDescription: "text-indigo-100/80",
      cardLink: "text-purple-400",
      modalOverlay: "bg-black/75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-indigo-900 to-indigo-950",
      modalIconContainer: "bg-purple-500/20",
      modalIconColor: "text-purple-400",
      modalTitle: "text-white",
      modalDescriptionBox: "bg-indigo-950/50",
      modalDescriptionTitle: "text-purple-400",
      modalDescriptionText: "text-indigo-100",
      closeButton: "bg-indigo-700 bg-opacity-50 hover:bg-opacity-70"
    },
    "Monochromatic Theme": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
      decorativeElement1: "bg-gray-500 opacity-10 blur-3xl",
      decorativeElement2: "bg-gray-600 opacity-10 blur-3xl",
      mainHeading: "bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent",
      mainDescription: "text-gray-300",
      emptyContainer: "bg-gray-800/50",
      emptyText: "text-gray-300",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-gray-800/70 to-gray-900/70",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-gray-300",
      cardIcon: "text-gray-400",
      cardDescription: "text-gray-300/80",
      cardLink: "text-gray-400",
      modalOverlay: "bg-black/75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-gray-900 to-gray-950",
      modalIconContainer: "bg-gray-500/20",
      modalIconColor: "text-gray-400",
      modalTitle: "text-white",
      modalDescriptionBox: "bg-gray-950/50",
      modalDescriptionTitle: "text-gray-400",
      modalDescriptionText: "text-gray-300",
      closeButton: "bg-gray-700 bg-opacity-50 hover:bg-opacity-70"
    },
    "Dark Theme with accent colors": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-black via-blue-950 to-black",
      decorativeElement1: "bg-blue-500 opacity-10 blur-3xl",
      decorativeElement2: "bg-amber-500 opacity-10 blur-3xl",
      mainHeading: "bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent",
      mainDescription: "text-blue-200",
      emptyContainer: "bg-blue-900/50",
      emptyText: "text-blue-200",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-blue-900/70 to-black/70",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-amber-300",
      cardIcon: "text-amber-400",
      cardDescription: "text-blue-100/80",
      cardLink: "text-amber-400",
      modalOverlay: "bg-black/75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-blue-900 to-black",
      modalIconContainer: "bg-amber-500/20",
      modalIconColor: "text-amber-400",
      modalTitle: "text-white",
      modalDescriptionBox: "bg-black/50",
      modalDescriptionTitle: "text-amber-400",
      modalDescriptionText: "text-blue-100",
      closeButton: "bg-blue-900 bg-opacity-50 hover:bg-opacity-70"
    },
    "Default": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950",
      decorativeElement1: "bg-indigo-500 opacity-10 blur-3xl",
      decorativeElement2: "bg-amber-400 opacity-10 blur-3xl",
      mainHeading: "bg-gradient-to-r from-indigo-400 to-amber-300 bg-clip-text text-transparent",
      mainDescription: "text-slate-300",
      emptyContainer: "bg-slate-800/50 backdrop-blur-sm border border-indigo-500/10",
      emptyText: "text-slate-300",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-slate-800/70 to-indigo-950/70 backdrop-blur-sm border border-indigo-500/10 transition-all duration-300",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-amber-300",
      cardIcon: "text-amber-400",
      cardDescription: "text-slate-300/90",
      cardLink: "text-amber-400 hover:text-amber-300 transition-colors",
      modalOverlay: "bg-slate-950/80 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-slate-900 to-indigo-950 border border-amber-500/10",
      modalIconContainer: "bg-indigo-500/20",
      modalIconColor: "text-amber-400",
      modalTitle: "text-white",
      modalDescriptionBox: "bg-slate-950/50 border border-indigo-500/10",
      modalDescriptionTitle: "text-amber-400",
      modalDescriptionText: "text-slate-300",
      closeButton: "bg-indigo-700 bg-opacity-50 hover:bg-opacity-70 transition-all duration-300"
    }
  };
  
  // Helper function to get theme styles
  export const getVolunteerExperienceThemeStyles = (theme: string): VolunteerExperienceThemeStyles => {
    return volunteerExperienceThemeMap[theme] || volunteerExperienceThemeMap["Default"];
  };