const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../../conf/db_info')
const conn = db_info.init()

// router.get('/scroll_post', (req, res) => {
//     let post_count = Number(req.query.count) + 2;
//     // let post_count = 0;
//     let last_post_count = post_count + 2;
//     /*console.log("debug 1 : " + last_post_count)*/
//     let sql = "SELECT * FROM posts WHERE num BETWEEN ? AND ?"
//     conn.query(sql, [post_count, last_post_count], function (err, rows) {
//         if (err) {
//             console.log(err)
//         } else {
//             res.json(rows);
//         }
//         // res.render('./test/test', {'rows': rows})
//     });
// })

router.get('/scroll_post', (req, res) => {
    let post_count = Number(req.query.count) + 2;
    // let post_count = 0;
    let last_post_count = post_count + 2;
    /*console.log("debug 1 : " + last_post_count)*/
    let sql = "SELECT * FROM posts ORDER BY num DESC LIMIT ?, ?"
    conn.query(sql, [post_count, last_post_count], function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.json(rows);
        }
        // res.render('./test/test', {'rows': rows})
    });
})


router.get('/check_exist', (req, res) => {
    let serial_post_id = req.query.serial_post_id.replace(/\s/g, '+');
    let user_id = req.query.id

    let sql = "SELECT exists (SELECT * FROM posts_checks WHERE serial_post_id = ? AND user_id = ?) as check_exist;"

    conn.query(sql, [serial_post_id, user_id], function (err, rows) {
        // console.log(rows[0].check_exist);
        // console.log(typeof(rows[0].check_exist));

        if (rows[0].check_exist === 1) {
            res.json({du_exist: 1})
        } else {
            res.json({du_exist: 0})
        }
        // res.render('./test/test', {'rows': rows})
    });

})

router.get('/checks/plus', (req, res) => {
    let serial_post_id = req.query.serial_post_id.replace(/\s/g, '+');
    let user_id = req.query.user_id.replace(/\s/g, '+');

    /*console.log('==============')
    console.log(serial_post_id);
    console.log(user_id)
    console.log('==============')*/

    let sql = "INSERT INTO posts_checks (serial_post_id, user_id) VALUES (?, ?);";

    let get_sql = "SELECT checks_count FROM posts WHERE serial_post_id = ?"
    let plus_sql = "UPDATE posts SET checks_count = ? WHERE serial_post_id = ?"
    // sql문 2번 돌리기
    // 확인요 db 업데이트
    // 확인요 갯수 posts에 업데이트
    //그리고 axios 에 return
    conn.query(sql, [serial_post_id, user_id], (err, result) => {

        conn.query(get_sql, [serial_post_id], (err, result) => {
            console.log('debug 1: ' + JSON.stringify(result))

            let plus_result = Number(result[0].checks_count) + 1

            conn.query(plus_sql, [plus_result, serial_post_id], (err, result) => {

                conn.query(get_sql, [serial_post_id], (err, result) => {
                    res.json({checks_count: result[0].checks_count})
                })
            })

        })
    })

});

router.get('/checks/minus', (req, res) => {
    let serial_post_id = req.query.serial_post_id.replace(/\s/g, '+');
    let user_id = req.query.user_id.replace(/\s/g, '+');

    /*console.log('==============')
    console.log(serial_post_id);
    console.log(user_id)
    console.log('==============')*/

    let sql = "DELETE FROM posts_checks WHERE serial_post_id = ? AND user_id = ?";

    let get_sql = "SELECT checks_count FROM posts WHERE serial_post_id = ?"
    let plus_sql = "UPDATE posts SET checks_count = ? WHERE serial_post_id = ?"
    // sql문 2번 돌리기
    // 확인요 db 업데이트
    // 확인요 갯수 posts에 업데이트
    //그리고 axios 에 return
    conn.query(sql, [serial_post_id, user_id], (err, result) => {

        conn.query(get_sql, [serial_post_id], (err, result) => {
            console.log('debug 1: ' + JSON.stringify(result))

            let plus_result = Number(result[0].checks_count) - 1

            conn.query(plus_sql, [plus_result, serial_post_id], (err, result) => {

                conn.query(get_sql, [serial_post_id], (err, result) => {
                    res.json({checks_count: result[0].checks_count})
                })
            })

        })
    })

});

router.get('/map_clustering', (req, res) => {
    let x1 = req.query.x1;
    let y1 = req.query.y1;
    let x2 = req.query.x2;
    let y2 = req.query.y2;

    let sql = "SELECT lat, lng FROM posts WHERE (lat BETWEEN ? AND ?) AND (lng BETWEEN ? AND ?) ORDER BY checks_count DESC;"

    conn.query(sql, [y1, y2, x1, x2], (err, result) => {
        res.json({map_clustering: result})
    })
})

module.exports = router;