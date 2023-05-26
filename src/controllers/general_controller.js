import dayjs  from 'dayjs';
import { escuelasQuery } from '../models/general_model.js';

const formRegistrarProspecto = async(req, res) => {
    
    let hoy = dayjs().format('YYYY-MM-DD'); //mostramos la fecha actual para la vista en el formulario de registro

    let resultadoEscuelas = await escuelasQuery();

    res.render('registrarProspecto', { 

        'title': 'Registrar Prospecto', 
        'iconName': 'registrarP', 
        'hoy': hoy, 
        'resultadoEscuelas': resultadoEscuelas 
    } );
    }

export {
    formRegistrarProspecto
}