// Define theme information types for LicencesCertifications component
export interface LicencesCertificationsThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    tabButton: {
        active: string;
        inactive: string;
    };
    credentialCard: {
        background: string;
        title: string;
        description: string;
        badge: string;
    };
}

// Define theme-specific styles with explicit values
export const licencesCertificationsThemeMap: Record<string, LicencesCertificationsThemeStyles> = {
    "Gradient Theme": {
        container: "relative bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 py-16",
        backgroundGlow1: "absolute left-1/4 top-20 size-64 rounded-full bg-green-500 opacity-5 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl",
        heading: "mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl",
        description: "mx-auto max-w-2xl text-gray-400",
        tabButton: {
            active: "text-white",
            inactive: "text-gray-400 hover:text-white"
        },
        credentialCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-blue-600 text-white"
        }
    },
    "Monochromatic Theme": {
        container: "relative bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 py-16",
        backgroundGlow1: "absolute left-1/4 top-20 size-64 rounded-full bg-white opacity-5 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
        heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
        description: "mx-auto max-w-2xl text-gray-400",
        tabButton: {
            active: "text-white",
            inactive: "text-gray-400 hover:text-white"
        },
        credentialCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-gray-600 text-white"
        }
    },
    "Dark Theme with accent colors": {
        container: "relative bg-black py-16",
        backgroundGlow1: "absolute left-1/4 top-20 size-64 rounded-full bg-blue-600 opacity-10 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-40 size-80 rounded-full bg-amber-500 opacity-10 blur-3xl",
        heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
        description: "mx-auto max-w-2xl text-amber-200",
        tabButton: {
            active: "text-white",
            inactive: "text-gray-400 hover:text-white"
        },
        credentialCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-blue-600 text-white"
        }
    },
    // Add other themes as needed...
    "Default": {
        container: "relative bg-gradient-to-b from-black via-gray-900 to-teal-950 py-16",
        backgroundGlow1: "absolute left-1/4 top-20 size-64 rounded-full bg-teal-500 opacity-5 blur-3xl",
        backgroundGlow2: "absolute right-1/4 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl",
        heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
        description: "mx-auto max-w-2xl text-gray-400",
        tabButton: {
            active: "text-white",
            inactive: "text-gray-400 hover:text-white"
        },
        credentialCard: {
            background: "bg-gray-800",
            title: "mb-2 text-lg font-semibold text-white",
            description: "line-clamp-2 text-sm text-gray-400",
            badge: "bg-teal-600 text-white"
        }
    }
};