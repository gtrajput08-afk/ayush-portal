"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { Briefcase, Plus, Users, Building, MapPin, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import PostInternshipModal from "@/components/industry/PostInternshipModal";
import ApplicantManagementSection from "@/components/industry/ApplicantManagementSection";

export default function IndustryDashboard() {
  const { user } = useAuth();
  const [internships, setInternships] = useState<any[]>([]);
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const mentorType = user?.mentorType || "external";

  const loadInternships = async () => {
    try {
      const res = await fetch("/api/internships");
      if (res.ok) {
        const data = await res.json();
        setInternships(data.internships || []);
        if (data.internships?.length > 0 && !selectedInternship) {
          setSelectedInternship(data.internships[0]);
        }
      }
    } catch (err) {
      console.error("Load internships error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInternships();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Identity Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-ayush-orange-light text-ayush-orange border border-ayush-orange/30">
              Industry Portal
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {mentorType === "external" ? "External Track: Candidate Evaluator" : "Internal Track: Campus Talent Partner"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-ayush-dark">
            {user?.name || "Industry Partner"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
            {user?.institution || "Dabur Research & Development Foundation"} • Post internships, screen verified portfolios, filter by problem solving ratings, and manage candidates.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPostModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-ayush-orange hover:bg-ayush-orange-dark text-white font-bold text-xs shadow flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Internship / Job</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: List of Posted Opportunities */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Active Opportunities</h3>
            <span className="text-xs font-bold text-gray-400">{internships.length} Listings</span>
          </div>

          <div className="space-y-3">
            {internships.map((item) => {
              const isSelected = selectedInternship?._id === item._id;
              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedInternship(item)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? "border-ayush-orange bg-ayush-orange-light/40 shadow-sm ring-2 ring-ayush-orange/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-ayush-dark border border-gray-200">
                      {item.stream}
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">{item.type}</span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-900 leading-snug">{item.title}</h4>
                  
                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                    <span>{item.location?.district}</span>
                    <span className="font-bold text-ayush-orange">{item.stipend}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Candidate Screening & Applicant Management */}
        <div className="lg:col-span-8 space-y-6">
          {selectedInternship ? (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-ayush-green-light text-ayush-green">
                    Selected Role: {selectedInternship.stream}
                  </span>
                  <span className="text-xs text-gray-500">
                    Openings: {selectedInternship.openings}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-ayush-dark">{selectedInternship.title}</h2>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedInternship.description}</p>
              </div>

              {/* Applicant Screening Component */}
              <ApplicantManagementSection
                internship={selectedInternship}
                mentorType={mentorType}
                onStatusUpdated={loadInternships}
              />
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center text-xs text-gray-500">
              Select an internship listing to review and manage candidate applications.
            </div>
          )}
        </div>

      </div>

      {/* Post Modal */}
      <PostInternshipModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        onSuccess={loadInternships}
      />
    </div>
  );
}
