import app from './app.js';
import { config } from './config/config.js';
import { connectDB } from './config/database.js';

await connectDB(config.mongoUrl);

app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});