import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { AppVariables } from './types/context.js';
import { errorHandler } from './lib/errors.js';
import { prismaMiddleware } from './middleware/prisma.js';
import users from './routes/users.js';
import investments from './routes/investments.js';
import returns from './routes/returns.js';
import capitals from './routes/capitals.js';
import statistics from './routes/statistics.js';

const app = new Hono<{ Variables: AppVariables }>();

app.use('*', logger());
app.use('*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'], allowHeaders: ['Content-Type', 'Authorization'] }));
app.get('/api/health', (c) => c.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } }));

app.use('*', prismaMiddleware);

app.route('/api/users', users);
app.route('/api/investments', investments);
app.route('/api/capitals', capitals);
app.route('/api/returns', returns);
app.route('/api/statistics', statistics);

app.onError(errorHandler);

export default app;
