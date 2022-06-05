const Goods = require('../model/goods.model')

class GoodsService {
	async createGoods (goods) {
		const res = await Goods.create(goods)
		return res.dataValues
	}
	
	async updateGoods (id, goods) {
		const res = await Goods.update(goods, {where: {id}})
		return res[0] > 0 ? true : false
	}
	
	async removeGoods (id) {
		const res = await Goods.destroy({where: {id}})
		return res == 1 ? true : false
	}
	
	//商品上架
	async restoreGoods (id) {
		const res = await Goods.restore({where: {id}})
		return res == 1 ? true : false
	}
	
	//获取商品列表
	async findGoods (pageNum, pageSize) {
		//获取总数
		// const count = await Goods.count()
		//获取分页的具体数据
		//offset:偏移量,limit:每页显示多少条
		// const offset = (pageNum - 1) * pageSize
		//隐式转换,*1,将其转为数值
		/*const rows = await Goods.findAll({
			offset: offset, limit: pageSize * 1
		})*/
		
		const offset = (pageNum - 1) * pageSize
		const {count, rows} = await Goods.findAndCountAll({offset: offset, limit: pageSize * 1})
		
		return {
			pageNum,
			pageSize,
			total: count,
			list: rows
		}
	}
}


module.exports = new GoodsService()