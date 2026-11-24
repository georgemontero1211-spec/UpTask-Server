# UpTask – Servidor

API REST de **UpTask**, una aplicación para gestionar proyectos y tareas en equipo. Está construida con Node.js, Express, TypeScript y MongoDB. Cubre autenticación con JWT y confirmación de cuenta por email, proyectos con un manager y un equipo de colaboradores, tareas con estados y notas en cada tarea.

El frontend está en [UpTask-Frontend](https://github.com/georgemontero1211-spec/UpTask-Frontend).

## Funcionalidades

- **Autenticación**: registro, confirmación de cuenta con un código enviado por email, login con JWT, reenvío del código y recuperación de contraseña.
- **Perfil**: actualizar los datos del usuario y cambiar la contraseña.
- **Proyectos**: CRUD de proyectos. Cada proyecto tiene un *manager* (su creador) y un equipo.
- **Equipo**: buscar usuarios por email, agregarlos al proyecto y quitarlos.
- **Tareas**: CRUD de tareas dentro de un proyecto, con estos estados:
  `pending` · `onHold` · `inProgress` · `underReview` · `completed`.
  Guarda quién hizo cada cambio de estado.
- **Notas**: agregar, listar y eliminar notas en cada tarea.

## Endpoints

| Recurso | Rutas |
| ------- | ----- |
| Auth | `POST /api/auth/create-account`, `/confirm-account`, `/login`, `/request-code`, `/forgot-password`, `/validate-token`, `/update-password/:token`, `/update-password`, `/check-password` · `GET /api/auth/user` · `PUT /api/auth/profile` |
| Proyectos | `GET/POST /api/projects` · `GET/PUT/DELETE /api/projects/:id` |
| Equipo | `POST /api/projects/:projectId/team/find` · `GET/POST /api/projects/:projectId/team` · `DELETE /api/projects/:projectId/team/:userId` |
| Tareas | `GET/POST /api/projects/:projectId/tasks` · `GET/PUT/DELETE /api/projects/:projectId/tasks/:taskId` · `POST /api/projects/:projectId/tasks/:taskId/status` |
| Notas | `GET/POST /api/projects/:projectId/tasks/:taskId/notes` · `DELETE /api/projects/:projectId/tasks/:taskId/notes/:noteId` |

## Tecnologías

- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JSON Web Tokens y bcrypt
- express-validator
- Nodemailer + Mailtrap para los emails de confirmación y recuperación
- Morgan y CORS

## Estructura

```
src/
├── config/        # Base de datos, CORS y Nodemailer
├── controllers/   # Auth, Project, Task, Team, Note
├── emails/        # Plantillas de emails de autenticación
├── middleware/    # Autenticación, validación y carga de proyecto/tarea
├── models/        # User, Project, Task, Note, Token
├── routes/        # Rutas de cada recurso
├── utils/         # JWT, hashing y generación de tokens
├── server.ts
└── index.ts
```

## Configuración

Crea un archivo `.env` en la raíz:

```env
DATABASE_URL=mongodb://localhost:27017/uptask
FRONTEND_URL=http://localhost:5173
JWT_SECRET=una_clave_larga_y_aleatoria
TOKEN_NODEMAILER=token_de_mailtrap
PORT=4000
```

## Cómo ejecutarlo

```bash
npm install
npm run dev
```
