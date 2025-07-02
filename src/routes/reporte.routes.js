import express from 'express';
 import * as Reporte from '../controllers/reporte.controller.js';

const router = express.Router();

router.get('/contratos', Reporte.reporteContratos);
router.get('/pagos-pendientes', Reporte.reportePagosPendientes);
router.get('/ingresos-mensuales', Reporte.reporteIngresosMensuales);
router.get('/comisiones', Reporte.reporteComisiones);
router.get('/visitas-inmuebles', Reporte.reporteVisitas);

export default router;  