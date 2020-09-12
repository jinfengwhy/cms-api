const md5 = require('blueimp-md5')
const moment = require('moment')
const db = require('../models/db')

exports.list = (req, res, next) => {
    res.send('test code.')
}

exports.create = async (req, res, next) => {
    const body = req.body

    const sqlStr = 
        `insert into users (username, password, email, nickname, avatar, gender, create_time, modify_time)
            values(
                '${body.email}',
                '${md5(md5(body.password))}',
                '${body.email}',
                '${body.nickname}',
                'default-avatar.png',
                0,
                '${moment().format('YYYY-MM-DD hh:mm:ss')}',
                '${moment().format('YYYY-MM-DD hh:mm:ss')}'
            )
        `

    try {
        // 我们把容易出错的代码放到 try-catch 代码块中
        // try 中的代码一旦出错，会立即进入 catch 代码块
        const ret = await db.query(sqlStr)
        const users = await db.query(`select * from users where id = ${ret.insertId}`)
        res.status(201).json(users[0])
    } catch (err) {
        res.status(500).json({
            error: err.message
        })    
    }
}

exports.update = (req, res, next) => {

}

exports.destroy = (req, res, next) => {

}
