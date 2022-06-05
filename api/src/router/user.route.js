const Router = require('koa-router')
const {
	userValidator,
	verifyUser,
	cryptPassword,
	verifyLogin
} = require('../middleware/user.middleware')

const {
	login,
	register,
	changePassword
} = require('../controller/user.controller')

const {
	auth,
} = require('../middleware/auth.middleware')

const router = new Router({prefix: '/users'})

// 下面中的路径会和上面的/users中的路劲进行拼接
/*router.get('/', (ctx, next) => {
	ctx.body = 'hello user'
})*/

//注册接口
//先使用 userValidator 中间件去验证,如果验证通过了,那么再传递给后面的中间件
//第一步 userValidator 验证格式,vertifyuser 判断用户是否被注册,register 存入数据
router.post('/register', userValidator, verifyUser, cryptPassword, register)

//登录
router.post('/login', userValidator, verifyLogin, login)

//修改密码:
router.patch('/', auth, cryptPassword, changePassword, (ctx, next) => {
	// console.log(ctx.state.user)
	ctx.body = '修改密码成功'
})

module.exports = router