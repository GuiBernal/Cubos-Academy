const response = (ctx, status, body) => {
	if (status >= 200 && status <= 299) {
		ctx.status = status;
		ctx.body = {
			status: 'sucesso',
			dados: body,
		};
	} else {
		ctx.status = status;
		ctx.body = {
			status: 'erro',
			dados: body,
		};
	}
};

module.exports = response;
