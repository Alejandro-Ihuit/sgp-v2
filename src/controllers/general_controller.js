import dayjs  from 'dayjs';
import { escuelasQuery } from '../models/general_model.js';

const formRegistrarProspecto = async(req, res) => {
    
    let hoy = dayjs().format('YYYY-MM-DD');
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