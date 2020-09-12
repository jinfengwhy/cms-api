const md5 = require('blueimp-md5')
const session = require('express-session')
const db = require('../models/db')

/**
 * 获取会话状态
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.get = (req, res, next) => {
    const {user} = req.session
    if (!user) {
        res.status(401).json({
            error: 'Unauthorized'
        })
    }
    res.status(200).json(user)
}

/**
 * 创建会话：用户登录
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = async (req, res, next) => {
    // 接收表单请求
    // 操作数据库处理登录请求
    // 发送响应
    try {
        const body = req.body
        body.password = md5(md5(body.password))

        const sqlStr = `select * from users where email = '${body.email}' and password = '${body.password}'`
        const [user] = await db.query(sqlStr)

        if (!user) {
            return res.status(404).json({
                error: 'Invalid email or password!'
            })
        }

        // 登录成功，记录 Session
        req.session.user = user
        
        // 发送响应
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

/**
 * 注销登录
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.destroy = (req, res, next) => {
    delete req.session.user
    res.status(201).json({})
}
