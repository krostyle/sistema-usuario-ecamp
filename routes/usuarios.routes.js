const { Router } = require('express');
const { getUsuarios, createUsuario, login } = require('../controllers/usuarios.controllers');


const router = Router();

router.get('/usuarios', getUsuarios);

router.post('/usuario', createUsuario);
router.post('/login', login);





module.exports = router;