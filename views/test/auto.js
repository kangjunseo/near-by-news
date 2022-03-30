let count = 0;

function left_button_move(num) {
    let focus_img = document.getElementsByClassName('image_list_' + num);
    focus_img[count].style.cssText = "display: none;";

    count -= 1;

    if (count < 0) {
        count = focus_img.length - 1;
        focus_img[count].style.cssText = "display: block;"

    } else {
        focus_img[count].style.cssText = "display: block;"
    }

}

function right_button_move(num) {

    let focus_img = document.getElementsByClassName('image_list_' + num);

    focus_img[count].style.cssText = "display: none;";

    count += 1;

    if (count > focus_img.length - 1) {
        count = 0;
        focus_img[count].style.cssText = "display: block;"

    } else {
        focus_img[count].style.cssText = "display: block;"

    }


}