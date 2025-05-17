import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Bot, User, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const CareerChatbot = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const language = i18n.language;

  // Initial greeting message
  useEffect(() => {
    const greeting = {
      id: '1',
      content: language === 'en' 
        ? "Hello! I'm your AI Career Guide. How can I help you today?"
        : language === 'hi'
        ? "नमस्ते! मैं आपका AI करियर गाइड हूं। मैं आपकी कैसे मदद कर सकता हूं?"
        : "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶಕ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      role: 'assistant' as const,
      timestamp: new Date()
    };
    setMessages([greeting]);
  }, [language]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = async (userMessage: string) => {
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      console.error('API Key not found in environment variables');
      throw new Error('DeepSeek API key is not configured');
    }

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: language === 'en' 
                ? "You are a career guidance expert specializing in rural development and agriculture. Provide helpful, practical advice. Keep responses concise and focused on rural career opportunities."
                : language === 'hi'
                ? "आप ग्रामीण विकास और कृषि में विशेषज्ञता वाले करियर मार्गदर्शन विशेषज्ञ हैं। सहायक, व्यावहारिक सलाह दें। ग्रामीण करियर अवसरों पर ध्यान केंद्रित करें।"
                : "ನೀವು ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಕೃಷಿಯಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿರುವ ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ತಜ್ಞ. ಸಹಾಯಕ, ಪ್ರಾಯೋಗಿಕ ಸಲಹೆ ನೀಡಿ. ಗ್ರಾಮೀಣ ವೃತ್ತಿ ಅವಕಾಶಗಳ ಮೇಲೆ ಗಮನ ಹರಿಸಿ."
            },
            ...messages.slice(-4).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('DeepSeek API Error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to get AI response');
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error getting AI response:', error);
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          toast({
            title: language === 'en' ? 'Configuration Error' :
                   language === 'hi' ? 'कॉन्फ़िगरेशन त्रुटि' :
                   'ಕಾನ್ಫಿಗರೇಶನ್ ದೋಷ',
            description: language === 'en' ? 'DeepSeek API key is not configured. Please contact support.' :
                        language === 'hi' ? 'DeepSeek API कुंजी कॉन्फ़िगर नहीं है। कृपया सपोर्ट से संपर्क करें।' :
                        'DeepSeek API ಕೀ ಕಾನ್ಫಿಗರ್ ಆಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಸಪೋರ್ಟ್‌ಗೆ ಸಂಪರ್ಕಿಸಿ.',
            variant: 'destructive'
          });
        } else {
          toast({
            title: language === 'en' ? 'Error' :
                   language === 'hi' ? 'त्रुटि' :
                   'ದೋಷ',
            description: language === 'en' ? 'Failed to get response. Please try again.' :
                        language === 'hi' ? 'प्रतिक्रिया प्राप्त करने में विफल। कृपया पुनः प्रयास करें।' :
                        'ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
            variant: 'destructive'
          });
        }
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: language === 'en' ? 'Error' :
               language === 'hi' ? 'त्रुटि' :
               'ದೋಷ',
        description: language === 'en' ? 'Failed to get response. Please try again.' :
                    language === 'hi' ? 'प्रतिक्रिया प्राप्त करने में विफल। कृपया पुनः प्रयास करें।' :
                    'ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg border-2 border-primary/20 relative">
      <CardHeader className="bg-primary/5 border-b border-primary/10 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-primary">
            {language === 'en' ? 'AI Career Guide' :
             language === 'hi' ? 'AI करियर गाइड' :
             'AI ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶಕ'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea ref={scrollRef} className="h-[300px] pr-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-0.5 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="relative mt-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'en' ? 'Type your message...' :
                language === 'hi' ? 'अपना संदेश टाइप करें...' :
                'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...'
              }
              disabled={isLoading}
              className="flex-1 border-primary/20 focus:border-primary h-9"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 h-9 px-3"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-100 z-10 border border-gray-200"
          >
            <X className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerChatbot; 