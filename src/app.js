import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from 'method-override';

import clienteRoutes from "./routes/cliente.routes.js";
import inmueblesRoutes from './routes/inmuebles.routes.js'
import reporteRoutes from './routes/reporte.routes.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/partials')
]);

// Configuración de express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout extractMetas', true);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride('_method'));

// Configuración de la sesión
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'secreto_muy_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Solo enviar cookies sobre HTTPS en producción
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    },
    name: 'vivienda_ideal.sid' // Nombre personalizado para la cookie
};

// Configuración para desarrollo (sin secure)
if (app.get('env') === 'development') {
    sessionConfig.cookie.secure = false;
}

// Configurar sesión
app.use(session(sessionConfig));

// Configurar flash messages
app.use(flash());

// Middleware para pasar mensajes flash a las vistas
app.use((req, res, next) => {
    // Pasar mensajes flash a las variables locales de la respuesta
    res.locals.success_msg = req.flash('success_msg');
    // Pasar la ruta actual a todas las vistas
    res.locals.currentPath = req.path;
    res.locals.error_msg = req.flash('error_msg');
    
    // También puedes pasar el usuario autenticado si lo tienes
    // res.locals.user = req.user || null;
    
    // Pasar a la siguiente función de middleware
    next();
});

// Rutas

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Inicio',
        layout: 'layouts/main-layout'
    });
});

app.use('/clientes', clienteRoutes);    
app.use('/inmuebles', inmueblesRoutes); 
app.use('/reportes', reporteRoutes);


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});


