var xmlhttp;
var xmlhttpemplyee;
var xmlhttpusertrust;
var editurl;
var editEmployeeUrl;
var addUserTrust;
var app_name = getRootPath();

function getRootPath(){
    var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return projectName;
}

function chooseZone(zone_no, organgrade) {
	window.returnValue = zone_no + ":" + organgrade;
	window.close();
}

function editRole(roleid, myRoles) {
	editurl = app_name+"/tbp/role/ShowRole.do?roleID=" + roleid;
	if (window.ActiveXObject) { // 判断是否支持ActiveX控件
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // 通过实例化ActiveXObject的一个新实例来创建XMLHTTPRequest对象
	} else if (window.XMLHttpRequest) { // 判断是否把XMLHTTPRequest实现为一个本地javascript对象
		xmlhttp = new XMLHttpRequest(); // 创建XMLHTTPRequest的一个实例（本地javascript对象）
	}
	xmlhttp.onreadystatechange = state_Change;
	var url = app_name+"/ajaxRole.do?roleid=" + roleid;
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function state_Change() {
	if (xmlhttp.readyState == 4) {
		if (xmlhttp.status == 200) {
			var result = xmlhttp.responseText;
			if (result == '0') {
				alert('该用户组角色是来自于其他嵌套用户组，您无法编辑');
			}
			if (result == '1') {
				window.location.href = editurl;
			}
		} else {
			alert("Problem retrieving XML data:" + xmlhttp.statusText);
		}
	}
}

function editEmployee(employeeid, mode, organID) {
	editEmployeeUrl = app_name+"/tbp/employee/ShowEmployee.do?employeeID="
			+ employeeid + "&mode=" + mode + "&organID=" + organID;
	if (window.ActiveXObject) { // 判断是否支持ActiveX控件
		xmlhttpemplyee = new ActiveXObject("Microsoft.XMLHTTP"); // 通过实例化ActiveXObject的一个新实例来创建XMLHTTPRequest对象
	} else if (window.XMLHttpRequest) { // 判断是否把XMLHTTPRequest实现为一个本地javascript对象
		xmlhttpemplyee = new XMLHttpRequest(); // 创建XMLHTTPRequest的一个实例（本地javascript对象）
	}
	xmlhttpemplyee.onreadystatechange = state_Change_ManageEmployee;
	var url = app_name+"/ajaxEmployee.do?organID=" + organID;

	xmlhttpemplyee.open("GET", url, true);
	xmlhttpemplyee.send(null);
}

function state_Change_ManageEmployee() {
	if (xmlhttpemplyee.readyState == 4) {
		if (xmlhttpemplyee.status == 200) {
			var result = xmlhttpemplyee.responseText;
			if (result == '1'){
				alert('对不起,该部门您已经被限制，无法进入');
			}
			if (result == '0'){
				window.location.href = editEmployeeUrl;
			}
		} else {
			alert(xmlhttpemplyee.status);
			alert("Problem retrieving XML data:" + xmlhttpemplyee.statusText);
		}
	}
}

function addEmployee(mode, organID) {
	addEmployeeUrl = app_name+"/tbp/employee/ShowEmployee.do?mode=" + mode
			+ "&organID=" + organID;
	if (window.ActiveXObject) { // 判断是否支持ActiveX控件
		xmlhttpemplyee = new ActiveXObject("Microsoft.XMLHTTP"); // 通过实例化ActiveXObject的一个新实例来创建XMLHTTPRequest对象
	} else if (window.XMLHttpRequest) { // 判断是否把XMLHTTPRequest实现为一个本地javascript对象
		xmlhttpemplyee = new XMLHttpRequest(); // 创建XMLHTTPRequest的一个实例（本地javascript对象）
	}
	xmlhttpemplyee.onreadystatechange = state_Change_AddEmployee;
	var url = app_name+"/ajaxEmployee.do?organID=" + organID;

	xmlhttpemplyee.open("GET", url, true);
	xmlhttpemplyee.send(null);
}

function state_Change_AddEmployee() {
	if (xmlhttpemplyee.readyState == 4) {
		if (xmlhttpemplyee.status == 200) {
			var result = xmlhttpemplyee.responseText;
			if (result == '1'){
				alert('对不起,该部门您已经被限制访问，无法新增');
			}
			if (result == '0'){
				window.location.href = addEmployeeUrl;
			}
		} else {
			alert(xmlhttpemplyee.status);
			alert("Problem retrieving XML data:" + xmlhttpemplyee.statusText);
		}
	}
}

function editWKFRole(roleid, myRoles) {
	editurl = app_name+"/tbp/role/ShowWKFRole.do?roleID=" + roleid;
	window.location.href = editurl;
}

function validateAddUserTrust() {
	addUserTrust = app_name+"/tbp/usertrust/ShowUserTrust.do";
	if (window.ActiveXObject) { // 判断是否支持ActiveX控件
		xmlhttpusertrust = new ActiveXObject("Microsoft.XMLHTTP"); // 通过实例化ActiveXObject的一个新实例来创建XMLHTTPRequest对象
	} else if (window.XMLHttpRequest) { // 判断是否把XMLHTTPRequest实现为一个本地javascript对象
		xmlhttpusertrust = new XMLHttpRequest(); // 创建XMLHTTPRequest的一个实例（本地javascript对象）
	}
	xmlhttpusertrust.onreadystatechange = state_Change_AddUserTrust;
	var url = app_name+"/ajaxUserTrust.do"+"?"+Math.random();//加上随机数，防止ie6下缓存

	xmlhttpusertrust.open("GET", url, true);
	xmlhttpusertrust.send(null);
}

function state_Change_AddUserTrust() {
	if (xmlhttpusertrust.readyState == 4) {
		if (xmlhttpusertrust.status == 200) {
			var result = xmlhttpusertrust.responseText;
			if (result == '1'){
				alert('对不起,您已经委托了一个用户，无法委托其他用户！');
			}
			if (result == '0'){
				window.location.href = addUserTrust;
			}
		} else {
			alert(xmlhttpusertrust.status);
			alert("Problem retrieving XML data:" + xmlhttpusertrust.statusText);
		}
	}
}

function ChangeSession(uid, other) {
	parent.parent.location.href = app_name+"/tbp/usertrust/ChangeSession.do?userid="
			+ uid + "&changeFlag=other";
}

function sessionSelf() {
	parent.parent.location.href = app_name+"/tbp/usertrust/ChangeSession.do?changeFlag=me";
}
