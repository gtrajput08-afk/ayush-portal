"use client";

import React from "react";
import { BrainCircuit, Calendar, FileCheck, BookOpen, Building, ShieldCheck, Layers, Award } from "lucide-react";

export function InternalTrackSection() {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
        <h3 className="text-sm font-bold text-blue-900">Internal Mentor Track (College-Side Guidance)</h3>
        <p className="text-xs text-blue-700">
          Curated modules for academic progression, institutional degree standards, soft skill workshops, and university exam calendars.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-ayush-green">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Soft Skill Training for Clinicians</h4>
              <p className="text-[11px] text-gray-500">Effective patient bedside empathy, communication & case presentation</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <span>Module 1: Cross-cultural Patient History Taking</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Enrolled</span>
            </li>
            <li className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <span>Module 2: Inter-professional Integrative Rounds (Allopathy + Ayush)</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Available</span>
            </li>
            <li className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
              <span>Module 3: Medical Ethics & NCISM Legal Compliance</span>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Available</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Upcoming College Training Sessions</h4>
              <p className="text-[11px] text-gray-500">Live faculty lectures & clinical demonstrations</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="p-2.5 rounded-xl bg-gray-50 space-y-1">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Advanced Nadi Pariksha Oscillogram Workshop</span>
                <span className="text-ayush-green text-[11px]">Sept 15, 2026</span>
              </div>
              <p className="text-[11px] text-gray-500">Conducted by Department of Kayachikitsa</p>
            </li>
            <li className="p-2.5 rounded-xl bg-gray-50 space-y-1">
              <div className="flex justify-between font-bold text-gray-800">
                <span>Clinical Research Protocol Formulation (GCP)</span>
                <span className="text-ayush-green text-[11px]">Oct 02, 2026</span>
              </div>
              <p className="text-[11px] text-gray-500">Faculty Guide: Prof. Dr. Rajeshwar Sharma</p>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Offline University Exam Schedule</h4>
              <p className="text-[11px] text-gray-500">Annual theory & practical examination dates</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">Dravyaguna & Pharmacology Practical</p>
                <p className="text-[11px] text-gray-500">Exam Hall B • 09:00 AM</p>
              </div>
              <span className="font-bold text-amber-800 text-xs">Nov 12, 2026</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-900">Kayachikitsa / Clinical Case Viva</p>
                <p className="text-[11px] text-gray-500">Hospital Ward 4 • 10:30 AM</p>
              </div>
              <span className="font-bold text-amber-800 text-xs">Nov 18, 2026</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Degree & Post-Graduate Pathways</h4>
              <p className="text-[11px] text-gray-500">Specialization avenues across AYUSH</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">MD / MS (Ayurveda)</p>
              <p className="text-[10px] text-gray-500">Panchakarma, Shalya, Dravyaguna</p>
            </div>
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">MD (Yoga & Naturopathy)</p>
              <p className="text-[10px] text-gray-500">Clinical Yoga Therapy</p>
            </div>
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">MD (Unani)</p>
              <p className="text-[10px] text-gray-500">Ilmul Advia & Moalajat</p>
            </div>
            <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">MD (Homoeopathy)</p>
              <p className="text-[10px] text-gray-500">Organon & Repertory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExternalTrackSection() {
  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200">
        <h3 className="text-sm font-bold text-ayush-orange">External Mentor Track (Industry-Side Guidance)</h3>
        <p className="text-xs text-orange-800">
          Corporate exposure bootcamps, Schedule T GMP manufacturing certifications, hybrid exams, and botanical extraction masterclasses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-orange-100 text-ayush-orange">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Industry Exposure Programs</h4>
              <p className="text-[11px] text-gray-500">Factory visits and manufacturing plant internships</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-600">
            <li className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Dabur Botanical R&D Residency</p>
                <p className="text-[11px] text-gray-500">2-week immersive phytochemistry & QA testing</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Open</span>
            </li>
            <li className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Himalaya Herbal Extraction Bootcamp</p>
                <p className="text-[11px] text-gray-500">Supercritical CO2 pilot plant operations</p>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Next: Oct</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-ayush-green">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Industry Certificates & Badges</h4>
              <p className="text-[11px] text-gray-500">Standardized credentials recognized across AYUSH pharma</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-950">Schedule T (GMP) Quality Lead</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">Verified</span>
              </div>
              <p className="text-[11px] text-gray-600">Issued by Pharmacopoeia Commission for Indian Medicine</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-950">Ayush Standard Mark Auditor</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">In Progress</span>
              </div>
              <p className="text-[11px] text-gray-600">QCI certification for botanical export standards</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Exam Options (Online / Hybrid)</h4>
              <p className="text-[11px] text-gray-500">Flexible industry certification assessments</p>
            </div>
          </div>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="p-2.5 rounded-xl bg-gray-50 flex justify-between items-center">
              <span>Pharmacovigilance Associate Exam (Online Proctored)</span>
              <span className="font-bold text-ayush-green text-xs">Every Sunday</span>
            </li>
            <li className="p-2.5 rounded-xl bg-gray-50 flex justify-between items-center">
              <span>Herbal Drug Regulatory Affairs (Hybrid Viva)</span>
              <span className="font-bold text-ayush-green text-xs">Quarterly</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Industry Specialization Courses</h4>
              <p className="text-[11px] text-gray-500">Co-developed with pharmaceutical R&D labs</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">Phytochemical Fingerprinting</p>
              <p className="text-[10px] text-gray-500">TLC, HPTLC, HPLC for Botanicals</p>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <p className="font-bold text-gray-800">Ayush Clinical Trial Design</p>
              <p className="text-[10px] text-gray-500">GCP-Ayush & Double Blind Trials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
