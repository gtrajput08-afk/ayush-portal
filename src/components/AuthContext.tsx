"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "student" | "academician" | "industry";
  stream?: "Ayurveda" | "Yoga" | "Unani" | "Siddha" | "Homeopathy";
  mentorType?: "internal" | "external";
  institution?: string;
  designation?: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (userData: UserSession) => void;
  logout: () => Promise<void>;
  switchUser: (email: string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  switchUser: async () => {},
});

const DEMO_EMAILS = [
  "ayurveda.student@ayush.edu.in",
  "yoga.scholar@ayush.edu.in",
  "unani.researcher@ayush.edu.in",
  "prof.sharma.internal@ayush.edu.in",
  "dr.menon.external@ayush.edu.in",
  "dabur.industry@ayush-pharma.com",
  "himalaya.talent@ayush-pharma.com",
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            const isDemo = DEMO_EMAILS.includes(data.user.email?.toLowerCase());
            setUser({
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              stream: data.user.stream,
              mentorType: data.user.mentorType,
              institution: data.user.institution,
              designation: data.user.designation,
              isDemo,
            });
          }
        }
      } catch (err) {
        console.error("Auth check error:", err);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = (userData: UserSession) => {
    const isDemo = DEMO_EMAILS.includes(userData.email?.toLowerCase());
    setUser({ ...userData, isDemo });
    if (userData.role === "student") {
      router.push("/student");
    } else if (userData.role === "academician") {
      router.push("/academician");
    } else if (userData.role === "industry") {
      router.push("/industry");
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const switchUser = async (email: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "Password123!" }),
      });
      if (res.ok) {
        const data = await res.json();
        login(data.user);
      }
    } catch (err) {
      console.error("Switch user error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, switchUser }}>
      {user?.isDemo && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white text-xs font-semibold py-1.5 px-4 text-center sticky top-0 z-[60] flex items-center justify-center space-x-2 shadow-md">
          <span>⚠️ <strong>Demo Sandbox Session:</strong> You are browsing as verified demo user ({user.name} - {user.role.toUpperCase()}).</span>
          <span className="hidden sm:inline bg-white/20 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold">Isolated Sandbox</span>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
