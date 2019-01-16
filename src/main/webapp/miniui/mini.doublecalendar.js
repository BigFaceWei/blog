mini.DoubleDatePicker = function () {
	this._doubleDateValue = [];
    mini.DoubleDatePicker.superclass.constructor.call(this);
    mini.addClass(this.el, "mini-doubledatepicker");

    this.on("validation", this.__OnValidation, this); 
}

mini.extend(mini.DoubleDatePicker, mini.PopupEdit, {
    valueFormat: "",
    format: "yyyy-MM-dd",       

    maxDate: null,
    minDate: null,

    popupWidth: "",
    _doubleDateValue: [],

    viewDate: new Date(),
    showTime: false,
    timeFormat: 'H:mm',

    showTodayButton: true,
    showClearButton: true,
    showOkButton: false,

    uiCls: "mini-doubledatepicker",

    _createCalendar: function () {
        if (!mini.DoubleDatePicker._Calendar) {
            var calendar = mini.DoubleDatePicker._Calendar = new mini.Calendar();
            calendar.setStyle("border:0;float:left");
        }
        if (!mini.DoubleDatePicker._Calendar2) {
            var calendar2 = mini.DoubleDatePicker._Calendar2 = new mini.Calendar();
            calendar2.setStyle("border-left:1;float:left;border-right:0;border-top:0;border-bottom:0");
        }
    },
    
    _getCalendar: function () {
        if (!mini.DoubleDatePicker._Calendar) {
            this._createCalendar();
        }
        return mini.DoubleDatePicker._Calendar;
    },
    
    _getCalendar2: function () {
        if (!mini.DoubleDatePicker._Calendar2) {
        	this._createCalendar();
        }
        return mini.DoubleDatePicker._Calendar2;
    },

    destroy: function (removeEl) {
        if (this._destroyPopup) {
            mini.DoubleDatePicker._Calendar = null;
            mini.DoubleDatePicker._Calendar2 = null;
        }
        mini.DoubleDatePicker.superclass.destroy.call(this, removeEl);
    },
    _createPopup: function () {
        mini.DoubleDatePicker.superclass._createPopup.call(this);
          
        this._calendar = this._getCalendar();
        this._calendar2 = this._getCalendar2();
    },
    showPopup: function () {
        var ex = { cancel: false };
        this.fire("beforeshowpopup", ex);
        if (ex.cancel == true) return;

        this._calendar = this._getCalendar();
        this._calendar.beginUpdate();
        this._calendar._allowLayout = false;
        if (this._calendar.el.parentNode != this.popup._contentEl) {
            this._calendar.render(this.popup._contentEl);
        }
        
        this._calendar2 = this._getCalendar2();
        this._calendar2.beginUpdate();
        this._calendar2._allowLayout = false;
        if (this._calendar2.el.parentNode != this.popup._contentEl) {
            this._calendar2.render(this.popup._contentEl);
        }
        
        this._calendar.set({
            showTime: this.showTime,
            timeFormat: this.timeFormat,
            showClearButton: this.showClearButton,
            showTodayButton: this.showTodayButton,
            showOkButton: this.showOkButton
        });
        
        this._calendar2.set({
            showTime: this.showTime,
            timeFormat: this.timeFormat,
            showClearButton: this.showClearButton,
            showTodayButton: this.showTodayButton,
            showOkButton: this.showOkButton
        });
        this._calendar.setValue(this.value.split(",")[0]);
        this._calendar2.setValue(this.value.split(",")[1]);
        
        if (this.value) {
            this._calendar.setViewDate(this.value.split(",")[0]);
            this._calendar2.setViewDate(this.value.split(",")[1]);
        } else {
            this._calendar.setViewDate(this.viewDate);
            this._calendar2.setViewDate(this.viewDate);
        }

        mini.DoubleDatePicker.superclass.showPopup.call(this);

        function doUpdate() {
            if (this._calendar._target) {
                var obj = this._calendar._target;
                this._calendar.un("timechanged", obj.__OnTimeChanged, obj);
                this._calendar.un("dateclick", obj.__OnDateClick, obj);
                this._calendar.un("drawdate", obj.__OnDrawDate, obj);
            }
            this._calendar.on("timechanged", this.__OnTimeChanged, this);
            this._calendar.on("dateclick", this.__OnDateClick, this);
            this._calendar.on("drawdate", this.__OnDrawDate, this);

            this._calendar.endUpdate();

            this._calendar._allowLayout = true;
            this._calendar.doLayout();

            this._calendar.focus();

            this._calendar._target = this;
            
            if (this._calendar2._target) {
                var obj = this._calendar2._target;
                this._calendar2.un("timechanged", obj.__OnTimeChanged2, obj);
                this._calendar2.un("dateclick", obj.__OnDateClick2, obj);
                this._calendar2.un("drawdate", obj.__OnDrawDate2, obj);
            }
            this._calendar2.on("timechanged", this.__OnTimeChanged2, this);
            this._calendar2.on("dateclick", this.__OnDateClick2, this);
            this._calendar2.on("drawdate", this.__OnDrawDate2, this);

            this._calendar2.endUpdate();

            this._calendar2._allowLayout = true;
            this._calendar2.doLayout();

            this._calendar2.focus();

            this._calendar2._target = this;
        }

        var me = this;
        
        doUpdate.call(me);
        


    },
    
    update : function(){
    	if (this._calendar._target) {
            var obj = this._calendar._target;
            this._calendar.un("timechanged", obj.__OnTimeChanged, obj);
            this._calendar.un("dateclick", obj.__OnDateClick, obj);
            this._calendar.un("drawdate", obj.__OnDrawDate, obj);
        }
        this._calendar.on("timechanged", this.__OnTimeChanged, this);
        this._calendar.on("dateclick", this.__OnDateClick, this);
        this._calendar.on("drawdate", this.__OnDrawDate, this);

        this._calendar.endUpdate();

        this._calendar._allowLayout = true;
        this._calendar.doLayout();

        this._calendar.focus();

        this._calendar._target = this;
        
        if (this._calendar2._target) {
            var obj = this._calendar2._target;
            this._calendar2.un("timechanged", obj.__OnTimeChanged2, obj);
            this._calendar2.un("dateclick", obj.__OnDateClick2, obj);
            this._calendar2.un("drawdate", obj.__OnDrawDate2, obj);
        }
        this._calendar2.on("timechanged", this.__OnTimeChanged2, this);
        this._calendar2.on("dateclick", this.__OnDateClick2, this);
        this._calendar2.on("drawdate", this.__OnDrawDate2, this);

        this._calendar2.endUpdate();

        this._calendar2._allowLayout = true;
        this._calendar2.doLayout();

        this._calendar2.focus();

        this._calendar2._target = this;
    },
    
    hidePopup: function () {
        
        mini.DoubleDatePicker.superclass.hidePopup.call(this);

        this._calendar.un("timechanged", this.__OnTimeChanged, this);
        this._calendar.un("dateclick", this.__OnDateClick, this);
        this._calendar.un("drawdate", this.__OnDrawDate, this);
        
        this._calendar2.un("timechanged", this.__OnTimeChanged2, this);
        this._calendar2.un("dateclick", this.__OnDateClick2, this);
        this._calendar2.un("drawdate", this.__OnDrawDate2, this);

    },
    within: function (e) {
        if (mini.isAncestor(this.el, e.target)) return true;
        if (this._calendar.within(e)) return true;
        if (this._calendar2.within(e)) return true;
        return false;
    },
    __OnPopupKeyDown: function (e) {
        if (e.keyCode == 13) {
            this.__OnDateClick();
        }
        if (e.keyCode == 27) {
            this.hidePopup();
            this.focus();
        }
    },
    minDateErrorText: '', 
    maxDateErrorText: '', 
    __OnValidation: function (e) {
        if (e.isValid == false) return;
        var date = this.value;

        if (!mini.isDate(date)) return;
        var maxDate = mini.parseDate(this.maxDate);
        var minDate = mini.parseDate(this.minDate);
        var maxDateErrorText = this.maxDateErrorText || mini.VTypes.maxDateErrorText;
        var minDateErrorText = this.minDateErrorText || mini.VTypes.minDateErrorText;
        if (mini.isDate(maxDate)) {
            if (date.getTime() > maxDate.getTime()) {
                e.isValid = false;
                e.errorText = String.format(maxDateErrorText, mini.formatDate(maxDate, this.format));
            }
        }
        if (mini.isDate(minDate)) {
            if (date.getTime() < minDate.getTime()) {
                e.isValid = false;
                e.errorText = String.format(minDateErrorText, mini.formatDate(minDate, this.format));
            }
        }

    },
    __OnDrawDate: function (e) {
        var date = e.date;
        var maxDate = mini.parseDate(this.maxDate);
        if (mini.isDate(maxDate)) {
            if (date.getTime() > maxDate.getTime()) {
                e.allowSelect = false;
            }
        }
//        if (mini.isDate(minDate)) {
//            if (date.getTime() < minDate.getTime()) {
//                e.allowSelect = false;
//            }
//        }

        this.fire("drawdate", e);
    },
    
    __OnDrawDate2: function (e) {
        var date = e.date;
        var minDate = mini.parseDate(this.minDate);
//        if (mini.isDate(maxDate)) {
//            if (date.getTime() > maxDate.getTime()) {
//                e.allowSelect = false;
//            }
//        }
        if (mini.isDate(minDate)) {
            if (date.getTime() < minDate.getTime()) {
                e.allowSelect = false;
            }
        }

        this.fire("drawdate", e);
    },
    
    
    __OnDateClick: function (e) {
        if (this.showOkButton && e.action != "ok") return;
        var date = this._calendar.getValue();
        this.setDateValue(date,1);
        this.focus();
    },
    
    __OnDateClick2: function (e) {
        if (this.showOkButton && e.action != "ok") return;
        var date2 = this._calendar2.getValue();
        this.setDateValue(date2,2);
        this.focus();
    },
    __OnTimeChanged: function (e) {
        if (this.showOkButton) return;
        var date = this._calendar.getValue();
        this.setDateValue(date, 1);
        this._OnValueChanged();
    },
    __OnTimeChanged2: function (e) {
        if (this.showOkButton) return;
        var date = this._calendar2.getValue();
        this.setDateValue(date, 2);
        this._OnValueChanged();
    },
    
    
    setFormat: function (value) {
        if (typeof value != "string") return;
        if (this.format != value) {
            this.format = value;
            this._textEl.value = this._valueEl.value = this.getFormValue();
        }
    },
    getFormat: function () {
        return this.format;
    },
    setValueFormat: function (value) {
        if (typeof value != "string") return;
        if (this.valueFormat != value) {
            this.valueFormat = value;
        }
    },
    getValueFormat: function () {
        return this.valueFormat;
    },
    
    setValue: function (value) {
    	v1 = mini.parseDate(value.split(",")[0]);
        v2 = mini.parseDate(value.split(",")[1]);
        if (mini.isNull(v1)) v1 = "";
        if (mini.isDate(v1)) v1 = new Date(v1.getTime());
        if (mini.isNull(v2)) v2 = "";
        if (mini.isDate(v2)) v2 = new Date(v2.getTime());
        this._doubleDateValue[0] = v1;
        this._doubleDateValue[1] = v2;
        this.text = this._textEl.value = this._valueEl.value = this.getFormValue();
    },
    
    setDateValue: function (value, num) {
        value = mini.parseDate(value);
        if (mini.isNull(value)) value = "";
        if (mini.isDate(value)) value = new Date(value.getTime());
        if(num === 1 && this._doubleDateValue[0]!= value){
        	this._doubleDateValue[0] = value;
        	var c1 = mini.isDate(value) ? mini.formatDate(value, this.format) : "";
        	 if(!("" == c1)){
             	this.minDate = c1;
             	this.update();
             } 
        	this.text = this._textEl.value = this._valueEl.value = this.getFormValue();
        } else if(num === 2 && this._doubleDateValue[1]!= value){
        	this._doubleDateValue[1] = value;
        	var c2 = mini.isDate(value) ? mini.formatDate(value, this.format) : "";
       	    if (!("" == c2)){
             	this.maxDate = c2;
             	this.update();
            }
        	this.text = this._textEl.value = this._valueEl.value = this.getFormValue();
        } 
    },
    
    nullValue: "",
    setNullValue: function (value) {
        if (value == "null") value = null;
        this.nullValue = value;
    },
    getNullValue: function () {
        return this.nullValue;
    },

    getValue: function () {
        if (!mini.isDate(this._doubleDateValue[0]) || !mini.isDate(this._doubleDateValue[1])) return this.nullValue;
        var v1 = this._doubleDateValue[0];
        var v2 = this._doubleDateValue[1];
        if (this.valueFormat) {
            v1 = mini.formatDate(v1, this.valueFormat);
            v2 = mini.formatDate(v2, this.valueFormat);
        }
        var n ;
        var time1 = '';
        var time2 = '';
        time1 += v1.getFullYear();
        time1 += "-";
        n = v1.getMonth() + 1;
        time1 += n < 10 ? "0" + n : n;
        time1 += "-";
        n = v1.getDate();
        time1 += n < 10 ? "0" + n : n;
        
        time2 += v2.getFullYear();
        time2 += "-";
        n = v2.getMonth() + 1;
        time2 += n < 10 ? "0" + n : n;
        time2 += "-";
        n = v2.getDate();
        time2 += n < 10 ? "0" + n : n;
        
        if(this.format == "yyyy-MM-dd HH:mm:ss"){
        	 time1 += " ";
             n = v1.getHours();
             time1 += n < 10 ? "0" + n : n;
             time1 += ":";
             n = v1.getMinutes();
             time1 += n < 10 ? "0" + n : n;
             time1 += ":";
             n = v1.getSeconds();
             time1 += n < 10 ? "0" + n : n;
             time2 += " ";
             n = v1.getHours();
             time2 += n < 10 ? "0" + n : n;
             time2 += ":";
             n = v2.getMinutes();
             time2 += n < 10 ? "0" + n : n;
             time2 += ":";
             n = v2.getSeconds();
             time2 += n < 10 ? "0" + n : n;
        }
        return time1 + "," +time2 ;
    },
    getFormValue: function (format) {
        if (!mini.isDate(this._doubleDateValue[0]) && !mini.isDate(this._doubleDateValue[1])) return "";
        format = format || this.format;
        var c1 = mini.isDate(this._doubleDateValue[0]) ? mini.formatDate(this._doubleDateValue[0], format) : "";
        var c2 = mini.isDate(this._doubleDateValue[1]) ? mini.formatDate(this._doubleDateValue[1], format) : "";
        
        return  c1 + "," + c2;
    },
    setViewDate: function (value) {
        value = mini.parseDate(value);
        if (!mini.isDate(value)) return;
        this.viewDate = value;
    },
    getViewDate: function () {
        return this._calendar.getViewDate();
    },
    setShowTime: function (value) {
        if (this.showTime != value) {
            this.showTime = value;
            
        }
    },
    getShowTime: function () {
        return this.showTime;
    },
    setTimeFormat: function (value) {
        if (this.timeFormat != value) {
            this.timeFormat = value;
            
        }
    },
    getTimeFormat: function () {
        return this.timeFormat;
    },
    setShowTodayButton: function (value) {
        this.showTodayButton = value;
        
    },
    getShowTodayButton: function () {
        return this.showTodayButton;
    },
    setShowClearButton: function (value) {
        this.showClearButton = value;
        
    },
    getShowClearButton: function () {
        return this.showClearButton;
    },
    setShowOkButton: function (value) {
        this.showOkButton = value;
    },
    getShowOkButton: function () {
        return this.showOkButton;
    },

    setMaxDate: function (value) {
        this.maxDate = value;
    },
    getMaxDate: function () {
        return this.maxDate;
    },
    setMinDate: function (value) {
        this.minDate = value;
    },
    getMinDate: function () {
        return this.minDate;
    },

    setMaxDateErrorText: function (value) {
        this.maxDateErrorText = value;
    },
    getMaxDateErrorText: function () {
        return this.maxDateErrorText;
    },
    setMinDateErrorText: function (value) {
        this.minDateErrorText = value;
    },
    getMinDateErrorText: function () {
        return this.minDateErrorText;
    },

    __OnInputTextChanged: function (e) {
        var v = this._textEl.value;
        var d1 = mini.parseDate(v.split(",")[0]);
        var d2 = mini.parseDate(v.split(",")[1]);

        if (!d1 || isNaN(d1) || d1.getFullYear() == 1970) {
            d1 = null;
        }
        
        if (!d2 || isNaN(d2) || d2.getFullYear() == 1970) {
            d2 = null;
        }

        var value = this.getFormValue('U');

        this.setDateValue(d1, 1);
        this.setDateValue(d2, 2);
        if (d1 == null && d2 == null) this._textEl.value = "";
        if (value !== this.getFormValue('U')) {
            this._OnValueChanged();
        }
    },
    __OnInputKeyDown: function (e) {
        var ex = { htmlEvent: e };
        this.fire("keydown", ex);
        if (e.keyCode == 8 && (this.isReadOnly() || this.allowInput == false)) {
            return false;
        }

        if (e.keyCode == 9) {   
            if (this.isShowPopup()) {
                this.hidePopup();
            }
            return;
        }

        if (this.isReadOnly()) return;
        
        switch (e.keyCode) {
            case 27:        
                e.preventDefault();
                if (this.isShowPopup()) {
                    e.stopPropagation();
                }

                this.hidePopup();
                break;
            case 9:     
            case 13:     
                           
                if (this.isShowPopup()) {
                    e.preventDefault();
                    e.stopPropagation();


                    this.hidePopup();
                    

                } else {
                    this.__OnInputTextChanged(null);
                    var me = this;
                    setTimeout(function () {
                        me.fire("enter", ex);
                    }, 10);
                }
                break;
            case 37:    
                break;
            case 38:    
                e.preventDefault();
                break;
            case 39:    
                break;
            case 40:    
                e.preventDefault();
                this.showPopup();
                break;
            default:
                break;
        }
    },

    getAttrs: function (el) {
        var attrs = mini.DoubleDatePicker.superclass.getAttrs.call(this, el);

        mini._ParseString(el, attrs,
            ["format", "viewDate", "timeFormat", "ondrawdate", "minDate", "maxDate",
            "valueFormat", "nullValue", "minDateErrorText", "maxDateErrorText"
             ]
        );
        mini._ParseBool(el, attrs,
            ["showTime", "showTodayButton", "showClearButton", "showOkButton"
             ]
        );


        return attrs;
    }
});

mini.regClass(mini.DoubleDatePicker, 'doubledatepicker');