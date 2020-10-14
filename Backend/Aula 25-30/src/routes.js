const Router = require('koa-router');
const router = new Router();

const Autores = require('./controllers/autores');
const Posts = require('./controllers/posts');

router.get('/autor', Autores.obterAutores);
router.get('/autor/:id', Autores.obterAutor);
router.post('/autor', Autores.adicionarAutor);
router.put('/autor/:id', Autores.atualizarAutor);
router.delete('/autor/:id', Autores.deletarAutor);

router.get('/posts', Posts.obterPosts);
router.get('/posts/:id', Posts.obterPost);
router.post('/posts', Posts.adicionarPost);
router.put('/posts/:id', Posts.atualizarPost);
router.delete('/posts/:id', Posts.deletarPost);

module.exports = router;
