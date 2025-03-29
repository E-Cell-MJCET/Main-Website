// Theme.tsx - Central theme management for all UI components

// ==================== HEADER THEME ====================
export interface HeaderThemeStyles {
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
  
  // ==================== ABOUT THEME ====================
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
  
  // ==================== SKILLS THEME ====================
  export interface SkillsThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    backgroundGlow3: string;
    heading: string;
    description: string;
    categoryButtons: {
      active: string;
      inactive: string;
    };
    searchInput: string;
    viewToggle: {
      container: string;
      active: string;
      inactive: string;
    };
    skillCard: {
      container: string;
      title: string;
      categoryBadge: string;
      proficiencyText: string;
      yearsText: string;
      progressBackground: string;
    };
    modal: {
      overlay: string;
      container: string;
      header: string;
      title: string;
      closeButton: string;
      input: string;
      categoryButtonsActive: string;
      categoryButtonsInactive: string;
    };
    proficiencyColors: {
      beginner: string;
      intermediate: string;
      advanced: string;
      expert: string;
    };
  }
  
  // ==================== EXPERIENCE THEME ====================
  export interface ExperienceThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    timeline: {
      line: string;
      dot: {
        outer: string;
        inner: string;
      }
    };
    card: {
      container: string;
      title: string;
      company: string;
      duration: string;
      description: string;
      location: string;
      skills: string;
    };
  }
  
  // ==================== EDUCATION THEME ====================
  export interface EducationThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    card: {
      container: string;
      header: string;
      school: string;
      degree: string;
      duration: string;
      description: string;
      location: string;
    };
  }
  
  // ==================== PROJECTS THEME ====================
  export interface ProjectsThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    card: {
      container: string;
      image: string;
      title: string;
      description: string;
      tags: string;
      button: string;
    };
    modal: {
      overlay: string;
      container: string;
      header: string;
      content: string;
      closeButton: string;
    };
  }
  
  // ==================== CERTIFICATIONS THEME ====================
  export interface CertificationsThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    card: {
      container: string;
      image: string;
      title: string;
      issuer: string;
      date: string;
      viewButton: string;
    };
  }
  
  // ==================== CAUSES THEME ====================
  export interface CausesThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    card: {
      container: string;
      title: string;
      description: string;
      supportText: string;
      button: string;
    };
    modal: {
      overlay: string;
      container: string;
      header: string;
      content: string;
      supportInfo: string;
      actionButton: string;
      closeButton: string;
    };
  }
  
  // ==================== VOLUNTEER THEME ====================
  export interface VolunteerThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    card: {
      container: string;
      title: string;
      description: string;
      button: string;
    };
  }
  
  // ==================== SERVICES THEME ====================
  export interface ServicesThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    card: {
      container: string;
      title: string;
      description: string;
      specialties: string;
      pricing: string;
      button: string;
    };
    modal: {
      overlay: string;
      container: string;
      header: string;
      content: string;
      pricingSection: string;
      actionButton: string;
      closeButton: string;
    };
  }
  
  // ==================== PRODUCTS THEME ====================
  export interface ProductsThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    card: {
      container: string;
      image: string;
      title: string;
      description: string;
      price: string;
      button: string;
    };
    modal: {
      overlay: string;
      container: string;
      header: string;
      content: string;
      features: string;
      priceTag: string;
      actionButton: string;
      closeButton: string;
    };
  }
  
  // ==================== CONTACT THEME ====================
  export interface ContactThemeStyles {
    container: string;
    backgroundGlow1: string;
    backgroundGlow2: string;
    heading: string;
    description: string;
    form: {
      container: string;
      input: string;
      textarea: string;
      button: string;
    };
    contactInfo: {
      container: string;
      item: string;
      icon: string;
      text: string;
    };
  }
  
  // Central interface to house all component themes
  export interface ThemeConfig {
    header: HeaderThemeStyles;
    about: AboutThemeStyles;
    skills: SkillsThemeStyles;
    experience: ExperienceThemeStyles;
    education: EducationThemeStyles;
    projects: ProjectsThemeStyles;
    certifications: CertificationsThemeStyles;
    causes: CausesThemeStyles;
    volunteer: VolunteerThemeStyles;
    services: ServicesThemeStyles;
    products: ProductsThemeStyles;
    contact: ContactThemeStyles;
  }
  
  // ===================== THEME DEFINITIONS =====================
  
  // -------------------- GRADIENT THEME --------------------
  const gradientTheme: ThemeConfig = {
    header: {
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
    about: {
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
    skills: {
      container: "relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-purple-500 opacity-10 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200",
      categoryButtons: {
        active: "bg-pink-600 text-white",
        inactive: "bg-indigo-900/60 text-gray-300 hover:bg-indigo-800/70"
      },
      searchInput: "w-full rounded-full bg-indigo-900/50 px-4 py-2 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-indigo-900/50 p-1",
        active: "bg-indigo-800/70",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-indigo-900/40 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-indigo-800/50 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-pink-900/50 px-2.5 py-1 text-xs font-medium text-pink-200",
        proficiencyText: "text-purple-200",
        yearsText: "text-purple-300/70",
        progressBackground: "bg-indigo-950/50"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl",
        header: "flex items-center justify-between border-b border-purple-800 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-pink-200 hover:bg-purple-800 hover:text-white",
        input: "w-full rounded-lg bg-indigo-800/70 px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500",
        categoryButtonsActive: "bg-pink-600 text-white",
        categoryButtonsInactive: "bg-indigo-800/70 text-purple-200 hover:bg-indigo-700/70"
      },
      proficiencyColors: {
        beginner: "from-pink-300 to-pink-500",
        intermediate: "from-purple-300 to-purple-600",
        advanced: "from-indigo-300 to-indigo-600",
        expert: "from-blue-300 to-blue-600"
      }
    },
    experience: {
      container: "relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      timeline: {
        line: "absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 md:left-1/2",
        dot: {
          outer: "absolute left-3 h-9 w-9 rounded-full border-2 border-pink-400 bg-indigo-900 md:left-[calc(50%-18px)]",
          inner: "absolute left-5 top-2 h-5 w-5 rounded-full bg-pink-500 md:left-[calc(50%-10px)]"
        }
      },
      card: {
        container: "relative rounded-xl bg-indigo-900/40 p-6 shadow-xl backdrop-blur-md border border-pink-500/20",
        title: "text-xl font-bold text-white",
        company: "text-lg font-medium text-pink-300",
        duration: "text-sm text-purple-200",
        description: "mt-3 text-purple-100",
        location: "mt-2 flex items-center text-sm text-indigo-300",
        skills: "mt-3 inline-block rounded-full bg-pink-900/40 px-3 py-1 text-xs font-medium text-pink-200"
      }
    },
    education: {
      container: "relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-purple-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      card: {
        container: "rounded-xl bg-indigo-900/40 p-6 shadow-xl backdrop-blur-md border border-indigo-500/20 hover:shadow-2xl transition-shadow duration-300",
        header: "flex items-start justify-between",
        school: "text-xl font-bold text-white",
        degree: "text-lg font-medium text-indigo-300",
        duration: "text-sm font-medium text-purple-200",
        description: "mt-3 text-purple-100",
        location: "mt-2 flex items-center text-sm text-indigo-300"
      }
    },
    projects: {
      container: "relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-indigo-900/40 shadow-xl backdrop-blur-md border border-purple-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-purple-100",
        tags: "inline-block rounded-full bg-pink-900/40 px-3 py-1 text-xs font-medium text-pink-200 mr-2",
        button: "mt-2 mb-4 ml-6 inline-flex items-center rounded-lg bg-pink-600 px-3 py-2 text-sm font-medium text-white hover:bg-pink-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-purple-800 bg-indigo-900/80 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-purple-100",
        closeButton: "rounded-full p-2 text-pink-200 hover:bg-purple-800 hover:text-white"
      }
    },
    certifications: {
      container: "relative overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-purple-900/40 shadow-xl backdrop-blur-md border border-pink-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-contain p-4 bg-indigo-950/30",
        title: "px-6 pt-4 text-xl font-bold text-white",
        issuer: "px-6 py-1 text-pink-300 text-sm",
        date: "px-6 pb-2 text-purple-200 text-xs",
        viewButton: "m-6 inline-flex items-center rounded-lg bg-pink-600 px-3 py-2 text-sm font-medium text-white hover:bg-pink-700"
      }
    },
    causes: {
      container: "relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-indigo-900/40 p-6 shadow-xl backdrop-blur-md border border-purple-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300",
        description: "mt-3 text-purple-100",
        supportText: "mt-4 text-sm italic text-pink-200",
        button: "mt-4 inline-flex items-center rounded-lg bg-pink-600 px-3 py-2 text-sm font-medium text-white hover:bg-pink-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-purple-800 bg-indigo-900/80 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-purple-100",
        supportInfo: "mt-6 rounded-lg bg-pink-900/30 p-4 border border-pink-500/20",
        actionButton: "mt-6 w-full rounded-lg bg-pink-600 px-4 py-3 text-white font-medium hover:bg-pink-700",
        closeButton: "rounded-full p-2 text-pink-200 hover:bg-purple-800 hover:text-white"
      }
    },
    volunteer: {
      container: "relative overflow-hidden bg-gradient-to-br from-pink-900 to-indigo-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-pink-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-pink-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-pink-900/40 p-6 shadow-xl backdrop-blur-md border border-indigo-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white",
        description: "mt-3 text-pink-100",
        button: "mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      }
    },
    services: {
      container: "relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-indigo-900/40 p-6 shadow-xl backdrop-blur-md border border-purple-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300",
        description: "mt-3 text-purple-100",
        specialties: "mt-4 text-sm text-indigo-300",
        pricing: "mt-4 text-xl font-bold text-pink-300",
        button: "mt-4 inline-flex items-center rounded-lg bg-pink-600 px-3 py-2 text-sm font-medium text-white hover:bg-pink-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-purple-800 bg-indigo-900/80 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-purple-100",
        pricingSection: "mt-6 rounded-lg bg-pink-900/30 p-4 border border-pink-500/20",
        actionButton: "mt-6 w-full rounded-lg bg-pink-600 px-4 py-3 text-white font-medium hover:bg-pink-700",
        closeButton: "rounded-full p-2 text-pink-200 hover:bg-purple-800 hover:text-white"
      }
    },
    products: {
      container: "relative overflow-hidden bg-gradient-to-br from-purple-900 to-pink-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-purple-900/40 shadow-xl backdrop-blur-md border border-pink-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-purple-100",
        price: "px-6 pb-2 text-2xl font-bold text-pink-300",
        button: "m-6 inline-flex items-center rounded-lg bg-pink-600 px-3 py-2 text-sm font-medium text-white hover:bg-pink-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gradient-to-br from-purple-900 to-pink-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-pink-800 bg-purple-900/80 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-purple-100",
        features: "mt-6 rounded-lg bg-indigo-900/30 p-4 border border-indigo-500/20",
        priceTag: "mt-4 text-3xl font-bold text-pink-300",
        actionButton: "mt-6 w-full rounded-lg bg-pink-600 px-4 py-3 text-white font-medium hover:bg-pink-700",
        closeButton: "rounded-full p-2 text-pink-200 hover:bg-purple-800 hover:text-white"
      }
    },
    contact: {
      container: "relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-pink-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-indigo-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-purple-200 mb-12",
      form: {
        container: "rounded-xl bg-indigo-900/40 p-6 shadow-xl backdrop-blur-md border border-purple-500/20",
        input: "w-full rounded-lg bg-indigo-800/50 px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-indigo-700",
        textarea: "w-full rounded-lg bg-indigo-800/50 px-4 py-3 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-indigo-700",
        button: "w-full rounded-lg bg-pink-600 px-4 py-3 text-white font-medium hover:bg-pink-700"
      },
      contactInfo: {
        container: "rounded-xl bg-indigo-900/40 p-6 shadow-xl backdrop-blur-md border border-purple-500/20",
        item: "flex items-center mb-4",
        icon: "mr-3 text-pink-400",
        text: "text-purple-100"
      }
    }
  };
  
  // -------------------- MONOCHROMATIC THEME --------------------
  const monochromaticTheme: ThemeConfig = {
    header: {
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
    about: {
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
    skills: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-850 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-white opacity-5 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400",
      categoryButtons: {
        active: "bg-gray-600 text-white",
        inactive: "bg-gray-800 text-gray-300 hover:bg-gray-700"
      },
      searchInput: "w-full rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-gray-800 p-1",
        active: "bg-gray-700",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-gray-800 bg-opacity-60 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-opacity-80 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-gray-700 px-2.5 py-1 text-xs font-medium text-gray-300",
        proficiencyText: "text-gray-400",
        yearsText: "text-gray-500",
        progressBackground: "bg-gray-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-800 shadow-2xl",
        header: "flex items-center justify-between border-b border-gray-700 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white",
        input: "w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500",
        categoryButtonsActive: "bg-gray-600 text-white",
        categoryButtonsInactive: "bg-gray-700 text-gray-300 hover:bg-gray-600"
      },
      proficiencyColors: {
        beginner: "from-gray-400 to-gray-500",
        intermediate: "from-gray-300 to-gray-600",
        advanced: "from-gray-200 to-gray-500",
        expert: "from-white to-gray-400"
      }
    },
    experience: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      timeline: {
        line: "absolute left-5 top-0 h-full w-0.5 bg-gray-600 md:left-1/2",
        dot: {
          outer: "absolute left-3 h-9 w-9 rounded-full border-2 border-gray-500 bg-gray-800 md:left-[calc(50%-18px)]",
          inner: "absolute left-5 top-2 h-5 w-5 rounded-full bg-gray-500 md:left-[calc(50%-10px)]"
        }
      },
      card: {
        container: "relative rounded-xl bg-gray-800/60 p-6 shadow-xl backdrop-blur-md border border-gray-700/30",
        title: "text-xl font-bold text-white",
        company: "text-lg font-medium text-gray-300",
        duration: "text-sm text-gray-400",
        description: "mt-3 text-gray-300",
        location: "mt-2 flex items-center text-sm text-gray-400",
        skills: "mt-3 inline-block rounded-full bg-gray-700 px-3 py-1 text-xs font-medium text-gray-300"
      }
    },
    education: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "rounded-xl bg-gray-800/60 p-6 shadow-xl backdrop-blur-md border border-gray-700/30 hover:shadow-2xl transition-shadow duration-300",
        header: "flex items-start justify-between",
        school: "text-xl font-bold text-white",
        degree: "text-lg font-medium text-gray-300",
        duration: "text-sm font-medium text-gray-400",
        description: "mt-3 text-gray-300",
        location: "mt-2 flex items-center text-sm text-gray-400"
      }
    },
    projects: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-800/60 shadow-xl backdrop-blur-md border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-gray-300",
        tags: "inline-block rounded-full bg-gray-700 px-3 py-1 text-xs font-medium text-gray-300 mr-2",
        button: "mt-2 mb-4 ml-6 inline-flex items-center rounded-lg bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-500"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-800 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 bg-gray-800/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
      }
    },
    certifications: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-800/60 shadow-xl backdrop-blur-md border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-contain p-4 bg-gray-900/50",
        title: "px-6 pt-4 text-xl font-bold text-white",
        issuer: "px-6 py-1 text-gray-300 text-sm",
        date: "px-6 pb-2 text-gray-400 text-xs",
        viewButton: "m-6 inline-flex items-center rounded-lg bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-500"
      }
    },
    causes: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-gray-800/60 p-6 shadow-xl backdrop-blur-md border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300",
        description: "mt-3 text-gray-300",
        supportText: "mt-4 text-sm italic text-gray-400",
        button: "mt-4 inline-flex items-center rounded-lg bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-500"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-800 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 bg-gray-800/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        supportInfo: "mt-6 rounded-lg bg-gray-700/50 p-4 border border-gray-600/30",
        actionButton: "mt-6 w-full rounded-lg bg-gray-600 px-4 py-3 text-white font-medium hover:bg-gray-500",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
      }
    },
    volunteer: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-800/60 p-6 shadow-xl backdrop-blur-md border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white",
        description: "mt-3 text-gray-300",
        button: "mt-4 inline-flex items-center rounded-lg bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-500"
      }
    },
    services: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-gray-800/60 p-6 shadow-xl backdrop-blur-md border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300",
        description: "mt-3 text-gray-300",
        specialties: "mt-4 text-sm text-gray-400",
        pricing: "mt-4 text-xl font-bold text-gray-300",
        button: "mt-4 inline-flex items-center rounded-lg bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-500"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-800 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 bg-gray-800/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        pricingSection: "mt-6 rounded-lg bg-gray-700/50 p-4 border border-gray-600/30",
        actionButton: "mt-6 w-full rounded-lg bg-gray-600 px-4 py-3 text-white font-medium hover:bg-gray-500",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
      }
    },
    products: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-800/60 shadow-xl backdrop-blur-md border border-gray-700/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-gray-300",
        price: "px-6 pb-2 text-2xl font-bold text-gray-300",
        button: "m-6 inline-flex items-center rounded-lg bg-gray-600 px-3 py-2 text-sm font-medium text-white hover:bg-gray-500"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-800 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 bg-gray-800/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        features: "mt-6 rounded-lg bg-gray-700/50 p-4 border border-gray-600/30",
        priceTag: "mt-4 text-3xl font-bold text-gray-300",
        actionButton: "mt-6 w-full rounded-lg bg-gray-600 px-4 py-3 text-white font-medium hover:bg-gray-500",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
      }
    },
    contact: {
      container: "relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-white opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-white opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      form: {
        container: "rounded-xl bg-gray-800/60 p-6 shadow-xl backdrop-blur-md border border-gray-700/30",
        input: "w-full rounded-lg bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-600",
        textarea: "w-full rounded-lg bg-gray-700/50 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-600",
        button: "w-full rounded-lg bg-gray-600 px-4 py-3 text-white font-medium hover:bg-gray-500"
      },
      contactInfo: {
        container: "rounded-xl bg-gray-800/60 p-6 shadow-xl backdrop-blur-md border border-gray-700/30",
        item: "flex items-center mb-4",
        icon: "mr-3 text-gray-400",
        text: "text-gray-300"
      }
    }
  };
  
  // -------------------- DARK THEME WITH ACCENT COLORS --------------------
  const darkAccentTheme: ThemeConfig = {
    header: {
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
    about: {
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
    skills: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-600 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-amber-500 opacity-10 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-blue-400 opacity-10 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200",
      categoryButtons: {
        active: "bg-blue-600 text-white",
        inactive: "bg-gray-900 text-gray-300 hover:bg-gray-800"
      },
      searchInput: "w-full rounded-full bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-gray-900 p-1",
        active: "bg-gray-800",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-gray-900 bg-opacity-60 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-opacity-80 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-blue-900 px-2.5 py-1 text-xs font-medium text-blue-200",
        proficiencyText: "text-amber-400",
        yearsText: "text-gray-500",
        progressBackground: "bg-gray-800"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-900 shadow-2xl",
        header: "flex items-center justify-between border-b border-gray-800 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-amber-400 hover:bg-gray-800 hover:text-white",
        input: "w-full rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
        categoryButtonsActive: "bg-blue-600 text-white",
        categoryButtonsInactive: "bg-gray-800 text-gray-300 hover:bg-gray-700"
      },
      proficiencyColors: {
        beginner: "from-amber-300 to-amber-600",
        intermediate: "from-yellow-300 to-amber-500",
        advanced: "from-blue-300 to-blue-600",
        expert: "from-blue-400 to-blue-700"
      }
    },
    experience: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-600 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-amber-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      timeline: {
        line: "absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-amber-500 to-blue-500 md:left-1/2",
        dot: {
          outer: "absolute left-3 h-9 w-9 rounded-full border-2 border-amber-500 bg-black md:left-[calc(50%-18px)]",
          inner: "absolute left-5 top-2 h-5 w-5 rounded-full bg-blue-500 md:left-[calc(50%-10px)]"
        }
      },
      card: {
        container: "relative rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-blue-500/20",
        title: "text-xl font-bold text-white",
        company: "text-lg font-medium text-amber-300",
        duration: "text-sm text-blue-300",
        description: "mt-3 text-gray-300",
        location: "mt-2 flex items-center text-sm text-blue-300",
        skills: "mt-3 inline-block rounded-full bg-amber-900/40 px-3 py-1 text-xs font-medium text-amber-200"
      }
    },
    education: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-amber-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-600 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      card: {
        container: "rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-amber-500/20 hover:shadow-2xl transition-shadow duration-300",
        header: "flex items-start justify-between",
        school: "text-xl font-bold text-white",
        degree: "text-lg font-medium text-amber-300",
        duration: "text-sm font-medium text-blue-300",
        description: "mt-3 text-gray-300",
        location: "mt-2 flex items-center text-sm text-blue-300"
      }
    },
    projects: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-600 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-amber-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 shadow-xl backdrop-blur-md border border-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-gray-300",
        tags: "inline-block rounded-full bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-200 mr-2",
        button: "mt-2 mb-4 ml-6 inline-flex items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        closeButton: "rounded-full p-2 text-amber-400 hover:bg-gray-800 hover:text-white"
      }
    },
    certifications: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-amber-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-600 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 shadow-xl backdrop-blur-md border border-amber-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-contain p-4 bg-black/50",
        title: "px-6 pt-4 text-xl font-bold text-white",
        issuer: "px-6 py-1 text-amber-300 text-sm",
        date: "px-6 pb-2 text-blue-300 text-xs",
        viewButton: "m-6 inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      }
    },
    causes: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-600 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-amber-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300",
        description: "mt-3 text-gray-300",
        supportText: "mt-4 text-sm italic text-blue-300",
        button: "mt-4 inline-flex items-center rounded-lg bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        supportInfo: "mt-6 rounded-lg bg-blue-900/30 p-4 border border-blue-500/20",
        actionButton: "mt-6 w-full rounded-lg bg-amber-600 px-4 py-3 text-white font-medium hover:bg-amber-700",
        closeButton: "rounded-full p-2 text-amber-400 hover:bg-gray-800 hover:text-white"
      }
    },
    volunteer: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-amber-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-600 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-amber-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white",
        description: "mt-3 text-gray-300",
        button: "mt-4 inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      }
    },
    services: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-600 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-amber-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300",
        description: "mt-3 text-gray-300",
        specialties: "mt-4 text-sm text-blue-300",
        pricing: "mt-4 text-xl font-bold text-amber-300",
        button: "mt-4 inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        pricingSection: "mt-6 rounded-lg bg-amber-900/30 p-4 border border-amber-500/20",
        actionButton: "mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700",
        closeButton: "rounded-full p-2 text-amber-400 hover:bg-gray-800 hover:text-white"
      }
    },
    products: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-amber-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-600 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 shadow-xl backdrop-blur-md border border-amber-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-gray-300",
        price: "px-6 pb-2 text-2xl font-bold text-amber-300",
        button: "m-6 inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        features: "mt-6 rounded-lg bg-blue-900/30 p-4 border border-blue-500/20",
        priceTag: "mt-4 text-3xl font-bold text-amber-300",
        actionButton: "mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700",
        closeButton: "rounded-full p-2 text-amber-400 hover:bg-gray-800 hover:text-white"
      }
    },
    contact: {
      container: "relative overflow-hidden bg-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-600 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-amber-500 opacity-10 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-amber-200 mb-12",
      form: {
        container: "rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-blue-500/20",
        input: "w-full rounded-lg bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-800",
        textarea: "w-full rounded-lg bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-800",
        button: "w-full rounded-lg bg-amber-600 px-4 py-3 text-white font-medium hover:bg-amber-700"
      },
      contactInfo: {
        container: "rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-amber-500/20",
        item: "flex items-center mb-4",
        icon: "mr-3 text-amber-400",
        text: "text-gray-300"
      }
    }
  };
  
  // -------------------- DEFAULT THEME --------------------
  const defaultTheme: ThemeConfig = {
    header: {
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
    },
    about: {
      container: "relative overflow-hidden bg-gradient-to-br from-black to-teal-900 py-5",
      backgroundGlow1: "absolute -left-16 -top-16 size-64 rounded-full bg-teal-500 opacity-10 blur-3xl",
      backgroundGlow2: "absolute right-10 top-20 size-48 rounded-full bg-blue-600 opacity-15 blur-3xl",
      title: {
        primary: "text-teal-400 text-2xl font-bold",
        secondary: "text-gray-300 text-2xl"
      },
      contentWrapper: "relative rounded-xl bg-black/50 p-8 shadow-xl backdrop-blur-md border border-teal-500/20",
      quoteMarks: "absolute font-serif text-6xl text-blue-400 opacity-20",
      textContent: "relative z-10 text-lg leading-relaxed text-gray-300"
    },
    skills: {
      container: "relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-teal-950 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-teal-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-500 opacity-5 blur-3xl",
      backgroundGlow3: "absolute bottom-10 left-1/3 size-40 rounded-full bg-teal-400 opacity-5 blur-2xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400",
      categoryButtons: {
        active: "bg-teal-600 text-white",
        inactive: "bg-gray-800 text-gray-300 hover:bg-gray-700"
      },
      searchInput: "w-full rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 md:w-auto",
      viewToggle: {
        container: "flex rounded-full bg-gray-800 p-1",
        active: "bg-gray-700",
        inactive: ""
      },
      skillCard: {
        container: "group relative overflow-hidden rounded-lg bg-gray-800 bg-opacity-60 p-4 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-opacity-80 hover:shadow-xl",
        title: "font-medium text-white",
        categoryBadge: "rounded-full bg-teal-900 px-2.5 py-1 text-xs font-medium text-teal-200",
        proficiencyText: "text-gray-400",
        yearsText: "text-gray-500",
        progressBackground: "bg-gray-700"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-gray-800 shadow-2xl",
        header: "flex items-center justify-between border-b border-gray-700 px-6 py-4",
        title: "text-xl font-semibold text-white",
        closeButton: "rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white",
        input: "w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500",
        categoryButtonsActive: "bg-teal-600 text-white",
        categoryButtonsInactive: "bg-gray-700 text-gray-300 hover:bg-gray-600"
      },
      proficiencyColors: {
        beginner: "from-green-300 to-green-500",
        intermediate: "from-blue-300 to-blue-600",
        advanced: "from-purple-300 to-purple-600",
        expert: "from-teal-300 to-teal-600"
      }
    },
    experience: {
      container: "relative overflow-hidden bg-gradient-to-b from-black to-teal-950 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-teal-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      timeline: {
        line: "absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-teal-500 to-blue-500 md:left-1/2",
        dot: {
          outer: "absolute left-3 h-9 w-9 rounded-full border-2 border-teal-500 bg-black md:left-[calc(50%-18px)]",
          inner: "absolute left-5 top-2 h-5 w-5 rounded-full bg-blue-500 md:left-[calc(50%-10px)]"
        }
      },
      card: {
        container: "relative rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-teal-500/20",
        title: "text-xl font-bold text-white",
        company: "text-lg font-medium text-teal-400",
        duration: "text-sm text-blue-300",
        description: "mt-3 text-gray-300",
        location: "mt-2 flex items-center text-sm text-gray-400",
        skills: "mt-3 inline-block rounded-full bg-teal-900/40 px-3 py-1 text-xs font-medium text-teal-200"
      }
    },
    education: {
      container: "relative overflow-hidden bg-gradient-to-b from-teal-950 to-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-teal-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-blue-500/20 hover:shadow-2xl transition-shadow duration-300",
        header: "flex items-start justify-between",
        school: "text-xl font-bold text-white",
        degree: "text-lg font-medium text-blue-400",
        duration: "text-sm font-medium text-teal-300",
        description: "mt-3 text-gray-300",
        location: "mt-2 flex items-center text-sm text-gray-400"
      }
    },
    projects: {
      container: "relative overflow-hidden bg-gradient-to-b from-black to-teal-950 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-teal-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 shadow-xl backdrop-blur-md border border-teal-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-gray-300",
        tags: "inline-block rounded-full bg-teal-900/50 px-3 py-1 text-xs font-medium text-teal-200 mr-2",
        button: "mt-2 mb-4 ml-6 inline-flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        closeButton: "rounded-full p-2 text-teal-400 hover:bg-gray-800 hover:text-white"
      }
    },
    certifications: {
      container: "relative overflow-hidden bg-gradient-to-b from-teal-950 to-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-teal-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 shadow-xl backdrop-blur-md border border-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-contain p-4 bg-black/50",
        title: "px-6 pt-4 text-xl font-bold text-white",
        issuer: "px-6 py-1 text-blue-400 text-sm",
        date: "px-6 pb-2 text-gray-400 text-xs",
        viewButton: "m-6 inline-flex items-center rounded-lg bg-teal-500 px-3 py-2 text-sm font-medium text-white hover:bg-teal-600"
      }
    },
    causes: {
      container: "relative overflow-hidden bg-gradient-to-b from-black to-teal-950 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-teal-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-teal-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300",
        description: "mt-3 text-gray-300",
        supportText: "mt-4 text-sm italic text-gray-400",
        button: "mt-4 inline-flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        supportInfo: "mt-6 rounded-lg bg-teal-900/30 p-4 border border-teal-500/20",
        actionButton: "mt-6 w-full rounded-lg bg-blue-500 px-4 py-3 text-white font-medium hover:bg-blue-600",
        closeButton: "rounded-full p-2 text-teal-400 hover:bg-gray-800 hover:text-white"
      }
    },
    volunteer: {
      container: "relative overflow-hidden bg-gradient-to-b from-teal-950 to-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-teal-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white",
        description: "mt-3 text-gray-300",
        button: "mt-4 inline-flex items-center rounded-lg bg-teal-500 px-3 py-2 text-sm font-medium text-white hover:bg-teal-600"
      }
    },
    services: {
      container: "relative overflow-hidden bg-gradient-to-b from-black to-teal-950 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-teal-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "group overflow-hidden rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-teal-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        title: "text-xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300",
        description: "mt-3 text-gray-300",
        specialties: "mt-4 text-sm text-blue-300",
        pricing: "mt-4 text-xl font-bold text-teal-400",
        button: "mt-4 inline-flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        pricingSection: "mt-6 rounded-lg bg-teal-900/30 p-4 border border-teal-500/20",
        actionButton: "mt-6 w-full rounded-lg bg-blue-500 px-4 py-3 text-white font-medium hover:bg-blue-600",
        closeButton: "rounded-full p-2 text-teal-400 hover:bg-gray-800 hover:text-white"
      }
    },
    products: {
      container: "relative overflow-hidden bg-gradient-to-b from-teal-950 to-black px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-blue-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-teal-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      card: {
        container: "overflow-hidden rounded-xl bg-gray-900/40 shadow-xl backdrop-blur-md border border-blue-500/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1",
        image: "h-48 w-full object-cover",
        title: "px-6 pt-4 text-xl font-bold text-white",
        description: "px-6 py-2 text-gray-300",
        price: "px-6 pb-2 text-2xl font-bold text-teal-400",
        button: "m-6 inline-flex items-center rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
      },
      modal: {
        overlay: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 backdrop-blur-sm",
        container: "max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-gray-900 shadow-2xl",
        header: "sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900/90 px-6 py-4 backdrop-blur-sm",
        content: "p-6 text-gray-300",
        features: "mt-6 rounded-lg bg-teal-900/30 p-4 border border-teal-500/20",
        priceTag: "mt-4 text-3xl font-bold text-teal-400",
        actionButton: "mt-6 w-full rounded-lg bg-blue-500 px-4 py-3 text-white font-medium hover:bg-blue-600",
        closeButton: "rounded-full p-2 text-teal-400 hover:bg-gray-800 hover:text-white"
      }
    },
    contact: {
      container: "relative overflow-hidden bg-gradient-to-b from-black to-teal-950 px-4 py-16",
      backgroundGlow1: "absolute -left-40 top-40 size-80 rounded-full bg-teal-500 opacity-5 blur-3xl",
      backgroundGlow2: "absolute right-20 top-60 size-60 rounded-full bg-blue-500 opacity-5 blur-3xl",
      heading: "mb-4 text-4xl font-bold text-white md:text-5xl",
      description: "mx-auto max-w-2xl text-gray-400 mb-12",
      form: {
        container: "rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-teal-500/20",
        input: "w-full rounded-lg bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-800",
        textarea: "w-full rounded-lg bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-800",
        button: "w-full rounded-lg bg-blue-500 px-4 py-3 text-white font-medium hover:bg-blue-600"
      },
      contactInfo: {
        container: "rounded-xl bg-gray-900/40 p-6 shadow-xl backdrop-blur-md border border-blue-500/20",
        item: "flex items-center mb-4",
        icon: "mr-3 text-teal-400",
        text: "text-gray-300"
      }
    }
  };
  
  // Create a theme map with all available themes
  export const themeMap: Record<string, ThemeConfig> = {
    "Gradient Theme": gradientTheme,
    "Monochromatic Theme": monochromaticTheme,
    "Dark Theme with accent colors": darkAccentTheme,
    "Default": defaultTheme
  };
  
  // Helper function to get a specific component theme based on the theme name
  export const getComponentTheme = <T extends keyof ThemeConfig>(
    componentName: T,
    themeName: string = "Default"
  ): ThemeConfig[T] => {
    const theme = themeMap[themeName] || themeMap["Default"];
    
    return theme[componentName];
  };
  
  // Individual helper functions for specific components (for convenience)
  export const getHeaderTheme = (themeName: string = "Default"): HeaderThemeStyles => 
    getComponentTheme("header", themeName);
  
  export const getAboutTheme = (themeName: string = "Default"): AboutThemeStyles => 
    getComponentTheme("about", themeName);
  
  export const getSkillsTheme = (themeName: string = "Default"): SkillsThemeStyles => 
    getComponentTheme("skills", themeName);
  
  export const getExperienceTheme = (themeName: string = "Default"): ExperienceThemeStyles => 
    getComponentTheme("experience", themeName);
  
  export const getEducationTheme = (themeName: string = "Default"): EducationThemeStyles => 
    getComponentTheme("education", themeName);
  
  export const getProjectsTheme = (themeName: string = "Default"): ProjectsThemeStyles => 
    getComponentTheme("projects", themeName);
  
  export const getCertificationsTheme = (themeName: string = "Default"): CertificationsThemeStyles => 
    getComponentTheme("certifications", themeName);
  
  export const getCausesTheme = (themeName: string = "Default"): CausesThemeStyles => 
    getComponentTheme("causes", themeName);
  
  export const getVolunteerTheme = (themeName: string = "Default"): VolunteerThemeStyles => 
    getComponentTheme("volunteer", themeName);
  
  export const getServicesTheme = (themeName: string = "Default"): ServicesThemeStyles => 
    getComponentTheme("services", themeName);
  
  export const getProductsTheme = (themeName: string = "Default"): ProductsThemeStyles => 
    getComponentTheme("products", themeName);
  
  export const getContactTheme = (themeName: string = "Default"): ContactThemeStyles => 
    getComponentTheme("contact", themeName);