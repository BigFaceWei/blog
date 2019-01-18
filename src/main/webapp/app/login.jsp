<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String root = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en" class="no-js">

<head>
    <meta charset="utf-8">
    <title>系统登录</title>
    <link rel="icon" href="<%=root %>/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="<%=root %>/favicon.ico" type="image/x-icon"/>
    <link rel="bookmark" href="<%=root %>/favicon.ico" type="image/x-icon"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- CSS -->
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=PT+Sans:400,700'>
    <link rel="stylesheet" href="<%=root %>/app/css/login_reset.css">
    <link rel="stylesheet" href="<%=root %>/app/css/login_supersized.css">
    <link rel="stylesheet" href="<%=root %>/app/css/login_style.css">
    <script src="<%=root %>/jquery/jquery-1.8.2.min.js"></script>
    <script src="<%=root %>/app/js/supersized.3.2.7.min.js"></script>
    <script src="<%=root %>/app/js/supersized-init.js"></script>
    <script src="<%=root %>/app/js/login.js"></script>
    <link href="<%=root %>/miniui/themes/default/miniui.css" rel="stylesheet" type="text/css" charset="UTF-8"/>
    <link href="<%=root %>/miniui/themes/dsg-style/icons.css" rel="stylesheet" type="text/css" charset="UTF-8"/>
    <script src="<%=root %>/miniui/jquery-1.6.2.min.js" type="text/javascript" charset="UTF-8"></script>
    <script src="<%=root %>/miniui/miniui.js" type="text/javascript" charset="UTF-8"></script>

</head>

<body>

<div class="page-container" id="content">
    <h1>个人博客</h1>
    <form action="" method="post">
        <input type="text" id="username" name="username" class="username" placeholder="用户名" value="wxy">
        <input type="password" id="password" name="password" class="password" placeholder="密码">
        <button type="button" id="login">登录</button>
        <button type="button" id="register">注册</button>
        <div class="error"><span>+</span></div>
    </form>
    <div class="connect">
        <p></p>
    </div>
</div>
<script type="text/javascript">
    var root = "<%=root%>";
    mini.parse();
</script>
</body>

</html>

