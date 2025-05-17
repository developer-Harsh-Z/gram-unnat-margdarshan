import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { createCareerGuidanceSession, getUserCareerGuidanceSessions } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Session {
  id: string;
  date: string;
  time: string;
  topic: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

const CareerGuidancePage = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const topics = [
    { en: 'Career Path Planning', hi: 'करियर पथ योजना', kn: 'ವೃತ್ತಿ ಮಾರ್ಗ ಯೋಜನೆ' },
    { en: 'Skill Development', hi: 'कौशल विकास', kn: 'ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ' },
    { en: 'Education Guidance', hi: 'शिक्षा मार्गदर्शन', kn: 'ಶಿಕ್ಷಣ ಮಾರ್ಗದರ್ಶನ' },
    { en: 'Entrepreneurship', hi: 'उद्यमिता', kn: 'ಉದ್ಯಮಶೀಲತೆ' },
    { en: 'Rural Development', hi: 'ग्रामीण विकास', kn: 'ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ' }
  ];

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]);

  const loadSessions = async () => {
    setLoadingSessions(true);
    setError(null);
    try {
      const userSessions = await getUserCareerGuidanceSessions(user?.id || '');
      setSessions(userSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
      setError(
        language === 'en' ? 'Failed to load sessions. Please try again.' :
        language === 'hi' ? 'सत्र लोड करने में विफल। कृपया पुनः प्रयास करें।' :
        'ಸೆಷನ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
      );
    } finally {
      setLoadingSessions(false);
    }
  };

  const handleLanguageChange = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!date || !time || !topic) {
      setBookingError(
        language === 'en' ? 'Please fill all required fields' :
        language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें' :
        'ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರಿಸಿ'
      );
      return;
    }

    setLoading(true);
    setBookingError(null);
    try {
      const sessionData = {
        user_id: user.id,
        date: format(date, 'yyyy-MM-dd'),
        time,
        topic,
        description,
        status: 'pending' as const
      };

      await createCareerGuidanceSession(sessionData);
      await loadSessions();

      toast({
        title: language === 'en' ? 'Booking Successful' :
               language === 'hi' ? 'बुकिंग सफल' :
               'ಬುಕಿಂಗ್ ಯಶಸ್ವಿ',
        description: language === 'en' ? 'We will contact you shortly with confirmation details.' :
                    language === 'hi' ? 'हम जल्द ही पुष्टि विवरण के साथ आपसे संपर्क करेंगे।' :
                    'ನಾವು ಶೀಘ್ರದಲ್ಲೇ ದೃಢೀಕರಣ ವಿವರಗಳೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.'
      });

      // Reset form
      setDate(undefined);
      setTime('');
      setTopic('');
      setDescription('');
    } catch (error) {
      console.error('Error booking session:', error);
      setBookingError(
        language === 'en' ? 'Failed to book session. Please try again.' :
        language === 'hi' ? 'सत्र बुक करने में विफल। कृपया पुनः प्रयास करें।' :
        'ಸೆಷನ್ ಬುಕ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="book" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">
              {language === 'en' ? 'Book Session' :
               language === 'hi' ? 'सत्र बुक करें' :
               'ಸೆಷನ್ ಬುಕ್ ಮಾಡಿ'}
            </TabsTrigger>
            <TabsTrigger value="sessions">
              {language === 'en' ? 'My Sessions' :
               language === 'hi' ? 'मेरे सत्र' :
               'ನನ್ನ ಸೆಷನ್‌ಗಳು'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {language === 'en' ? 'Personalized Career Guidance' :
                   language === 'hi' ? 'व्यक्तिगत करियर मार्गदर्शन' :
                   'ವೈಯಕ್ತಿಕ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ'}
                </CardTitle>
                <p className="text-center text-gray-600">
                  {language === 'en' ? 'Book a one-on-one session with our career experts' :
                   language === 'hi' ? 'हमारे करियर विशेषज्ञों के साथ एक-एक सत्र बुक करें' :
                   'ನಮ್ಮ ವೃತ್ತಿ ತಜ್ಞರೊಂದಿಗೆ ಒಂದು-ಒಂದು ಸೆಷನ್ ಬುಕ್ ಮಾಡಿ'}
                </p>
              </CardHeader>
              <CardContent>
                {bookingError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>
                      {language === 'en' ? 'Error' :
                       language === 'hi' ? 'त्रुटि' :
                       'ದೋಷ'}
                    </AlertTitle>
                    <AlertDescription>{bookingError}</AlertDescription>
                  </Alert>
                )}

                <div className="mb-4">
                  <div className="flex space-x-2 justify-center mb-6">
                    <Button onClick={() => handleLanguageChange('en')}>English</Button>
                    <Button onClick={() => handleLanguageChange('hi')}>हिंदी</Button>
                    <Button onClick={() => handleLanguageChange('kn')}>ಕನ್ನಡ</Button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Select Date' :
                       language === 'hi' ? 'तारीख चुनें' :
                       'ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : 
                            language === 'en' ? 'Pick a date' :
                            language === 'hi' ? 'तारीख चुनें' :
                            'ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Select Time' :
                       language === 'hi' ? 'समय चुनें' :
                       'ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                    </label>
                    <Select onValueChange={setTime} value={time}>
                      <SelectTrigger>
                        <SelectValue placeholder={
                          language === 'en' ? 'Select a time slot' :
                          language === 'hi' ? 'समय स्लॉट चुनें' :
                          'ಸಮಯ ಸ್ಲಾಟ್ ಆಯ್ಕೆಮಾಡಿ'
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Select Topic' :
                       language === 'hi' ? 'विषय चुनें' :
                       'ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ'}
                    </label>
                    <Select onValueChange={setTopic} value={topic}>
                      <SelectTrigger>
                        <SelectValue placeholder={
                          language === 'en' ? 'Select a topic' :
                          language === 'hi' ? 'विषय चुनें' :
                          'ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ'
                        } />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((t) => (
                          <SelectItem key={t.en} value={t.en}>
                            {t[language as keyof typeof t]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'en' ? 'Additional Information' :
                       language === 'hi' ? 'अतिरिक्त जानकारी' :
                       'ಹೆಚ್ಚುವರಿ ಮಾಹಿತಿ'}
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={
                        language === 'en' ? 'Tell us more about what you want to discuss...' :
                        language === 'hi' ? 'हमें बताएं कि आप क्या चर्चा करना चाहते हैं...' :
                        'ನೀವು ಚರ್ಚಿಸಲು ಬಯಸುವ ವಿಷಯದ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ನೀಡಿ...'
                      }
                      className="h-32"
                    />
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {language === 'en' ? 'Booking...' :
                           language === 'hi' ? 'बुकिंग...' :
                           'ಬುಕಿಂಗ್...'}
                        </>
                      ) : (
                        language === 'en' ? 'Book Session' :
                        language === 'hi' ? 'सत्र बुक करें' :
                        'ಸೆಷನ್ ಬುಕ್ ಮಾಡಿ'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/')}
                      className="w-full"
                    >
                      {language === 'en' ? 'Go to Home' :
                       language === 'hi' ? 'होम पर जाएं' :
                       'ಹೋಮ್‌ಗೆ ಹೋಗಿ'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {language === 'en' ? 'My Career Guidance Sessions' :
                   language === 'hi' ? 'मेरे करियर मार्गदर्शन सत्र' :
                   'ನನ್ನ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ಸೆಷನ್‌ಗಳು'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingSessions ? (
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-gray-600">
                      {language === 'en' ? 'Loading your sessions...' :
                       language === 'hi' ? 'आपके सत्र लोड हो रहे हैं...' :
                       'ನಿಮ್ಮ ಸೆಷನ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...'}
                    </p>
                  </div>
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>
                      {language === 'en' ? 'Error' :
                       language === 'hi' ? 'त्रुटि' :
                       'ದೋಷ'}
                    </AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : sessions.length === 0 ? (
                  <p className="text-center text-gray-600 py-8">
                    {language === 'en' ? 'No sessions booked yet' :
                     language === 'hi' ? 'अभी तक कोई सत्र बुक नहीं किया गया' :
                     'ಇನ್ನೂ ಯಾವುದೇ ಸೆಷನ್‌ಗಳನ್ನು ಬುಕ್ ಮಾಡಲಾಗಿಲ್ಲ'}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <Card key={session.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{session.topic}</h3>
                              <p className="text-sm text-gray-600">
                                {format(new Date(session.date), 'PPP')} at {session.time}
                              </p>
                              {session.description && (
                                <p className="mt-2 text-sm text-gray-600">{session.description}</p>
                              )}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              session.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              session.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerGuidancePage; 