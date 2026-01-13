# 🎉 Invitación Digital – Mis 15 Años (Mariana Isabel)

Invitación digital interactiva para evento de quince años, con confirmación de asistencia, control de cupos, panel administrador y envío de invitaciones por WhatsApp.

Proyecto desarrollado con **React + Vite + TypeScript + SASS** y **Firebase**.

---

## ✨ Funcionalidades

### Invitación pública
- Tarjeta digital elegante (tema morado)
- Acceso por enlace personalizado (token)
- Nombre del invitado y cupos precargados
- Confirmación de asistencia:
  - Confirmar asistencia
  - Seleccionar cantidad de cupos a utilizar
  - Rechazar invitación
- Confirmación única (no editable)
- Música ambiental con control
- Botón de ubicación Google Maps
- Animaciones suaves
- Progressive Web App (PWA)

### Panel administrador
- Login con Firebase Authentication
- Ruta protegida
- Dashboard con métricas:
  - Invitados
  - Confirmados / pendientes / no asisten
  - Personas confirmadas reales
  - Cupos disponibles
- Tabla de invitados
- Envío de invitaciones por WhatsApp (link automático)
- Logout seguro

---

## 🧱 Stack tecnológico

- React 18
- Vite
- TypeScript
- SASS
- Firebase Firestore
- Firebase Authentication
- Firebase Hosting
- Framer Motion
- PWA (vite-plugin-pwa)

---

## 📁 Estructura del proyecto

```txt
src/
├── app/              # Firebase config, auth, firestore
├── admin/            # Dashboard admin
├── components/       # Componentes compartidos
├── pages/            # Páginas públicas
├── models/           # Modelos TypeScript
├── router/           # Rutas y guards
├── styles/           # SASS
└── assets/           # Música, íconos

