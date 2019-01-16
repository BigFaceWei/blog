

createProcessbar();

function startProcess() {
	document.frames("waitingFrame").startProcess();
	document.getElementById("mainWaiting").style.visibility = "visible";
	
	
}
function createProcessbar() {
	var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	var Str = "";
	Str += "<div id=mainWaiting  style=position:absolute;width:324px;height:90px;margin-left:-162px;margin-top:-45px;left:50%;top:50%;text-align:center;visibility:hidden;>";
	Str +="<IFRAME id=waitingFrame width=100% height=100% src='"+projectName+"/style/common/js/showProcess.html' allowTransparency='true' frameBorder=0></IFRAME>";
	Str += "</div>";
	document.write(Str);
}

