
import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top', className = '', delay = 200 }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-800 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-800 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-800 border-y-transparent border-l-transparent'
  };

  return (
    <div className={`relative flex items-center justify-center group ${className}`}>
      {children}
      <div 
        className={`absolute ${positionClasses[position]} w-max max-w-[200px] px-2 py-1 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[60] pointer-events-none whitespace-normal text-center`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {text}
        <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
};

export default Tooltip;
