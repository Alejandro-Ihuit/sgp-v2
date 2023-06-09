import express from 'express';

const router = express.Router();

router.get('/', (req, res) => { //set the main page

	res.render('auth/login.ejs', { "title" : "Acceso | SGP", "iconName": "login" });
	
});

import { login, home }  from '../controllers/login.controller.js';
	router.post('/login', login);
	router.get('/home', home);
import { formRegistrarProspecto, guardarProspecto, verProspectos, verInformacionProspecto, cargarGruposCapa, actualizarDatosProspecto } from '../controllers/general_controller.js';
	router.post('/guardarProspecto', guardarProspecto);
	router.post('/actualizarDatosProspecto', actualizarDatosProspecto);
	router.get('/registrarProspecto', formRegistrarProspecto);
	router.get('/verProspectos', verProspectos);
	router.put('/modalProspecto', verInformacionProspecto);
	router.put('/modalGruposCapa', cargarGruposCapa);
export default router;