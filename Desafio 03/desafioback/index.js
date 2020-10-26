const cors = require('@koa/cors');
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');

const server = new Koa();
server.use(cors());

server.use(bodyparser());
server.use(router.routes());
server.use((ctx) => {
	ctx.status = 404;
	ctx.body = {
		status: 'erro',
		dados: {
			mensagem: 'Recurso não encontrado.',
		},
	};
});

server.listen(8081, () => console.log('Rodando na porta 8081.'));
