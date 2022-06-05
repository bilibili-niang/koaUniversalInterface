const path = require('path')
const {fileUploadError, unSupportedFileType, publishGoodsError, invalidGoodsID} = require('../constant/err.type')
const {
	createGoods,
	updateGoods,
	removeGoods,
	restoreGoods,
	findGoods
} = require('../service/goods.service')

class GoodsController {
	//上传文件
	async upload (ctx, next) {
		const {file} = ctx.request.files
		const fileTypes = ['image/jpeg', 'image/png']
		if (file) {
			//如果不是fileTypes 中的文件格式,报错:
			if ( ! fileTypes.includes(file.type)) {
				return ctx.app.emit('error', unSupportedFileType, ctx)
			}
			ctx.body = {
				code: 0,
				message: '商品上传成功',
				result: {
					//获取文件最后的文件名:path.basename()
					goods_img: path.basename(file.path)
				}
			}
		} else {
			return ctx.app.emit('error', fileUploadError, ctx)
		}
	}
	
	async create (ctx) {
		//直接调用service的createGoods方法
		try {
			//剩余参数,将createdAt, updateAt之外的参数放在res中
			const {createdAt, updatedAt, ...res} = await createGoods(ctx.request.body)
			ctx.body = {
				code: '0',
				message: '发布商品成功',
				result: res
			}
			
		} catch (e) {
			console.log(e)
			return ctx.app.emit('error', publishGoodsError, ctx)
		}
	}
	
	//更新商品
	async update (ctx) {
		try {
			const res = await updateGoods(ctx.params.id, ctx.request.body)
			if (res) {
				ctx.body = {
					code: 0,
					message: '修改成功',
					result: ''
				}
			} else {
				return ctx.app.emit('error', invalidGoodsID, ctx)
			}
		} catch (e) {
			console.error(e)
		}
	}
	
	//商品下架
	async remove (ctx) {
		const res = await removeGoods(ctx.params.id)
		if (res) {
			ctx.body = {
				code: 0,
				message: '下架商品成功',
				result: ''
			}
		} else {
			return ctx.app.emit('error', invalidGoodsID, ctx)
			/*ctx.body = {
				code: 1,
				message: '下架商品失败',
				result: ''
			}*/
		}
	}
	
	//商品上架
	async restore (ctx) {
		const res = await restoreGoods(ctx.params.id)
		if (res) {
			ctx.body = {
				code: 0,
				message: '上架商品成功',
				result: ''
			}
		} else {
			return ctx.app.emit('error', invalidGoodsID, ctx)
		}
	}
	
	//获取商品列表
	async findAll (ctx) {
		//解析pageNum和pageSize
		//从ctx中结构获取pageNum,pageSize,如果没有,则分别复制为1,10
		const {pageNum = 1, pageSize = 10} = ctx.request.query
		//调用数据处理的相关方法
		const res = await findGoods(pageNum, pageSize)
		//返回结果
		ctx.body = {
			code: 0,
			message: '获取数据成功',
			result: res
		}
	}
}

module.exports = new GoodsController()