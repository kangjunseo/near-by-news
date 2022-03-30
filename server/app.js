const express = require('express');
const app = express()

app.disable('x-powered-by')

//모듈
const path = require('path'), favicon = require('serve-favicon')

//db 정보
const db_info = require('../conf/db_info')

//passport
const passport = require('passport')


//session
const session = require('express-session')
const mysqlStore = require('express-mysql-session')(session)
const flash = require('connect-flash')

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(session({
    secret: 'session key',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(db_info.db_info),
    cookie: {maxAge: 1000 * 60 * 60} // 1시간
    /*cookie: {expire: 20000, maxAge: 20000} // 1분*/
    /*cookie: {maxAge: 1000 * 60 * 60} // 1시간*/
}))

// favicon 설정
app.use(favicon(path.join(__dirname, '../src/images/logo', 'logo.ico')));

require('./routes/user_handling/passport')(passport)

//src 파일 경로
app.use('/src', express.static(path.join(__dirname, '../src')))
//express.static을 사용하는 src 경로 설정같은건 passport session 앞에 사용해야됨.


app.use(passport.initialize()) //passport를 사용하도록 설정
app.use(passport.session()) // passport 사용 시 session을 활용
app.use(flash())


//ejs 사용
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs') //ejs 사용

//views 파일 라우터
const view_router = require('./routes/view_ejs')
app.use('/', view_router);

//user 이벤트 관리 라우터
const user_events = require('./routes/user_handling/user_events')
app.use('/user_api', user_events)

//post 이벤트 관리 라우터
const post_events = require('./routes/user_handling/post_events')
app.use('/post_api', post_events)

//더미 값
const dummy = require('./routes/dummy')
app.use('/dummy', dummy)

app.listen(3003, () => {
    console.log(`Example app listening at http://localhost:3003`)
})

module.exports = app