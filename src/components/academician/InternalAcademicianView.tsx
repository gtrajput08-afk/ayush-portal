"use client";

import React, { useState, useEffect } from "react";
import { Users, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Search } from "lucide-react";

export default function InternalAcademicianView() {
  const [students, setStudents] = useState<any[]>([]);
  const [streamStats, setStreamStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [streamFilter, setStreamFilter] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/academician/students");
        if (res.ok) {
          const data = await res.json();
          setStudents(data.students || []);
          setStreamStats(data.streamStats || {});
        }
      } catch (err) {
        console.error("Load students error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.institution.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStream = streamFilter === "All" || s.stream === streamFilter;
    return matchesSearch && matchesStream;
  });

  return (
    <div className="space-y-8">
      {/* Branch-wise Employability & Readiness Benchmark */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-ayush-green" />
          <h2 className="text-lg font-bold text-ayush-dark">
            Branch-wise Employability & Placement Readiness Index
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"].map((st) => {
            const stat = streamStats[st] || { avgReadiness: 78, total: 1 };
            return (
              <div key={st} className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
                <p className="text-xs font-bold text-gray-500">{st}</p>
                <p className="text-2xl font-black text-ayush-green">{stat.avgReadiness}%</p>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-ayush-green h-full rounded-full"
                    style={{ width: `${stat.avgReadiness}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{stat.total} Enrolled Scholar{stat.total === 1 ? "" : "s"}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Skill Matrix Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-ayush-dark">Student Clinical Skill Matrix</h2>
            <p className="text-xs text-gray-500">
              Real-time monitoring of competency scores, common diagnostic gaps, and industry placement index.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by student name..."
              className="text-xs px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
            />
            <select
              value={streamFilter}
              onChange={(e) => setStreamFilter(e.target.value)}
              className="text-xs font-bold px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ayush-green"
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

        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500">Loading student skill matrix...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ayush-sand text-gray-700 uppercase font-bold text-[10px] tracking-wider border-y border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Student & Institution</th>
                  <th className="py-3.5 px-4">Stream</th>
                  <th className="py-3.5 px-4">Assessment Score</th>
                  <th className="py-3.5 px-4">Core Strengths</th>
                  <th className="py-3.5 px-4">Identified Skill Gaps</th>
                  <th className="py-3.5 px-4">Placement Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-gray-900">{s.name}</p>
                      <p className="text-[11px] text-gray-500">{s.institution}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-ayush-green bg-ayush-green-light px-2 py-0.5 rounded">
                        {s.stream}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {s.latestScore !== null ? (
                        <span className={`font-bold px-2 py-0.5 rounded ${
                          s.latestScore >= 80 ? "text-emerald-800 bg-emerald-100" :
                          s.latestScore >= 60 ? "text-amber-800 bg-amber-100" : "text-rose-800 bg-rose-100"
                        }`}>
                          {s.latestScore}%
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Pending Test</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {s.strengths?.slice(0, 2).map((str: string, idx: number) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                            {str}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {s.skillGaps?.slice(0, 2).map((gap: string, idx: number) => (
                          <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                            {gap}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-ayush-dark">{s.readinessScore}%</span>
                        <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-ayush-green h-full rounded-full" style={{ width: `${s.readinessScore}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
