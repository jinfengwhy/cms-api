const db = require('../models/db')

exports.list = async (req, res, next) => {
    const {topic_id} = req.query
    const sqlStr = `
        select * from comments where topic_id = '${topic_id}'
    `
    const comments = await db.query(sqlStr)
    // TODO: 处理接收的 topic_id 不存在的情况
    res.status(200).json(comments)
}

exports.create = async (req, res, next) => {
    try {
        // 1. 获取表单数据
        // 2. 操作数据库
        // 3. 发送响应数据
        const {
            content = '',
            topic_id,
            reply_id = 0
        } = req.body
        const sqlStr = `
            insert into comments(content, create_time, modify_time, topic_id, user_id, reply_id) 
            values('${content}', 
            '${Date.now()}', 
            '${Date.now()}', 
            ${topic_id}, 
            ${req.session.user.id},
            ${reply_id})
        `

        // 当进行增删改操作的时候，db.query 方法返回的是一个对象
        // 所以这里我们可以使用解构赋值的方式获取 insertId
        const {insertId} = await db.query(sqlStr)
        // 当执行查询操作的时候，返回的是数组
        // 所以这里可以通过数组解构赋值的方式来拿值
        const [comment] = await db.query(`
            select * from comments where id = ${insertId}
        `)
        res.status(201).json(comment)
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {

}

exports.destroy = async (req, res, next) => {

}
