import { Router } from 'express';
import * as Inmueble from '../controllers/inmuebles.controller.js';

const router = Router();

router.get('/', Inmueble.listarInmuebles);
router.get('/nuevo', Inmueble.formularioNuevoInmueble);
router.post('/crear', Inmueble.guardarInmueble);
router.get('/editar/:id', Inmueble.formularioEditarInmueble);
router.post('/editar/:id', Inmueble.actualizarInmueble);
router.post('/eliminar/:id', Inmueble.eliminarInmueble);


export default router;