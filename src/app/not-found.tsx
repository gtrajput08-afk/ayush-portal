import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-ayush-orange-light text-ayush-orange uppercase tracking-wider">
            404 • Page Not Found
          </span>
          <h2 className="text-xl font-bold text-gray-900">Resource Unavailable</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The AYUSH resource or page you requested could not be located.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-ayush-green hover:bg-ayush-green-dark text-white font-bold text-xs shadow transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Portal Home</span>
        </Link>
      </div>
    </div>
  );
}
