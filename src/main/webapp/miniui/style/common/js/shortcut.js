
var xmlHttp = false;
var errorcount = 0;
function doAjax() {
	try {
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e) {
		try {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e2) {
			xmlHttp = false;
		}
	}
	if (!xmlHttp && typeof XMLHttpRequest != "undefined") {
		xmlHttp = new XMLHttpRequest();
	}
	if (xmlHttp) {
		var pathName=window.document.location.pathname;
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		xmlHttp.open("POST", projectName+"/tbp/tableViewAction.do?method=refreshMessage", true);
		xmlHttp.onreadystatechange = complete;
		xmlHttp.send(null);
	}
}
function complete() {
	if (xmlHttp.readyState == 4) {
		checkXmlHttp();
		if (xmlHttp.status == 200) {
			var dom = xmlHttp.responseXML;

				var okDom = dom.selectNodes("hasMessage");
				if (okDom.length != 0) {
					alert(okDom[0].text);
				} 

		}
	}
}
function checkXmlHttp(){
	if (xmlHttp.status == 404 || xmlHttp.status == 400) {
			if (errorcount <= 2){
			alert("消息提醒异常:不能在服务器上找到消息服务组件.");
			}
			errorcount++;
		}
		if (xmlHttp.status == 3) {
			if (errorcount <= 2){
			alert("消息提醒异常:找不到服务器.");
			}
			errorcount++;
		}
		if (xmlHttp.status == 12029) {
			if (errorcount <= 2){
			alert("消息提醒异常:服务器可能已关闭.");
			}
			errorcount++;
		}
}




function checkMessage() {
	doAjax();
	message1 = function cMessage1(aaa) {
		doAjax();
		if (errorcount > 2) {
			clearInterval(timer);
			alert("关闭消息提醒服务:消息提醒连续三次发生异常.(如需激活提醒服务,请重新登陆)");
		}
	};
	timer = setInterval(message1, 300000, "");
}



checkMessage();




