const main_scroll = document.getElementById('content_container');
let contents_box = document.getElementsByClassName('contents_box');


let post_count = 2;
let photo_count = 3;
let error_count = 0;

window.addEventListener('scroll', async () => {
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight === scrollHeight) {
        // setTimeout(createPost,2000);
        if (error_count === 0) {

            setTimeout(await createPost);
        }
    }
});


// The createPost function creates The HTML for the blog post.
// It append it to the container.
function createPost() {
    let new_post_list = [];

    axios.get('/post_api/scroll_post?count=' + post_count).then((axios_res) => {
        //과거 데이터 요청

        for (let i = 0; i < 3; i++) {

            let post_time = (axios_res.data[i].time);
            let html_photo_list = '';
            let active_check = 1;
            let picture = JSON.parse(axios_res.data[i].picture);
            if (picture === null) {

            } else {
                for (let a = 0; a < picture.length; a++) {
                    if (active_check === 1) {
                        html_photo_list += `<li class="image_list image_list_` + photo_count + ` active"><img src="../src/images/contents/` + picture[a] + ` " alt=""></li>`
                    } else {
                        html_photo_list += `<li class="image_list image_list_` + photo_count + `"><img src="../src/images/contents/` + picture[a] + ` " alt=""></li>`
                    }
                    active_check += 1
                }

            }

            const new_post = `<div class="contents_box">
                    <div class="main_top_info">
                        <div class="main_top_profile">
                            <div class="main_top_profile_img" style="background: url('/src/images/profile/` + axios_res.data[i].user_profile + `') center center; background-size: cover;">
                            </div>
                        </div>
                        <div class="main_top_center">
                            <p class="main_top_name">` + axios_res.data[i].user_name + `</p>
                            <!--작성된게 올해가 아니면 연도 표시-->
                            <p class="main_top_time">` + JSON.stringify(axios_res.data[i].time).substr(12, 2) + `:` + JSON.stringify(axios_res.data[i].time).substr(15, 2) + ` &#183; ` + Number(JSON.stringify(axios_res.data[i].time).substr(6, 2)) + `/` + Number(JSON.stringify(axios_res.data[i].time).substr(9, 2)) + `, ` + Number(JSON.stringify(axios_res.data[i].time).substr(1, 4)) + ` <span class="main_top_place"><i
                                            class="fas fa-map-marker-alt"></i>` + axios_res.data[i].place + `</span></p>
                        </div>
                        <div class="main_top_left">
                            <p><i class="fas fa-ellipsis-h"></i></p>
                        </div>
                    </div>
                    <div class="main_content">
                        <div id="main_content_text_` + axios_res.data[i].serial_post_id + `" class="main_content_text">
                            ` + axios_res.data[i].content.replace(/\r\n|\n/g, '<br/>') + `
                        </div>
                        <div id="main_content_text_back_` + axios_res.data[i].serial_post_id + `" class="main_content_text_back">
                            ` + axios_res.data[i].content.replace(/\r\n|\n/g, '<br/>') + `
                        </div>
                        <div class="imageSlide">
                            <ul class="image_ul">
                                <!--ejs로 숫자가 아닌 개별 num 주기-->
                                ` + html_photo_list + `
                            </ul>
                            <div class="imageSlide_button imageSlide_button_` + photo_count + `">
                            <span class="left_button" style="float: left" onclick="left_button_move(` + photo_count + `)"><i
                                        class="fas fa-chevron-left"></i></span>
                                <span class="right_button" style="float: right" onclick="right_button_move(` + photo_count + `)"><i
                                            class="fas fa-chevron-right"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="main_bottom">
                        <div class="counting_people">
                            <p><i class="fas fa-check-circle"></i> <span id="` + axios_res.data[i].serial_post_id + `_` + axios_res.data[i].user_id + `_check_count">` + JSON.stringify(axios_res.data[i].checks_count).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + `</span> <span id="person_people_` + axios_res.data[i].serial_post_id + `"></span></p>
                        </div>
                        <hr style="color: #555555; width: 655px; position: relative; top: -60px">
                        <div class="main_bottom_ui">
                            <div class="button_check">
                                        <span id="` + axios_res.data[i].serial_post_id + `_` + axios_res.data[i].user_id + `_no_check"
                                              onclick="check_plus('` + axios_res.data[i].serial_post_id + `', '` + axios_res.data[i].user_id + `')"><i
                                                    class="far fa-check-square"></i></span>
                                        <!--클릭이 되었을 때-->
                                        <span id="` + axios_res.data[i].serial_post_id + `_` + axios_res.data[i].user_id + `_check"
                                              style="display: none"
                                              onclick="check_minus('` + axios_res.data[i].serial_post_id + `', '` + axios_res.data[i].user_id + `')"><i
                                                    style="color: #c90000" class="fas fa-check-square"></i></span>
                                    </div>
                            <div class="button_comment">
                                <i class="far fa-comment-alt"></i>
                            </div>
                            <div class="button_share">
                                <i class="far fa-share-square"></i>
                            </div>
                        </div>
                    </div>
                </div>`

            new_post_list.push(new_post);
            contents_box[post_count].insertAdjacentHTML("afterend", new_post);
            /*console.log('post_count = ' + post_count)*/
            /*console.log('/post_api/check_exist?serial_post_id=' + axios_res.data[i].serial_post_id + '&user_id=' + axios_res.data[i].user_id)*/
            axios.get('/post_api/check_exist?serial_post_id=' + axios_res.data[i].serial_post_id + '&user_id=' + axios_res.data[i].user_id).then((check_exist) => {
                if (check_exist.data.du_exist === 1) {
                    document.getElementById(axios_res.data[i].serial_post_id + '_' + axios_res.data[i].user_id + '_no_check').style.display = 'none';
                    document.getElementById(axios_res.data[i].serial_post_id + '_' + axios_res.data[i].user_id + '_check').style.display = 'inline-block';
                }
            }).catch(err => {
                console.log(err)
            })

            if(axios_res.data[i].checks_count === 1){
                document.getElementById(`person_people_` + axios_res.data[i].serial_post_id).innerText = "person checked."
            } else{
                document.getElementById(`person_people_` + axios_res.data[i].serial_post_id).innerText = "people checked."
            }

            if (axios_res.data[i].picture === null) {
                /*console.log('됨 1');*/
                document.getElementsByClassName('imageSlide_button_' + photo_count)[0].style.visibility = 'hidden';
            } else if (JSON.parse(axios_res.data[i].picture).length === 1) {
                document.getElementsByClassName('imageSlide_button_' + photo_count)[0].style.visibility = 'hidden';
                // document.getElementsByClassName('left_button')[photo_count].removeAttribute('onclick');
                // document.getElementsByClassName('left_button')[photo_count].style.cursor = 'default';;

                // document.getElementsByClassName('right_button')[photo_count].removeAttribute('onclick');
                // document.getElementsByClassName('right_button')[photo_count].style.cursor = 'default';

            }
            ////////////////////////////////////////////////////////////////////////
            // let tt_` + photo_count + ` = document.getElementById('main_content_text_' + axios_res.data[i].serial_post_id);
            // let tt2_` + photo_count + ` = document.getElementById('main_content_text_back_` + axios_res.data[i].serial_post_id + `');

            // const contents_text_contents_` + photo_count + ` = document.getElementById('main_content_text_' + axios_res.data[i].serial_post_id).innerText
            // const contents_text_contents_length_` + photo_count + ` = document.getElementById('main_content_text_' + axios_res.data[i].serial_post_id).innerText.length

            let spann = document.createElement('span')
            spann.className = 'more'
            spann.innerText = " ..more";
            spann.innerText = " ..more";
            spann.setAttribute('onclick', "spann_f_(\'" + axios_res.data[i].serial_post_id + "\')");
            // if (contents_text_contents_length > 153) {
            if (document.getElementById('main_content_text_' + axios_res.data[i].serial_post_id).offsetHeight > 72) {
                document.getElementById('main_content_text_' + axios_res.data[i].serial_post_id).innerHTML = document.getElementById('main_content_text_' + axios_res.data[i].serial_post_id).innerText.substr(0, 153)
                document.getElementById('main_content_text_' + axios_res.data[i].serial_post_id).appendChild(spann)
            }


            ////////////////////////////////////////////////////////////////////////
            post_count += 1;
            photo_count += 1;
        }

        /*console.log(new_post_list)*/
        // for (let a = 0; a < 30; a++) {

        // }
//   Appending the post to the container.
//         main_scroll.appendChild(new_post_list);
    }).catch((err) => {
        console.log(err)
        if (error_count === 0) {
            let new_post = "<p id='last_post_error'>There are no more posts.</p>"
            contents_box[contents_box.length - 1].insertAdjacentHTML("afterend", new_post)
        }
        error_count += 1;
    })

}