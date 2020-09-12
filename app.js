const express = require('express')
const router = require('./router')

const app = express()

// 把路由应用到 app 中
app.use(router)

app.listen(3000, () => {
    console.log('App is running at port 3000')
    console.log('Please visit http://127.0.0.1:3000')
})