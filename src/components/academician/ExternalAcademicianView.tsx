"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, CheckCircle2, AlertCircle, Award, Star, FileText } from "lucide-react";

export default function ExternalAcademicianView() {
  const [students, setStudents] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  
  // Evaluation form state
  const [problemSolving, setProblemSolving] = useState(4);
  const [communication, setCommunication] = useState(4);
  const [curiosity, setCuriosity] = useState(5);
  const [practicalInstincts, setPracticalInstincts] = useState(4);
  const [hiddenGemsNotes, setHiddenGemsNotes] = useState("");
  const [projectsBuiltReview, setProjectsBuiltReview] = useState("");
  const [overallVerdict, setOverallVerdict] = useState<"Strongly Recommended" | "Recommended" | "Needs Development">("Recommended");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  const loadData = async () => {
    try {
      const [resStudents, resEvals] = await Promise.all([
        fetch("/api/academician/students"),
        fetch("/api/academician/evaluate"),
      ]);
      if (resStudents.ok) {
        const data = await resStudents.json();
        setStudents(data.students || []);
        if (data.students?.length > 0 && !selectedStudentId) {
          setSelectedStudentId(data.students[0].id);
        }
      }
      if (resEvals.ok) {
        const data = await resEvals.json();
        setEvaluations(data.evaluations || []);
      }
    } catch (err) {
      console.error("Load evaluations error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !hiddenGemsNotes) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/academician/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudentId,
          problemSolving,
          communication,
          curiosity,
          practicalInstincts,
          hiddenGemsNotes,
          projectsBuiltReview,
          overallVerdict,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ success: true, text: "Qualitative candidate evaluation submitted successfully! Recruiter view updated." });
        setHiddenGemsNotes("");
        setProjectsBuiltReview("");
        loadData();
      } else {
        setMessage({ success: false, text: data.error || "Failed to submit evaluation." });
      }
    } catch (err) {
      setMessage({ success: false, text: "An error occurred while submitting." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
        <h3 className="text-sm font-bold text-amber-900">
          External Mentor Qualitative Candidate Assessment Framework
        </h3>
        <p className="text-xs text-amber-800">
          Industry-side academicians evaluate prospective talent beyond marks: observing practical agility, curiosity, communication, and "hidden gem" instincts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-2.5 pb-3 border-b border-gray-100">
            <Sparkles className="w-5 h-5 text-ayush-orange" />
            <h2 className="text-base font-bold text-ayush-dark">Submit Qualitative Candidate Evaluation</h2>
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
              message.success ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {message.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmitEvaluation} className="space-y-5">
            
            {/* Student Select */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Select Candidate Scholar</label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full px-3 py-2.5 text-xs font-semibold rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.stream}) • {s.institution}
                  </option>
                ))}
              </select>
            </div>

            {/* 4 Qualitative Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Problem-Solving Attitude</span>
                  <span className="text-ayush-green font-black">{problemSolving} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={problemSolving}
                  onChange={(e) => setProblemSolving(Number(e.target.value))}
                  className="w-full accent-ayush-green cursor-pointer"
                />
                <p className="text-[10px] text-gray-500">Resourcefulness during clinical scenarios</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Real-World Communication</span>
                  <span className="text-ayush-green font-black">{communication} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={communication}
                  onChange={(e) => setCommunication(Number(e.target.value))}
                  className="w-full accent-ayush-green cursor-pointer"
                />
                <p className="text-[10px] text-gray-500">Clarity with patients and multidisciplinary peers</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Curiosity & Coachability</span>
                  <span className="text-ayush-orange font-black">{curiosity} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={curiosity}
                  onChange={(e) => setCuriosity(Number(e.target.value))}
                  className="w-full accent-ayush-orange cursor-pointer"
                />
                <p className="text-[10px] text-gray-500">Willingness to learn contemporary pharma tools</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Practical Diagnostic Instincts</span>
                  <span className="text-ayush-orange font-black">{practicalInstincts} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={practicalInstincts}
                  onChange={(e) => setPracticalInstincts(Number(e.target.value))}
                  className="w-full accent-ayush-orange cursor-pointer"
                />
                <p className="text-[10px] text-gray-500">Intuition with classical diagnostic parameters</p>
              </div>

            </div>

            {/* Hidden Gems Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                "Hidden Gems" Qualitative Notes & Industry Potential (Mandatory)
              </label>
              <textarea
                rows={3}
                value={hiddenGemsNotes}
                onChange={(e) => setHiddenGemsNotes(e.target.value)}
                placeholder="Detail why this candidate is a hidden gem (e.g. Demonstrated exceptional diagnostic intuition connecting Charaka Samhita with modern liver enzyme assays)..."
                required
                className="w-full p-3 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
              />
            </div>

            {/* Overall Verdict */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Overall Mentorship Verdict</label>
              <select
                value={overallVerdict}
                onChange={(e) => setOverallVerdict(e.target.value as any)}
                className="w-full px-3 py-2.5 text-xs font-bold rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
              >
                <option value="Strongly Recommended">🌟 Strongly Recommended for Pharma & Research R&D</option>
                <option value="Recommended">✓ Recommended</option>
                <option value="Needs Development">Needs Further Clinical Development</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-ayush-orange hover:bg-ayush-orange-dark text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
            >
              {loading ? "Saving Evaluation..." : "Save Qualitative Assessment to Platform"}
            </button>
          </form>
        </div>

        {/* Right Column: Past Evaluations */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Recent Candidate Reviews</h3>
              <span className="text-xs font-bold text-gray-500">{evaluations.length} Submitted</span>
            </div>

            <div className="space-y-3">
              {evaluations.map((ev) => (
                <div key={ev._id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{ev.studentId?.name || "Student Scholar"}</p>
                      <p className="text-[10px] text-gray-500">{ev.studentId?.stream} • {ev.studentId?.institution}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {ev.overallVerdict}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 text-center py-1 bg-white rounded-lg border border-gray-100 text-[10px]">
                    <div>
                      <span className="text-gray-400 block">Problem</span>
                      <span className="font-bold text-ayush-green">{ev.problemSolving}/5</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Comm</span>
                      <span className="font-bold text-ayush-green">{ev.communication}/5</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Curiosity</span>
                      <span className="font-bold text-ayush-orange">{ev.curiosity}/5</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Instinct</span>
                      <span className="font-bold text-ayush-orange">{ev.practicalInstincts}/5</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-600 italic">
                    "{ev.hiddenGemsNotes}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
