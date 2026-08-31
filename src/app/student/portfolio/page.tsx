"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Layers, 
  Briefcase, 
  FileText, 
  Plus, 
  Sparkles, 
  User, 
  GraduationCap,
  MessageSquare
} from "lucide-react";

export default function DigitalPortfolioPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch("/api/student/portfolio");
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data.portfolio);
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Portfolio load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjDesc) return;

    try {
      const updatedProjects = [
        ...(portfolio?.projects || []),
        {
          title: newProjTitle,
          description: newProjDesc,
          stream: user?.stream || "Ayurveda",
          status: "Completed",
        },
      ];

      const res = await fetch("/api/student/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: updatedProjects }),
      });

      if (res.ok) {
        setNewProjTitle("");
        setNewProjDesc("");
        setNewProjectOpen(false);
        loadData();
      }
    } catch (err) {
      console.error("Add project error:", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-ayush-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs text-gray-500">Loading verified digital portfolio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified AYUSH Portfolio</span>
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-ayush-orange-light text-ayush-orange border border-ayush-orange/30">
              {user?.stream || "Ayurveda"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ayush-dark">
            {user?.name || "Scholar Portfolio"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            {portfolio?.headline || "Aspiring AYUSH Practitioner & Clinical Researcher"}
          </p>
          <p className="text-xs text-gray-500">{user?.institution || "National Institute of Ayurveda"}</p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/student"
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold hover:bg-gray-50 text-gray-700"
          >
            ← Back to Student Hub
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Verified Skills & Certificates */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Verified Skills */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <Award className="w-5 h-5 text-ayush-green" />
                <h2 className="text-base font-bold text-ayush-dark">Verified Domain Competencies</h2>
              </div>
              <span className="text-xs font-bold text-emerald-700">
                {portfolio?.verifiedSkills?.length || 0} Badges Earned
              </span>
            </div>

            <div className="space-y-3">
              {portfolio?.verifiedSkills && portfolio.verifiedSkills.length > 0 ? (
                portfolio.verifiedSkills.map((skill: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-ayush-sand/60 border border-ayush-green/20 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-900">{skill.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-gray-100 text-gray-700">
                          {skill.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">
                        Verified by {skill.verifiedBy || "AYUSH National Engine"} • Level: {skill.level}
                      </p>
                    </div>

                    <span className={`text-[11px] font-black px-3 py-1 rounded-full border shrink-0 ${
                      skill.badge === "Gold" ? "bg-amber-100 text-amber-900 border-amber-300" :
                      skill.badge === "Silver" ? "bg-slate-100 text-slate-800 border-slate-300" :
                      "bg-orange-100 text-orange-900 border-orange-300"
                    }`}>
                      {skill.badge} Badge
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 py-4 text-center">
                  Take a skill assessment in the Student Hub to earn verified badges.
                </p>
              )}
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100">
              <ShieldCheck className="w-5 h-5 text-ayush-orange" />
              <h2 className="text-base font-bold text-ayush-dark">Certificates & Regulatory Accreditations</h2>
            </div>

            <div className="space-y-3">
              {portfolio?.certificates && portfolio.certificates.length > 0 ? (
                portfolio.certificates.map((cert: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-900">{cert.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {cert.verificationStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Issuer: {cert.issuer} • Issued on {cert.issueDate}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-ayush-green hover:underline inline-flex items-center space-x-1"
                      >
                        <span>Verify Credential on Ministry Registry</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 py-4 text-center">No certificates uploaded yet.</p>
              )}
            </div>
          </div>

          {/* Student Projects */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2.5">
                <Layers className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-ayush-dark">Academic & Translational Projects</h2>
              </div>
              <button
                onClick={() => setNewProjectOpen(!newProjectOpen)}
                className="px-3 py-1.5 rounded-xl bg-ayush-green-light text-ayush-green hover:bg-ayush-green hover:text-white transition-colors text-xs font-bold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {newProjectOpen && (
              <form onSubmit={handleAddProject} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <p className="text-xs font-bold text-gray-800">Add New AYUSH Project</p>
                <input
                  type="text"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="Project Title (e.g. Phytochemical Standardization of Ashwagandha)"
                  required
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
                />
                <textarea
                  rows={3}
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="Project description, methodologies, clinical or analytical results..."
                  required
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setNewProjectOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold bg-ayush-green text-white rounded-lg hover:bg-ayush-green-dark"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {portfolio?.projects && portfolio.projects.length > 0 ? (
                portfolio.projects.map((proj: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-900">{proj.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {proj.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{proj.description}</p>
                    <span className="text-[10px] font-semibold text-gray-400">Stream: {proj.stream}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 py-4 text-center">No projects added yet.</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Applications List with Status & Mentor Feedback */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-ayush-orange" />
                <h2 className="text-base font-bold text-ayush-dark">My Active Applications</h2>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-ayush-orange-light text-ayush-orange">
                {applications.length} Total
              </span>
            </div>

            <div className="space-y-4">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <div
                    key={app._id}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">
                          {app.internshipId?.title || "AYUSH Position"}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          {app.internshipId?.location?.district}, {app.internshipId?.location?.state}
                        </p>
                      </div>

                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shrink-0 ${
                        app.status === "Shortlisted" ? "bg-emerald-100 text-emerald-800 border-emerald-300" :
                        app.status === "Selected" ? "bg-teal-100 text-teal-800 border-teal-300" :
                        app.status === "Under Review" ? "bg-amber-100 text-amber-800 border-amber-300" :
                        app.status === "Rejected" ? "bg-rose-100 text-rose-800 border-rose-300" :
                        "bg-blue-100 text-blue-800 border-blue-300"
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    {app.coverNote && (
                      <p className="text-[11px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-100 italic">
                        "{app.coverNote}"
                      </p>
                    )}

                    {/* Mentor Feedback Feed */}
                    {app.mentorFeedback && app.mentorFeedback.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center space-x-1">
                          <MessageSquare className="w-3 h-3 text-ayush-green" />
                          <span>Mentor Feedback Notes:</span>
                        </p>
                        {app.mentorFeedback.map((fb: any, fbIdx: number) => (
                          <div
                            key={fbIdx}
                            className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-950 space-y-0.5"
                          >
                            <div className="flex justify-between items-center text-[10px] font-bold text-emerald-800">
                              <span>{fb.authorName} ({fb.authorRole})</span>
                              <span className="font-normal opacity-70">
                                {new Date(fb.createdAt).toLocaleDateString("en-IN")}
                              </span>
                            </div>
                            <p>{fb.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center space-y-2">
                  <Briefcase className="w-8 h-8 text-gray-300 mx-auto" />
                  <p className="text-xs text-gray-500">No applications submitted yet.</p>
                  <Link
                    href="/student?tab=jobs"
                    className="text-xs font-bold text-ayush-green hover:underline inline-block"
                  >
                    Browse available opportunities →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
