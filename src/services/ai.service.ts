import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class AIService {
  private static instance: AIService;
  private conversationHistory: ChatMessage[] = [
    {
      role: 'system',
      content: 'You are a helpful career guidance assistant for rural youth in India. You provide personalized advice about education, skills, and career opportunities. You communicate in a friendly and encouraging manner.'
    }
  ];

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async getResponse(userMessage: string): Promise<string> {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // Get response from OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: this.conversationHistory,
        max_tokens: 150,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0]?.message?.content || 'I apologize, but I am unable to respond at the moment.';

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      return aiResponse;
    } catch (error) {
      console.error('Error getting AI response:', error);
      return 'I apologize, but I encountered an error. Please try again later.';
    }
  }

  public clearConversation() {
    this.conversationHistory = [
      {
        role: 'system',
        content: 'You are a helpful career guidance assistant for rural youth in India. You provide personalized advice about education, skills, and career opportunities. You communicate in a friendly and encouraging manner.'
      }
    ];
  }
} 