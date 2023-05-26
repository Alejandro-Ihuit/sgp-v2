import { select } from "../connections/base125.js";
import { select210 } from "../connections/base210.js";

const escuelasQuery = async() => {

    let query = `SELECT DISTINCT(escuela) from sgp.prospectos ORDER BY escuela ASC;`;
    return await select(query);
}

const campanias = async() => {

    let query = `SELECT * FROM campanias WHERE status_campania = 'Activo';`;
    return await select210(query);
}

export {
    escuelasQuery,
    campanias
}