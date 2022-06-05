const {
	addrFormatError
} = require('../constant/err.type')

const validator = (rules) => {
	return async (ctx, next) => {
		try {
			await ctx.verifyParams(rules)
		} catch (e) {
			console.log(e)
			addrFormatError.result = e
			return ctx.app.emit('error', addrFormatError, ctx)
		}
		await next()
	}
	
}
module.exports = {
	validator
}