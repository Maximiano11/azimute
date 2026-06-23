import { createRequire } from 'node:module';
import app from '../../server/src/app.js';

const require = createRequire(new URL('../../server/package.json', import.meta.url));
const serverless = require('serverless-http');
const expressHandler = serverless(app);

export async function handler(event, context) {
  const functionPath = '/.netlify/functions/api';

  if (event.path?.startsWith(functionPath)) {
    const rest = event.path.slice(functionPath.length);
    event.path = `/api${rest.startsWith('/') ? rest : `/${rest}`}`;
  } else if (event.path && !event.path.startsWith('/api')) {
    event.path = `/api${event.path.startsWith('/') ? event.path : `/${event.path}`}`;
  }

  return expressHandler(event, context);
}
