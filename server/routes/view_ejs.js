const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

router.get('/', (req, res) => {
    if (req.user) {
        // let sql = "SELECT * FROM posts WHERE num BETWEEN 1 AND 3"
        let sql = "SELECT * FROM posts ORDER BY num DESC LIMIT 0, 3"

        conn.query(sql, function (err, rows) {
            if (err) console.log(err);
            res.render('./index', {'user': req.user, 'first_post': rows});
        })
    } else {
        res.render('./index');
    }
})

router.get('/map', (req, res) => {
    if (req.user) {
        res.render('./maps/map', {'user': req.user});
    } else {
        res.render('./maps/map');
    }
})

router.get('/user/my_page', (req, res) => {

    if (req.user) {
        res.render('./passport/my_page', {'user': req.user});
    } else {
        res.render('./passport/my_page');
    }
})

router.get('/user/register', (req, res) => {
    res.render('./passport/register', {'user': req.user});
})

router.get('/test', (req, res) => {
    res.render('./test/test');
})

router.get('/user/login', (req, res) => {
    let err = req.flash('error')
    let user = req.user

    res.render('./passport/login', {'errMsg': err, 'user': user});
})

module.exports = router