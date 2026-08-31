"use client";

import React, { useState } from "react";
import { Plus, Building, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

interface PostInternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PostInternshipModal({ isOpen, onClose, onSuccess }: PostInternshipModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [stream, setStream] = useState("Ayurveda");
  const [state, setState] = useState("Delhi NCR");
  const [district, setDistrict] = useState("Ghaziabad");
  const [stipend, setStipend] = useState("₹20,000 / month");
  const [duration, setDuration] = useState("6 Months");
  const [type, setType] = useState<"On-site" | "Remote" | "Hybrid">("On-site");
  const [openings, setOpenings] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const skillsArray = skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch("/api/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          requiredSkills: skillsArray.length > 0 ? skillsArray : ["AYUSH Clinical Skills"],
          stream,
          location: { state, district },
          stipend,
          duration,
          type,
          openings: Number(openings),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        setError(data.error || "Failed to post internship");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-gray-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <h3 className="text-base font-bold text-ayush-dark">Post AYUSH Internship / Industrial Role</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-700">Job / Internship Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ayush Pharmacovigilance & Formulation Analyst"
              required
              className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayush-green"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700">Role Description & Responsibilities</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline lab activities, Schedule T compliance, extraction tasks..."
              required
              className="w-full p-2.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-ayush-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-gray-700">Target Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full p-2 text-xs rounded-xl border border-gray-300"
              >
                <option value="Ayurveda">Ayurveda</option>
                <option value="Yoga">Yoga & Naturopathy</option>
                <option value="Unani">Unani</option>
                <option value="Siddha">Siddha</option>
                <option value="Homeopathy">Homeopathy</option>
                <option value="All">All AYUSH Streams</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700">Work Mode</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2 text-xs rounded-xl border border-gray-300"
              >
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="e.g. Schedule T GMP, HPTLC Fingerprinting, Pharmacovigilance"
              className="w-full p-2.5 text-xs rounded-xl border border-gray-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-gray-700">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Delhi NCR / Karnataka"
                required
                className="w-full p-2 text-xs rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700">District / City</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Ghaziabad / Bengaluru"
                required
                className="w-full p-2 text-xs rounded-xl border border-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-bold text-gray-700">Stipend</label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                placeholder="₹20,000 / month"
                className="w-full p-2 text-xs rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="6 Months"
                className="w-full p-2 text-xs rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700">Openings</label>
              <input
                type="number"
                min="1"
                value={openings}
                onChange={(e) => setOpenings(Number(e.target.value))}
                className="w-full p-2 text-xs rounded-xl border border-gray-300"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold border border-gray-300 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-bold bg-ayush-orange text-white rounded-xl hover:bg-ayush-orange-dark shadow disabled:opacity-50"
            >
              {loading ? "Posting..." : "Publish Internship Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
