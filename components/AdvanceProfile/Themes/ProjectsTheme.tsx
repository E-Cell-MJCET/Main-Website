// Define theme information types for Projects component
export interface ProjectsThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    projectCard: {
        background: string;
        title: string;
        description: string;
        badge: string;
    };
}

// Define theme-specific styles with explicit values
export const projectsThemeMap: Record<string, ProjectsThemeStyles> = {
    "Gradient Theme": {
        container: "relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-16",
        backgroundGlow1: "absolute left-1/4 top-40 size-64 rounded-full bg-purple-600 opacity-10 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-60 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
        heading: "mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl",
        description: "mx-auto max-w-2xl text-gray-400",
        projectCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-purple-600 text-white"
        }
    },
    "Monochromatic Theme": {
        container: "relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16",
        backgroundGlow1: "absolute left-1/4 top-40 size-64 rounded-full bg-white opacity-5 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-60 size-80 rounded-full bg-white opacity-5 blur-3xl",
        heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
        description: "mx-auto max-w-2xl text-gray-400",
        projectCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-gray-600 text-white"
        }
    },
    "Dark Theme with accent colors": {
        container: "relative min-h-screen bg-black py-16",
        backgroundGlow1: "absolute left-1/4 top-40 size-64 rounded-full bg-blue-600 opacity-10 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-60 size-80 rounded-full bg-amber-500 opacity-10 blur-3xl",
        heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
        description: "mx-auto max-w-2xl text-amber-200",
        projectCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-blue-600 text-white"
        }
    },
    "Default": {
        container: "relative min-h-screen bg-gradient-to-br from-black to-gray-900 py-16",
        backgroundGlow1: "absolute left-1/4 top-40 size-64 rounded-full bg-teal-500 opacity-5 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-60 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl",
        heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
        description: "mx-auto max-w-2xl text-gray-400",
        projectCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-teal-600 text-white"
        }
    }
};