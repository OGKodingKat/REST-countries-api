import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
 server: {
   proxy: {
     '/api': {
       target:'https://rest-countries-api-5q0p.onrender.com',
       changeOrigin: true,
       secure: false,
       rewrite: (path) => path.replace(/^\/api/, '')
     }
   }
 },
 plugins: [react()],
})
