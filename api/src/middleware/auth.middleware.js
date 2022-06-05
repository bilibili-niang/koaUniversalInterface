//用户权限的中间件
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const {
	TokenExpiredError,
	JsonWebTokenError,
	hasNotAdminPermission
} = require('../constant/err.type')


const auth = async (ctx, next) => {
	const {authorization} = ctx.request.header
	const token = authorization.replace('Bearer ', '')
	try {
		//user中就包含了playload的信息(id,user_name,is_admin)
		const user = jwt.verify(token, JWT_SECRET)
		ctx.state.user = user
	} catch (e) {
		switch (e.name) {
			case 'TokenExpiredError':
				// console.error('token 已过期', e)
				console.error('token 已过期')
				return ctx.app.emit('error', TokenExpiredError, ctx)
			case 'JsonWebTokenError':
				// console.error('token 无效', e)
				console.error('token 无效')
				return ctx.app.emit('error', JsonWebTokenError, ctx)
		}
	}
	await next()
}

const changePassword = async (ctx, next) => {

}
//授权
const hadAdminPermission = async (ctx, next) => {
	const {is_admin} = ctx.state.user
	if ( ! is_admin) {
		console.log('该用户没有管理员权限', ctx.state.user)
		return ctx.app.emit('error', hasNotAdminPermission, ctx)
	}
	await next()
}


module.exports = {
	auth,
	changePassword,
	hadAdminPermission
}