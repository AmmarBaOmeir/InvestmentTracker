import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import type { ServerResponse } from 'node:http';

const API_PROXY_TARGET = process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:3001';

function writeProxyError(res: ServerResponse, statusCode = 503) {
  if (res.headersSent) return;

  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      success: false,
      error: {
        code: 'SERVER_UNAVAILABLE',
        messageKey: 'errors.server_unavailable',
      },
    }),
  );
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: API_PROXY_TARGET,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (_error, _req, res) => {
            if (res && 'writeHead' in res) {
              writeProxyError(res as ServerResponse);
            }
          });
        },
      },
    },
  },
});
