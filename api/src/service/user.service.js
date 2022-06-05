const user = require('../model/user.model')

//数据库控制访问层
class UserService {
	async createUser (user_name, password) {
		//todo:写入数据库
		//插入数据:
		/*const res = user.create({
			user_name: user_name,
			password: password
		})*/
		//上面代码可以简写为:
		const res = user.create({
			user_name,
			password
		})
		// console.log('res.dataValues: ')
		// console.log(res)
		return res
	}
	
	async getUserInfo ({id, user_name, password, is_admin}) {
		const whereOpt = {}
		id && Object.assign(whereOpt, {id})
		user_name && Object.assign(whereOpt, {user_name})
		password && Object.assign(whereOpt, {password})
		is_admin && Object.assign(whereOpt, {is_admin})
		const res = await user.findOne({
			attributes: ['id', 'user_name', 'password', 'is_admin'],
			where: whereOpt
		})
		return res ? res.dataValues : null
	}
	
	async updateById ({id, user_name, password, is_admin}) {
		const whereOpt = {id}
		const newUser = {}
		user_name && Object.assign(newUser, {user_name})
		password && Object.assign(newUser, {password})
		is_admin && Object.assign(newUser, {is_admin})
		//更新
		const res = await user.update(newUser, {
			where: whereOpt
		})
		// return res[0] > 0 ? true : false
		return res[0] > 0
	}
}

module.exports = new UserService()