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
npm install express dotenv mongoose bcrypt
completar .env.example .env  
npm run start:dev 
```

## Variables de entorno

Se definen en .env

En .env.example se encuentran disponibles los nombres de las variables que resultan necesarias para el funcionamiento de esta aplicación.

## Flujo de una petición en Preentrega I

```bash
Cliente -> Routers -> Controllers -> Services -> Repositories -> DAO -> Model
```

Routes: definen endpoints.
Controllers: reciben request y devuelven response.
Models: esquema del recurso.
Services: manejan lógica de negocio.
Repositories: organizan operaciones de datos.
DAOs: interactúan con la persistencia.
<!-- DTOs: definen qué información se expone. -->
Middlewares: procesan validaciones intermedias.

## Endpoint definidos en Preentrega I, II y III para usar en Postmam

Con el servidor corriendo (por defecto en `http://localhost:3000`, salvo que haya cambiado `PORT` en `.env`):

### 1. Health Check

- **Método:** `GET`
- **Ruta:** `/api/health`
- **Descripción:** Verifica el estado operativo del servidor.
- **Body:** No requiere.
- **Respuestas:**
  - `200 OK`:

    ```json
    {"status": "ok", "message": "Servidor activo"} 
    ```

### 2. Obtener Eventos

- **Método:** `GET`
- **Ruta:** `api/events`
- **Descripción:** Devuelve los eventos disponibles.
- **Body:** No requiere.
- **Respuestas:**
  - `200 OK`:

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
        por cada evento disponible.

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
  - `201 Created`:

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
  - `201 Created`:

    ```json
    {"status": "success", "payload": {"id": "6ae7457d764cdb3a1aefe21f", "first_name": "Sol", "last_name": "Orbe","email": "`sol@mail.com`","role": "user"}} 
    ```

  -`400 Bad Request`:

    ```json
    {
      "status": "error",
      "message": "Faltan campos obligatorios"
    }
    ```

  -`409 Conflict`:

    ```json
    {
      "status": "error",
      "message": "El correo electrónico ya está registrado"
    }
    ```

  -`500 Internal Server Error`:

    ```json
    {
      "status": "error",
      "message": "Error interno del servidor"
    }
    ```

## Ejemplos de casos de prueba en

  Casos a probar antes de entregar.pdf

## Estructura actual

```bash
BE II - PreEntrega2/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers/
│   │   ├── events.controller.js
│   │   ├── health.controller.js
│   │   └── sessions.controller.js
│   ├── dao/
│   │   ├── events.dao.js
│   │   └── users.dao.js
│   ├── middlewares/
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
│   │   ├── tickets.routes.js
│   │   └── users.routes.js
│   ├── services/
│   │   ├── events.services.js
│   │   └── sessions.services.js
│   ├── utils/
│   │   └── hash.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── Casos a probar antes de entregar.pdf
├── package-lock.json
├── package.json
└── README.md
```
