import React, { useState } from 'react';
import { 
  Globe, 
  Gauge, 
  Search, 
  TrendingUp, 
  Share2, 
  Target, 
  PenTool, 
  FileText, 
  Layers, 
  Repeat 
} from 'lucide-react';
import { generateRecommendations } from '../utils/auditEngine';
import './GrowthAudit.css';

const iconMap = {
  globe: Globe,
  gauge: Gauge,
  search: Search,
  'trending-up': TrendingUp,
  'share-2': Share2,
  target: Target,
  'pen-tool': PenTool,
  'file-text': FileText,
  layers: Layers,
  repeat: Repeat,
};

const GrowthAudit = () => {
  const [view, setView] = useState('cta'); // 'cta' | 'quiz' | 'results'
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    businessType: '',
    hasWebsite: '',
    findingThroughGoogle: '',
    activeOnSocial: '',
    biggestChallenge: '',
  });
  const [recommendations, setRecommendations] = useState([]);

  const totalSteps = 5;

  const handleStart = () => {
    setView('quiz');
  };

  const handleOptionSelect = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      const recs = generateRecommendations(answers);
      setRecommendations(recs);
      setView('results');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({
      businessType: '',
      hasWebsite: '',
      findingThroughGoogle: '',
      activeOnSocial: '',
      biggestChallenge: '',
    });
    setCurrentStep(1);
    setView('cta');
  };

  return (
    <section id="growth-audit" className="growth-audit reveal" data-testid="growth-audit-section">
      <div className="growth-audit-inner container">
        {view === 'cta' && (
          <div className="audit-cta-view" data-testid="audit-cta-view">
            <span className="audit-label" data-testid="audit-label">FREE GROWTH AUDIT</span>
            <h2 className="audit-heading" data-testid="audit-heading">Find the gap blocking growth.</h2>
            <p className="audit-copy" data-testid="audit-copy">
              Take our 2-minute growth check and get three practical moves to strengthen your online presence.
            </p>
            <button 
              className="btn-primary" 
              onClick={handleStart}
              data-testid="start-audit-button"
            >
              Start the checkup
            </button>
          </div>
        )}

        {view === 'quiz' && (
          <div className="audit-quiz" data-testid="audit-quiz-view">
            <div className="audit-progress" data-testid="audit-progress">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`audit-progress-dot ${currentStep === idx + 1 ? 'active' : ''} ${currentStep > idx + 1 ? 'completed' : ''}`}
                  data-testid={`audit-progress-dot-${idx + 1}`}
                />
              ))}
            </div>

            <div className="audit-step-content" data-testid={`audit-step-${currentStep}`}>
              {currentStep === 1 && (
                <>
                  <h3 className="audit-question" data-testid="question-1">What type of business do you run?</h3>
                  <select 
                    className="audit-select" 
                    value={answers.businessType} 
                    onChange={(e) => handleOptionSelect('businessType', e.target.value)}
                    data-testid="select-business-type"
                  >
                    <option value="" disabled>Select business type</option>
                    <option value="Retail">Retail</option>
                    <option value="Service-based">Service-based</option>
                    <option value="Restaurant or cafe">Restaurant or cafe</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Other">Other</option>
                  </select>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h3 className="audit-question" data-testid="question-2">Do you currently have a website?</h3>
                  <div className="audit-options">
                    {['Yes', 'No', 'It needs work'].map(opt => (
                      <button 
                        key={opt}
                        className={`audit-option ${answers.hasWebsite === opt ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('hasWebsite', opt)}
                        data-testid={`option-website-${opt}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <h3 className="audit-question" data-testid="question-3">Are customers finding you through Google?</h3>
                  <div className="audit-options">
                    {['Yes', 'No', 'Not sure'].map(opt => (
                      <button 
                        key={opt}
                        className={`audit-option ${answers.findingThroughGoogle === opt ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('findingThroughGoogle', opt)}
                        data-testid={`option-google-${opt}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <h3 className="audit-question" data-testid="question-4">Are you active on social media?</h3>
                  <div className="audit-options">
                    {['Yes', 'Sometimes', 'No'].map(opt => (
                      <button 
                        key={opt}
                        className={`audit-option ${answers.activeOnSocial === opt ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('activeOnSocial', opt)}
                        data-testid={`option-social-${opt}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <>
                  <h3 className="audit-question" data-testid="question-5">What is your biggest digital challenge?</h3>
                  <div className="audit-options">
                    {['Getting visible', 'Generating leads', 'Building trust', 'Staying consistent', 'Everything'].map(opt => (
                      <button 
                        key={opt}
                        className={`audit-option ${answers.biggestChallenge === opt ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect('biggestChallenge', opt)}
                        data-testid={`option-challenge-${opt}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="audit-nav">
              {currentStep > 1 ? (
                <button 
                  className="audit-back" 
                  onClick={handleBack}
                  data-testid="audit-back-button"
                >
                  Back
                </button>
              ) : <div></div>}
              <button 
                className="btn-primary" 
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !answers.businessType) ||
                  (currentStep === 2 && !answers.hasWebsite) ||
                  (currentStep === 3 && !answers.findingThroughGoogle) ||
                  (currentStep === 4 && !answers.activeOnSocial) ||
                  (currentStep === 5 && !answers.biggestChallenge)
                }
                data-testid="audit-next-button"
              >
                {currentStep === totalSteps ? 'See Results' : 'Next'}
              </button>
            </div>
          </div>
        )}

        {view === 'results' && (
          <div className="audit-results" data-testid="audit-results-view">
            <h2 className="audit-heading" data-testid="results-heading">Your Growth Action Plan</h2>
            <p className="audit-copy" data-testid="results-copy">Based on your answers, here are three moves to make next.</p>
            
            <div className="audit-result-cards" data-testid="audit-result-cards">
              {recommendations.map((rec, idx) => {
                const IconComponent = iconMap[rec.icon] || Globe;
                return (
                  <div key={idx} className="audit-result-card" data-testid={`audit-result-card-${idx}`}>
                    <IconComponent className="audit-result-icon" size={32} data-testid={`icon-${rec.icon}`} />
                    <h4 className="audit-result-title" data-testid={`result-title-${idx}`}>{rec.title}</h4>
                    <p className="audit-result-desc" data-testid={`result-desc-${idx}`}>{rec.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="audit-results-actions">
              <button 
                className="btn-primary" 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                data-testid="results-cta-button"
              >
                Get expert help with this
              </button>
              <button 
                className="audit-back" 
                style={{ marginLeft: '1rem' }} 
                onClick={handleRetake}
                data-testid="retake-audit-button"
              >
                Retake audit
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GrowthAudit;
