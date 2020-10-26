const database = require('../utils/database');

const mostrarEmail = async (email) => {
	const query = `SELECT * FROM users WHERE email = $1`;
	const result = await database.query({
		text: query,
		values: [email],
	});
	return result.rows;
};

module.exports = {
	mostrarEmail,
};
