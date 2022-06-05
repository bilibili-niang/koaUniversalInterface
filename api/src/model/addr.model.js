const {
	DataTypes
} = require('sequelize')

const seq = require('../db/seq')

const Addr = seq.define('zd_addr', {
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		comment: '用户的id'
	},
	consignee: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '收货人姓名'
	},
	phone: {
		type: DataTypes.CHAR(11),
		allowNull: false,
		comment: '收货人电话'
	},
	address: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '收货人地址',
	},
	is_default: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
		comment: '是否为默认地址,0:不是(\'默认值)1:是',
	}
	
})

// Addr.sync({force: true})

module.exports = Addr