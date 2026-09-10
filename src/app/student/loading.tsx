import React from "react";

export default function StudentLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 h-36">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
      </div>

      {/* Tabs skeleton */}
      <div className="flex space-x-2 bg-white p-2 rounded-2xl border border-gray-200">
        <div className="h-10 bg-gray-200 rounded-xl w-32"></div>
        <div className="h-10 bg-gray-100 rounded-xl w-32"></div>
        <div className="h-10 bg-gray-100 rounded-xl w-32"></div>
        <div className="h-10 bg-gray-100 rounded-xl w-32"></div>
      </div>

      {/* Body skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 h-64"></div>
        <div className="bg-white rounded-3xl p-6 border border-gray-200 h-64 md:col-span-2"></div>
      </div>
    </div>
  );
}
