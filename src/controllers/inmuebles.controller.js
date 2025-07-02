import * as InmuebleModel from "../models/inmuebles.model.js";
import * as CiudadModel from "../models/ciudad.model.js";
import * as PropietarioModel from "../models/cliente.model.js"; 

export const listarInmuebles = async (req, res) => {
    try {
        const inmuebles = await InmuebleModel.listarInmuebles();
        res.render('inmuebles/index', {
            inmuebles,
            messages: {
                error_msg: req.flash('error_msg'),
                success_msg: req.flash('success_msg')
            },
            layout: 'layouts/main-layout',
            title: 'Listado de Inmuebles'
        });
    } catch (error) {
        console.error('Error al obtener inmuebles:', error);
        req.flash('error_msg', 'Error al obtener la lista de inmuebles. Por favor, intente nuevamente.');
        res.redirect('/inmuebles');
    }
};


export const formularioNuevoInmueble = async (req, res) => {
    try {
        // Obtener la lista de ciudades
        const ciudades = await CiudadModel.listarCiudades();
        const propietarios = await PropietarioModel.listarClientes();        
        res.render('inmuebles/form', {
            inmueble: {},
            modo: 'crear',
            accion: '/inmuebles/crear',
            layout: 'layouts/main-layout',
            title: 'Nuevo Inmueble',
            ciudades: ciudades,
            propietarios: propietarios
        });
    } catch (error) {
        console.error('Error al cargar el formulario de inmueble:', error);
        req.flash('error_msg', 'Error al cargar el formulario');
        res.redirect('/inmuebles');
    }
};

export const guardarInmueble = async (req, res) => {
    try {
        const inmueble = req.body;
        await InmuebleModel.crearInmueble(inmueble);
        req.flash('success_msg', 'Inmueble guardado correctamente');
        res.redirect('/inmuebles');
    } catch (error) {
        console.error('Error al guardar inmueble:', error);
        req.flash('error_msg', 'Error al guardar inmueble');
        res.redirect('/inmuebles');
    }
};

export const formularioEditarInmueble = async (req, res) => {
    try {
        const ciudades = await CiudadModel.listarCiudades();
        const propietarios = await PropietarioModel.listarClientes();
        const inmueble = await InmuebleModel.listarInmueblesPorId(req.params.id);
        res.render('inmuebles/form', {
            inmueble,
            modo: 'editar',
            accion: `/inmuebles/editar/${req.params.id}`,
            layout: 'layouts/main-layout',
            title: 'Formulario de Inmueble',
            ciudades: ciudades,
            propietarios: propietarios
        });
    } catch (error) {
        console.error('Error al obtener inmueble:', error);
        req.flash('error_msg', 'Error al obtener inmueble');
        res.redirect('/inmuebles');
    }
};

export const actualizarInmueble = async (req, res) => {
    try {
        const inmueble = req.body;
        await InmuebleModel.actualizarInmueble(inmueble);
        req.flash('success_msg', 'Inmueble actualizado correctamente');
        res.redirect('/inmuebles');
    } catch (error) {
        console.error('Error al actualizar inmueble:', error);
        req.flash('error_msg', 'Error al actualizar inmueble');
        res.redirect('/inmuebles');
    }
};

export const eliminarInmueble = async (req, res) => {
    try {
        await InmuebleModel.eliminarInmueble(req.params.id);
        req.flash('success_msg', 'Inmueble eliminado correctamente');
        res.redirect('/inmuebles');
    } catch (error) {
        console.error('Error al eliminar inmueble:', error);
        req.flash('error_msg', 'Error al eliminar inmueble');
        res.redirect('/inmuebles');
    }
};

    