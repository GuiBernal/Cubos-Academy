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

const listarRodada = async (id) => {
	const query = `SELECT * FROM jogos WHERE rodada = $1`;
	const result = await database.query({
		text: query,
		values: [id],
	});
	return result.rows;
};

const atualizarJogos = async (id, golsCasa, golsVisitante) => {
	const query = {
		text: `UPDATE jogos SET gols_casa = $1, gols_visitante = $2 WHERE id = $3 RETURNING *`,
		values: [golsCasa, golsVisitante, id],
	};
	const result = await database.query(query);
	return result.rows;
};

module.exports = {
	atualizarJogos,
	mostrarJogos,
	classificar,
	listarRodada,
	mostrarClassificacao,
};
