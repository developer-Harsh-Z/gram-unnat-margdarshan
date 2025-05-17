import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CareerChatbot from '@/components/CareerChatbot';
import { Button } from '@/components/ui/button';

const CareerChatPage = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const language = i18n.language;

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            {language === 'en' ? 'AI Career Guidance Chat' :
             language === 'hi' ? 'AI करियर मार्गदर्शन चैट' :
             'AI ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ಚಾಟ್'}
          </h1>
          <p className="text-gray-600">
            {language === 'en' ? 'Get instant career guidance from our AI assistant' :
             language === 'hi' ? 'हमारे AI सहायक से तत्काल करियर मार्गदर्शन प्राप्त करें' :
             'ನಮ್ಮ AI ಸಹಾಯಕರಿಂದ ತ್ವರಿತ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ'}
          </p>
        </div>

        <CareerChatbot />

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            {language === 'en' ? 'Go to Home' :
             language === 'hi' ? 'होम पर जाएं' :
             'ಹೋಮ್‌ಗೆ ಹೋಗಿ'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerChatPage; 