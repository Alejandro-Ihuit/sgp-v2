import { select, insert, update } from "../connections/base125.js";
import { select210 } from "../connections/base210.js";

const escuelasQuery = async() => {

    let query = `SELECT DISTINCT(escuela) from sgp.prospectos ORDER BY escuela ASC;`;
    return await select(query);
}

const campanias = async() => {

    let query = `SELECT * FROM campanias WHERE status_campania = 'Activo';`;
    return await select210(query);
}

const insertProspecto = async(prospecto) => { //fala agregar los try cath

    let query = `INSERT INTO sgp.prospectos
    (primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, curp, rfc, celular, dir_casa, codigo_postal, cc_place, asesor_padrino, campania, turno, modalidad, horas_laborales, bono, fecha_ingreso, escuela, medios, reclutador, fecha_solicitud, estatus)
    VALUES('${prospecto.primer_nombre}', '${prospecto.segundo_nombre}', '${prospecto.primer_apellido}', '${prospecto.segundo_apellido}', '${prospecto.fecha_nacimiento}', '${prospecto.curp}', '${prospecto.rfc}', '${prospecto.celular}', '${prospecto.dir_casa}', '${prospecto.codigo_postal}', '${prospecto.cc_experience}', '${prospecto.asesor_padrino}', '${prospecto.campania}', '${prospecto.turno}', '${prospecto.modalidad}', ${prospecto.horas_laborales}, '${prospecto.bono}', '${prospecto.fecha_ingreso}', '${prospecto.escuela}', '${prospecto.medios}', '${prospecto.reclutador}', '${prospecto.fecha_solicitud}', ${prospecto.estatus});
    `;
    return await insert(query);
}

const actualizacionDeProspecto = async(formData) => {
    try{
        let query = `UPDATE sgp.prospectos 
                    SET primer_nombre = '${formData.primer_nombre}', segundo_nombre = '${formData.segundo_nombre}', primer_apellido = '${formData.primer_apellido}', segundo_apellido = '${formData.segundo_apellido}', fecha_nacimiento = '${formData.fecha_nacimiento}', curp = '${formData.curp}', rfc = '${formData.rfc}', celular = '${formData.celular}', dir_casa = '${formData.dir_casa}', codigo_postal = '${formData.codigo_postal}', cc_experience = '${formData.cc_experience}', cc_place = '${formData.cc_place}', asesor_padrino = '${formData.asesor_padrino}', campania = '${formData.campania}', turno = '${formData.turno}', modalidad = '${formData.modalidad}', horas_laborales = '${formData.horas_laborales}', bono = '${formData.bono}', fecha_ingreso = '${formData.fecha_ingreso}', escuela = '${formData.escuela}', medios = '${formData.medios}', estatus = '${formData.estatus}' 
                    WHERE id_prospecto = '${formData.id_prospecto}';`
        return await update(query);
    }catch(error){
        console.error('Error al actualizar informacion: ',error);
        throw error;
    }
    
}

const prospectosQuery = async() => {
    let query = `SELECT p.id_prospecto, p.primer_nombre, p.segundo_nombre, p.primer_apellido, p.segundo_apellido, p.fecha_nacimiento, p.curp, p.rfc, p.celular, p.dir_casa, p.codigo_postal, p.cc_place, p.asesor_padrino, p.campania, p.turno, p.modalidad, p.horas_laborales, p.bono, p.fecha_ingreso, p.escuela, p.medios, p.reclutador, p.fecha_solicitud, e.estatus as status
                FROM sgp.prospectos as p inner join sgp.estatus as e on p.estatus = e.id_status
                WHERE p.estatus = 0
                order by id_prospecto asc;`
    return await select(query);
}

const informacionProspecto = async(id_prospecto) => {
    try {
        let query = `SELECT p.id_prospecto, p.primer_nombre, p.segundo_nombre, p.primer_apellido, p.segundo_apellido, p.fecha_nacimiento, p.curp, p.rfc, p.celular, p.dir_casa, p.codigo_postal, p.cc_place, p.asesor_padrino, p.campania, p.turno, p.modalidad, p.horas_laborales, p.bono, p.fecha_ingreso, p.escuela, p.medios, p.reclutador, p.fecha_solicitud, e.estatus as status
                    FROM sgp.prospectos as p inner join sgp.estatus as e on p.estatus = e.id_status
                    WHERE p.estatus = 0 and p.id_prospecto = '${id_prospecto}'
                    order by id_prospecto asc;`;
        return await select(query);
    } catch (error) {
        console.error('Error en la consulta Informacion prospecto:', error);
        throw error;
    }
}

const gruposCapa = async() => {
    try {
        let query = `SELECT id, id_capacitacion, encargado, curso, fecha_inicio
                    FROM sgp.grupos_capacitacion 
                    WHERE estatus in (0,1);`
        return await select(query);
    } catch (error){
        console.error('Error en la consulta grupos capacitacion:', error);
    }
}

const grupoCapa = async(id) => {
    try {
        let query = `SELECT id, id_capacitacion, curso, fecha_final 
                    FROM sgp.grupos_capacitacion 
                    WHERE id = '${id}';`
        return await select(query);
    } catch (error){
        console.error('Error en la consulta del grupo capacitacion:', error);
    }
}

export {
    campanias,
    grupoCapa,
    gruposCapa,
    escuelasQuery,
    insertProspecto,
    prospectosQuery,
    informacionProspecto,
    actualizacionDeProspecto
}