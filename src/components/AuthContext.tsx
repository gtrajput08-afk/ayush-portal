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
            setUser({
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              stream: data.user.stream,
              mentorType: data.user.mentorType,
              institution: data.user.institution,
              designation: data.user.designation,
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
    setUser(userData);
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
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
