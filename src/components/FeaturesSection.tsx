import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Users, Target, BookOpen } from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: t('features.education.title'),
      description: t('features.education.description'),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('features.community.title'),
      description: t('features.community.description'),
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('features.career.title'),
      description: t('features.career.description'),
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t('features.skills.title'),
      description: t('features.skills.description'),
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('featuresTitle')}
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-blue-800 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
