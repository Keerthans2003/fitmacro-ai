
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <i className="fa-solid fa-dumbbell text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">GainTrack <span className="text-emerald-600">AI</span></span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <span className="flex items-center space-x-1">
            <i className="fa-solid fa-check-circle text-emerald-500"></i>
            <span>Certified Standards</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fa-solid fa-bolt text-amber-500"></i>
            <span>Precision Macros</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
