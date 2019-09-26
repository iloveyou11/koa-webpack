import Koa from 'koa'
const app = new Koa()
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import cors from '@koa/cors';
import koaBody from 'koa-body';
import helmet from "koa-helmet";
import router from './routes'
import mystatic from 'koa-static'
import compose from 'koa-compose'
import compress from 'koa-compress'

const isDev = process.env.NODE_ENV === 'production' ? false : true

// error handler
onerror(app)

// 整合所有中间件
const middlewares = compose([
    helmet(),
    koaBody(),
    cors(),
    bodyparser({
        enableTypes: ['json', 'form', 'text']
    }),
    json(),
    mystatic(__dirname + '/public'),
    views(__dirname + '/views', {
        extension: 'ejs'
    }),
    router()
])

// 生产环境下压缩中间件
if (!isDev) {
    app.use(compress())
}


app.use(middlewares)


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app