mini.AttachUpload = function () {
    mini.AttachUpload.superclass.constructor.call(this);
}

mini.extend(mini.AttachUpload, mini.ValidatorBase, {
    uiCls: "mini-attachupload",
    _InputType : "file",
    controlName : "",
    tableObjectId : "",
    fieldName : "",
    limitType : "",
    limitContent : "",
    allowInput:"",
    fieldCnName : "",
    verifyFieldId : "",
    tableId : "",
    actionType : "",
    formField: true,
    
    _create: function () {
    	this.el = document.createElement("span");
    	this.el.className = "mini-attachupload";
    },
    
    initAttachUpload: function () {
    	this._valueEl.id = this.verifyFieldId;
    	this._valueEl.tableobject_id = this.tableObjectId;
    	this._valueEl.cnName = this.fieldCnName;
    	this.el.childNodes[1].id = this.fieldName + "_field_upload";
		this.el.childNodes[2].id = this.fieldName + "_attachlist_fileQueue";
		this.el.childNodes[2].name = this.fieldName + "_attachlist_fileQueue";
		this.el.childNodes[3].value = this.tableId;
		this.el.childNodes[4].id = this.fieldName + "_attachlist_attach_id";
		this.el.childNodes[5].id = this.fieldName + "_attachmentList";
    },
    
    getTableObjectId : function () {
    	return this.tableObjectId;
    },
    setTableObjectId : function(value) {
        this.tableObjectId = value;
    },
    setAllowInput: function (value) {
        this.allowInput = value;
    	if(this.allowInput == 'true' && this.actionType != '3'){
    		var confVO = {limitType : this.limitType, limitContent : this.limitContent};
    		loadUploadFiles("fieldUploadFiles",this.fieldName, confVO);
    	}
    },
    getAllowInput: function () {
        return this.allowInput;
    },
    getFieldName : function () {
    	return this.fieldName;
    },
    setFieldName : function(value) {
        this.fieldName = value;
    },
    setLimitType : function(value) {
    	this.limitType = value;
    },
    getLimitType : function(){
    	return this.limitType;
    },
    setLimitContent : function(value) {
    	this.limitContent = value;
    },
    getLimitContent : function(){
    	return this.limitContent;
    },
    getFieldCnName : function () {
    	return this.fieldCnName;
    },
    setFieldCnName : function(value) {
        this.fieldCnName = value;
    },
    getVerifyFieldId : function () {
    	return this.verifyFieldId;
    },
    setVerifyFieldId : function(value) {
        this.verifyFieldId = value;
    },
    getControlName : function () {
    	return this.controlName;
    },
    setControlName : function(value) {
        this.controlName = value;
            
        var html = "<input type='hidden' name='"+this.controlName+"'>";
        html += '<input type="' + this._InputType + '" style="display:none">';
        html += '<span></span><input type ="hidden" id="field_upload_table_id"><input type = "hidden"><div></div>';
        this.el.innerHTML = html;
        this._valueEl = this.el.firstChild;
    },
    getTableId : function () {
    	return this.tableId;
    },
    setTableId : function(value) {
        this.tableId = value;
        
        this.initAttachUpload();
    },
    getValue: function () {
        return this._valueEl.value;
    },
    setValue: function(value){
    	this.value = value;
    	this.setFileValue();
    },
    setActionType: function(value){
    	this.actionType = value;
    },
    getActionType: function(){
    	return this.actionType;
    },
    setFileValue: function () {
    	var tt = bootPATH;
    	var attachmentListStr = "";
    	var isManager = true;
    	var allowInput = this.allowInput;
    	var actionType = this.actionType;
    	if(actionType == ''){
    		actionType = parent.actionType;
    	}
    	if (this.value==null || this.value==""){
    		this._valueEl.value="";
    		//jQuery("#"+this.fieldName+"_attachmentList").append("<span id ='"+this.fieldName+"_field_message'>找不到该附件,文件已被删除</span>");
    	}else{
    		this._valueEl.value = this.value;
    		var fieldName = this.fieldName;
    		var tempValue = this.value;
    		var url = getRootPath()+"/tbp/tableAttachNameAjaxAction.do?method=getAttachmentMessage&file_no="+this.value;
    		jQuery.ajax({
    			type	: 'get',
    			cache	: false,
    			url		: url,
    			data	: {},
    			success	: function(data) {
    				if(data !=null && data != ''){
    					jQuery("#"+fieldName+"_attachmentList").empty();
    					attachmentList = eval("("+data+")");
    					var attachmentDBVOs = "";
    					for(var i = 0,j = attachmentList.length;i<j;i++){
    						attachmentDBVOs = attachmentList[i];
    						var url = getRootPath()+"/tbp/fileUpLoadAction.do?attach_id="+attachmentDBVOs.attach_id+"&method=outFile";
    						attachmentListStr = "<div id='"+attachmentDBVOs.attach_id+"'>";
    						attachmentListStr += "<span class='hrefName'>";
    						attachmentListStr += "&nbsp;&nbsp;&nbsp;&nbsp;<A href='"+url+ "' class='imgpreview'  target='_self'><span title = '"+attachmentDBVOs.fileName+"'>"+attachmentDBVOs.fileName+"</span></A></span>";
    						attachmentListStr += "<span class='upload_date'>("+attachmentDBVOs.upload_date+")";
    						attachmentListStr += "&nbsp;&nbsp;("+attachmentDBVOs.upload_employeename+")&nbsp;&nbsp;</span>";
    						if(allowInput == 'true'  && actionType != '3'){
	    						attachmentListStr += "<span class='opotions' id='options'>";
	    						//attachmentListStr += "<a href='javascript:;' class='userOption' target='_self' onclick=openJG('1','"+attachmentDBVOs.attach_id+"')>预览</a>||";
	    						attachmentListStr += "<a href='"+url+"' class='userOption' target='_self' onclick=changeDownloads('" +attachmentDBVOs.attach_id+ "')>下载</a>";
	    						if(isManager){
	    							attachmentListStr += "<span id='delete_data' name='delete_data' class='delete_data'>||<a href='javascript:;' class='userOption' onclick=delFileAjax('" + attachmentDBVOs.attach_id + "','" + fieldName + "')>删除</a></span>";
	    						}
    						}
    						attachmentListStr += "<span id='downloadcounts'>&nbsp;&nbsp;下载次数&nbsp;<a onclick=openDownloads('" + attachmentDBVOs.attach_id + "');>" + attachmentDBVOs.downloads + "</a></span>";
    						attachmentListStr += "</span></div>";
    						jQuery("#"+fieldName+"_attachmentList").prepend(attachmentListStr);
    						jQuery("#"+fieldName+"_attachlist_attach_id").val(tempValue);
    					}
    				}
    			},
    			error	: function(html){
    			}
    		});
    	}
    },
    
    getAttrs: function (el) {
        var attrs = mini.AttachUpload.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            [
            "controlName","actionType","limitType","limitContent", "tableObjectId","fieldName","allowInput","fieldCnName","verifyFieldId","tableId","value"
             ]
        );
        return attrs;
    },
    
    destroy: function (removeEl) {
        mini.AttachUpload.superclass.destroy.call(this, removeEl);
    }
});

