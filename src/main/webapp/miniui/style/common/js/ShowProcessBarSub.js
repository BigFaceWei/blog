

AddProcessbar();
var bwidth = 0;
var swidth = document.getElementById("waiting").clientWidth;

function startProcess(e) {
	if (e == 1) {
		if (bwidth < swidth * 0.97) {
			bwidth += (swidth - bwidth) * 0.025;
			if (document.all) {
				document.sbar.width = bwidth;
			} else {
				document.rating.clip.width = bwidth;
			}
			setTimeout("startProcess(1);", 150);
		}
//		else{
//			startProcess(1);
//		}
	} else  {

		if (document.all) {
			if (document.getElementById("waiting").style.visibility == "visible") {
				document.getElementById("waiting").style.visibility = "hidden";
				bwidth = false;
			}
			
			document.getElementById("waiting").style.pixelTop = (document.body.offsetHeight - document.getElementById("waiting").clientHeight) / 2 + document.body.scrollTop;
			document.getElementById("waiting").style.pixelLeft = (document.body.offsetWidth - document.getElementById("waiting").clientWidth) / 2 + document.body.scrollLeft;
			document.getElementById("waiting").style.visibility = "visible";
			if (!bwidth) {
				startProcess(1);
			}
			bwidth = 1;
		} else {
			if (document.waiting.visibility == "show") {
				document.waiting.visibility = "hide";
				document.rating.visibility = "hide";
				bwidth = 1;
			}
			if (e.target.href.toString() != "") {
				document.waiting.top = (window.innerHeight - document.waiting.clip.height) / 2 + self.pageYOffset;
				document.waiting.left = (window.innerWidth - document.waiting.clip.width) / 2 + self.pageXOffset;
				document.waiting.visibility = "show";
				document.rating.top = (window.innerHeight - document.waiting.clip.height) / 2 + self.pageYOffset + document.waiting.clip.height - 10;
				document.rating.left = (window.innerWidth - document.waiting.clip.width) / 2 + self.pageXOffset;
				document.rating.visibility = "show";
				if (!bwidth) {
					startProcess(1);
				}
				bwidth = 1;
			}
		}
		return true;
	}
}
function AddProcessbar() {
	var Str = "";
	Str += "<div id=waiting style=width:300px;height:30px;visibility:hidden >";
	Str += "<layer name=waiting visibility=visible zIndex=2 >";
	Str += "<table border=1 cellspacing=1 cellpadding=0 bordercolorlight=#f0f5fa bordercolordark=#99bbe8 bgcolor=#d4e1f2>";
	Str += " <tr>";
	Str += " <td bgcolor=#d4e1f2 height=30px width=300px align=center>";
	Str += " <font color=black>正在处理...</font>";
	Str += " </td>";
	Str += " </tr>";
	Str += " <tr>";
	Str += " <td bgcolor=#d4e1f2>";
	Str += " <img width=1 height=10 name=sbar style=background-color:#10d430>";
	Str += " </td>";
	Str += " </tr>";
	Str += "</table> ";
	Str += "</layer>";
	Str += "</div>";
	document.write(Str);
	document.body.topmargin="6699cc";
	document.body.marginheight="0px";
	
}


