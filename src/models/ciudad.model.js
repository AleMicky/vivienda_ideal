import pool from "../config/db.js";


export async function listarCiudades() {
    const [rows] = await pool.query('SELECT * FROM ciudad ORDER BY id_ciudad DESC');
    return rows;
}

export async function listarCiudadesPorId(id) {
    const [rows] = await pool.query('SELECT * FROM ciudad WHERE id_ciudad = ?', [id]);
    return rows[0];
}

export async function crearCiudad(ciudad) {
    const [result] = await pool.query('INSERT INTO ciudad (nombre) VALUES (?)', [ciudad.nombre]);
    return result;
}

export async function actualizarCiudad(ciudad) {
    const [result] = await pool.query('UPDATE ciudad SET nombre = ? WHERE id_ciudad = ?', [ciudad.nombre, ciudad.id_ciudad]);
    return result;
}

export async function eliminarCiudad(id_ciudad) {
    const [result] = await pool.query('DELETE FROM ciudad WHERE id_ciudad = ?', [id_ciudad]);
    return result;
}

