const response = require('./response');
const { autores, posts } = require('./base');

const obterAutores = (ctx) => {
	const autoresAtivos = autores.filter((autor) => !autor.deletado);
	response(ctx, 200, autoresAtivos);
};

const obterAutor = (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			response(ctx, 200, autorAtual);
		} else {
			response(ctx, 404, { message: 'Autor não encontrado' });
		}
	} else {
		response(ctx, 400, { message: 'Mal formatado' });
	}
};

const adicionarAutor = (ctx) => {
	const { nome, sobrenome, email, senha } = ctx.request.body;
	if (!nome || !sobrenome || !email || !senha) {
		formatarErro(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	const existencia = autores.filter(
		(item) => item.nome == nome && item.email == email
	);

	if (existencia.length !== 0) {
		return response(ctx, 400, { message: 'Autor já existente' });
	}

	const autor = {
		id: autores.length + 1,
		nome: nome,
		sobrenome: sobrenome,
		email: email,
		senha: senha,
		deletado: false,
	};

	autores.push(autor);
	response(ctx, 201, autor);
};

const atualizarAutor = (ctx) => {
	const { id = null } = ctx.params;
	const { nome, sobrenome, email, senha } = ctx.request.body;

	if (!nome && !sobrenome && !email && !senha) {
		return response(ctx, 400, 'Pedido mal-formatado');
	}

	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			const autorAtualizado = {
				...autorAtual,
				nome: nome ? nome : autorAtual.nome,
				sobrenome: sobrenome ? sobrenome : autorAtual.sobrenome,
				email: email ? email : autorAtual.email,
				senha: senha ? senha : autorAtual.senha,
			};

			autores[id - 1] = autorAtualizado;

			response(ctx, 200, autorAtualizado);
		} else {
			response(ctx, 404, { message: 'Autor não encontrado' });
		}
	} else {
		response(ctx, 404, { message: 'Autor não encontrado' });
	}
};

const deletarAutor = (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 400, { message: 'Pedido mal-formatado' });
	}

	if (id) {
		const autorAtual = autores[id - 1];
		const postsAutor = posts.filter((post) => post.autor === id);
		if (autorAtual) {
			if (estado === true && postsAutor.length > 0) {
				return response(ctx, 403, { message: 'Ação proibida' });
			}

			const autorDeletado = {
				...autorAtual,
				deletado: estado,
			};

			autores[id - 1] = autorDeletado;

			response(ctx, 200, autorDeletado);
		}
	} else {
		response(ctx, 404, { message: 'Autor não encontrado' });
	}
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
};
