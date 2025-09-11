
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const typeClasses = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700',
};

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div
      className={`px-4 py-3 rounded-md relative border ${typeClasses[type]} shadow-lg animate-fade-in-right`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Notification;
