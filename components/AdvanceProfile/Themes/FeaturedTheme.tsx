// Define theme information types
export interface FeaturedThemeStyles {
    container: string;
    backgroundGradient: string;
    decorativeElement: string;
    heading: string;
    description: string;
    emptyStateContainer: string;
    emptyStateText: string;
    cardContainer: string;
    card: string;
    cardTitle: string;
    cardDescription: string;
    cardLink: string;
    cardLinkHover: string;
  }
  
  // Define theme-specific styles
  export const featuredThemeMap: Record<string, FeaturedThemeStyles> = {
    "Gradient Theme": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950",
      decorativeElement: "bg-gradient-to-r from-indigo-500 to-purple-500 opacity-10",
      heading: "bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent",
      description: "text-gray-300",
      emptyStateContainer: "bg-indigo-900/50",
      emptyStateText: "text-gray-400",
      cardContainer: "grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
      card: "bg-white/10 hover:bg-white/20",
      cardTitle: "text-white group-hover:text-indigo-300",
      cardDescription: "text-gray-300",
      cardLink: "text-indigo-300",
      cardLinkHover: "hover:text-pink-300"
    },
    "Monochromatic Theme": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900",
      decorativeElement: "bg-gray-500 opacity-10",
      heading: "bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent",
      description: "text-gray-400",
      emptyStateContainer: "bg-gray-800/50",
      emptyStateText: "text-gray-500",
      cardContainer: "grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
      card: "bg-gray-800/20 hover:bg-gray-700/30",
      cardTitle: "text-gray-200 group-hover:text-white",
      cardDescription: "text-gray-400",
      cardLink: "text-gray-300",
      cardLinkHover: "hover:text-white"
    },
    "Dark Theme with accent colors": {
      container: "relative py-16",
      backgroundGradient: "bg-black",
      decorativeElement: "bg-blue-500 opacity-10",
      heading: "bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent",
      description: "text-blue-300",
      emptyStateContainer: "bg-blue-900/20",
      emptyStateText: "text-blue-300",
      cardContainer: "grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
      card: "bg-blue-900/10 hover:bg-blue-800/20",
      cardTitle: "text-amber-300 group-hover:text-amber-400",
      cardDescription: "text-blue-300",
      cardLink: "text-amber-400",
      cardLinkHover: "hover:text-blue-300"
    },
    "Default": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-black via-teal-900 to-black",
      decorativeElement: "bg-teal-500 opacity-10",
      heading: "bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent",
      description: "text-gray-300",
      emptyStateContainer: "bg-teal-900/30",
      emptyStateText: "text-gray-400",
      cardContainer: "grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
      card: "bg-white/5 hover:bg-white/10",
      cardTitle: "text-teal-200 group-hover:text-teal-300",
      cardDescription: "text-gray-300",
      cardLink: "text-blue-400",
      cardLinkHover: "hover:text-teal-300"
    }
  };
  
  // Helper function to get theme styles
  export const getFeaturedThemeStyles = (theme: string): FeaturedThemeStyles => {
    return featuredThemeMap[theme] || featuredThemeMap["Default"];
  };