// $(document).ready(function () {
//     $("a").on('click', function (event) {
//         if (this.hash !== "") {
//             event.preventDefault();
//             var hash = this.hash;
//             $('html, body').animate({
//                 scrollTop: $(hash).offset().top
//             }, 800, function () {
//                 //window.location.hash = hash;
//             });
//         }
//     });
// });

function reLogin() {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/reLogin.php",
        data: 'user=true',
        cache: false,
        success: function (data) {
        }
    });
}

function getFileNameFromAddress(fullPath) {
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    var filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    return filename;
}

function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#' + id).attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

function numToFarsi(tmpcon) {
    var tmp = tmpcon + '';
    tmp = tmp.replace(/0/g, '۰');
    tmp = tmp.replace(/1/g, '۱');
    tmp = tmp.replace(/2/g, '۲');
    tmp = tmp.replace(/3/g, '۳');
    tmp = tmp.replace(/4/g, '۴');
    tmp = tmp.replace(/5/g, '۵');
    tmp = tmp.replace(/6/g, '۶');
    tmp = tmp.replace(/7/g, '۷');
    tmp = tmp.replace(/8/g, '۸');
    tmp = tmp.replace(/9/g, '۹');
    return tmp;
}

function getCurrency(num) {
    num = num.toString();
    ArrTmp = [];
    if (num.length > 3) {
        j = num.length - 1;
        tmp = "";
        for (i = 0; i < num.length; i++) {
            ArrTmp[j] = num.charAt(i);
            j--;
        }
        for (i = num.length - 1; i >= 0; i--) {
            tmp += ArrTmp[i];
            if (i % 3 == 0 && i != 0)
                tmp += ",";
        }
        return numToFarsi(tmp);
    } else {
        return numToFarsi(num);
    }
}

