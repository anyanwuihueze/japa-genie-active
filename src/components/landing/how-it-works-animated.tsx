'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import twemoji from 'twemoji';

/* ----------  Twemoji helper  ---------- */
function Emoji({ emoji }: { emoji: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(emoji, { folder: 'svg', ext: '.svg' })
      }}
    />
  );
}

/* ----------  type-writer hook (English only)  ---------- */
function useTypeWriter(text: string, ms = 30, start = true) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (!start) return;
    setDisplay(''); // start empty → build English letter-by-letter
    let i = 0;
    const t = setInterval(() => {
      if (i >= text.length) return clearInterval(t);
      setDisplay((s) => s + text[i++]);
    }, ms);
    return () => clearInterval(t);
  }, [text, ms, start]);

  return display;
}

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

/* ----------  floating flag SVGs  ---------- */
const countryFlags = [
  { flag: '🇨🇦', top: '15%', left: '8%' },
  { flag: '🇬🇧', top: '25%', right: '12%' },
  { flag: '🇦🇺', bottom: '35%', left: '10%' },
  { flag: '🇺🇸', top: '55%', right: '8%' },
  { flag: '🇩🇪', bottom: '20%', right: '18%' },
  { flag: '🇫🇷', top: '75%', left: '15%' },
];

export function HowItWorksAnimated() {
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

  /* message + demo timer */
  useEffect(() => {
    if (!isVisible) return;
    const conv = conversations[demoIndex];
    const timer = setTimeout(() => {
      if (msgIndex < conv.messages.length - 1) {
        setMsgIndex((m) => m + 1);
      } else {
        setTimeout(() => {
          setDemoIndex((d) => (d + 1) % conversations.length);
          setMsgIndex(0);
        }, 1500);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isVisible, demoIndex, msgIndex]);

  const currentConv = conversations[demoIndex];
  const visibleMsgs = currentConv.messages.slice(0, msgIndex + 1);

  /* type-writer ONLY on the last visible message */
  const lastMsgText = visibleMsgs[visibleMsgs.length - 1]?.text ?? '';
  const typedLast = useTypeWriter(lastMsgText, 30, msgIndex === visibleMsgs.length - 1);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* anchored flag SVG background */}
      <div className="absolute inset-0 pointer-events-none">
        {countryFlags.map((f, i) => (
          <span key={i} className="absolute text-2xl opacity-10 floating-flag" style={{ ...f, animationDelay: `${i * 1.5}s` }}>
            <Emoji emoji={f.flag} />
          </span>
        ))}
      </div>

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
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                </div>
              </div>

              {/* chat header – YOUR LOGO HERE */}
              <div className="flex items-center space-x-3 px-4 py-3 border-b">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {/* REPLACE this Sparkles with your logo */}
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Japa Genie</p>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>

              {/* messages with English type-writer */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                {visibleMsgs.map((m, i) => {
                  const isLast = i === visibleMsgs.length - 1;
                  const text = isLast ? typedLast : m.text; // last = typed, rest = full
                  return (
                    <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                          m.sender === 'user'
                            ? 'bg-blue-500 text-white rounded-br-none'
                            : 'bg-white text-gray-800 rounded-bl-none shadow'
                        }`}
                      >
                        {text.split('\n').map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < text.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                        {isLast && <span className="inline-block w-1 h-4 bg-current animate-pulse ml-1" />}
                      </div>
                    </div>
                  );
                })}
                {msgIndex < currentConv.messages.length - 1 && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl px-3 py-2 shadow">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* input bar */}
              <div className="px-4 py-3 border-t bg-white">
                <div className="flex space-x-2">
                  <input type="text" placeholder="Type a message…" className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none" disabled />
                  <button className="p-2 bg-blue-500 text-white rounded-full">
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* progress dots */}
        <div className="flex justify-center space-x-2 mb-6">
          {conversations.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${i === demoIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>

        {/* title */}
        <div className="text-center mb-8">
          <p className="font-semibold">{currentConv.title}</p>
          <p className="text-sm text-gray-600">{currentConv.subtitle}</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/chat">Start Your Journey <Sparkles className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksAnimated;