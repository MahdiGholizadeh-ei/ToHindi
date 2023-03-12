var lastScroll = 0;
// window.onscroll = function () {
//     scrollTop = $(window).scrollTop();
//     if (lastScroll <= scrollTop) {
//         if ($("#blog").position().top + 1 <= (scrollTop)) {
//             document.getElementById('footer').scrollIntoView();
//             setTimeout(function () {
//                 document.getElementById('scroll_width_4').className = "scroll_width_set";
//             }, 10);
//
//         } else if ($("#science").position().top + 1 <= (scrollTop)) {
//             document.getElementById('blog').scrollIntoView();
//             setTimeout(function () {
//                 document.getElementById('scroll_width_3').className = "scroll_width_set";
//             }, 10);
//
//         } else if ($("#portfolio").position().top + 1 <= (scrollTop)) {
//             document.getElementById('science').scrollIntoView();
//             setTimeout(function () {
//                 document.getElementById('scroll_width_2').className = "scroll_width_set";
//             }, 10);
//
//         } else if ($("#about").position().top + 1 <= (scrollTop)) {
//             document.getElementById('portfolio').scrollIntoView();
//             setTimeout(function () {
//                 document.getElementById('scroll_width_1').className = "scroll_width_set";
//             }, 10);
//
//         } else if (1 <= (scrollTop)) {
//             document.getElementById('about').scrollIntoView();
//             $(".about_box").addClass('animation_start');
//             setTimeout(function () {
//                 document.getElementById('scroll_width').className = "scroll_width_set";
//             }, 10);
//
//         }
//     } else {
//         if ($("#about").position().top - 1 >= (scrollTop)) {
//             document.getElementById('top_web_site').scrollIntoView();
//
//         } else if ($("#portfolio").position().top - 1 >= (scrollTop)) {
//             document.getElementById('about').scrollIntoView();
//             $(".about_box").addClass('animation_start ');
//             setTimeout(function () {
//                 document.getElementById('scroll_width').className = "scroll_width_set";
//             }, 10);
//
//         } else if ($("#science").position().top - 1 >= (scrollTop)) {
//             document.getElementById('portfolio').scrollIntoView();
//             setTimeout(function () {
//                 document.getElementById('scroll_width_2').className = "scroll_width_set";
//             }, 10);
//
//         } else if ($("#blog").position().top - 1 >= (scrollTop)) {
//             document.getElementById('science').scrollIntoView();
//             setTimeout(function () {
//                 document.getElementById('scroll_width_2').className = "scroll_width_set";
//             }, 10);
//
//
//         } else if ($("#footer").position().top - 1 >= (scrollTop)) {
//             document.getElementById('blog').scrollIntoView();
//             setTimeout(function () {
//                 document.getElementById('scroll_width_3').className = "scroll_width_set";
//             }, 10);
//         }
//     }
//
//     lastScroll = scrollTop;
//
//     if ($("#top_web_site").position().top > (scrollTop + 50)) {
//         document.getElementById('nav').style.position = "fixed";
//     }
//     if ($("#portfolio").position().top <= (scrollTop + 500)) {
//         $(".post_title").addClass('animation_start');
//         $(".post_text").addClass('animation_start');
//     }
//
//     if ($("#blog").position().top <= (scrollTop + 500)) {
//         $(".item_box").addClass('animation_start');
//     }
// };
$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                //window.location.hash = hash;
            });
        }
    });
});

function typingWriter(id) {
    text = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = '';
    tmp = '';
    counter = 0;
    maxCount = text.length;

    var textTimer = setInterval(function () {
        tmp += text.charAt(counter);
        document.getElementById(id).innerHTML = tmp;
        document.getElementById(id).style.display = "block";
        counter++;
        if (counter >= maxCount) {
            clearInterval(textTimer);
            if (id == "first_text")
                typingWriter('middle_text');
            else if (id == 'middle_text')
                typingWriter('last_text');
        }
    }, 100);
    clearTimeout();
}

/***************** Add Your Functions Here *******************/

function openMenu(element) {
    if (element.className != "fal fa-times menu_bars") {
        document.getElementById('menu_bars').style.opacity = "0";
        document.getElementById('menu').style.opacity = "1";
        document.getElementById('menu').style.transition = "left 0s ease, opacity .5s ease";
        document.getElementById('menu').style.right = "0";
        setTimeout(function () {
            document.getElementById('menu').style.width = "100%";
            document.getElementById('menu').style.height = "100%";
        }, 200)
    } else {

    }
}

function closeMenu(element) {
    if (document.getElementById('menu').style.width == "100%") {
        document.getElementById('menu_bars').style.opacity = "1";
        document.getElementById('menu').style.opacity = "0";
        document.getElementById('menu').style.right = "-100%";
        setTimeout(function () {
            document.getElementById('menu').style.transition = "left .3s ease";
            document.getElementById('menu').style.width = "0";
            document.getElementById('menu').style.height = "0";
        }, 10)
    } else {

    }
}

function changeColor(element) {
    color = document.getElementsByTagName('body')[0];
    if (color.className == 'dark') {
        setColor('light');
    } else {
        setColor('dark');
    }

}

