'use client';

import React, { useState } from 'react';
import { X, Send, User, Mail, Phone, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  source?: string;
  interest?: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ 
  isOpen, 
  onClose, 
  title = "Enquire Now", 
  source = "Website", 
  interest 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic validation for 10-digit phone number
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source,
          interest
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: '', email: '', phone: '', description: '' });
        }, 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to submit enquiry. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {success ? (
          <div className="success-view">
            <CheckCircle2 size={64} color="#10b981" className="success-icon" />
            <h2>Enquiry Submitted!</h2>
            <p>Thank you for your interest. Our academic advisor will contact you shortly.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>{title}</h2>
              <p>Please fill out the form below and we'll get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="enquiry-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="input-group">
                <label><User size={18} /> Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label><Mail size={18} /> Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label><Phone size={18} /> Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label><MessageSquare size={18} /> Description / Message</label>
                <textarea 
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? (
                  <><Loader2 className="animate-spin" size={20} /> Processing...</>
                ) : (
                  <><Send size={20} /> Submit Enquiry</>
                )}
              </button>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: #ffffff;
          width: 100%;
          max-width: 500px;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #f1f5f9;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: rotate(90deg);
        }

        .modal-header {
          margin-bottom: 30px;
          text-align: center;
        }

        .modal-header h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .modal-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .enquiry-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .input-group input, .input-group textarea {
          padding: 12px 16px;
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          font-size: 1rem;
          transition: all 0.2s;
          font-family: inherit;
        }

        .input-group input:focus, .input-group textarea:focus {
          outline: none;
          border-color: #ef233c;
          box-shadow: 0 0 0 4px rgba(239, 35, 60, 0.1);
        }

        .submit-button {
          background: #ef233c;
          color: white;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
          margin-top: 10px;
        }

        .submit-button:hover:not(:disabled) {
          background: #d90429;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(239, 35, 60, 0.2);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          background: #fef2f2;
          color: #dc2626;
          padding: 12px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 500;
          border-left: 4px solid #dc2626;
        }

        .success-view {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          margin-bottom: 20px;
          animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .success-view h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .success-view p {
          color: #64748b;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default EnquiryModal;
