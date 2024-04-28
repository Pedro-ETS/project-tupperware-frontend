import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración de resolución y punto de entrada
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Define un alias para el directorio src
    },
    // Especifica el punto de entrada de tu aplicación
    // Aquí, estamos usando el alias que definimos para importar desde src/index.jsx
    // Si tu archivo index.jsx está en otro lugar, ajusta la ruta en consecuencia
    entry: '@/index.jsx',
  },
})
