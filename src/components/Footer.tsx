import React from "react";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, Sparkles, ExternalLink } from "lucide-react";

export default function Footer() {
  const streams = [
    { name: "Ayurveda (आयुर्वेद)", desc: "Tridosha balance, Dravyaguna & Panchakarma" },
    { name: "Yoga & Naturopathy (योग व प्राकृतिक चिकित्सा)", desc: "Ashtanga, Shatkriyas & Autonomic Health" },
    { name: "Unani (यूनानी)", desc: "Humoral Akhlat, Mizaj & Regimental Tadbeer" },
    { name: "Siddha (सिद्ध)", desc: "Mukkuttram, Marma & Mineral Parpam/Chendooram" },
    { name: "Homeopathy (होम्योपैथी)", desc: "Law of Similars, Potentization & Repertory" },
  ];

  return (
    <footer className="bg-[#0A1A0D] text-slate-100 border-t-2 border-emerald-800/60 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Platform identity */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg border border-emerald-500/40">
                🌿
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-wide flex items-center space-x-2">
                  <span>AYUSH Academia-Industry Portal</span>
                </h3>
                <p className="text-xs font-semibold text-amber-300">
                  Smart India Hackathon • Problem Statement 26044 • Ministry of Ayush
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              A unified digital ecosystem bridging AYUSH scholars, academic institutions, and leading herbal/pharmaceutical industries. Empowering students with AI skill assessments, verified credentials, and dual internal/external mentor pathways.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-300 bg-emerald-900/60 px-3 py-1.5 rounded-full border border-emerald-500/40 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NCISM & NCH Aligned</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-300 bg-amber-950/70 px-3 py-1.5 rounded-full border border-amber-500/40 shadow-xs">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>Dual Mentor Framework</span>
              </span>
            </div>
          </div>

          {/* Col 2: Five AYUSH Streams */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 tracking-widest uppercase mb-4 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Five AYUSH Streams</span>
            </h4>
            <ul className="space-y-3 text-xs">
              {streams.map((s, idx) => (
                <li key={idx} className="group">
                  <span className="font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors block">
                    {s.name}
                  </span>
                  <span className="text-[11px] text-slate-400 block leading-snug">
                    {s.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 tracking-widest uppercase mb-4">
              Portal Portals
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/student" className="text-slate-300 hover:text-emerald-300 transition-colors flex items-center space-x-1.5 font-medium">
                  <span>• Student Hub & AI Assessments</span>
                </Link>
              </li>
              <li>
                <Link href="/student/portfolio" className="text-slate-300 hover:text-emerald-300 transition-colors flex items-center space-x-1.5 font-medium">
                  <span>• Digital Portfolio & Badges</span>
                </Link>
              </li>
              <li>
                <Link href="/academician" className="text-slate-300 hover:text-emerald-300 transition-colors flex items-center space-x-1.5 font-medium">
                  <span>• Academician Matrix & Evaluations</span>
                </Link>
              </li>
              <li>
                <Link href="/industry" className="text-slate-300 hover:text-emerald-300 transition-colors flex items-center space-x-1.5 font-medium">
                  <span>• Industry Postings & Filtering</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-300 hover:text-emerald-300 transition-colors flex items-center space-x-1.5 font-medium">
                  <span>• Role-Based Authentication</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 AYUSH Academia-Industry Integration Framework. Built for Smart India Hackathon.</p>
          <p className="text-emerald-400 font-semibold">Ayurveda • Yoga • Unani • Siddha • Homeopathy</p>
        </div>
      </div>
    </footer>
  );
}
