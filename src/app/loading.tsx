import React from "react";

export default function RootLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 rounded-full border-4 border-ayush-green-light border-t-ayush-green animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-xl">🌿</div>
      </div>
      <div className="text-center space-y-1">
        <h3 className="text-sm font-bold text-ayush-dark">Loading AYUSH Portal...</h3>
        <p className="text-xs text-gray-500">Securely loading encrypted data streams</p>
      </div>
    </div>
  );
}
