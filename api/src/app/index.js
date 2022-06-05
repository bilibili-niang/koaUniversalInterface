const koa = require('koa')
//user路由
// const userRouter = require('../router/user.route')
//商品路由
// const goodsRouter = require('../router/goods.route')
const router = require('../router')

const koaBody = require('koa-body')
const koaStatic = require('koa-static')
//参数校验
const parameter = require('koa-parameter')


const app = new koa()
const errHandler = require('./errHadnler')
const path = require('path')

app.use(koaBody({
	multipart: true,
	formidable: {
		//设置保存文件的路径
		//在配置选项的option里,这里不推荐写相对路径
		//在option里的相对路径,不是相对的当前文件,而是相对于process.cwd()(脚本在哪里执行,相对于哪个路径)
		
		//也可以相对于服务器的相对路径:
		// uploadDir: './src/upload',
		
		//一般这里使用绝对路径
		uploadDir: path.join(__dirname, '../upload'),
		//是否保留文件扩展名
		keepExtensions: true,
	},
	parsedMethods:['POST','PUT','PATCH','DELETE'],
}))

app.use(parameter(app))

//开放静态资源路径
app.use(koaStatic(path.join(__dirname, '../upload')))
//挂载
app.use(router.routes())

//注册中间件
/*app.use(userRouter.routes())
app.use(goodsRouter.routes())*/


//统一的错误处理:
app.on('error', errHandler)

// 导出:
module.exports = app