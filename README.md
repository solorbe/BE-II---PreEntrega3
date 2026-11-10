# PreEntrega 3 - Backend II

<!-- ;
endpoints principales;
ejemplos de uso;
 -->

## Descripción del proyecto

Es una API backend para una plataforma de eventos, inscripciones y reservas de tickets.

Se elige esta temática para realizar las entregas solicitadas en el curso de Backend II.

## Entidades principales

- User
- Event
- Session
- Ticket (reservas de cada event)

## Roles del proyecto a trabajar en las próximas entregas

**Admin**: con permisos generales sobre el sistema.
Podrá gestionar usuarios, categorías, eventos e inscripciones.
**Organizer**: crea y administra eventos.
**User**: consulta eventos o reserva tickets.

## Requisitos técnicos

- Node.js
- git
- una cuenta de **MongoDB Atlas**

## Instrucciones de instalación

```bash
git clone
npm install express dotenv mongoose bcrypt jsonwebtoken cookie-parser
npm install -D vitest supertest mongodb-memory-server 
completar .env.example .env  
npm run start:dev 
```

## Variables de entorno

Se definen en .env

En .env.example se encuentran disponibles los nombres de las variables que resultan necesarias para el funcionamiento de esta aplicación.

## Flujo de una petición

```bash
Cliente -> Routers -> Controllers -> Services -> Repositories -> DAO -> Model
```

- Routes: definen endpoints.
- Controllers: reciben request y devuelven response.
- Models: esquema del recurso.
- Services: manejan lógica de negocio.
- Repositories: organizan operaciones de datos.
- DAOs: interactúan con la persistencia.
<!-- DTOs: definen qué información se expone. -->
- Middlewares: procesan validaciones intermedias.

## Endpoint definidos en Preentrega I, II y III para usar en Postmam

Con el servidor corriendo (por defecto en `http://localhost:3000`, salvo que haya cambiado `PORT` en `.env`):

### 1. Health Check

- **Método:** `GET`
- **Ruta:** `/api/health`
- **Descripción:** Verifica el estado operativo del servidor.
- **Body:** No requiere.
- **Respuestas:**
  - `200 OK`

    ```json
    {"status": "ok", "message": "Servidor activo"} 
    ```

### 2. Obtener Eventos

- **Método:** `GET`
- **Ruta:** `api/events`
- **Descripción:** Devuelve los eventos disponibles.
- **Body:** No requiere.
- **Respuestas:**
  - `200 OK`

    ```json
    "status": "success",
    "payload": 
        {
            "_id": "6ae593ad70a86c1a0fffca1c",
            "title": "Andres Calamaro",
            "description": "recital de Andres Calamaro",
            "date": "2026-10-30T00:00:00.000Z",
            "location": "Rosario",
            "capacity": 90,
            "qvendidas": 1,
            "status": "draft",
            "createdAt": "2026-10-31T07:07:25.284Z",
            "updatedAt": "2026-10-31T07:07:25.284Z",
            "__v": 0
        }
    ```

### 3. Crear Evento

- **Método:** `POST`
- **Ruta:** `api/events`
- **Descripción:** Crea un nuevo evento.
- **Body:**
  
  ```json
  {
    "title": "Readme",
    "description": "Descripcion para README",
    "date": "2026-11-15",
    "location": "Rosario",
    "capacity": 1000,
    "status": "draft"
  }
  ```

- **Respuestas:**
  - `201 Created`

    ```json
    {
    "status": "success",
    "payload": {
        "title": "Readme",
        "description": "Descripcion para README",
        "date": "2026-11-15T00:00:00.000Z",
        "location": "Rosario",
        "capacity": 1000,
        "qvendidas": 0,
        "status": "draft",
        "_id": "6aea5d26235753719af51b1d",
        "createdAt": "2026-11-03T22:16:06.067Z",
        "updatedAt": "2026-11-03T22:16:06.067Z",
        "__v": 0
    }
    }
    ```

### 4. Registro de usuario

- **Método:** `POST`
- **Ruta:** `/api/sessions/register`
- **Body:**

  ```json
  {
    "first_name": "Sol",
    "last_name": "Orbe",
    "email": "sol@mail.com",
    "password": "password123"
  }
  ```

