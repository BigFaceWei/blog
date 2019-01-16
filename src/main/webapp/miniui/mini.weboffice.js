mini.WebOffice = function () {
    mini.WebOffice.superclass.constructor.call(this);
};

mini.extend(mini.WebOffice, mini.ValidatorBase, {
    uiCls: "mini-weboffice",
    formField: true,
    officeUrl : getRootPath()+"/control/weboffice/office.jsp",
    tableObjectId : "",
    controlName : "",
    fieldName : "",
    fieldCnName : "",
    verifyFieldId : "word",
    fileType : "",
    controlWidth : "",
    controlHeight : "",
    relationControlName : "",
    attachId : "",
    _create: function () {
		this.el = document.createElement("span");
		this.el.className = "mini-weboffice";
    },
    
    initEditor: function () {
    	this._valueEl.tableobject_id = this.tableObjectId;
    	this._valueEl.cnName = this.fieldCnName;
    	this._valueEl.relationControl = this.relationControlName;
    	this._valueEl.id = this.verifyFieldId;
    	this._officeEl.src = this.officeUrl + "?attach_id=" + this.attachId 
    		+ "&tableobject_id=" + this.tableObjectId 
    		+ "&field_name=" + this.fieldName 
    		+ "&file_type=" + this.fileType;
    	this._officeEl.style.width = this.controlWidth;
    	this._officeEl.style.height = this.controlHeight;
    	
    },
    
    getValue: function () {
    	window.frames[this.relationControlName].save();
    	
    	var url = getRootPath()+ "/tbp/tableWebOfficeValueAjaxAction.do?fieldName="+ this.fieldName +"&tableobjectId="+ this.tableObjectId +"&attach_id="+ this.attachId;
    	var returnData = "";
    	$.ajax({
			type : 'get',
			cache : false,
			url : url,
			data : {},
			async : false,
			success : function(data) {
				if(data!= null){
					returnData = data.toString();
				}
			},
			error : function(html){
				alert('提交数据失败');
			}
		});
    	this._valueEl.value = returnData;
    	this.attachId = returnData;
    	setOfficeFieldValue(getRootPath(),this.tableObjectId,this.fieldName,this.attachId,this.enabled);
		return this._valueEl.value;
    },
    setValue: function (value) {
    	this._valueEl.value = value;
    	this.attachId = value;
    	var enabled = this.enabled;
    	setOfficeFieldValue(getRootPath(),this.tableObjectId,this.fieldName,this.attachId,enabled);
    },
    setTableObjectId : function (value) {
    	this.tableObjectId = value;
    },
    getTableObjectId : function() {
    	return this.tableObjectId;
    },
    setControlName : function (value) {
    	this.controlName = value;
    	this.relationControlName = value + '__text';
    	
    	var html = '<input type = "hidden" name = "'+ value +'">';
		html += '<iframe name = "'+ this.relationControlName +'" id = "'+ this.relationControlName +'"></iframe>';
		this.el.innerHTML = html;
		
		this._valueEl = this.el.firstChild;
		this._officeEl = this.el.lastChild;
    },
    getControlName : function() {
    	return this.controlName;
    },
    setFieldName : function (value) {
    	this.fieldName = value;
    },
    getFieldName : function() {
    	return this.fieldName;
    },
    setFieldCnName : function (value) {
    	this.fieldCnName = value;
    },
    getFieldCnName : function() {
    	return this.fieldCnName;
    },
    setFileType : function (value) {
    	this.fileType = value;
    },
    getFieldType : function () {
    	return this.fileType;
    },
    setControlWidth : function (value) {
    	this.controlWidth = value;
    },
    getControlWidth : function () {
    	return this.controlWidth;
    },
    setControlHeight : function (value) {
    	this.controlHeight = value;
    	this.initEditor();

    },
    getControlHeight : function () {
    	return this.controlHeight;
    },
    
    
    getAttrs: function (el) {
        var attrs = mini.WebOffice.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["fieldName", "tableObjectId", "fileType", "controlName", "fieldCnName", "controlWidth", "controlHeight", "value"
             ]
        );

        return attrs;
    },
    
    destroy: function (removeEl) {
        mini.WebOffice.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.WebOffice, 'weboffice');