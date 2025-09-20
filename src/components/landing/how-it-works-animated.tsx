'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

/* ----------  conversation data  ---------- */
const conversations = [
  {
    id: 'discovery',
    title: 'Discovery Phase',
    subtitle: 'Find your perfect visa match',
    messages: [
      { sender: 'user', text: 'Hi! I want to relocate to Canada for work. I have 5 years IT experience.' },
      { sender: 'ai', text: 'Great! Let me analyse your profile against Canadian immigration programs…' },
      { sender: 'ai', text: '✅ Express Entry: 87% chance\n✅ Provincial Nominee: 92% chance\n✅ Atlantic Immigration: 95% chance' },
    ],
  },
  {
    id: 'planning',
    title: 'Planning Phase',
    subtitle: 'Build your application roadmap',
    messages: [
      { sender: 'user', text: 'I’ve chosen Express Entry. What documents do I need?' },
      { sender: 'ai', text: 'Here’s your personalised checklist:\n• IELTS results (target CLB 9+)\n• Educational Credential Assessment\n• Work-experience letters\n• Police certificates' },
    ],
  },
  {
    id: 'success',
    title: 'Success Phase',
    subtitle: 'Submit with confidence',
    messages: [
      { sender: 'ai', text: '🎉 Your application is ready!\n✅ Documents verified\n✅ Forms completed\n✅ Fees: $1,325 CAD\n✅ Processing: ~6 months' },
      { sender: 'user', text: 'Thank you! Submitting now.' },
      { sender: 'ai', text: 'Best of luck! I’ll track your status. Welcome to your new life in Canada! 🇨🇦' },
    ],
  },
];

/* ----------  flag emojis (force colour)  ---------- */
const countryFlags = ['🇨🇦', '🇬🇧', '🇦🇺', '🇺🇸', '🇩🇪', '🇫🇷'];

export default function HowItWorksAnimated() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* scroll trigger */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.3 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* demo cycle */
  useEffect(() => {
    if (!isVisible) return;
    const conv = conversations[demoIndex];
    const delay = conv.messages[msgIndex]?.sender === 'ai' ? 3000 : 1500;
    const t = setTimeout(() => {
      if (msgIndex < conv.messages.length - 1) {
        setMsgIndex((m) => m + 1);
      } else {
        setTimeout(() => {
          setDemoIndex((d) => (d + 1) % conversations.length);
          setMsgIndex(0);
        }, 2000);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [isVisible, demoIndex, msgIndex]);

  const currentConv = conversations[demoIndex];
  const visibleMsgs = currentConv.messages.slice(0, msgIndex + 1);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* flags – force colour */}
      <div className="absolute inset-0 pointer-events-none">
        {countryFlags.map((flag, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              top: `${10 + i * 12}%`,
              left: i % 2 === 0 ? `${5 + i * 6}%` : 'auto',
              right: i % 2 === 1 ? `${5 + i * 6}%` : 'auto',
              animation: `float 10s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {flag}
          </span>
        ))}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">See Japa Genie in Action</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Watch how our AI guides you through every step of your visa journey</p>
        </div>

        {/* single phone mock-up */}
        <div className="flex justify-center mb-8">
          <div className="bg-black rounded-[2rem] p-3 shadow-xl w-80">
            <div className="bg-white rounded-[1.5rem] overflow-hidden flex flex-col h-[34rem]">
              {/* status bar */}
              <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-b">
                <span>9:41 AM</span>
                <div className="flex space-x-1"><div className="w-1 h-1 bg-gray-400 rounded-full" /><div className="w-1 h-1 bg-gray-400 rounded-full" /><div className="w-1 h-1 bg-gray-400 rounded-full" /></div>
              </div>
              {/* chat header */}
              <div className="flex items-center space-x-3 px-4 py-3 border-b">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
                <div><p className="font-semibold text-sm">Japa Genie</p><p className="text-xs text-green-500">Online</p></div>
              </div>
              {/* messages – INSTANT FULL TEXT (no gibberish) */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                {visibleMsgs.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${m.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none shadow'}`}>
                      {m.text.split('\n').map((line, idx) => (<React.Fragment key={idx}>{line}{idx < m.text.split('\n').length - 1 && <br />}</React.Fragment>))}
                    </div>
                  </div>
                ))}
              </div>
              {/* input bar */}
              <div className="px-4 py-3 border-t bg-white">
                <div className="flex space-x-2"><input type="text" placeholder="Type a message…" className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none" disabled /><button className="p-2 bg-blue-500 text-white rounded-full"><Sparkles className="w-4 h-4" /></button></div>
              </div>
            </div>
          </div>
        </div>

        {/* progress dots */}
        <div className="flex justify-center space-x-2 mb-6">{conversations.map((_, i) => (<div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === demoIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-300'}`} />))}</div>
        <div className="text-center mb-8"><p className="font-semibold">{currentConv.title}</p><p className="text-sm text-gray-600">{currentConv.subtitle}</p></div>
        <div className="text-center"><Button asChild size="lg"><a href="/chat" className="flex items-center">Start Your Journey <Sparkles className="ml-2 w-4 h-4" /></a></Button></div>
      </div>
    </section>
  );
}