import * as ReporteModel from "../models/reporte.model.js";

export const reporteContratos = async (req, res) => {
    try {
        const contratos = await ReporteModel.reporteContratos();

        res.render('reportes/contratos', {
            contratos: contratos[0],
            layout: 'layouts/main-layout',
            title: 'Reporte de Contratos'
        });
    } catch (error) {
        console.error('Error al obtener contratos:', error);
        req.flash('error_msg', 'Error al obtener contratos');
        res.redirect('/reportes/contratos');
    }
};
    
export const reportePagosPendientes = async (req, res) => {
    try {
        const { mes, anio } = req.query;
        const pagosPendientes = await ReporteModel.reportePagosPendientes(mes, anio);

        console.log(pagosPendientes[0]);
        
        res.render('reportes/pagos-pendientes', {
            pagosPendientes: pagosPendientes[0] || [],
            layout: 'layouts/main-layout',
            title: 'Reporte de Pagos Pendientes'
        });
    } catch (error) {
        console.error('Error al obtener pagos pendientes:', error);
        req.flash('error_msg', 'Error al obtener pagos pendientes');
        res.redirect('/reportes/pagos-pendientes');
    }
};
    
export const reporteIngresosMensuales = async (req, res) => {
    try {
        const { mes, anio } = req.query;
        const ingresosMensuales = await ReporteModel.reporteIngresosMensuales(mes, anio);
      
        console.log(ingresosMensuales[0]);
        
        res.render('reportes/ingresos-mensuales', {
            ingresosMensuales: ingresosMensuales[0] || [],
            mes: mes || '',
            anio: anio || '',
            layout: 'layouts/main-layout',
            title: 'Reporte de Ingresos Mensuales'
        });
    } catch (error) {
        console.error('Error al obtener ingresos mensuales:', error);
        req.flash('error_msg', 'Error al obtener ingresos mensuales');
        res.redirect('/reportes/ingresos-mensuales');
    }
};
    
export const reporteComisiones = async (req, res) => {
    try {
        const comisiones = await ReporteModel.reporteComisiones();
        console.log(comisiones[0]);
        res.render('reportes/comisiones', {
            comisiones: comisiones[0] || [],
            layout: 'layouts/main-layout',
            title: 'Reporte de Comisiones'
        });
    } catch (error) {
        console.error('Error al obtener comisiones:', error);
        req.flash('error_msg', 'Error al obtener comisiones');
        res.redirect('/reportes/comisiones');
    }
};  
    
export const reporteVisitas = async (req, res) => {
    try {
        const visitas = await ReporteModel.reporteVisitas();
        console.log(visitas[0]);
        res.render('reportes/visitas', {
            visitas: visitas[0] || [],
            layout: 'layouts/main-layout',
            title: 'Reporte de Visitas'
        });
    } catch (error) {
        console.error('Error al obtener visitas:', error);
        req.flash('error_msg', 'Error al obtener visitas');
        res.redirect('/reportes/visitas');
    }
};
    