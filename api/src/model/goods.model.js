const {
	DataTypes
} = require('sequelize')

const seq = require('../db/seq')

const Goods = seq.define('zd_goods', {
	goods_name: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '商品名称'
	},
	goods_price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
		comment: '商品价格'
	},
	goods_num: {
		type: DataTypes.INTEGER,
		allowNull: false,
		comment: '商品库存'
	},
	goods_img: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '商品图片的url地址'
	}
}, {
	paranoid: true
})

//同步并创建表,强制的
/*Goods.sync({force: true}).then(r => {

})*/

module.exports = Goods