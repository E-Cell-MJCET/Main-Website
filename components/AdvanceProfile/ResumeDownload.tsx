/* eslint-disable no-unused-vars */
"use client";
import { useEffect } from 'react';
import {jsPDF} from 'jspdf';
// import autoTable from 'jspdf-autotable';

// Enhanced UserData interface to include all possible fields
interface UserData {
  // Basic information
  Name: string;
  Username?: string;
  Tagline?: string;
  Member_Type?: string;
  About?: string;
  Location?: string;
  Portfolio?: string;
  
  // Contact and social information
  SocialLinks?: {
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    behance?: string;
  };
  Contact_Info?: {
    email?: string;
    phone?: string;
    countryCode?: string;
    countryDialCode?: string;
  };
  
  // Professional information
  IndustryPreference?: string;
  SecondaryPreference?: string;
  Technical_Info?: string;
  
  // Detailed data arrays
  Skills?: Array<any>;
  Experience?: Array<any>;
  Education?: Array<any>;
  Projects?: Array<any>;
  Licenses?: Array<any>;
  Certifications?: Array<any>;
  Recommendations?: Array<any>;
  Honors?: Array<any>;
  Featured_Items?: Array<any>;
  Causes?: Array<any>;
  TestScores?: Array<any>;
  VolunteerExperience?: Array<any>;
}

