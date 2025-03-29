// Define theme styles interface
export interface ServicesThemeStyles {
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
    priceBadge: string;
    priceBadgeText: string;
    cardDescription: string;
    detailsButton: string;
    detailsButtonHover: string;
    modalOverlay: string;
    modalContainer: string;
    modalIconContainer: string;
    modalIcon: string;
    modalTitle: string;
    modalPriceBadge: string;
    modalPriceText: string;
    modalSectionTitle: string;
    modalDescription: string;
    modalSpecialtiesBox: string;
    modalSpecialties: string;
    modalInquireButton: string;
    modalInquireButtonHover: string;
    closeButton: string;
    closeButtonHover: string;
  }
  
  // Define theme-specific styles
  export const servicesThemeMap: Record<string, ServicesThemeStyles> = {
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
      cardIconContainer: "bg-gradient-to-r from-indigo-700/30 to-purple-700/30",
      cardIcon: "text-indigo-300",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-purple-300",
      priceBadge: "bg-purple-500/20",
      priceBadgeText: "text-purple-300",
      cardDescription: "text-indigo-200",
      detailsButton: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
      detailsButtonHover: "hover:from-indigo-700 hover:to-purple-700",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-indigo-900 to-indigo-950",
      modalIconContainer: "bg-purple-500/20",
      modalIcon: "text-purple-400",
      modalTitle: "text-white",
      modalPriceBadge: "bg-gradient-to-r from-indigo-500 to-purple-500",
      modalPriceText: "text-white",
      modalSectionTitle: "text-purple-300",
      modalDescription: "text-indigo-100",
      modalSpecialtiesBox: "bg-indigo-950/50",
      modalSpecialties: "text-indigo-100",
      modalInquireButton: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
      modalInquireButtonHover: "hover:from-indigo-700 hover:to-purple-700",
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
      cardIconContainer: "bg-gradient-to-r from-gray-700/30 to-gray-700/30",
      cardIcon: "text-gray-300",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-gray-300",
      priceBadge: "bg-gray-500/20",
      priceBadgeText: "text-gray-300",
      cardDescription: "text-gray-300",
      detailsButton: "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
      detailsButtonHover: "hover:from-gray-700 hover:to-gray-800",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-gray-900 to-gray-950",
      modalIconContainer: "bg-gray-500/20",
      modalIcon: "text-gray-400",
      modalTitle: "text-white",
      modalPriceBadge: "bg-gradient-to-r from-gray-500 to-gray-600",
      modalPriceText: "text-white",
      modalSectionTitle: "text-gray-300",
      modalDescription: "text-gray-100",
      modalSpecialtiesBox: "bg-gray-950/50",
      modalSpecialties: "text-gray-100",
      modalInquireButton: "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
      modalInquireButtonHover: "hover:from-gray-700 hover:to-gray-800",
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
      cardIconContainer: "bg-gradient-to-r from-blue-900/30 to-black/30",
      cardIcon: "text-amber-300",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-amber-300",
      priceBadge: "bg-amber-500/20",
      priceBadgeText: "text-amber-300",
      cardDescription: "text-blue-200",
      detailsButton: "bg-gradient-to-r from-amber-600 to-blue-600 text-white",
      detailsButtonHover: "hover:from-amber-700 hover:to-blue-700",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-blue-900 to-black",
      modalIconContainer: "bg-amber-500/20",
      modalIcon: "text-amber-400",
      modalTitle: "text-white",
      modalPriceBadge: "bg-gradient-to-r from-amber-500 to-blue-500",
      modalPriceText: "text-white",
      modalSectionTitle: "text-amber-300",
      modalDescription: "text-blue-100",
      modalSpecialtiesBox: "bg-black/50",
      modalSpecialties: "text-blue-100",
      modalInquireButton: "bg-gradient-to-r from-amber-600 to-blue-600 text-white",
      modalInquireButtonHover: "hover:from-amber-700 hover:to-blue-700",
      closeButton: "bg-blue-900 bg-opacity-50 text-white",
      closeButtonHover: "hover:bg-opacity-70"
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
      cardContainer: "grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
      card: "bg-gradient-to-br from-slate-800/70 to-indigo-950/70 backdrop-blur-sm border border-indigo-500/10 transition-all duration-300",
      cardIconContainer: "bg-gradient-to-r from-indigo-700/30 to-amber-700/30",
      cardIcon: "text-amber-300",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-amber-300",
      priceBadge: "bg-indigo-500/20",
      priceBadgeText: "text-amber-300",
      cardDescription: "text-slate-300",
      detailsButton: "bg-gradient-to-r from-indigo-600 to-amber-600 text-white transition-all duration-300",
      detailsButtonHover: "hover:from-indigo-700 hover:to-amber-700",
      modalOverlay: "bg-slate-950 bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-slate-900 to-indigo-950 border border-amber-500/10",
      modalIconContainer: "bg-indigo-500/20",
      modalIcon: "text-amber-400",
      modalTitle: "text-white",
      modalPriceBadge: "bg-gradient-to-r from-indigo-500 to-amber-500",
      modalPriceText: "text-white",
      modalSectionTitle: "text-amber-300",
      modalDescription: "text-slate-300",
      modalSpecialtiesBox: "bg-slate-950/50 border border-indigo-500/10",
      modalSpecialties: "text-slate-300",
      modalInquireButton: "bg-gradient-to-r from-indigo-600 to-amber-600 text-white transition-all duration-300",
      modalInquireButtonHover: "hover:from-indigo-700 hover:to-amber-700",
      closeButton: "bg-indigo-700 bg-opacity-50 text-white transition-all duration-300",
      closeButtonHover: "hover:bg-opacity-70"
    }
  };
  
  // Helper function to get theme styles
  export const getServicesThemeStyles = (theme: string): ServicesThemeStyles => {
    return servicesThemeMap[theme] || servicesThemeMap["Default"];
  };