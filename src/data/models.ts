
// This file defines the data models for the application

export interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  language: string;
  location: {
    village: string;
    district: string;
  };
  mobile: string;
  education: Education;
  skills: string[];
  interests: string[];
  careerGoals: string;
  digitalAccess: string;
  relocation: string;
  createdAt: Date;
}

export interface Education {
  level: string;
  passingYear: string;
  institution: string;
  percentage: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  category: string; // "Training", "Job", "Scholarship", "Apprenticeship" 
  description: string;
  deadline: string;
  tags: string[];
  requirements: string[];
  applicationUrl: string;
  contact: {
    email: string;
    phone: string;
  };
  createdAt: Date;
}

export interface SuccessStory {
  id: string;
  name: string;
  age: number;
  location: string;
  image: string;
  story: string;
  occupation: string;
  background: string;
  journey: string;
  advice: string;
  createdAt: Date;
}

export interface ParentsGuide {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  image: string;
  createdAt: Date;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
