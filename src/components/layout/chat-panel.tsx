// FILE: src/components/layout/chat-panel.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { siteAssistant } from '@/ai/flows/site-assistant-flow';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export function ChatPanel() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        'Hi there! I’m your Japa Genie guide 👋 Ask me anything about relocation, pricing, or how we help you move abroad. You’ve got 5 free questions — then unlock 3 powerful visa wishes inside!',
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const MAX_FREE_QUESTIONS = 5;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = currentInput.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setCurrentInput('');
    setIsTyping(true);

    try {
      const result = await siteAssistant({ question: trimmed });
      const aiResponse = result.answer;
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);

      setQuestionCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= MAX_FREE_QUESTIONS) {
          setTimeout(() => {
            setShowEmailModal(true);
          }, 1000);
        }
        return newCount;
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! I had trouble responding. Please check your connection and try again.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.email as HTMLInputElement).value;
    if (!email) return;
    localStorage.setItem('userEmail', email);
    setShowEmailModal(false);
    router.push('/chat');
  };

  return (
    <>
      {/* Chat Interface */}
      <div className="relative flex flex-col h-screen max-w-2xl mx-auto overflow-hidden bg-gray-50/80">
        {/* Background Layer */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 chat-wallpaper" 
          aria-hidden="true" 
        />

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 z-10">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border rounded-bl-none shadow'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg rounded-bl-none shadow max-w-xs">
                Japa Genie is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 bg-white/80 backdrop-blur-sm border-t z-10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Ask about visas, countries, or how to move abroad..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !currentInput.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg"
            >
              {isTyping ? '...' : 'Send'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {MAX_FREE_QUESTIONS - questionCount} free questions remaining
          </p>
        </form>
      </div>

      {/* Email Capture Modal (Accessible) */}
      {showEmailModal && (
        <Sheet open={showEmailModal} onOpenChange={setShowEmailModal}>
          <SheetContent className="sm:max-w-sm">
            {/* Accessible but hidden title/description */}
            <VisuallyHidden asChild>
              <SheetTitle>Unlock Your 3 Visa Wishes</SheetTitle>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <SheetDescription>
                Enter your email to unlock your 3 personalized visa wishes with Japa Genie.
              </SheetDescription>
            </VisuallyHidden>

            {/* Visible UI */}
            <div className="text-center space-y-4 p-2">
              <h3 className="text-xl font-bold text-gray-800">Unlock Your 3 Visa Wishes! ✨</h3>
              <p className="text-gray-600">
                You’ve used all 5 free questions! Enter your email to unlock your 3 personalized visa wishes with Japa Genie.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Continue to 3 Wishes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Maybe Later
                  </button>
                </div>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
