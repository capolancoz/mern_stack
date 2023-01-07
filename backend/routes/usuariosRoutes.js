const {Router} = require('express');
const router = Router();

const {create,auth} = require('../controllers/usuariosController');

const {verifyToken} = require('../middlewares/auth.handler');

router.route('/')
    .post(verifyToken, create)

router.route('/auth')
    .post(auth)


module.exports = router;