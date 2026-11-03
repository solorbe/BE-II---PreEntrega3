
import mongoose from 'mongoose';

export async function connectDB(mongoUrl) {
  if (!mongoUrl) {
    throw new Error('MONGO_URL no esta definida. Es obligatoria');
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('Conexion a mongoDB establecida');
  } catch (error) {
    console.error('No se pudo conectar a MongoDB', error.message);
    throw error;
  }
}
