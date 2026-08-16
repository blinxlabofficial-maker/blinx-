"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Send, 
  AlertCircle,
  MailQuestion,
  RefreshCw
} from 'lucide-react';
import styles from './ContactForm.module.css';

interface FormData {
  name: string;
  phone: string;
  email: string;
  bot_trap?: string; // Honeypot field
}

interface ContactFormProps {
  initialService?: string | null;
  isModal?: boolean;
  onSuccess?: () => void;
}

export default function ContactForm({ initialService, isModal = false, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    bot_trap: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isOfflineSaved, setIsOfflineSaved] = useState(false);

  // Background Auto-Sync Offline Stored Leads when network returns
  useEffect(() => {
    const syncOfflineLeads = async () => {
      try {
        const stored = localStorage.getItem('blinx_pending_leads');
        if (!stored) return;
        const leads: FormData[] = JSON.parse(stored);
        if (!Array.isArray(leads) || leads.length === 0) return;

        console.log(`[Sync] Attempting to sync ${leads.length} stored leads...`);
        const remaining: FormData[] = [];

        for (const lead of leads) {
          try {
            const res = await fetch('/api/inquiries', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(lead)
            });
            if (!res.ok) remaining.push(lead);
          } catch {
            remaining.push(lead);
          }
        }

        if (remaining.length > 0) {
          localStorage.setItem('blinx_pending_leads', JSON.stringify(remaining));
        } else {
          localStorage.removeItem('blinx_pending_leads');
          console.log('[Sync] All offline leads successfully synced');
        }
      } catch (err) {
        console.warn('Offline lead sync error:', err);
      }
    };

    window.addEventListener('online', syncOfflineLeads);
    // Also try syncing on mount if online
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      syncOfflineLeads();
    }

    return () => window.removeEventListener('online', syncOfflineLeads);
  }, []);

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (cleanPhone.length < 6) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const saveLeadToLocalStorageFallback = (lead: FormData) => {
    try {
      const existing = JSON.parse(localStorage.getItem('blinx_pending_leads') || '[]');
      existing.push({ ...lead, queuedAt: new Date().toISOString() });
      localStorage.setItem('blinx_pending_leads', JSON.stringify(existing));
      setIsOfflineSaved(true);
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Honeypot trap check
    if (formData.bot_trap) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setIsOfflineSaved(false);

    try {
      // 1. Primary Network Request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim().toLowerCase(),
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setStatus('success');
        if (onSuccess) onSuccess();
      } else {
        // Fallback: Store locally
        saveLeadToLocalStorageFallback(formData);
        setStatus('error');
      }
    } catch (networkError) {
      // Fallback: If device is offline or request timed out, save locally
      saveLeadToLocalStorageFallback(formData);
      setStatus('error');
    }
  };

  // Direct mailto link fallback
  const mailtoFallbackUrl = `mailto:hello@blinxlabs.com?subject=Project Inquiry from ${encodeURIComponent(formData.name || 'Website')}&body=Name: ${encodeURIComponent(formData.name)}%0D%0APhone: ${encodeURIComponent(formData.phone)}%0D%0AEmail: ${encodeURIComponent(formData.email)}`;

  return (
    <div className={`${styles.formContainer} ${isModal ? styles.modalFormContainer : ''}`} data-testid="contact-form">
      {status === 'success' ? (
        <div className={styles.successStateWrapper}>
          <div className={styles.successIconCircle}>
            <CheckCircle2 size={36} className={styles.successIcon} />
          </div>
          <span className={styles.successBadge}>INQUIRY RECEIVED</span>
          <h3 className={styles.successHeading}>We&apos;ll be in touch shortly!</h3>
          <p className={styles.successBody}>
            Thank you, <strong>{formData.name}</strong>. Our senior team will contact you via phone/email within 24 hours.
          </p>
          <button 
            className={styles.resetFormBtn}
            onClick={() => {
              setFormData({
                name: '',
                phone: '',
                email: '',
                bot_trap: ''
              });
              setStatus('idle');
            }}
          >
            Submit Another Inquiry &rarr;
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot Spam Field (Hidden from real users) */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', height: 0, overflow: 'hidden' }} aria-hidden="true">
            <label htmlFor="bot_trap_check">Leave empty</label>
            <input 
              type="text" 
              id="bot_trap_check" 
              name="bot_trap" 
              tabIndex={-1} 
              value={formData.bot_trap || ''} 
              onChange={handleChange} 
              autoComplete="off" 
            />
          </div>

          {/* Field 1: Full Name */}
          <div className={styles.formGroup}>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={formData.name ? styles.filled : ''}
              placeholder=" "
              data-testid="field-name"
              disabled={status === 'loading'}
            />
            <label htmlFor="contact-name">Full Name *</label>
            <User size={16} className={styles.inputIcon} />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          {/* Field 2: Phone Number */}
          <div className={styles.formGroup}>
            <input
              type="tel"
              id="contact-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={formData.phone ? styles.filled : ''}
              placeholder=" "
              data-testid="field-phone"
              disabled={status === 'loading'}
            />
            <label htmlFor="contact-phone">Phone Number *</label>
            <Phone size={16} className={styles.inputIcon} />
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>

          {/* Field 3: Email Address */}
          <div className={styles.formGroup}>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formData.email ? styles.filled : ''}
              placeholder=" "
              data-testid="field-email"
              disabled={status === 'loading'}
            />
            <label htmlFor="contact-email">Email Address *</label>
            <Mail size={16} className={styles.inputIcon} />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          {/* Fallback Error UI with 1-Click Email Action */}
          {status === 'error' && (
            <div className={styles.formErrorBox}>
              <div className={styles.errorHeader}>
                <AlertCircle size={15} />
                <span>{isOfflineSaved ? 'Network slow — lead queued in browser backup.' : 'Connection interrupted.'}</span>
              </div>
              <p className={styles.errorSub}>
                You can retry or send directly via 1-click email:
              </p>
              <div className={styles.fallbackActions}>
                <a href={mailtoFallbackUrl} className={styles.mailtoBtn}>
                  <MailQuestion size={13} />
                  <span>Send via Email Client</span>
                </a>
                <button type="submit" className={styles.retryBtn}>
                  <RefreshCw size={13} />
                  <span>Retry Send</span>
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className={styles.submitArea}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className={styles.btnLoading}>
                  <span className={styles.spinner} />
                  <span>Connecting...</span>
                </span>
              ) : (
                <span className={styles.btnContent}>
                  <span>Get In Touch</span>
                  <Send size={14} />
                </span>
              )}
            </button>

            <div className={styles.trustFooter}>
              <span>🔒 24h Response · Direct Senior Access</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
