/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
const database = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS classificacao (
        time TEXT,
		pontos INT,
		partidasjogadas INT,
		vitoria INT,
        empate INT,
        derrota INT,
        golfeito INT,
        golsofrido INT,
        golsaldo INT
    );`,
};

const drop = async (table) => {
	if (table) {
		await database.query(`DROP TABLE ${table}`);
	}
};
const up = async (number = null) => {
	if (number) {
		await database.query({ text: schema[number] });
	} else {
		for (const value in schema) {
			await database.query({ text: schema[value] });
		}
	}
};

// drop('classificacao');
// up();

module.exports = { drop, up };
