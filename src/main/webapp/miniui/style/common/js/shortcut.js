
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
			alert("��Ϣ�����쳣:�����ڷ��������ҵ���Ϣ�������.");
			}
			errorcount++;
		}
		if (xmlHttp.status == 3) {
			if (errorcount <= 2){
			alert("��Ϣ�����쳣:�Ҳ���������.");
			}
			errorcount++;
		}
		if (xmlHttp.status == 12029) {
			if (errorcount <= 2){
			alert("��Ϣ�����쳣:�����������ѹر�.");
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
			alert("�ر���Ϣ���ѷ���:��Ϣ�����������η����쳣.(���輤�����ѷ���,�����µ�½)");
		}
	};
	timer = setInterval(message1, 300000, "");
}



checkMessage();




