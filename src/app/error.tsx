"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Something Went Wrong</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The portal encountered an unexpected issue. Your session data remains secure.
          </p>
          {error?.message && (
            <p className="text-[11px] font-mono text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200 break-words">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-xs shadow flex items-center justify-center space-x-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
