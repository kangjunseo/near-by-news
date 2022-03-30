const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

//passport
const passport = require('passport')

//fs
const fs = require('fs');
const path = require('path');

//multer
const multer = require('multer')

//posts
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../../../src/images/contents')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + '_' + file.originalname.replace(/(\s*)/g, ""))
    }
})
const upload = multer({storage: storage})

//my_page
const my_page_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '../../../../src/images/profile')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + '_' + file.originalname.replace(/(\s*)/g, ""))
    }
})
const my_page_upload = multer({storage: my_page_storage})

// /user_pai/register가 아닌 /register로 하기.
router.post('/register', function (req, res, next) {

    let name = req.body.register_name // 포스트 방식은 body, get 방식은 query
    let email = req.body.register_email
    let id = req.body.register_id
    let password = req.body.register_password

    // 암호화
    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, buf.toString("base64"), 100, 64, 'sha512', (err, key) => {
            let de_password = key.toString("base64")
            let user_salt = buf.toString("base64")

            let user_regi = [name, email, id, '[null, null, null]', de_password, user_salt]

            //email_exist와 id_exist에 각각 데이터가 존재하면 1이 반환됨. 없을 시 0
            let check_email_sql = "select EXISTS (SELECT * FROM user_info where user_email=? limit 1) as email_exist;" +
                "select EXISTS (SELECT * FROM user_info where user_id=? limit 1) as id_exist;"

            conn.query(check_email_sql, [email, id], function (err, result) {
                if (result[0][0].email_exist === 1 && result[1][0].id_exist === 1) {
                    res.render('./passport/register', {
                        'err_email': 'The Email already exists.\n',
                        'err_id': 'The ID already exists.\n'
                    })
                } else if (result[1][0].id_exist === 1) {
                    res.render('./passport/register', {'err_id': 'The ID already exists.'})
                } else if (result[0][0].email_exist === 1) {
                    res.render('./passport/register', {'err_email': 'The Email already exists.'})
                } else {
                    let sql = "INSERT INTO user_info (user_name, user_email, user_id, user_interest_areas, user_pwd, user_salt) VALUES (?, ?, ?, ?, ?, ?)";

                    conn.query(sql, user_regi, function (err, result) {
                        if (err) {
                            console.log('query is not excuted. insert fail...\n' + err);
                        } else {
                            console.log('User ### ' + id + ' ### Register!')
                            res.render('./passport/login')
                            // res.render('./passport/regi_success', {'email': email, 'id': id, 'name': name,})
                        }
                    });
                }
            })
        })
    })
});

router.post('/login', passport.authenticate('local-login', {
    // successRedirect: '/api/user/login_success',
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}))

router.get('/logout', function (req, res) {
    if (!req.user) {
        /*alert('There is no session.')*/
        res.redirect('/');
    } else {
        req.session.destroy((err) => {
            if (err) {
                /*alert('There is no session.')*/
                res.redirect('/');
            } else {
                console.log(req.user.name + " LOG OUT")
                res.redirect('/');
            }
        });
    }
})

