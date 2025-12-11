
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
      // INJECTED USER KEYS DIRECTLY
      'process.env.API_KEY': JSON.stringify("AIzaSyA_xBY3dlRY6pKNG9ktHoR47pVKJ_fP-5Y"),
      'process.env.STRIPE_KEY': JSON.stringify("pk_live_51Scm2cBCXsokFfTm0aniHE9BYcpaPFSNYkyzaPLiFPmM03QhX0k8fy3NdTxFAK0WKsDbRYpWb9gHZ48UIljMp7CW00USsOj8Ey"),
      // SUPABASE KEYS
      'process.env.SUPABASE_URL': JSON.stringify("https://pfifofsdjlkzaftmtmdy.supabase.co"),
      'process.env.SUPABASE_KEY': JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmaWZvZnNkamxremFmdG10bWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NDcyNzQsImV4cCI6MjA4MTAyMzI3NH0.D-BBk1A4UmJibVQ41jD_yWklmp1zjjP6X7EmBCq-SIw"),
    },
    build: {
      outDir: 'dist',
    },
  };
});
