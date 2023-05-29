import express  from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import rutas from './routes/rutas.js';
import session from 'express-session';

//comentario 

const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use( (req, res, next) => { //almacenar sesiones para las vistas
    res.locals.session = req.session;
    next();
});


const dieSession = (req, res, next) => {

    if (!req.session || !req.session.per_id) {
        // Si no hay sesión o no hay un usuario en la sesión, redirige al login
        return res.redirect('/');
    }
      
      // Si la sesión no ha expirado, continúa con la solicitud
      next();
}

//parsear datos con json mucho cuidado al donde situar las cosas parsear antes de redirigir a las rutas correspondientes:
app.use(bodyParser.json({ limit :  '30mb' }));

app.use(bodyParser.urlencoded({ extended: true, limit : '25mb' }));

app.use('/', rutas);

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(express.static('./src/public'));

app.set('views', './src/views');

/*OTRAS DEPENDEPENCIAS */

const puerto = 3112;

app.listen( puerto, () => console.log(`SGP v2 corriendo en el puerto ${puerto}`) );
