const {Sequelize} = require('sequelize')
const {
	MYSQL_PORT,
	MYSQL_USER,
	MYSQL_PWD,
	MYSQL_DB,
	MYSQL_HOST
} = require('../config/config.default')
//实例化对象
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
	host: MYSQL_HOST,
	dialect: 'mysql',
	port: MYSQL_PORT
})

async function test () {
	try {
		await seq.authenticate()
		console.log('数据库连接成功')
	} catch (error) {
		console.error('数据库连接失败:  ', error)
	}
}


// test()
module.exports = seq