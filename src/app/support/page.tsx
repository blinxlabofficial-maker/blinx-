'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  AlertCircle,
  Headphones,
  LifeBuoy,
  FileCode2,
  Video
} from 'lucide-react';
import styles from './page.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are your typical turnaround times for web apps and video edits?",
    answer: "For video editing packages, our turnaround time is typically 24 to 48 hours for initial drafts, and 24 hours for revision rounds. For custom Next.js web applications, sprints typically range from 2 to 4 weeks depending on scope, database integrations, and custom 3D/AI features."
  },
  {
    question: "How does the revision process work for videos and web platforms?",
    answer: "Every project includes dedicated revision rounds. For videos, we provide timestamped Frame.io-style review loops where you can specify exact timecodes for cut, audio, or caption adjustments. For web applications, we deploy preview staging branches for your team to test and approve before deploying to production."
  },
  {
    question: "Do I retain 100% intellectual property (IP) and source code?",
    answer: "Yes, absolutely. Upon final milestone signoff and invoice clearance, you retain 100% full commercial ownership of all source code repositories, databases, Figma design files, After Effects project files, and 4K ProRes/MP4 video master renders."
  },
  {
    question: "What hosting, SLA, and maintenance packages do you support?",
    answer: "We support high-performance serverless deployments on Vercel, AWS, and Cloudflare with 99.99% uptime SLAs. We offer ongoing maintenance retainers that cover security patches, database backups, performance telemetry, and continuous feature updates."
  },
  {
    question: "How do we get started or submit an emergency ticket?",
    answer: "For active clients with an urgent issue, email support@blinxlabs.com for priority 2-hour SLA response. For new projects or change requests, simply fill out the support/inquiry ticket below or schedule a strategy call."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketData, setTicketData] = useState({
    name: '',
    email: '',
    project: '',
    category: 'General Inquiry',
    priority: 'Normal',
    message: ''
  });
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicketData(prev => ({ ...prev, [name]: value }));
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketData.name.trim() || !ticketData.email.trim() || !ticketData.message.trim()) {
      alert('Please fill out all required fields (Name, Email, and Message).');
      return;
    }

    setTicketStatus('loading');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ticketData.name,
          email: ticketData.email,
          business_name: ticketData.project || 'Support Ticket',
          help_type: [`Support: ${ticketData.category}`],
          description: `[Priority: ${ticketData.priority}] ${ticketData.message}`
        })
      });

      if (response.ok) {
        setTicketStatus('success');
      } else {
        setTicketStatus('error');
      }
    } catch {
      setTicketStatus('error');
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* 1. Hero Atmosphere Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroAtmosphere} aria-hidden="true">
          <div className={styles.heroGlowBlob1} />
          <div className={styles.heroGlowBlob2} />
          <div className={styles.heroGridOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badgeDot} />
            <span className={styles.heroLabel}>HELP DESK &amp; CLIENT SUPPORT</span>
          </div>

          <h1 className={styles.heroTitle}>How can we assist you today?</h1>

          <p className={styles.heroSubtitle}>
            Dedicated technical support, video production revisions, and strategic consultation. Direct senior engineer access for active projects and new inquiries.
          </p>

          <div className={styles.slaTicker}>
            <span className={styles.slaPulse} />
            <span className={styles.slaText}>Live Support Desk: <strong>Active &amp; Monitoring</strong> · Under 2h Priority Response</span>
          </div>
        </div>

        <div className={styles.heroBottomHighlight} aria-hidden="true" />
      </section>

      {/* 2. Direct Support Channels Grid */}
      <section className={styles.channelsSection}>
        <div className={styles.channelGrid}>
          {/* Card 1: Emergency & Priority Support */}
          <div className={styles.channelCard}>
            <div className={styles.channelIconBox}>
              <LifeBuoy size={22} />
            </div>
            <span className={styles.channelBadge}>ACTIVE CLIENT SLA</span>
            <h3 className={styles.channelTitle}>Priority Help Desk</h3>
            <p className={styles.channelDesc}>
              For live production bugs, server updates, or critical deployment issues.
            </p>
            <a href="mailto:support@blinxlabs.com?subject=Priority Support Request" className={styles.channelLink}>
              <span>support@blinxlabs.com</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 2: Creative & Video Revisions */}
          <div className={styles.channelCard}>
            <div className={styles.channelIconBox}>
              <Video size={22} />
            </div>
            <span className={styles.channelBadge}>VIDEO &amp; MEDIA</span>
            <h3 className={styles.channelTitle}>Creative Revisions</h3>
            <p className={styles.channelDesc}>
              Submit timestamped notes, voiceover updates, or raw asset uploads for your video pipeline.
            </p>
            <a href="mailto:creative@blinxlabs.com?subject=Video Revision Request" className={styles.channelLink}>
              <span>creative@blinxlabs.com</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Card 3: Discovery & Strategy */}
          <div className={styles.channelCard}>
            <div className={styles.channelIconBox}>
              <Headphones size={22} />
            </div>
            <span className={styles.channelBadge}>NEW INQUIRIES</span>
            <h3 className={styles.channelTitle}>Strategy Consultation</h3>
            <p className={styles.channelDesc}>
              Looking to kick off a new full-stack project or retain our creative production team?
            </p>
            <a href="mailto:hello@blinxlabs.com?subject=New Project Consultation" className={styles.channelLink}>
              <span>hello@blinxlabs.com</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Interactive Support Ticket Form & FAQ Section */}
      <section className={styles.mainGridSection}>
        <div className={styles.twoColumnLayout}>
          {/* Left: Support Ticket Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.formTag}>OPEN A TICKET</span>
                <h2 className={styles.formTitle}>Submit a Request</h2>
                <p className={styles.formSub}>Our senior desk will review and reply with next steps.</p>
              </div>

              {ticketStatus === 'success' ? (
                <div className={styles.ticketSuccessBox}>
                  <CheckCircle2 size={40} className={styles.successCheckIcon} />
                  <h3>Ticket Received</h3>
                  <p>Your request has been logged. Our engineering and creative lead will respond directly to your email shortly.</p>
                  <button 
                    className={styles.resetTicketBtn}
                    onClick={() => {
                      setTicketData({
                        name: '',
                        email: '',
                        project: '',
                        category: 'General Inquiry',
                        priority: 'Normal',
                        message: ''
                      });
                      setTicketStatus('idle');
                    }}
                  >
                    Submit Another Request &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit}>
                  <div className={styles.inputRow2}>
                    <div className={styles.formGroup}>
                      <label htmlFor="ticket-name">Your Name *</label>
                      <input
                        type="text"
                        id="ticket-name"
                        name="name"
                        value={ticketData.name}
                        onChange={handleTicketChange}
                        placeholder="e.g. Alex Rivera"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="ticket-email">Email Address *</label>
                      <input
                        type="email"
                        id="ticket-email"
                        name="email"
                        value={ticketData.email}
                        onChange={handleTicketChange}
                        placeholder="e.g. alex@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="ticket-project">Project Name / Website Domain (Optional)</label>
                    <input
                      type="text"
                      id="ticket-project"
                      name="project"
                      value={ticketData.project}
                      onChange={handleTicketChange}
                      placeholder="e.g. viramahstay.com or Campaign Name"
                    />
                  </div>

                  <div className={styles.inputRow2}>
                    <div className={styles.formGroup}>
                      <label htmlFor="ticket-category">Category</label>
                      <select
                        id="ticket-category"
                        name="category"
                        value={ticketData.category}
                        onChange={handleTicketChange}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Web App Technical Support">Web App Technical Support</option>
                        <option value="Video Editing Revision">Video Editing Revision</option>
                        <option value="Feature Request">New Feature Request</option>
                        <option value="Billing & Retainer">Billing &amp; Retainers</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="ticket-priority">Priority Level</label>
                      <select
                        id="ticket-priority"
                        name="priority"
                        value={ticketData.priority}
                        onChange={handleTicketChange}
                      >
                        <option value="Normal">Normal — standard queue</option>
                        <option value="Urgent">Urgent — production impact</option>
                        <option value="Low">Low — general question</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="ticket-message">Message / Details *</label>
                    <textarea
                      id="ticket-message"
                      name="message"
                      rows={4}
                      value={ticketData.message}
                      onChange={handleTicketChange}
                      placeholder="Describe what you need assistance with in detail..."
                      required
                    />
                  </div>

                  {ticketStatus === 'error' && (
                    <div className={styles.errorBox}>
                      <AlertCircle size={16} />
                      <span>Failed to submit. Please email support@blinxlabs.com directly.</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className={styles.submitTicketBtn}
                    disabled={ticketStatus === 'loading'}
                  >
                    {ticketStatus === 'loading' ? (
                      <span>Submitting Ticket...</span>
                    ) : (
                      <>
                        <span>Submit Support Ticket</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className={styles.faqCol}>
            <div className={styles.faqHeader}>
              <span className={styles.formTag}>KNOWLEDGE BASE</span>
              <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
              <p className={styles.faqSub}>Clear answers to common questions about timelines, IP, and deliverables.</p>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ''}`}>
                    <button
                      className={styles.faqQuestionBtn}
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={18} className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`} />
                    </button>
                    {isOpen && (
                      <div className={styles.faqAnswer}>
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
