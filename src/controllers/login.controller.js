import  { loginData } from "../models/login.model.js"; //imporat lo que exporta el modelo cuidar mucho los nombres
import { USER_PRIV } from "../dictionarys/infoUser.js";

const login = async(req, res) => {

    let credenciales = req.body;

    let resultadoQuery = await loginData( credenciales );

    let url = '/home', msg = '', accede = false;

    if( resultadoQuery.length === 0 || typeof resultadoQuery === 'undefined' ) {

        url = ''; msg = 'Error de usuario o contraseña'; accede;

        res.json({ "url": url, "msg": msg, "accede": accede });
    }
    else {

            case USER_PRIV.ADMIN:
                    accede = true;
                break;
            case 'administrativo':
                    accede = true;;
                break;
            case 'nominas':
                    accede = true;
                break;
            case 'adminpersonal':
                    accede = true;
                break;
            default:
                    msg = 'NO TIENES PRIVILEGIO PARA USAR ESTA HERRAMIENTA'; accede; url  = '';
                break;
        }
 
        if( accede ) {
            
            req.session.per_id = resultadoQuery[0].per_id;
            req.session.nombre_completo = `${resultadoQuery[0].per_nombre} ${resultadoQuery[0].per_apellido}`;
            req.session.privilegio = resultadoQuery[0].privilegio;
            req.session.usuario = resultadoQuery[0].usuario;
            req.session.per_campania = resultadoQuery[0].per_campania;
            req.session.depto = resultadoQuery[0].per_departamento;
        }
        else {
            msg = 'Estatus Actual: Baja'; accede;        
        }

        res.json( { "url": url, "msg": msg, "accede": accede } );
    }
}
const home = (req, res) => {

    //if( !req.session.per_id || !req.session ) {

        //res.redirect('/');

    //}
    //else {
        res.render('homes/adminHome', { "title": `Inicio | ${req.session.privilegio}`, "iconName": "homeAdmin" });
    //}
}


export {
    login,
    home
}