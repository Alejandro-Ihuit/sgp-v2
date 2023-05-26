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

        //formateos
        resultadoQuery[0].per_campania.toLowerCase();
        resultadoQuery[0].privilegio.toLowerCase();
        
        delete resultadoQuery[0].per_foto; //por ahora no me sirve la foto, es una cadena larga de caracteres, así que la elimino temporalmente del arreglo

        console.log('DATOS USER', resultadoQuery)
        
        //resultadoQuery[0].privilegio = 'admins';

        //validar en primer instancia si es baja, porque si es así no tiene caso seguir con el proceso de sesion etc etc etc
        if( resultadoQuery[0].per_baja !== 1 ) {

            //validar su privilegio
            switch( resultadoQuery[0].privilegio ) {
                case USER_PRIV.ADMIN:
                    accede = true;
                break;
                case USER_PRIV.ADMINASIST:
                        accede = true;
                    break;
                case USER_PRIV.ADMINISTRATIVO:
                        accede = true;
                    break;
                case USER_PRIV.ADMINPERSONAL:
                        accede = true;
                    break;
                case USER_PRIV.ASESOR:
                        accede = true;
                    break;
                case USER_PRIV.CALIDAD:
                        accede = true;
                    break;
                case USER_PRIV.CAPACITADOR:
                        accede = true;
                    break;
                case USER_PRIV.NOMINAS:
                        accede = true;
                    break;
                case USER_PRIV.SUPERVISOR:
                        accede = true;
                    break;
                case USER_PRIV.VIP:
                        accede = false;
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
                console.log('NO CREAR NADA DE VARIABLES DE SESION');
            }
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