function setColor(color) {
    element = document.getElementById('color_change');
    if (color == 'dark') {
        document.getElementById('body').className = 'dark';
        element.style.transform = 'rotateZ(360deg)';
        setTimeout(function () {
            element.src = MAIN_ADDRESS + "assets/img/Moon2.svg";
            // document.getElementById('logo').src = MAIN_ADDRESS + "assets/img/logo-dark.png";
            // document.getElementById('logo_side').src = MAIN_ADDRESS + "assets/img/logo-dark.png";
            document.getElementById('theme-color').content = "#fdfdfd";
            SITE_COLOR = "rgba(21, 21, 21, .90)";
        }, 200);
    } else {
        document.getElementById('body').className = 'light';
        element.style.transform = 'rotateZ(0deg)';
        setTimeout(function () {
            element.src = MAIN_ADDRESS + "assets/img/Sun.svg";
            // document.getElementById('logo').src = MAIN_ADDRESS + "assets/img/logo-light.png";
            // document.getElementById('logo_side').src = MAIN_ADDRESS + "assets/img/logo-light.png";
            document.getElementById('theme-color').content = "rgba(21, 21, 21, .90)";
            SITE_COLOR = "#fdfdfd";
        }, 200);
    }
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/changeColor.php",
        data: ({color: color}),
        cache: false,
        success: function (data) {
        }
    });
}

function openLanguage() {
    if (document.getElementById('select_result_lang').style.transform != "scale(1, 1)") {
        document.getElementById('select_result_lang').style.transform = "scale(1, 1)";
    } else {
        closeLanguage();
    }
}

function closeLanguage() {
    setTimeout(function () {
        document.getElementById('select_result_lang').style.transform = "scale(0, 9)";
    }, 100)
}

function changeLang(element, lang) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/changeLang.php",
        data: ({lang: lang}),
        cache: false,
        success: function (data) {
            window.location.reload(true);
        }
    });
}

function playMusic(element) {
    if (element.style.opacity != "1") {
        element.innerHTML = '<span><i class="fad fa-pause"></i></span>';
        element.style.opacity = "1";
        element.className = "wb_snd_ply_color wb_snd_ply";
        document.getElementById('play_music').innerHTML = '' +
            '\n' +
            '    <source src="assets/file/audio/Stive-Morgan-Magic-World-Of-Illusions[HD]_619525.mp3" type="audio/mpeg">' +
            '';
        document.getElementById('play_music').play();
    } else {
        element.style.opacity = "0.35";
        element.innerHTML = '<span><i class="fad fa-play"></i></span>';
        element.className = " wb_snd_ply";
        document.getElementById('play_music').innerHTML = '';
        document.getElementById('play_music').pause();
    }
}

function writeMessage() {
    document.getElementById('text').style.width = "calc(100% - 110px)";
    document.getElementById('btn_cancel').style.display = "inline-block";
    document.getElementById('btn_cancel').style.width = "45px";
    document.getElementById('btn_cancel').style.padding = "12px";
}

function cancelWrite(element) {
    element.style.display = "none";
    setTimeout(function () {
        element.style.width = "0";
        element.style.padding = "12px 0";
        document.getElementById('text').style.width = "calc(100% - 60px)";
        document.getElementById('text').value = "";
    }, 400);
}

function sendCommentSample(element) {
    btn = element.innerHTML;
    element.innerHTML = "<i class='fal fa-spinner-third fa-spin'></i>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/sendCommentSample.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                loadSampleComment();
                showNotification(obj.result, true);
                cancelWrite();
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function loadSampleComment() {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/loadSampleComment.php",
        data: ({id: document.getElementById('id').value}),
        cache: false,
        success: function (data) {
            document.getElementById('hidden_comment_1').innerHTML = data;
        }
    });
}

function doSignIn(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/doSignIn.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                window.location.reload();
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doRemember(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/doRemember.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                goToUrl(MAIN_ADDRESS + 'panel/', false);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doSignUp(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/doSignUp.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doSignUpActivation(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin'></i></span>";
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSignUpActivation.php",
        data: ({activation: document.getElementById('activation').value}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                goToUrl(obj.url, false);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doSignOut() {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSignOut.php",
        data: ({out: true}),
        cache: false,
        success: function (data) {
            goToUrl(MAIN_ADDRESS, false);
        }
    });
}

//
// function doCloud() {
//     up = document.getElementById('img-up');
//     down = document.getElementById('img-down');
//     document.getElementById('logo_show').style.display = 'block';
//     up.style.top = "calc(-100vh - 250px)";
//     setInterval(function () {
//         down.style.top = "calc(-200vh - 540px)";
//     }, 400);
//     setInterval(function () {
//         document.getElementById('logo_show').style.opacity = '1.0';
//     }, 1000);
//     setInterval(function () {
//         document.getElementById('sign_holder').style.opacity = '0.0';
//     }, 2500);
//     setInterval(function () {
//         window.location.reload(true);
//     }, 2900);
// }
function doSendActivation(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin'></i></span>";
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSendActivation.php",
        data: ({phone: document.getElementById('phone').value}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                goToUrl(MAIN_ADDRESS + 'register/', false);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

// function openSelect(id) {
//     if (document.getElementById('select_holder_' + id).style.opacity != "1") {
//         document.getElementById('select_holder_' + id).style.opacity = "1";
//         document.getElementById('select_holder_' + id).style.height = offsetArray[id] + 'px';
//         document.getElementById('select_holder_' + id).style.transform = "scale(1.0)";
document.getElementById('btn_img_' + id).style.transform = "rotate(270deg)";
//     } else {
//         document.getElementById('select_holder_' + id).style.opacity = "0";
//         document.getElementById('select_holder_' + id).style.height = "0";
//         document.getElementById('btn_img_' + id).style.transform = "rotate(90deg)";
//         setTimeout(function () {
//             document.getElementById('select_holder_' + id).style.transform = "scale(0.9)";
//         }, 400);
//     }
// }

function openSelect(id) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/openSelect.php",
        data: ({id: id, value: ''}),
        cache: false,
        success: function (data) {
            data = '<input id="select_input_search_' + id + '" type="text" placeholder="تایپ کنید" onkeyup="searchSelect(\'' + id + '\')"><div id="select_hide_scroll_' + id + '" class="select_hide_scroll" onmouseleave="closeSelect(\'' + id + '\')">' + data + '</div>';
            document.getElementById('select_result_' + id).innerHTML = data;
            document.getElementById('select_result_' + id).style.display = 'block';
            document.getElementById('btn_img_' + id).style.transform = "rotate(270deg)";
            document.getElementById('select_input_search_' + id).focus();
        }
    });
}

function searchSelect(id) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/openSelect.php",
        data: ({id: id, value: document.getElementById('select_input_search_' + id).value}),
        cache: false,
        success: function (data) {
            document.getElementById('select_hide_scroll_' + id).innerHTML = data;
        }
    });
}

