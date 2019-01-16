
function getids() {
var ids = [];
	$("input.itemchk").each(function() {
	 var ptr = $(this).parent().parent().parent();
 	if (this.checked) {
		ids.push(this.value);
 		}
	 });
	var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
window.location=projectName+"/tbp/tableViewAction.do?table_id=SD_ST_01_001&method=delRecords&sys_tv_key=userid&sys_tv_value="+ids;}
