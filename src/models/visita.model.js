import pool from "../config/db.js";

export async function listarVisitas() {
    const [rows] = await pool.query('SELECT * FROM visita ORDER BY id_visita DESC');
    return rows;
}

export async function listarVisitasPorId(id) {
    const [rows] = await pool.query('SELECT * FROM visita WHERE id_visita = ?', [id]);
    return rows[0];
}
 