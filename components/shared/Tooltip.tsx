import React from 'react';

const Tooltip: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="relative flex items-center group ml-1">
      <span className="material-symbols-outlined text-slate-400 hover:text-slate-600 cursor-help text-base transition-colors">help</span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none before:content-[''] before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-slate-800">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
