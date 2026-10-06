import process from 'node:process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const codespaceName = process.env.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: codespaceName
    ? { 'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName) }
    : {},
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
})
