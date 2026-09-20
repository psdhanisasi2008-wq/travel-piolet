import React, { useState } from 'react';
import { ChatMessage, ViewMode } from '../types';
import { MessageSquare, Send, Sparkles, MapPin, Calendar, Clock, Plus, Map, Bot } from 'lucide-react';

interface AskTravelPilotViewProps {
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onNavigate: (view: ViewMode) => void;
  onAddSuggestedActivity: () => void;
}

export const AskTravelPilotView: React.FC<AskTravelPilotViewProps> = ({
  chatMessages,
  onSendMessage,
  onNavigate,
  onAddSuggestedActivity
}) => {
  const [inputText, setInputText] = useState('');

  const suggestedQuestions = [
    'Can I fit TeamLab into tomorrow?',
    'What should I do tomorrow morning?',
    'What happens if my flight is delayed by 2 hours?',
    'Which activities are near my hotel in Shibuya?',
    'How much budget do I have remaining for dining?'
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1100px] mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* 1. TRIP CHAT CONTEXT BAR AT TOP */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white leading-tight">Ask TravelPilot Assistant</h3>
            <p className="text-[11px] text-slate-400">Context-Aware Trip Intelligence Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <div>
            <span className="text-[9px] font-bold uppercase text-slate-400 block">CURRENT TRIP</span>
            <span className="font-extrabold text-white text-xs">Tokyo · Oct 12–18</span>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div>
            <span className="text-[9px] font-bold uppercase text-slate-400 block">CURRENT DAY</span>
            <span className="font-extrabold text-teal-300 text-xs">Tuesday, Oct 13</span>
          </div>
          <div className="h-6 w-px bg-slate-700"></div>
          <div>
            <span className="text-[9px] font-bold uppercase text-slate-400 block">EST. BUDGET</span>
            <span className="font-extrabold text-emerald-400 text-xs">₹42,500 / ₹60,000</span>
          </div>
        </div>
      </div>

      {/* 2. Chat Conversation Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-slate-200/80 p-4 md:p-6 space-y-5 shadow-xs">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-slate-900 text-white' : 'bg-teal-700 text-white shadow-xs'
                }`}
              >
                {isUser ? 'MB' : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs space-y-3 ${
                  isUser
                    ? 'bg-slate-900 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed font-medium">
                  {msg.text}
                </div>

                {/* Structured Context Data Block if available */}
                {msg.contextData && (
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-3 mt-2 text-xs">
                    <div className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                      BASED ON YOUR ITINERARY
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[9px] font-bold uppercase">Prev Activity</span>
                        <span className="font-semibold text-slate-900">{msg.contextData.previousActivity}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] font-bold uppercase">Next Activity</span>
                        <span className="font-semibold text-slate-900">{msg.contextData.nextActivity}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={onAddSuggestedActivity}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5 text-teal-300" />
                        <span>Add to itinerary</span>
                      </button>
                      <button
                        onClick={() => onNavigate('map')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Map className="w-3.5 h-3.5 text-slate-500" />
                        <span>Show on map</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="text-[10px] opacity-50 text-right">{msg.timestamp}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Suggested Questions Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Suggested:</span>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => onSendMessage(q)}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-full border border-slate-200/80 shrink-0 transition-colors shadow-2xs"
          >
            "{q}"
          </button>
        ))}
      </div>

      {/* 4. Chat Input Box */}
      <form onSubmit={handleSend} className="relative shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask TravelPilot about flights, timing, budget, or backup options..."
          className="w-full bg-white text-xs text-slate-900 placeholder-slate-400 pl-4 pr-12 py-3.5 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900 hover:bg-teal-700 text-white rounded-xl transition-colors"
        >
          <Send className="w-4 h-4 text-teal-300" />
        </button>
      </form>
    </div>
  );
};
