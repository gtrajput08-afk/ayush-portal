"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  Bot,
  Activity,
  Compass
} from "lucide-react";
import { useAuth } from "@/components/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();
  const [selectedStream, setSelectedStream] = useState<string>("Ayurveda");

  const streams = [
    {
      id: "Ayurveda",
      name: "Ayurveda",
      hindi: "आयुर्वेद",
      motto: "The Science of Life & Longevity",
      desc: "Tridosha diagnostics, Dravyaguna phytochemistry, Panchakarma therapeutics, and classical Rasashastra nanomedicines.",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      stats: "3,800+ Formulations Standardized",
      icon: "🌿",
    },
    {
      id: "Yoga",
      name: "Yoga & Naturopathy",
      hindi: "योग व प्राकृतिक चिकित्सा",
      motto: "Harmony of Mind, Breath & Body",
      desc: "Ashtanga yoga therapy, Shatkriya mucosal detox, autonomic HRV biomarker analysis, and holistic hydrotherapy.",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
      stats: "YCB Level 1-4 Certified Competencies",
      icon: "🧘",
    },
    {
      id: "Unani",
      name: "Unani Tibb",
      hindi: "यूनानी",
      motto: "Equilibrium of Humoral Akhlat",
      desc: "Mizaj temperament mapping, Ilaj-bit-Tadbeer (regimental cupping/Hammam), and polyherbal Khamira formulations.",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      stats: "Ajnas-e-Nabz 10-Parameter Diagnostics",
      icon: "🏺",
    },
    {
      id: "Siddha",
      name: "Siddha Medicine",
      hindi: "सिद्ध",
      motto: "Mukkuttram & Kayakalpa Rejuvenation",
      desc: "Envagai Thervu 8-fold diagnosis, 108 Varmam pressure point therapies, and high-order Parpam/Chendooram calcination.",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      stats: "Ancient Tamil Siddha Monograph Alignment",
      icon: "🪔",
    },
    {
      id: "Homeopathy",
      name: "Homeopathy",
      hindi: "होम्योपैथी",
      motto: "Similia Similibus Curentur",
      desc: "Law of Similars, dynamized micro-potencies, Kentian repertorization, and chronic miasmatic constitutional analysis.",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
      stats: "HPI Standardized Mother Tinctures",
      icon: "💧",
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-ayush-green/10 via-ayush-cream to-ayush-sand py-16 lg:py-24 border-b border-ayush-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-ayush-green-light border border-ayush-green/30 text-ayush-green text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-ayush-orange" />
                <span>Smart India Hackathon • PS 26044 • Ministry of Ayush</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ayush-dark tracking-tight leading-[1.15]">
                Bridging AYUSH <span className="text-ayush-green">Academia</span> with Global <span className="text-ayush-orange">Industry</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                A unified ecosystem connecting <strong>Students</strong>, <strong>Faculty</strong>, and <strong>Pharma Enterprises</strong> across all 5 AYUSH streams. Featuring AI-driven skill tests, gap analysis, dual Internal & External mentor tracks, and verified digital credentials.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {user ? (
                  <Link
                    href={
                      user.role === "student" ? "/student" :
                      user.role === "academician" ? "/academician" : "/industry"
                    }
                    className="px-6 py-3.5 rounded-xl bg-ayush-green text-white font-bold text-sm hover:bg-ayush-green-dark transition-all shadow-lg flex items-center space-x-2 group"
                  >
                    <span>Go to My Dashboard ({user.role})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="px-6 py-3.5 rounded-xl bg-ayush-green text-white font-bold text-sm hover:bg-ayush-green-dark transition-all shadow-lg flex items-center space-x-2 group"
                    >
                      <span>Join as Student / Mentor / Industry</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/login"
                      className="px-6 py-3.5 rounded-xl bg-white text-ayush-green border-2 border-ayush-green font-bold text-sm hover:bg-ayush-green-light transition-all shadow-sm"
                    >
                      Explore Demo Logins
                    </Link>
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-center sm:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-ayush-green">5 Streams</p>
                  <p className="text-xs text-gray-500 font-medium">Ayurveda to Homeopathy</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-ayush-orange">Dual Mentor</p>
                  <p className="text-xs text-gray-500 font-medium">Internal & External Tracks</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">AI-Powered</p>
                  <p className="text-xs text-gray-500 font-medium">Skill Quiz & Gap Analysis</p>
                </div>
              </div>
            </div>

            {/* Interactive Hero Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-ayush-green/20 p-6 sm:p-8 space-y-6 relative">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Live Portal Highlights</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-ayush-green-light text-ayush-green">
                    NCISM Aligned
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-ayush-green-light/60 border border-ayush-green/20 flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-ayush-green text-white shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ayush-green">AI Skill Testing & Gap Analysis</h4>
                      <p className="text-[11px] text-gray-600">Stream-specific assessments generating strengths, clinical blindspots, and recommended career paths.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-ayush-orange-light/60 border border-ayush-orange/20 flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-ayush-orange text-white shrink-0 mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ayush-orange">Dual Mentor Framework</h4>
                      <p className="text-[11px] text-gray-600">Internal college mentors track academic readiness; External industry mentors evaluate problem-solving & hidden gems.</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-blue-900">Verified Digital Portfolio</h4>
                      <p className="text-[11px] text-gray-600">Automated Bronze, Silver, Gold badges and verified Schedule T GMP credentials.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/login"
                    className="text-xs font-bold text-ayush-green hover:text-ayush-green-dark inline-flex items-center space-x-1"
                  >
                    <span>Click to test the platform with sample accounts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Five AYUSH Streams Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase font-bold text-ayush-orange tracking-widest">
            Holistic Indian Medicine
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ayush-dark">
            The Five Pillars of AYUSH
          </h2>
          <p className="text-sm text-gray-600">
            Select any stream below to explore its clinical focus, pharmacopoeial benchmarks, and portal integration.
          </p>
        </div>

        {/* Stream Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {streams.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStream(s.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                selectedStream === s.id
                  ? "bg-ayush-green text-white shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
              <span className="opacity-70 text-xs font-normal">({s.hindi})</span>
            </button>
          ))}
        </div>

        {/* Stream Details Card */}
        {(() => {
          const current = streams.find((s) => s.id === selectedStream) || streams[0];
          return (
            <div className="bg-white rounded-3xl p-8 border border-ayush-green/20 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{current.icon}</span>
                    <div>
                      <h3 className="text-2xl font-black text-ayush-dark">{current.name}</h3>
                      <p className="text-sm font-semibold text-ayush-orange">{current.hindi} • {current.motto}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{current.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${current.badgeColor}`}>
                      {current.stats}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                      Standardized Quiz Available
                    </span>
                  </div>
                </div>

                <div className="bg-ayush-sand p-6 rounded-2xl border border-ayush-green/20 space-y-3 text-center">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Test Your Knowledge</p>
                  <h4 className="text-base font-bold text-ayush-dark">Ready to take the {current.name} Competency Assessment?</h4>
                  <Link
                    href={`/student?tab=quiz&stream=${current.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-ayush-green text-white font-bold text-xs hover:bg-ayush-green-dark inline-block transition-colors shadow"
                  >
                    Launch {current.name} Quiz
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Tri-Partite Stakeholder Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold text-ayush-green tracking-widest">
            Stakeholder Portals
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-ayush-dark">
            Tailored Experiences by Role & Mentor Type
          </h2>
          <p className="text-sm text-gray-600">
            Whether you are a student, college faculty, or pharmaceutical hiring leader, the portal dynamically adapts its tools to your objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Students */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-ayush-green shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-ayush-green flex items-center justify-center font-bold text-2xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">For AYUSH Students</h3>
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-green shrink-0 mt-0.5" />
                  <span><strong>AI Skill Assessments</strong> across all 5 streams with gap reports</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-green shrink-0 mt-0.5" />
                  <span><strong>Virtual Career Mentor</strong> for AIAPGET & clinical career paths</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-green shrink-0 mt-0.5" />
                  <span><strong>Dual Mentor Tracks:</strong> Soft skills, offline exams & industry GMP exposure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-green shrink-0 mt-0.5" />
                  <span><strong>Digital Portfolio</strong> with verifiable badges & active application tracking</span>
                </li>
              </ul>
            </div>
            <Link
              href="/student"
              className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-ayush-green-light text-ayush-green hover:bg-ayush-green hover:text-white transition-colors"
            >
              Explore Student Hub
            </Link>
          </div>

          {/* Card 2: Academicians */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-2xl">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">For Academicians & Faculty</h3>
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Internal Mentor:</strong> Student skill matrix & branch employability %</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>External Mentor:</strong> Qualitative candidate evaluations & hidden gems notes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Post FDP & Research:</strong> Grants, consultancy and faculty training</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Identify institutional clinical blindspots early</span>
                </li>
              </ul>
            </div>
            <Link
              href="/academician"
              className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Explore Academician Dashboard
            </Link>
          </div>

          {/* Card 3: Industry */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-ayush-orange shadow-sm hover:shadow-md transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-ayush-orange flex items-center justify-center font-bold text-2xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">For AYUSH Industry & Pharma</h3>
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-orange shrink-0 mt-0.5" />
                  <span><strong>Post Opportunities:</strong> Targeted by stream & state/district</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-orange shrink-0 mt-0.5" />
                  <span><strong>Smart Candidate Filtering:</strong> By real-world problem solving & notes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-orange shrink-0 mt-0.5" />
                  <span><strong>Applicant Management:</strong> 1-click Shortlist, Review, and Reject actions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-ayush-orange shrink-0 mt-0.5" />
                  <span>Hire verified talent with Schedule T & analytical lab mastery</span>
                </li>
              </ul>
            </div>
            <Link
              href="/industry"
              className="w-full py-2.5 text-center text-xs font-bold rounded-xl bg-ayush-orange-light text-ayush-orange hover:bg-ayush-orange hover:text-white transition-colors"
            >
              Explore Industry Portal
            </Link>
          </div>

        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-ayush-dark text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-ayush-green/30">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-ayush-orange">
              Ministry of Ayush • Smart India Hackathon
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to experience the future of AYUSH professional development?
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Get started instantly with our pre-loaded test accounts or register your custom profile today.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/signup"
                className="px-6 py-3.5 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-sm transition-all shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20"
              >
                Use 1-Click Demo Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