function closeSelect(id) {
    setTimeout(function () {
        document.getElementById('select_result_' + id).style.display = 'none';
        document.getElementById('btn_img_' + id).style.transform = "rotate(90deg)";
    }, 300);
}

function selectClick(id, code, text) {
    document.getElementById('select_hide_' + id).value = code;
    document.getElementById('select_input_' + id).innerHTML = text;
    document.getElementById('select_result_' + id).style.display = 'none';
    document.getElementById('btn_img_' + id).style.transform = "rotate(90deg)";
}

function doCheckBox(element, id) {
    document.getElementById('check_' + id).click();

    if (document.getElementById('check_' + id).checked) {
        element.className = "checkbox checked";
        element.innerHTML = "<i class='fal fa-check'></i>";
        document.getElementById('checkbox_text_' + id).innerHTML = "Active";
    } else {
        element.className = "checkbox";
        element.innerHTML = "";
        document.getElementById('checkbox_text_' + id).innerHTML = "Deactivate";
    }
}

function openPanelMenu() {
    document.getElementById('panel_side').style.left = "20px";
    document.getElementById('panel_main').style.left = "90%";
    document.getElementById('panel_header_holder').style.left = "95%";
    document.getElementById('panel_background').style.display = "block";
    document.getElementById('black').style.display = "block";
    document.getElementById('black').onclick = function () {
        closePanelMenu();
    }
}

function closePanelMenu() {
    document.getElementById('panel_side').style.left = "-100%";
    document.getElementById('panel_main').style.left = "0";
    document.getElementById('panel_header_holder').style.left = "0";
    document.getElementById('panel_background').style.display = "none";
    document.getElementById('black').style.display = "none";
    document.getElementById('black').onclick = null;
}

function doProjectSearch(element) {
    search = document.getElementById('search_input').value;
    if (search == '')
        search = '-';
    goToUrl(MAIN_ADDRESS + 'panel/project/' + search + '/', false);
}

function doSaveSample(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = $('#frm').serialize();
    datax = window.parent.tinymce.get('text').getContent({format: 'html'}).replace(/&/gi, " ")
        .replace(/nbsp;/gi, "")
        .replace(/amp;/gi, "")
        .replace(/zwnj;/gi, "")
        .replace(/raquo;/gi, "")
        .replace(/diams;/gi, "")
        .replace(/laquo;/gi, "")
        .replace(/ndash;/gi, "")
        .replace(/times;/gi, "");
    formData += '&text=' + datax;
    dataxf = window.parent.tinymce.get('text_fa').getContent({format: 'html'}).replace(/&/gi, " ")
        .replace(/nbsp;/gi, "")
        .replace(/amp;/gi, "")
        .replace(/zwnj;/gi, "")
        .replace(/raquo;/gi, "")
        .replace(/diams;/gi, "")
        .replace(/laquo;/gi, "")
        .replace(/ndash;/gi, "")
        .replace(/times;/gi, "");
    formData += '&text_fa=' + dataxf;
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSaveSample.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                goToUrl(MAIN_ADDRESS + 'panel/project/id/' + obj.id + '/', false);
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function addSampleToSlider(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/addSampleToSlider.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function deleteFromSlider(element, id) {
    showAlert('Deleted slider', 'Should this slider be removed?', 'Yes', function () {
        btn = element.innerHTML;
        element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteFromSlider.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                }
                element.innerHTML = btn;
            }
        });
    }, 'No');
}

function doSaveSampleSpecifications(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = new FormData($(document.getElementById('frm_d'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/doSaveSampleSpecifications.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function editSampleDetail(title_d, title_d_fa, value_d, value_d_fa, priority_d) {
    document.getElementById('title_d').value = title_d;
    document.getElementById('title_d_fa').value = title_d_fa;
    document.getElementById('value_d').value = value_d;
    document.getElementById('value_d_fa').value = value_d_fa;
    document.getElementById('priority_d').value = priority_d;
}

function deleteSampleDetail(element, id, detail) {
    showAlert('حذف', 'آیا از حذف این جزییات اطمینان دارید؟', 'بله', function () {
        btn = element.innerHTML;
        element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteSampleDetail.php",
            data: ({id: id, detail: detail}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                }
                element.innerHTML = btn;
            }
        });
    }, 'خیر');
}

function deleteSample(element, id) {
    showAlert('حذف از محمصول', 'آیا این محصول حذف شود؟', 'بله', function () {
        btn = element.innerHTML;
        element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteSample.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                }
                element.innerHTML = btn;
            }
        });
    }, 'خیر');
}

