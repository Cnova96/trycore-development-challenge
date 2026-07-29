# EVM Dashboard (Angular)

Dashboard para gestión de actividades y análisis EVM en tiempo real.

## Requisitos

- Backend NestJS corriendo en `http://localhost:3000`
- PostgreSQL configurado en `evm-calculation-service/.env`

## Ejecución

```bash
# Backend
cd ../evm-calculation-service
npm run start:dev

# Frontend (otra terminal)
cd evm-dashboard
npm start
```

Abrir `http://localhost:4200`.

El proxy de desarrollo redirige `/api` al backend.

## Estructura

- `src/app/core`: modelos, servicios HTTP y utilidades puras (`evm-calculator`)
- `src/app/features/dashboard`: componentes del dashboard y fachada de estado
- Componentes pequeños y testeables: KPIs, CPI/SPI, tabla editable, gráfica PV/EV/AC

## Tests

```bash
npm test
```
