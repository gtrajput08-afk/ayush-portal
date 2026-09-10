import React from "react";

export default function IndustryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
      <div className="bg-white rounded-3xl p-8 border border-gray-200 h-36">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-200 h-96"></div>
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-200 h-96"></div>
      </div>
    </div>
  );
}