function searchListAdmin(page) {
    url = MAIN_ADDRESS + 'panel/' + page + '/';

    if (page == 'users') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        gender = document.getElementById('gender').value;
        if (gender == "") gender = "-1";

        status = document.getElementById('status').value;
        if (status == "") status = "-1";

        url += search + '/' + gender + '/' + status + '/';

    } else if (page == 'blog') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        category = document.getElementById('category_id').value;
        if (category == "") category = "0";

        type = document.getElementById('type').value;
        if (type == "") type = "-1";

        status = document.getElementById('status').value;
        if (status == "") status = "-1";

        url += search + '/' + category + '/' + type + '/' + status + '/';

    } else if (page == 'faq') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        category = document.getElementById('category_id').value;
        if (category == "") category = "0";

        status = document.getElementById('status').value;
        if (status == "") status = "-1";

        url += search + '/' + category + '/' + status + '/';

    } else if (page == 'pages') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        status = document.getElementById('status').value;
        if (status == "") status = "-1";

        url += search + '/' + status + '/';

    } else if (page == 'comments') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        user = document.getElementById('receiver_id').value;
        if (user == "") user = "0";

        product = document.getElementById('product_id').value;
        if (product == "") product = "0";

        status = document.getElementById('status').value;
        if (status == "") status = "-1";

        url += search + '/' + user + '/' + product + '/' + status + '/';

    } else if (page == 'support') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        user = document.getElementById('receiver_id').value;
        if (user == "") user = "0";

        status = document.getElementById('status').value;
        if (status == "") status = "-1";

        url += search + '/' + user + '/' + category + '/' + status + '/';

    } else if (page == 'support') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        category = document.getElementById('category').value;
        if (category == "") category = "-1";

        status = document.getElementById('status').value;
        if (status == "") status = "-1";

        url += search + '/' + category + '/' + status + '/';

    } else if (page == 'shipping_cost') {
        state = document.getElementById('state').value;
        if (state == "") state = "0";

        city = document.getElementById('city').value;
        if (city == "") city = "0";

        url += state + '/' + city + '/';

    } else if (page == 'file_manager') {
        type = document.getElementById('type').value;
        if (type == "") type = "0";

        ext = document.getElementById('ext').value;
        if (ext == "") ext = "0";

        url += type + '/' + ext + '/';

    } else if (page == 'blog_category') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        category = document.getElementById('category_id').value;
        if (category == "") category = "0";

        url += search + '/' + category + '/';

    } else if (page == 'product_category') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        category = document.getElementById('category_product_id').value;
        if (category == "") category = "0";

        url += search + '/' + category + '/';

    } else if (page == 'products' || page == 'product_video' || page == 'product_file') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        category = document.getElementById('category_product_id').value;
        if (category == "") category = "0";

        url += search + '/' + category + '/';

    } else if (page == 'product_detail') {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        category = document.getElementById('category_product_id').value;
        if (category == "") category = "0";

        url += search + '/' + category + '/';

    } else {
        search = document.getElementById('search_panel').value;
        if (search == "") search = "-";

        url += search + '/';
    }

    goToUrl(url, false);
}

function deleteBlog(element, id) {
    showAlert('حذف مطلب', 'آیا این مطلب حذف شود؟', 'بله', function () {
        btn = element.innerHTML;
        element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteBlog.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                }
                element.innerHTML = btn;
            }
        });
    }, 'خیر');
}

function changeBlogType(element) {
    if (element.value == '3') {
        document.getElementById('video').style.display = 'block';
        document.getElementById('audio').style.display = 'none';

    } else if (element.value == '2') {
        document.getElementById('video').style.display = 'none';
        document.getElementById('audio').style.display = 'block';

    } else {
        document.getElementById('video').style.display = 'none';
        document.getElementById('audio').style.display = 'none';
    }
}

function showVideoHelp(id) {
    tmp = '<video controls style="width: 100%; display: block;"><source src="' + MAIN_ADDRESS + 'assets/img/' + id + '.mp4" type="video/mp4"></video>'
    showAlert('راهنمای درج ویدیو', tmp, 'بستن', function () {
        closeAlert();
    }, '', null, true, true);
}

function trimAparatAddress(element) {
    element.value = element.value
        .replace('https://www.aparat.com/v/', '')
        .replace('http://www.aparat.com/v/', '')
        .replace('www.aparat.com/v/', '')
        .replace('aparat.com/v/', '')
        .replace('/', '').trim();

    if (element.value.latlng > 4) {
        document.getElementById('43044677549').style.display = 'block';
    }
}

function trimFontAwesomeAddress(element) {
    element.value = element.value
        .replace('<i class="', '')
        .replace('"></i>', '').trim();
}

function deleteBlogVideo(id) {
    showAlert('حذف ویدیو', 'آیا از حذف ویدیو مطمئن هستید؟', "حذف", function () {
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteBlogVideo.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    document.getElementById('video_player').style.display = 'none';
                    document.getElementById('video_delete').style.display = 'none';
                    document.getElementById('43044677549').style.display = 'none';
                    document.getElementById('aparat').value = '';
                } else {
                    showNotification(obj.result);
                }
                closeAlert();
            }
        });
    }, "لغو");
}

