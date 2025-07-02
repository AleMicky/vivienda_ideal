import pool from "../config/db.js";

export async function reporteContratos() {
    const [rows] = await pool.query('call sp_reporte_contratos()');
    return rows;
}

export async function reportePagosPendientes (mes, anio) {
    const [rows] = await pool.query('call sp_reporte_pagos_pendientes(?, ?)', [mes, anio]);
    return rows;
}
    
export async function reporteIngresosMensuales (mes, anio) {
    const [rows] = await pool.query('call sp_reporte_ingresos_mensuales(?, ?)', [mes, anio]);
    return rows;
}
    
export async function reporteComisiones () {
    const [rows] = await pool.query('call sp_reporte_comisiones()');
    return rows;
}

export async function reporteVisitas () {
    const [rows] = await pool.query('call sp_reporte_visitas()');
    return rows;
}
    