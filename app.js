const express = require('express')
const session = require('express-session')
const cookie = require('cookie-parser')
const path = require('path')
const loginRouter = require('./routes/login')
const authRouter = require('./routes/auth')
const app =  express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(cookie())
app.use(session({
    secret:"mysession",
    resave:false,
    saveUninitialized:false
}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/',loginRouter)
app.use('/auth',authRouter)

app.listen(8080,()=>{
    console.log("Server at 8080 port");
})