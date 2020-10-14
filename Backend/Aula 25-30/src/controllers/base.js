const autor = {
	id: 1,
	nome: 'Nícolas',
	sobrenome: 'Deçordi',
	email: 'nicolas.decordi@cubos.io',
	senha: '102030',
	deletado: false,
};

const post = {
	id: 1,
	titulo: 'Como se tornar uma dev Back-end',
	subtitulo: 'Os passos listados...',
	conteudo: 'Os passos para se tornar uma dev Back-end são 3...',
	autor: 1,
	publicado: false,
	deletado: false,
};

const autores = [];
autores.push(autor);

const posts = [];
posts.push(post);

module.exports = { autores, posts };
