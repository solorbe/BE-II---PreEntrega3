import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../src/app.js'; // Tu app de Express

describe('POST api/sessions/register', () => {
  
  // Test 1: Caso feliz
  it('debería registrar un usuario y devolver 201 con los datos sin password', async () => {
    const newUser = {
      first_name: 'Sol',
      last_name: 'Pérez',
      email: 'sol@example.com',
      password: 'Password123!'
    };

    const response = await request(app)
      .post('/api/sessions/register')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.payload).toHaveProperty('id');
    expect(response.body.payload.email).toBe(newUser.email);
    expect(response.body.payload).not.toHaveProperty('password'); // Nunca devolver el hash
  });

  // Test 2: Email duplicado
  it('debería devolver 409 si el email ya está registrado', async () => {
    const userData = { 
      first_name: 'Sol', 
      last_name: 'Pérez', 
      email: 'duplicado@example.com',  
      password: 'Password123!' 
    };

    await request(app).post('/api/sessions/register').send(userData);
    const response = await request(app).post('/api/sessions/register').send(userData);
    expect(response.status).toBe(409);
    expect(response.body.message).toMatch(/El email ya esta registrado/i);
  });

  // Test 3: Faltan campos obligatorios
  it('debería devolver 400 si faltan campos obligatorios', async () => {
    const response = await request(app)
      .post('/api/sessions/register')
      .send({ email: 'incompleto@example.com', password: '123' });

    expect(response.status).toBe(400);
  });
});
