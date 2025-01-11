export interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  startDate: string;
  endDate: string;
  school: string;
  degree: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  year: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Social {
  custom?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
}

export interface ExtracurricularActivity {
  title: string;
  role: string;
  description: string;
  duration: string;
}

interface ContactInfo {
  email: string;
  number: string;
}

export interface HeaderProps{
  name:string;
  about:string;
  member_Type:string;
  Location:string;
  Personal_url:string;
  contact_info: ContactInfo;
}

export interface ProfileFormData {
  // Required fields
  name: string;
  email: string;
  portfolio: string;
  profileUrl: string;
  experiences: Experience[];
  education: Education[];

  // Optional fields
  phoneNo?: string;
  about?: string;
  social: Social;
  position?: string;
  dob?: string;
  image: File | null;
  theme: string;
  projects: Project[];
  achievements: Achievement[];
  branch?: string;
  year?: string;
  rollno?: string;
  extracurricular: ExtracurricularActivity[];
}