function isValidNumber(num) {
    if (!Number.isInteger(num * 1) ||
        num * 1 < 0) {
        return false;
    }
    return true;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randString(len) {
    str = "";
    for (i = 1; i <= len; i++) {
        ch = rand(48, 122);
        while ((ch > 57 && ch <= 64) || (ch > 90 && ch <= 96)) {
            ch = rand(48, 122);
        }
        str += String.fromCharCode(ch);
    }
    return str;
}

function goToUrl(url, tab = true) {
    if (tab)
        window.open(url, '_blank');
    else
        window.open(url, '_self');
}

/***************** message box and notification *******************/
/***************** message box and notification *******************/

var msgBoxTimer = null;
var msgBoxCounter = 9;

function showNotification(msg, autoClose = true) {
    hideNotification();

    document.getElementById('msg-text').innerHTML = msg;
    document.getElementById('msg-btn').innerHTML = '<i class="fad fa-times"></i>';

    if (autoClose) {
        document.getElementById('msg-btn').innerHTML = ('10');
        msgBoxCounter = 9;
        msgBoxTimer = setInterval(autoHideNotification, 1000);
    }

    document.getElementById('msg-box').style.bottom = "50px";
}

function hideNotification() {
    h = document.getElementById('msg-box').offsetHeight;
    document.getElementById('msg-box').style.bottom = "-" + h + "px";
    clearInterval(msgBoxTimer);
}

function autoHideNotification() {
    document.getElementById('msg-btn').innerHTML = (msgBoxCounter);
    if (msgBoxCounter == 0)
        hideNotification();
    else
        msgBoxCounter--;
}

function cancelAutoHideNotification() {
    document.getElementById('msg-btn').innerHTML = '<i class="fad fa-times"></i>';
    msgBoxCounter = 9;
    clearInterval(msgBoxTimer);
}

// showAlert("عنوان", "متن پیام", "بله", function () {
//     alert(1);
// }, "خیر", function () {
//     alert(2);
//     closeAlert();
// }, false);
function showAlert(title, text, positive, positiveOnClick, negative = '', negativeOnClick = null, allowClose = true) {
    document.getElementById('alert-title').innerHTML = title;
    document.getElementById('alert-text').innerHTML = text;
    document.getElementById('alert-positive').innerHTML = positive;
    document.getElementById('alert-positive').onclick = positiveOnClick;

    if (negative != '') {
        document.getElementById('alert-negative').style.display = 'block';
        document.getElementById('alert-negative').innerHTML = negative;

        if (negativeOnClick == null) {
            document.getElementById('alert-negative').onclick = function () {
                closeAlert();
            };
        } else {
            document.getElementById('alert-negative').onclick = negativeOnClick;
        }
    } else {
        document.getElementById('alert-negative').style.display = 'none';
    }

    if (!allowClose) {
        document.getElementById('black').onclick = null;
        document.getElementById('alert-close').style.display = 'none';
    }

    document.getElementById('alert').style.display = 'block';
    document.getElementById('black').style.display = 'block';

    setTimeout(function () {
        document.getElementById('alert').style.opacity = '1.0';
    }, 50);
}

function closeAlert() {
    document.getElementById('black').style.display = 'none';
    document.getElementById('alert').style.opacity = '0.0';

    setTimeout(function () {
        document.getElementById('alert').style.display = 'none';
    }, 200);
}

// USE
// function setDatePicker(date, time) {
//     showDatePicker(date, function () {
//         showTimePicker(time, function () {
//             document.getElementById('time_show').innerHTML = timePickerResult.substr(0, 2) + ":" + timePickerResult.substr(2, 2) + " - " + datePickerResult.substr(0, 4) + "/" + datePickerResult.substr(4, 2) + "/" + datePickerResult.substr(6, 2);
//             document.getElementById('time').value = datePickerResult + "" + timePickerResult + "00";
//             document.getElementById('time_show').onclick = function () {
//                 setDatePicker(datePickerResult, timePickerResult);
//             };
//             closeAlert();
//         });
//     });
// }

var datePickerResult = '';

function showDatePicker(date, onSelected) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/showDatePicker.php",
        data: ({date: date}),
        cache: false,
        success: function (data) {
            showAlert('<i class="fad fa-calendar-alt"></i> <span>انتخاب تاریخ</span>', data, 'تایید', function () {
                datePickerResult = document.getElementById('date_picker_result').value;
                onSelected();
            });
        }
    });
}

function changeDatePicker(date) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/showDatePicker.php",
        data: ({date: date}),
        cache: false,
        success: function (data) {
            document.getElementById('alert-text').innerHTML = data;
        }
    });
}

function selectDay(day, yearMonth) {
    document.getElementsByClassName('selected_date')[0].className = "";
    document.getElementById(day).className = "selected_date";

    document.getElementById('date_picker_result').value = yearMonth + day;
    document.getElementById('date_picker_current').innerHTML = yearMonth.substr(0, 4) + "/" + yearMonth.substr(4, 2) + "/" + day;
}

function changeDatePickerMonth(year) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/changeDatePickerMonth.php",
        data: ({year: year}),
        cache: false,
        success: function (data) {
            document.getElementById('alert-text').innerHTML = data;
        }
    });
}

function changeDatePickerYear(year) {
    $.ajax({
        type: "post",
        url: MAIN_ADDRESS + "control/changeDatePickerYear.php",
        data: ({year: year}),
        cache: false,
        success: function (data) {
            document.getElementById('alert-text').innerHTML = data;
        }
    });
}

var timePickerResult = '';

