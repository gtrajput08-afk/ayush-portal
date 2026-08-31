"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  UserPlus, 
  Mail, 
  KeyRound, 
  User, 
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<"student" | "academician" | "industry">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stream, setStream] = useState<"Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy">("Ayurveda");
  const [mentorType, setMentorType] = useState<"internal" | "external">("internal");
  const [institution, setInstitution] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload: any = {
        name,
        email,
        password,
        role,
        institution,
        designation,
      };

      if (role === "student") {
        payload.stream = stream;
      } else {
        payload.mentorType = mentorType;
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account. Please review the form.");
      }

      login(data.user);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-10 space-y-8">
        
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <div className="inline-flex p-3 rounded-2xl bg-ayush-green-light text-ayush-green mb-1">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ayush-dark">
            Join the AYUSH Integration Portal
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Create your account to unlock AI assessments, mentor matching, and industry collaborations.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          
          {/* 1. Role Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Step 1: Select Your Primary Role
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div
                onClick={() => setRole("student")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                  role === "student"
                    ? "border-ayush-green bg-ayush-green-light/50 text-ayush-green shadow-sm"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <GraduationCap className="w-6 h-6" />
                <div>
                  <p className="text-xs font-bold">Student / Scholar</p>
                  <p className="text-[10px] text-gray-500">BAMS, MD, BNYS, BUMS, BHMS</p>
                </div>
              </div>

              <div
                onClick={() => setRole("academician")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                  role === "academician"
                    ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Building2 className="w-6 h-6" />
                <div>
                  <p className="text-xs font-bold">Academician / Faculty</p>
                  <p className="text-[10px] text-gray-500">Professor, Dean, Researcher</p>
                </div>
              </div>

              <div
                onClick={() => setRole("industry")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center space-y-2 ${
                  role === "industry"
                    ? "border-ayush-orange bg-ayush-orange-light/50 text-ayush-orange shadow-sm"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <Briefcase className="w-6 h-6" />
                <div>
                  <p className="text-xs font-bold">Industry / Pharma</p>
                  <p className="text-[10px] text-gray-500">R&D, Recruiter, Lab Director</p>
                </div>
              </div>

            </div>
          </div>

          {/* 2. Conditional Role Configurations */}
          {role === "student" && (
            <div className="p-5 rounded-2xl bg-ayush-sand border border-ayush-green/20 space-y-3 animate-in fade-in">
              <label className="text-xs font-bold text-ayush-green uppercase tracking-wider block">
                Select Your AYUSH Stream (Mandatory for Students)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: "Ayurveda", label: "Ayurveda (आयुर्वेद)" },
                  { id: "Yoga", label: "Yoga & Naturopathy" },
                  { id: "Unani", label: "Unani (यूनानी)" },
                  { id: "Siddha", label: "Siddha (सिद्ध)" },
                  { id: "Homeopathy", label: "Homeopathy" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStream(s.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                      stream === s.id
                        ? "bg-ayush-green text-white shadow"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(role === "academician" || role === "industry") && (
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Select Mentor Track (Internal vs External)
                </label>
                <span className="text-[11px] text-amber-700 font-medium">Controls your dashboard features</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setMentorType("internal")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-1 ${
                    mentorType === "internal"
                      ? "border-ayush-green bg-white text-ayush-green shadow-sm"
                      : "border-gray-200 bg-white/50 text-gray-600"
                  }`}
                >
                  <p className="text-xs font-bold">Internal Mentor (College-Side)</p>
                  <p className="text-[11px] text-gray-500">
                    Focuses on student skill matrices, branch employability %, placement readiness, and academic course schedules.
                  </p>
                </div>

                <div
                  onClick={() => setMentorType("external")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-1 ${
                    mentorType === "external"
                      ? "border-ayush-orange bg-white text-ayush-orange shadow-sm"
                      : "border-gray-200 bg-white/50 text-gray-600"
                  }`}
                >
                  <p className="text-xs font-bold">External Mentor (Industry-Side)</p>
                  <p className="text-[11px] text-gray-500">
                    Focuses on real-world problem solving, qualitative evaluations, "hidden gems" candidate notes, and GMP training.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. Personal & Institution Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Aarav Sharma"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ayush-green"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@ayush.edu.in"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ayush-green"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Create Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ayush-green"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                {role === "student" ? "College / University Name" : "Institution / Company Name"}
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. All India Institute of Ayurveda / Dabur R&D"
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ayush-green"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Complete Registration & Launch Dashboard</span>
              </>
            )}
          </button>

          <div className="text-center text-xs text-gray-600">
            <span>Already have an account? </span>
            <Link href="/login" className="font-bold text-ayush-green hover:underline">
              Log In
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
}
