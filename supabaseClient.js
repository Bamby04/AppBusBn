const { createClient } = require('@supabase/supabase-js'); // Importa la librería de cliente de Supabase para interactuar con la base de datos
// La librería supabase-js permite interactuar con la base de datos de Supabase desde el backend de Node.js
require('dotenv').config();
// estas 2 lineas representan la configuracion de supabase, que es una base de datos en la nube

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
    // La variable de entorno SUPABASE_URL contiene la URL de tu proyecto Supabase
    // La variable de entorno SUPABASE_SERVICE_ROLE_KEY contiene la clave de rol de servicio de tu proyecto Supabase
    // La clave de rol de servicio es una clave secreta que permite realizar operaciones administrativas en la base de datos,
    //  como crear usuarios, gestionar roles, etc.
);

// Exporta el cliente de Supabase para que pueda ser utilizado en otros archivos
module.exports = supabaseAdmin; // Exporta el cliente de Supabase para que pueda ser utilizado en otros archivos