const jwt = require('jsonwebtoken')
//按需解构导入
const {
	createUser,
	getUserInfo,
	updateById
} = require('../service/user.service')
const {
	userRegisterError
} = require('../constant/err.type')

const {
	JWT_SECRET
} = require('../config/config.default')

class UserController {
	async register (ctx, next) {
		try {
			//TODO: 1.获取数据
			// console.log(ctx.request.body)
			const {user_name, password} = ctx.request.body
			// console.log(user_name, password)
			// console.log(res)
			//TODO: 2.操作数据库
			const res = await createUser(user_name, password)
			//TODO: 3.返回结果
			ctx.body = {
				code: 0,
				message: '用户注册成功',
				result: {
					id: res.id,
					user_name: res.user_name,
				}
			}
		} catch (e) {
			console.log(e)
			ctx.app.emit('error', userRegisterError, ctx)
		}
	}
	
	// 登录
	async login (ctx, next) {
		const {user_name} = ctx.request.body
		ctx.body = `${user_name} login success`
		//	1.获取用户信息(token的playload中需要记录id,user_name,is_admin)
		try {
			/*
			下面的解构赋值是将password储存,并将剩下的数据提取到resUser中
			es6中的剩余参数,从返回结果对象中剔除password属性
			* */
			const {password, ...res} = await getUserInfo({user_name})
			ctx.body = {
				code: 0,
				message: '用户登录成功',
				result: {
					token: jwt.sign(
						res, JWT_SECRET, {
							//设置过期时间,这里设置的过期时间是1天
							expiresIn: '1d'
						}
					),
				},
			}
		} catch (e) {
			console.error('用户登录失败', e)
		}
	}

//	修改密码:
	async changePassword (ctx, next) {
		console.log('修改密码class')
		//  1.获取数据
		const id = ctx.state.user.id
		const password = ctx.request.body.password
		console.log(id)
		console.log(password)
		
		if (await updateById({id, password})) {
			ctx.body = {
				code: 0,
				message: '修改密码成功',
				result: ''
			}
		} else {
			ctx.body = {
				code: '10007',
				message: '修改密码失败',
				result: ''
			}
		}
		
		/*ctx.body = {
			code: 0,
			message: '用户修改密码ing'
		}*/
		//	2.操作数据库
		//	3.返回结果
		
		await next()
	}
}

module.exports = new UserController()
