// Define theme styles interface
export interface CausesThemeStyles {
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
    cardIconContainer: string;
    cardIcon: string;
    cardTitle: string;
    cardTitleHover: string;
    cardDescription: string;
    supportBox: string;
    supportTitle: string;
    supportText: string;
    actionButton: string;
    actionButtonHover: string;
    modalOverlay: string;
    modalContainer: string;
    modalIconContainer: string;
    modalIcon: string;
    modalTitle: string;
    modalSectionTitle: string;
    modalContentBox: string;
    modalContentText: string;
    modalCalloutText: string;
    modalCtaButton: string;
    modalCtaButtonHover: string;
    closeButton: string;
    closeButtonHover: string;
  }
  
  // Define theme-specific styles
  export const causesThemeMap: Record<string, CausesThemeStyles> = {
    "Gradient Theme": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950",
      decorativeElement1: "bg-indigo-500 opacity-10 blur-3xl",
      decorativeElement2: "bg-purple-500 opacity-10 blur-3xl",
      mainHeading: "bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent",
      mainDescription: "text-indigo-200",
      emptyContainer: "bg-indigo-800/50",
      emptyText: "text-indigo-200",
      cardContainer: "grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-indigo-800/70 to-indigo-950/70",
      cardIconContainer: "bg-indigo-500/20",
      cardIcon: "text-indigo-400",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-indigo-400",
      cardDescription: "text-indigo-200",
      supportBox: "bg-indigo-900/50",
      supportTitle: "text-indigo-300",
      supportText: "text-indigo-100",
      actionButton: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
      actionButtonHover: "hover:from-indigo-700 hover:to-purple-700",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-indigo-900 to-indigo-950",
      modalIconContainer: "bg-indigo-500/20",
      modalIcon: "text-indigo-400",
      modalTitle: "text-white",
      modalSectionTitle: "text-indigo-300",
      modalContentBox: "bg-indigo-950/50",
      modalContentText: "text-indigo-100",
      modalCalloutText: "text-indigo-200",
      modalCtaButton: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
      modalCtaButtonHover: "hover:from-indigo-700 hover:to-purple-700",
      closeButton: "bg-indigo-700 bg-opacity-50 text-white",
      closeButtonHover: "hover:bg-opacity-70"
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
      cardContainer: "grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-gray-800/70 to-gray-900/70",
      cardIconContainer: "bg-gray-500/20",
      cardIcon: "text-gray-400",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-gray-300",
      cardDescription: "text-gray-300",
      supportBox: "bg-gray-900/50",
      supportTitle: "text-gray-300",
      supportText: "text-gray-100",
      actionButton: "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
      actionButtonHover: "hover:from-gray-700 hover:to-gray-800",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-gray-900 to-gray-950",
      modalIconContainer: "bg-gray-500/20",
      modalIcon: "text-gray-400",
      modalTitle: "text-white",
      modalSectionTitle: "text-gray-300",
      modalContentBox: "bg-gray-950/50",
      modalContentText: "text-gray-100",
      modalCalloutText: "text-gray-300",
      modalCtaButton: "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
      modalCtaButtonHover: "hover:from-gray-700 hover:to-gray-800",
      closeButton: "bg-gray-700 bg-opacity-50 text-white",
      closeButtonHover: "hover:bg-opacity-70"
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
      cardContainer: "grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-blue-900/70 to-black/70",
      cardIconContainer: "bg-amber-500/20",
      cardIcon: "text-amber-400",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-amber-400",
      cardDescription: "text-blue-200",
      supportBox: "bg-blue-900/50",
      supportTitle: "text-amber-300",
      supportText: "text-blue-100",
      actionButton: "bg-gradient-to-r from-amber-600 to-blue-600 text-white",
      actionButtonHover: "hover:from-amber-700 hover:to-blue-700",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-blue-900 to-black",
      modalIconContainer: "bg-amber-500/20",
      modalIcon: "text-amber-400",
      modalTitle: "text-white",
      modalSectionTitle: "text-amber-300",
      modalContentBox: "bg-black/50",
      modalContentText: "text-blue-100",
      modalCalloutText: "text-blue-200",
      modalCtaButton: "bg-gradient-to-r from-amber-600 to-blue-600 text-white",
      modalCtaButtonHover: "hover:from-amber-700 hover:to-blue-700",
      closeButton: "bg-blue-900 bg-opacity-50 text-white",
      closeButtonHover: "hover:bg-opacity-70"
    },
    "Default": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950",
      decorativeElement1: "bg-green-500 opacity-10 blur-3xl",
      decorativeElement2: "bg-teal-500 opacity-10 blur-3xl",
      mainHeading: "bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent",
      mainDescription: "text-emerald-200",
      emptyContainer: "bg-emerald-800/50",
      emptyText: "text-emerald-200",
      cardContainer: "grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-emerald-800/70 to-emerald-950/70",
      cardIconContainer: "bg-green-500/20",
      cardIcon: "text-green-400",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-green-400",
      cardDescription: "text-emerald-200",
      supportBox: "bg-emerald-900/50",
      supportTitle: "text-emerald-300",
      supportText: "text-emerald-100",
      actionButton: "bg-gradient-to-r from-green-600 to-emerald-600 text-white",
      actionButtonHover: "hover:from-green-700 hover:to-emerald-700",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-emerald-900 to-emerald-950",
      modalIconContainer: "bg-green-500/20",
      modalIcon: "text-green-400",
      modalTitle: "text-white",
      modalSectionTitle: "text-green-300",
      modalContentBox: "bg-emerald-950/50",
      modalContentText: "text-emerald-100",
      modalCalloutText: "text-emerald-200",
      modalCtaButton: "bg-gradient-to-r from-green-600 to-emerald-600 text-white",
      modalCtaButtonHover: "hover:from-green-700 hover:to-emerald-700",
      closeButton: "bg-emerald-700 bg-opacity-50 text-white",
      closeButtonHover: "hover:bg-opacity-70"
    }
  };
  
  // Helper function to get theme styles
  export const getCausesThemeStyles = (theme: string): CausesThemeStyles => {
    return causesThemeMap[theme] || causesThemeMap["Default"];
  };