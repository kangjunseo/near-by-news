let count = 0;

let save_num = -1;

let check = 0;

function left_button_move(num) {

    if (check !== 0) {
        if (num !== save_num) {
            let focus_img = document.getElementsByClassName('image_list_' + save_num);

            focus_img[count].style.cssText = "display: none;";

            focus_img[0].style.cssText = "display: block;"

            count = 0;
            save_num = num
        }
    } else if (check === 0) {
        save_num = num
    }
    let focus_img = document.getElementsByClassName('image_list_' + num);

    focus_img[count].style.cssText = "display: none;";

    count -= 1;

    if (count < 0) {
        count = focus_img.length - 1;
        focus_img[count].style.cssText = "display: block;"

    } else {
        focus_img[count].style.cssText = "display: block;"
    }
    check += 1;
}

function right_button_move(num) {
    if (check !== 0) {

        if (num !== save_num) {
            let focus_img = document.getElementsByClassName('image_list_' + save_num);

            focus_img[count].style.cssText = "display: none;";

            focus_img[0].style.cssText = "display: block;"

            count = 0;
            save_num = num
        }
    } else if (check === 0) {
        save_num = num
    }
    let focus_img = document.getElementsByClassName('image_list_' + num);

    focus_img[count].style.cssText = "display: none;";

    count += 1;

    if (count > focus_img.length - 1) {
        count = 0;
        focus_img[count].style.cssText = "display: block;"

    } else {
        focus_img[count].style.cssText = "display: block;"

    }
    check += 1;


}