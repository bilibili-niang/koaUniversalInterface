const Order = require('../model/order.model')

class OrderService {
	async createOrder (order) {
		console.log(order)
		return Order.create(order)
	}
	
	async findAllOrders (pageNum, pageSize, states) {
		console.log('数据库查询function')
		const {count, rows} = await Order.findAndCountAll({
			attributes: ['goods_info', 'total', 'order_number', 'states'],
			where: {
				states,
			},
			offset: (pageNum - 1) * pageSize,
			limit: pageSize * 1
		})
		
		console.log('数据库查询')
		console.log(count, rows)
		return {
			pageNum, pageSize, total: count, list: rows
		}
	}
	
	async updateOrder (id, status) {
		return await Order.update({states: status}, {where: {id}})
		
	}
}

module.exports = new OrderService()