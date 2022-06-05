const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')

//引入dotenv
//需要.env中的哪个就导入哪个
const {
	APP_PORT
} = require('dotenv').config({path: '../.env'})


app.listen(process.env.APP_PORT, () => {
	console.log(`server is running at 127.0.0.1:${process.env.APP_PORT}`)
})