import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.message.trim()) newErrors.message = 'Please tell us what we should solve';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      
      setSuccess(true);
      setFormData({ name: '', email: '', businessName: '', message: '' });
    } catch (err) {
      setServerError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact reveal" data-testid="contact-section">
      <div className="contact-inner container">
        <div className="contact-content">
          <span className="contact-label" data-testid="contact-label">CONTACT</span>
          <h2 className="contact-heading" data-testid="contact-heading">Ready to move?</h2>
          <p className="contact-copy" data-testid="contact-copy">
            Tell us where you want to go. We will bring the strategy, creative, and digital muscle to help you get there.
          </p>
          <div className="contact-email" data-testid="contact-email">
            hello@blinxlabs.com
          </div>
        </div>

        <div className="contact-form-wrapper">
          {success ? (
            <div className="form-success" data-testid="form-success-message">
              <CheckCircle size={48} style={{ margin: '0 auto 1rem auto' }} />
              <h3>Message Sent!</h3>
              <p>We'll be in touch with you shortly.</p>
              <button 
                className="btn-secondary" 
                onClick={() => setSuccess(false)}
                style={{ marginTop: '1rem' }}
                data-testid="send-another-button"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form" noValidate>
              {serverError && (
                <div className="form-error-banner" data-testid="server-error-message">
                  <AlertCircle size={20} />
                  <span>{serverError}</span>
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label" htmlFor="name" data-testid="label-name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  data-testid="input-name"
                  disabled={loading}
                />
                {errors.name && <span className="form-error" data-testid="error-name">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email" data-testid="label-email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  data-testid="input-email"
                  disabled={loading}
                />
                {errors.email && <span className="form-error" data-testid="error-email">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="businessName" data-testid="label-businessName">Business name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  className={`form-input ${errors.businessName ? 'error' : ''}`}
                  value={formData.businessName}
                  onChange={handleChange}
                  data-testid="input-businessName"
                  disabled={loading}
                />
                {errors.businessName && <span className="form-error" data-testid="error-businessName">{errors.businessName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message" data-testid="label-message">What should we solve?</label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  value={formData.message}
                  onChange={handleChange}
                  data-testid="textarea-message"
                  disabled={loading}
                />
                {errors.message && <span className="form-error" data-testid="error-message">{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="form-submit btn-primary" 
                disabled={loading}
                data-testid="submit-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="spinner" size={20} data-testid="loading-spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Start the conversation
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