mini.regClass(mini.AttachUpload, 'attachupload');

mini.AttachUploadForTable = function () {
    mini.AttachUploadForTable.superclass.constructor.call(this);
}
mini.extend(mini.AttachUploadForTable, mini.ValidatorBase, {
    uiCls: "mini-attachuploadfortable",
    _InputType:"file",
    ownerCode:"",
    allowInput:"",
    value:"",
    actionUrl:"",
    actionType : "",
    isExtend:"",
    formField: true,
    _create: function () {
		var html = "<a href='javascript:displayOrHiddenMiniAttachement();'><img id='down' src="+getRootPath()+"'/miniui/themes/icons/collapsebutton.gif' style='margin-right: 2px;' border='0'/>";
		html += "附件：(<span id='form_atttachlist_size' name='form_atttachlist_size'>0</span>个)</a>";
		html += "<input type = 'hidden' id = 'form_attachlist_owner_code' name = 'form_attachlist_owner_code'/>";
    	html += "<input type = 'hidden' id = 'form_attachlist_attach_id' name = 'form_attachlist_attach_id'/>";
    	html += "<input type = 'hidden' id = 'form_attachlist_pk_values_owner_code' name = 'form_attachlist_pk_values_owner_code'/>";
    	html += "<div id='uploadDiv' class='uploadDiv'>";
    	html +=	"<input type='file' id='form_attachlist_addFiles' />";
    	html +=	"<div class='uploadifyQueue' id='form_attachlist_fileQueue' name='form_attachlist_fileQueue'/>";
    	html +=	"<div id='fileQueue' class='fileQueue'></div>";
    	html +=	"</div>";
    	html += "<DIV id='displayAttachement'></DIV>";
    	this.el = document.createElement("div");
    	this.el.className = "mini-attachuploadfortable";
    	this.el.style.margin = "7px auto 0px";
    	this.el.innerHTML = html;
    	this._valueEl = jQuery("#form_attachlist_attach_id")[0];
    },
    setIsExtend : function(isExtend) {
    	this.isExtend = isExtend;
    },
    getIsExtend : function() {
    	return this.isExtend;
    },
    setAllowInput: function (allowInput) {
        if (this.allowInput != allowInput) {
            this.allowInput = allowInput;
        }
    },
    getAllowInput: function () {
        return this.allowInput;
    },
    setActionType: function(value){
    	this.actionType = value;
    },
    getActionType: function(){
    	return this.actionType;
    },
    setActionUrl : function(actionUrl) {
    	this.actionUrl = actionUrl;
    },
    getActionUrl : function (){
    	return this.actionUrl;
    },
    getOwnerCode : function () {
    	return this.ownerCode;
    },
    setOwnerCode : function(value) {
    	if (this.ownerCode != value) {
            this.ownerCode = value;
        }
    	this.setOwnerCodeValue();
    },
    setOwnerCodeValue : function(){
    	jQuery("#form_attachlist_owner_code").val(this.ownerCode);
    	$('#fileQueue').empty();
    	if(this.value != null && this.value != ''){
    		allowInput = this.allowInput;
    		if(allowInput == 'true'  && this.actionType != '3'){
    			loadUploadFiles('true');
    		}else{
    			$('#form_attachlist_addFiles').hide();
    			$('#form_attachlist_addFiles').empty();
    		}
    		jQuery("#form_attachlist_pk_values_owner_code").val(this.ownerCode+";"+this.value);
    		var attachmentListStr = "";
    		var isManager = true;
    		var url = getRootPath()+"/tbp/tableAttachNameAjaxAction.do?method=getAttachmentForTableMessage&pk_values="+this.value+"&owner_code="+this.ownerCode;
    		if(this.actionUrl != ''){
    			url = this.actionUrl;
    		}
    		jQuery.ajax({
    			type	: 'get',
    			cache	: false,
    			url		: url,
    			data	: {},
    			success	: function(data) {
    				if(data !=null && data != ''){
    			    	$('#fileQueue').empty();
    					var attachmentList = eval("("+data+")");
    					var attachmentDBVOs = "";
    					$('#form_atttachlist_size').each(function () {
    						$(this).html(attachmentList.length);
    					});
    					for(var i = 0,j = attachmentList.length;i<j;i++){
    						attachmentDBVOs = attachmentList[i];
    						var url = getRootPath()+"/tbp/fileUpLoadAction.do?attach_id="+attachmentDBVOs.attach_id+"&method=outFile";
    						
    						attachmentListStr = "<div id='"+attachmentDBVOs.attach_id+"'>";
    						attachmentListStr += "<span class='hrefName'>";
    					
    						attachmentListStr += "&nbsp;&nbsp;&nbsp;&nbsp;<A href='"+url+ "' target='_self'><span title = '"+attachmentDBVOs.fileName+"'>"+attachmentDBVOs.fileName+"</span></A></span>&nbsp;&nbsp;";
   
    						attachmentListStr += "<span class='upload_date'>("+attachmentDBVOs.upload_date+")";
    						attachmentListStr += "&nbsp;&nbsp;("+attachmentDBVOs.upload_employeename+")&nbsp;&nbsp;</span>";
    						if(allowInput == 'true' && this.actionType != '3'){
	    						attachmentListStr += "<span class='opotions' id='options'>";
	    						//attachmentListStr += "<a href='javascript:;' class='userOption' target='_self' onclick=openJG('1','"+attachmentDBVOs.attach_id+"')>预览</a>||";
	    						attachmentListStr += "<a href='"+url+"' class='userOption' target='_self' onclick=changeDownloads('" +attachmentDBVOs.attach_id+ "')>下载</a>";
	    						if(isManager){
	    							attachmentListStr += "<span id='delete_data' name='delete_data' class='delete_data'>||<a href='javascript:;' class='userOption' onclick=delFileAjax('" + attachmentDBVOs.attach_id + "','')>删除</a></span>";
	    						}
    						}
    						attachmentListStr += "<span id='downloadcounts'>&nbsp;&nbsp;下载次数&nbsp;<a onclick=openDownloads('" + attachmentDBVOs.attach_id + "');>" + attachmentDBVOs.downloads + "</a></span>";
    						attachmentListStr += "</span></div>";
    						jQuery("#fileQueue").prepend(attachmentListStr);
    					}
    				}
    			},
    			error	: function(html){
    			}
    		});
    	}
    	//displayOrHiddenMiniAttachement();
    	if(this.isExtend =='true'){
        	//displayOrHiddenMiniAttachement();

    	}
    },
    getValue: function () {
    	// return this._valueEl.value;
    },
    setValue: function (value) {
    	this.value = value;
    },
    getAttrs: function (el) {
        var attrs = mini.AttachUploadForTable.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            [
            "isExtend","actionType", "allowInput","actionUrl",  "ownerCode", "value"
             ]
        ); 
        
        return attrs;
    },
    
    destroy: function (removeEl) {
        mini.AttachUploadForTable.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.AttachUploadForTable, 'attachuploadfortable');