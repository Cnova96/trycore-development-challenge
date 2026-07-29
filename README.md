# Trycore Development Challenge — EVM

Implementación full stack de la prueba técnica para Ingeniero de Desarrollo. El repositorio incluye backend (NestJS), frontend (Angular), configuración de base de datos con Prisma y documentación OpenAPI.

## Estructura del repositorio

```
trycore-development-challenge/
├── evm-calculation-service/   # Backend NestJS + Prisma + PostgreSQL
└── evm-dashboard/             # Frontend Angular (dashboard EVM)
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior
- [npm](https://www.npmjs.com/) 10 o superior
- [PostgreSQL](https://www.postgresql.org/) 14 o superior

## Configuración local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Cnova96/trycore-development-challenge.git
cd trycore-development-challenge
```

### 2. Base de datos (PostgreSQL + Prisma)

Crea la base de datos en PostgreSQL:

```sql
CREATE DATABASE evm_db;
```

Configura las variables de entorno del backend:

```bash
cd evm-calculation-service
cp .env.example .env
```

Edita `.env` y ajusta `DATABASE_URL` según tu entorno. Ejemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/evm_db?schema=public"
PORT=3000
```

Instala dependencias e inicializa la base de datos con Prisma:

```bash
npm install
npm run db:init
```

#### Script de inicialización de la base de datos

El script `db:init` ejecuta, en orden:

1. **`prisma migrate deploy`** — aplica las migraciones existentes en `prisma/migrations/`.
2. **`prisma db seed`** — carga datos de ejemplo (proyecto y actividades) definidos en `prisma/seed.ts`.

Comandos disponibles por separado:

| Comando               | Descripción                                  |
| --------------------- | -------------------------------------------- |
| `npm run db:init`     | Migraciones + seed (inicialización completa) |
| `npm run db:migrate`  | Solo aplicar migraciones                     |
| `npm run db:seed`     | Solo cargar datos de ejemplo                 |
| `npm run db:generate` | Regenerar el cliente Prisma                  |

Para desarrollo, si modificas el schema, puedes crear una nueva migración con:

```bash
npx prisma migrate dev --name nombre_de_la_migracion
```

### 3. Backend (NestJS)

Desde `evm-calculation-service/`:

```bash
npm run start:dev
```

El API queda disponible en:

- API: [http://localhost:3000/api](http://localhost:3000/api)
- Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 4. Frontend (Angular)

En otra terminal, desde la raíz del repositorio:

```bash
cd evm-dashboard
npm install
npm start
```

Abre [http://localhost:4200](http://localhost:4200).

El proxy de desarrollo redirige las peticiones `/api` al backend en el puerto 3000.

## Endpoints principales

| Método | Ruta                             | Descripción                |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/api/projects`                  | Listar proyectos           |
| GET    | `/api/projects/:id/evm-analysis` | Análisis EVM del proyecto  |
| GET    | `/api/projects/:id/activities`   | Actividades de un proyecto |
| POST   | `/api/activities`                | Crear actividad            |
| PATCH  | `/api/activities/:id`            | Actualizar actividad       |
| POST   | `/api/evm/calculate`             | Calcular indicadores EVM   |

Consulta la documentación completa en Swagger.

## Tests

```bash
# Backend
cd evm-calculation-service
npm test           # 17 unitarias
npm run test:cov   # con cobertura
npm run test:e2e   # 13 integración

# Frontend
cd evm-dashboard
npm test
```

## Stack tecnológico

| Capa              | Tecnología             |
| ----------------- | ---------------------- |
| Backend           | NestJS, TypeScript     |
| Base de datos     | PostgreSQL, Prisma ORM |
| Frontend          | Angular 19, Chart.js   |
| Documentación API | OpenAPI / Swagger      |

## Notas

- Este proyecto debe entregarse vía **GitHub o GitLab** para conservar el historial de commits. No se aceptan archivos comprimidos.
- El archivo `.env` no se versiona. Usa `.env.example` como plantilla.
