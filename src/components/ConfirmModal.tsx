import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  onConfirm,
  onClose
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)', padding: '20px'
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px', padding: '24px',
        width: '100%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: '#111827', fontWeight: 600 }}>{title}</h3>
        <p style={{ margin: '0 0 24px', color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button 
            onClick={onClose} 
            disabled={isLoading}
            style={{ 
              padding: '10px 16px', background: '#f3f4f6', color: '#374151', 
              border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' 
            }}
          >
            {cancelLabel}
          </button>
          <button 
            onClick={onConfirm}
            disabled={isLoading} 
            style={{ 
              padding: '10px 16px', background: '#ef4444', color: '#fff', 
              border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
