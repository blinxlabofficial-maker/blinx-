import React, { useState } from 'react';
import { 
  CheckCircle, 
  Calendar as CalendarIcon, 
  Clock, 
  ArrowRight, 
  Loader2,
  Check
} from 'lucide-react';
import './BookStrategy.css';

const TIME_SLOTS = [
  '09:00 AM',
  '11:00 AM',
  '02:00 PM',
  '04:00 PM'
];

export default function BookStrategy() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    date: '',
    slot: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.slot) newErrors.slot = 'Time slot is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);

    const bookingMessage = `Strategy Call Booking Request: Initial session scheduled for ${formData.date} at ${formData.slot}.`;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business_name: formData.businessName,
          message: bookingMessage
        })
      });

      if (!res.ok) {
        throw new Error('Failed to submit booking session');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', businessName: '', date: '', slot: '' });
    } catch (err) {
      setServerError('Unable to complete booking. Please try again or email us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="strategy-call" className="booking-section" data-testid="booking-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="booking-header text-center">
          <span className="booking-label label text-yellow" data-testid="booking-label">STRATEGY SESSION</span>
          <h2 className="booking-title" data-testid="booking-title">
            Ready to build <span className="highlight-red">your engine?</span>
          </h2>
          <p className="booking-desc" data-testid="booking-desc">
            Schedule your strategy session. We strip away the fluff and focus on raw, impactful growth machines.
          </p>
        </div>

        <div className="booking-main-grid">
          
          {/* Left Column: Criteria & Workflow */}
          <div className="booking-info-col">
            
            {/* The Flywheel Fit */}
            <div className="flywheel-fit-box" data-testid="flywheel-fit-box">
              <h3 className="box-title">The Flywheel Fit</h3>
              <p className="box-sub">We only work with businesses where we know we can make an immediate, massive impact. Check your fit:</p>
              
              <ul className="fit-checklist">
                <li>
                  <div className="check-bullet"><Check size={14} /></div>
                  <div>
                    <strong>Proven Product:</strong> You have market validation and a solid offering.
                  </div>
                </li>
                <li>
                  <div className="check-bullet"><Check size={14} /></div>
                  <div>
                    <strong>Ready to Scale:</strong> You have the capacity to handle rapid influx of leads.
                  </div>
                </li>
                <li>
                  <div className="check-bullet"><Check size={14} /></div>
                  <div>
                    <strong>Speed &gt; Bureaucracy:</strong> You value aggressive execution over endless meetings.
                  </div>
                </li>
              </ul>
            </div>

            {/* Stepper Workflow */}
            <div className="booking-stepper" data-testid="booking-stepper">
              <h3 className="box-title">What to Expect</h3>
              <div className="steps-flow">
                
                <div className="step-item">
                  <div className="step-badge">1</div>
                  <div className="step-content">
                    <h4>Audit</h4>
                    <p>We ruthlessly analyze your current systems to find friction points.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-badge">2</div>
                  <div className="step-content">
                    <h4>Blueprint</h4>
                    <p>We map the exact digital flywheel architecture required to scale.</p>
                  </div>
                </div>

                <div className="step-item">
                  <div className="step-badge">3</div>
                  <div className="step-content">
                    <h4>Execution</h4>
                    <p>We build the machine. Fast, sharp, and highly aggressive.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Interactive Scheduling Form */}
          <div className="booking-form-col">
            <div className="scheduler-card" data-testid="scheduler-card">
              
              {success ? (
                <div className="booking-success" data-testid="booking-success-message">
                  <CheckCircle size={48} className="text-green" style={{ margin: '0 auto 1rem auto' }} />
                  <h3>Strategy Session Requested!</h3>
                  <p>We have reserved your slot. A team member will email you confirmation details within 12 hours.</p>
                  <button 
                    className="btn-primary" 
                    onClick={() => setSuccess(false)}
                    style={{ marginTop: '1.5rem' }}
                    data-testid="booking-another-btn"
                  >
                    Schedule Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="scheduler-form" data-testid="booking-form" noValidate>
                  
                  {serverError && (
                    <div className="booking-error-banner" data-testid="booking-server-error">
                      {serverError}
                    </div>
                  )}

                  <div className="form-row-2">
                    <div className="form-grp">
                      <label htmlFor="book-name">Name</label>
                      <input 
                        id="book-name"
                        type="text" 
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={errors.name ? 'error' : ''}
                        data-testid="booking-input-name"
                      />
                      {errors.name && <span className="error-txt" data-testid="booking-error-name">{errors.name}</span>}
                    </div>

                    <div className="form-grp">
                      <label htmlFor="book-business">Business Name</label>
                      <input 
                        id="book-business"
                        type="text" 
                        placeholder="Company name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        className={errors.businessName ? 'error' : ''}
                        data-testid="booking-input-business"
                      />
                      {errors.businessName && <span className="error-txt" data-testid="booking-error-business">{errors.businessName}</span>}
                    </div>
                  </div>

                  <div className="form-grp">
                    <label htmlFor="book-email">Business Email</label>
                    <input 
                      id="book-email"
                      type="email" 
                      placeholder="hello@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={errors.email ? 'error' : ''}
                      data-testid="booking-input-email"
                    />
                    {errors.email && <span className="error-txt" data-testid="booking-error-email">{errors.email}</span>}
                  </div>

                  <div className="form-grp">
                    <label htmlFor="book-date">Select Date</label>
                    <div className="date-input-wrapper">
                      <CalendarIcon className="field-icon" size={16} />
                      <input 
                        id="book-date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className={errors.date ? 'error' : ''}
                        data-testid="booking-input-date"
                      />
                    </div>
                    {errors.date && <span className="error-txt" data-testid="booking-error-date">{errors.date}</span>}
                  </div>

                  <div className="form-grp">
                    <label>Select Time Slot</label>
                    <div className="slots-grid">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`slot-btn ${formData.slot === slot ? 'selected' : ''}`}
                          onClick={() => setFormData({...formData, slot})}
                          data-testid={`booking-slot-${slot.replace(':', '').replace(' ', '')}`}
                        >
                          <Clock size={12} />
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.slot && <span className="error-txt" data-testid="booking-error-slot">{errors.slot}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary full-width"
                    disabled={loading}
                    data-testid="booking-submit-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="spinner" size={16} />
                        Booking Session...
                      </>
                    ) : (
                      <>
                        Confirm Strategy Session
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
