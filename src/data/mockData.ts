
import { Opportunity, SuccessStory, ParentsGuide, FAQ } from './models';

export const opportunitiesData: Opportunity[] = [
  {
    id: "1",
    title: "Digital Skills Training Program",
    organization: "Karnataka Skill Development Corporation",
    location: "Hubballi, Karnataka",
    category: "Training",
    description: "Three-month training program in basic digital skills including computer operation, MS Office, email, and internet. Suitable for high school graduates with minimal computer exposure.",
    deadline: "June 30, 2025",
    tags: ["Digital Skills", "Certificate", "Free", "Beginner"],
    requirements: ["Age 18-30", "High School Pass", "Basic English"],
    applicationUrl: "https://example.com/apply",
    contact: {
      email: "contact@ksdc.org",
      phone: "+91-9876543210"
    },
    createdAt: new Date("2025-05-01")
  },
  {
    id: "2",
    title: "Solar Panel Installation Apprenticeship",
    organization: "GreenEnergy Solutions",
    location: "Belgaum, Karnataka",
    category: "Apprenticeship",
    description: "Learn solar panel installation and maintenance through hands-on training. Stipend provided during 6-month apprenticeship period with possibility of permanent employment.",
    deadline: "July 15, 2025",
    tags: ["Renewable Energy", "Stipend", "Technical", "Rural Focus"],
    requirements: ["ITI or Technical Background", "Willingness to work outdoors", "Local residents preferred"],
    applicationUrl: "https://example.com/apply",
    contact: {
      email: "hr@greenenergy.com",
      phone: "+91-8765432109"
    },
    createdAt: new Date("2025-05-05")
  },
  {
    id: "3",
    title: "Rural Healthcare Assistant Program",
    organization: "Karnataka Health Department",
    location: "Multiple Districts, Karnataka",
    category: "Job",
    description: "Positions for healthcare assistants to work in rural primary healthcare centers. 3-month training provided followed by job placement in your home district.",
    deadline: "June 10, 2025",
    tags: ["Healthcare", "Government", "Training + Job", "Women Preferred"],
    requirements: ["10+2 pass with Biology", "Age 20-35", "Local language proficiency"],
    applicationUrl: "https://example.com/apply",
    contact: {
      email: "recruitment@karhea.org",
      phone: "+91-7654321098"
    },
    createdAt: new Date("2025-05-03")
  },
  {
    id: "4",
    title: "Scholarship for Technical Education",
    organization: "Karnataka State Scholarship Fund",
    location: "Statewide, Karnataka",
    category: "Scholarship",
    description: "Full scholarship covering tuition fees for ITI/diploma courses in technical fields. Special focus on students from rural areas and agricultural backgrounds.",
    deadline: "August 20, 2025",
    tags: ["Scholarship", "Technical Education", "Full Coverage", "Rural Youth"],
    requirements: ["Age below 25", "Family income below 2L per annum", "Minimum 60% in qualifying exam"],
    applicationUrl: "https://example.com/apply",
    contact: {
      email: "scholarships@kssf.org",
      phone: "+91-6543210987"
    },
    createdAt: new Date("2025-05-10")
  },
  {
    id: "5",
    title: "Hospitality Training Program",
    organization: "Tourism & Hospitality Skill Council",
    location: "Mysuru, Karnataka",
    category: "Training",
    description: "Three-month residential training in hospitality skills including housekeeping, front office, and food & beverage service. Includes placement assistance.",
    deadline: "July 5, 2025",
    tags: ["Hospitality", "Residential", "Placement", "English Training"],
    requirements: ["10th pass", "Age 18-28", "Basic English understanding", "Willing to relocate post training"],
    applicationUrl: "https://example.com/apply",
    contact: {
      email: "training@thsc.org",
      phone: "+91-5432109876"
    },
    createdAt: new Date("2025-05-07")
  },
  {
    id: "6",
    title: "Agricultural Innovation Fellowship",
    organization: "Karnataka Agricultural Department",
    location: "Dharwad, Karnataka",
    category: "Training",
    description: "Six-month program for rural youth from farming backgrounds to learn modern agricultural techniques and technologies. Includes field visits and practical training.",
    deadline: "July 25, 2025",
    tags: ["Agriculture", "Technology", "Stipend", "Farming Background"],
    requirements: ["Agriculture background", "Age 20-35", "Basic literacy", "Interest in modern farming"],
    applicationUrl: "https://example.com/apply",
    contact: {
      email: "agri.fellowship@karnataka.gov.in",
      phone: "+91-4321098765"
    },
    createdAt: new Date("2025-05-12")
  }
];

