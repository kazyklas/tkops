import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

function buildPrompt(theme, questionCount, questionTypes) {
  const typeLabels = {
    'multiple_choice': 'multiple-choice (ABC)',
    'open': 'open-ended'
  };
  
  const types = questionTypes.map(t => typeLabels[t]).join(' and ');
  
  return `You are.

Generate a quiz with the following constraints:
- Theme: a quiz generation engine ${theme}
- Number of questions: ${questionCount} (maximum 40)
- Question types: ${types}
- Do NOT repeat questions.
- Questions must be unique and non-overlapping.
- Difficulty should match the theme complexity.

For multiple-choice questions:
- Provide exactly 4 options (A, B, C, D)
- Mark the correct answer clearly.

For open-ended questions:
- Provide a concise model answer.

Return ONLY valid JSON in the following format:
{
  "questions": [
    {
      "type": "multiple_choice | open",
      "question": "string",
      "options": ["A", "B", "C", "D"], // only for multiple choice
      "correct_answer": "string"
    }
  ]
}

Do not include any text before or after the JSON.`;
}

export async function generateQuiz(theme, questionCount, questionTypes) {
  const prompt = buildPrompt(theme, questionCount, questionTypes);
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a precise JSON generator. Always return valid JSON.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 8000,
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0]?.message?.content;
  
  if (!content) {
    throw new Error('Empty response from OpenAI');
  }

  try {
    const parsed = JSON.parse(content);
    
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Invalid response format');
    }

    const validTypes = ['multiple_choice', 'open'];
    const validQuestions = parsed.questions
      .slice(0, questionCount)
      .filter(q => 
        q.question && 
        q.correct_answer &&
        validTypes.includes(q.type) &&
        (q.type === 'open' || (q.options && q.options.length === 4))
      )
      .map(q => ({
        type: q.type,
        question: q.question,
        options: q.type === 'multiple_choice' ? q.options : null,
        correct_answer: q.correct_answer
      }));

    if (validQuestions.length === 0) {
      throw new Error('No valid questions generated');
    }

    return { questions: validQuestions };
  } catch (parseError) {
    console.error('JSON parse error:', parseError);
    throw new Error('Failed to parse AI response');
  }
}
