import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ngss-alignment_K-2/',   // must match your repo name exactly
})
