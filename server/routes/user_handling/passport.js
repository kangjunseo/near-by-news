//DB
const db_info = require('../../../conf/db_info')
const conn = db_info.init()

//crypto
const crypto = require('crypto')

//session

//passport
const LocalStrategy = require('passport-local').Strategy

//app.js에서 passport 모듈 가져옴
module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        console.log(user.name + " LOG IN")
        console.log('serializeUser : ', user)
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        // console.log('deserializeUser_id : ', user)
        console.log(user.name + ' used')
        done(null, user)
        // })
    });

    passport.use('local-login', new LocalStrategy({
        // Form에서 post로 받아온 값임.
        // 기본값은 username, password이지만 이름이 다르게 설정되있으면 여기서 설정
        usernameField: 'login_id',
        passwordField: 'login_password',
    }, function (user_id, password, done) {
        let sql = "SELECT exists (SELECT * FROM user_info WHERE user_id=?) as success;"

        conn.query(sql, user_id, function (err, result) {
            let id = result[0].success;
            if (err) {
                return done(err);
            } else if (id === 0) {
                return done(null, false, {message: 'Incorrect ID.'});
            } else if (id === 1) {
                let in_sql = "SELECT user_salt FROM user_info WHERE user_id=?;" +
                    "SELECT user_pwd FROM user_info WHERE user_id=?;" +
                    "SELECT user_name FROM user_info WHERE user_id=?;" +
                    "SELECT user_email FROM user_info WHERE user_id=?;" +
                    "SELECT user_address FROM user_info WHERE user_id=?;" +
                    "SELECT user_profile FROM user_info WHERE user_id=?;" +
                    "SELECT user_interest_areas FROM user_info WHERE user_id=?;"

                conn.query(in_sql, [user_id, user_id, user_id, user_id, user_id, user_id, user_id], function (err, result) {
                    let salt = result[0][0].user_salt;
                    let db_password = result[1][0].user_pwd;
                    let db_name = result[2][0].user_name;
                    let db_email = result[3][0].user_email;
                    let db_user_address = result[4][0].user_address;
                    let db_user_profile = result[5][0].user_profile;
                    let db_user_interest_areas = result[6][0].user_interest_areas;

                    crypto.pbkdf2(password, salt, 100, 64, 'sha512', (err, key) => {
                        let de_password = key.toString("base64")
                        // 비밀번호 맞을 때
                        if (de_password === db_password) {
                            // req.session.user_id = user_id
                            // req.session.save()
                            const user = {
                                id: user_id,
                                name: db_name,
                                email: db_email,
                                user_address: db_user_address,
                                user_profile: db_user_profile,
                                user_interest_areas: db_user_interest_areas
                            }
                            return done(null, user);
                        } else { // 비밀번호 안 맞을 때
                            return done(null, false, {message: 'Incorrect password.'});
                        }
                    });
                })
            }
        })
    }));
}