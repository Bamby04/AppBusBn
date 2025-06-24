// controllers/rutasController.js
const supabaseAdmin = require('../supabaseClient');

/**
 * NUEVA FUNCIÓN PARA CREAR UNA RUTA
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.createRuta = async (req, res) => {
    // Extraemos los datos del cuerpo de la solicitud (body) que envías desde Postman.
    const { nombre, tipo, paradas, origen } = req.body;

    // Es una buena práctica validar que los datos necesarios han sido enviados.
    if (!nombre || !tipo || !paradas || !origen) {
        return res.status(400).json({ error: 'Faltan campos requeridos. Asegúrate de enviar nombre, tipo, paradas y origen.' });
    }

    // Usamos el cliente de Supabase para insertar un nuevo registro en tu tabla 'rutas'.
    const { data, error } = await supabaseAdmin
        .from('rutas')
        .insert([
            { nombre, tipo, paradas, origen },
        ])
        .select(); // Usamos .select() para que Supabase nos devuelva el registro que acabamos de crear.

    // Si ocurre un error durante la inserción en la base de datos, lo notificamos.
    if (error) {
        console.error('Error al crear la ruta:', error);
        return res.status(400).json({ error: error.message });
    }

    // Si todo sale bien, enviamos una respuesta con el estado 201 (Created)
    // y los datos de la nueva ruta que se guardó en la base de datos.
    // data es un array, por lo que accedemos al primer elemento data[0].
    res.status(201).json({ data: data[0], message: 'Ruta creada exitosamente' });
};

/**
 * FUNCIÓN EXISTENTE PARA ACTUALIZAR UNA RUTA
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.updateRuta = async (req, res) => {
    const { id } = req.params; // ID de la ruta (UUID)
    const { nombre, tipo, paradas, origen } = req.body; // Campos a actualizar

    const { data, error } = await supabaseAdmin
        .from('rutas')
        .update({ nombre, tipo, paradas, origen })
        .eq('id', id) // Filtra por UUID
        .select();

    if (error) {
        console.error('Error al actualizar:', error);
        return res.status(400).json({ error: error.message });
    }
    res.json({ data, message: 'Ruta actualizada exitosamente' });
};

/**
 * FUNCIÓN EXISTENTE PARA ELIMINAR UNA RUTA
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 */
exports.deleteRuta = async (req, res) => {
    const { id } = req.params; // ID de la ruta (UUID)

    const { data, error } = await supabaseAdmin
        .from('rutas')
        .delete()
        .eq('id', id) // Filtra por UUID
        .select();

    if (error) {
        console.error('Error al eliminar:', error);
        return res.status(400).json({ error: error.message });
    }
    res.json({ data, message: 'Ruta eliminada exitosamente' });
};
