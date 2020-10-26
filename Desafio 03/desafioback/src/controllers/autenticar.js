const response = require('./response');
const crypt = require('../utils/password');
const Auth = require('../repositories/autenticar');

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;
	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Mal formatado' });
	}
	const result = await Auth.mostrarEmail(email);
	if (result.length > 0) {
		if (result[0].email === email) {
			const comparison = await crypt.check(senha, result[0].senha);
			if (comparison) {
				return response(ctx, 200, { mensagem: 'Sucesso' });
			}
			return response(ctx, 400, { mensagem: 'Senha inválida' });
		}
		return response(ctx, 404, { mensagem: 'Email inválido' });
	}
	return response(ctx, 404, { mensagem: 'Não encontrado' });
};

module.exports = { autenticar };
