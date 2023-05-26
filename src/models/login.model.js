import  { select }  from "../connections/base210.js";

const loginData = async(credenciales) => {

    let query = `SELECT p.per_nombre, p.per_apellido, p.per_id ,p.per_foto, p.per_departamento, p.per_campania, u.usuario, u.privilegio, u.campania, p.per_puesto, p.per_baja
    FROM ccs.usuarios AS u INNER JOIN ccs.personal AS p ON p.per_id=u.per_id WHERE u.usuario='${credenciales.usuario}' AND u.password = password('${credenciales.contrasenia}');`;

    return await select(query);
}

export {
    loginData
}