const moment = require('moment')
const db = require('../models/db')

/**
 * 分页话题列表
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.list = async (req, res, next) => {
    try {
        // 对象解构赋值的默认值写法
        let {_page = 1, _limit = 20} = req.query

        if (_page < 1) {
            _page = 1
        }

        if (_limit < 1) {
            _limit = 1
        }

        if (_limit > 20) {
            _limit = 20
        }

        // 分页处理开始的索引
        const start = (parseInt(_page) - 1) * _limit

        const sqlStr = `
            select * from topics limit ${start}, ${_limit}
        `

        const topics = await db.query(sqlStr)
        res.status(200).json(topics)
    } catch (err) {
        next(err)
    }
}

/**
 * 创建话题
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.create = async (req, res, next) => {
    try {
        const body = req.body
        body.create_time = moment().format('YYYY-MM-DD hh:mm:ss')
        body.modify_time = moment().format('YYYY-MM-DD hh:mm:ss')
        body.user_id = req.session.user.id
    
        const sqlStr = `
            insert into topics (title, content, user_id, create_time, modify_time) 
            values(
                '${body.title}', 
                '${body.content}', 
                '${body.user_id}', 
                '${body.create_time}', 
                '${body.modify_time}')
        `
    
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

exports.destroy = async (req, res, next) => {
    // url 中的 :id 叫做动态路由参数
    // 可以通过 req.params 来获取动态路由参数
    // 查询字符串：req.query
    // POST 请求体：req.body
    // 动态路径参数：req.params
    try {
        const {id} = req.params
        const sqlStr = `
            delete from topics where id = ${id}
        `
        await db.query(sqlStr)
        res.status(201).json({})
    } catch (err) {
        next(err)   
    }
}
