import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '64kb' }));

const PORTFOLIO_SYSTEM_INSTRUCTION = `You are "Ask Gauri's Portfolio", the official interactive portfolio assistant for Gauri Yete.
Speak clearly, warmly, and concisely in 2 to 4 sentences unless the visitor asks for deeper detail.

VERIFIED PORTFOLIO FACTS FOR GAURI YETE:
- Name: Gauri Yete
- Academic Background: B.Tech Computer Engineering student
- Identity & Roles: UI/UX Designer, Creative Developer, Computer Engineering Student, Problem Solver
- Core Tagline: "Design Mind. Developer Logic. Creative Vision."
- Contact Email: gauriyete@gmail.com
- Skills by Category:
  1. Design: UI/UX Design, Creative Design, Wireframing
  2. Web Development: HTML, CSS, JavaScript
  3. Programming: Python, C, C++
  4. Computer Science: Data Structures, Problem Solving
- Sample Project Lab Entries (explicitly sample entries awaiting final repository links):
  1. Personal Portfolio Website (Web Development & Creative Experiments)
  2. UI/UX Creative Design Collection (UI/UX Design)
  3. Coding Practice Tracker (Web Development & Python)
  4. Python Applications (Python)
  5. C++ Programming Projects (C++)
- Creative Design Process (6 Stages):
  01 Research -> 02 Brainstorm -> 03 Wireframe -> 04 Design -> 05 Develop -> 06 Test & Improve
- Interactive Features on this Site: Digital ID Card with 3D flip, Skill Constellation explorer, Project Lab showcase, Sandboxed Live Code Playground (HTML/CSS/JS), Design Process Timeline, Academic & Learning Journey Timeline.

STRICT TRUTHFULNESS RULES:
- Never invent corporate work experience, client names, GPAs, project metrics, or years of industry employment.
- If asked about experience or live project URLs, state honestly that Gauri is currently a B.Tech Computer Engineering student and that the Project Lab currently displays sample showcase entries until final repository links are added.
- If asked something unrelated to Gauri Yete's portfolio, gently steer back to her design work, engineering studies, skills, or contact info.`;

function isGeminiConfigured(): boolean {
  const key = process.env.GEMINI_API_KEY?.trim();
  return Boolean(key && key !== 'MY_GEMINI_API_KEY');
}

app.get('/api/assistant/status', (_req, res) => {
  res.json({
    aiConfigured: isGeminiConfigured(),
    model: isGeminiConfigured() ? 'gemini-4-hydrogen' : null,
  });
});

interface ChatTurn {
  role: 'user' | 'assistant';
  text: string;
}

app.post('/api/assistant', async (req, res) => {
  const rawQuestion = req.body?.question;
  if (typeof rawQuestion !== 'string' || !rawQuestion.trim()) {
    res.status(400).json({ error: 'Please enter a valid question.' });
    return;
  }

  const question = rawQuestion.trim().slice(0, 800);

  if (!isGeminiConfigured()) {
    res.status(503).json({
      error: 'Live Gemini AI is not configured on this server (GEMINI_API_KEY missing).',
      code: 'GEMINI_NOT_CONFIGURED',
    });
    return;
  }

  const rawHistory = Array.isArray(req.body?.history) ? req.body.history : [];
  const safeHistory: ChatTurn[] = rawHistory
    .filter(
      (item: unknown): item is ChatTurn =>
        Boolean(item) &&
        typeof item === 'object' &&
        ((item as ChatTurn).role === 'user' || (item as ChatTurn).role === 'assistant') &&
        typeof (item as ChatTurn).text === 'string' &&
        (item as ChatTurn).text.trim().length > 0
    )
    .slice(-6);

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const conversationContext =
      safeHistory.length > 0
        ? safeHistory
            .map((turn) => `${turn.role === 'user' ? 'Visitor' : 'Assistant'}: ${turn.text.slice(0, 400)}`)
            .join('\n') + `\nVisitor: ${question}`
        : question;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: conversationContext,
      config: {
        systemInstruction: PORTFOLIO_SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      res.status(502).json({ error: 'The assistant returned an empty response. Please try again.' });
      return;
    }

    res.json({ reply, source: 'gemini-4-hydrogen' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unable to reach Gemini API.';
    console.error('[Assistant API error]', message);
    res.status(502).json({
      error: 'Unable to reach Gemini API right now. You can still use the built-in portfolio guide.',
      details: message,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
