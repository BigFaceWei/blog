mini.EompButton = function () {
    
    mini.EompButton.superclass.constructor.call(this);
    
}
mini.extend(mini.EompButton, mini.Control, {
    

    text: "",
    iconCls: "",
    iconStyle: "",
	background:"",
    plain: false,

    checkOnClick: false,
    checked: false,
    groupName: "",

    _plainCls: "mini-button-plain",
    _hoverCls: "mini-button-hover",
    _pressedCls: "mini-button-pressed",
    _checkedCls: "mini-button-checked",
    _disabledCls: "mini-button-disabled",

    allowCls: "",

    _clearBorder: false,

    set: function (kv) {
        if (typeof kv == 'string') {
            return this;
        }

        this._allowUpdate = kv.text || kv.iconStyle || kv.iconCls || kv.iconPosition;

        mini.Button.superclass.set.call(this, kv);

        if (this._allowUpdate === false) {
            this._allowUpdate = true;
            this.doUpdate();
        }

        return this;
    },
    uiCls: "mini-eompbutton",
    _create: function () {
        this.el = document.createElement("a");

        this.el.className = "mini-button";
        this.el.hideFocus = true;
        this.el.href = "javascript:void(0)";
        

        this.doUpdate();
    },
   // _initEvents: function () {
//        mini._BindEvents(function () {
//            mini_onOne(this.el, "mousedown", this.__OnMouseDown, this);
//            mini_onOne(this.el, "click", this.__OnClick, this);
//
//            
//            
//        }, this);
//    },
    destroy: function (removeEl) {
        if (this.el) {
            this.el.onclick = null;
            this.el.onmousedown = null;
        }
        if (this.menu) this.menu.owner = null;
        this.menu = null;
        mini.EompButton.superclass.destroy.call(this, removeEl);
    },
    doUpdate: function () {
        if (this._allowUpdate === false) return;
        

        var cls = "", text = this.text;
        var hasIcon = this.iconStyle || this.iconCls || this.img;
        
        if (hasIcon && text) {
            cls = " mini-button-icon " + this.iconCls;
        } else if (hasIcon && text === "") {
            cls = " mini-button-iconOnly " + this.iconCls;
            text = "&nbsp;";
        } else {
            if (text == "") text = "&nbsp;";
        }

        var iconStyle = this.iconStyle || "";
        if (!iconStyle && this.img) iconStyle = 'background-image:url(' + this.img + ')';

        var s = '<span class="mini-button-text ' + cls + '" style="' + iconStyle + '">' + text + '</span>';
        if (this.allowCls) {
            s = s + '<span class="mini-button-allow ' + this.allowCls + '"></span>';
        }
        this.el.innerHTML = s;



    },
    href: "",
    setHref: function (value) {
        this.href = value;
        this.el.href = value;
        var el = this.el;
        setTimeout(function () {
            el.onclick = null;
        }, 100);
    },
    getHref: function () {
        return this.href;
    },
    target: "",
    setTarget: function (value) {
        this.target = value;
        this.el.target = value;
    },
    getTarget: function () {
        return this.target;
    },
    setText: function (value) {
        if (this.text != value) {
            this.text = value;
            this.doUpdate();
        }
    },
    getText: function () {
        return this.text;
    },
	setbackground:function(value)
	{
		this.background = value;
        this.doUpdate();
	},
	getbackground:function()
	{
		 return this.background;
	},
    setIconCls: function (value) {
        this.iconCls = value;
        this.doUpdate();
    },
    getIconCls: function () {
        return this.iconCls;
    },
    setIconStyle: function (value) {
        this.iconStyle = value;
        this.doUpdate();
    },
    getIconStyle: function () {
        return this.iconStyle;
    },
    img: "",
    setImg: function (value) {
        this.img = value;
        this.doUpdate();
    },
    getImg: function () {
        return this.img;
    },
    setIconPosition: function (value) {
        this.iconPosition = "left";
        this.doUpdate();
    },
    getIconPosition: function () {
        return this.iconPosition;
    },

    setPlain: function (value) {
        this.plain = value;
        if (value) this.addCls(this._plainCls);
        else this.removeCls(this._plainCls);
    },
    getPlain: function () {
        return this.plain;
    },
    setGroupName: function (value) {
        this.groupName = value;
    },
    getGroupName: function () {
        return this.groupName;
    },
    setCheckOnClick: function (value) {
        this.checkOnClick = value;
    },
    getCheckOnClick: function () {
        return this.checkOnClick;
    },
    setChecked: function (value) {

        var fire = this.checked != value;
        this.checked = value;
        if (value) this.addCls(this._checkedCls);
        else this.removeCls(this._checkedCls);
        if (fire) {
            this.fire("CheckedChanged");
        }
    },
    getChecked: function () {
        return this.checked;
    },
    doClick: function () {
        this.__OnClick(null);
    },
    
    __OnClick: function (e) {
        if (!this.href && e) {
            e.preventDefault();
        }
        if (this.readOnly || this.enabled == false) return;
        this.focus();
        if (this.checkOnClick) {
            if (this.groupName) {
                var groupName = this.groupName;
                var buttons = mini.findControls(function (control) {
                    if (control.type == "button" && control.groupName == groupName) return true;
                });
                if (buttons.length > 0) {
                    for (var i = 0, l = buttons.length; i < l; i++) {
                        var button = buttons[i];
                        if (button != this) button.setChecked(false);
                    }
                    this.setChecked(true);
                } else {
                    this.setChecked(!this.checked);
                }
            } else {
                this.setChecked(!this.checked);
            }
        }

        this.fire("click", {
            htmlEvent: e
        });
        
    },
    __OnMouseDown: function (e) {
        if (this.isReadOnly()) return;

        this.addCls(this._pressedCls);
        mini.on(document, "mouseup", this.__OnDocMouseUp, this);
    },
    __OnDocMouseUp: function (e) {
        this.removeCls(this._pressedCls);
        mini.un(document, "mouseup", this.__OnDocMouseUp, this);
    },
    onClick: function (fn, scope) {
        this.on("click", fn, scope);
    },
    
    getAttrs: function (el) {
        var attrs = mini.EompButton.superclass.getAttrs.call(this, el);
        
        attrs.text = el.innerHTML;
        mini._ParseString(el, attrs,
            ["text", "href","background", "iconCls", "iconStyle", "iconPosition", "groupName", "menu",
                "onclick", "oncheckedchanged", "target", "img"
             ]
        );
        mini._ParseBool(el, attrs,
            ["plain", "checkOnClick", "checked"
             ]
        );
        return attrs;
    }
});
mini.regClass(mini.EompButton, "eompbutton");