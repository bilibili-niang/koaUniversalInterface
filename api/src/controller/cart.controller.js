const {
	createOrUpdate,
	findCarts,
	updateCarts,
	removeCarts,
	selectAllCarts,
	unSelectAllCarts
} = require('../service/cart.service')
const {cartFormatError} = require('../constant/err.type')

class CartController {
	async add (ctx) {
		//	将商品添加到购物车
		ctx.body = '购物车控制器'
		//	1.解析对应数据
		const user_id = ctx.state.user.id
		const goods_id = ctx.request.body.goods_id
		
		// console.log(user_id,goods_id)
		
		//	2.操作数据库
		const res = await createOrUpdate(user_id, goods_id)
		//	3.返回结果
		ctx.body = {
			code: 0,
			message: '添加到购物车成功',
			result: res
		}
	}

	//获取购物车列表
	async findAll (ctx) {
		//	解析参数
		const {pageNum = 1, pageSize = 10} = ctx.request.query
		//	操作数据库
		const res = await findCarts(pageNum, pageSize)
		
		ctx.body = {
			code: 0,
			message: '获取成功',
			result: res
		}
		
		//	返回结果
		
	}

	//更新购物车
	async update (ctx) {
		//	解析参数
		const {id} = ctx.request.params
		const {number, selected} = ctx.request.body
		if (number === undefined && selected === undefined) {
			cartFormatError.message = 'number和selected不能同时为空'
			return ctx.app.emit('error', cartFormatError, ctx)
		}
		//	操作数据库
		const res = await updateCarts({id, number, selected})
		ctx.body = {
			code: 0,
			message: '更新购物车成功',
			result: res
		}
		
		//	返回数据
		
		
	}

	//购物车删除
	async remove (ctx) {
		const {ids} = ctx.request.body
		const res = await removeCarts(ids)
		ctx.body = {
			code: 0,
			message: '删除购物车成功',
			result: res
		}
	}

	//全选
	async selectedAll (ctx) {
		const user_id = ctx.state.user.id
		const res = await selectAllCarts(user_id)
		ctx.body = {
			code: 0,
			message: '全部选中',
			result: res
		}
	}

	//全部取消选择
	async unSelectAll(ctx){
		const user_id = ctx.state.user.id
		const res = await unSelectAllCarts(user_id)
		ctx.body = {
			code: 0,
			message: '全部选中',
			result: res
		}
	}
}

module.exports = new CartController()