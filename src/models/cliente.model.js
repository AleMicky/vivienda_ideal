import pool from "../config/db.js";

export async function listarClientes() {
    const [rows] = await pool.query('SELECT * FROM cliente ORDER BY id_cliente DESC');
    return rows;
}

export async function listarClientePorId(id) {
    const [rows] = await pool.query('SELECT * FROM cliente WHERE id_cliente = ?', [id]);
    return rows[0];
}

export async function procedimientoCliente(accion, cliente) {
    const { id_cliente, nombre, ci, telefono, email } = cliente;

    const [result] = await pool.query('CALL sp_cliente_ime(?, ?, ?, ?, ?, ?)', [
        accion,
        id_cliente || null,
        nombre || '',
        ci || '',
        telefono || '',
        email || ''
    ]);

    return result;
}