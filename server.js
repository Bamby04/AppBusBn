const express = require('express'); // Framework de Node.js para crear APIs
const cors = require('cors');       // Permite peticiones desde otros orígenes
require('dotenv').config();         // Carga variables de entorno desde .env

// Inicializa la app de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer JSON en las peticiones

// Importa las rutas
const rutasRoutes = require('./routes/rutasRoutes'); // Rutas para /api/rutas
const authRoutes = require('./routes/authRoutes');   // Rutas para /api/auth

// Usa las rutas con sus prefijos
app.use('/api/rutas', rutasRoutes);
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 3001;

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servicios corriendo en el puerto ${PORT}`);
});