function doSaveBlog(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = $('#frm').serialize();
    datax = window.parent.tinymce.get('text').getContent({format: 'html'}).replace(/&/gi, " ")
        .replace(/nbsp;/gi, "")
        .replace(/amp;/gi, "")
        .replace(/zwnj;/gi, "")
        .replace(/raquo;/gi, "")
        .replace(/diams;/gi, "")
        .replace(/laquo;/gi, "")
        .replace(/ndash;/gi, "")
        .replace(/times;/gi, "");
    formData += '&text=' + datax;
    dataxf = window.parent.tinymce.get('text_fa').getContent({format: 'html'}).replace(/&/gi, " ")
        .replace(/nbsp;/gi, "")
        .replace(/amp;/gi, "")
        .replace(/zwnj;/gi, "")
        .replace(/raquo;/gi, "")
        .replace(/diams;/gi, "")
        .replace(/laquo;/gi, "")
        .replace(/ndash;/gi, "")
        .replace(/times;/gi, "");
    formData += '&text_fa=' + dataxf;
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSaveBlog.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                goToUrl(MAIN_ADDRESS + 'panel/blog/id/' + obj.id + '/', false);
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function deleteBlogAudio(id) {
    showAlert('حذف فایل صوتی', 'آیا از حذف فایل صوتی مطمئن هستید؟', "حذف", function () {
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteBlogAudio.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    document.getElementById('audio_player').style.display = 'none';
                    document.getElementById('audio_delete').style.display = 'none';
                } else {
                    showNotification(obj.result);
                }
                closeAlert();
            }
        });
    }, "لغو");
}

function searchBlogCategory(element) {
    if (element.value.trim() == "") {
        document.getElementById('category_result').innerHTML = '';
        document.getElementById('category_id').value = '0';
        document.getElementById('category_result').innerHTML = '';
        return;
    }

    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/searchBlogCategory.php",
        data: ({id: element.value}),
        cache: false,
        success: function (data) {
            document.getElementById('category_result').innerHTML = data;
        }
    });
}

function selectBlogCategory(id, title) {
    document.getElementById('category_result').innerHTML = '';
    document.getElementById('category').value = title;
    document.getElementById('category_id').value = id;
}
function searchSample(element) {
    if (element.value.trim() == "") {
        document.getElementById('sample_result').innerHTML = '';
        document.getElementById('sample_id').value = '0';
        document.getElementById('sample_result').innerHTML = '';
        return;
    }

    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/searchSample.php",
        data: ({id: element.value}),
        cache: false,
        success: function (data) {
            document.getElementById('sample_result').innerHTML = data;
        }
    });
}

function selectSample(id, title) {
    document.getElementById('sample_result').innerHTML = '';
    document.getElementById('sample').value = title;
    document.getElementById('sample_id').value = id;
}

function doSavePostImg(element) {
    if (getFileNameFromAddress(element.value) != "") {
        if (document.getElementById('post-img-main').value != 'true')
            document.getElementById('btn-text-img').innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';

        var formData = new FormData($(document.getElementById('frm-img'))[0]);
        $.ajax({
            type: "post",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            url: MAIN_ADDRESS + "control/doSavePostImg.php",
            data: formData,
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    if (document.getElementById('post-img-main').value == 'true') {
                        // document.getElementById('btn-img').innerHTML = 'تصویر اصلی';
                        document.getElementById('img-img').src = obj.src;
                    } else {
                        document.getElementById('btn-text-img').innerHTML = 'بارگذاری تصویر';
                        img = '<img style="display: block; margin: 10px auto;" src="' + obj.src + '" alt="' + document.getElementById('title').value + '">'
                        tinymce.activeEditor.selection.setContent(img);
                    }
                } else {
                    showNotification(obj.result);
                }
            }
        });
    }
}

function doSaveMessageImg(element) {
    if (getFileNameFromAddress(element.value) != "") {
        if (document.getElementById('post-img-main').value != 'true')
            document.getElementById('btn-text-img').innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';

        var formData = new FormData($(document.getElementById('frm-img'))[0]);
        $.ajax({
            type: "post",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            url: MAIN_ADDRESS + "control/doSaveMessageImg.php",
            data: formData,
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    if (document.getElementById('post-img-main').value == 'true') {
                        document.getElementById('img-img').src = obj.src;
                    } else {
                        document.getElementById('btn-text-img').innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';
                        img = '<img style="display: block; margin: 10px auto;" src="' + obj.src + '" alt="' + document.getElementById('title').value + '">'
                        tinymce.activeEditor.selection.setContent(img);
                    }
                } else {
                    showNotification(obj.result);
                }
            }
        });
    }
}

function doSaveSampleImg(element) {
    if (getFileNameFromAddress(element.value) != "") {
        if (document.getElementById('post-img-main').value != 'true')
            document.getElementById('btn-text-img').innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';

        var formData = new FormData($(document.getElementById('frm-img'))[0]);
        $.ajax({
            type: "post",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            url: MAIN_ADDRESS + "control/doSaveSampleImg.php",
            data: formData,
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    if (document.getElementById('post-img-main').value == 'true') {
                        // document.getElementById('btn-img').innerHTML = 'تصویر اصلی';
                        document.getElementById('img-img').src = obj.src;
                    } else {
                        document.getElementById('btn-text-img').innerHTML = 'بارگذاری تصویر';
                        img = '<img style="display: block; margin: 10px auto;" src="' + obj.src + '" alt="' + document.getElementById('title').value + '">'
                        tinymce.activeEditor.selection.setContent(img);
                    }
                } else {
                    showNotification(obj.result);
                }
            }
        });
    }
}