- **Respuestas:**
  - `201 Created`

    ```json
    {
      "status": "success", 
      "payload": {
        "id": "6ae7457d764cdb3a1aefe21f", 
        "first_name": "Sol", 
        "last_name": "Orbe",
        "email": "`sol@mail.com`",
        "role": "user"}
    } 
    ```

  - `400 Bad Request`

    ```json
    {
      "status": "error",
      "message": "Faltan campos obligatorios"
    }
    ```

  - `409 Conflict`

    ```json
    {
      "status": "error",
      "message": "El correo electrónico ya está registrado"
    }
    ```

  - `500 Internal Server Error`

    ```json
    {
      "status": "error",
      "message": "Error interno del servidor"
    }
    ```

### 5. Login de usuario

- **Método:** `POST`
- **Ruta:** `/api/sessions-stateless/login`
- **Body:**

  ```json
  {
    "email": "nieves@mail.com",
    "password": "password123"
  }
  ```

- **Respuestas:**
  - `200 OK`

  ```json
  {
    "status": "success",
    "message": "Login Correcto"
  }
  ```

  - `401 Unauthorized`

    ```json
    {
    "status": "error",
    "message": "Email y contraseña son obligatorios"
    }
    ```

    ```json
    {
    "status": "error",
    "message": "Credenciales invalidas"
    }
    ```

### 6. Consultar usuario autenticado  

- **Método:** `GET`
- **Ruta:** `/api/sessions-stateless/current`
- **Body:**

  ```json
  {
    "email": "nieves@mail.com",
    "password": "password123"
  }
  ```

- **Respuestas:**
  - `200 OK`
  
   ```json
    {
    "status": "success",
    "payload": {
        "id": "6af2266f028781a0c5cbfaae",
        "email": "nieves@mail.com",
        "role": "user"
      }
    }
    ```

  - `401 Unauthorized`

    ```json
    {
    "status": "error",
    "message": "Unauthorized"
    }
    ```

    ```json
    {
      "status": "error",
      "message": "Faltan campos obligatorios"
    }
    ```

### Logout usuario autenticado  

- **Método:** `POST`
- **Ruta:** `/api/sessions-stateless/logout`
- **Body:**
    vacío

- **Respuestas:**
  - `200 OK`
  
   ```json
    {
    "status": "success",
    "message": "Sesión cerrada correctamente"
    }
    ```

## Ejemplos de casos de prueba en

  Casos a probar antes de entregar III.pdf

## Instrucciones para ejecutar los tests

```bash
npm run test
```

```bash
Los tests son aislados: usan una base de datos en memoria que se destruye después de cada test.
Respuesta:
  tests/users.test.js (3 tests) 2144ms
   ✓ POST api/sessions/register (3)
   ✓ debería registrar un usuario y devolver 201 con los datos sin password 173ms
   ✓ debería devolver 409 si el email ya está registrado 72ms
   ✓ debería devolver 400 si faltan campos obligatorios 6ms
  Test Files  1 passed (1)
      Tests  3 passed (3)
    Start at  08:36:28
```

## Estructura actual

```bash
BE II - PreEntrega3/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── events.controller.js
│   │   ├── health.controller.js
│   │   └── sessions.controller.js
│   │   └── sessions-stateless.controller.js
│   ├── dao/
│   │   ├── events.dao.js
│   │   └── users.dao.js
│   ├── middlewares/
│   │   ├──auth.middlewares.js
│   ├── models/
│   │   ├── events.model.js
│   │   ├── sessions.model.js
│   │   └── users.model.js
│   ├── repositories/
│   │   ├── events.repository.js
│   │   └── sessions.repository.js
│   ├── routes/
│   │   ├── events.routes.js
│   │   ├── health.routes.js
│   │   ├── sessions.routes.js
│   │   ├── sessions-stateless.routes.js
│   │   ├── tickets.routes.js
│   ├── services/
│   │   ├── events.services.js
│   │   └── sessions.services.js
│   ├── utils/
│   │   └── hash.js
│   │   └── jwt.js
│   ├── app.js
│   └── server.js
├── tests/
│   ├── setup.js
│   └── users.test.js
├── vite.config.js
├── .env.example
├── .gitignore
├── Casos a probar antes de entregar III.pdf
├── package-lock.json
├── package.json
└── README.md
```
