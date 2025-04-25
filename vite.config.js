import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  
  server: {
    allowedHosts:['https://cc210c30bc08.sn.mynetname.net'],

  },
  
})
