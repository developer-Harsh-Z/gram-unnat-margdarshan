import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

type Language = 'en' | 'hi' | 'kn';

interface CareerCategory {
  [key: string]: {
    [key in Language]: string;
  };
}

interface CareerDescription {
  [key: string]: {
    description: {
      [key in Language]: string;
    };
  };
}

// Career categories and their descriptions
const careerCategories: CareerCategory = {
  agriculture: {
    en: 'Agriculture & Farming',
    hi: 'कृषि और खेती',
    kn: 'ಕೃಷಿ ಮತ್ತು ಕೃಷಿ'
  },
  technology: {
    en: 'Technology & Digital Skills',
    hi: 'प्रौद्योगिकी और डिजिटल कौशल',
    kn: 'ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಡಿಜಿಟಲ್ ಕೌಶಲ್ಯಗಳು'
  },
  entrepreneurship: {
    en: 'Entrepreneurship & Business',
    hi: 'उद्यमिता और व्यवसाय',
    kn: 'ಉದ್ಯಮಶೀಲತೆ ಮತ್ತು ವ್ಯವಹಾರ'
  },
  education: {
    en: 'Education & Training',
    hi: 'शिक्षा और प्रशिक्षण',
    kn: 'ಶಿಕ್ಷಣ ಮತ್ತು ತರಬೇತಿ'
  },
  healthcare: {
    en: 'Healthcare & Wellness',
    hi: 'स्वास्थ्य सेवा और कल्याण',
    kn: 'ಆರೋಗ್ಯ ಸೇವೆ ಮತ್ತು ಕ್ಷೇಮ'
  },
  crafts: {
    en: 'Traditional Crafts & Arts',
    hi: 'पारंपरिक शिल्प और कला',
    kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಕುಶಲಕಲೆಗಳು ಮತ್ತು ಕಲೆಗಳು'
  }
};

