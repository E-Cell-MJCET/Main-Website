// Theme information data

// Define theme information types
type ThemeInfoData = {
    description: string;
    idealFor: string;
    colorCombinations: string;
  };
  
type ThemeInfoMap = {
    [key: string]: ThemeInfoData;
  };

const themeInfo: ThemeInfoMap = {
    "Gradient Theme": {
      description: "Gradients offer a modern, smooth, and dynamic visual experience that captivates the user. They create a sense of depth and motion that makes the website feel alive. The use of smooth color transitions adds a polished and high-end look. Plus, the variety of gradients (like sunset, ocean, or pink-purple) gives you flexibility to align the design with your personal style or industry.",
      idealFor: "Developers, UI/UX designers, digital artists, and anyone who wants a contemporary, sophisticated, and visually stimulating website.",
      colorCombinations: "Pink to Purple to Blue: A futuristic or tech-inspired gradient."
    },
    "Monochromatic Theme": {
      description: "A monochromatic theme creates a sleek, cohesive, and sophisticated look by using varying shades of a single color. This theme's simplicity can be incredibly elegant while still feeling dynamic through different shades, gradients, and textures. It's subtle, minimalist, and ensures that the content (your work) remains the primary focus, making it ideal for professional portfolios.",
      idealFor: "Designers, photographers, architects, and professionals who prefer a clean, refined aesthetic without overwhelming the viewer with too many colors.",
      colorCombinations: "Grayscale: Using different shades of gray and black for a minimalist, timeless look."
    },
    "Dark Theme with accent colors": {
      description: "A dark theme provides a dramatic and contemporary backdrop that allows accent colors to pop, creating a striking contrast. This theme brings focus to key design elements, such as buttons, headings, and portfolio items. The combination of dark tones with bright accent colors adds vibrancy and energy, making the website feel cutting-edge and sophisticated.",
      idealFor: "Tech professionals, digital artists, creative developers, and anyone who wants to showcase a modern, sleek, and high-tech aesthetic.",
      colorCombinations: "Dark Navy with Gold or Silver Accents: Adds a luxurious, high-end appeal."
    },
    "Default": {
      description: "Ethereal Essence is a sleek and modern theme that emphasizes clarity, elegance, and a sophisticated visual experience. Its design evokes professionalism and intellect while remaining captivating and unique.",
      idealFor: "Developers, UI/UX designers, and professionals who value a polished, high-end aesthetic combined with functionality and visual appeal.",
      colorCombinations: "Deep Sapphire to Soft Gold, Charcoal to Velvet Crimson, Emerald Green to Misty Silver"
    }
  };

export default themeInfo;