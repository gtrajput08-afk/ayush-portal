"use client";

import React, { useState } from "react";
import { Bot, Send } from "lucide-react";
import { generateCareerMentorResponse, ChatMessage } from "@/lib/chatbot";

interface MentorChatSectionProps {
  userName?: string;
  stream: string;
}

export default function MentorChatSection({ userName, stream }: MentorChatSectionProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "bot-1",
      sender: "bot",
      text: `Namaste ${userName || "Scholar"}! 🌿 I am your AI AYUSH Career Mentor. Ask me anything about ${stream || "AYUSH"} clinical tracks, CCRAS/AIAPGET exams, Schedule T GMP certifications, or industry internships!`,
      timestamp: "Just now",
      suggestedActions: ["Top Career Options", "How to prepare for AIAPGET?", "Industrial GMP Training", "Find Internships"],
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSendMessage = (textToSend?: string) => {
    const message = textToSend || chatInput;
    if (!message.trim()) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    setTimeout(() => {
      const botResponse = generateCareerMentorResponse(message, stream);
      setChatMessages((prev) => [...prev, botResponse]);
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-ayush-green text-white flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-ayush-dark">Virtual Career Mentor AI</h2>
            <p className="text-xs text-gray-500">Trained on NCISM guidelines, AIAPGET trends, and Ayush industrial mandates.</p>
          </div>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
          Online • {stream} Advisor
        </span>
      </div>

      <div className="h-96 overflow-y-auto space-y-4 p-4 rounded-2xl bg-ayush-sand/60 border border-gray-200">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === "user"
                  ? "bg-ayush-green text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>
              <span className={`text-[10px] block mt-1.5 text-right opacity-70 ${msg.sender === "user" ? "text-emerald-100" : "text-gray-400"}`}>
                {msg.timestamp}
              </span>
            </div>

            {msg.suggestedActions && msg.suggestedActions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {msg.suggestedActions.map((action, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={() => handleSendMessage(action)}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-white text-ayush-green border border-ayush-green/30 hover:bg-ayush-green-light transition-colors shadow-2xs"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder={`Ask anything about ${stream} clinical exams, CCRAS grants, or industry careers...`}
          className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
        />
        <button
          onClick={() => handleSendMessage()}
          className="px-5 py-3 rounded-xl bg-ayush-green text-white hover:bg-ayush-green-dark transition-colors font-bold text-xs shadow flex items-center space-x-1.5"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
