import express from 'express';

const router = express.Router();

router.get('/', (req, res) => { //set the main page

	res.render('auth/login.ejs', { "title" : "Acceso | SGP", "iconName": "login" });
	
});

import { login, home }  from '../controllers/login.controller.js';
	router.post('/login', login);
	router.get('/home', home);
import { formRegistrarProspecto, guardarProspecto } from '../controllers/general_controller.js';
	router.get('/registrarProspecto', formRegistrarProspecto);
	router.post('/guardarProspecto', guardarProspecto);

export default router;