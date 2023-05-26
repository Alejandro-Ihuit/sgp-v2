import dayjs  from 'dayjs';
import { escuelasQuery, campanias } from '../models/general_model.js';

const formRegistrarProspecto = async(req, res) => {
    
    let hoy = dayjs().format('YYYY-MM-DD'); //mostramos la fecha actual para la vista en el formulario de registro

    let resultadoEscuelas = await escuelasQuery();
    let resultadoCampanias = await campanias();

    res.render('registrarProspecto', { 
            'title': 'Registrar Prospecto', 
            'iconName': 'registrarP', 
            'hoy': hoy, 
            'resultadoEscuelas': resultadoEscuelas,
            'campanias': resultadoCampanias
        } );
    }

export {
    formRegistrarProspecto
}