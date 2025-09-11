'use client';

import { useState, useRef, useEffect } from 'react';
import { siteAssistant } from '@/ai/flows/site-assistant-flow';
import { generateInsightsFlow as generateInsights } from '@/ai/flows/insights-flow';
;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function UserChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [insights, setInsights] = useState<any | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      // Get normal assistant reply
      const result = await siteAssistant({ question: trimmed });
      const aiResponse = result.answer;
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);

      // Get insights
      const insightResult = await generateInsights({ question: trimmed });
      setInsights(insightResult);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! Something went wrong while fetching insights.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* Chat Section */}
      <div className="flex flex-col border-r border-gray-200 relative">
        {/* Passport background overlay */}
        <div 
          className="absolute inset-0 opacity-5 bg-repeat pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.15'%3E%3Ccircle cx='90' cy='90' r='35' fill='none' stroke='%23000' stroke-width='2'/%3E%3Ctext x='90' y='85' text-anchor='middle' font-family='Arial, sans-serif' font-size='10' font-weight='bold'%3EVISA%3C/text%3E%3Ctext x='90' y='100' text-anchor='middle' font-family='Arial, sans-serif' font-size='7'%3E25 APR 2016%3C/text%3E%3Ctext x='90' y='110' text-anchor='middle' font-family='Arial, sans-serif' font-size='6'%3EAPPROVED%3C/text%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px'
          }}
        />
        
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 relative z-10">
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
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg shadow max-w-xs">
                Japa Genie is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 bg-white border-t relative z-10">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Ask about visas, requirements, or costs..."
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
        </form>
      </div>

      {/* Insights Section */}
      <div className="p-4 overflow-y-auto bg-white">
        <h2 className="text-xl font-bold mb-4">Visa Insights</h2>
        {!insights && <p className="text-gray-500">Ask a question to see insights...</p>}

        {insights && (
          <div className="space-y-6">
            {/* Insights List */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Insights</h3>
              <ul className="list-disc pl-5 space-y-2">
                {insights.insights?.map((ins: any, idx: number) => (
                  <li key={idx}>
                    <strong>{ins.headline}:</strong> {ins.detail}
                    {ins.url && (
                      <a
                        href={ins.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-2"
                      >
                        Learn more
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cost Estimates */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Cost Estimates</h3>
              <ul className="list-disc pl-5 space-y-2">
                {insights.costEstimates?.map((c: any, idx: number) => (
                  <li key={idx}>
                    {c.item}: ${c.amount}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visa Alternatives */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Visa Alternatives</h3>
              <ul className="list-disc pl-5 space-y-2">
                {insights.visaAlternatives?.map((v: any, idx: number) => (
                  <li key={idx}>
                    <strong>{v.visaName}:</strong> {v.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chart Data */}
            {insights.chartData && (
              <div>
                <h3 className="font-semibold text-lg mb-2">{insights.chartData.title}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={insights.chartData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}