function showTimePickerSet(time) {
    hour = time.substr(0, 2);
    minute = time.substr(2, 2);

    return '' +
        '<div class="calendar_holder">\n' +
        '        <div class="calender_month">\n' +
        '            <i class="fad fa-plus right" onclick="timePickerAddHour(' + hour + ', ' + minute + ');"></i>\n' +
        '            <span id="time_picker_current">' + hour + '</span>\n' +
        '            <i class="fad fa-minus left" onclick="timePickerSubHour(' + hour + ', ' + minute + ');"></i>\n' +
        '            <div class="clear"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="calendar_holder" style="margin-top: 10px;">\n' +
        '        <div class="calender_month">\n' +
        '            <i class="fad fa-plus right"onclick="timePickerAddMinute(' + hour + ', ' + minute + ');"></i>\n' +
        '            <span>' + minute + '</span>\n' +
        '            <i class="fad fa-minus left"onclick="timePickerSubMinute(' + hour + ', ' + minute + ');"></i>\n' +
        '            <div class="clear"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="calender_month" style="margin-top: 10px;">\n' +
        '        <span id="time_picker_current" style="cursor: context-menu; color: #FFFFFF;">' + hour + ':' + minute + '</span>\n' +
        '        <input id="time_picker_result" type="hidden" value="' + time + '">\n' +
        '    </div>';
}

function showTimePicker(time, onSelected) {
    showAlert('<i class="fad fa-clock"></i> <span>انتخاب زمان</span>', showTimePickerSet(time), 'تایید', function () {
        timePickerResult = document.getElementById('time_picker_result').value;
        onSelected();
    });
}

function timePickerAddHour(hour, minute) {
    hour++;
    if (hour > 23)
        hour = "00";
    else if (hour < 10)
        hour = "0" + hour;

    if (minute < 10)
        minute = "0" + minute;

    document.getElementById('alert-text').innerHTML = showTimePickerSet(hour + "" + minute);
}

function timePickerSubHour(hour, minute) {
    hour--;
    if (hour < 0)
        hour = "23";
    else if (hour < 10)
        hour = "0" + hour;

    if (minute < 10)
        minute = "0" + minute;

    document.getElementById('alert-text').innerHTML = showTimePickerSet(hour + "" + minute);
}

function timePickerAddMinute(hour, minute) {
    minute++;
    if (minute > 59)
        minute = "00";
    else if (minute < 10)
        minute = "0" + minute;

    if (hour < 10)
        hour = "0" + hour;

    document.getElementById('alert-text').innerHTML = showTimePickerSet(hour + "" + minute);
}

function timePickerSubMinute(hour, minute) {
    minute--;
    if (minute < 0)
        minute = "59";
    else if (minute < 10)
        minute = "0" + minute;

    if (hour < 10)
        hour = "0" + hour;

    document.getElementById('alert-text').innerHTML = showTimePickerSet(hour + "" + minute);
}

/***************** text editor *******************/
/***************** text editor *******************/

function DoBoldFunction(Tid) {
    editor = document.getElementById(Tid);

    if (editor.selectionStart) selectionStart = editor.selectionStart;
    if (editor.selectionEnd) selectionEnd = editor.selectionEnd;
    editorHTML = editor.value;

    if (selectionStart != selectionEnd) {
        editorCharArray = editorHTML.split("");
        editorCharArray.splice(selectionEnd, 0, "</b>");
        editorCharArray.splice(selectionStart, 0, "<b>"); //must do End first
        editorHTML = editorCharArray.join("");
        editor.value = editorHTML;
    }
}

function DoDoteFunction(Tid) {
    editor = document.getElementById(Tid);

    if (editor.selectionStart) selectionStart = editor.selectionStart;
    if (editor.selectionEnd) selectionEnd = editor.selectionEnd;
    editorHTML = editor.value;
    editorCharArray = editorHTML.split("");
    editorCharArray.splice(selectionEnd, 0, "");
    editorCharArray.splice(selectionStart, 0, "•"); //must do End first
    editorHTML = editorCharArray.join("");
    editor.value = editorHTML;
}

function DoDiamondFunction(Tid) {
    editor = document.getElementById(Tid);

    if (editor.selectionStart) selectionStart = editor.selectionStart;
    if (editor.selectionEnd) selectionEnd = editor.selectionEnd;
    editorHTML = editor.value;
    editorCharArray = editorHTML.split("");
    editorCharArray.splice(selectionEnd, 0, "");
    editorCharArray.splice(selectionStart, 0, "♦"); //must do End first
    editorHTML = editorCharArray.join("");
    editor.value = editorHTML;
}