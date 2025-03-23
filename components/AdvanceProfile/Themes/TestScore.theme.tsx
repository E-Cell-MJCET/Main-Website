// Define theme styles interface
export interface TestScoreThemeStyles {
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
    scoreLabel: string;
    scoreValue: string;
    scoreValueBg: string;
    descriptionBox: string;
    descriptionText: string;
  }
  
  // Define theme-specific styles
  export const testScoreThemeMap: Record<string, TestScoreThemeStyles> = {
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
      cardTitleHover: "group-hover:text-indigo-300",
      cardIcon: "text-indigo-400",
      scoreLabel: "text-indigo-300",
      scoreValue: "text-white",
      scoreValueBg: "bg-indigo-500/20",
      descriptionBox: "bg-indigo-950/50",
      descriptionText: "text-indigo-100/80"
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
      scoreLabel: "text-gray-300",
      scoreValue: "text-white",
      scoreValueBg: "bg-gray-500/20",
      descriptionBox: "bg-gray-950/50",
      descriptionText: "text-gray-300/80"
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
      cardTitleHover: "group-hover:text-blue-300",
      cardIcon: "text-amber-400",
      scoreLabel: "text-amber-300",
      scoreValue: "text-white",
      scoreValueBg: "bg-blue-500/20",
      descriptionBox: "bg-black/50",
      descriptionText: "text-blue-100/80"
    },
    "Default": {
      container: "relative py-16",
      backgroundGradient: "bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950",
      decorativeElement1: "bg-blue-500 opacity-10 blur-3xl",
      decorativeElement2: "bg-yellow-500 opacity-10 blur-3xl",
      mainHeading: "bg-gradient-to-r from-blue-400 to-yellow-300 bg-clip-text text-transparent",
      mainDescription: "text-blue-200",
      emptyContainer: "bg-blue-800/50",
      emptyText: "text-blue-200",
      cardContainer: "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-blue-800/70 to-blue-950/70",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-yellow-300",
      cardIcon: "text-yellow-400",
      scoreLabel: "text-yellow-300",
      scoreValue: "text-white",
      scoreValueBg: "bg-blue-500/20",
      descriptionBox: "bg-blue-950/50",
      descriptionText: "text-blue-100/80"
    }
  };
  
  // Helper function to get theme styles
  export const getTestScoreThemeStyles = (theme: string): TestScoreThemeStyles => {
    return testScoreThemeMap[theme] || testScoreThemeMap["Default"];
  };