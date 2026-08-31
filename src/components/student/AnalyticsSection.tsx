"use client";

import React from "react";
import { BarChart3, Award, FileText, CheckCircle2 } from "lucide-react";

interface AnalyticsSectionProps {
  analytics: any;
}

export default function AnalyticsSection({ analytics }: AnalyticsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Placement Readiness</p>
          <p className="text-3xl font-black text-ayush-green">{analytics?.readinessIndex || 85}%</p>
          <p className="text-[11px] text-emerald-600 font-medium">Based on skill quiz + verified badges</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tests Taken</p>
          <p className="text-3xl font-black text-ayush-dark">{analytics?.assessmentsCount || 1}</p>
          <p className="text-[11px] text-gray-500">Domain competency tests</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Applications</p>
          <p className="text-3xl font-black text-ayush-orange">{analytics?.totalApplications || 0}</p>
          <p className="text-[11px] text-gray-500">Industry & clinical roles</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Shortlisted Status</p>
          <p className="text-3xl font-black text-emerald-700">{analytics?.statusCounts?.Shortlisted || 0}</p>
          <p className="text-[11px] text-emerald-600 font-medium">Approved by mentors</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-ayush-dark">Application Status Pipeline</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "Applied", count: analytics?.statusCounts?.Applied || 0, color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "Under Review", count: analytics?.statusCounts?.["Under Review"] || 0, color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "Shortlisted", count: analytics?.statusCounts?.Shortlisted || 0, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { label: "Selected", count: analytics?.statusCounts?.Selected || 0, color: "bg-teal-50 text-teal-700 border-teal-200" },
            { label: "Rejected", count: analytics?.statusCounts?.Rejected || 0, color: "bg-rose-50 text-rose-700 border-rose-200" },
          ].map((pipe, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${pipe.color} text-center space-y-1`}>
              <p className="text-2xl font-black">{pipe.count}</p>
              <p className="text-xs font-bold">{pipe.label}</p>
            </div>
          ))}
        </div>
      </div>

      {analytics?.scoresHistory && analytics.scoresHistory.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-ayush-dark">Skill Assessment Progression</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {analytics.scoresHistory.map((item: any, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-800">{item.stream} Test</p>
                  <p className="text-[10px] text-gray-500">{item.date}</p>
                </div>
                <span className="text-sm font-black text-ayush-green bg-emerald-100 px-2.5 py-1 rounded-xl">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
