// Define theme information types
export interface ThemeStyles {
    container: string;
    headingText: string;
    taglineText: string;
    locationText: string;
    memberTypeBadge: string;
    portfolioBadge: string;
    contactButton: string;
    downloadButton: string;
    downloadButtonHover: string;
    socialIcons: string;
    socialIconsHover: string;
    gradientText: string;
    gradientAnimation: string;
    imageCardBorder: string;
    imageCardBackground: string;
    imageShadow: string;
    locationOverlay: string;
  }
  
  // Define theme-specific styles with explicit values (no CSS variables)
  export const themeStyleMap: Record<string, ThemeStyles> = {
    "Gradient Theme": {
      container: "flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-6 text-white md:flex-row md:items-center md:justify-between",
      headingText: "text-3xl font-bold md:text-4xl text-white",
      taglineText: "text-lg text-purple-200",
      locationText: "text-sm font-medium text-pink-200",
      memberTypeBadge: "inline-flex items-center justify-center rounded-full border-2 border-purple-300 px-3 py-1 text-sm font-medium text-purple-200",
      portfolioBadge: "inline-flex items-center justify-center rounded-full border-2 border-pink-400 bg-pink-900/20 px-3 py-1 text-sm font-medium text-pink-200",
      contactButton: "mt-4 rounded-md px-4 py-2 text-pink-300 hover:bg-indigo-900 hover:text-white",
      downloadButton: "flex min-w-[150px] items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-white",
      downloadButtonHover: "hover:from-indigo-700 hover:to-purple-700",
      socialIcons: "text-purple-300",
      socialIconsHover: "hover:text-pink-400",
      gradientText: "block bg-gradient-to-r from-pink-400 to-indigo-300 bg-clip-text text-transparent",
      gradientAnimation: "from-pink-400 via-purple-400 to-indigo-300",
      imageCardBorder: "absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 opacity-50",
      imageCardBackground: "relative aspect-square w-full overflow-hidden rounded-3xl border border-purple-500/20 backdrop-blur-sm",
      imageShadow: "shadow-lg shadow-purple-500/20",
      locationOverlay: "absolute bottom-8 left-8"
    },
    "Monochromatic Theme": {
      container: "flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white md:flex-row md:items-center md:justify-between",
      headingText: "text-3xl font-bold md:text-4xl text-white",
      taglineText: "text-lg text-gray-300",
      locationText: "text-sm font-medium text-gray-400",
      memberTypeBadge: "inline-flex items-center justify-center rounded-full border-2 border-gray-500 px-3 py-1 text-sm font-medium text-gray-300",
      portfolioBadge: "inline-flex items-center justify-center rounded-full border-2 border-gray-600 bg-gray-800/40 px-3 py-1 text-sm font-medium text-gray-300",
      contactButton: "mt-4 rounded-md px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white",
      downloadButton: "flex min-w-[150px] items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-white",
      downloadButtonHover: "hover:bg-gray-600",
      socialIcons: "text-gray-400",
      socialIconsHover: "hover:text-white",
      gradientText: "block bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent",
      gradientAnimation: "from-gray-300 via-white to-gray-400",
      imageCardBorder: "absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-600/30 to-gray-700/30 opacity-50",
      imageCardBackground: "relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-600/20 backdrop-blur-sm",
      imageShadow: "shadow-lg shadow-gray-900/40",
      locationOverlay: "absolute bottom-8 left-8"
    },
    "Dark Theme with accent colors": {
      container: "flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-black p-6 text-white md:flex-row md:items-center md:justify-between",
      headingText: "text-3xl font-bold md:text-4xl text-white",
      taglineText: "text-lg text-amber-300",
      locationText: "text-sm font-medium text-blue-400",
      memberTypeBadge: "inline-flex items-center justify-center rounded-full border-2 border-blue-500 px-3 py-1 text-sm font-medium text-blue-300",
      portfolioBadge: "inline-flex items-center justify-center rounded-full border-2 border-amber-500 bg-amber-900/20 px-3 py-1 text-sm font-medium text-amber-300",
      contactButton: "mt-4 rounded-md px-4 py-2 text-blue-400 hover:bg-blue-900/30 hover:text-white",
      downloadButton: "flex min-w-[150px] items-center justify-center rounded-md bg-amber-600 px-4 py-2 text-white",
      downloadButtonHover: "hover:bg-amber-700",
      socialIcons: "text-blue-400",
      socialIconsHover: "hover:text-amber-400",
      gradientText: "block bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent",
      gradientAnimation: "from-blue-400 via-amber-300 to-blue-400",
      imageCardBorder: "absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/30 to-amber-600/30 opacity-50",
      imageCardBackground: "relative aspect-square w-full overflow-hidden rounded-3xl border border-blue-500/20 backdrop-blur-sm",
      imageShadow: "shadow-lg shadow-blue-900/30",
      locationOverlay: "absolute bottom-8 left-8"
    },
    "Default": {
      container: "flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-r from-black to-teal-900 p-6 text-white md:flex-row md:items-center md:justify-between",
      headingText: "text-3xl font-bold md:text-4xl text-white",
      taglineText: "text-lg text-gray-300",
      locationText: "text-sm font-medium text-gray-400",
      memberTypeBadge: "inline-flex items-center justify-center rounded-full border-2 border-gray-300 px-3 py-1 text-sm font-medium text-gray-300",
      portfolioBadge: "inline-flex items-center justify-center rounded-full border-2 border-blue-400 bg-blue-900/20 px-3 py-1 text-sm font-medium text-blue-300",
      contactButton: "mt-4 rounded-md px-4 py-2 text-blue-500 hover:bg-black hover:text-white",
      downloadButton: "flex min-w-[150px] items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white",
      downloadButtonHover: "hover:bg-blue-600",
      socialIcons: "text-gray-400",
      socialIconsHover: "hover:text-blue-500",
      gradientText: "block bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent",
      gradientAnimation: "from-teal-400 via-blue-400 to-teal-400",
      imageCardBorder: "absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-500/30 via-blue-500/30 to-teal-500/30 opacity-50",
      imageCardBackground: "relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 backdrop-blur-sm",
      imageShadow: "shadow-lg shadow-teal-900/30",
      locationOverlay: "absolute bottom-8 left-8"
    }
  };
  
  // Helper function to get theme styles
  export const getThemeStyles = (theme: string): ThemeStyles => {
    return themeStyleMap[theme] || themeStyleMap["Default"];
  };