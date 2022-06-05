const {orderFormatError} = require('../constant/err.type')

const validator = (rules) => {
	return async (ctx, next) => {
		try {
			ctx.verifyParams(rules)
		} catch (e) {
			orderFormatError.result = e
			return ctx.app.emit('error', orderFormatError, ctx)
		}
		await next()
	}
}

module.exports = {
	validator
}