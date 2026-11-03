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

## Endpoint definidos en Preentrega I para usar en Postmam

Con el servidor corriendo (por defecto en `http://localhost:3000`, salvo que haya cambiado `PORT` en `.env`):

| Método | URL | Respuesta esperada |
|---|---|---|
| GET | `http://localhost:3000/api/health` | {"status": "ok", "message": "Servidor activo"} |
| GET | `http://localhost:3000/api/sessions` | [] |
| GET | `http://localhost:3000/api/events` | [] |
| POST | `http://localhost:3000/api/events` | {"status": "success", "payload": {"title": "Readme", "description": "Descripcion para README", "date": "2026-11-15T00:00:00.000Z","location": "Rosario", "capacity": 1000, "qvendidas": 0, "status": "draft", "_id": "6ae8ee0ae9e2b1118fe3f80a", "createdAt": "2026-11-02T20:09:46.474Z", "updatedAt": "2026-11-02T20:09:46.474Z", "__v": 0}} |
| POST | `http://localhost:3000/api/sessions/register` | {"status": "succes", "payload": {"id": "6ae7457d764cdb3a1aefe21f", "first_name": "Sol", "last_name": "Orbe","email": "`sol@mail.com`","role": "user"}} |

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
