function check_plus(serial_post_id, user_id) {
    let sql = '/post_api/checks/plus?serial_post_id=' + serial_post_id + '&user_id=' + user_id;

    axios.get(sql).then((res) => {
        document.getElementById(serial_post_id + '_' + user_id + '_no_check').style.display = 'none';

        document.getElementById(serial_post_id + '_' + user_id + '_check').style.display = 'inline-block';

        document.getElementById(serial_post_id + '_' + user_id + '_check_count').innerText = JSON.stringify(res.data.checks_count).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    }).catch((err) => {
        console.log('error')
    });
}

function check_minus(serial_post_id, user_id) {
    let sql = '/post_api/checks/minus?serial_post_id=' + serial_post_id + '&user_id=' + user_id;

    axios.get(sql).then((res) => {
        document.getElementById(serial_post_id + '_' + user_id + '_check').style.display = 'none';

        document.getElementById(serial_post_id + '_' + user_id + '_no_check').style.display = 'inline-block';

        document.getElementById(serial_post_id + '_' + user_id + '_check_count').innerText = JSON.stringify(res.data.checks_count).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }).catch((err) => {
        console.log('error')
    });
}