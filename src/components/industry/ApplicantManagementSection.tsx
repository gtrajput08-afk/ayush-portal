"use client";

import React, { useState } from "react";
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Star, 
  Sparkles, 
  Layers, 
  Filter, 
  FileText,
  Building,
  Award
} from "lucide-react";

interface ApplicantManagementSectionProps {
  internship: any;
  mentorType: "internal" | "external";
  onStatusUpdated: () => void;
}

export default function ApplicantManagementSection({
  internship,
  mentorType,
  onStatusUpdated,
}: ApplicantManagementSectionProps) {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [skillFilter, setSkillFilter] = useState("");
  const [minProblemSolving, setMinProblemSolving] = useState(0);
  const [minProjects, setMinProjects] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedbackNote, setFeedbackNote] = useState("");
  const [feedbackModalId, setFeedbackModalId] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<string>("");

  React.useEffect(() => {
    async function loadApplicants() {
      if (!internship?._id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/internships/${internship._id}/applicants`);
        if (res.ok) {
          const data = await res.json();
          setApplicants(data.applicants || []);
        }
      } catch (err) {
        console.error("Load applicants error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadApplicants();
  }, [internship?._id]);

  const handleUpdateStatus = async (applicationId: string, status: string, customNote?: string) => {
    setUpdatingId(applicationId);
    try {
      const res = await fetch(`/api/internships/${internship._id}/applicants`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          status,
          feedbackNote: customNote || (status === "Shortlisted" ? "Candidate shortlisted by industry recruiter." : "Application reviewed."),
        }),
      });

      if (res.ok) {
        setApplicants((prev) =>
          prev.map((app) => (app._id === applicationId ? { ...app, status } : app))
        );
        onStatusUpdated();
        setFeedbackModalId(null);
        setFeedbackNote("");
      }
    } catch (err) {
      console.error("Update status error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredApplicants = applicants.filter((app) => {
    const student = app.studentId;
    if (!student) return false;

    // Filter by skill keyword
    const hasSkill =
      !skillFilter ||
      app.portfolio?.verifiedSkills?.some((sk: any) =>
        sk.name.toLowerCase().includes(skillFilter.toLowerCase())
      );

    if (mentorType === "external") {
      const evalItem = app.evaluations?.[0];
      const probScore = evalItem ? evalItem.problemSolving : 3;
      const matchesRating = probScore >= minProblemSolving;
      return hasSkill && matchesRating;
    } else {
      const projectCount = app.portfolio?.projects?.length || 0;
      const matchesProjects = projectCount >= minProjects;
      return hasSkill && matchesProjects;
    }
  });

  return (
    <div className="space-y-6">
      {/* Role-Specific Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-ayush-orange" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              {mentorType === "external"
                ? "External Mentor Candidate Filter (Qualitative Problem-Solving & Notes)"
                : "Internal Mentor Candidate Filter (Academic Projects & Institution)"}
            </h4>
          </div>
          <span className="text-xs font-bold text-gray-500">
            Showing {filteredApplicants.length} of {applicants.length} Applicants
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-bold text-gray-600 block mb-1">Filter by Verified Skill</label>
            <input
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder="e.g. Schedule T, Dravyaguna, Extraction..."
              className="w-full p-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
            />
          </div>

          {mentorType === "external" ? (
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1">
                <span>Min Problem-Solving Rating</span>
                <span className="text-ayush-orange font-bold">{minProblemSolving} / 5 Stars</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={minProblemSolving}
                onChange={(e) => setMinProblemSolving(Number(e.target.value))}
                className="w-full accent-ayush-orange cursor-pointer"
              />
            </div>
          ) : (
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-600 mb-1">
                <span>Min Verified Projects Built</span>
                <span className="text-ayush-green font-bold">{minProjects} Project(s)</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={minProjects}
                onChange={(e) => setMinProjects(Number(e.target.value))}
                className="w-full accent-ayush-green cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Applicants List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-gray-500">Loading applicants data...</div>
      ) : filteredApplicants.length > 0 ? (
        <div className="space-y-4">
          {filteredApplicants.map((app) => {
            const student = app.studentId;
            const evalItem = app.evaluations?.[0];

            return (
              <div
                key={app._id}
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 hover:border-gray-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-bold text-gray-900">{student?.name}</h4>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-ayush-green-light text-ayush-green">
                        {student?.stream}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{student?.institution} • {student?.email}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                      app.status === "Shortlisted" ? "bg-emerald-100 text-emerald-800 border-emerald-300" :
                      app.status === "Selected" ? "bg-teal-100 text-teal-800 border-teal-300" :
                      app.status === "Rejected" ? "bg-rose-100 text-rose-800 border-rose-300" :
                      "bg-blue-100 text-blue-800 border-blue-300"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* Cover Note */}
                {app.coverNote && (
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                    "{app.coverNote}"
                  </p>
                )}

                {/* Verified Skills & Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Verified Badges:</span>
                  {app.portfolio?.verifiedSkills?.map((sk: any, idx: number) => (
                    <span
                      key={idx}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        sk.badge === "Gold" ? "bg-amber-100 text-amber-900 border-amber-300" : "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      ★ {sk.name} ({sk.badge})
                    </span>
                  ))}
                </div>

                {/* Mentor-Specific Insights */}
                {mentorType === "external" && evalItem && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-amber-950">
                      <span className="flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-ayush-orange" />
                        <span>Qualitative Evaluation Insights</span>
                      </span>
                      <span>Problem Solving: {evalItem.problemSolving}/5 • Curiosity: {evalItem.curiosity}/5</span>
                    </div>
                    <p className="text-[11px] text-amber-900 leading-snug">
                      <strong>Hidden Gem Note:</strong> "{evalItem.hiddenGemsNotes}"
                    </p>
                  </div>
                )}

                {mentorType === "internal" && app.portfolio?.projects && (
                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                    <p className="text-xs font-bold text-blue-950 flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-blue-700" />
                      <span>Academic Project Portfolio ({app.portfolio.projects.length} Built)</span>
                    </p>
                    {app.portfolio.projects.map((proj: any, pIdx: number) => (
                      <div key={pIdx} className="text-[11px] text-blue-900">
                        • <strong>{proj.title}:</strong> {proj.description}
                      </div>
                    ))}
                  </div>
                )}

                {/* Recruiter Action Buttons */}
                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setFeedbackModalId(app._id);
                      setPendingStatus("Rejected");
                    }}
                    disabled={updatingId === app._id || app.status === "Rejected"}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-40"
                  >
                    ✕ Reject Candidate
                  </button>

                  <button
                    onClick={() => {
                      setFeedbackModalId(app._id);
                      setPendingStatus("Shortlisted");
                    }}
                    disabled={updatingId === app._id || app.status === "Shortlisted"}
                    className="px-4 py-1.5 text-xs font-bold rounded-xl text-white bg-ayush-green hover:bg-ayush-green-dark transition-colors shadow disabled:opacity-40"
                  >
                    ✓ Shortlist for Interview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-gray-500 bg-white rounded-2xl border border-gray-200">
          No applicants match the selected skill or rating criteria.
        </div>
      )}

      {/* Recruiter Note Modal */}
      {feedbackModalId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-200 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-ayush-dark">
              Confirm Status Change to: <span className="text-ayush-orange">{pendingStatus}</span>
            </h3>
            <textarea
              rows={3}
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="Add mentor/recruiter feedback note (visible in candidate's portfolio)..."
              className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setFeedbackModalId(null)}
                className="px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(feedbackModalId, pendingStatus, feedbackNote)}
                className="px-4 py-1.5 text-xs font-bold bg-ayush-green text-white rounded-xl hover:bg-ayush-green-dark"
              >
                Confirm & Send Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
