import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const { generateQuiz, isLoading, error } = useQuiz();
  
  const [questionTypes, setQuestionTypes] = useState(['multiple_choice']);
  const [questionCount, setQuestionCount] = useState(5);
  const [theme, setTheme] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleTypeChange = (type) => {
    setQuestionTypes(prev => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!theme.trim()) {
      setValidationError('Please enter a quiz theme');
      return;
    }

    if (questionTypes.length === 0) {
      setValidationError('Please select at least one question type');
      return;
    }

    try {
      await generateQuiz(theme, questionCount, questionTypes);
      navigate('/quiz');
    } catch (err) {
      setValidationError(err.message);
    }
  };

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          AI-Powered
        </div>
        <h1 className="hero-title">
          <span>QuizGen</span> AI
        </h1>
        <p className="hero-subtitle">Generate custom quizzes on any topic</p>
        <p className="hero-description">
          The more detailed and specific your quiz theme is, the better and more accurate the questions will be.
        </p>
      </section>

      <section className="config-section">
        <form className="config-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Question Type</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={questionTypes.includes('multiple_choice')}
                  onChange={() => handleTypeChange('multiple_choice')}
                />
                <span className="checkbox-custom"></span>
                Multiple choice (ABC)
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={questionTypes.includes('open')}
                  onChange={() => handleTypeChange('open')}
                />
                <span className="checkbox-custom"></span>
                Open-ended questions
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Number of Questions</label>
            <div className="number-selector">
              <button
                type="button"
                className="number-btn"
                onClick={() => setQuestionCount(prev => Math.max(1, prev - 1))}
                disabled={questionCount <= 1}
              >
                −
              </button>
              <input
                type="number"
                className="number-input"
                value={questionCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuestionCount(Math.max(1, Math.min(40, val)));
                }}
                min={1}
                max={40}
              />
              <button
                type="button"
                className="number-btn"
                onClick={() => setQuestionCount(prev => Math.min(40, prev + 1))}
                disabled={questionCount >= 40}
              >
                +
              </button>
            </div>
            <span className="form-hint">Select between 1 and 40 questions</span>
          </div>

          <div className="form-group">
            <label className="form-label">Quiz Theme</label>
            <div className="chat-input-container">
              <textarea
                className="chat-input"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g. Advanced JavaScript concepts for frontend interviews, Machine learning fundamentals, World War II key events..."
                rows={4}
              />
            </div>
          </div>

          {(validationError || error) && (
            <div className="error-message">{validationError || error}</div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Generating Quiz...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Generate Quiz
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
