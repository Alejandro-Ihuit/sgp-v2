import { select } from "../connections/base125.js";

const escuelasQuery = async() => {

    let query = `SELECT DISTINCT(escuela) from sgp.prospectos ORDER BY escuela ASC;`;
    return await select(query);
}

export {
    escuelasQuery
}