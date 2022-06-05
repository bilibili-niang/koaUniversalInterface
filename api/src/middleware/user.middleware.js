const bcrypt = require('bcryptjs')

const {
	getUserInfo,
	createUser
} = require('../service/user.service')

const {
	userFormateError,
	userAlreadyExited,
	userRegisterError,
	userDoesNotExist,
	userLoginError,
	invalidPassword
} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
	const {user_name, password} = ctx.request.body
	//	合法性
	if ( ! user_name || ! password) {
		console.error('用户名或密码为空')
		//bed request
		ctx.app.emit('error', userFormateError, ctx)
		return
	}
	await next()
}

const verifyUser = async (ctx, next) => {
	const {user_name} = ctx.request.body
	//	合理性
	/*
	注意如果下面这个放 getUserInfo({user_name}) 则会恒为真,因为如果没有加上await,则返回的是个对象,
	加上await之后,它返回的是一个正常的值
	* */
	/*	if (await getUserInfo({user_name})) {
			ctx.app.emit('error', userAlreadyExited, ctx)
			return
		}*/
	try {
		const res = await getUserInfo({user_name})
		if (res) {
			// console.log('用户名已存在', {user_name})
			ctx.app.emit('error', userAlreadyExited, ctx)
			return
		}
	} catch (e) {
		console.log('获取用户信息错误', e)
		// ctx.app.emit('error', userRegisterError, ctx)
		return
	}
	//放行
	await next()
}

//注册:
const register = async (ctx, next) => {
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
}

//密码加盐
const cryptPassword = async (ctx, next) => {
	const {password} = ctx.request.body
	const salt = bcrypt.genSaltSync(10)
	// bcrypt.hashSync(password, salt) 保存的是密文
	ctx.request.body.password = bcrypt.hashSync(password, salt)
	await next()
}
//验证登录
const verifyLogin = async (ctx, next) => {
//	1.根据用户名查询用户是否存在,不存在则报错:
	const {user_name, password} = ctx.request.body
	try {
		const res = await getUserInfo({user_name})
		if ( ! res) {
			// console.error('用户名不存在', {user_name})
			ctx.app.emit('error', userDoesNotExist, ctx)
			return
		}
		//	2.比对密码,不匹配则报错
		if ( ! bcrypt.compareSync(password, res.password)) {
			//用户密码不匹配
			ctx.app.emit('error', invalidPassword, ctx)
			return
		}
	} catch (e) {
		// console.error(e)
		return ctx.app.emit('error', userLoginError, ctx)
	}
	//对比密码是否匹配
	await next()
}
module.exports = {
	userValidator,
	verifyUser,
	// register,
	cryptPassword,
	verifyLogin
}

