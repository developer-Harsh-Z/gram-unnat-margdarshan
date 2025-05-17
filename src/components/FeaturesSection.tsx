
import React from 'react';
import { Check, Book, Users, Calendar } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Check size={32} className="text-blue-800" />,
      title: "Personalized Assessment",
      description: "Discover your strengths, interests, and aptitudes through our tailored assessment tools designed specifically for rural backgrounds."
    },
    {
      icon: <Book size={32} className="text-orange-500" />,
      title: "Skill Development",
      description: "Access curated training programs, courses, and resources that match your profile and help you develop in-demand skills."
    },
    {
      icon: <Users size={32} className="text-purple-500" />,
      title: "Local Opportunities",
      description: "Connect with local employers, apprenticeships, and job roles that are accessible from your location and suit your skill set."
    },
    {
      icon: <Calendar size={32} className="text-teal-500" />,
      title: "Government Schemes",
      description: "Stay updated on relevant government schemes, scholarships, and initiatives that can support your career journey."
    }
  ];

  return (
    <div className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How RuralPath Helps You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform is designed to bridge the gap between your aspirations and opportunities, 
            providing personalized guidance every step of the way.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg shadow-sm card-hover"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
