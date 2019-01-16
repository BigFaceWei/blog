mini.BindButtonEdit = function () {
	this.data = [];
    mini.BindButtonEdit.superclass.constructor.call(this);
    

    var isReadOnly = this.isReadOnly();
    if (isReadOnly || this.allowInput == false) {
        this._textEl.readOnly = true;
    }
    if (this.enabled == false) {
        this.addCls(this._disabledCls);
    }
    if (isReadOnly) {
        this.addCls(this._readOnlyCls);
    }
    if (this.required) {
        this.addCls(this._requiredCls);
    }
}

mini.extend(mini.BindButtonEdit, mini.PopupEdit, {
    name: "",
    formField: true,

    selectOnFocus: false,

    showClose: false,
    data: [],
    url: "",
    emptyText: "",
    openWindowWidth:"",
    openWindowHeight:"",
    defaultValue: "",
    defaultText: "",
    value: "",
    text: "",
    tableId:"",
    maxLength: 1000,
    minLength: 0,
    openUrl: "",
    
    height: 21,

    inputAsValue: false,    

    allowInput: true,   
    _noInputCls: "mini-buttonedit-noInput",
    _readOnlyCls: "mini-buttonedit-readOnly",
    _disabledCls: "mini-buttonedit-disabled",

    _emptyCls: "mini-buttonedit-empty",
    _focusCls: "mini-buttonedit-focus",

    
    _buttonCls: "mini-buttonedit-button",
    _buttonHoverCls: "mini-buttonedit-button-hover",
    _buttonPressedCls: "mini-buttonedit-button-pressed",

    _closeCls: "mini-buttonedit-close",

    set: function (kv) {
        if (typeof kv == 'string') {
            return this;
        }

        var value = kv.value;
        delete kv.value;
        var text = kv.text;
        delete kv.text;
        var url = kv.url;
        delete kv.url;
        this._allowUpdate = !(kv.enabled == false || kv.allowInput == false || kv.readOnly);

        mini.BindButtonEdit.superclass.set.call(this, kv);

        if (this._allowUpdate === false) {
            this._allowUpdate = true;
            this.doUpdate();
        }

        if (!mini.isNull(text)) {
            this.setText(text);
        }
        if (!mini.isNull(url)) {
            this.setUrl(url);

            kv.url = url;
        }
        if (!mini.isNull(value)) {
            this.setValue(value);
        }
        return this;
    },
    uiCls: "mini-bindbuttonedit",
    setData: function (data) {

        if (typeof data == "string") {
            data = this._eval(data);
            
            

        }
        if (!mini.isArray(data)) data = [];
        this._listbox.setData(data);
        this.data = this._listbox.data;
        
        

        var vts = this._listbox.getValueAndText(this.value);
        this.text = this._textEl.value = vts[1];

    },
    getData: function () {
        return this.data;
    },
    _createPopup: function () {
        mini.BindButtonEdit.superclass._createPopup.call(this);

        this._listbox = new mini.ListBox();

        this._listbox.setBorderStyle("border:0;");
        this._listbox.setStyle("width:100%;height:auto;");
        this._listbox.render(this.popup._contentEl);

        this._listbox.on("itemclick", this.__OnItemClick, this);
        this._listbox.on("drawcell", this.__OnItemDrawCell, this);

        var me = this;
        this._listbox.on("beforeload", function (e) {
            me.fire("beforeload", e);
        }, this);
        this._listbox.on("preload", function (e) {
            me.fire("preload", e);
        }, this);
        this._listbox.on("load", function (e) {
            me.fire("load", e);
        }, this);
        this._listbox.on("loaderror", function (e) {
            me.fire("loaderror", e);
        }, this);
    },
    _getButtonsHTML: function () {
        var s = '<span class="mini-buttonedit-close"></span>' + this._getButtonHtml();
        return '<span class="mini-buttonedit-buttons">' + s + '</span>';
    },
    _getButtonHtml: function () {
        var hover = 'onmouseover="mini.addClass(this, \'' + this._buttonHoverCls + '\');" '
                        + 'onmouseout="mini.removeClass(this, \'' + this._buttonHoverCls + '\');"';
        return '<span class="mini-buttonedit-button" ' + hover + '><span class="mini-bindbuttonedit-icon"></span></span>';
    },
    setUrl: function (url) {
        this.getPopup();

        this._listbox.setUrl(url);
        this.url = this._listbox.url;
        this.data = this._listbox.data;
        
        var vts = this._listbox.getValueAndText(this.value);
        this.text = this._textEl.value = vts[1];
    },
    setTableId: function(tableId){
    	this.tableId = tableId;
    },
    getTableId: function(){
    	return this.tableId;
    },
    getUrl: function () {
        return this.url;
    },
    setOpenUrl: function(value){
    	this.openUrl = value;
    },
    getOpenUrl: function(){
    	return this.openUrl;
    },
    setOpenWindowWidth: function(openWindowWidth){
    	this.openWindowWidth = openWindowWidth;
    },
    getOpenWindowWidth: function(){
    	return this.openWindowWidth;
    },
    setOpenWindowHeight: function(openWindowHeight){
    	this.openWindowHeight = openWindowHeight;
    },
    getOpenWindowHeight: function(){
    	return this.openWindowHeight;
    },
    _create: function () {
        this.el = document.createElement("span");
        this.el.className = "mini-buttonedit";

        var s = this._getButtonsHTML();
        this.el.innerHTML = '<span class="mini-buttonedit-border"><input type="input" class="mini-buttonedit-input" autocomplete="off"/>'
                            + s + '</span><input name="' + this.name + '" type="hidden"/>'

        this._borderEl = this.el.firstChild;
        this._textEl = this._borderEl.firstChild;
        this._valueEl = this.el.lastChild;

        this._buttonsEl = this._borderEl.lastChild;
        this._buttonEl = this._buttonsEl.lastChild;
        this._closeEl = this._buttonEl.previousSibling;

        this._doEmpty();
    },
    destroy: function (removeEl) {
        if (this.el) {
            this.el.onmousedown = null;
            this.el.onmousewheel = null;
            this.el.onmouseover = null;
            this.el.onmouseout = null;
        }
        if (this._textEl) {
            this._textEl.onchange = null;
            this._textEl.onfocus = null;

            mini.clearEvent(this._textEl);
            
            this._textEl = null;
        }
        mini.ButtonEdit.superclass.destroy.call(this, removeEl);
    },
    _initEvents: function () {
        mini._BindEvents(function () {
            mini_onOne(this.el, "mousedown", this.__OnMouseDown, this);
            mini_onOne(this._textEl, "focus", this.__OnFocus, this);
            mini_onOne(this._textEl, "change", this.__OnInputTextChanged, this);

            
            
            

            var v = this.text;
            this.text = null;
            if (this.el) {
                this.setText(v);
            }
        }, this);

    },
    _inputEventsInited: false,
    _initInputEvents: function () {
        if (this._inputEventsInited) return;
        this._inputEventsInited = true;

        mini.on(this.el, "click", this.__OnClick, this);
        mini.on(this._textEl, "blur", this.__OnBlur, this);
        mini.on(this._textEl, "keydown", this.__OnInputKeyDown, this);
        mini.on(this._textEl, "keyup", this.__OnInputKeyUp, this);
        mini.on(this._textEl, "keypress", this.__OnInputKeyPress, this);
    },
    _buttonWidth: 20,
    _closeWidth: 20,
    _doInputLayout: function (doLayout) {

        if (this._closeEl) {
            this._closeEl.style.display = this.showClose ? "inline-block" : "none";
        }
        var w = this._buttonsEl.offsetWidth + 2;
        if (w == 2) {
            this._noLayout = true;
        } else {
            this._noLayout = false;
        }
        this._borderEl.style["paddingRight"] = w + "px";
        if (doLayout !== false) {
            this.doLayout();
        }
    },
    doLayout: function () {
        if (this._noLayout) {
            this._doInputLayout(false);
        }
    },
    setHeight: function (value) {
        if (parseInt(value) == value) value += "px";
        this.height = value;

    },
    focus: function () {
        try {
            this._textEl.focus();
            var sf = this;
            setTimeout(function () {
                if (sf._focused) {
                    sf._textEl.focus();
                }
                
            }, 10);
        } catch (e) {
        }
    },
    blur: function () {
        try {
            this._textEl.blur();
            
        } catch (e) {
        }
    },
    selectText: function () {
        this._textEl.select();
    },

    getTextEl: function () {
        return this._textEl;
    },
    setName: function (value) {
        this.name = value;
        
        if (this._valueEl) mini.setAttr(this._valueEl, "name", this.name);
    },
    setText: function (value) {

        if (value === null || value === undefined) value = "";
        var fire = this.text !== value;
        this.text = value;
        this._textEl.value = value;

        this._doEmpty();
    },
    getText: function () {
        var text = this._textEl.value;
        return text;
        
    },
    
    setValue: function (value) {
    	  if (this.value !== value) {
              var vts = this._listbox.getValueAndText(value);

              this.value = value;

              this._valueEl.value = this.value;
              this.text = this._textEl.value = vts[1];

              this._doEmpty();
          } else {
              var vts = this._listbox.getValueAndText(value);
              this.text = this._textEl.value = vts[1];
          }
        
    },
    getValue: function () {
        return this.value;
    },
    getFormValue: function () {
        var value = this.value;
        if (value === null || value === undefined) value = "";
        return String(value);
    },

    _doEmpty: function () {
        this._textEl.placeholder = this.emptyText;
        if (this.emptyText) {
            mini._placeholder(this._textEl);
        }
        
        
        
        
        
        
        
        
        
        
        
    },
    setEmptyText: function (value) {
        if (this.emptyText != value) {
            this.emptyText = value;
            this._doEmpty();
        }
    },
    getEmptyText: function () {
        return this.emptyText;
    },

    setMaxLength: function (value) {
        value = parseInt(value);
        if (isNaN(value)) return;
        this.maxLength = value;
        this._textEl.maxLength = value;
    },
    getMaxLength: function () {
        return this.maxLength;
    },
    setMinLength: function (value) {
        value = parseInt(value);
        if (isNaN(value)) return;
        this.minLength = value;
    },
    getMinLength: function () {
        return this.minLength;
    },
    setEnabled: function (value) {
        mini.ButtonEdit.superclass.setEnabled.call(this, value);

        this._tryValidate();
    },
    _doReadOnly: function () {
        var readOnly = this.isReadOnly();
        if (readOnly || this.allowInput == false) {
            this._textEl.readOnly = true;
        } else {
            this._textEl.readOnly = false;
        }
        if (readOnly) {
            this.addCls(this._readOnlyCls);
        } else {
            this.removeCls(this._readOnlyCls);
        }
        if (this.allowInput) {
            this.removeCls(this._noInputCls);
        } else {
            this.addCls(this._noInputCls);
        }

        if (this.enabled) {
            this._textEl.disabled = false;
        } else {
            this._textEl.disabled = true;
        }
    },
    setAllowInput: function (value) {
        this.allowInput = value;
        this._doReadOnly();
    },
    getAllowInput: function () {
        return this.allowInput;
    },
    setInputAsValue: function (value) {
        this.inputAsValue = value;
    },
    getInputAsValue: function () {
        return this.inputAsValue;
    },

    
    
    
    _errorIconEl: null,
    getErrorIconEl: function () {
        if (!this._errorIconEl) {
            this._errorIconEl = mini.append(this.el, '<span class="mini-errorIcon"></span>');
        }
        return this._errorIconEl;
    },
    _RemoveErrorIcon: function () {
        if (this._errorIconEl) {
            var el = this._errorIconEl;
            jQuery(el).remove();
        }
        this._errorIconEl = null;
    },
    
    __OnClick: function (e) {
        if (this.isReadOnly() || this.enabled == false) return;

        if (!mini.isAncestor(this._borderEl, e.target)) return;

        var t = new Date();

        if (mini.isAncestor(this._buttonEl, e.target)) {
            this._OnButtonClick(e);
        }
        if (mini.findParent(e.target, this._closeCls)) {
            this.fire("closeclick", { htmlEvent: e });
        }

        
        
        
        
        
        
        
        
        
    },
    __OnMouseDown: function (e) {
        
        if (this.isReadOnly() || this.enabled == false) return;

        if (!mini.isAncestor(this._borderEl, e.target)) return;

        if (!mini.isAncestor(this._textEl, e.target)) {
            this._clickTarget = e.target;
            var sf = this;
            setTimeout(function () {
                sf.focus();
                mini.selectRange(sf._textEl, 1000, 1000);
            }, 1);
            if (mini.isAncestor(this._buttonEl, e.target)) {
                var up = mini.findParent(e.target, "mini-buttonedit-up");
                var down = mini.findParent(e.target, "mini-buttonedit-down");
                if (up) {
                    mini.addClass(up, this._buttonPressedCls);
                    this._OnButtonMouseDown(e, "up");
                }
                else if (down) {
                    mini.addClass(down, this._buttonPressedCls);
                    this._OnButtonMouseDown(e, "down");
                } else {
                    mini.addClass(this._buttonEl, this._buttonPressedCls);
                    this._OnButtonMouseDown(e);
                }
                mini.on(document, "mouseup", this.__OnDocMouseUp, this);
            }
        }
    },
    __OnDocMouseUp: function (e) {
        this._clickTarget = null;
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        var me = this;
        setTimeout(function () {
            var doms = me._buttonEl.getElementsByTagName("*");
            for (var i = 0, l = doms.length; i < l; i++) {
                mini.removeClass(doms[i], me._buttonPressedCls);
            }
            mini.removeClass(me._buttonEl, me._buttonPressedCls);
            mini.removeClass(me.el, me._pressedCls);
        }, 80);
        mini.un(document, "mouseup", this.__OnDocMouseUp, this);
    },
    __OnFocus: function (e) {

        this.doUpdate();
        this._initInputEvents();
        if (this.isReadOnly()) return;
        
        this._focused = true;
        this.addCls(this._focusCls);

        

        if (this.selectOnFocus) {
            this.selectText();
        }
        this.fire("focus", { htmlEvent: e });
    },
    __doFocusCls: function () {
        if (this._focused == false) {
            this.removeCls(this._focusCls);
        }
    },
    __fireBlur: function (e) {

        

        var sf = this;

        function f() {
            if (sf._focused == false) {
                sf.removeCls(sf._focusCls);

                if (sf.validateOnLeave && sf.isEditable()) {
                    sf._tryValidate();
                }

                this.fire("blur", { htmlEvent: e });
            }
            
        }
        setTimeout(function () {
            f.call(sf);
        }, 2);

    },
    __OnBlur: function (e) {
        
        var me = this;

        me._focused = false;
        setTimeout(function () {
            me.__fireBlur(e);

        }, 10);


    },
    __OnInputKeyDown: function (e) {
        var ex = { htmlEvent: e };
        this.fire("keydown", ex);
        if (e.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
            return false;
        }
        
        if (e.keyCode == 27 || e.keyCode == 13 || e.keyCode == 9) {
            var sf = this;
            sf.__OnInputTextChanged(null);
            if (e.keyCode == 13) {
                var me = this;
                
                me.fire("enter", ex);
                
            }
        }
        if (e.keyCode == 27) {
            e.preventDefault();
        }
    },
    __OnInputTextChanged: function () {

        var v = this._textEl.value;
        if (v == this.text) return;
        var value = this.getValue();
        

        this.setText(v);
        this.setValue(v);
        if (value !== this.getFormValue()) {
            this._OnValueChanged();
        }
        
    },
    __OnInputKeyUp: function (e) {
        this.fire("keyup", { htmlEvent: e });
    },
    __OnInputKeyPress: function (e) {
        this.fire("keypress", { htmlEvent: e });
    },
    
    _OnButtonClick: function (htmlEvent) {
        var e = {
            htmlEvent: htmlEvent,
            cancel: false
        };
        this.fire("beforebuttonclick", e);
        if (e.cancel == true) return;

        this.fire("buttonclick", e);
    },
    _OnButtonMouseDown: function (htmlEvent, spinType) {
        this.focus();
        this.addCls(this._focusCls);

        this.fire("buttonmousedown", {
            htmlEvent: htmlEvent,
            spinType: spinType
        });
    },

    onButtonClick: function (fn, scope) {
        this.on("buttonclick", fn, scope);
    },
    onButtonMouseDown: function (fn, scope) {
        this.on("buttonmousedown", fn, scope);
    },
    onTextChanged: function (fn, scope) {
        this.on("textchanged", fn, scope);
    },

    textName: "",
    setTextName: function (value) {
        this.textName = value;
        if (this._textEl) mini.setAttr(this._textEl, "name", this.textName);
    },
    getTextName: function () {
        return this.textName;
    },

    setSelectOnFocus: function (value) {
        this.selectOnFocus = value;
    },
    getSelectOnFocus: function (value) {
        return this.selectOnFocus;
    },
    setShowClose: function (value) {
        this.showClose = value;
        this._doInputLayout();
    },
    getShowClose: function (value) {
        return this.showClose;
    },
    inputStyle: "",
    setInputStyle: function (value) {
        this.inputStyle = value;
        mini.setStyle(this._textEl, value);
    },

    getAttrs: function (el) {
        var attrs = mini.ButtonEdit.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["value", "text", "openUrl","textName","url","data","emptyText","tableId", "inputStyle", "defaultText", "openWindowWidth", "openWindowHeight",
            "onenter", "onkeydown", "onkeyup", "onkeypress",
            "onbuttonclick", "onbuttonmousedown", "ontextchanged", "onfocus", "onblur",
            "oncloseclick"
             ]
        );
        mini._ParseBool(el, attrs,
            ["allowInput", "inputAsValue", "selectOnFocus", "showClose"
             ]
        );
        mini._ParseInt(el, attrs,
            ["maxLength", "minLength"
             ]
        );

        return attrs;
    }
});
mini.regClass(mini.BindButtonEdit, 'bindbuttonedit');