function doSavePage(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = $('#frm').serialize();
    datax = window.parent.tinymce.get('text').getContent({format: 'html'}).replace(/&/gi, " ")
        .replace(/nbsp;/gi, "")
        .replace(/amp;/gi, "")
        .replace(/zwnj;/gi, "")
        .replace(/raquo;/gi, "")
        .replace(/diams;/gi, "")
        .replace(/laquo;/gi, "")
        .replace(/ndash;/gi, "")
        .replace(/times;/gi, "");
    formData += '&text=' + datax;
    dataxf = window.parent.tinymce.get('text_fa').getContent({format: 'html'}).replace(/&/gi, " ")
        .replace(/nbsp;/gi, "")
        .replace(/amp;/gi, "")
        .replace(/zwnj;/gi, "")
        .replace(/raquo;/gi, "")
        .replace(/diams;/gi, "")
        .replace(/laquo;/gi, "")
        .replace(/ndash;/gi, "")
        .replace(/times;/gi, "");
    formData += '&text_fa=' + dataxf;
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSavePage.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                goToUrl(MAIN_ADDRESS + 'panel/page/id/' + obj.id + '/', false);
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function doSavePageImg(element) {
    if (getFileNameFromAddress(element.value) != "") {
        if (document.getElementById('post-img-main').value != 'true')
            document.getElementById('btn-text-img').innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';

        var formData = new FormData($(document.getElementById('frm-img'))[0]);
        $.ajax({
            type: "post",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            url: MAIN_ADDRESS + "control/doSavePageImg.php",
            data: formData,
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    if (document.getElementById('post-img-main').value == 'true') {
                        // document.getElementById('btn-img').innerHTML = 'تصویر اصلی';
                        document.getElementById('img-img').src = obj.src;
                    } else {
                        document.getElementById('btn-text-img').innerHTML = 'بارگذاری تصویر';
                        img = '<img style="display: block; margin: 10px auto;" src="' + obj.src + '" alt="' + document.getElementById('title').value + '">'
                        tinymce.activeEditor.selection.setContent(img);
                    }
                } else {
                    showNotification(obj.result);
                }
            }
        });
    }
}

function doSendAdminTicket(element) {
    btn = element.innerHTML;
    element.innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSendAdminTicket.php",
        data: ({text: document.getElementById('text').value, id: document.getElementById('id').value}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doSendMessage(element, id) {
    btn = element.innerHTML;
    element.innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSendMessage.php",
        data: ({id: id, text: document.getElementById('text').value}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doSendMessageAdmin(element, id) {
    btn = element.innerHTML;
    element.innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSendMessageAdmin.php",
        data: ({id: id, text: document.getElementById('text').value}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function loadMessage(id) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/loadMessage.php",
        data: ({id: id}),
        cache: false,
        success: function (data) {
            document.getElementById('load_message').innerHTML = data;
        }
    });
}

function doSaveMenu(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/doSaveMenu.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                goToUrl(MAIN_ADDRESS + 'panel/setting/menu/id/' + obj.id + '/', false);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function deleteMenu(element, id) {
    showAlert('Deleted Menu', 'Will this menu be removed?', 'Yes', function () {
        btn = element.innerHTML;
        element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteMenu.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                }
                element.innerHTML = btn;
            }
        });
    }, 'No');
}

function doChangeSettingAdmin(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/doChangeSettingAdmin.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                showNotification(obj.result);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doSaveAbout(element) {
    btn = element.innerHTML;
    element.innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSaveAbout.php",
        data: ({title: document.getElementById('title').value, title_fa: document.getElementById('title_fa').value, text: document.getElementById('text').value, text_fa: document.getElementById('text_fa').value}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function addToSettingImg(element) {
    if (getFileNameFromAddress(element.value) != "") {
        document.getElementById('msg').innerHTML = '<i class="fad fa-spinner-third fa-spin"></i> در جال بارگذاری';
        var formData = new FormData($(document.getElementById('frm-img'))[0]);
        $.ajax({
            type: "post",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            url: MAIN_ADDRESS + "control/addToSettingImg.php",
            data: formData,
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                    document.getElementById('msg').innerHTML = '';
                }
            }
        });
    }
}

function addToPostImg(element) {
    if (getFileNameFromAddress(element.value) != "") {
        if (document.getElementById('post-img-element').value != 'main') {
            btn = document.getElementById('btn-' + document.getElementById('post-img-element').value);
            btnHolder = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner-third fa-spin"></i>';
        } else {
            document.getElementById('img-' + document.getElementById('post-img-element').value).style.opacity = '0.5';
            document.getElementById('i-' + document.getElementById('post-img-element').value).style.display = 'inline-block';
        }
        var formData = new FormData($(document.getElementById('frm-post-img'))[0]);
        $.ajax({
            type: "post",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            url: MAIN_ADDRESS + "control/addToPostImg.php",
            data: formData,
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    if (document.getElementById('post-img-element').value == 'text') {
                        img = '<img style="display: block; margin-left: auto; margin-right: auto;" src="' + obj.src + '" alt="' + document.getElementById('title').value + '">'
                        tinymce.activeEditor.selection.setContent(img);

                    } else if (document.getElementById('post-img-element').value == 'reset') {
                        window.location.reload(true);

                    } else if (document.getElementById('post-img-element').value == 'video') {
                        document.getElementById('video_player').innerHTML = '<video controls style="width: 100%;"><source src="' + obj.src + '" type="video/mp4"></video>';
                        document.getElementById('video_player').style.display = 'block';
                        document.getElementById('video_delete').style.display = 'inline-block';

                    } else if (document.getElementById('post-img-element').value == 'audio') {
                        document.getElementById('audio_player').innerHTML = '<audio controls style="width: calc(100% - 20px); margin: 0 10px; border-radius: 50px;"><source src="' + obj.src + '" type="audio/mpeg"></audio>';
                        document.getElementById('audio_player').style.display = 'block';
                        document.getElementById('audio_delete').style.display = 'inline-block';

                    } else {
                        document.getElementById('img-' + document.getElementById('post-img-element').value).src = obj.src;
                        document.getElementById('img-' + document.getElementById('post-img-element').value).style.opacity = '1.0';
                        document.getElementById('i-' + document.getElementById('post-img-element').value).style.display = 'none';
                    }
                } else {
                    showNotification(obj.result);
                }
                btn.innerHTML = btnHolder;
            }
        });
    }
}

