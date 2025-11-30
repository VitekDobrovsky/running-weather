import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  if (!env.VITE_METEOSOURCE_API_KEY) {
    console.warn('⚠️  WARNING: VITE_METEOSOURCE_API_KEY is not set in your environment variables. The app may not function correctly.');
  }

  return {
    plugins: [react()],
  }
})
