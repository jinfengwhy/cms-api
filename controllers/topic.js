const moment = require('moment')
const db = require('../models/db')

exports.list = (req, res, next) => {

}

/**
 * 创建话题
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = async (req, res, next) => {
    // 对象的解构赋值
    const {user} = req.session
    
    if (!user) {
        // 状态码 401 表示要求用户进行身份验证
        return res.status(401).json({
            err: 'Unauthorized'
        })
    }

    const body = req.body
    body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
    body.user_id = user.id

    const sqlStr = `
        insert into topics (title, content, user_id, create_time, modify_time) 
        values(
            '${body.title}', 
            '${body.content}', 
            '${body.user_id}', 
            '${body.create_time}', 
            '${body.modify_time}')
    `

    try {
        const ret = await db.query(sqlStr)
        // 数组的解构赋值
        const [topic] = await db.query(`select * from topics where id = ${ret.insertId}`)
        // 201 状态码表示 成功请求并创建了新的资源
        res.status(201).json(topic)
    } catch (err) {
        next(err)
    }
}

exports.update = (req, res, next) => {

}

exports.destroy = (req, res, next) => {

}
