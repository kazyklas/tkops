import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import AdBanner from '../components/AdBanner';
import './Quiz.css';

export default function Quiz() {
  const navigate = useNavigate();
  const { 
    questions, 
    currentIndex, 
    answers, 
    isLoading, 
    setAnswer, 
    nextQuestion, 
    prevQuestion,
  } = useQuiz();

  const [direction, setDirection] = useState('forward');

  useEffect(() => {
    if (questions.length === 0 && !isLoading) {
      navigate('/');
    }
  }, [questions, isLoading, navigate]);

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      navigate('/results');
    } else {
      setDirection('forward');
      nextQuestion();
    }
  };

  const handlePrev = () => {
    setDirection('backward');
    prevQuestion();
  };

  const currentQuestion = questions[currentIndex];
  const userAnswer = answers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  if (isLoading || !currentQuestion) {
    return (
      <div className="quiz-loading">
        <AdBanner position="top" />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Generating your quiz...</p>
        </div>
        <AdBanner position="bottom" />
      </div>
    );
  }

  return (
    <div className="quiz animate-fade-in">
      <AdBanner position="top" />
      
      <div className="quiz-container">
        <div className="progress-bar">
          <span className="progress-text">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="progress-track">
            <div 
              className="progress-fill"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div 
          className={`question-card ${direction === 'forward' ? 'animate-slide-left' : 'animate-slide-right'}`}
          key={currentIndex}
        >
          <div className="question-badge">
            {currentQuestion.type === 'multiple_choice' ? 'Multiple Choice' : 'Open-Ended'}
          </div>
          
          <h2 className="question-text">{currentQuestion.question}</h2>

          {currentQuestion.type === 'multiple_choice' ? (
            <div className="options-list">
              {currentQuestion.options?.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${userAnswer === option ? 'selected' : ''}`}
                  onClick={() => setAnswer(option)}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="open-answer-container">
              <textarea
                className="open-answer-input"
                value={userAnswer || ''}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
              />
            </div>
          )}
        </div>

        <div className="navigation">
          <button 
            className="nav-btn nav-prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>
          
          <button 
            className="nav-btn nav-next"
            onClick={handleNext}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next →'}
          </button>
        </div>
      </div>

      <AdBanner position="bottom" />
    </div>
  );
}
