const response = require('./response');
const Jogos = require('../repositories/jogos');

const classificar = async () => {
	const table = await Jogos.mostrarJogos();

	const times = table.map((x) => x.time_casa);
	const timesUnico = times.filter((x, i) => times.indexOf(x) === i);
	const classificacao = timesUnico.map((time) => {
		let vitoria = 0;
		let empate = 0;
		let derrota = 0;
		let golfeito = 0;
		let golsofrido = 0;
		let golsaldo = 0;
		let pj = 0;
		let pontos = 0;
		for (let i = 0; i < table.length; i++) {
			const partida = table[i];
			if (time === partida.time_casa) {
				golfeito += partida.gols_casa;
				golsofrido += partida.gols_visitante;
				if (partida.gols_casa > partida.gols_visitante) {
					vitoria += 1;
				} else if (partida.gols_casa < partida.gols_visitante) {
					derrota += 1;
				} else {
					empate += 1;
				}
				pj += 1;
			}
			if (time === partida.time_visitante) {
				golfeito += partida.gols_visitante;
				golsofrido += partida.gols_casa;
				if (partida.gols_casa < partida.gols_visitante) {
					vitoria += 1;
				} else if (partida.gols_casa > partida.gols_visitante) {
					derrota += 1;
				} else {
					empate += 1;
				}
				pj += 1;
			}
		}
		golsaldo += golfeito - golsofrido;
		pontos = vitoria * 3 + empate;
		return {
			time,
			pontos,
			partidasjogadas: pj,
			vitoria,
			empate,
			derrota,
			golfeito,
			golsofrido,
			golsaldo,
		};
	});
	const classi = await Jogos.classificar(classificacao);
	return console.log(classi);
};

module.exports = {
	classificar,
};
