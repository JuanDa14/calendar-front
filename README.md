# CalendarApp

Aplicación web para crear y gestionar eventos en un calendario colaborativo. Permite crear equipos con miembros para coordinar actividades compartidas.

**Backend:** [calendar-back](https://github.com/JuanDa14/calendar-back)

## Tech Stack

- **Frontend:** React 18, Vite 6, TailwindCSS, shadcn/ui, Framer Motion, Redux Toolkit
- **Backend:** Node.js, Express, MongoDB, Mongoose

## Requisitos

- Node.js 18+
- MongoDB (local o Atlas)
- Backend corriendo en `http://localhost:4000`

## Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/JuanDa14/calendar-front
cd calendar-front

# Instalar dependencias
npm install

# Configurar variables de entorno
# Copia .env.example a .env.local (no se sube al repo):
# VITE_API_URL=http://localhost:4000/api

# Iniciar en desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build local |

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL base de la API | `http://localhost:4000/api` |

## Checklist de verificación

- [ ] Login y registro funcionan
- [ ] Verificación de email
- [ ] Recuperación de contraseña
- [ ] Crear, editar y eliminar eventos
- [ ] Crear equipo y agregar miembros
- [ ] Modo claro/oscuro
- [ ] Layout responsive en mobile

## Producción

```bash
npm run build
npm run preview
```

## Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://juancode.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/juan-david-morales-paredes-617342224/)
