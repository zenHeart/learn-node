const Koa = require('koa');
const app = new Koa();
const pug = require('pug');


// response
app.use(ctx => {

    ctx.body = pug.renderFile(__dirname+'/index.pug');
});

app.listen(3000);