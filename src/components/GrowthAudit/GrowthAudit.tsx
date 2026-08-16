"use client";

import React, { useState } from 'react';
import { auditQuestions, getRecommendations, Recommendation } from '@/data/auditQuestions';
import Blob from '../Blob/Blob';
import { useContactModal } from '@/context/ContactModalContext';
import styles from './GrowthAudit.module.css';

export default function GrowthAudit() {
  const { openContactModal } = useContactModal();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', business_name: '' });
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);

  const totalSteps = 7; // 5 Qs + 1 Contact + 1 Results
  const isQuestionStep = currentStep >= 0 && currentStep < 5;
  const isContactStep = currentStep === 5;
  const isResultsStep = currentStep === 6;

  const handleOptionSelect = (optionId: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionId;
    setAnswers(newAnswers);
    
    setTimeout(() => {
      nextStep();
    }, 400);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const submitAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/growth-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, ...contactInfo })
      });
      const data = await response.json();
      if (response.ok && data.recommendations) {
        setResults(data.recommendations);
        setCurrentStep(6);
      } else {
        // Fallback to local if API fails
        setResults(getRecommendations(answers));
        setCurrentStep(6);
      }
    } catch (error) {
      console.error(error);
      setResults(getRecommendations(answers));
      setCurrentStep(6);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auditContainer} data-testid="growth-audit">
      <Blob position="bottom-left" variant="primary" opacity={isResultsStep ? 0.8 : 0.5} />
      
      {!isResultsStep && (
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
          <span className={styles.progressText}>Step {currentStep + 1} of {totalSteps - 1}</span>
        </div>
      )}

      <div className={styles.stepWrapper} key={currentStep}>
        {isQuestionStep && (
          <div className={styles.questionStep}>
            <h2 className={styles.questionText}>{auditQuestions[currentStep].question}</h2>
            <div className={styles.optionsGrid}>
              {auditQuestions[currentStep].options.map(option => (
                <button
                  key={option.id}
                  className={`${styles.optionButton} ${answers[currentStep] === option.id ? styles.selected : ''}`}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className={styles.navButtons}>
              {currentStep > 0 && <button onClick={prevStep} className={styles.backButton}>Back</button>}
            </div>
          </div>
        )}

        {isContactStep && (
          <div className={styles.contactStep}>
            <h2 className={styles.questionText}>Almost there! Where should we send your results?</h2>
            <div className={styles.formGroup}>
              <input 
                type="text" 
                id="audit-name"
                name="name" 
                value={contactInfo.name} 
                onChange={handleContactChange}
                required
                className={contactInfo.name ? styles.filled : ''}
              />
              <label htmlFor="audit-name">Name</label>
            </div>
            <div className={styles.formGroup}>
              <input 
                type="email" 
                id="audit-email"
                name="email" 
                value={contactInfo.email} 
                onChange={handleContactChange}
                required
                className={contactInfo.email ? styles.filled : ''}
              />
              <label htmlFor="audit-email">Email</label>
            </div>
            <div className={styles.formGroup}>
              <input 
                type="text" 
                id="audit-business"
                name="business_name" 
                value={contactInfo.business_name} 
                onChange={handleContactChange}
                required
                className={contactInfo.business_name ? styles.filled : ''}
              />
              <label htmlFor="audit-business">Business Name</label>
            </div>
            
            <div className={styles.navButtons}>
              <button onClick={prevStep} className={styles.backButton} disabled={loading}>Back</button>
              <button 
                onClick={submitAudit} 
                className={styles.nextButton}
                disabled={!contactInfo.name || !contactInfo.email || !contactInfo.business_name || loading}
              >
                {loading ? 'Analyzing...' : 'See Results'}
              </button>
            </div>
          </div>
        )}

        {isResultsStep && results && (
          <div className={styles.resultsStep}>
            <h3 className={styles.resultsHeading}>Your Growth Snapshot</h3>
            <div className={styles.recommendationsList}>
              {results.map((rec, idx) => (
                <div key={idx} className={styles.recommendationCard}>
                  <span className={styles.flywheelLabel}>{rec.stage}</span>
                  <h4>{rec.title}</h4>
                  <p>{rec.description}</p>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => openContactModal()} className={styles.ctaButton}>
              Book Your Free Strategy Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
