import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="text-emerald" />;
      case 'error':
        return <AlertCircle size={16} className="text-rose" />;
      default:
        return <Info size={16} className="text-cyan" />;
    }
  };

  return (
    <div className={`toast-container glass-panel animate-fade-in toast-${type}`}>
      <div className="toast-icon">{getIcon()}</div>
      <span className="toast-message">{message}</span>
      <button className="toast-close-btn" onClick={onClose} aria-label="Dismiss toast">
        <X size={14} />
      </button>
    </div>
  );
}
