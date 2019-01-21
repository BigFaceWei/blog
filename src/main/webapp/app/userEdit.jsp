<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="/struts-tags" %>
<html>
<head>
    <title>用户信息</title>
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
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <s:form action="userAction!upd" method="post">
            <s:token />
            <input type="text" hidden="hidden" name="user.blogUserId" value =<s:property value ="user.blogUserId" /> />
            <div class="form-group">
                <label for="account">账号</label>
                <input id="account" type="text" class="form-control" name="user.userAccount" value =<s:property value ="user.userAccount" /> />
            </div>
            <div class="form-group">
                <label for="pwd">密码</label>
                <input id="pwd" type="text" class="form-control" name="user.userPassword" value =<s:property value ="user.userPassword" /> />
            </div>
            <div class="form-group">
                <label for="userIsAdmin">身份：</label>
                <input id="userIsAdmin" name="user.userIsAdmin" type="radio" value="NO" checked=<s:if test="user.userIsAdmin=='NO'"> "checked" </s:if> />用户
                <input type="radio"  name="user.userIsAdmin" value="YES" <s:if test="user.userIsAdmin=='YES'"> checked="checked" </s:if> />管理员 <br/>
            </div>
        </div> <button type="submit" class="btn btn-default">更新</button>
        </s:form>
    </div>
</div>
</body>
</html>
