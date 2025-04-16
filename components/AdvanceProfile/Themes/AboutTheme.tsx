// Define theme information types for About component
export interface AboutThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    title: {
      primary: string;
      secondary: string;
    };
    contentWrapper: string;
    quoteMarks: string;
    textContent: string;
  }
  
  // Define theme-specific styles with explicit values
  export const aboutThemeMap: Record<string, AboutThemeStyles> = {
    "Gradient Theme": {
      container: "relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-5",
      backgroundGlow1: "absolute -left-16 -top-16 size-64 rounded-full bg-pink-500 opacity-20 blur-3xl",
      backgroundGlow2: "absolute right-10 top-20 size-48 rounded-full bg-indigo-400 opacity-25 blur-3xl",
      title: {
        primary: "text-pink-400 text-2xl font-bold",
        secondary: "text-purple-200 text-2xl"
      },
      contentWrapper: "relative rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-8 shadow-xl backdrop-blur-md border border-pink-500/20",
      quoteMarks: "absolute font-serif text-6xl text-pink-400 opacity-20",
      textContent: "relative z-10 text-lg leading-relaxed text-purple-100"
    },
    "Monochromatic Theme": {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-5",
      backgroundGlow1: "absolute -left-16 -top-16 size-64 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-10 top-20 size-48 rounded-full bg-gray-400 opacity-10 blur-3xl",
      title: {
        primary: "text-white text-2xl font-bold",
        secondary: "text-gray-400 text-2xl"
      },
      contentWrapper: "relative rounded-xl bg-gray-800/60 p-8 shadow-xl backdrop-blur-md border border-gray-600/30",
      quoteMarks: "absolute font-serif text-6xl text-gray-500 opacity-20",
      textContent: "relative z-10 text-lg leading-relaxed text-gray-300"
    },
    "Dark Theme with accent colors": {
      container: "relative overflow-hidden bg-black py-5",
      backgroundGlow1: "absolute -left-16 -top-16 size-64 rounded-full bg-blue-600 opacity-15 blur-3xl",
      backgroundGlow2: "absolute right-10 top-20 size-48 rounded-full bg-amber-500 opacity-15 blur-3xl",
      title: {
        primary: "text-blue-400 text-2xl font-bold",
        secondary: "text-amber-300 text-2xl"
      },
      contentWrapper: "relative rounded-xl bg-black/70 p-8 shadow-xl backdrop-blur-md border border-blue-500/20",
      quoteMarks: "absolute font-serif text-6xl text-amber-500 opacity-20",
      textContent: "relative z-10 text-lg leading-relaxed text-blue-100"
    },
    "Default": {
      container: "relative overflow-hidden bg-gradient-to-br from-black via-emerald-110 to-indigo-950 py-5",
      backgroundGlow1: "absolute -left-16 -top-16 size-64 rounded-full bg-emerald-400 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-10 top-20 size-48 rounded-full bg-indigo-600 opacity-15 blur-3xl",
      title: {
        primary: "text-emerald-300 text-2xl font-bold",
        secondary: "text-gray-200 text-2xl"
      },
      contentWrapper: "relative rounded-xl bg-slate-900/60 p-8 shadow-xl backdrop-blur-md border border-emerald-500/20 transition-colors",
      quoteMarks: "absolute font-serif text-6xl text-emerald-400 opacity-20",
      textContent: "relative z-10 text-lg leading-relaxed text-gray-200"
    }
      };
  
  // Helper function to get theme styles
  export const getAboutThemeStyles = (theme: string): AboutThemeStyles => {
    return aboutThemeMap[theme] || aboutThemeMap["Default"];
  };