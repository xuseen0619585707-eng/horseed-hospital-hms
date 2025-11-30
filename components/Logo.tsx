import React from 'react';

export const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-primary-600 rounded-xl transform rotate-6 opacity-20"></div>
      <div className="absolute inset-0 bg-primary-600 rounded-xl transform -rotate-6 opacity-20"></div>
      <div className="relative w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="font-display font-bold text-xl text-slate-900 leading-none tracking-tight">
        Horseed<span className="text-primary-600">.</span>
      </span>
      <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Medical System</span>
    </div>
  </div>
);
