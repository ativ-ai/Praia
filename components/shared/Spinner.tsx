
import React from 'react';

const Spinner: React.FC<{ size?: string }> = ({ size = 'h-8 w-8' }) => {
  return (
    <div className={`${size} animate-spin rounded-full border-4 border-t-indigo-500 border-slate-200`} />
  );
};

export default Spinner;