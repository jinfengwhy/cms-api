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
    .get('/users', userController.query)
    .post('/users', userController.new)
    .patch('/users/:id', userController.update)
    .delete('/users/:id', userController.delete)


/**
 * 话题资源
 */
router
    .get('/topics', topicController.query)
    .post('/topics', topicController.new)
    .patch('/topics/:id', topicController.update)
    .delete('/topics/:id', topicController.delete) 


/**
 * 评论资源
 */
router
    .get('/comments', commentController.query)
    .post('/comments', commentController.new)
    .patch('/comments/:id', commentController.update)
    .delete('/comments/:id', commentController.delete)


/**
 * 会话管理
 */
router
    .get('/session', sessionController.get)
    .post('/session', sessionController.create)
    .delete('/session', sessionController.delete)
