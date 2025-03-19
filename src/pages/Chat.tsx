
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User, Trash2, Sparkles } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Chào Cong! Mình là EngAce, trợ lý ảo được thiết kế riêng để hỗ trợ bạn học tiếng Anh nè.',
    sender: 'ai',
    timestamp: new Date('2023-05-10T01:19:00'),
  },
  {
    id: '2',
    content: 'Mình luôn cố gắng hỗ trợ bạn tốt nhất, nhưng đôi khi vẫn có thể mắc sai sót, nên bạn nhớ kiểm tra lại những thông tin quan trọng nha!',
    sender: 'ai',
    timestamp: new Date('2023-05-10T01:19:30'),
  },
  {
    id: '3',
    content: 'nói về thời tiết trong tiếng anh',
    sender: 'user',
    timestamp: new Date('2023-05-10T01:19:45'),
  },
  {
    id: '4',
    content: 'Chào Cong, mình rất vui khi được giúp bạn học về thời tiết trong tiếng Anh! \n\n1. Từ vựng cơ bản về thời tiết:\n\n• Sun: Mặt trời\n• Rain: Mưa\n• Wind: Gió\n• Cloud: Mây\n• Temperature: Nhiệt độ\n• Hot: Nóng\n• Cold: Lạnh\n• Warm: Ấm áp\n• Cool: Mát mẻ\n• Sunny: Có nắng',
    sender: 'ai',
    timestamp: new Date('2023-05-10T01:20:00'),
  },
];

const suggestedPrompts = [
  'Giúp mình học từ vựng về chủ đề gia đình',
  'Giải thích thì hiện tại hoàn thành',
  'Các cách để nói "Rất vui được gặp bạn" trong tiếng Anh',
  'Viết một đoạn văn ngắn về sở thích của tôi',
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Đây là phản hồi mẫu. Trong ứng dụng thực tế, phản hồi sẽ được tạo bởi AI dựa trên câu hỏi của bạn.',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <MainLayout>
      <div className="container px-0 md:px-6 py-0 md:py-8 max-w-4xl h-[calc(100vh-4rem)] flex flex-col">
        <div className="md:rounded-xl border border-border/50 shadow-sm overflow-hidden flex flex-col h-full bg-card">
          {/* Header */}
          <div className="p-4 border-b border-border/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-chat/10 p-1.5 rounded-full">
                <MessageCircle className="w-5 h-5 text-chat" />
              </div>
              <h2 className="font-semibold">Chat với AI</h2>
            </div>
            <button 
              onClick={clearChat} 
              className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md"
              title="Xóa cuộc trò chuyện"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="bg-chat/10 p-3 rounded-full mb-4">
                  <MessageCircle className="w-6 h-6 text-chat" />
                </div>
                <h3 className="text-lg font-medium mb-2">Bắt đầu cuộc trò chuyện</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Hãy đặt câu hỏi hoặc yêu cầu trợ giúp về bất kỳ chủ đề tiếng Anh nào bạn quan tâm.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt)}
                      className="px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80 transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[85%] md:max-w-[75%] rounded-xl px-4 py-3",
                        message.sender === 'user' 
                          ? "bg-primary text-primary-foreground rounded-tr-none" 
                          : "bg-chat/10 text-foreground rounded-tl-none"
                      )}>
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className="text-[10px] mt-1 opacity-70 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-chat/10 text-foreground rounded-xl rounded-tl-none px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-foreground/60 animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập tin nhắn của bạn..."
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={cn(
                  "p-2.5 rounded-lg flex items-center justify-center transition-colors",
                  inputValue.trim()
                    ? "bg-chat text-white hover:bg-chat/90" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            {/* Suggested prompts */}
            {messages.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 2).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-2.5 py-1 text-xs bg-muted/70 rounded-md hover:bg-muted transition-colors truncate max-w-[200px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;
