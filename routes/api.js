const router = require('koa-router')()

router.prefix('/api')

router.get('/', async(ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/string', async(ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async(ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

router.post('/user', async(ctx, next) => {
    const name = ctx.request.body.name || ''
    const email = ctx.request.body.email || ''
    const role = ctx.request.headers.role || ''

    if (name && email && role === 'admin') {
        ctx.body = {
            code: 200,
            data: {
                name,
                email
            },
            msg: '上传成功'
        }
    } else {
        ctx.body = {
            code: 401,
            msg: 'unauthorized post'
        }
    }
})

module.exports = router