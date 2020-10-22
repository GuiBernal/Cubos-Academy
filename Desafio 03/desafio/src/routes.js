const Router = require('koa-router');

const router = new Router();

const Jogos = require('./controllers/jogos');
const Autenticar = require('./controllers/autenticar');

router.get('/classificacao', Jogos.classificar);

router.post('/auth', Autenticar.auth);

module.exports = router;
