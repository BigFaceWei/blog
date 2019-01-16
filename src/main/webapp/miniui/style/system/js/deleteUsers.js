/**
 * 针对用户管理里面的用户批量删除操作(不知道表单id时处理情况)
 * cmd请求的action名称
 * param:用来区分是删除用户组还是删除角色
 * */
function getids(cmd,param) {
	/**
	 * 获取选中的节点组成一个字符串传递到后台
	 * */
var ids =[];
var str="";
	$("input.itemchk").each(function() {
	 var ptr = $(this).parent().parent().parent();
 	if (this.checked) {
		ids.push(this.value);
 		}
	 });
	if(ids.length==0){
		alert("请先选择要删除的用户");
	}else{
		//这里处理的是多个节点都要被删除的情况,后台需要对数据进行一定的处理(通过逗号进行切分获取所需的id)
		str=ids.toString();
		var pathName=window.document.location.pathname;
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		if(confirm("您确定要删除这些记录?")==true){
			if(cmd=="DelUsers"&&param==""){
				//这里说明是批量删除用户信息
				window.location=projectName+"/tbp/user/"+cmd+".do?userIds="+str;
			}else if(cmd=="DelRoles"&&param=="SYS"){
				//这里说明是批量删除用户组信息
				window.location=projectName+"/tbp/role/"+cmd+".do?roleIds="+str+"&flag="+param;
			}else if(cmd=="DelRoles"&&param=="WKF"){
				//这里说明是批量删除角色信息
				window.location=projectName+"/tbp/role/"+cmd+".do?roleIds="+str+"&flag="+param;
			}
		}
	}
	
}
