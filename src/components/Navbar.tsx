"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "./AuthContext";
import { 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  LogOut, 
  User, 
  Layers, 
  CheckCircle2, 
  Menu, 
  X,
  ChevronDown
} from "lucide-react";

export default function Navbar() {
  const { user, logout, switchUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const demoAccounts = [
    { name: "Aarav Sharma (Student - Ayurveda)", email: "ayurveda.student@ayush.edu.in", role: "student", stream: "Ayurveda", tag: "Student" },
    { name: "Priya Varma (Student - Yoga)", email: "yoga.scholar@ayush.edu.in", role: "student", stream: "Yoga", tag: "Student" },
    { name: "Prof. Sharma (Academician - Internal)", email: "prof.sharma.internal@ayush.edu.in", role: "academician", mentorType: "internal", tag: "Academician (Internal)" },
    { name: "Dr. Menon (Academician - External)", email: "dr.menon.external@ayush.edu.in", role: "academician", mentorType: "external", tag: "Academician (External)" },
    { name: "Vikram Singhania (Industry - External)", email: "dabur.industry@ayush-pharma.com", role: "industry", mentorType: "external", tag: "Industry (External)" },
    { name: "Meera Nair (Industry - Internal)", email: "himalaya.talent@ayush-pharma.com", role: "industry", mentorType: "internal", tag: "Industry (Internal)" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-ayush-green/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Platform Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-ayush-green text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl sm:text-2xl font-bold tracking-tight">🌿</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-extrabold text-ayush-green tracking-tight group-hover:text-ayush-green-dark">
                  AYUSH Portal
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-ayush-orange-light text-ayush-orange border border-ayush-orange/20">
                  SIH 26044
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Academia-Industry Integration • Ministry of Ayush
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-ayush-green rounded-lg hover:bg-ayush-green-light/50 transition-colors"
            >
              Overview
            </Link>

            {user?.role === "student" && (
              <>
                <Link
                  href="/student"
                  className="px-3 py-2 text-sm font-semibold text-ayush-green bg-ayush-green-light rounded-lg flex items-center space-x-1.5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Hub</span>
                </Link>
                <Link
                  href="/student/portfolio"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-ayush-green rounded-lg hover:bg-ayush-green-light/50 transition-colors flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-ayush-green" />
                  <span>Digital Portfolio</span>
                </Link>
              </>
            )}

            {user?.role === "academician" && (
              <Link
                href="/academician"
                className="px-3 py-2 text-sm font-semibold text-ayush-green bg-ayush-green-light rounded-lg flex items-center space-x-1.5"
              >
                <Building2 className="w-4 h-4" />
                <span>Academician Dashboard</span>
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-white text-ayush-green border border-ayush-green/30">
                  {user.mentorType === "internal" ? "Internal Track" : "External Track"}
                </span>
              </Link>
            )}

            {user?.role === "industry" && (
              <Link
                href="/industry"
                className="px-3 py-2 text-sm font-semibold text-ayush-orange bg-ayush-orange-light rounded-lg flex items-center space-x-1.5"
              >
                <Briefcase className="w-4 h-4" />
                <span>Industry Portal</span>
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-white text-ayush-orange border border-ayush-orange/30">
                  {user.mentorType === "internal" ? "Campus Talent" : "Candidate Evaluator"}
                </span>
              </Link>
            )}
          </nav>

          {/* User Controls & Demo Switcher */}
          <div className="hidden md:flex items-center space-x-3">
            {/* 1-Click Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setSwitcherOpen(!switcherOpen)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 flex items-center space-x-1.5 shadow-sm transition-all"
                title="Quick switch between Student, Academician, and Industry demo personas"
              >
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>Demo Personas</span>
                <ChevronDown className="w-3 h-3 text-amber-700" />
              </button>

              {switcherOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-800">1-Click Role Switcher</p>
                    <p className="text-[10px] text-gray-500">Test different dashboard views instantly</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {demoAccounts.map((acc, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          switchUser(acc.email, acc.role);
                          setSwitcherOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-ayush-green-light flex flex-col transition-colors border-b border-gray-50 last:border-none"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800">{acc.name.split("(")[0]}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            acc.role === "student" ? "bg-emerald-100 text-emerald-800" :
                            acc.role === "academician" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
                          }`}>
                            {acc.tag}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 truncate">{acc.email}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 leading-tight">{user.name}</p>
                  <div className="flex items-center justify-end space-x-1 mt-0.5">
                    <span className="text-[10px] font-semibold text-ayush-green bg-ayush-green-light px-1.5 py-0.2 rounded capitalize">
                      {user.role} {user.stream ? `(${user.stream})` : ""}
                    </span>
                    {user.mentorType && (
                      <span className="text-[10px] font-semibold text-ayush-orange bg-ayush-orange-light px-1.5 py-0.2 rounded uppercase">
                        {user.mentorType} mentor
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-ayush-green border border-ayush-green rounded-lg hover:bg-ayush-green hover:text-white transition-all shadow-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-xs font-bold text-white bg-ayush-green rounded-lg hover:bg-ayush-green-dark transition-all shadow-sm flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-ayush-green hover:bg-ayush-green-light"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
          >
            Overview
          </Link>
          {user?.role === "student" && (
            <>
              <Link
                href="/student"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-semibold text-ayush-green bg-ayush-green-light rounded-lg"
              >
                Student Hub ({user.stream})
              </Link>
              <Link
                href="/student/portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-800 rounded-lg hover:bg-gray-50"
              >
                Digital Portfolio
              </Link>
            </>
          )}
          {user?.role === "academician" && (
            <Link
              href="/academician"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-ayush-green bg-ayush-green-light rounded-lg"
            >
              Academician ({user.mentorType} mentor)
            </Link>
          )}
          {user?.role === "industry" && (
            <Link
              href="/industry"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-ayush-orange bg-ayush-orange-light rounded-lg"
            >
              Industry Portal ({user.mentorType} mentor)
            </Link>
          )}

          <div className="pt-3 border-t border-gray-100">
            {user ? (
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role} • {user.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-xs font-bold text-ayush-green border border-ayush-green rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 text-center text-xs font-bold text-white bg-ayush-green rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
