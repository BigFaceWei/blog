jQuery(document).ready(function () {

    $('#register').click(function () {
        window.location.href = "/blog/userAction!goAdd.do";
    });

    $('#login').click(function () {
        var username = $('.username').val();
        var password = $('.password').val();
        if (username === '') {
            $('.error').fadeOut('fast', function () {
                $(this).css('top', '27px');
            });
            $('.error').fadeIn('fast', function () {
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if (password === '') {
            $('.error').fadeOut('fast', function () {
                $(this).css('top', '96px');
            });
            $('.error').fadeIn('fast', function () {
                $(this).parent().find('.password').focus();
            });
            return false;
        }

        login();
    });

    $('.page-container form .username, .page-container form .password').keyup(function () {
        $(this).parent().find('.error').fadeOut('fast');
    });

});

function login() {
    var username = $('.username').val();
    var password = $('.password').val();

    jQuery.ajax({
        type: 'post',
        url: "/blog/userAction!loginCheck.do",
        async: false,
        dataType: 'json',
        data: {username: username, password: password},
        cache: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        beforeSend: function () {
            maskobj("content", "正在登陆...");
        },
        success: function (data) {
            if (typeof (data) != 'undefined') {
                if (data.result === "false") {
                    showTips("用户名或密码错误,登陆失败", 4000);
                } else if (data.result === "true") {
                    showTips("登陆成功", 1000);
                    window.location.href = "/blog/userAction!index.do";
                }
                unmaskobj("content");
            }
        }
    });
}


function maskobj(objid, msg) {
    mini.mask({
        el: document.getElementById(objid),
        cls: 'mini-mask-loading',
        html: msg
    });
    setTimeout(function () {
        mini.unmask(document.getElementById(objid));
    }, 20000);
}

function unmaskobj(objid) {
    mini.unmask(document.getElementById(objid));
}

function showTips(msg, time) {
    mini.showTips({
        content: msg,
        state: "danger",
        x: "center",
        y: "center",
        timeout: time
    });
}

