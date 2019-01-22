jQuery(document).ready(function () {
    $('#logout').click(function () {
        exist();
    });
    findAll();
});
function findAll(){
    alert("test-ajax");
    jQuery.ajax({
        type: 'post',
        url: "/blog/blogAction!search.do",
        async: false,
        dataType: 'json',
        data:{},
        cache: false,
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (data) {
            if(typeof(data)!='undefined'){
                if(data.result ==="false"){

                }else if(data.result ==="true"){

                }
            }
        }
    });
}

function exist() {
    jQuery.ajax({
        type: 'post',
        url: "/blog/userAction!exist.do",
        async: false,
        dataType: 'json',
        cache: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        beforeSend: function () {
            maskobj("content", "正在注销...");
        },
        success: function (data) {
            if (typeof (data) != 'undefined') {
                if (data.result === "false") {
                    showTips("退出失败", 4000);
                } else if (data.result === "true") {
                    showTips("退出成功", 1000);
                    window.location.href = "/blog/userAction!login.do";
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

