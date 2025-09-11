
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const typeClasses = {
  success: 'bg-green-500 border-green-600 text-white',
  error: 'bg-red-500 border-red-600 text-white',
  info: 'bg-slate-700 border-slate-800 text-white',
};

const ICONS: Record<NotificationProps['type'], string> = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
};

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg relative border ${typeClasses[type]} shadow-2xl animate-fade-in-right`}
      role="alert"
    >
      <span className="material-symbols-outlined text-2xl">{ICONS[type]}</span>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Notification;