export const successStoriesData: SuccessStory[] = [
  {
    id: "1",
    name: "Manjunath Koppal",
    age: 26,
    location: "Koppal, North Karnataka",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    story: "From a farming family with limited resources to becoming a solar installation technician with a stable income.",
    occupation: "Solar Panel Technician",
    background: "Son of a small farmer, completed ITI but couldn't find work near his village",
    journey: "Through RuralPath, Manjunath discovered a solar technician training program with accommodation provided. After completing the 4-month program, he was placed with a solar company that installs panels in rural areas. He now earns ₹18,000 per month.",
    advice: "Don't limit yourself to traditional jobs. New green technology sectors offer great opportunities even in rural areas.",
    createdAt: new Date("2025-04-01")
  },
  {
    id: "2",
    name: "Lakshmi Patil",
    age: 23,
    location: "Bagalkot, North Karnataka",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    story: "A school dropout who became a community health worker, now pursuing nursing studies through a scholarship.",
    occupation: "Community Health Worker",
    background: "Had to drop out after 10th standard to help family, interested in healthcare but no guidance",
    journey: "Lakshmi found a 6-month community health worker program through RuralPath that allowed her to train while staying in her village. After certification, she started working at the local PHC. Her performance led to a scholarship for nursing studies.",
    advice: "Start with whatever opportunity is available to you locally, perform well, and you can build towards your dream career step by step.",
    createdAt: new Date("2025-03-15")
  },
  {
    id: "3",
    name: "Basavaraj Hiremath",
    age: 28,
    location: "Gadag, North Karnataka",
    image: "https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    story: "Transformed from an unemployed graduate to a successful digital marketing entrepreneur serving local businesses.",
    occupation: "Digital Marketing Entrepreneur",
    background: "B.A. graduate who couldn't find suitable employment for two years after college",
    journey: "Through RuralPath's digital skills program, Basavaraj learned about online marketing. He started by helping local shops create social media presence, then expanded to build a small agency that now serves businesses across North Karnataka with a team of three people.",
    advice: "Look for problems around you that need solving. Sometimes the best opportunity is creating a service that your community needs.",
    createdAt: new Date("2025-02-20")
  },
  {
    id: "4",
    name: "Anitha Yadrami",
    age: 24,
    location: "Bidar, North Karnataka",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    story: "From helping at her family's small tailoring shop to becoming a skilled fashion design assistant through vocational training.",
    occupation: "Fashion Design Assistant",
    background: "Completed PUC, had basic tailoring skills from family business but wanted to advance",
    journey: "Anitha discovered a specialized garment design course through RuralPath that offered scholarships for rural women with basic tailoring skills. After the 8-month program, she found work with a designer in Bengaluru who values her knowledge of traditional embroidery techniques.",
    advice: "Your rural background and traditional skills can become your unique strength in the modern job market. Don't undervalue them.",
    createdAt: new Date("2025-01-25")
  }
];

export const parentsGuidesData: ParentsGuide[] = [
  {
    id: "1",
    title: "Understanding Today's Career Landscape",
    description: "A guide to help parents understand the modern job market and emerging career opportunities for rural youth.",
    category: "Career Guidance",
    content: "Detailed content about how the job market has evolved, what skills are in demand, and how traditional expectations need to adapt to support children's success in today's world.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    createdAt: new Date("2025-05-01")
  },
  {
    id: "2",
    title: "Supporting Your Child's Career Aspirations",
    description: "How parents can provide constructive support for their children's career goals and choices.",
    category: "Parent Support",
    content: "Strategies for having supportive conversations about career choices, balancing guidance with freedom, and helping children explore options without imposing decisions.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    createdAt: new Date("2025-04-20")
  },
  {
    id: "3",
    title: "Education Pathways After High School",
    description: "A comprehensive overview of education options available for rural students after completing high school.",
    category: "Education",
    content: "Explanation of different paths including ITI, polytechnic, degree colleges, vocational training, distance education, and how each pathway leads to different career opportunities.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    createdAt: new Date("2025-04-10")
  },
  {
    id: "4",
    title: "Financial Support for Education",
    description: "Information about scholarships, loans, and financial aid available for rural students pursuing higher education.",
    category: "Financial",
    content: "Detailed guide on government scholarships, educational loans with subsidized interest, CSR initiatives supporting rural education, and how to apply for financial assistance.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    createdAt: new Date("2025-03-28")
  },
  {
    id: "5",
    title: "Success Without Moving to Big Cities",
    description: "Career opportunities that allow your children to succeed professionally while staying close to home.",
    category: "Local Opportunities",
    content: "Information on careers in agriculture technology, rural healthcare, teaching, local government, tourism, and remote work opportunities that don't require migration to urban centers.",
    image: "https://images.unsplash.com/photo-1512699355324-f07e3106dae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    createdAt: new Date("2025-03-15")
  }
];

export const faqsData: FAQ[] = [
  {
    id: "1",
    question: "How can I help my child choose the right career?",
    answer: "Focus on understanding their interests and strengths rather than imposing your preferences. Encourage exploration of different fields, arrange conversations with people working in various sectors, and support them in testing out options through volunteering or short courses.",
    category: "Career Guidance"
  },
  {
    id: "2",
    question: "Is it necessary for my child to move to a big city for a good job?",
    answer: "Not necessarily. Many opportunities are emerging in rural and semi-urban areas, especially in sectors like agriculture technology, renewable energy, healthcare, education, and remote work. RuralPath can help identify opportunities that match your child's skills close to home.",
    category: "Location Concerns"
  },
  {
    id: "3",
    question: "What if we cannot afford higher education for our child?",
    answer: "Numerous scholarships and financial aid options exist specifically for rural students. Additionally, many skill development programs are free or have nominal fees, with some even providing stipends during training. RuralPath can guide you to appropriate financial support options.",
    category: "Financial"
  },
  {
    id: "4",
    question: "How important are English language skills for my child's career?",
    answer: "While English can open more opportunities, many successful careers are possible without advanced English skills. Several training programs include basic functional English as part of the curriculum. Focus first on skills and knowledge in their chosen field.",
    category: "Skills"
  },
  {
    id: "5",
    question: "What if my child wants to pursue a non-traditional career?",
    answer: "Today's job market values innovation and specialized skills. Non-traditional careers often face less competition and can be very rewarding. It's important to understand the path, required training, and job prospects - RuralPath counselors can provide guidance specific to these fields.",
    category: "Career Choices"
  },
  {
    id: "6",
    question: "How can I verify if a training program is legitimate?",
    answer: "Check if the program is affiliated with recognized institutions like NSDC, government departments, or established companies. Verify the certification's value, placement track record, and if possible, speak with past participants. RuralPath only lists verified opportunities.",
    category: "Education"
  }
];
