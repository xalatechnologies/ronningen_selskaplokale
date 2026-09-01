import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { handleVisningSubmission } from './api/_lib/handle-visning';

/** Local POST /api/visning during `npm run dev` (production uses Vercel `/api/visning`). */
function visningApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'visning-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/visning') || req.method !== 'POST') {
          next();
          return;
        }

        for (const [key, value] of Object.entries(env)) {
          if (process.env[key] === undefined) process.env[key] = value;
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          }
          const raw = Buffer.concat(chunks).toString('utf8');
          const body = raw ? JSON.parse(raw) : {};
          const origin = req.headers.host?.trim() || 'localhost';

          const result = await handleVisningSubmission(body, { origin });

          const isClientError =
            result.error === 'invalid_payload' || result.error?.startsWith('Ugyldig');
          res.statusCode = result.ok ? 200 : isClientError ? 400 : 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result.ok ? { success: true } : result));
        } catch (err) {
          console.error('[vite visning-api]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'server_error' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), visningApiPlugin(env)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