interface ResumeDownloadProps {
  userData: UserData;
  onComplete?: () => void;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ userData, onComplete }) => {
  useEffect(() => {
    // Wrap in setTimeout to allow React to finish rendering
    setTimeout(() => {
      try {
        generatePDF();
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        // Always call onComplete to update the UI
        if (onComplete) onComplete();
      }
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatContactInfo = (contactInfo: UserData['Contact_Info'] = {}) => {
    // Return empty object if contactInfo is undefined
    if (!contactInfo) return { email: '', phone: '' };
    
    // Format the phone number with country dial code if available
    let formattedPhone = contactInfo.phone || '';
    if (contactInfo.countryDialCode && contactInfo.phone) {
      formattedPhone = `${contactInfo.countryDialCode} ${contactInfo.phone}`;
    }
    
    return {
      email: contactInfo.email || '',
      phone: formattedPhone,
    };
  };

  const generatePDF = () => {
    try {
      // Add font configuration to ensure it works in all browsers
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Ensure all userData fields are properly defined with fallbacks
      const safeUserData = {
        Name: userData.Name || 'Unnamed',
        Username: userData.Username || '',
        Tagline: userData.Tagline || '',
        Member_Type: userData.Member_Type || '',
        About: userData.About || '',
        Location: userData.Location || '',
        Portfolio: userData.Portfolio || '',
        SocialLinks: userData.SocialLinks || {},
        Contact_Info: userData.Contact_Info || {},
        IndustryPreference: userData.IndustryPreference || '',
        SecondaryPreference: userData.SecondaryPreference || '',
        Technical_Info: userData.Technical_Info || '',
        Skills: Array.isArray(userData.Skills) ? userData.Skills : [],
        Experience: Array.isArray(userData.Experience) ? userData.Experience : [],
        Education: Array.isArray(userData.Education) ? userData.Education : [],
        Projects: Array.isArray(userData.Projects) ? userData.Projects : [],
        Licenses: Array.isArray(userData.Licenses) ? userData.Licenses : [],
        Certifications: Array.isArray(userData.Certifications) ? userData.Certifications : [],
        Recommendations: Array.isArray(userData.Recommendations) ? userData.Recommendations : [],
        Honors: Array.isArray(userData.Honors) ? userData.Honors : [],
        Featured_Items: Array.isArray(userData.Featured_Items) ? userData.Featured_Items : [],
        Causes: Array.isArray(userData.Causes) ? userData.Causes : [],
        TestScores: Array.isArray(userData.TestScores) ? userData.TestScores : [],
        VolunteerExperience: Array.isArray(userData.VolunteerExperience) ? userData.VolunteerExperience : []
      };
      
      // Format contact info
      const contactInfo = formatContactInfo(safeUserData.Contact_Info);
      
      // Set up some styling variables
      const titleFontSize = 18;
      const subtitleFontSize = 11;
      const headingFontSize = 12;
      const normalFontSize = 10;
      const smallFontSize = 8;
      
      let yPos = 15; // Starting Y position
      const margin = 15; // Page margin
      const contentWidth = pageWidth - (margin * 2); // Width for content
      
      // Add document title (invisible but helps with accessibility)
      doc.setProperties({
        title: `Resume - ${safeUserData.Name}`,
        subject: 'Professional Resume',
        author: safeUserData.Name,
        keywords: 'resume, cv, professional',
        creator: 'E-Cell Tech Team'
      });
      
      // Function to check if new content will fit on current page
      // Added more conservative height estimation to prevent overlapping
      const willContentFitOnPage = (contentHeight: number): boolean => {
        // Add 5mm extra buffer to prevent content from being too close to the bottom
        return yPos + contentHeight + 5 < pageHeight - margin;
      };
      
      // Function to add a new page
      const addNewPage = () => {
        doc.addPage();
        yPos = margin; // Reset position to top margin of new page
      };
      
      // Function to handle text wrapping and pagination with improved spacing
      const addTextWithWrapping = (text: string, x: number, fontSize: number, fontStyle: string = 'normal') => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        
        const lines = doc.splitTextToSize(text, contentWidth);
        const lineHeight = fontSize * 0.352778; // Convert pt to mm
        const totalHeight = lines.length * lineHeight * 1.5; // More generous line spacing
        
        // Check if it fits on the current page
        if (!willContentFitOnPage(totalHeight)) {
          addNewPage();
        }
        
        doc.text(lines, x, yPos);
        yPos += totalHeight;
      };
      
      // Function to add a section with title and consistent spacing
      const addSection = (title: string, spacing: number = 4) => {
        // Use more space for section headers to ensure separation
        const sectionHeaderHeight = headingFontSize * 0.352778 * 3 + spacing * 2;
        
        // Check if we need a new page - be more conservative with space
        if (!willContentFitOnPage(sectionHeaderHeight)) {
          addNewPage();
        }
        
        // Add a bit more space before each section (except the first one after header)
        if (yPos > 60) { // Increased this value to accommodate our new gap
          yPos += 2;
        }
        
        doc.setFontSize(headingFontSize);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(44, 62, 80); // Dark blue-gray for headings
        doc.text(title.toUpperCase(), margin, yPos);
        yPos += spacing;
        
        // Section underline
        doc.setDrawColor(52, 152, 219); // Blue line
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += spacing + 1;
        
        // Reset text color
        doc.setTextColor(0, 0, 0);
      };
      
      // Function to add a small bullet point with improved spacing
      const addBulletPoint = (text: string, indent: number = 5) => {
        const bulletX = margin + indent;
        
        doc.setFontSize(normalFontSize);
        doc.setFont('helvetica', 'normal');
        
        const lines = doc.splitTextToSize(text, contentWidth - indent - 2);
        const lineHeight = normalFontSize * 0.352778;
        const totalHeight = lines.length * lineHeight * 1.5; // More generous line spacing
        
        // Check if it fits on the current page
        if (!willContentFitOnPage(totalHeight)) {
          addNewPage();
        }
        
        // Add bullet
        doc.text('•', bulletX, yPos);
        
        // Add text after bullet
        doc.text(lines, bulletX + 4, yPos);
        yPos += totalHeight;
      };
      
      // ===== HEADER SECTION WITH IMPROVED LAYOUT =====
      // Create a light gray background header area
      doc.setFillColor(240, 240, 240); // Light gray background
      doc.rect(0, 0, pageWidth, 38, 'F'); // Slightly taller to accommodate the new layout
      
      // Name at the very top, centered for better prominence
      doc.setFontSize(titleFontSize);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(44, 62, 80); // Dark blue-gray
      doc.text(safeUserData.Name, pageWidth / 2, yPos, { align: 'center' });
      
      // Move position down for tagline
      yPos += 8;
      
      // Tagline always below the name, centered and properly wrapped
      if (safeUserData.Tagline) {
        doc.setFontSize(subtitleFontSize);
        doc.setFont('helvetica', 'italic');
        
        // Ensure the tagline is wrapped properly to stay within boundaries
        const taglineLines = doc.splitTextToSize(safeUserData.Tagline, contentWidth - 20); // 10mm margin on each side
        doc.text(taglineLines, pageWidth / 2, yPos, { align: 'center' });
        
        // Adjust vertical position based on how many lines the tagline takes
        yPos += taglineLines.length * 5;
      }
      
      // Add some space before contact info
      yPos += 4;
      
      // Contact info row with proper spacing - now positioned lower
      doc.setFontSize(smallFontSize);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      
      let leftInfo = '';
      let centerInfo = '';
      let rightInfo = '';
      
      // Distribute information across the page width
      if (contactInfo.email) leftInfo = `Email: ${contactInfo.email}`;
      if (contactInfo.phone) centerInfo = `Phone: ${contactInfo.phone}`;
      if (safeUserData.Location) rightInfo = `Location: ${safeUserData.Location}`;
      
      // Check if each field fits in its allocated space and truncate if needed
      const maxWidthPerColumn = contentWidth / 3 - 5;
      
      const truncateIfNeeded = (text: string, maxWidth: number) => {
        if (doc.getTextWidth(text) > maxWidth) {
          // Try truncating to fit
          let truncated = text;
          while (doc.getTextWidth(truncated + '...') > maxWidth && truncated.length > 0) {
            truncated = truncated.slice(0, -1);
          }
          
          return truncated + '...';
        }
        
        return text;
      };
      
      // Place the information
      if (leftInfo) doc.text(truncateIfNeeded(leftInfo, maxWidthPerColumn), margin, yPos);
      if (centerInfo) doc.text(truncateIfNeeded(centerInfo, maxWidthPerColumn), pageWidth / 2, yPos, { align: 'center' });
      if (rightInfo) doc.text(truncateIfNeeded(rightInfo, maxWidthPerColumn), pageWidth - margin, yPos, { align: 'right' });
      
      yPos += 5;
      
      // Social Links - only show top 2-3 to save space
      if (safeUserData.SocialLinks && Object.keys(safeUserData.SocialLinks).length > 0) {
        const socialPriority = ['linkedin', 'github', 'website']; // Priority order
        const prioritizedLinks: string[] = [];
        
        // First add the prioritized links
        socialPriority.forEach(platform => {
          const url = safeUserData.SocialLinks?.[platform as keyof typeof safeUserData.SocialLinks];
          if (url) {
            prioritizedLinks.push(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`);
          }
        });
        
        // Then add any other links if we have space (limit to 3 total)
        if (prioritizedLinks.length < 3) {
          Object.entries(safeUserData.SocialLinks).forEach(([platform, url]) => {
            if (!socialPriority.includes(platform) && prioritizedLinks.length < 3 && url) {
              prioritizedLinks.push(`${platform.charAt(0).toUpperCase() + platform.slice(1)}: ${url}`);
            }
          });
        }
        
        // Place links evenly across the page
        if (prioritizedLinks.length === 1) {
          doc.text(truncateIfNeeded(prioritizedLinks[0], contentWidth), pageWidth / 2, yPos, { align: 'center' });
        } else if (prioritizedLinks.length === 2) {
          doc.text(truncateIfNeeded(prioritizedLinks[0], maxWidthPerColumn), margin, yPos);
          doc.text(truncateIfNeeded(prioritizedLinks[1], maxWidthPerColumn), pageWidth - margin, yPos, { align: 'right' });
        } else if (prioritizedLinks.length >= 3) {
          doc.text(truncateIfNeeded(prioritizedLinks[0], maxWidthPerColumn), margin, yPos);
          doc.text(truncateIfNeeded(prioritizedLinks[1], maxWidthPerColumn), pageWidth / 2, yPos, { align: 'center' });
          doc.text(truncateIfNeeded(prioritizedLinks[2], maxWidthPerColumn), pageWidth - margin, yPos, { align: 'right' });
        }
        
        yPos += 5;
      }
      
      // Role & Portfolio - only if they fit
      if (safeUserData.Member_Type || safeUserData.Portfolio) {
        let roleText = '';
        if (safeUserData.Member_Type) roleText += `Role: ${safeUserData.Member_Type}`;
        if (safeUserData.Portfolio) {
          if (roleText) roleText += ' | ';
          roleText += `Portfolio: ${safeUserData.Portfolio}`;
        }
        
        doc.text(truncateIfNeeded(roleText, contentWidth), pageWidth / 2, yPos, { align: 'center' });
        yPos += 8;
      }
      
      // Increased gap between header and content sections
      yPos = 55; // Increased from 45 to 55 to create a larger gap after header section
      
      // ===== PROFESSIONAL SUMMARY SECTION =====
      if (safeUserData.About && safeUserData.About.trim() !== '') {
        addSection('Professional Summary');
        addTextWithWrapping(safeUserData.About, margin, normalFontSize);
        yPos += 4;
      }
      
      // The rest of the sections remain unchanged
      // ===== SKILLS SECTION =====
      if (safeUserData.Skills.length > 0) {
        addSection('Skills');
        
        // Group skills by category
        const skillsByCategory: Record<string, string[]> = {};
        
        safeUserData.Skills.forEach(skill => {
          if (!skill || typeof skill !== 'object') return;
          
          const category = (skill.category || 'Other') as string;
          const name = (skill.name || 'Unnamed skill') as string;
          
          if (!skillsByCategory[category]) {
            skillsByCategory[category] = [];
          }
          skillsByCategory[category].push(name);
        });
        
        Object.entries(skillsByCategory).forEach(([category, skills]) => {
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          
          // Ensure we have enough space for this category
          if (!willContentFitOnPage(10)) {
            addNewPage();
          }
          
          const categoryLabelWidth = doc.getTextWidth(`${category}: `);
          doc.text(`${category}: `, margin, yPos);
          
          doc.setFont('helvetica', 'normal');
          const skillsText = skills.join(', ');
          
          const skillLines = doc.splitTextToSize(skillsText, contentWidth - categoryLabelWidth);
          doc.text(skillLines, margin + categoryLabelWidth, yPos);
          
          yPos += (skillLines.length * 4) + 2;
        });
        
        yPos += 4;
      }
      
      // ===== EXPERIENCE SECTION =====
      if (safeUserData.Experience && safeUserData.Experience.length > 0) {
        addSection('Work Experience');
        
        safeUserData.Experience.forEach((exp: any) => {
          if (!exp || typeof exp !== 'object') return;
          
          const title = exp.title || 'Untitled Position';
          const company = exp.company || '';
          const startDate = exp.startDate || '';
          const endDate = exp.isCurrentlyWorking ? 'Present' : (exp.endDate || '');
          const location = exp.location || '';
          const description = exp.description || '';
          
          // Calculate minimum height needed
          const minHeight = 16; // Basic height for title + dates
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Format: Job Title at Company
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          const headingText = company ? `${title} at ${company}` : title;
          doc.text(headingText, margin, yPos);
          
          // Format: Date range (right-aligned)
          doc.setFont('helvetica', 'italic');
          const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : '';
          if (dateRange) {
            doc.text(dateRange, pageWidth - margin, yPos, { align: 'right' });
          }
          
          yPos += 4;
          
          // Location if available
          if (location) {
            doc.setFontSize(smallFontSize);
            doc.setFont('helvetica', 'normal');
            doc.text(location, margin, yPos);
            yPos += 4;
          }
          
          // Description with bullet points if available
          if (description) {
            doc.setFontSize(normalFontSize);
            doc.setFont('helvetica', 'normal');
            
            // Try to parse description as JSON for bullet points
            try {
              const descriptionObj = typeof description === 'string' 
                ? JSON.parse(description) 
                : description;
              
              if (Array.isArray(descriptionObj)) {
                descriptionObj.forEach(item => {
                  if (typeof item === 'string' && item.trim()) {
                    addBulletPoint(item);
                  }
                });
              } else if (typeof description === 'string') {
                addTextWithWrapping(description, margin, normalFontSize);
              }
            } catch (e) {
              // If parsing fails, just use the raw text
              if (typeof description === 'string' && description.trim()) {
                addTextWithWrapping(description, margin, normalFontSize);
              }
            }
          }
          
          yPos += 5; // Add extra spacing between experiences
        });
      }
      
      // ===== EDUCATION SECTION =====
      if (safeUserData.Education && safeUserData.Education.length > 0) {
        addSection('Education');
        
        safeUserData.Education.forEach((edu: any) => {
          if (!edu || typeof edu !== 'object') return;
          
          const degree = edu.degree || '';
          const institution = edu.institution || 'Unnamed Institution';
          const startDate = edu.startDate || '';
          const endDate = edu.isCurrentlyStudying ? 'Present' : (edu.endDate || '');
          const location = edu.location || '';
          const description = edu.description || '';
          
          // Calculate minimum height needed
          const minHeight = 16; // Basic height for title + dates
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Format: Degree at Institution
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          const headingText = degree ? `${degree} at ${institution}` : institution;
          doc.text(headingText, margin, yPos);
          
          // Format: Date range (right-aligned)
          doc.setFont('helvetica', 'italic');
          const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : '';
          if (dateRange) {
            doc.text(dateRange, pageWidth - margin, yPos, { align: 'right' });
          }
          
          yPos += 4;
          
          // Location if available
          if (location) {
            doc.setFontSize(smallFontSize);
            doc.setFont('helvetica', 'normal');
            doc.text(location, margin, yPos);
            yPos += 4;
          }
          
          // Description with bullet points if available
          if (description) {
            doc.setFontSize(normalFontSize);
            doc.setFont('helvetica', 'normal');
            
            // Try to parse description as JSON for bullet points
            try {
              const descriptionObj = typeof description === 'string' 
                ? JSON.parse(description) 
                : description;
              
              if (Array.isArray(descriptionObj)) {
                descriptionObj.forEach(item => {
                  if (typeof item === 'string' && item.trim()) {
                    addBulletPoint(item);
                  }
                });
              } else if (typeof description === 'string') {
                addTextWithWrapping(description, margin, normalFontSize);
              }
            } catch (e) {
              // If parsing fails, just use the raw text
              if (typeof description === 'string' && description.trim()) {
                addTextWithWrapping(description, margin, normalFontSize);
              }
            }
          }
          
          yPos += 5; // Add extra spacing between education items
        });
      }
      
      // The remaining sections continue as before...
      // ===== PROJECTS SECTION =====
      if (safeUserData.Projects && safeUserData.Projects.length > 0) {
        addSection('Projects');
        
        safeUserData.Projects.forEach((project: any) => {
          if (!project || typeof project !== 'object') return;
          
          const title = project.title || 'Untitled Project';
          const description = project.description || '';
          
          // Calculate minimum height needed
          const minHeight = 10; // Basic height for title
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Project Title
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          doc.text(title, margin, yPos);
          yPos += 4;
          
          // Project Description
          if (description) {
            doc.setFont('helvetica', 'normal');
            addTextWithWrapping(description, margin, normalFontSize);
          }
          
          yPos += 4; // Add extra spacing between projects
        });
      }
      
      // ===== RECOMMENDATIONS SECTION (TESTIMONIALS) =====
      if (safeUserData.Recommendations && safeUserData.Recommendations.length > 0) {
        addSection('Recommendations & Testimonials');
        
        safeUserData.Recommendations.forEach((rec: any) => {
          if (!rec || typeof rec !== 'object') return;
          
          const title = rec.title || '';
          const description = rec.description || '';
          const link = rec.link || '';
          
          // Calculate minimum height needed
          const minHeight = 10; // Basic height for title
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Recommendation Title
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          doc.text(title || 'Recommendation', margin, yPos);
          yPos += 4;
          
          // Recommendation Description
          if (description) {
            doc.setFont('helvetica', 'italic');
            // Add quotation marks to make it look like a testimonial
            addTextWithWrapping(`"${description}"`, margin, normalFontSize, 'italic');
          }
          
          // Link if available
          if (link) {
            doc.setFontSize(smallFontSize);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 255); // Blue color for links
            doc.text(`Reference: ${link}`, margin, yPos);
            doc.setTextColor(0, 0, 0); // Reset color
            yPos += 3;
          }
          
          yPos += 4; // Add extra spacing between recommendations
        });
      }
      
      // ===== CAUSES SECTION =====
      if (safeUserData.Causes && safeUserData.Causes.length > 0) {
        addSection('Causes I Support');
        
        safeUserData.Causes.forEach((cause: any) => {
          if (!cause || typeof cause !== 'object') return;
          
          const title = cause.title || 'Untitled Cause';
          const description = cause.description || '';
          const support = cause.support || ''; // How they've supported the cause
          
          // Calculate minimum height needed
          const minHeight = 10; // Basic height for title
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Cause Title
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          doc.text(title, margin, yPos);
          yPos += 4;
          
          // Cause Description
          if (description) {
            doc.setFont('helvetica', 'normal');
            addTextWithWrapping(description, margin, normalFontSize);
          }
          
          // How they've supported the cause
          if (support) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(smallFontSize);
            addTextWithWrapping(`How I've contributed: ${support}`, margin, smallFontSize, 'italic');
          }
          
          yPos += 4; // Add extra spacing between causes
        });
      }
      
      // ===== LICENSES & CERTIFICATIONS SECTION =====
      if ((safeUserData.Licenses && safeUserData.Licenses.length > 0) || 
         (safeUserData.Certifications && safeUserData.Certifications.length > 0)) {
        addSection('Licenses & Certifications');
        
        // Process Licenses
        if (safeUserData.Licenses && safeUserData.Licenses.length > 0) {
          safeUserData.Licenses.forEach((license: any) => {
            if (!license || typeof license !== 'object') return;
            
            const title = license.title || 'Untitled License';
            const description = license.description || '';
            
            // Calculate minimum height needed
            const minHeight = 10; // Basic height for title
            if (!willContentFitOnPage(minHeight)) {
              addNewPage();
            }
            
            // License Title
            doc.setFontSize(normalFontSize);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, yPos);
            yPos += 4;
            
            // License Description
            if (description) {
              doc.setFont('helvetica', 'normal');
              addTextWithWrapping(description, margin, normalFontSize);
            }
            
            yPos += 4; // Add extra spacing between licenses
          });
        }
        
        // Process Certifications
        if (safeUserData.Certifications && safeUserData.Certifications.length > 0) {
          safeUserData.Certifications.forEach((cert: any) => {
            if (!cert || typeof cert !== 'object') return;
            
            const title = cert.title || 'Untitled Certification';
            const description = cert.description || '';
            
            // Calculate minimum height needed
            const minHeight = 10; // Basic height for title
            if (!willContentFitOnPage(minHeight)) {
              addNewPage();
            }
            
            // Certification Title
            doc.setFontSize(normalFontSize);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, yPos);
            yPos += 4;
            
            // Certification Description
            if (description) {
              doc.setFont('helvetica', 'normal');
              addTextWithWrapping(description, margin, normalFontSize);
            }
            
            yPos += 4; // Add extra spacing between certifications
          });
        }
      }
      
      // ===== HONORS & AWARDS SECTION =====
      if (safeUserData.Honors && safeUserData.Honors.length > 0) {
        addSection('Honors & Awards');
        
        safeUserData.Honors.forEach((honor: any) => {
          if (!honor || typeof honor !== 'object') return;
          
          const title = honor.title || 'Untitled Award';
          const issuer = honor.issuer || '';
          const date = honor.date || '';
          const description = honor.description || '';
          
          // Calculate minimum height needed
          const minHeight = 12; // Basic height for title and issuer
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Honor/Award Title
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          doc.text(title, margin, yPos);
          
          // Date (right-aligned)
          if (date) {
            doc.setFont('helvetica', 'italic');
            doc.text(date, pageWidth - margin, yPos, { align: 'right' });
          }
          
          yPos += 4;
          
          // Issuer
          if (issuer) {
            doc.setFont('helvetica', 'normal');
            doc.text(`Issuer: ${issuer}`, margin, yPos);
            yPos += 4;
          }
          
          // Description
          if (description) {
            doc.setFont('helvetica', 'normal');
            addTextWithWrapping(description, margin, normalFontSize);
          }
          
          yPos += 4; // Add extra spacing between honors
        });
      }
      
      // ===== VOLUNTEER EXPERIENCE SECTION =====
      if (safeUserData.VolunteerExperience && safeUserData.VolunteerExperience.length > 0) {
        addSection('Volunteer Experience');
        
        safeUserData.VolunteerExperience.forEach((volExp: any) => {
          if (!volExp || typeof volExp !== 'object') return;
          
          const title = volExp.title || 'Untitled Volunteer Position';
          const description = volExp.description || '';
          
          // Calculate minimum height needed
          const minHeight = 10; // Basic height for title
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Volunteer Title
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          doc.text(title, margin, yPos);
          yPos += 4;
          
          // Volunteer Description
          if (description) {
            doc.setFont('helvetica', 'normal');
            addTextWithWrapping(description, margin, normalFontSize);
          }
          
          yPos += 4; // Add extra spacing between volunteer experiences
        });
      }
      
      // ===== TEST SCORES SECTION =====
      if (safeUserData.TestScores && safeUserData.TestScores.length > 0) {
        addSection('Test Scores');
        
        safeUserData.TestScores.forEach((test: any) => {
          if (!test || typeof test !== 'object') return;
          
          const title = test.title || 'Untitled Test';
          const score = test.score || '';
          const description = test.description || '';
          
          // Calculate minimum height needed
          const minHeight = 10; // Basic height for title
          if (!willContentFitOnPage(minHeight)) {
            addNewPage();
          }
          
          // Test Title
          doc.setFontSize(normalFontSize);
          doc.setFont('helvetica', 'bold');
          doc.text(title, margin, yPos);
          
          // Score (right-aligned)
          if (score) {
            doc.text(`Score: ${score}`, pageWidth - margin, yPos, { align: 'right' });
          }
          
          yPos += 4;
          
          // Description
          if (description) {
            doc.setFont('helvetica', 'normal');
            addTextWithWrapping(description, margin, normalFontSize);
          }
          
          yPos += 4; // Add extra spacing between test scores
        });
      }
      
      // ===== FOOTER =====
      // Add a footer with date on all pages
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(smallFontSize);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(128, 128, 128); // Gray color for footer
        doc.text(
          `Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${totalPages}`, 
          pageWidth - margin, 
          pageHeight - 10, 
          { align: 'right' }
        );
      }
      
      // Save the PDF with a properly formatted name
      doc.save(`${safeUserData.Name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error("Error in PDF generation:", error);
    }
    
    // Always call the completion callback, even if there was an error
    if (onComplete) {
      onComplete();
    }
  };

  // This component doesn't render anything visible - it just triggers the PDF download
  return null;
};

export default ResumeDownload;