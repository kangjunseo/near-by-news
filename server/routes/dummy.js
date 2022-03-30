const express = require('express');
const router = express.Router();

//DB
const db_info = require('../../conf/db_info')
const conn = db_info.init()

let year = 2021

const post_date_list = []

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCoordinate(min, max) {
    return (((Math.random() * (max - min + 1)) + min) / 10000000).toFixed(7);
}

let list = ['화재', '붕괴', '폭발', '교통사고', '환경오염', '태풍', '홍수', '호우', '폭설', '폭풍', '가뭄', '지진'];


// router.get('/', (req, res) => {
//
//     /*for (let i = 0; i < 10; i++) {
//
//         console.log("lat : " + 1);
//         console.log("lng : " + 1);
//         console.log('======================')
//     }*/
//     let sql = "INSERT INTO dummy (time, tag, coordinate, lat, lng) VALUES (?, ?, ?, ?, ?);";
//
//     let hap = 0
//     for (let i = 0; i < 5000; i++) {
//
//         let point_month = randomNum(1, 12);
//         let point_date
//
//         let coordinate = [{name: 'Hanyang_univ', lat: 37.5571801, lng: 127.0432205}, {
//             name: 'Sejong_univ',
//             lat: 37.551806,
//             lng: 127.0714458
//         }, {name: 'Konkuk_univ', lat: 37.5407667, lng: 127.0771541}, {
//             name: 'Korea_univ',
//             lat: 37.5908032,
//             lng: 127.0255886
//         }, {name: 'Yonsei_univ', lat: 37.5657882, lng: 126.9363833}, {
//             name: 'Hanyang_univ_near',
//             lat: randomCoordinate(Number(((37.55529954311451).toFixed(7)) * 10000000), Number(((37.56282901796407).toFixed(7)) * 10000000)),
//             lng: randomCoordinate(Number(((127.03535863810103).toFixed(7)) * 10000000), Number(((127.04937836534657).toFixed(7)) * 10000000))
//         }, {
//             name: 'Sejong_univ_near',
//             lat: randomCoordinate(Number(((37.54876719257199).toFixed(7)) * 10000000), Number(((37.55371557131458).toFixed(7)) * 10000000)),
//             lng: randomCoordinate(Number(((127.06888162392129).toFixed(7)) * 10000000), Number(((127.07524523896471).toFixed(7)) * 10000000))
//         }, {
//             name: 'Konkuk_univ_near',
//             lat: randomCoordinate(Number(((37.53574518620932).toFixed(7)) * 10000000), Number(((37.54602375137325).toFixed(7)) * 10000000)),
//             lng: randomCoordinate(Number(((127.06945593720752).toFixed(7)) * 10000000), Number(((127.08349062583446).toFixed(7)) * 10000000))
//         }, {
//             name: 'Korea_univ_near',
//             lat: randomCoordinate(Number(((37.580606811090945).toFixed(7)) * 10000000), Number(((37.590616330898726).toFixed(7)) * 10000000)),
//             lng: randomCoordinate(Number(((127.01720149275818).toFixed(7)) * 10000000), Number(((127.03411967195827).toFixed(7)) * 10000000))
//         }, {
//             name: 'Yonsei_univ_near',
//             lat: randomCoordinate(Number(((37.55654338555104).toFixed(7)) * 10000000), Number(((37.57210246222141).toFixed(7)) * 10000000)),
//             lng: randomCoordinate(Number(((126.92926447278003).toFixed(7)) * 10000000), Number(((126.94361959556258).toFixed(7)) * 10000000))
//         }];
//
//         if (point_month === 2) {
//             point_date = randomNum(1, 28);
//         } else if (point_month === 1 || point_month === 3 || point_month === 5 || point_month === 7 || point_month === 8 || point_month === 10 || point_month === 12) {
//             point_date = randomNum(1, 31);
//         } else if (point_month === 4 || point_month === 6 || point_month === 9 || point_month === 11) {
//             point_date = randomNum(1, 30);
//         }
//         let point_hour = randomNum(0, 23);
//         let point_minute = randomNum(0, 59);
//         let point_second = randomNum(0, 59);
//
//         let point_tag = randomNum(0, 11);
//         let point_cordinate = randomNum(0, 9);
//
//         const post_date = year + '-' + point_month + '-' + point_date + ' ' + point_hour + ':' + point_minute + ':' + point_second;
//
//
//         conn.query(sql, [post_date, list[point_tag], JSON.stringify(coordinate[point_cordinate]), Number(coordinate[point_cordinate].lat), Number(coordinate[point_cordinate].lng)], function (err, result) {
//             if (err) {
//                 console.log("데이터" + post_date);
//                 console.log(err);
//
//             } else {
//                 console.log("전송 성공");
//                 hap += 1;
//             }
//         })
//     }
//     console.log(hap);
// })

// let list_2 = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11',];
let list_2 = [];
let list_3 = ['/tqjdccHr8otXX0jqlhgb/fihmyAEemcsnb7R9RTbW14zShohZaymZVnAoigOQNnZk+//B42FII2E0/B3ZFxgQ==', 'HmTe7YTMr/MBqfp6wm/CUZXZIbWm/p8SvxuoahpXRqT55/fPCwfIzQvcjtyySvWpnbesY+T5OiP24maphgfegQ==', 'pHEe6ispV1JHiVnKgO8WooSFgODZqCzUpAlPFPQruDTp/FHj8B9myNulEmqJtLuEHnvEAeEdxZ3fmwsq1/wrLw==', 'eMbBNdgT51C8g+CojIj7TDDCWHUPyTSPNRp5xCKuBjhLra/A+mIxVW+JglQP2k3tSwEYM23Czgl6nu2L4m/rig==', '+KBupH8prQ4fbuoWJSZG83yBbxBEs0MbPcfBq2rGTBQPbII5zWlZG3dOeBZseZaNeSJmCTJiJpjCXdrcsnP4ww==', 'EHHz9nt8B0n09ParUrB+XJEGnK6LEtthaHm2TrHRHpNOaHeyiuN5LgpysW7+1vimXhsdTjx+eLIWJcRKSSxX+A==', '0Ox3QW/8bJyeE5p0deflgUeMf/D1G2VvtP61REe5UgnzXuhj/XnuNvI/G/XPiFaimW+uk0fJpTvhJWFewb0FCw==', 'IYaOTaNanbzaWs05Fl4eA6DjEeuJQAQP2iNl86dDd5owo5Ofsb+euGNhFeb+GNIheVaYPi6AF5NsIOfYSCxUZQ==', '+IHy21rFqR1Mr4GwfqO8p+qJpGTJ5EpxcUuZx7r0+cjkiEBM1xzVn7CSEZXnEWyZLhGM0Ayw9Sv38petWwJaFw==', 'YppgT/olTUNMquNw1h9Z+hKExScWqxOr7qS2cd9g18dUW4sjiIv73SXM09cs33GYvxtGTFKfUmtv0M37qir6cg==', 'Td56ThaF2a8xb4DlKlEzhwdVYWePOV0P2yxQjxNGoWHnhIKquIcG6ArX67Tuo4gUheFVMecZU2q9W+DlLC0Jgg=='];

for (let i = 1; i < 31; i++) {
    list_2.push('test_' + i)
}

router.get('/2', (req, res) => {

    let sql = "UPDATE dummy SET user_id = ?, checks_count = ? WHERE num = ?";

    for (let i = 1; i < 10001; i++) {
        let qus = randomNum(0, 100000);
        let qus2 = randomNum(0, 29);
        conn.query(sql, [list_2[qus2], qus, i], (err, result) => {

        })
    }
})
module.exports = router;