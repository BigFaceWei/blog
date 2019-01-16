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
	if (window.ActiveXObject) { // �ж��Ƿ�֧��ActiveX�ؼ�
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // ͨ��ʵ����ActiveXObject��һ����ʵ��������XMLHTTPRequest����
	} else if (window.XMLHttpRequest) { // �ж��Ƿ��XMLHTTPRequestʵ��Ϊһ������javascript����
		xmlhttp = new XMLHttpRequest(); // ����XMLHTTPRequest��һ��ʵ��������javascript����
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
				alert('���û����ɫ������������Ƕ���û��飬���޷��༭');
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
	if (window.ActiveXObject) { // �ж��Ƿ�֧��ActiveX�ؼ�
		xmlhttpemplyee = new ActiveXObject("Microsoft.XMLHTTP"); // ͨ��ʵ����ActiveXObject��һ����ʵ��������XMLHTTPRequest����
	} else if (window.XMLHttpRequest) { // �ж��Ƿ��XMLHTTPRequestʵ��Ϊһ������javascript����
		xmlhttpemplyee = new XMLHttpRequest(); // ����XMLHTTPRequest��һ��ʵ��������javascript����
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
				alert('�Բ���,�ò������Ѿ������ƣ��޷�����');
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
	if (window.ActiveXObject) { // �ж��Ƿ�֧��ActiveX�ؼ�
		xmlhttpemplyee = new ActiveXObject("Microsoft.XMLHTTP"); // ͨ��ʵ����ActiveXObject��һ����ʵ��������XMLHTTPRequest����
	} else if (window.XMLHttpRequest) { // �ж��Ƿ��XMLHTTPRequestʵ��Ϊһ������javascript����
		xmlhttpemplyee = new XMLHttpRequest(); // ����XMLHTTPRequest��һ��ʵ��������javascript����
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
				alert('�Բ���,�ò������Ѿ������Ʒ��ʣ��޷�����');
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
	if (window.ActiveXObject) { // �ж��Ƿ�֧��ActiveX�ؼ�
		xmlhttpusertrust = new ActiveXObject("Microsoft.XMLHTTP"); // ͨ��ʵ����ActiveXObject��һ����ʵ��������XMLHTTPRequest����
	} else if (window.XMLHttpRequest) { // �ж��Ƿ��XMLHTTPRequestʵ��Ϊһ������javascript����
		xmlhttpusertrust = new XMLHttpRequest(); // ����XMLHTTPRequest��һ��ʵ��������javascript����
	}
	xmlhttpusertrust.onreadystatechange = state_Change_AddUserTrust;
	var url = app_name+"/ajaxUserTrust.do"+"?"+Math.random();//�������������ֹie6�»���

	xmlhttpusertrust.open("GET", url, true);
	xmlhttpusertrust.send(null);
}

function state_Change_AddUserTrust() {
	if (xmlhttpusertrust.readyState == 4) {
		if (xmlhttpusertrust.status == 200) {
			var result = xmlhttpusertrust.responseText;
			if (result == '1'){
				alert('�Բ���,���Ѿ�ί����һ���û����޷�ί�������û���');
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
