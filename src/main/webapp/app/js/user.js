jQuery(document).ready(function() {
    findAll();
});

function findAll(){
    jQuery.ajax({
        type: 'post',
        url: "/blog/userAction!findAll.do",
        async: false,
        dataType: 'json',
        data:{},
        cache: false,
        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
        success: function (data) {
            if(typeof(data)!='undefined'){
                if(data.result ==="false"){

                }else if(data.result ==="true"){
                    // window.location.href = "/blog/loginAction!index.do";
                }
            }
        }
    });
}