router.post('/upload/post', upload.array('upload_photos'), (req, res) => {
    const now = new Date();
    let year = now.getFullYear()
    let month = Number(now.getMonth()) + 1
    let date = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()

    const post_date = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second

    let user_name = req.body.user_name
    let user_id = req.body.user_id
    let profile_img = req.body.profile_img
    let post_tag = req.body.post_tag // 포스트 방식은 body, get 방식은 query
    let what_happened_textarea = req.body.what_happened_textarea // 포스트 방식은 body, get 방식은 query

    let upload_place = req.body.upload_place;
    let upload_coordinate = req.body.upload_coordinate;

    console.log("debug 1: " + upload_place);
    console.log("debug 2: " + upload_coordinate);

    let upload_photos = req.files;

    let photos_list = [];

    if (upload_photos.length === 0) {
        photos_list = null
    } else {
        for (let i = 0; i < upload_photos.length; i++) {
            photos_list.push((upload_photos[i].filename).replace(/(\s*)/g, ""));
        }
        photos_list = JSON.stringify(photos_list)
    }

    crypto.randomBytes(64, (err, serial_post_crypto) => {
        crypto.randomBytes(64, (err, buf) => {
            crypto.pbkdf2(serial_post_crypto, buf.toString("base64"), 100, 64, 'sha512', (err, key) => {

                let serial_post_id = key.toString("base64")

                let sql = "INSERT INTO posts (serial_post_id, user_profile, user_name, user_id, time, tag, place, coordinate, lat, lng, content, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

                conn.query(sql, [serial_post_id, profile_img, user_name, user_id, post_date, post_tag, upload_place, upload_coordinate, Number(JSON.parse(upload_coordinate).lat), Number(JSON.parse(upload_coordinate).lng), what_happened_textarea, photos_list], function (err, result) {
                    if (err) {
                        console.log('query is not excuted. insert fail...\n' + err);
                    } else {
                        console.log(user_name + "님의 post가 업로드됨.");
                        res.redirect('/')
                    }
                })
            });
        });
    });

})

router.post('/profile', my_page_upload.single('my_page_profile_edit_input'), (req, res) => {

    let change_profile = req.file;
    let before_profile = req.body.my_page_profile_edit_before_name;

    fs.unlink(path.join(__dirname, '../../../src/images/profile', before_profile), (err) => {
        if (err) console.log(err);
    });

    //사진 업로드
    //multer로 완료

    //DB에 프로필 사진명 수정
    let sql = "UPDATE user_info SET user_profile = ? WHERE user_id = ?;" + "UPDATE posts SET user_profile = ? WHERE user_id = ?;"

    //그동안의 게시글의 프로필도 전부 수정해야됨.

    conn.query(sql, [change_profile.filename, req.user.id, change_profile.filename, req.user.id], (err, result) => {
        res.redirect('/user/my_page');
    })

    // req.user의 세션 값 수정
    // 이렇게 해도 되네...? 지금까지 머한거지..
    req.user.user_profile = req.file.filename

    console.log('----------')
    console.log(req.user.name + ' changed profile image.')
    console.log('----------')

});

router.post('/change_home_address', (req, res) => {
    let classification = req.body.change_address_form_input_type;
    let change_home_address = req.body.change_home_address_form_input;

    let ch_user_interest_areas = JSON.parse(req.user.user_interest_areas)

    if ((classification) === '0') {
        let sql = "UPDATE user_info SET user_address = ? WHERE user_id = ?;"

        conn.query(sql, [change_home_address, req.user.id], (err, result) => {
            req.user.user_address = change_home_address;

            res.redirect('/user/my_page');
        })

    } else if ((classification) === '1') {
        ch_user_interest_areas[0] = change_home_address;

        let sql = "UPDATE user_info SET user_interest_areas = ? WHERE user_id = ?;"

        conn.query(sql, [JSON.stringify(ch_user_interest_areas), req.user.id], (err, result) => {
            req.user.user_interest_areas = JSON.stringify(ch_user_interest_areas)
            req.user.user_address = change_home_address;

            res.redirect('/user/my_page');
        })
    } else if ((classification) === '2') {
        ch_user_interest_areas[1] = change_home_address;

        let sql = "UPDATE user_info SET user_interest_areas = ? WHERE user_id = ?;"

        conn.query(sql, [JSON.stringify(ch_user_interest_areas), req.user.id], (err, result) => {
            req.user.user_interest_areas = JSON.stringify(ch_user_interest_areas)
            req.user.user_address = change_home_address;

            res.redirect('/user/my_page');
        })
    } else if ((classification) === '3') {
        ch_user_interest_areas[2] = change_home_address;

        let sql = "UPDATE user_info SET user_interest_areas = ? WHERE user_id = ?;"

        conn.query(sql, [JSON.stringify(ch_user_interest_areas), req.user.id], (err, result) => {
            req.user.user_interest_areas = JSON.stringify(ch_user_interest_areas)
            req.user.user_address = change_home_address;

            res.redirect('/user/my_page');
        })
    }
})

module.exports = router;