import dayjs  from 'dayjs';
import { escuelasQuery, campanias, insertProspecto, actualizacionDeProspecto, prospectosQuery, informacionProspecto, gruposCapa } from '../models/general_model.js';

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

const guardarProspecto = async(req, res) => {

    //formateos
    req.body.horas_laborales = parseInt(req.body.horas_laborales);
    req.body.estatus = parseInt(req.body.estatus);
    
    //validar si existe el prospecto que se esta ingresando PENDIENTE QUE HAGAS
    
    let prospecto = req.body;

    for (let clave in prospecto) {

        if (typeof prospecto[clave] === 'string') {

            prospecto[clave] = prospecto[clave].trim();
        }
    }

    let result = await insertProspecto(prospecto); //res e int

    //validar resultado
    if( result === 1 ) {
        res.json({ result });
    }
    else {
        res.json({ result: 0 });
    }
}

const actualizarDatosProspecto = async(req, res) =>{
    const formData = req.body;

    for (let clave in prospecto) {

        if (typeof formData[clave] === 'string') {

            formData[clave] = formData[clave].trim();
        }
    }
    let result = await actualizacionDeProspecto(formData);

    //validar resultado
    if( result === 1 ) {
        res.json({ result });
    }
    else {
        res.json({ result: 0 });
    }

}

const verProspectos = async(req, res) => {

    let resultadoProspectos = await prospectosQuery();
    res.render('verProspectos',{
        'title': 'Lista de prospectos', 
        'iconName': 'asesor', 
        'tablaProspectos': resultadoProspectos
    })
}

const verInformacionProspecto = async(req, res) => {
    let verInformacionProspecto = await informacionProspecto(req.body.id_prospecto)
    let resultadoCampanias = await campanias();
    verInformacionProspecto.forEach(e => {
        e.fecha_ingreso = e.fecha_ingreso.toJSON().slice(0,10)
    });
    res.render('modals/modalProspecto', {verInformacionProspecto, resultadoCampanias})
}

const cargarGruposCapa = async (req, res) => {
    const verGruposCapa = await gruposCapa();
    const idProspecto = req.body.idProspecto
    const gruposFormateados = verGruposCapa.map(grupo => {
    const fechaFormateada = new Date(grupo.fecha_inicio).toISOString().slice(0, 10);
    return {
        ...grupo,
        fecha_inicio: fechaFormateada
    };
    });
    
    res.render('modals/modalGruposCapa', { verGruposCapa: gruposFormateados, 'idProspecto': idProspecto});
}

export {
    verInformacionProspecto,
    formRegistrarProspecto,
    actualizarDatosProspecto,
    guardarProspecto,
    cargarGruposCapa,
    verProspectos
}