import { select, insert } from "../connections/base125.js";
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

export {
    escuelasQuery,
    campanias,
    insertProspecto
}