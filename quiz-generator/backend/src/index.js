import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateQuiz } from './services/quizService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { theme, questionCount, questionTypes } = req.body;

    if (!theme || typeof theme !== 'string' || theme.trim().length === 0) {
      return res.status(400).json({ error: 'Theme is required' });
    }

    if (!questionCount || typeof questionCount !== 'number' || questionCount < 1 || questionCount > 40) {
      return res.status(400).json({ error: 'Question count must be between 1 and 40' });
    }

    if (!questionTypes || !Array.isArray(questionTypes) || questionTypes.length === 0) {
      return res.status(400).json({ error: 'At least one question type is required' });
    }

    const validTypes = ['multiple_choice', 'open'];
    for (const type of questionTypes) {
      if (!validTypes.includes(type)) {
        return res.status(400).json({ error: `Invalid question type: ${type}` });
      }
    }

    const quiz = await generateQuiz(theme, questionCount, questionTypes);
    res.json(quiz);
  } catch (error) {
    console.error('Quiz generation error:', error);
    
    if (error.message?.includes('OpenAI API')) {
      return res.status(503).json({ error: 'AI service temporarily unavailable' });
    }
    
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
