function openScreenDialog(url){
	var w=screen.availWidth-10;
	var h=screen.availHeight-30;
	var strNode =window.showModalDialog(url,window, 'dialogWidth:'+w+'px;dialogHeight:'+h+'px;edge:sunken;help:no;resizable:yes;scroll:auto;status:no;unadorned:no ');	
	if(strNode != null && strNode == 1){
		if(typeof(pfGVar)!="undefined" && pfGVar.gridName==="jqGrid"){//jqGrid，该视图是ajax获取数据，刷新页面会导致前面的查询条件丢失
			tv_refresh_table_data();
		}else{
			window.location.reload();   
		}
	}
}
function openScreenDialogRefreshParent(url){
	var w=screen.availWidth-10;
	var h=screen.availHeight-30;
	var strNode =window.showModalDialog(url,window, 'dialogWidth:'+w+'px;dialogHeight:'+h+'px;edge:sunken;help:no;resizable:yes;scroll:auto;status:no;unadorned:no ');	
    window.location.reload();   
}
function openDialog(url,w,h){
	var strNode =window.showModalDialog(url,window, 'dialogWidth:'+w+'px;dialogHeight:'+h+'px;edge:sunken;help:no;resizable:yes;scroll:auto;status:no;unadorned:no ');
	window.location.reload();
}

function trim(s)
{
    return s.replace(/(^\s*)|(\s*$)|(^\t*)|(\t*$)|(^\n*)|(\n*$)|(^\r*)|(\r*$)/g, "");
}

function OpenMaxWindow(strURL){
    var w = 750;
    var h = 560;
    var l = (screen.availWidth-w)/2;
    var s = "left="+l+",top=100,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,width=" + w + ",height=" + h;
    var maxWindow = window.open(strURL, "", s);
    maxWindow.focus();
}

function OpenMaxWindowWithScroll(strURL){
    var w = screen.availWidth - 4;
    var h = screen.availHeight - 21;
    var s = "left=0,top=0,location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no,width=" + w + ",height=" + h;
    var maxWindow = window.open(strURL, "", s);
    maxWindow.moveTo(-4, -4);
    maxWindow.focus();
}