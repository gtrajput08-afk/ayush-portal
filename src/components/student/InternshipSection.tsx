"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Building, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

interface InternshipSectionProps {
  userStream?: string;
}

export default function InternshipSection({ userStream }: InternshipSectionProps) {
  const [internships, setInternships] = useState<any[]>([]);
  const [internshipStreamFilter, setInternshipStreamFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [appliedMap, setAppliedMap] = useState<Record<string, boolean>>({});
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [coverNote, setCoverNote] = useState("");
  const [applyStatus, setApplyStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  useEffect(() => {
    async function loadInternships() {
      try {
        const queryParams = new URLSearchParams();
        if (internshipStreamFilter !== "All") queryParams.append("stream", internshipStreamFilter);
        if (searchQuery) queryParams.append("query", searchQuery);

        const res = await fetch(`/api/internships?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setInternships(data.internships || []);
        }
      } catch (err) {
        console.error("Internships load error:", err);
      }
    }
    loadInternships();
  }, [internshipStreamFilter, searchQuery]);

  const handleApply = async () => {
    if (!selectedInternship) return;
    setApplyingId(selectedInternship._id);
    setApplyStatus(null);

    try {
      const res = await fetch(`/api/internships/${selectedInternship._id}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverNote }),
      });

      const data = await res.json();

      if (res.ok) {
        setAppliedMap((prev) => ({ ...prev, [selectedInternship._id]: true }));
        setApplyStatus({ success: true, message: "Application submitted successfully! Your verified portfolio and test scores have been shared." });
      } else {
        setApplyStatus({ success: false, message: data.error || "Failed to submit application." });
      }
    } catch (err) {
      setApplyStatus({ success: false, message: "An unexpected error occurred." });
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, required skills, or location..."
            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={internshipStreamFilter}
            onChange={(e) => setInternshipStreamFilter(e.target.value)}
            className="text-xs font-bold px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
          >
            <option value="All">All AYUSH Streams</option>
            <option value="Ayurveda">Ayurveda</option>
            <option value="Yoga">Yoga & Naturopathy</option>
            <option value="Unani">Unani</option>
            <option value="Siddha">Siddha</option>
            <option value="Homeopathy">Homeopathy</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {internships.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-ayush-green shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-ayush-green-light text-ayush-green border border-ayush-green/30">
                  {job.stream}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  {job.type} • {job.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-ayush-dark">{job.title}</h3>
              
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5" />
                  <span>{job.postedBy?.institution || "AYUSH Organization"}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{job.location?.district}, {job.location?.state}</span>
                </span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.requiredSkills?.map((skill: string, sIdx: number) => (
                  <span key={sIdx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400">Stipend</p>
                <p className="text-xs font-bold text-ayush-orange">{job.stipend}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedInternship(job);
                  setCoverNote(`I am excited to apply for ${job.title}. My background in ${userStream || "AYUSH"} and certified skills make me an ideal candidate.`);
                  setApplyStatus(null);
                  setApplyModalOpen(true);
                }}
                disabled={appliedMap[job._id]}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow ${
                  appliedMap[job._id]
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                    : "bg-ayush-green text-white hover:bg-ayush-green-dark"
                }`}
              >
                {appliedMap[job._id] ? "✓ Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {applyModalOpen && selectedInternship && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-ayush-green-light text-ayush-green uppercase">
                  Apply for Position
                </span>
                <h3 className="text-lg font-bold text-ayush-dark mt-1">{selectedInternship.title}</h3>
                <p className="text-xs text-gray-500">{selectedInternship.postedBy?.institution} • {selectedInternship.location?.district}</p>
              </div>
              <button onClick={() => setApplyModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">✕</button>
            </div>

            {applyStatus && (
              <div className={`p-3.5 rounded-xl text-xs flex items-center space-x-2 ${
                applyStatus.success ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
              }`}>
                {applyStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                <span>{applyStatus.message}</span>
              </div>
            )}

            {!applyStatus?.success && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Cover Note & Pitch to Recruiter</label>
                  <textarea
                    rows={4}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Describe your clinical skills, domain knowledge, and why you are keen on this role..."
                    className="w-full p-3 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
                  />
                </div>

                <div className="p-3 rounded-xl bg-ayush-sand border border-ayush-green/20 text-[11px] text-gray-600 space-y-1">
                  <p className="font-bold text-ayush-green">✓ Digital Portfolio Verified Badges Attached</p>
                  <p>Your assessment scores, Schedule T certificates, and student projects will be transmitted directly to the hiring mentor.</p>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button onClick={() => setApplyModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-300 hover:bg-gray-100 text-gray-700">Cancel</button>
                  <button onClick={handleApply} disabled={applyingId !== null} className="px-5 py-2 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-xs shadow disabled:opacity-50">
                    {applyingId !== null ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </div>
            )}

            {applyStatus?.success && (
              <div className="text-center pt-2">
                <button onClick={() => setApplyModalOpen(false)} className="px-6 py-2.5 rounded-xl bg-ayush-green text-white font-bold text-xs shadow hover:bg-ayush-green-dark">Close & View Applications</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
