"use client";

import React, { useState, useEffect } from "react";
import { Plus, BookOpen, Layers, CheckCircle2, AlertCircle, Calendar, IndianRupee } from "lucide-react";

export default function FdpPostingSection() {
  const [items, setItems] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState<"FDP" | "Research Project" | "Consultancy">("FDP");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stream, setStream] = useState("All");
  const [eligibility, setEligibility] = useState("AYUSH Faculty & Researchers");
  const [fundingAmount, setFundingAmount] = useState("");
  const [duration, setDuration] = useState("5 Days");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const loadItems = async () => {
    try {
      const res = await fetch("/api/fdp-research");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Load FDP error:", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/fdp-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title,
          description,
          stream,
          eligibility,
          fundingAmount: fundingAmount || "Ministry / Institutional Grant",
          duration,
        }),
      });

      if (res.ok) {
        setStatusMsg("Opportunity posted successfully!");
        setTitle("");
        setDescription("");
        setOpenModal(false);
        loadItems();
      }
    } catch (err) {
      console.error("Create FDP error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ayush-dark">Faculty Development & Research Portals</h2>
          <p className="text-xs text-gray-500">
            Publish and discover collaborative FDP workshops, ICMR/CCRAS joint grants, and industry consultancies.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2.5 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-xs shadow flex items-center space-x-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Post FDP / Research Grant</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.type === "FDP" ? "bg-blue-100 text-blue-800" :
                  item.type === "Research Project" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                }`}>
                  {item.type} • {item.stream}
                </span>
                <span className="text-[11px] text-gray-500">{item.duration}</span>
              </div>

              <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <div>
                <p className="text-gray-400">Funding / Grant</p>
                <p className="font-bold text-ayush-orange">{item.fundingAmount}</p>
              </div>
              <span className="text-gray-500 font-medium">{item.postedBy?.name}</span>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gray-200 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-ayush-dark">Post FDP / Research Opportunity</h3>
              <button onClick={() => setOpenModal(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-gray-700">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2 text-xs rounded-xl border border-gray-300"
                  >
                    <option value="FDP">Faculty Development (FDP)</option>
                    <option value="Research Project">Research Grant Project</option>
                    <option value="Consultancy">Industry Consultancy</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700">Target Stream</label>
                  <select
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-gray-300"
                  >
                    <option value="All">All Streams</option>
                    <option value="Ayurveda">Ayurveda</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Unani">Unani</option>
                    <option value="Siddha">Siddha</option>
                    <option value="Homeopathy">Homeopathy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule T GMP Integration in AYUSH Pedagogy"
                  required
                  className="w-full p-2 text-xs rounded-xl border border-gray-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700">Description & Objectives</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline syllabus, deliverables, lab infrastructure requirements..."
                  required
                  className="w-full p-2 text-xs rounded-xl border border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-gray-700">Funding / Grant Amount</label>
                  <input
                    type="text"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(e.target.value)}
                    placeholder="e.g. ₹25 Lakhs / Sponsored"
                    className="w-full p-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 5 Days / 12 Months"
                    className="w-full p-2 text-xs rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1.5 text-xs font-bold bg-ayush-green text-white rounded-xl hover:bg-ayush-green-dark"
                >
                  {loading ? "Publishing..." : "Publish Posting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
