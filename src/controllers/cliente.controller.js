import * as ClienteModel from "../models/cliente.model.js";

export const listarClientes = async (req, res) => {
    try {
        const clientes = await ClienteModel.listarClientes();
        res.render('clientes/index', {
            clientes,
            layout: 'layouts/main-layout',
            title: 'Listado de Clientes'
        });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        req.flash('error_msg', 'Error al obtener clientes');
        res.redirect('/');
    }
};

export const formularioNuevoCliente = async (req, res) => {
    try {
        res.render('clientes/form', {
            cliente: {},
            modo: 'crear',
            accion: '/clientes/crear',
            layout: 'layouts/main-layout',
            title: 'Formulario de Cliente'
        });
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        req.flash('error_msg', 'Error al obtener cliente');
        res.redirect('/clientes');
    }
};

export const formularioEditarCliente = async (req, res) => {
    try {
        const cliente = await ClienteModel.listarClientePorId(req.params.id);
        res.render('clientes/form', {
            cliente,
            modo: 'editar',
            accion: `/clientes/editar/${req.params.id}`,
            layout: 'layouts/main-layout',
            title: 'Formulario de Cliente'
        });
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        req.flash('error_msg', 'Error al obtener cliente');
        res.redirect('/clientes');
    }
};

export const guardarCliente = async (req, res) => {
    try {
        const cliente = req.body;
        await ClienteModel.procedimientoCliente('insert', cliente);
        req.flash('success_msg', 'Cliente guardado correctamente');
        res.redirect('/clientes');
    } catch (error) {
        console.error('Error al guardar cliente:', error);
        req.flash('error_msg', 'Error al guardar cliente');
        res.redirect('/clientes');
    }
};

export const actualizarCliente = async (req, res) => {
    try {
        const cliente = req.body;
        await ClienteModel.procedimientoCliente('update', {
            ...cliente,
            id_cliente: parseInt(req.params.id)
        });
        req.flash('success_msg', 'Cliente editado correctamente');
        res.redirect('/clientes');
    } catch (error) {
        console.error('Error al editar cliente:', error);
        req.flash('error_msg', 'Error al editar cliente');
        res.redirect('/clientes');
    }
};

export const eliminarCliente = async (req, res) => {
    try {
        await ClienteModel.procedimientoCliente('delete', {
            id_cliente: parseInt(req.params.id)
        });
        req.flash('success_msg', 'Cliente eliminado correctamente');
        res.redirect('/clientes');
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        req.flash('error_msg', 'Error al eliminar cliente');
        res.redirect('/clientes');
    }
};

