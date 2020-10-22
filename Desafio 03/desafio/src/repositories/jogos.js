const database = require('../utils/database');

const mostrarJogos = async () => {
	const queryJogos = `SELECT * FROM jogos`;
	const resultJogos = await database.query({
		text: queryJogos,
	});
	return resultJogos.rows;
};

const mostrarClassificacao = async () => {
	const queryJogos = `SELECT * FROM classificacao`;
	const resultJogos = await database.query({
		text: queryJogos,
	});
	return resultJogos.rows;
};

const classificar = async (partidas) => {
	for (let i = 0; i < partidas.length; i++) {
		const partida = partidas[i];
		const queryClassificacao = {
			text: `INSERT INTO classificacao (
				time,
				pontos,
				partidasjogadas,
				vitoria,
				empate,
				derrota,
				golfeito,
				golsofrido,
				golsaldo
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
			values: [
				partida.time,
				partida.pontos,
				partida.partidasjogadas,
				partida.vitoria,
				partida.empate,
				partida.derrota,
				partida.golfeito,
				partida.golsofrido,
				partida.golsaldo,
			],
		};
		database.query(queryClassificacao);
	}
	return mostrarClassificacao();
};

module.exports = {
	mostrarJogos,
	classificar,
};
