import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Build time, baked into the bundle. The footer shows it as "Last updated <month year>".
    __LAST_UPDATED__: JSON.stringify(new Date().toISOString()),
  },
})
