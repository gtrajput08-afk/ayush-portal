import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";

export default function Footer() {
  const streams = [
    { name: "Ayurveda (आयुर्वेद)", desc: "Tridosha balance, Dravyaguna & Panchakarma" },
    { name: "Yoga & Naturopathy (योग व प्राकृतिक चिकित्सा)", desc: "Ashtanga, Shatkriyas & Autonomic Health" },
    { name: "Unani (यूनानी)", desc: "Humoral Akhlat, Mizaj & Regimental Tadbeer" },
    { name: "Siddha (सिद्ध)", desc: "Mukkuttram, Marma & Mineral Parpam/Chendooram" },
    { name: "Homeopathy (होम्योपैथी)", desc: "Law of Similars, Potentization & Repertory" },
  ];

  return (
    <footer className="bg-ayush-dark text-white border-t border-ayush-green/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Platform identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-ayush-green text-white flex items-center justify-center font-bold text-xl shadow-lg border border-ayush-green-border/40">
                🌿
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  AYUSH Academia-Industry Portal
                </h3>
                <p className="text-xs text-ayush-green-border">
                  Smart India Hackathon • Problem Statement 26044 • Ministry of Ayush
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 max-w-md leading-relaxed">
              A unified digital ecosystem bridging AYUSH scholars, academic institutions, and leading herbal/pharmaceutical industries. Empowering students with AI skill assessments, verified credentials, and dual internal/external mentor pathways.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>NCISM & NCH Aligned</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Dual Mentor Framework</span>
              </span>
            </div>
          </div>

          {/* Col 2: Five AYUSH Streams */}
          <div>
            <h4 className="text-sm font-semibold text-ayush-orange tracking-wider uppercase mb-3">
              Five AYUSH Streams
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {streams.map((s, idx) => (
                <li key={idx} className="hover:text-white transition-colors">
                  <span className="font-medium text-emerald-300 block">{s.name}</span>
                  <span className="text-[11px] text-gray-400">{s.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-ayush-orange tracking-wider uppercase mb-3">
              Portal Portals
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/student" className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                  <span>Student Hub & AI Assessments</span>
                </Link>
              </li>
              <li>
                <Link href="/student/portfolio" className="hover:text-emerald-400 transition-colors">
                  Digital Portfolio & Badges
                </Link>
              </li>
              <li>
                <Link href="/academician" className="hover:text-emerald-400 transition-colors">
                  Academician Matrix & Evaluations
                </Link>
              </li>
              <li>
                <Link href="/industry" className="hover:text-emerald-400 transition-colors">
                  Industry Postings & Filtering
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition-colors">
                  Role-Based Authentication
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© 2026 AYUSH Academia-Industry Integration Framework. Built for Smart India Hackathon.</p>
          <p className="mt-2 sm:mt-0 text-emerald-400/80">Ayurveda • Yoga • Unani • Siddha • Homeopathy</p>
        </div>
      </div>
    </footer>
  );
}