var i = 0;
function progressClick() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("bar");
        var width = 1;
        var id = setInterval(frame, 1);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML = width  + "%";
            }
        }
    }
}

function sendProjectRequest(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/sendProjectRequest.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function sendNewsletterRequest(element) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/sendNewsletterRequest.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function doSendBidAnswer(element) {
    btn = element.innerHTML;
    element.innerHTML = '<i class="fad fa-spinner-third fa-spin"></i>';
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSendBidAnswer.php",
        data: ({text: document.getElementById('text').value, id: document.getElementById('id').value}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function openVisitDetail(day) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/openVisitDetail.php",
        data: ({day: day}),
        cache: false,
        success: function (data) {
            document.getElementById('showListDetail').style.display = "block";
            document.getElementById('showListDetail').style.opacity = "1";
            document.getElementById('showListDetail').innerHTML = data;
            document.getElementById('black').style.display = "block";
            document.getElementById('black').onclick = function () {
                closeVisitDetail();
            }
        }
    });
}

function closeVisitDetail() {
    document.getElementById('showListDetail').style.display = "none";
    document.getElementById('showListDetail').style.opacity = "0";
    document.getElementById('showListDetail').innerHTML = ''
    document.getElementById('black').style.display = "none";
    document.getElementById('black').onclick = null;
}

function openNotificationList() {
    document.getElementById('notification_list').className = "notification_list black_holder notification_list_open";
    document.getElementById('black').style.display = "block";
    document.getElementById('black').onclick = function () {
        closeNotificationList();
    }
}

function closeNotificationList() {
    document.getElementById('notification_list').className = "notification_list black_holder";
    document.getElementById('black').style.display = "none";
    document.getElementById('black').onclick = null;
}

function doLikeBlog(element, id) {
    btn = element.innerHTML;
    element.innerHTML = "<span>...</span><a><i class='fad fa-spinner-third fa-spin like'></i></a>";
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doLikeBlog.php",
        data: ({id: id}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                document.getElementById(id + '_like').innerHTML = '<i class="fad fa-thumbs-up"></i> <span>' + obj.like + '</span>';
                document.getElementById(id + '_dis_like').innerHTML = '<i class="fad fa-thumbs-down"></i> <span>' + obj.dis_like + '</span>';

            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function doDisLikeBlog(element, id) {
    btn = element.innerHTML;
    element.innerHTML = "<span>...</span><i class='fad fa-spinner-third fa-spin like'></i>";
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doDisLikeBlog.php",
        data: ({id: id}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                document.getElementById(id + '_like').innerHTML = '<i class="fad fa-thumbs-up"></i> <span>' + obj.like + '</span>';
                document.getElementById(id + '_dis_like').innerHTML = '<i class="fad fa-thumbs-down"></i> <span>' + obj.dis_like + '</span>';
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function doSampleLike(element, id) {
    btn = element.innerHTML;
    element.innerHTML = "<span>...</span><a><i class='fal fa-spinner-third fa-spin like'></i></a>";
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSampleLike.php",
        data: ({id: id}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                document.getElementById(id + '_like').innerHTML = '<i class="fad fa-thumbs-up"></i><span>' + obj.like + '</span>';
                document.getElementById(id + '_dis_like').innerHTML = '<i class="fad fa-thumbs-down"></i><span>' + obj.dis_like + '</span>';

            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function doSampleDisLike(element, id) {
    btn = element.innerHTML;
    element.innerHTML = "<span>...</span><i class='fal fa-spinner-third fa-spin like'></i>";
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/doSampleDisLike.php",
        data: ({id: id}),
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == 'true') {
                document.getElementById(id + '_like').innerHTML = '<i class="fad fa-thumbs-up"></i><span>' + obj.like + '</span>';
                document.getElementById(id + '_dis_like').innerHTML = '<i class="fad fa-thumbs-down"></i><span>' + obj.dis_like + '</span>';
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}

function openContactList() {
    document.getElementById('select_show_1').style.display = "block";
}

function doSearchPortfolio(count) {
    url = MAIN_ADDRESS + "portfolio/";

    for (let i = 0; i < count; i++) {
        tmp = document.getElementById('check-' + i);
        if (tmp.checked)
            url += "cat-" + tmp.value + "/";
    }

    search = document.getElementById('search_portfolio').value;
    if (search != "")
        url += 'srch-' + search + "/";

    goToUrl(url, false);
}

function setArchiveVars(type, value) {
    if (type == 'taxonomy') {
        category = value;

    }
    url = MAIN_ADDRESS + 'portfolio/';

    if (category != '')
        url += 'cat-' + category + '/';

    goToUrl(url, false);
}

function SendMessageUser(element, id) {
    btn = element.innerHTML;
    element.innerHTML = "<span><i class='fal fa-spinner-third fa-spin send_icon'></i></span>";
    var formData = new FormData($(document.getElementById('frm'))[0]);
    $.ajax({
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        type: "post",
        url: MAIN_ADDRESS + "control/SendMessageUser.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
            }
            element.innerHTML = btn;
        }
    });
}

function scrollToRight(id, size, count) {
    marginRight = document.getElementById('scroller_' + id).style.marginRight.replace('px', '');
    holder = document.getElementById('holder_' + id).offsetWidth;
    if (holder <= 496)
        size = holder - 31;
    limitCount = Math.floor(holder / size);

    if (holder >= size * count)
        return;

    if (-marginRight < size * (count - limitCount - 1))
        document.getElementById('scroller_' + id).style.marginRight = (marginRight - size) + "px";
    else
        document.getElementById('scroller_' + id).style.marginRight = (size * count - holder) * -1 + "px";
}

function scrollToLeft(id, size, count) {

    marginRight = document.getElementById('scroller_' + id).style.marginRight.replace('px', '');
    holder = document.getElementById('holder_' + id).offsetWidth;
    if (holder <= 496)
        size = holder - 31;

    if (marginRight < 0) {
        if (marginRight * 1 + size > 0)
            document.getElementById('scroller_' + id).style.marginRight = "0px";
        else
            document.getElementById('scroller_' + id).style.marginRight = (marginRight * 1 + size) + "px";
    } else {
        document.getElementById('scroller_' + id).style.marginRight = "0px";
    }
}

function scrollToRightEn(id, size, count) {
    marginLeft = document.getElementById('scroller_' + id).style.marginLeft.replace('px', '');
    holder = document.getElementById('holder_' + id).offsetWidth;
    if (holder <= 496)
        size = holder - 31;
    limitCount = Math.floor(holder / size);

    if (holder >= size * count)
        return;

    if (-marginLeft < size * (count - limitCount - 1))
        document.getElementById('scroller_' + id).style.marginLeft = (marginLeft - size) + "px";
    else
        document.getElementById('scroller_' + id).style.marginLeft = (size * count - holder) * -1 + "px";
}

function scrollToLeftEn(id, size, count) {

    marginLeft = document.getElementById('scroller_' + id).style.marginLeft.replace('px', '');
    holder = document.getElementById('holder_' + id).offsetWidth;
    if (holder <= 496)
        size = holder - 31;

    if (marginLeft < 0) {
        if (marginLeft * 1 + size > 0)
            document.getElementById('scroller_' + id).style.marginLeft = "0px";
        else
            document.getElementById('scroller_' + id).style.marginLeft = (marginLeft * 1 + size) + "px";
    } else {
        document.getElementById('scroller_' + id).style.marginLeft = "0px";
    }
}

function notificationClear(element, id) {
    showAlert('Deleted all', 'Delete all notification?', 'Yes, delete it ', function () {
        btn = element.innerHTML;
        element.innerHTML = "<i class='fal fa-spinner-third fa-spin'></i> <span>Clear now</span>";
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/notificationClear.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                }
                element.innerHTML = btn;
            }
        });
    }, 'No, do not delete');
}

