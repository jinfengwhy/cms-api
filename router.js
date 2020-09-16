const express = require('express')
const router = express.Router()
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
const sessionController = require('./controllers/session')
const db = require('./models/db')

// 定义中间件 checkLogin，这样需要验证的地方调一下即可
// 只有该中间件验证通过并调用 next，才会走下一个中间件
function checkLogin (req, res, next) {
    // 对象的解构赋值
    const {user} = req.session

    if (!user) {
        // 状态码 401 表示要求用户进行身份验证
        return res.status(401).json({
            err: 'Unauthorized'
        })
    }

    next()
}

async function checkTopic (req, res, next) {
    try {    
        const {id} = req.params
        const [topic] = await db.query(`
            select * from topics where id = ${id}
        `)

        // 如果资源不存在
        if (!topic) {
            return res.status(404).json({
                error: 'Topic not Found.'
            })
        }

        // 如果话题不属于作者自己
        if (topic.user_id !== req.session.user.id) {
            return res.status(400).json({
                error: 'Action Invalid.'
            })
        }
    } catch (err) {
        next(err)
    }

    next()
}

/**
 * 用户资源
 */
router
    .get('/users', userController.list)
    .post('/users', userController.create)
    .patch('/users/:id', userController.update)
    .delete('/users/:id', userController.destroy)


/**
 * 话题资源
 */
router
    .get('/topics', topicController.list)
    // 同一个请求对应多个路由中间件
    .post('/topics', checkLogin, topicController.create)
    // 登录校验成功后，接下来是话题相关的校验
    .patch('/topics/:id', checkLogin, checkTopic, topicController.update)
    .delete('/topics/:id', checkLogin, checkTopic, topicController.destroy) 


/**
 * 评论资源
 */
router
    .get('/comments', commentController.list)
    .post('/comments', commentController.create)
    .patch('/comments/:id', commentController.update)
    .delete('/comments/:id', commentController.destroy)


/**
 * 会话管理
 */
router
    .get('/session', sessionController.get)
    .post('/session', sessionController.create)
    .delete('/session', sessionController.destroy)

    
module.exports = router
