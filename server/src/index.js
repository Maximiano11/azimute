import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';

import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import reportsRoutes from './routes/reports.routes.js';
import commentsRoutes from './routes/comments.routes.js';
import alertsRoutes from './routes/alerts.routes.js';
import icaRoutes from './routes/ica.routes.js';

const app = express();
const { PORT, CORS_ORIGIN: ORIGIN } = config;

app.set('trust proxy', 1); // atrás do proxy do Vite/balancer: IP real p/ rate limit
app.use(helmet());
app.use(
  cors({
    origin: ORIGIN === '*' ? true : ORIGIN.split(','),
    credentials: true, // necessário para enviar/receber o cookie de sessão
  })
);
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

// Rate limiting: protege contra brute force e abuso. Limites ajustáveis por env.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.RATE_LIMIT_AUTH,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas. Tente novamente em alguns minutos.' },
});
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.RATE_LIMIT_API,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições. Aguarde um momento.' },
});

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'azimute-api' }));

app.use('/api', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/ica', icaRoutes);

// 404 para rotas de API desconhecidas
app.use('/api', (_req, res) => res.status(404).json({ error: 'Rota não encontrada.' }));

// Tratamento de erros central: respostas 4xx intencionais já saem das rotas.
// Aqui só chegam erros inesperados — logamos o detalhe e devolvemos genérico.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[API error]', err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(PORT, () => console.log(`Azimute API rodando em http://localhost:${PORT}`));
