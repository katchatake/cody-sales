# Cody Sales

## Descripción general

**Cody Sales** es un sistema web para el control de ventas y metas mensuales por promotor. El proyecto permite autenticar usuarios por rol, registrar ventas por producto, asignar metas mensuales y consultar el avance individual o consolidado del equipo comercial.

La solución está dividida en:

- **Frontend** con **Nuxt 3/4 + Vue 3 + Vuetify**
- **Backend** con **Node.js + Express + TypeScript**
- **Base de datos** **MySQL** con **Prisma ORM**

## Objetivo del proyecto

El objetivo principal es centralizar la operación comercial de un equipo de promotores para:

- registrar ventas por usuario y por producto,
- asignar metas mensuales a cada promotor,
- medir el progreso de cumplimiento,
- diferenciar la visibilidad de información según el rol del usuario.

En términos funcionales:

- `ADMIN` y `SUPERVISOR` pueden consultar información global del equipo y asignar metas.
- `PROMOTOR` puede iniciar sesión, registrar sus ventas y consultar su propio progreso.

## Qué incluye el sistema

- Inicio de sesión con JWT.
- Dashboard con vista distinta por rol.
- Registro de ventas por uno o varios productos.
- Consulta de historial de ventas.
- Asignación de metas mensuales por promotor.
- Seguimiento de progreso individual y del equipo.
- Catálogo de productos y categorías.
- Documentación Swagger en el backend.

## Estructura general

```text
.
├── backend
│   ├── prisma
│   └── src/modules
├── frontend
├── docs
├── docker-compose.yml
└── readme.md
```

### Backend

El backend sigue una estructura inspirada en arquitectura hexagonal, separando cada módulo en:

- `domain`: entidades y contratos
- `application`: casos de uso
- `infrastructure`: controladores, rutas y repositorios

Módulos principales:

- `auth`
- `sales`
- `goals`
- `progress`
- `users`
- `products`
- `catalog`

### Frontend

El frontend implementa:

- autenticación con persistencia de sesión,
- rutas protegidas,
- dashboard por rol,
- pantallas para ventas, metas y progreso.

## Instalación rápida, recomendada con Docker

Esta es la forma más simple de levantar todo el proyecto.

### 1. Levantar contenedores

```bash
docker compose up --build
```

### 2. Accesos

- Frontend: `http://localhost:4000`
- API: `http://localhost:4100/api/v1`
- Healthcheck backend: `http://localhost:4100/health`
- Swagger: `http://localhost:4100/api-docs`

### 3. Qué levanta Docker

- MySQL 8
- Backend Express
- Frontend Nuxt

El `docker-compose.yml` ya configura:

- base de datos `cody_sales`,
- ejecución del seed,
- variables del backend y frontend,
- puertos expuestos.

Ve a la Sección de Usuarios existentes para obtener las credenciales de acceso.

## Instalación local para desarrollo paso a paso

Si prefieres ejecutar frontend y backend fuera de contenedores, puedes usar MySQL local o levantar solo MySQL con Docker.

### 1. Levantar MySQL

Opción rápida con Docker:

```bash
docker compose up -d mysql
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Crear variables de entorno del backend

Crea el archivo `backend/.env` con este contenido:

```env
PORT=3001
DATABASE_URL="mysql://cody_sales:cody_sales@localhost:3306/cody_sales"
JWT_SECRET="cody-sales-super-secret-key-1234"
RUN_SEED="true"
```

### 4. Preparar base de datos

Si es la primera vez:

```bash
cd backend
npx prisma generate
npx prisma db push
npm run db:seed
```

También puedes usar:

```bash
cd backend
npm run db:setup
```

Nota: `db:setup` usa `prisma migrate dev`, por lo que conviene usarlo en entorno local de desarrollo.

### 5. Levantar backend

```bash
cd backend
npm run dev
```

### 6. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 7. Configurar variables del frontend

Puedes arrancarlo exportando variables o creando un archivo `.env` dentro de `frontend`.

Contenido sugerido:

```env
NUXT_INTERNAL_API_URL="http://localhost:3001/api/v1"
NUXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

### 8. Levantar frontend

```bash
cd frontend
npm run dev
```

Accesos en local:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- Swagger: `http://localhost:3001/api-docs`

## Usuarios existentes

El seed del proyecto crea estos usuarios por defecto:

| Rol | Email | Contraseña |
| :--- | :--- | :--- |
| ADMIN | `admin@cody.com` | `admin` |
| SUPERVISOR | `super@cody.com` | `super` |
| PROMOTOR | `promotor1@cody.com` | `promotor` |
| PROMOTOR | `promotor2@cody.com` | `promotor` |
| PROMOTOR | `promotor3@cody.com` | `promotor` |
| PROMOTOR | `promotor4@cody.com` | `promotor` |

Además, el seed crea:

- categorías de productos,
- productos de ejemplo,
- metas mensuales para los promotores del mes actual.

## Cómo usar el sistema

### Flujo básico

1. Abre el frontend en el navegador.
2. Inicia sesión con uno de los usuarios sembrados.
3. Según tu rol, verás una vista distinta del dashboard.

### Uso como promotor

- Inicia sesión con un usuario `PROMOTOR`.
- Entra a la sección de ventas.
- Registra una nueva venta seleccionando producto y cantidad.
- Consulta tu progreso mensual en la vista de progreso.
- Revisa tu historial reciente desde el dashboard.

### Uso como administrador o supervisor

- Inicia sesión con un usuario `ADMIN` o `SUPERVISOR`.
- Consulta el dashboard consolidado del equipo.
- Revisa ventas globales y progreso por promotor.
- En la sección de metas, asigna objetivos mensuales.
- Consulta la lista de promotores disponibles.

## Endpoints y documentación útil

- API base: `/api/v1`
- Swagger: `/api-docs`
- Healthcheck: `/health`

Rutas relevantes:

- `POST /api/v1/auth/login`
- `GET /api/v1/sales`
- `GET /api/v1/sales/:id`
- `POST /api/v1/sales`
- `GET /api/v1/goals`
- `POST /api/v1/goals`
- `GET /api/v1/progress`
- `GET /api/v1/progress/:id`
- `GET /api/v1/users/promotors`
- `GET /api/v1/products`

## Notas técnicas

- El backend expone CORS abierto para desarrollo.
- La autenticación usa JWT enviado en el header `Authorization`.
- Prisma gestiona el acceso a MySQL y el seed inicial.
- El proyecto incluye artefactos compilados en `backend/dist`.

## Documentación adicional

Puedes revisar los archivos dentro de `docs/` para más contexto:

- `docs/ARRANQUE.md`
- `docs/ARQUITECTURA.md`
- `docs/DESIGN_SYSTEM.md`
