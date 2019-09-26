const combineRouters = require('koa-combine-routers')

const apiRouter = require('./api')
const userRouter = require('./users')

const router = combineRouters(
    apiRouter,
    userRouter
)

module.exports = router