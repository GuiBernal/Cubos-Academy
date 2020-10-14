const response = require('./response');
const { autores, posts } = require('./base');

const obterPosts = (ctx) => {
	const { id_autor = null, publicado = true } = ctx.query;
	if (id_autor) {
		const autorPosts = posts.filter((post) => post.autor === id_autor);

		if (autorPosts.length >= 1) {
			response(ctx, 200, autorPosts);
		} else {
			response(ctx, 404, { message: 'Não Encontrado' });
		}
	} else {
		const estaPublicado = publicado === 'true';
		const publicados = posts.filter(
			(post) => !post.deletado && post.publicado === estaPublicado
		);
		response(ctx, 200, publicados);
	}
};

const obterPost = (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			response(ctx, 200, postAtual);
		} else {
			response(ctx, 404, { message: 'Post não encontrado' });
		}
	} else {
		response(ctx, 400, { message: 'Mal formatado' });
	}
};

const adicionarPost = (ctx) => {
	const body = ctx.request.body;

	if (!body.titulo || !body.conteudo || !body.subtitulo || !body.autor) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	} else if (autores[body.autor - 1].deletado === true) {
		return response(ctx, 403, { message: 'Pedido proibido' });
	}

	const post = {
		id: posts.length + 1,
		titulo: body.titulo,
		conteudo: body.conteudo,
		subtitulo: body.subtitulo,
		autor: body.autor,
		publicado: false,
		deletado: false,
	};

	posts.unshift(post);

	response(ctx, 201, post);
};

const atualizarPost = (ctx) => {
	const { id = null } = ctx.params;
	const {
		conteudo = null,
		titulo = null,
		subtitulo = null,
		publicado = false,
	} = ctx.request.body;

	if (!conteudo && !titulo && !subtitulo && !publicado) {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			const postAtualizado = {
				...postAtual,
				conteudo: conteudo ? conteudo : postAtual.conteudo,
				titulo: titulo ? titulo : postAtual.titulo,
				subtitulo: subtitulo ? subtitulo : postAtual.subtitulo,
				publicado: publicado === true,
			};

			posts[id - 1] = postAtualizado;

			response(ctx, 200, postAtualizado);
		}
	} else {
		response(ctx, 404, { message: 'Autor não encontrado' });
	}
};

const deletarPost = (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			const postAtualizado = {
				...postAtual,
				deletado: estado,
			};

			posts[id - 1] = postAtualizado;

			response(ctx, 200, postAtualizado);
		}
	} else {
		response(ctx, 404, { message: 'Post não encontrado' });
	}
};

module.exports = {
	obterPosts,
	obterPost,
	adicionarPost,
	atualizarPost,
	deletarPost,
};