const careerDescriptions: CareerDescription = {
  agriculture: {
    description: {
      en: 'You have a strong connection with nature and farming practices. Consider careers in modern agriculture, organic farming, or agricultural technology.',
      hi: 'आपका प्रकृति और खेती से गहरा संबंध है। आधुनिक कृषि, जैविक खेती, या कृषि प्रौद्योगिकी में करियर पर विचार करें।',
      kn: 'ನೀವು ಪ್ರಕೃತಿ ಮತ್ತು ಕೃಷಿ ಪದ್ಧತಿಗಳೊಂದಿಗೆ ಬಲವಾದ ಸಂಬಂಧವನ್ನು ಹೊಂದಿದ್ದೀರಿ. ಆಧುನಿಕ ಕೃಷಿ, ಸಾವಯವ ಕೃಷಿ, ಅಥವಾ ಕೃಷಿ ತಂತ್ರಜ್ಞಾನದಲ್ಲಿ ವೃತ್ತಿಗಳನ್ನು ಪರಿಗಣಿಸಿ.'
    }
  },
  technology: {
    description: {
      en: 'You show interest in technology and digital solutions. Consider careers in IT, digital marketing, or rural technology implementation.',
      hi: 'आप प्रौद्योगिकी और डिजिटल समाधानों में रुचि दिखाते हैं। आईटी, डिजिटಲ್ मार्केटिंग, या ग्रामीण प्रौद्योगिकी कार्यान्वयन में करियर पर विचार करें।',
      kn: 'ನೀವು ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಡಿಜಿಟಲ್ ಪರಿಹಾರಗಳಲ್ಲಿ ಆಸಕ್ತಿ ತೋರಿಸುತ್ತೀರಿ. ಐಟಿ, ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್, ಅಥವಾ ಗ್ರಾಮೀಣ ತಂತ್ರಜ್ಞಾನ ಅನುಷ್ಠಾನದಲ್ಲಿ ವೃತ್ತಿಗಳನ್ನು ಪರಿಗಣಿಸಿ.'
    }
  },
  entrepreneurship: {
    description: {
      en: 'You have strong business acumen and leadership potential. Consider starting your own rural enterprise or working in rural business development.',
      hi: 'आपमें मजबूत व्यावसायिक समझ और नेतृत्व क्षमता है। अपना ग्रामीण उद्यम शुरू करने या ग्रामीण व्यवसाय विकास में काम करने पर विचार करें।',
      kn: 'ನೀವು ಬಲವಾದ ವ್ಯಾಪಾರ ಜಾಣತನ ಮತ್ತು ನಾಯಕತ್ವ ಸಾಮರ್ಥ್ಯವನ್ನು ಹೊಂದಿದ್ದೀರಿ. ನಿಮ್ಮದೇ ಆದ ಗ್ರಾಮೀಣ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಲು ಅಥವಾ ಗ್ರಾಮೀಣ ವ್ಯವಹಾರ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿ ಕೆಲಸ ಮಾಡಲು ಪರಿಗಣಿಸಿ.'
    }
  },
  education: {
    description: {
      en: 'You have a passion for teaching and community development. Consider careers in education, vocational training, or community leadership.',
      hi: 'आपमें शिक्षण और सामुदायिक विकास के प्रति जुनून है। शिक्षा, व्यावसायिक प्रशिक्षण, या सामुदायिक नेतृत्व में करियर पर विचार करें।',
      kn: 'ನೀವು ಬೋಧನೆ ಮತ್ತು ಸಮುದಾಯ ಅಭಿವೃದ್ಧಿಗಾಗಿ ಉತ್ಸಾಹವನ್ನು ಹೊಂದಿದ್ದೀರಿ. ಶಿಕ್ಷಣ, ವೃತ್ತಿಪರ ತರಬೇತಿ, ಅಥವಾ ಸಮುದಾಯ ನಾಯಕತ್ವದಲ್ಲಿ ವೃತ್ತಿಗಳನ್ನು ಪರಿಗಣಿಸಿ.'
    }
  },
  healthcare: {
    description: {
      en: 'You show interest in helping others and healthcare. Consider careers in rural healthcare, traditional medicine, or community health services.',
      hi: 'आप दूसरों की मदद और स्वास्थ्य सेवा में रुचि दिखाते हैं। ग्रामीण स्वास्थ्य सेवा, पारंपरिक चिकित्सा, या सामुदायिक स्वास्थ्य सेवाओं में करियर पर विचार करें।',
      kn: 'ನೀವು ಇತರರಿಗೆ ಸಹಾಯ ಮಾಡುವ ಮತ್ತು ಆರೋಗ್ಯ ಸೇವೆಯಲ್ಲಿ ಆಸಕ್ತಿ ತೋರಿಸುತ್ತೀರಿ. ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಸೇವೆ, ಸಾಂಪ್ರದಾಯಿಕ ವೈದ್ಯಕೀಯ, ಅಥವಾ ಸಮುದಾಯ ಆರೋಗ್ಯ ಸೇವೆಗಳಲ್ಲಿ ವೃತ್ತಿಗಳನ್ನು ಪರಿಗಣಿಸಿ.'
    }
  },
  crafts: {
    description: {
      en: 'You have a creative spirit and appreciation for traditional arts. Consider careers in traditional crafts, cultural preservation, or rural tourism.',
      hi: 'आपमें रचनात्मक भावना और पारंपरिक कलाओं के प्रति सम्मान है। पारंपरिक शिल्प, सांस्कृतिक संरक्षण, या ग्रामीण पर्यटन में करियर पर विचार करें।',
      kn: 'ನೀವು ಸೃಜನಶೀಲ ಭಾವನೆ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕಲೆಗಳಿಗೆ ಮೆಚ್ಚುಗೆ ಹೊಂದಿದ್ದೀರಿ. ಸಾಂಪ್ರದಾಯಿಕ ಕುಶಲಕಲೆಗಳು, ಸಾಂಸ್ಕೃತಿಕ ಸಂರಕ್ಷಣೆ, ಅಥವಾ ಗ್ರಾಮೀಣ ಪ್ರವಾಸೋದ್ಯಮದಲ್ಲಿ ವೃತ್ತಿಗಳನ್ನು ಪರಿಗಣಿಸಿ.'
    }
  }
};

