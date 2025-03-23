// Define theme styles interface
export interface HonorsAwardsThemeStyles {
    container: string;
    backgroundGradient: string;
    decorativeElement: string;
    mainHeading: string;
    mainDescription: string;
    sectionHeading: string;
    cardContainer: string;
    card: string;
    cardDate: string;
    cardDateBg: string;
    cardIcon: string;
    cardTitle: string;
    cardTitleHover: string;
    cardIssuer: string;
    cardDescription: string;
    cardLink: string;
    modalOverlay: string;
    modalContainer: string;
    modalBadge: string;
    modalIconContainer: string;
    modalTitle: string;
    modalIssuer: string;
    modalDate: string;
    modalDescriptionBox: string;
    modalDescriptionTitle: string;
    modalDescriptionText: string;
    closeButton: string;
  }
  
  // Define theme-specific styles
  export const honorsAwardsThemeMap: Record<string, HonorsAwardsThemeStyles> = {
    "Gradient Theme": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950",
      decorativeElement: "bg-indigo-500 opacity-10",
      mainHeading: "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent",
      mainDescription: "text-indigo-200",
      sectionHeading: "bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-indigo-800/70 to-indigo-950/70",
      cardDate: "text-indigo-300",
      cardDateBg: "bg-indigo-500/20",
      cardIcon: "text-indigo-400",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-indigo-300",
      cardIssuer: "text-indigo-300",
      cardDescription: "text-indigo-100/80",
      cardLink: "text-indigo-400",
      modalOverlay: "bg-indigo-900/75",
      modalContainer: "bg-gradient-to-b from-indigo-900 to-indigo-950",
      modalBadge: "bg-indigo-500/30 text-indigo-300",
      modalIconContainer: "bg-indigo-500/20",
      modalTitle: "text-white",
      modalIssuer: "text-indigo-300",
      modalDate: "bg-indigo-500/20 text-indigo-300",
      modalDescriptionBox: "bg-indigo-950/50",
      modalDescriptionTitle: "text-indigo-400",
      modalDescriptionText: "text-indigo-100",
      closeButton: "bg-indigo-700 bg-opacity-50 hover:bg-opacity-70"
    },
    "Monochromatic Theme": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
      decorativeElement: "bg-gray-500 opacity-10",
      mainHeading: "bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent",
      mainDescription: "text-gray-300",
      sectionHeading: "bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-gray-800/70 to-gray-900/70",
      cardDate: "text-gray-300",
      cardDateBg: "bg-gray-500/20",
      cardIcon: "text-gray-400",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-gray-300",
      cardIssuer: "text-gray-300",
      cardDescription: "text-gray-400",
      cardLink: "text-gray-400",
      modalOverlay: "bg-gray-900/75",
      modalContainer: "bg-gradient-to-b from-gray-900 to-gray-950",
      modalBadge: "bg-gray-500/30 text-gray-300",
      modalIconContainer: "bg-gray-500/20",
      modalTitle: "text-white",
      modalIssuer: "text-gray-300",
      modalDate: "bg-gray-500/20 text-gray-300",
      modalDescriptionBox: "bg-gray-950/50",
      modalDescriptionTitle: "text-gray-400",
      modalDescriptionText: "text-gray-300",
      closeButton: "bg-gray-700 bg-opacity-50 hover:bg-opacity-70"
    },
    "Dark Theme with accent colors": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-black via-blue-950 to-black",
      decorativeElement: "bg-blue-500 opacity-10",
      mainHeading: "bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent",
      mainDescription: "text-blue-200",
      sectionHeading: "bg-gradient-to-r from-amber-300 to-blue-300 bg-clip-text text-transparent",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-blue-900/70 to-black/70",
      cardDate: "text-amber-300",
      cardDateBg: "bg-blue-500/20",
      cardIcon: "text-amber-400",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-blue-300",
      cardIssuer: "text-blue-300",
      cardDescription: "text-blue-100/80",
      cardLink: "text-amber-400",
      modalOverlay: "bg-black/75",
      modalContainer: "bg-gradient-to-b from-blue-900 to-black",
      modalBadge: "bg-blue-500/30 text-amber-300",
      modalIconContainer: "bg-blue-500/20",
      modalTitle: "text-white",
      modalIssuer: "text-blue-300",
      modalDate: "bg-blue-500/20 text-amber-300",
      modalDescriptionBox: "bg-black/50",
      modalDescriptionTitle: "text-amber-400",
      modalDescriptionText: "text-blue-100",
      closeButton: "bg-blue-900 bg-opacity-50 hover:bg-opacity-70"
    },
    "Default": {
        container: "relative py-16",
        backgroundGradient: "bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950",
        decorativeElement: "bg-yellow-500 opacity-10",
        mainHeading: "bg-gradient-to-r from-blue-400 to-yellow-300 bg-clip-text text-transparent",
        mainDescription: "text-blue-200",
        sectionHeading: "bg-gradient-to-r from-blue-300 to-yellow-200 bg-clip-text text-transparent",
        cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        card: "bg-gradient-to-br from-blue-800/70 to-blue-950/70",
        cardDate: "text-yellow-300",
        cardDateBg: "bg-blue-500/20",
        cardIcon: "text-yellow-400",
        cardTitle: "text-white",
        cardTitleHover: "group-hover:text-yellow-300",
        cardIssuer: "text-yellow-300",
        cardDescription: "text-blue-100/80",
        cardLink: "text-yellow-400",
        modalOverlay: "bg-black/75",
        modalContainer: "bg-gradient-to-b from-blue-900 to-blue-950",
        modalBadge: "bg-blue-500/30 text-yellow-300",
        modalIconContainer: "bg-blue-500/20",
        modalTitle: "text-white",
        modalIssuer: "text-yellow-300",
        modalDate: "bg-blue-500/20 text-yellow-300",
        modalDescriptionBox: "bg-blue-950/50",
        modalDescriptionTitle: "text-yellow-400",
        modalDescriptionText: "text-blue-100",
        closeButton: "bg-blue-700 bg-opacity-50 hover:bg-opacity-70"
      }
  };
  
  // Helper function to get theme styles
  export const getHonorsAwardsThemeStyles = (theme: string): HonorsAwardsThemeStyles => {
    return honorsAwardsThemeMap[theme] || honorsAwardsThemeMap["Default"];
  };