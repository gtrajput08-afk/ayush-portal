"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { Sparkles, LogIn, KeyRound, Mail, AlertCircle, CheckCircle2, Layers } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sampleAccounts = [
    {
      role: "Student (Ayurveda)",
      email: "ayurveda.student@ayush.edu.in",
      password: "Password123!",
      desc: "Takes Ayurveda Quiz, explores chatbot, applies for internships, views verified portfolio",
      tag: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
      role: "Student (Yoga)",
      email: "yoga.scholar@ayush.edu.in",
      password: "Password123!",
      desc: "Yogic sciences researcher with HRV biomarker credentials and active applications",
      tag: "bg-teal-100 text-teal-800 border-teal-300",
    },
    {
      role: "Academician (Internal Mentor)",
      email: "prof.sharma.internal@ayush.edu.in",
      password: "Password123!",
      desc: "Dean of Ayurveda - Views student skill matrix, placement readiness index, posts FDPs",
      tag: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
      role: "Academician (External Mentor)",
      email: "dr.menon.external@ayush.edu.in",
      password: "Password123!",
      desc: "CCRAS Senior Scientist - Qualitative candidate evaluation (problem solving, hidden gems)",
      tag: "bg-indigo-100 text-indigo-800 border-indigo-300",
    },
    {
      role: "Industry (External Mentor)",
      email: "dabur.industry@ayush-pharma.com",
      password: "Password123!",
      desc: "Dabur R&D - Posts internships, filters candidates by problem solving ratings, shortlists/rejects",
      tag: "bg-orange-100 text-orange-800 border-orange-300",
    },
    {
      role: "Industry (Internal Mentor)",
      email: "himalaya.talent@ayush-pharma.com",
      password: "Password123!",
      desc: "Himalaya Wellness - Filters by projects built & student portfolios, manages campus talent",
      tag: "bg-amber-100 text-amber-800 border-amber-300",
    },
  ];

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPassword?: string) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);

    const loginEmail = customEmail || email;
    const loginPassword = customPassword || password;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed. Please check your credentials.");
      }

      login(data.user);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const useSampleAccount = (acc: typeof sampleAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    handleLogin(undefined, acc.email, acc.password);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Login Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-ayush-green-light text-ayush-green flex items-center justify-center font-bold">
              <LogIn className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-ayush-dark">Sign In to AYUSH Portal</h1>
            <p className="text-xs text-gray-500">
              Access your personalized student hub, academician metrics, or industry portal.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ayurveda.student@ayush.edu.in"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ayush-green focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ayush-green focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Authenticate & Enter</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-gray-600 border-t border-gray-100">
            <span>Don't have an account yet? </span>
            <Link href="/signup" className="font-bold text-ayush-green hover:underline">
              Create New Account
            </Link>
          </div>
        </div>

        {/* Right Col: 1-Click Demo Accounts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-amber-800" />
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Instant 1-Click Demo Personas (Pre-seeded)
              </h3>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Click any role card below to automatically log in and explore its distinctive role-based dashboard, mentor type workflows, and specialized datasets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {sampleAccounts.map((acc, idx) => (
              <div
                key={idx}
                onClick={() => useSampleAccount(acc)}
                className="p-4 bg-white rounded-2xl border border-gray-200 hover:border-ayush-green hover:shadow-md cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${acc.tag}`}>
                    {acc.role}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">Password123!</span>
                </div>
                <p className="text-xs font-bold text-gray-900 group-hover:text-ayush-green transition-colors">
                  {acc.email}
                </p>
                <p className="text-[11px] text-gray-500 leading-snug">
                  {acc.desc}
                </p>
                <div className="pt-1 flex items-center justify-end text-[11px] font-bold text-ayush-green group-hover:translate-x-1 transition-transform">
                  <span>Click to Sign In →</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
