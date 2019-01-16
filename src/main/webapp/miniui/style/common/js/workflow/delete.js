function getids() {
var ids = [];
	$("input.itemchk").each(function() {
	 var ptr = $(this).parent().parent().parent();
 	if (this.checked) {
		ids.push(this.value);
 		}
	 });
window.location="pageLocationAction.do?method=saveGotoUrl&href=" +
		"/TBPWeb/tbp/tableObjectAction.do?" +
		"table_id=AUTOREPAIR*method=delRecords*sys_tv_key=log_id" +
		"*sys_tv_value="+ids+
		"&cache=true&is_del_cache=true&gotoUrl=" +
		"/TBPWeb/tbp/tableViewAction.do?viewname=customTableView*" +
		"method=load*sys_tv_key=viewid*sys_tv_value=zdhjxdc";}
