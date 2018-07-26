const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const app = new Koa();
const router = new Router();
const io = require('socket.io')(app);

const members = [];

function createUser(name) {
    return {
        id: parseInt(Math.random() * 10000),
        name,
    };
}

router.get('/login/:name', async (ctx, next) => {
    if (members.length < 8) {
        const user = createUser(ctx.params.name);
        members.push(user);
        ctx.body = user;
    } else {
        ctx.body = {};
    }
    await next();
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(static(__dirname + '/static'));
app.listen(3000, () => {
    console.log('app running');
})
