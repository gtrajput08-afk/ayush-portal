"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { Building2, Users, BookOpen, Layers, Sparkles } from "lucide-react";
import InternalAcademicianView from "@/components/academician/InternalAcademicianView";
import ExternalAcademicianView from "@/components/academician/ExternalAcademicianView";
import FdpPostingSection from "@/components/academician/FdpPostingSection";

export default function AcademicianDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"matrix" | "fdp">("matrix");

  const mentorType = user?.mentorType || "internal";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Identity Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
              Academician Dashboard
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              mentorType === "internal"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-orange-100 text-orange-800 border border-orange-300"
            }`}>
              {mentorType === "internal" ? "Internal Mentor Track (College-Side)" : "External Mentor Track (Industry-Side)"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-ayush-dark">
            {user?.name || "Professor / Researcher"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            {user?.designation || "Faculty Member"} • {user?.institution || "All India Institute of Ayurveda"}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
            Current View: <strong>{mentorType.toUpperCase()}</strong>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setTab("matrix")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            tab === "matrix"
              ? "bg-ayush-green text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {mentorType === "internal" ? <Users className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          <span>
            {mentorType === "internal"
              ? "Student Skill Matrix & Placement Readiness"
              : "Qualitative Candidate Evaluations & Hidden Gems"}
          </span>
        </button>

        <button
          onClick={() => setTab("fdp")}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
            tab === "fdp"
              ? "bg-ayush-green text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>FDP, Research Grants & Consultancy</span>
        </button>
      </div>

      {/* Dynamic View rendering based on mentorType */}
      {tab === "matrix" && (
        mentorType === "internal" ? <InternalAcademicianView /> : <ExternalAcademicianView />
      )}

      {tab === "fdp" && <FdpPostingSection />}
    </div>
  );
}
