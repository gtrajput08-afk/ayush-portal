"use client";

import React, { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Microscope,
  FileCheck,
  Stethoscope,
  Heart
} from "lucide-react";
import { useAuth } from "@/components/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();
  const [selectedStream, setSelectedStream] = useState<string>("Ayurveda");
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const heroSlides = [
    {
      stream: "Ayurveda",
      title: "Dravyaguna Phytochemistry & Classical Formulations",
      subtitle: "Schedule T GMP & HPTLC Standardization",
      desc: "Connecting Ayurvedic scholars directly with Dabur, Patanjali, and CCRAS research laboratories for validated clinical trials and polyherbal drug standardization.",
      stats: "3,800+ Formulations Standardized",
      accent: "from-emerald-600 to-emerald-800",
      pillColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      icon: "🌿",
      highlights: ["Schedule T Lab Norms", "Nadi Pariksha Diagnostics", "Evidence-Based Panchakarma"],
    },
    {
      stream: "Yoga & Naturopathy",
      title: "Autonomic Neuro-Physiology & Mind-Body Health",
      subtitle: "YCB Level 1-4 Certified Competencies",
      desc: "Empowering Yoga therapists with HRV biofeedback, Shatkriya clinical protocols, and corporate wellness apprenticeships across top integrative hospitals.",
      stats: "YCB Verified Protocols",
      accent: "from-teal-600 to-teal-800",
      pillColor: "bg-teal-100 text-teal-900 border-teal-300",
      icon: "🧘",
      highlights: ["HRV Biomarker Tracking", "Ashtanga Therapy Protocols", "Holistic Hydrotherapy"],
    },
    {
      stream: "Unani Tibb",
      title: "Humoral Mizaj Profiling & Regimental Tadbeer",
      subtitle: "Ajnas-e-Nabz 10-Parameter Diagnosis",
      desc: "Bridging classical Unani polyherbal pharmacy (Khamira/Majun) with modern pharmaceutical manufacturing and Hamdard R&D pipelines.",
      stats: "10-Parameter Pulse Diagnostics",
      accent: "from-amber-600 to-amber-800",
      pillColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: "🏺",
      highlights: ["Mizaj Temperament Engine", "Ilaj-bit-Tadbeer Clinicals", "Herbal Extraction Standards"],
    },
    {
      stream: "Siddha Medicine",
      title: "Mukkuttram & High-Order Mineral Calcination",
      subtitle: "108 Varmam Pressure Point Therapy",
      desc: "Validating ancient Tamil Siddha monographs, Parpam/Chendooram nano-mineral safety, and clinical Kayakalpa rejuvenation therapies.",
      stats: "Ancient Monograph Validation",
      accent: "from-rose-600 to-rose-800",
      pillColor: "bg-rose-100 text-rose-900 border-rose-300",
      icon: "🪔",
      highlights: ["108 Varmam Therapies", "Mineral Parpam Safety", "Envagai Thervu Diagnostics"],
    },
    {
      stream: "Homeopathy",
      title: "Evidence-Based Potentization & Clinical Repertorization",
      subtitle: "HPI Standardized Mother Tinctures",
      desc: "Fostering evidence-based Homeopathic clinical research, Kentian repertorization algorithms, and CCRH fellowship placement opportunities.",
      stats: "HPI Monograph Alignment",
      accent: "from-sky-600 to-sky-800",
      pillColor: "bg-sky-100 text-sky-900 border-sky-300",
      icon: "💧",
      highlights: ["Law of Similars Algorithms", "Miasmatic Constitutional Study", "HPI Standard Mother Tinctures"],
    },
  ];

  const streams = [
    {
      id: "Ayurveda",
      name: "Ayurveda",
      hindi: "आयुर्वेद",
      motto: "The Science of Life & Longevity",
      desc: "Tridosha diagnostics, Dravyaguna phytochemistry, Panchakarma therapeutics, and classical Rasashastra nanomedicines.",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      stats: "3,800+ Formulations Standardized",
      icon: "🌿",
    },
    {
      id: "Yoga",
      name: "Yoga & Naturopathy",
      hindi: "योग व प्राकृतिक चिकित्सा",
      motto: "Harmony of Mind, Breath & Body",
      desc: "Ashtanga yoga therapy, Shatkriya mucosal detox, autonomic HRV biomarker analysis, and holistic hydrotherapy.",
      badgeColor: "bg-teal-100 text-teal-900 border-teal-300",
      stats: "YCB Level 1-4 Certified Competencies",
      icon: "🧘",
    },
    {
      id: "Unani",
      name: "Unani Tibb",
      hindi: "यूनानी",
      motto: "Equilibrium of Humoral Akhlat",
      desc: "Mizaj temperament mapping, Ilaj-bit-Tadbeer (regimental cupping/Hammam), and polyherbal Khamira formulations.",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      stats: "Ajnas-e-Nabz 10-Parameter Diagnostics",
      icon: "🏺",
    },
    {
      id: "Siddha",
      name: "Siddha Medicine",
      hindi: "सिद्ध",
      motto: "Mukkuttram & Kayakalpa Rejuvenation",
      desc: "Envagai Thervu 8-fold diagnosis, 108 Varmam pressure point therapies, and high-order Parpam/Chendooram calcination.",
      badgeColor: "bg-rose-100 text-rose-900 border-rose-300",
      stats: "Ancient Tamil Siddha Monograph Alignment",
      icon: "🪔",
    },
    {
      id: "Homeopathy",
      name: "Homeopathy",
      hindi: "होम्योपैथी",
      motto: "Similia Similibus Curentur",
      desc: "Law of Similars, dynamized micro-potencies, Kentian repertorization, and chronic miasmatic constitutional analysis.",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
      stats: "HPI Standardized Mother Tinctures",
      icon: "💧",
    },
  ];

  // Auto-slide carousel
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, heroSlides.length]);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* HERO SECTION WITH ANIMATED AMBIENT GLOW & DYNAMIC SLIDESHOW */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900/10 via-amber-50/40 to-[#FAF8F5] py-14 lg:py-20 border-b border-emerald-700/10">
        {/* Ambient floating blur blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Mission & Call to Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Smart India Hackathon • PS 26044 • Ministry of Ayush</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Bridging AYUSH <span className="text-emerald-800">Academia</span> with Global <span className="text-amber-700">Industry</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                A unified digital ecosystem connecting <strong>Students</strong>, <strong>Faculty</strong>, and <strong>Pharma Enterprises</strong> across all 5 AYUSH streams. Featuring AI-driven skill tests, gap analysis, dual Internal & External mentor tracks, and verified digital credentials.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {user ? (
                  <Link
                    href={
                      user.role === "student" ? "/student" :
                      user.role === "academician" ? "/academician" : "/industry"
                    }
                    className="px-6 py-3.5 rounded-xl bg-emerald-800 text-white font-black text-sm hover:bg-emerald-900 transition-all shadow-lg hover:shadow-xl hover:scale-102 flex items-center space-x-2 group"
                  >
                    <span>Go to My Dashboard ({user.role.toUpperCase()})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="px-6 py-3.5 rounded-xl bg-emerald-800 text-white font-black text-sm hover:bg-emerald-900 transition-all shadow-lg hover:shadow-xl hover:scale-102 flex items-center space-x-2 group"
                    >
                      <span>Join as Student / Mentor / Industry</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/login"
                      className="px-6 py-3.5 rounded-xl bg-white text-emerald-900 border-2 border-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition-all shadow-sm"
                    >
                      Explore Demo Logins
                    </Link>
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-emerald-900/10 text-center sm:text-left">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-800">5 Streams</p>
                  <p className="text-xs text-slate-600 font-bold">Ayurveda to Homeopathy</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-700">Dual Mentor</p>
                  <p className="text-xs text-slate-600 font-bold">Internal & External Tracks</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-teal-800">AI-Powered</p>
                  <p className="text-xs text-slate-600 font-bold">Skill Quiz & Gap Analysis</p>
                </div>
              </div>
            </div>

            {/* Right Column: DYNAMIC INTERACTIVE HERO CAROUSEL */}
            <div 
              className="lg:col-span-6"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              <div className="bg-white rounded-3xl shadow-2xl border-2 border-emerald-800/20 p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all">
                
                {/* Header with stream selector dots */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Live Showcase • {heroSlides[activeSlide].stream}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2 rounded-full transition-all ${activeSlide === idx ? "w-6 bg-emerald-800" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
                        title={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Active Slide Content */}
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${heroSlides[activeSlide].pillColor}`}>
                        {heroSlides[activeSlide].subtitle}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                        {heroSlides[activeSlide].title}
                      </h3>
                    </div>
                    <span className="text-4xl sm:text-5xl shrink-0 p-2 bg-emerald-50 rounded-2xl border border-emerald-100">
                      {heroSlides[activeSlide].icon}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {heroSlides[activeSlide].desc}
                  </p>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {heroSlides[activeSlide].highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-xs font-bold px-3 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>

                  {/* Stat card */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-amber-50 to-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-500">Benchmark & Standardization</p>
                      <p className="text-xs font-black text-emerald-900">{heroSlides[activeSlide].stats}</p>
                    </div>
                    <Link
                      href={`/student?tab=quiz&stream=${heroSlides[activeSlide].stream.split(" ")[0]}`}
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs shadow-md flex items-center space-x-1 transition-all"
                    >
                      <span>Take Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Carousel Bottom Controls */}
                <div className="pt-2 flex items-center justify-between text-xs font-bold text-slate-500 border-t border-gray-100">
                  <button
                    onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-700 flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <span className="text-[11px] font-mono text-slate-400">
                    {activeSlide + 1} / {heroSlides.length}
                  </span>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-slate-700 flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE FIVE AYUSH STREAMS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase font-black text-amber-700 tracking-widest">
            Holistic Indian Medicine
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            The Five Pillars of AYUSH
          </h2>
          <p className="text-sm text-slate-600 font-medium">
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
                  ? "bg-emerald-800 text-white shadow-lg scale-105 ring-2 ring-emerald-600/50"
                  : "bg-white text-slate-700 hover:bg-emerald-50 border border-gray-300 shadow-xs"
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
              <span className="opacity-80 text-xs font-normal">({s.hindi})</span>
            </button>
          ))}
        </div>

        {/* Stream Details Card */}
        {(() => {
          const current = streams.find((s) => s.id === selectedStream) || streams[0];
          return (
            <div className="bg-white rounded-3xl p-8 border-2 border-emerald-800/20 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="space-y-4 md:col-span-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-5xl">{current.icon}</span>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{current.name}</h3>
                      <p className="text-sm font-bold text-amber-700">{current.hindi} • {current.motto}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">{current.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className={`text-xs font-black px-3.5 py-1 rounded-full border ${current.badgeColor}`}>
                      {current.stats}
                    </span>
                    <span className="text-xs font-bold px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
                      Standardized Quiz & Gap Engine Available
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 p-6 rounded-2xl border border-emerald-200 space-y-3 text-center">
                  <p className="text-xs font-black text-emerald-800 uppercase tracking-wider">Skill Assessment</p>
                  <h4 className="text-base font-black text-slate-900">Ready to take the {current.name} Competency Test?</h4>
                  <Link
                    href={`/student?tab=quiz&stream=${current.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 text-white font-black text-xs hover:bg-emerald-900 inline-block transition-all shadow-md hover:scale-102"
                  >
                    Launch {current.name} Assessment
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* TRI-PARTITE STAKEHOLDER FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-black text-emerald-800 tracking-widest">
            Stakeholder Portals
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Tailored Experiences by Role & Mentor Type
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Whether you are a student, college faculty, or pharmaceutical hiring leader, the portal dynamically adapts its tools to your objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Students */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 hover:border-emerald-600 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl border border-emerald-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">For AYUSH Students</h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>AI Skill Assessments</strong> across all 5 streams with gap reports</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Virtual Career Mentor</strong> for AIAPGET & clinical career paths</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Dual Mentor Tracks:</strong> Soft skills, offline exams & industry GMP exposure</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span><strong>Digital Portfolio</strong> with verifiable badges & active application tracking</span>
                </li>
              </ul>
            </div>
            <Link
              href="/student"
              className="w-full py-3 text-center text-xs font-black rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-800 hover:text-white transition-all shadow-xs"
            >
              Explore Student Hub →
            </Link>
          </div>

          {/* Card 2: Academicians */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200 hover:border-blue-600 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-2xl border border-blue-300">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">For Academicians & Faculty</h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span><strong>Internal Mentor:</strong> Student skill matrix & branch employability %</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span><strong>External Mentor:</strong> Qualitative candidate evaluations & hidden gems notes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span><strong>Post FDP & Research:</strong> Grants, consultancy and faculty training</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>Identify institutional clinical blindspots early</span>
                </li>
              </ul>
            </div>
            <Link
              href="/academician"
              className="w-full py-3 text-center text-xs font-black rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-700 hover:text-white transition-all shadow-xs"
            >
              Explore Academician Dashboard →
            </Link>
          </div>

          {/* Card 3: Industry */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 hover:border-amber-600 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-2xl border border-amber-300">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900">For AYUSH Industry & Pharma</h3>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Post Opportunities:</strong> Targeted by stream & state/district</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Smart Candidate Filtering:</strong> By real-world problem solving & notes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span><strong>Applicant Management:</strong> 1-click Shortlist, Review, and Reject actions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>Hire verified talent with Schedule T & analytical lab mastery</span>
                </li>
              </ul>
            </div>
            <Link
              href="/industry"
              className="w-full py-3 text-center text-xs font-black rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-700 hover:text-white transition-all shadow-xs"
            >
              Explore Industry Portal →
            </Link>
          </div>

        </div>
      </section>

      {/* HIGH-CONTRAST DEEP FOREST CTA BANNER (FIXED CONTRAST & VISIBILITY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0E2812] via-[#163D1B] to-[#0A1D0E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border-2 border-emerald-500/40">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-amber-300 text-xs font-black uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ministry of Ayush • Smart India Hackathon</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to experience the future of AYUSH professional development?
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-medium">
              Get started instantly with our pre-loaded test accounts or register your custom profile today. Explore AI testing, dual mentorship, and verified portfolios.
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-xl hover:scale-105"
              >
                Create Free Account
              </Link>
              <Link
                href="/login"
                className="px-7 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-extrabold text-sm transition-all border-2 border-white/30 backdrop-blur-md hover:scale-105"
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
