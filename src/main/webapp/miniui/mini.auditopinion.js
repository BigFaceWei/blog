mini.AuditOpinion = function () {
    mini.AuditOpinion.superclass.constructor.call(this);
}
mini.extend(mini.AuditOpinion, mini.ValidatorBase, {
    uiCls: "mini-auditopinion",
    entryId:"",
    headColor:"",
    stepId:"",
    actionType:"",
    _create: function () {
  	this.el = document.createElement("div");
	this.el.className = "mini-auditopinion";
// 	this.el.style.margin = "7px auto 0px";
    },
    setEntryId: function(entryId){
    	mini.parse();
    	this.entryId = entryId;
		var url = getRootPath()+"/auditOpinionAction.do?method=getOpinions&entryId="+entryId+"&stepId="+this.stepId;
		//mini.get('approvedContent').setUrl(url);
		//mini.get('approvedContent').load();
		var entryid = this.entryId;
		var stepid = this.stepId;
		var actionType = this.actionType;
		$.ajax({
			url: url,
	        type: "post",
	        async: false,
	        data: {},
	        dataType: "json",
	        contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success	: function(data) {
				var grid = mini.get('approvedContent');
				var opinionsMap = mini.decode(data);
				var type = opinionsMap.type;
				var newOpinion = opinionsMap.newOpinion;
				var opinions = opinionsMap.opinions;
				if(type == 'add'){
					grid.setData(opinions);
					var newRow = {stepname: newOpinion.stepname, username:newOpinion.username,create_date:newOpinion.create_date,step_id:newOpinion.step_id};
					grid.addRow(newRow,opinions.length);
				}else{
					grid.setData(opinions);
				}
				var totalCount = grid.getData().length;
				grid.on("cellbeginedit",function(e){
					e.cancel = true;
					if(e.rowIndex == totalCount-1){
						e.cancel = false;
					}
				});
				if(actionType == '3'){
					grid.on("cellbeginedit",function(e){
						e.cancel = true;
					});
				}
				grid.on("cellendedit",function(e){
					if(e.rowIndex == totalCount-1){
						var value = e.value;
						$.ajax({
					        url: getRootPath()+'/tbp/workflow/workflowSend/workflowOpinionAction.do',
							type: 'post',
					        data: { method : 'saveOrUpdateOpinion',
						            entryId : entryid,
						            memo : value,
						            currentStepId : stepid },
					        cache: false,
					        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
					        success: function (resp) {
					        	if(resp == "1"){
					        		
					        	} else {
					        		mini.alert('抱歉，保存异常，错误信息如下：\r');
					        		return false;
					        	}
					        },
					        error: function (jqXHR, textStatus, errorThrown) {
					            mini.alert(jqXHR.responseText);
					            return false;
					        }
					    });
					}
				});
				grid.mergeColumns(["stepname"]);
			},
			error	: function(html){
				alert("提交数据失败，代码:" +html.status+ "，请检查网络稍候再试");
			}
		});
		
    },
    getEntryId: function(){
    	return entryId;
    },
    getActionType: function(){
    	return actionType;
    },
    setActionType: function(actionType){
    	this.actionType = actionType;
    },
    setStepId: function(stepId){
    	this.stepId = stepId;
    },
    getStepId: function(){
    	return this.stepId;
    },
    setHeadColor: function(headColor){
    	var html = "<div id='approved'  class='mini-toolbar' style='width:99%;margin:0 auto' >";
        html +="<table style='width:80%;' cellpadding='0' cellspacing='0' >";
        html +="<tr>";
        html +="<td style='width:100%;'>";
        html +="<a class='mini-button' iconCls='panel-collapse' onclick='expand' plain='true'>收缩</a>";
        html +="<span class='separator'></span>";
        html +="<a style='cursor:default;padding:2px;padding-left:5px;'>审批意见</a>";
        html +="</td>";
        html +="</tr>";
        html +="</table>";
        html +="</div>";
        html +="<div id='approvedFrame' style='border:0px solid #909aa6;border-top:0;width:99.5%;margin:0 auto'>";
        html +="<div id='approvedContent'  onUpdate='expendRow' allowCellEdit='true' allowCellSelect='true' class='mini-datagrid' style='width:100%;height:auto;' allowResize='true' showPager='false' idField='id' onshowrowdetail='onShowRowDetail'>";
        html +="<div property='columns'>";
        html +="<div type='opinionexpandcolumn' ></div>";
        html +="<div field='stepname' name='stepname' width='20%' headerAlign='center' align='center' >环节名称</div>";
        html +="<div field='username' width='20%' headerAlign='center' align='center'>处理人</div>";
        html +="<div field='opinion' width='40%' headerAlign='center'  align='center' >处理意见<input property='editor' class='mini-textarea' /></div>";
        html +="<div field='create_date' width='20%' headerAlign='center' align='center' dateFormat='yyyy-MM-dd HH:mm:ss' >签发时间</div>";
        html +="</div>";
        html +="</div>";
        html +="</div>";
    	this.el.innerHTML = html;
    	this.headColor = headColor;
    },
    getHeadColor: function(){
    	return this.headColor;
    },
    getAttrs: function (el) {
        var attrs = mini.AuditOpinion.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            [
             	'headColor','actionType','stepId','entryId'
             ]
        );
        return attrs;
    },
    destroy: function (removeEl) {
        mini.AuditOpinion.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.AuditOpinion, 'auditopinion');

