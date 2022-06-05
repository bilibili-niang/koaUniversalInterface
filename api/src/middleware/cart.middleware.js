const {
	invalidGoodsID,
	cartFormatError
} = require('../constant/err.type')

//闭包,传入的是规则,返回的是函数
const validator = (rules) => {
	return async (ctx, next) => {
		try {
			ctx.verifyParams(rules)
		} catch (e) {
			console.error(e)
			cartFormatError.result = e
			return ctx.app.emit('error', cartFormatError, ctx)
		}
		await next()
	}
}

module.exports = {
	validator
}