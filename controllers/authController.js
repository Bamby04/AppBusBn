const { createClient } = require('@supabase/supabase-js');
// Importa la librería de cliente de Supabase para interactuar con la base de datos
// La librería supabase-js permite interactuar con la base de datos de Supabase desde el backend de Node.js
const supabaseAdmin = require('../supabaseClient'); // Importa el cliente de Supabase configurado en supabaseClient.js

require('dotenv').config();

const supabaseAnonClient = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY// esta variable SUPABASE_SERVICE_ROLE_KEY sirve para autenticar al usuario anonimo
);

exports.registerUser = async (req, res) => { // Función para registrar un nuevo usuario
    // Esta función recibe una solicitud (req) y una respuesta (res) como parámetros
    const { email, password } = req.body; // Extrae el email y la contraseña del cuerpo de la solicitud

    const { data, error } = await supabaseAdmin.auth.admin.createUser({ email, password, email_confirm: true });
    // Crea un nuevo usuario en Supabase con el email y la contraseña proporcionados

    if (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(400).json({ error: error.message }); // Devuelve un error si la creación del usuario falla
    }
    // Si la creación del usuario es exitosa, se devuelve el usuario creado
    return res.json({ user: data.user, message: 'Usuario creado exitosamente' }); // Devuelve el usuario creado y un mensaje de éxito
}


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const { data, error } = await supabaseAnonClient.auth.signInWithPassword({ 
        email, 
        password 
    });

    if (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(400).json({ error: error.message });
    }

    // Devuelve el token en la respuesta
    return res.json({
        user: data.user,
        session: data.session, // ← ¡Esto incluye el access_token!
        message: 'Inicio de sesión exitoso'
    });
}