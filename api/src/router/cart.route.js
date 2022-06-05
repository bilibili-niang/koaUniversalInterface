// 购物车路由
const Router = require('koa-router')

const {
	add,
	findAll,
	update,
	remove,
	selectedAll,
	unSelectAll
} = require('../controller/cart.controller')

//中间件
const {
	auth
} = require('../middleware/auth.middleware')

const {
	validator
} = require('../middleware/cart.middleware')

//控制器
const router = new Router({
	prefix: '/carts'
})

//添加到购物车
router.post('/', auth, validator({goods_id: 'number'}), add)

//获取购物车列表
router.get('/', auth, findAll)

//更新购物车
router.patch('/:id', auth, validator({
		number: {
			type: 'number',
			required: false
		},
		selected: {
			type: 'bool',
			required: false
		}
	}),
	update)

//删除购物车接口
router.delete('/', auth, validator({
	ids: 'array'
}),remove)

//全选接口
router.post('/selectAll',auth,selectedAll)

//全部取消选择
router.post('/unSelectAll',auth,unSelectAll)


module.exports = router