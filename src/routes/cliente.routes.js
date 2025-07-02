import { Router } from 'express';
import * as Cliente from '../controllers/cliente.controller.js';

const router = Router();

router.get('/', Cliente.listarClientes);
router.get('/nuevo', Cliente.formularioNuevoCliente);
router.post('/crear', Cliente.guardarCliente);
router.get('/editar/:id', Cliente.formularioEditarCliente);
router.post('/editar/:id', Cliente.actualizarCliente);
router.post('/eliminar/:id', Cliente.eliminarCliente);

export default router;