const CareerQuizPage = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [language, setLanguage] = useState('en');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(25).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{[key: string]: number}>({});

  // Personalized questions focused on rural background
  const questions = [
    {
      en: 'How do you feel about working with agricultural technology?',
      hi: 'कृषि प्रौद्योगिकी के साथ काम करने के बारे में आप कैसा महसूस करते हैं?',
      kn: 'ಕೃಷಿ ತಂತ್ರಜ್ಞಾನದೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವ ಬಗ್ಗೆ ನೀವು ಹೇಗೆ ಭಾವಿಸುತ್ತೀರಿ?',
      options: ['Very Interested', 'Somewhat Interested', 'Neutral', 'Not Interested'],
      category: 'agriculture'
    },
    {
      en: 'How comfortable are you with using digital tools and technology?',
      hi: 'डिजिटल उपकरणों और प्रौद्योगिकी का उपयोग करने में आप कितने सहज हैं?',
      kn: 'ಡಿಜಿಟಲ್ ಉಪಕರಣಗಳು ಮತ್ತು ತಂತ್ರಜ್ಞಾನವನ್ನು ಬಳಸುವಲ್ಲಿ ನೀವು ಎಷ್ಟು ಆರಾಮದಾಯಕ?',
      options: ['Very Comfortable', 'Somewhat Comfortable', 'Neutral', 'Not Comfortable'],
      category: 'technology'
    },
    {
      en: 'Would you be interested in starting your own business in your village?',
      hi: 'क्या आप अपने गाँव में अपना व्यवसाय शुरू करने में रुचि रखेंगे?',
      kn: 'ನಿಮ್ಮ ಹಳ್ಳಿಯಲ್ಲಿ ನಿಮ್ಮದೇ ಆದ ವ್ಯವಹಾರವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನೀವು ಆಸಕ್ತಿ ಹೊಂದಿರುವಿರಾ?',
      options: ['Definitely Yes', 'Maybe', 'Probably Not', 'Not Interested'],
      category: 'entrepreneurship'
    },
    {
      en: 'How do you feel about teaching or training others in your community?',
      hi: 'अपने समुदाय में दूसरों को पढ़ाने या प्रशिक्षित करने के बारे में आप कैसा महसूस करते हैं?',
      kn: 'ನಿಮ್ಮ ಸಮುದಾಯದಲ್ಲಿ ಇತರರಿಗೆ ಬೋಧಿಸುವ ಅಥವಾ ತರಬೇತಿ ನೀಡುವ ಬಗ್ಗೆ ನೀವು ಹೇಗೆ ಭಾವಿಸುತ್ತೀರಿ?',
      options: ['Very Interested', 'Somewhat Interested', 'Neutral', 'Not Interested'],
      category: 'education'
    },
    // Add more questions here...
  ];

  const handleLanguageChange = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const calculateResults = () => {
    const categoryScores: {[key: string]: number} = {};
    
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer !== -1) {
        const category = question.category;
        categoryScores[category] = (categoryScores[category] || 0) + (answer === 0 ? 3 : answer === 1 ? 2 : answer === 2 ? 1 : 0);
      }
    });

    setResults(categoryScores);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    calculateResults();
    toast({
      title: 'Assessment Completed',
      description: 'Your personalized career recommendations are ready!',
    });
    setShowResults(true);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{t('careerQuiz')}</CardTitle>
            <p className="text-center text-gray-600">
              {language === 'en' ? 'Discover your strengths and interests' :
               language === 'hi' ? 'अपनी ताकत और रुचियों को खोजें' :
               'ನಿಮ್ಮ ಶಕ್ತಿಗಳು ಮತ್ತು ಆಸಕ್ತಿಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ'}
            </p>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <>
                <div className="mb-4">
                  <Label>Select Language:</Label>
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={() => handleLanguageChange('en')}>English</Button>
                    <Button onClick={() => handleLanguageChange('hi')}>हिंदी</Button>
                    <Button onClick={() => handleLanguageChange('kn')}>ಕನ್ನಡ</Button>
                  </div>
                </div>
                <div className="mb-4">
                  <Progress value={(currentQuestion / questions.length) * 100} className="mb-4" />
                  <h3 className="text-lg font-medium mb-4">
                    {questions[currentQuestion][language as keyof typeof questions[0]]}
                  </h3>
                  <RadioGroup
                    value={answers[currentQuestion].toString()}
                    onValueChange={(value) => handleAnswer(parseInt(value))}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex justify-between">
                  <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
                    Previous
                  </Button>
                  {currentQuestion === questions.length - 1 ? (
                    <Button onClick={handleSubmit}>Submit</Button>
                  ) : (
                    <Button onClick={handleNext}>Next</Button>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-center mb-6">
                  {language === 'en' ? 'Your Career Recommendations' :
                   language === 'hi' ? 'आपके करियर सुझाव' :
                   'ನಿಮ್ಮ ವೃತ್ತಿ ಶಿಫಾರಸುಗಳು'}
                </h3>
                {Object.entries(results).map(([category, score]) => (
                  <div key={category} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {careerCategories[category][language]}
                    </h4>
                    <p className="text-gray-600">
                      {careerDescriptions[category].description[language]}
                    </p>
                    <Progress value={(score / (questions.length * 3)) * 100} className="mt-2" />
                  </div>
                ))}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button onClick={() => setShowResults(false)}>
                    {language === 'en' ? 'Retake Assessment' :
                     language === 'hi' ? 'मूल्यांकन फिर से करें' :
                     'ಮೌಲ್ಯಮಾಪನವನ್ನು ಮತ್ತೆ ತೆಗೆದುಕೊಳ್ಳಿ'}
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                  >
                    {language === 'en' ? 'Go to Home' :
                     language === 'hi' ? 'होम पर जाएं' :
                     'ಹೋಮ್‌ಗೆ ಹೋಗಿ'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerQuizPage; 