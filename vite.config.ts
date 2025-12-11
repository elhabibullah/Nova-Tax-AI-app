
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': __dirname,
      },
    },
    define: {
      // INJECTED USER KEY DIRECTLY
      'process.env.API_KEY': JSON.stringify("AIzaSyA_xBY3dlRY6pKNG9ktHoR47pVKJ_fP-5Y"),
    },
    build: {
      outDir: 'dist',
    },
  };
});
