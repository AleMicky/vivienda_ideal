import pool from "../config/db.js";

export async function listarInmuebles() {
    const [rows] = await pool.query(`
        SELECT 
            mu.id_inmueble,
            mu.direccion,
            mu.precio,
            mu.tipo,
            mu.caracteristicas,
            mu.disponible,
            mu.id_ciudad,
            mu.id_propietario,
            ci.nombre as ciudad,
            cl.nombre as propietario
        FROM inmueble mu
        INNER JOIN ciudad ci ON ci.id_ciudad = mu.id_ciudad
        INNER JOIN cliente cl ON cl.id_cliente = mu.id_propietario
        ORDER BY id_inmueble DESC
    `);
    return rows;
}

export async function listarInmueblesPorId(id) {
    const [rows] = await pool.query(`
        SELECT 
            mu.id_inmueble,
            mu.direccion,
            mu.precio,
            mu.tipo,
            mu.caracteristicas,
            mu.disponible,
            mu.id_ciudad,
            mu.id_propietario,
            ci.nombre as ciudad,
            cl.nombre as propietario
        FROM inmueble mu
        INNER JOIN ciudad ci ON ci.id_ciudad = mu.id_ciudad
        INNER JOIN cliente cl ON cl.id_cliente = mu.id_propietario
        WHERE mu.id_inmueble = ?
    `, [id]);
    return rows[0];
}

export async function crearInmueble(inmueble) {
    const [result] = await pool.query(
        'INSERT INTO inmueble (direccion, precio, tipo, caracteristicas, disponible, id_ciudad, id_propietario) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [
            inmueble.direccion, 
            parseFloat(inmueble.precio), 
            inmueble.tipo, 
            inmueble.caracteristicas, 
            inmueble.disponible === '1' ? 1 : 0, 
            parseInt(inmueble.id_ciudad), 
            parseInt(inmueble.id_propietario)
        ]
    );
    return result;
}

export async function actualizarInmueble(inmueble) {
    const [result] = await pool.query('UPDATE inmueble SET direccion = ?, precio = ?, tipo = ?, caracteristicas = ?, disponible = ?, id_ciudad = ?, id_propietario = ? WHERE id_inmueble = ?', [inmueble.direccion, inmueble.precio, inmueble.tipo, inmueble.caracteristicas, inmueble.disponible, inmueble.id_ciudad, inmueble.id_propietario, inmueble.id_inmueble]);
    return result;
}

export async function eliminarInmueble(id_inmueble) {
    const [result] = await pool.query('DELETE FROM inmueble WHERE id_inmueble = ?', [id_inmueble]);
    return result;
}