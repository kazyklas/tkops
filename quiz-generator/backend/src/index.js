import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateQuiz } from './services/quizService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const logger = {
  info: (msg, ...args) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, ...args),
  error: (msg, ...args) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, ...args),
  warn: (msg, ...args) => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, ...args),
  debug: (msg, ...args) => process.env.NODE_ENV !== 'production' && console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`, ...args),
};

logger.info('='.repeat(50));
logger.info('Application starting...');
logger.info('Node version:', process.version);
logger.info('Environment:', process.env.NODE_ENV || 'development');
logger.info('OpenAI API Key configured:', !!process.env.OPENAI_API_KEY);
logger.info('='.repeat(50));

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.get('/api/health', (req, res) => {
  logger.info('Health check requested');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    apiKeySet: !!process.env.OPENAI_API_KEY,
    env: process.env.NODE_ENV
  });
});

app.post('/api/generate-quiz', async (req, res) => {
  const requestId = Math.random().toString(36).substring(2, 10);
  
  logger.info(`[${requestId}] Quiz generation request started`);
  logger.debug(`[${requestId}] Request body:`, JSON.stringify(req.body, null, 2));

  try {
    if (!process.env.OPENAI_API_KEY) {
      logger.error(`[${requestId}] OpenAI API key not configured`);
      return res.status(503).json({ error: 'OpenAI API key not configured on server', requestId });
    }

    const { theme, questionCount, questionTypes } = req.body;

    logger.debug(`[${requestId}] Parsed parameters:`, { theme, questionCount, questionTypes });

    if (!theme || typeof theme !== 'string' || theme.trim().length === 0) {
      logger.warn(`[${requestId}] Validation failed: Theme is required`);
      return res.status(400).json({ error: 'Theme is required', requestId });
    }

    if (!questionCount || typeof questionCount !== 'number' || questionCount < 1 || questionCount > 40) {
      logger.warn(`[${requestId}] Validation failed: Invalid question count: ${questionCount}`);
      return res.status(400).json({ error: 'Question count must be between 1 and 40', requestId });
    }

    if (!questionTypes || !Array.isArray(questionTypes) || questionTypes.length === 0) {
      logger.warn(`[${requestId}] Validation failed: No question types provided`);
      return res.status(400).json({ error: 'At least one question type is required', requestId });
    }

    const validTypes = ['multiple_choice', 'open'];
    for (const type of questionTypes) {
      if (!validTypes.includes(type)) {
        logger.warn(`[${requestId}] Validation failed: Invalid question type: ${type}`);
        return res.status(400).json({ error: `Invalid question type: ${type}`, requestId });
      }
    }

    logger.info(`[${requestId}] Generating quiz: theme="${theme}", count=${questionCount}, types=${questionTypes.join(', ')}`);
    
    const startTime = Date.now();
    const quiz = await generateQuiz(theme, questionCount, questionTypes);
    const duration = Date.now() - startTime;

    logger.info(`[${requestId}] Quiz generated successfully in ${duration}ms with ${quiz.questions.length} questions`);
    
    res.json(quiz);
  } catch (error) {
    logger.error(`[${requestId}] Quiz generation failed:`, error.message);
    logger.error(`[${requestId}] Stack trace:`, error.stack);
    
    if (error.message?.includes('OpenAI API')) {
      return res.status(503).json({ error: 'AI service temporarily unavailable', requestId });
    }
    
    if (error.message?.includes('API key')) {
      return res.status(503).json({ error: 'Invalid API key', requestId });
    }
    
    if (error.message?.includes('rate limit')) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.', requestId });
    }
    
    res.status(500).json({ error: 'Failed to generate quiz', requestId });
  }
});

app.use((req, res) => {
  logger.warn(`404 - Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server listening on port ${PORT}`);
  logger.info(`OpenAI API Key starts with: ${process.env.OPENAI_API_KEY?.substring(0, 7)}...`);
});
