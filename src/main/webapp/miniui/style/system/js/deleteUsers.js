/**
 * ����û�����������û�����ɾ������(��֪����idʱ�������)
 * cmd�����action����
 * param:����������ɾ���û��黹��ɾ����ɫ
 * */
function getids(cmd,param) {
	/**
	 * ��ȡѡ�еĽڵ����һ���ַ������ݵ���̨
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
		alert("����ѡ��Ҫɾ�����û�");
	}else{
		//���ﴦ����Ƕ���ڵ㶼Ҫ��ɾ�������,��̨��Ҫ�����ݽ���һ���Ĵ���(ͨ�����Ž����зֻ�ȡ�����id)
		str=ids.toString();
		var pathName=window.document.location.pathname;
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
		if(confirm("��ȷ��Ҫɾ����Щ��¼?")==true){
			if(cmd=="DelUsers"&&param==""){
				//����˵��������ɾ���û���Ϣ
				window.location=projectName+"/tbp/user/"+cmd+".do?userIds="+str;
			}else if(cmd=="DelRoles"&&param=="SYS"){
				//����˵��������ɾ���û�����Ϣ
				window.location=projectName+"/tbp/role/"+cmd+".do?roleIds="+str+"&flag="+param;
			}else if(cmd=="DelRoles"&&param=="WKF"){
				//����˵��������ɾ����ɫ��Ϣ
				window.location=projectName+"/tbp/role/"+cmd+".do?roleIds="+str+"&flag="+param;
			}
		}
	}
	
}
