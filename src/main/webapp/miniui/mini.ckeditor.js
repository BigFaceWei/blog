mini.CKEditor = function () {
    mini.CKEditor.superclass.constructor.call(this);
}

mini.extend(mini.CKEditor, mini.ValidatorBase, {
    uiCls: "mini-ckeditor",
    _InputType: "text",
    allowInput: false,
    formField: true,
    vtype: "",  
    setVtype: function (value) {
        this.vtype = value;
    },
    getVtype: function () {
        return this.vtype;
    },
    _create: function () {
		this.el = document.createElement("span");
		this.el.className = "mini-ckeditor";
    },
    initEditor: function (id) {
    	var userAgent = window.navigator.userAgent.toLowerCase();
		var version = $.browser.version;
    	this._valueEl = CKEDITOR.replace(id);
    	if(this._valueEl != null){
    		 CKEDITOR.config.readOnly = this.allowInput;
    	}
    },
    setEmptyText: function (value) {
        this.emptyText = "";
    },
    getValue: function () {
        return this._valueEl.getData();
    },
    setValue: function (value) {
    	var id = this.id;
    	CKEDITOR.on('instanceReady', function (e) {
    		//if (e.editor.name == id) {
    			e.editor.setData(value);
    		//}
    	});
    },
    setAllowInput: function (value) {
    	 if (value == 'true') {
             this.allowInput = false;
         }else{
        	 this.allowInput = true;
         }
    },
    getAllowInput: function () {
        return this.allowInput;
    },    
    getAttrs: function (el) {
        var attrs = mini.CKEditor.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["allowInput" , "value", "vtype"
             ]
        );

        return attrs;
    },
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.CKEditor.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.CKEditor, 'ckeditor');