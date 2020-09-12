const express = require('express')
const router = express.Router()
const userController = require('./controllers/user')
const topicController = require('./controllers/topic')
const commentController = require('./controllers/comment')
const sessionController = require('./controllers/session')

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
    .post('/topics', topicController.create)
    .patch('/topics/:id', topicController.update)
    .delete('/topics/:id', topicController.destroy) 


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
