const express = require('express')
const router = express.Router()
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
const sessionController = require('./controllers/session')

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
    .post('/topics', checkLogin, topicController.create)
    .patch('/topics/:id', checkLogin, topicController.update)
    .delete('/topics/:id', checkLogin, topicController.destroy) 


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
