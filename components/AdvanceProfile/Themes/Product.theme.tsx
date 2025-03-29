// Define theme styles interface
export interface ProductThemeStyles {
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
    cardImageOverlay: string;
    cardPlaceholderBg: string;
    cardPlaceholderIcon: string;
    cardPriceTag: string;
    cardPriceText: string;
    cardTitle: string;
    cardTitleHover: string;
    cardDescription: string;
    detailsButton: string;
    detailsButtonHover: string;
    purchaseButton: string;
    purchaseButtonHover: string;
    modalOverlay: string;
    modalContainer: string;
    modalPlaceholderBg: string;
    modalPlaceholderIcon: string;
    modalTitle: string;
    modalPrice: string;
    modalPriceText: string;
    modalSectionTitle: string;
    modalDescription: string;
    modalFeaturesBox: string;
    modalFeatures: string;
    modalPurchaseButton: string;
    modalPurchaseButtonHover: string;
    closeButton: string;
    closeButtonHover: string;
  }
  
  // Define theme-specific styles
  export const productThemeMap: Record<string, ProductThemeStyles> = {
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
      cardImageOverlay: "bg-gradient-to-t from-indigo-900 to-transparent",
      cardPlaceholderBg: "bg-gradient-to-r from-indigo-700 to-purple-800",
      cardPlaceholderIcon: "text-indigo-300",
      cardPriceTag: "bg-white",
      cardPriceText: "text-indigo-900",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-purple-300",
      cardDescription: "text-indigo-200",
      detailsButton: "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40",
      detailsButtonHover: "hover:bg-indigo-600/40",
      purchaseButton: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
      purchaseButtonHover: "hover:from-indigo-700 hover:to-purple-700",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-indigo-900 to-indigo-950",
      modalPlaceholderBg: "bg-gradient-to-r from-indigo-700 to-indigo-900",
      modalPlaceholderIcon: "text-indigo-300",
      modalTitle: "text-white",
      modalPrice: "bg-white",
      modalPriceText: "text-indigo-900",
      modalSectionTitle: "text-indigo-300",
      modalDescription: "text-indigo-100",
      modalFeaturesBox: "bg-indigo-950/50",
      modalFeatures: "text-indigo-100",
      modalPurchaseButton: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
      modalPurchaseButtonHover: "hover:from-indigo-700 hover:to-purple-700",
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
      cardImageOverlay: "bg-gradient-to-t from-gray-900 to-transparent",
      cardPlaceholderBg: "bg-gradient-to-r from-gray-700 to-gray-800",
      cardPlaceholderIcon: "text-gray-300",
      cardPriceTag: "bg-white",
      cardPriceText: "text-gray-900",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-gray-300",
      cardDescription: "text-gray-300",
      detailsButton: "bg-gray-600/20 text-gray-300 hover:bg-gray-600/40",
      detailsButtonHover: "hover:bg-gray-600/40",
      purchaseButton: "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
      purchaseButtonHover: "hover:from-gray-700 hover:to-gray-800",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-gray-900 to-gray-950",
      modalPlaceholderBg: "bg-gradient-to-r from-gray-700 to-gray-900",
      modalPlaceholderIcon: "text-gray-300",
      modalTitle: "text-white",
      modalPrice: "bg-white",
      modalPriceText: "text-gray-900",
      modalSectionTitle: "text-gray-300",
      modalDescription: "text-gray-100",
      modalFeaturesBox: "bg-gray-950/50",
      modalFeatures: "text-gray-100",
      modalPurchaseButton: "bg-gradient-to-r from-gray-600 to-gray-700 text-white",
      modalPurchaseButtonHover: "hover:from-gray-700 hover:to-gray-800",
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
      cardImageOverlay: "bg-gradient-to-t from-black to-transparent",
      cardPlaceholderBg: "bg-gradient-to-r from-blue-900 to-black",
      cardPlaceholderIcon: "text-blue-300",
      cardPriceTag: "bg-amber-400",
      cardPriceText: "text-black",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-amber-300",
      cardDescription: "text-blue-200",
      detailsButton: "bg-blue-600/20 text-blue-300 hover:bg-blue-600/40",
      detailsButtonHover: "hover:bg-blue-600/40",
      purchaseButton: "bg-gradient-to-r from-amber-500 to-amber-600 text-black",
      purchaseButtonHover: "hover:from-amber-600 hover:to-amber-700",
      modalOverlay: "bg-black bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-blue-900 to-black",
      modalPlaceholderBg: "bg-gradient-to-r from-blue-900 to-black",
      modalPlaceholderIcon: "text-blue-300",
      modalTitle: "text-white",
      modalPrice: "bg-amber-400",
      modalPriceText: "text-black",
      modalSectionTitle: "text-amber-300",
      modalDescription: "text-blue-100",
      modalFeaturesBox: "bg-black/50",
      modalFeatures: "text-blue-100",
      modalPurchaseButton: "bg-gradient-to-r from-amber-500 to-amber-600 text-black",
      modalPurchaseButtonHover: "hover:from-amber-600 hover:to-amber-700",
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
      cardImageOverlay: "bg-gradient-to-t from-slate-900 to-transparent",
      cardPlaceholderBg: "bg-gradient-to-r from-slate-800 to-indigo-900",
      cardPlaceholderIcon: "text-indigo-300",
      cardPriceTag: "bg-amber-300",
      cardPriceText: "text-slate-900",
      cardTitle: "text-white",
      cardTitleHover: "group-hover:text-amber-300",
      cardDescription: "text-slate-300",
      detailsButton: "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 transition-colors duration-300",
      detailsButtonHover: "hover:bg-indigo-600/40",
      purchaseButton: "bg-gradient-to-r from-indigo-600 to-amber-600 text-white transition-all duration-300",
      purchaseButtonHover: "hover:from-indigo-700 hover:to-amber-700",
      modalOverlay: "bg-slate-950 bg-opacity-75 backdrop-blur-sm",
      modalContainer: "bg-gradient-to-b from-slate-900 to-indigo-950 border border-amber-500/10",
      modalPlaceholderBg: "bg-gradient-to-r from-slate-800 to-indigo-900",
      modalPlaceholderIcon: "text-indigo-300",
      modalTitle: "text-white",
      modalPrice: "bg-amber-300",
      modalPriceText: "text-slate-900",
      modalSectionTitle: "text-amber-300",
      modalDescription: "text-slate-300",
      modalFeaturesBox: "bg-slate-950/50 border border-indigo-500/10",
      modalFeatures: "text-slate-300",
      modalPurchaseButton: "bg-gradient-to-r from-indigo-600 to-amber-600 text-white transition-all duration-300",
      modalPurchaseButtonHover: "hover:from-indigo-700 hover:to-amber-700",
      closeButton: "bg-indigo-700 bg-opacity-50 text-white transition-all duration-300",
      closeButtonHover: "hover:bg-opacity-70"
    }
  };
  
  // Helper function to get theme styles
  export const getProductThemeStyles = (theme: string): ProductThemeStyles => {
    return productThemeMap[theme] || productThemeMap["Default"];
  };