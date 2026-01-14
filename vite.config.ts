import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/online-invitation/",
  server: {
    host: true,
    port: 5173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/*.png"],
      manifest: {
        name: "Mis 15 Años - Mariana Isabel",
        short_name: "Mis 15",
        description: "Invitación digital a los quince años de Mariana Isabel",
        theme_color: "#7F16C9",
        background_color: "#EADCF8",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/online-invitation/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/online-invitation/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
})
