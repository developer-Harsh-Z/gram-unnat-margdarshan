import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X } from 'lucide-react';
import { AIService } from '@/services/ai.service';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('chatbot.welcome'),
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const aiService = AIService.getInstance();

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await aiService.getResponse(inputMessage);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: t('chatbot.defaultResponse'),
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = t('chatbot.suggestions', { returnObjects: true }) as string[];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-4 shadow-lg"
          size="lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <div className="w-96 rounded-lg border bg-white shadow-lg">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-semibold">{t('chatbot.title')}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-4">
                <div className="inline-block rounded-lg p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('chatbot.placeholder')}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.map((suggestion: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputMessage(suggestion);
                    handleSendMessage();
                  }}
                  disabled={isLoading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 