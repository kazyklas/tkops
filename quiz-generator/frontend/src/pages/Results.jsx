import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import AdBanner from '../components/AdBanner';
import './Results.css';

export default function Results() {
  const navigate = useNavigate();
  const { questions, answers, calculateScore, reset } = useQuiz();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (questions.length === 0) {
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [questions, navigate]);

  const handleNewQuiz = () => {
    reset();
    navigate('/');
  };

  if (!showResults) {
    return (
      <div className="results-loading">
        <AdBanner position="top" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Calculating your score...</p>
        </div>
        <AdBanner position="bottom" />
      </div>
    );
  }

  const { correct, total, percentage } = calculateScore();

  const getPerformanceMessage = () => {
    if (percentage >= 90) return 'Excellent!';
    if (percentage >= 70) return 'Good job!';
    if (percentage >= 50) return 'Not bad!';
    return 'Keep practicing!';
  };

  const getPerformanceClass = () => {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    return 'needs-practice';
  };

  return (
    <div className="results animate-fade-in">
      <AdBanner position="top" />
      
      <div className="results-container">
        <div className="score-card">
          <h1 className="score-title">Quiz Complete!</h1>
          
          <div className={`score-display ${getPerformanceClass()}`}>
            <span className="score-number">{correct}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{total}</span>
          </div>

          <p className={`performance-message ${getPerformanceClass()}`}>
            {getPerformanceMessage()}
          </p>

          <p className="score-percentage">{percentage}% correct</p>
        </div>

        <div className="answers-review">
          <h2 className="review-title">Answer Review</h2>
          
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correct_answer;

            return (
              <div 
                key={idx} 
                className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="answer-header">
                  <span className="answer-number">Q{idx + 1}</span>
                  <span className={`answer-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                </div>
                
                <p className="answer-question">{q.question}</p>
                
                <div className="answer-details">
                  <div className="answer-row">
                    <span className="answer-label">Your answer:</span>
                    <span className={`answer-value ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {userAnswer || '(No answer)'}
                    </span>
                  </div>
                  
                  {!isCorrect && (
                    <div className="answer-row">
                      <span className="answer-label">Correct answer:</span>
                      <span className="answer-value correct">{q.correct_answer}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button className="new-quiz-btn" onClick={handleNewQuiz}>
          Generate New Quiz
        </button>
      </div>

      <AdBanner position="bottom" />
    </div>
  );
}
