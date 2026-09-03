# Proyecto Backend - Sistema de Gestión Escolar / Institucional

Este repositorio contiene la arquitectura backend diseñada bajo los principios de **Arquitectura Hexagonal (Puertos y Adaptadores)** y **Clean Architecture**. La solución implementa un sistema robusto de gestión educativa (estudiantes, matrícula, asistencia, cursos, profesores, asignaturas, reportes diarios y notificaciones push/email).

---

## Arquitectura Hexagonal (Ports & Adapters)

El objetivo principal de esta estructura es **desacoplar la lógica de negocio core** de los detalles de infraestructura (servidores HTTP, ORM/Bases de datos, servicios externos como Firebase, Google AI o Mailers).

```
src/
├── core/                        # CAPA DOMINIO Y LÓGICA DE NEGOCIO (CORE)
│   ├── services/                # Servicios de Dominio / Casos de Uso
│   ├── interfaces/              # Puertos (Input/Output, DTOs, Adapters)
│   │   ├── service/             # Contratos de Servicios
│   │   ├── adapters/            # Interfaces para adaptadores externos (Mailer, Push, Date)
│   │   ├── dtos/                # Data Transfer Objects
│   │   ├── input/               # Contratos de entrada
│   │   └── output/              # Contratos de salida
│   ├── errors/                  # Manejo de errores de dominio (DB, Mailer, etc.)
│   └── config/                  # Configuración base / Credenciales del Core (Firebase config)
│
├── infrastructure/              # CAPA DE INFRAESTRUCTURA (ADAPTADORES EXTERNOS)
│   ├── rest/                    # Servidor Web & HTTP Entrypoints
│   │   ├── app.ts               # Inicialización del servidor Express / Fastify / App
│   │   ├── controllers/         # Adaptadores Primarios / Driving (HTTP Requests)
│   │   └── middlewares/         # Middlewares de Express (Auth, Errores, Validación)
│   ├── database/                # Adaptadores Secundarios / Driven (Persistencia)
│   │   ├── models/              # Modelos ORM / ODM (Mongoose / Sequelize)
│   │   └── seeders/             # Población inicial de datos
│   ├── schemas/                 # Esquemas de validación (Zod / Joi)
│   └── adapters/                # Integraciones externas concretas
│       ├── email/               # Servicio de Envío de Correos (Templates React Email / Nodemailer)
│       ├── firebase-push-notification.ts  # Servicio de Notificaciones Push
│       ├── google-ai.ts         # Integración con Google Gemini AI
│       ├── socket.ts            # Comunicación WebSocket / Tiempo Real
│       └── date-formats.ts      # Manejo y formateo de fechas
│
├── routes/                      # Definición de rutas y endpoints de la API
└── utils/                       # Utilidades generales (Encriptación, Hashes, Regex, Validadores)
```

### Capa de Dominio (`/src/core`)

- **Lógica Independiente:** No conoce la existencia de Express, Mongoose ni de ningún proveedor de Email/Push.
- **Services (`core/services`):** Implementan las reglas de negocio puras (e.g., `enrollment-service.ts`, `student-service.ts`, `auth-teacher-service.ts`).
- **Puertos e Interfaces (`core/interfaces`):** Define los contratos estrictos mediante TypeScript para asegurar el desacoplamiento:
  - `service/`: Define qué funciones debe ofrecer la capa de negocio.
  - `adapters/`: Interfaces para dependencias externas como `mailer-adapter.ts`, `push-notification-adapter.ts`, `date-formatter-adapter.ts`.

### Capa de Infraestructura (`/src/infrastructure`)

- **Adaptadores de Entrada (Driving):** `controllers/` y `routes/` transforman las peticiones HTTP externas en invocaciones hacia los `services` del core.
- **Adaptadores de Salida (Driven):** Implementaciones concretas de infraestructura:
  - **Persistencia:** `database/models/` para acceso a base de datos.
  - **Notificaciones:** `firebase-push-notification.ts` para notificaciones móviles.
  - **Emails:** `email/` con plantillas visuales renderizadas (`welcome-teacher.tsx`).
  - **Inteligencia Artificial:** `google-ai.ts` para integración con LLMs / Google AI SDK.
  - **Comunicación en vivo:** `socket.ts` para eventos WebSockets.

---

## Puntos Clave & Destacados del Proyecto

### 1. Validación Estricta de Esquemas y DTOs

Cada entidad cuenta con su correspondiente **esquema de validación** (`/infrastructure/schemas`) y sus **interfaces DTO** (`/core/interfaces/dtos`). Esto asegura que los datos entrantes sean sanitizados y validados sintáctica y semánticamente antes de llegar a la capa core.

### 2. Sistema de Notificaciones Multicanal

El proyecto soporta interacción directa con los usuarios mediante:

- **Firebase Cloud Messaging (FCM):** Envío de notificaciones push a dispositivos móviles.
- **Email Marketing / Transaccional:** Plantillas React-Email personalizadas para correos de bienvenida y avisos institucionales.
- **WebSockets (`socket.ts`):** Canal de comunicación bidireccional en tiempo real para eventos de asistencia o notificaciones inmediatas.

### 3. Integración de Inteligencia Artificial (`google-ai.ts`)

Conexión directa con la API de Google AI / Gemini para tareas automatizadas como generación o resumen de reportes diarios (`daily-reports`), retroalimentación educativa o evaluación de observaciones de estudiantes.

### 4. Dominio Educativo Completo

Soporte integral para flujos complejos de centros educativos:

- **Asistencia:** Registro puntual de estudiantes y reportes de asistencia (`student-assistence`, `assistance-controller`).
- **Matrícula y Cobros:** Historial de cambios, pagos e inscripciones (`enrollment`, `enrollment-payments`, `matricule`).
- **Reportes Diarios y Cierres:** Control operativo de jornada académica (`daily-reports`, `daily-closures`).
- **Asignaturas y Horarios:** Gestión curricular (`schedule`, `asignature`, `course`, `period`).

### 5. Preparado para Producción con Docker

- **`Dockerfile` & `docker-compose.yml`:** Configuración simplificada para despliegues portables y entornos de desarrollo/producción aislados.
- **Control de Calidad:** ESLint (`eslint.config.js`) y TypeScript (`tsconfig.json`) configurados para mantener la cohesión del código.

---

## Tecnologías Empleadas

- **Lenguaje:** TypeScript / Node.js
- **Patrón Arquitectónico:** Hexagonal Architecture (Ports & Adapters)
- **Contenedores:** Docker & Docker Compose
- **Validación & DTOs:** Zod / Type-checkers
- **Servicios Integrados:** Firebase Admin SDK, Google AI (Gemini), Socket.io, Mailer (Nodemailer/React Email)

---

## Comandos de Inicio Rápidos

```bash
# Instalar dependencias
bun install

# Levantar entorno con Docker Compose
docker-compose up -d

# Ejecutar en modo desarrollo
bun run dev

# Compilar para producción
bun run build
```
