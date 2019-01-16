<%@ taglib prefix="s" uri="/struts-tags" %>
<%--
  Created by IntelliJ IDEA.
  User: xinya
  Date: 2019/1/13
  Time: 20:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>新增用户</title>
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
            <s:form action="userAction!add" method="post">
                <s:token />
                <div class="form-group">
                    <label for="account">账号</label>
                <input type="text" class="form-control" name="user.userAccount" id="account" />
                </div>
                <div class="form-group">
                    <label for="pwd">密码</label>
                <input type="password" class="form-control" name="user.userPassword" id="pwd" />
                </div>
                <s:if test="blogUserId != -1">
                    <div class="form-group">
                        <label for="userIsAdmin">身份</label>
                        <input id="userIsAdmin" name="user.userIsAdmin" type="radio" value="NO" checked="checked"/>用户
                        <input name="user.userIsAdmin" type="radio" value="YES"/>管理员 <br/>
                    </div>
                </s:if>
                </div> <button type="submit" class="btn btn-default">确定</button>
            </s:form>
        </div>
    </div>
</div>
</body>
</html>