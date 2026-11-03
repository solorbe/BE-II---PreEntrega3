import { UsersRepository } from "../repositories/sessions.repository.js";
import { createHash } from "../utils/hash.js";

const createServiceError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export class SessionsService {
  static register = async (userData) => {
    const { first_name, last_name, email, password } = userData;
    //Validar que los campos sean strings no vacios
    if (
      typeof first_name !== "string" ||
      !first_name.trim() ||
      typeof last_name !== "string" ||
      !last_name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password.trim()
    ) {
      throw createServiceError(
        "Faltan campos obligatorios o son invalidos",
        400,
      );
    }

    //normalizar en email recibido
    const normalizedEmail = email.trim().toLowerCase();

    //Verificar formato basico
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw createServiceError("Formato de email invalido", 400);
    }

    //Verificar la longitud minima de la contraseña
    if (password.length < 8) {
      throw createServiceError(
        "La contraseña debe tener al menos 8 caracteres",
        400,
      );
    }

    //Buscar si ya existe un usuario con ese email
    const existingUser = await UsersRepository.findeByEmail(normalizedEmail);
    if (existingUser) {
      throw createServiceError("El email ya esta registrado", 409);
    }
    
    //Transformar la contraseña antes de almacenarla
    const hashedPassword = await createHash(password);
    
    //Construir el usuario con los datos permitidos
    const newUser = await UsersRepository.create({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    //Devolvemos unicamente informacion publica. No incluir contraseña ni hash.
    return {
      id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role,
    };
  };
}