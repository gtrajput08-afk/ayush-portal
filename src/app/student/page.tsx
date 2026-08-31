"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { 
  Sparkles, 
  BookOpen, 
  BrainCircuit, 
  BarChart3, 
  Briefcase, 
  Award, 
  Building 
} from "lucide-react";
import QuizSection from "@/components/student/QuizSection";
import MentorChatSection from "@/components/student/MentorChatSection";
import AnalyticsSection from "@/components/student/AnalyticsSection";
import InternshipSection from "@/components/student/InternshipSection";
import { InternalTrackSection, ExternalTrackSection } from "@/components/student/TracksSection";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"ai-tools" | "internal-track" | "external-track">("ai-tools");
  const [aiSubTab, setAiSubTab] = useState<"quiz" | "mentor" | "analytics" | "jobs">("quiz");
  const [analytics, setAnalytics] = useState<any>(null);

  const loadAnalytics = async () => {
    try {
      const res = await fetch("/api/student/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error("Analytics fetch error:", err);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Identity Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-ayush-green-light text-ayush-green border border-ayush-green/30">
              Student Hub
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-ayush-orange-light text-ayush-orange border border-ayush-orange/30">
              {user?.stream || "Ayurveda"} Stream
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ayush-dark">
            Welcome, {user?.name || "AYUSH Scholar"}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            {user?.institution || "National Institute of Ayurveda"} • AI skill testing, career mentoring, verified credentials, and dual mentor tracks.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/student/portfolio"
            className="px-4 py-2.5 rounded-xl bg-ayush-green text-white font-bold text-xs hover:bg-ayush-green-dark transition-all shadow flex items-center space-x-1.5"
          >
            <Award className="w-4 h-4" />
            <span>Digital Portfolio & Badges</span>
          </Link>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab("ai-tools")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === "ai-tools"
              ? "bg-ayush-green text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-Driven Tools</span>
        </button>

        <button
          onClick={() => setActiveTab("internal-track")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === "internal-track"
              ? "bg-ayush-green text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Internal Mentor Track (College-Side)</span>
        </button>

        <button
          onClick={() => setActiveTab("external-track")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            activeTab === "external-track"
              ? "bg-ayush-orange text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>External Mentor Track (Industry-Side)</span>
        </button>
      </div>

      {/* Main Tab 1: AI Tools */}
      {activeTab === "ai-tools" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "quiz", label: "Skill Testing & Gap Analysis", icon: BrainCircuit },
              { id: "mentor", label: "Virtual Career Mentor", icon: Sparkles },
              { id: "analytics", label: "Progress Analytics", icon: BarChart3 },
              { id: "jobs", label: "Internship & Job Search", icon: Briefcase },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAiSubTab(tab.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-1.5 ${
                    aiSubTab === tab.id
                      ? "border-ayush-green bg-white shadow-md ring-2 ring-ayush-green/20"
                      : "border-gray-200 bg-white/60 hover:bg-white text-gray-600"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${aiSubTab === tab.id ? "text-ayush-green" : "text-gray-400"}`} />
                  <p className={`text-xs font-bold ${aiSubTab === tab.id ? "text-ayush-dark" : "text-gray-700"}`}>
                    {tab.label}
                  </p>
                </button>
              );
            })}
          </div>

          {aiSubTab === "quiz" && (
            <QuizSection 
              initialStream={user?.stream || "Ayurveda"} 
              onAssessmentCompleted={loadAnalytics} 
            />
          )}

          {aiSubTab === "mentor" && (
            <MentorChatSection 
              userName={user?.name} 
              stream={user?.stream || "Ayurveda"} 
            />
          )}

          {aiSubTab === "analytics" && (
            <AnalyticsSection analytics={analytics} />
          )}

          {aiSubTab === "jobs" && (
            <InternshipSection userStream={user?.stream} />
          )}
        </div>
      )}

      {/* Main Tab 2: Internal Track */}
      {activeTab === "internal-track" && <InternalTrackSection />}

      {/* Main Tab 3: External Track */}
      {activeTab === "external-track" && <ExternalTrackSection />}
    </div>
  );
}
