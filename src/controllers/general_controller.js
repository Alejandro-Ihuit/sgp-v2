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


const guardarProspecto = (req, res) => {

    let { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, curp, dir_casa, celular, rfc, codigo_postal, escuela, medios, cc_experience, campania, turno, modalidad, horas_laborales, bono, fecha_ingreso, asesor_padrino, observaciones } = req.body;
    
    //validar si existe el prospecto que se esta ingresando
}

    

export {
    formRegistrarProspecto,
    guardarProspecto
}