import { createContext, useContext, useReducer, useCallback } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [],
  currentIndex: 0,
  answers: {},
  isLoading: false,
  error: null,
  theme: '',
  questionCount: 0,
  questionTypes: [],
  showAd: false,
  adPosition: null,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'SET_QUIZ':
      return {
        ...state,
        questions: action.payload.questions,
        currentIndex: 0,
        answers: {},
        isLoading: false,
        error: null,
        theme: action.payload.theme,
        questionCount: action.payload.questionCount,
        questionTypes: action.payload.questionTypes,
      };
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [state.currentIndex]: action.payload,
        },
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0),
      };
    case 'GO_TO_QUESTION':
      return {
        ...state,
        currentIndex: Math.max(0, Math.min(action.payload, state.questions.length - 1)),
      };
    case 'SHOW_AD':
      return { ...state, showAd: true, adPosition: action.payload };
    case 'HIDE_AD':
      return { ...state, showAd: false, adPosition: null };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const generateQuiz = useCallback(async (theme, questionCount, questionTypes) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, questionCount, questionTypes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate quiz');
      }

      const data = await response.json();
      dispatch({ type: 'SET_QUIZ', payload: { questions: data.questions, theme, questionCount, questionTypes } });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const setAnswer = useCallback((answer) => {
    dispatch({ type: 'SET_ANSWER', payload: answer });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const prevQuestion = useCallback(() => {
    dispatch({ type: 'PREV_QUESTION' });
  }, []);

  const goToQuestion = useCallback((index) => {
    dispatch({ type: 'GO_TO_QUESTION', payload: index });
  }, []);

  const showAd = useCallback((position) => {
    dispatch({ type: 'SHOW_AD', payload: position });
  }, []);

  const hideAd = useCallback(() => {
    dispatch({ type: 'HIDE_AD' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const calculateScore = useCallback(() => {
    let correct = 0;
    state.questions.forEach((q, i) => {
      const userAnswer = state.answers[i];
      if (userAnswer === q.correct_answer) {
        correct++;
      }
    });
    return {
      correct,
      total: state.questions.length,
      percentage: Math.round((correct / state.questions.length) * 100),
    };
  }, [state.questions, state.answers]);

  return (
    <QuizContext.Provider
      value={{
        ...state,
        generateQuiz,
        setAnswer,
        nextQuestion,
        prevQuestion,
        goToQuestion,
        showAd,
        hideAd,
        reset,
        calculateScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