function deleteNotification(element, id) {
    showAlert('Deleted', 'Delete notification?', 'Yes, delete it ', function () {
        btn = element.innerHTML;
        element.innerHTML = "<i class='fal fa-spinner-third fa-spin'></i> <span>Clear now</span>";
        $.ajax({
            type: "post",
            url: MAIN_ADDRESS + "control/deleteNotification.php",
            data: ({id: id}),
            cache: false,
            success: function (data) {
                var obj = JSON.parse(data);
                if (obj.ok == "true") {
                    window.location.reload(true);
                } else {
                    showNotification(obj.result);
                }
                element.innerHTML = btn;
            }
        });
    }, 'No, do not delete');
}

function setDatePicker(id, date, time) {
    showDatePicker(date, function () {
        showTimePicker(time, function () {
            document.getElementById(id + '_show').innerHTML = datePickerResult.substr(0, 4) + "/" + datePickerResult.substr(4, 2) + "/" + datePickerResult.substr(6, 2) + " - " + timePickerResult.substr(0, 2) + ":" + timePickerResult.substr(2, 2) + ":00";
            document.getElementById(id).value = datePickerResult + "" + timePickerResult + "00";
            document.getElementById(id + '_show').onclick = function () {
                setDatePicker(id, datePickerResult, timePickerResult);
            };
            closeAlert();
        });
    });
}

function setDatePickerOnly(id, date) {
    showDatePicker(date, function () {
        document.getElementById(id + '_show').innerHTML = datePickerResult.substr(0, 4) + "/" + datePickerResult.substr(4, 2) + "/" + datePickerResult.substr(6, 2);
        document.getElementById(id).value = datePickerResult;
        document.getElementById(id + '_show').onclick = function () {
            setDatePickerOnly(id, datePickerResult);
        };
        closeAlert();
    });
}

function changeSiteLogo() {
    element = document.getElementById('logo_btn');
    btn = element.innerHTML;
    element.innerHTML = "<i class='fal fa-spinner-third fa-spin'></i>";
    var formData = new FormData($(document.getElementById('frm-logo'))[0]);
    $.ajax({
        type: "post",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        url: MAIN_ADDRESS + "control/changeSiteLogo.php",
        data: formData,
        cache: false,
        success: function (data) {
            var obj = JSON.parse(data);
            if (obj.ok == "true") {
                window.location.reload(true);
            } else {
                showNotification(obj.result);
                element.innerHTML = btn;
            }
        }
    });
}
function openFilter(element){
        document.getElementById('side_bar').style.bottom = '0';
        element.style.color = 'var(--danger)';
        document.getElementById('black').style.display = "block";
        document.getElementById('black').onclick = function () {
            closeFilter(element);
        }
}
function closeFilter(element){
    document.getElementById('side_bar').style.bottom = '-1000%';
    element.style.color = 'var(--dark)';
    document.getElementById('black').style.display = "none";
    document.getElementById('black').onclick = null;
}