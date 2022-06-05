//导出报错类型
module.exports = {
	userFormateError: {
		code: '10001',
		message: '用户名或密码为空',
		result: ''
	},
	userAlreadyExited: {
		code: '10002',
		message: '用户已经存在',
		result: ''
	},
	userRegisterError: {
		code: '10003',
		message: '用户注册错误',
		result: ''
	},
	userDoesNotExist: {
		code: '10004',
		message: '用户不存在',
		result: ''
	},
	userLoginError: {
		code: '10005',
		message: '用户登录失败',
		result: ''
	},
	invalidPassword: {
		code: '10006',
		message: '密码不匹配',
		result: ''
	},
	TokenExpiredError: {
		//不同的模块报错返回不同的错误码,此处是101开头,表示token报错
		code: '10101',
		message: 'token过期',
		result: ''
	},
	JsonWebTokenError: {
		code: '10101',
		message: 'token无效',
		result: ''
	},
	//授权错误,用户没有管理员权限
	hasNotAdminPermission: {
		code: '10103',
		message: '没有管理员权限',
		result: ''
	},
	//文件上传错误
	fileUploadError: {
		code: '10201',
		message: '商品图片上传失败',
		result: ''
	},
//不支持的文件格式:
	unSupportedFileType: {
		code: '10202',
		message: '不支持的文件格式',
		result: ''
	},
	goodsFormatError: {
		code: '10203',
		message: '商品格式错误',
		result: ''
	},
	//发布商品出错
	publishGoodsError: {
		code: '10204',
		message: '发布商品失败',
		result: ''
	},
	invalidGoodsID: {
		code: '10205',
		message: '无效的商品id',
		result: ''
	},
	cartFormatError: {
		code: '10301',
		message: '购物车数据格式错误',
		result: ''
	},
	addrFormatError: {
		code: '10401',
		message: '地址数据格式错误',
		result: ''
	},
	orderFormatError: {
		code: '10501',
		message: '订单数据格式错误',
		result: ''
	},
	
	
}