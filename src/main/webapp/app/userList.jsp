<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="/struts-tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page language="java" import="java.util.*" %>
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
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>用户列表</title>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="/blog/app/css/style.css"/>
    <link rel="icon" href="<%=root %>/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="<%=root %>/favicon.ico" type="image/x-icon"/>
    <link rel="bookmark" href="<%=root %>/favicon.ico" type="image/x-icon"/>
    <script type="text/javascript" src="/blog/miniui/boot.js"></script>
    <script type="text/javascript" src="/blog/jquery/jquery-1.6.4.min.js"></script>
    <script type="text/javascript" src="/blog/jquery/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="/blog/app/js/user.js"></script>

    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- 可选的 Bootstrap 主题文件（一般不用引入） -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
    <div class="row clearfix">
        <div class="col-md-12 column">
            <nav class="navbar navbar-default" role="navigation">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"><span
                            class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span
                            class="icon-bar"></span><span class="icon-bar"></span></button>
                    <a class="navbar-brand" href="#">搜索</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                    <form class="navbar-form navbar-left" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control"/>
                            <input type="text" class="form-control"/>
                        </div>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </form>

                </div>
            </nav>

            <table class="table">
                <thead>
                <tr>
                    <th>
                        编号
                    </th>
                    <th>
                        账号
                    </th>
                    <th>
                        密码
                    </th>
                    <th>
                        管理员
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>

           
                    <tr>
                            <td><s:property value="#user.blogUserId"/></td>
                            <td><s:property value="#user.userAccount"/></td>
                            <td><s:property value="#user.userPassword"/></td>
                            <td><s:property value="#user.userIsAdmin"/></td>
                            <%--<td><s:property value="#user.identity"/></td>--%>
                            <%--<td><a href="editUser.action?id=<s:property value="#user.id"/>&pageNum=${pageNum}">编辑</a>--%>
                            <%--<a href="delUser.action?id=<s:property value="#user.id"/>&pageNum=${pageNum}">删除</a>--%>
                            <%--</td>--%>
                    </tr>
          

                <tr class="warning">
                    <td>
                        3
                    </td>
                    <td>
                        TB - Monthly
                    </td>
                    <td>
                        03/04/2012
                    </td>
                    <td>
                        03/04/2012
                    </td>

                </tr>
                <tr class="info">
                    <td>
                        4
                    </td>
                    <td>
                        TB - Monthly
                    </td>
                    <td>
                        04/04/2012
                    </td>
                    <td>
                        04/04/2012
                    </td>

                </tr>
                </tbody>
            </table>

            <ul class="pagination">
                <li>
                    <a href="#">Prev</a>
                </li>
                <li>
                    <a href="#">1</a>
                </li>
                <li>
                    <a href="#">2</a>
                </li>
                <li>
                    <a href="#">3</a>
                </li>
                <li>
                    <a href="#">4</a>
                </li>
                <li>
                    <a href="#">5</a>
                </li>
                <li>
                    <a href="#">Next</a>
                </li>
            </ul>
        </div>
    </div>
</div>
</body>
</html>