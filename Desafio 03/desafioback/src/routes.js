const Router = require('koa-router');

const router = new Router();

const Jogos = require('./controllers/jogos');
const Auth = require('./controllers/autenticar');

router.get('/classificacao', Jogos.classificar);
router.get('/mostrarClassificacao', Jogos.mostrarClassificacao);
router.get('/jogos/:id', Jogos.listarRodada);
router.post('/jogos', Jogos.atualizarJogos);

router.post('/auth', Auth.autenticar);

module.exports = router;
