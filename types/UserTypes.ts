export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
  description: string;
}

export interface UserType {
  id: string;
  roll_no: string;
  created_at: any;
  name: string;
  email: string;
  phone_no: number;
  experience: Experience[];
  about: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    custom?: string;
  };
  portfolio: string;
  position: string;
  dob: any;
  image: string;
  theme: string;
  education: Education[];
  branch: string;
  year: number;
  slur: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface Projects {
  id: string;
  title: string;
  description: string;
  year: string;
}