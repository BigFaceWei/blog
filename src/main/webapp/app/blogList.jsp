<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%@page import="java.util.List" %>
<%@page import="java.util.Map" %>
<%@page import="com.wxy.model.BlogUser" %>
<%
    String root = request.getContextPath();
    BlogUser user = (BlogUser) request.getAttribute("user");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>个人博客V1.0</title>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="/blog/app/css/style.css"/>
    <link rel="icon" href="/blog/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="/blog/favicon.ico" type="image/x-icon"/>
    <link rel="bookmark" href="/blog/favicon.ico" type="image/x-icon"/>
    <script type="text/javascript" src="/blog/miniui/boot.js"></script>
    <script type="text/javascript" src="/blog/jquery/jquery-1.6.4.min.js"></script>
    <script type="text/javascript" src="/blog/jquery/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="/blog/app/js/blogIndex.js"></script>

    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- 可选的 Bootstrap 主题文件（一般不用引入） -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
</head>
<body>
<div id="wrapper">
    <div id="header">
        <div id="logo"><img alt="blog" src="<%=root%>/app/images/logo.png" width="60" height="60"/></div>
        <div id="title">个人博客V1.0</div>
        <div id="user_info">
            <div id="user_img"><img alt="logo" src="<%=root%>/app/images/user/user.png" width="60" height="60"/></div>
            <div id="welcome">欢迎<span style="color:green;"><s:property value="#session.username"/></span>使用本系统</div>
            <div id="logout">安全退出</div>
        </div>
    </div>
</div>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <nav class="navbar navbar-default" role="navigation">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span><span class="icon-bar"></span>
                        <span class="icon-bar"></span></button>
                    <a class="navbar-brand" href="blogAction!index.do">博客</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li>
                            <a href="userAction!search.do">用户管理</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li>
                            <a href="blogAction!goAdd.do">新增博客</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <s:iterator id="blog" value="blogs" status="status">
            <div class="col-md-12 column">
                <h2>
                    <s:property value="#blog.blogTitle"/>
                </h2>
                <p>
                    <a class="btn" href="#">详情 »</a>
                </p>
            </div>
        </s:iterator>
    </div>
</div>
<div id="overlay" style="display: none;">
</div>
<div id="slide" style="display: none;">
    <span id="slider"></span>
    <span id="text"></span>
</div>
</body>
<script type="text/javascript">
    var c = 0;
    var t;

    function timedCount() {
        c = c + 1;
        if (c === 60) {
            $("#slide").fadeIn();
            $("#overlay").fadeIn();
        }
        t = setTimeout("timedCount()", 1000);
    }

    function stopCount() {
        clearTimeout(t);
    }

    function screenAdapter() {
        var bodyWidth = $(window).width();
        var bodyHeight = $(window).height();

        $("#main").css({
            "width": (bodyWidth - 15) + "px",
            "height": (bodyHeight - $("#header").height() - $("#footer").height()) + "px"
        });
    }

    window.onscroll = function () {
        screenAdapter()
    };
    window.onresize = function () {
        screenAdapter()
    };
    window.onload = function () {
        screenAdapter()
    };

    $(function () {
        timedCount();
        var slideWidth = $("#slide").width();
        $("#slider").draggable({
            axis: 'x',
            containment: 'parent',
            drag: function (event, ui) {
                if (ui.position.left > slideWidth * 0.7) {
                    $("#slide").fadeOut();
                    $("#overlay").fadeOut();
                    $(this).animate({left: 0});
                    c = 0;
                }
            },
            stop: function (event, ui) {
                if (ui.position.left < slideWidth * 0.7) {
                    $(this).animate({left: 0});
                }
            }
        });

        $("body").keydown(function () {
            c = 0;
        });
        $("body").mousedown(function () {
            c = 0;
        });
    });
</script>
</html>