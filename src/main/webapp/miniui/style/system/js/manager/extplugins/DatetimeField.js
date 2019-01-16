
Ext.ns('Ext.ux');


Ext.ux.Spinner = Ext.extend(Ext.util.Observable, {
    incrementValue: 1,
    alternateIncrementValue: 5,
    triggerClass: 'x-form-spinner-trigger',
    splitterClass: 'x-form-spinner-splitter',
    alternateKey: Ext.EventObject.shiftKey,
    defaultValue: 0,
    accelerate: false,

    constructor: function(config){
        Ext.ux.Spinner.superclass.constructor.call(this, config);
        Ext.apply(this, config);
        this.mimicing = false;
    },

    init: function(field){
        this.field = field;

        field.afterMethod('onRender', this.doRender, this);
        field.afterMethod('onEnable', this.doEnable, this);
        field.afterMethod('onDisable', this.doDisable, this);
        field.afterMethod('afterRender', this.doAfterRender, this);
        field.afterMethod('onResize', this.doResize, this);
        field.afterMethod('onFocus', this.doFocus, this);
        field.beforeMethod('onDestroy', this.doDestroy, this);
    },

    doRender: function(ct, position){
        var el = this.el = this.field.getEl();
        var f = this.field;

        if (!f.wrap) {
            f.wrap = this.wrap = el.wrap({
                cls: "x-form-field-wrap"
            });
        }
        else {
            this.wrap = f.wrap.addClass('x-form-field-wrap');
        }

        this.trigger = this.wrap.createChild({
            tag: "img",
            src: Ext.BLANK_IMAGE_URL,
            cls: "x-form-trigger " + this.triggerClass
        });

        if (!f.width) {
            this.wrap.setWidth(el.getWidth() + this.trigger.getWidth());
        }

        this.splitter = this.wrap.createChild({
            tag: 'div',
            cls: this.splitterClass,
            style: 'width:13px; height:2px;'
        });
        this.splitter.setRight((Ext.isIE) ? 1 : 2).setTop(10).show();

        this.proxy = this.trigger.createProxy('', this.splitter, true);
        this.proxy.addClass("x-form-spinner-proxy");
        this.proxy.setStyle('left', '0px');
        this.proxy.setSize(14, 1);
        this.proxy.hide();
        this.dd = new Ext.dd.DDProxy(this.splitter.dom.id, "SpinnerDrag", {
            dragElId: this.proxy.id
        });

        this.initTrigger();
        this.initSpinner();
    },

    doAfterRender: function(){
        var y;
        if (Ext.isIE && this.el.getY() != (y = this.trigger.getY())) {
            this.el.position();
            this.el.setY(y);
        }
    },

    doEnable: function(){
        if (this.wrap) {
            this.disabled = false;
            this.wrap.removeClass(this.field.disabledClass);
        }
    },

    doDisable: function(){
        if (this.wrap) {
	        this.disabled = true;
            this.wrap.addClass(this.field.disabledClass);
            this.el.removeClass(this.field.disabledClass);
        }
    },

    doResize: function(w, h){
        if (typeof w == 'number') {
            this.el.setWidth(w - this.trigger.getWidth());
        }
        this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth());
    },

    doFocus: function(){
        if (!this.mimicing) {
            this.wrap.addClass('x-trigger-wrap-focus');
            this.mimicing = true;
            Ext.get(Ext.isIE ? document.body : document).on("mousedown", this.mimicBlur, this, {
                delay: 10
            });
            this.el.on('keydown', this.checkTab, this);
        }
    },

    // private
    checkTab: function(e){
        if (e.getKey() == e.TAB) {
            this.triggerBlur();
        }
    },

    // private
    mimicBlur: function(e){
        if (!this.wrap.contains(e.target) && this.field.validateBlur(e)) {
            this.triggerBlur();
        }
    },

    // private
    triggerBlur: function(){
        this.mimicing = false;
        Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        this.el.un("keydown", this.checkTab, this);
        this.field.beforeBlur();
        this.wrap.removeClass('x-trigger-wrap-focus');
        this.field.onBlur.call(this.field);
    },

    initTrigger: function(){
        this.trigger.addClassOnOver('x-form-trigger-over');
        this.trigger.addClassOnClick('x-form-trigger-click');
    },

    initSpinner: function(){
        this.field.addEvents({
            'spin': true,
            'spinup': true,
            'spindown': true
        });

        this.keyNav = new Ext.KeyNav(this.el, {
            "up": function(e){
                e.preventDefault();
                this.onSpinUp();
            },

            "down": function(e){
                e.preventDefault();
                this.onSpinDown();
            },

            "pageUp": function(e){
                e.preventDefault();
                this.onSpinUpAlternate();
            },

            "pageDown": function(e){
                e.preventDefault();
                this.onSpinDownAlternate();
            },

            scope: this
        });

        this.repeater = new Ext.util.ClickRepeater(this.trigger, {
            accelerate: this.accelerate
        });
        this.field.mon(this.repeater, "click", this.onTriggerClick, this, {
            preventDefault: true
        });

        this.field.mon(this.trigger, {
            mouseover: this.onMouseOver,
            mouseout: this.onMouseOut,
            mousemove: this.onMouseMove,
            mousedown: this.onMouseDown,
            mouseup: this.onMouseUp,
            scope: this,
            preventDefault: true
        });

        this.field.mon(this.wrap, "mousewheel", this.handleMouseWheel, this);

        this.dd.setXConstraint(0, 0, 10)
        this.dd.setYConstraint(1500, 1500, 10);
        this.dd.endDrag = this.endDrag.createDelegate(this);
        this.dd.startDrag = this.startDrag.createDelegate(this);
        this.dd.onDrag = this.onDrag.createDelegate(this);
    },

    onMouseOver: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpHoverClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-overup' : 'x-form-spinner-overdown';
        this.trigger.addClass(this.tmpHoverClass);
    },

    //private
    onMouseOut: function(){
        this.trigger.removeClass(this.tmpHoverClass);
    },

    //private
    onMouseMove: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        if (((Ext.EventObject.getPageY() > middle) && this.tmpHoverClass == "x-form-spinner-overup") ||
        ((Ext.EventObject.getPageY() < middle) && this.tmpHoverClass == "x-form-spinner-overdown")) {
        }
    },

    //private
    onMouseDown: function(){
        if (this.disabled) {
            return;
        }
        var middle = this.getMiddle();
        this.tmpClickClass = (Ext.EventObject.getPageY() < middle) ? 'x-form-spinner-clickup' : 'x-form-spinner-clickdown';
        this.trigger.addClass(this.tmpClickClass);
    },

    //private
    onMouseUp: function(){
        this.trigger.removeClass(this.tmpClickClass);
    },

    //private
    onTriggerClick: function(){
        if (this.disabled || this.el.dom.readOnly) {
            return;
        }
        var middle = this.getMiddle();
        var ud = (Ext.EventObject.getPageY() < middle) ? 'Up' : 'Down';
        this['onSpin' + ud]();
    },

    //private
    getMiddle: function(){
        var t = this.trigger.getTop();
        var h = this.trigger.getHeight();
        var middle = t + (h / 2);
        return middle;
    },

    //private
    //checks if control is allowed to spin
    isSpinnable: function(){
        if (this.disabled || this.el.dom.readOnly) {
            Ext.EventObject.preventDefault(); //prevent scrolling when disabled/readonly
            return false;
        }
        return true;
    },

    handleMouseWheel: function(e){
        //disable scrolling when not focused
        if (this.wrap.hasClass('x-trigger-wrap-focus') == false) {
            return;
        }

        var delta = e.getWheelDelta();
        if (delta > 0) {
            this.onSpinUp();
            e.stopEvent();
        }
        else
            if (delta < 0) {
                this.onSpinDown();
                e.stopEvent();
            }
    },

    //private
    startDrag: function(){
        this.proxy.show();
        this._previousY = Ext.fly(this.dd.getDragEl()).getTop();
    },

    //private
    endDrag: function(){
        this.proxy.hide();
    },

    //private
    onDrag: function(){
        if (this.disabled) {
            return;
        }
        var y = Ext.fly(this.dd.getDragEl()).getTop();
        var ud = '';

        if (this._previousY > y) {
            ud = 'Up';
        } //up
        if (this._previousY < y) {
            ud = 'Down';
        } //down
        if (ud != '') {
            this['onSpin' + ud]();
        }

        this._previousY = y;
    },

    //private
    onSpinUp: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinUpAlternate();
            return;
        }
        else {
            this.spin(false, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },

    //private
    onSpinDown: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        if (Ext.EventObject.shiftKey == true) {
            this.onSpinDownAlternate();
            return;
        }
        else {
            this.spin(true, false);
        }
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },

    //private
    onSpinUpAlternate: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(false, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spinup", this);
    },

    //private
    onSpinDownAlternate: function(){
        if (this.isSpinnable() == false) {
            return;
        }
        this.spin(true, true);
        this.field.fireEvent("spin", this);
        this.field.fireEvent("spindown", this);
    },

    spin: function(down, alternate){
        var v = parseFloat(this.field.getValue());
        var incr = (alternate == true) ? this.alternateIncrementValue : this.incrementValue;
        (down == true) ? v -= incr : v += incr;

        v = (isNaN(v)) ? this.defaultValue : v;
        v = this.fixBoundries(v);
        this.field.setRawValue(v);
    },

    fixBoundries: function(value){
        var v = value;

        if (this.field.minValue != undefined && v < this.field.minValue) {
            v = this.field.minValue;
        }
        if (this.field.maxValue != undefined && v > this.field.maxValue) {
            v = this.field.maxValue;
        }

        return this.fixPrecision(v);
    },

    // private
    fixPrecision: function(value){
        var nan = isNaN(value);
        if (!this.field.allowDecimals || this.field.decimalPrecision == -1 || nan || !value) {
            return nan ? '' : value;
        }
        return parseFloat(parseFloat(value).toFixed(this.field.decimalPrecision));
    },

    doDestroy: function(){
        if (this.trigger) {
            this.trigger.remove();
        }
        if (this.wrap) {
            this.wrap.remove();
            delete this.field.wrap;
        }

        if (this.splitter) {
            this.splitter.remove();
        }

        if (this.dd) {
            this.dd.unreg();
            this.dd = null;
        }

        if (this.proxy) {
            this.proxy.remove();
        }

        if (this.repeater) {
            this.repeater.purgeListeners();
        }
        if (this.mimicing){
            Ext.get(Ext.isIE ? document.body : document).un("mousedown", this.mimicBlur, this);
        }
    }
});

//backwards compat
Ext.form.Spinner = Ext.ux.Spinner;






Ext.ns('Ext.ux.form');

Ext.ux.form.SpinnerField = Ext.extend(Ext.form.NumberField, {
    actionMode: 'wrap',
    deferHeight: true,
    autoSize: Ext.emptyFn,
    onBlur: Ext.emptyFn,
    adjustSize: Ext.BoxComponent.prototype.adjustSize,

	constructor: function(config) {
		var spinnerConfig = Ext.copyTo({}, config, 'incrementValue,alternateIncrementValue,accelerate,defaultValue,triggerClass,splitterClass');

		var spl = this.spinner = new Ext.ux.Spinner(spinnerConfig);

		var plugins = config.plugins
			? (Ext.isArray(config.plugins)
				? config.plugins.push(spl)
				: [config.plugins, spl])
			: spl;

		Ext.ux.form.SpinnerField.superclass.constructor.call(this, Ext.apply(config, {plugins: plugins}));
	},

    // private
    getResizeEl: function(){
        return this.wrap;
    },

    // private
    getPositionEl: function(){
        return this.wrap;
    },

    // private
    alignErrorIcon: function(){
        if (this.wrap) {
            this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
        }
    },

    validateBlur: function(){
        return true;
    }
});

Ext.reg('spinnerfield', Ext.ux.form.SpinnerField);

//backwards compat
Ext.form.SpinnerField = Ext.ux.form.SpinnerField;














Ext.DatetimePicker = Ext.extend(Ext.DatePicker, {
	
	sureText : '确定',
	
	initComponent: function() {
		Ext.DatetimePicker.superclass.initComponent.call(this);
	},
	
    sureClick : function(e, t){
    	if(!this.hourField.isValid())
    		return;
    	if(!this.minuteField.isValid())
    		return;
    	if(!this.secondField.isValid())
    		return;
    	
    	var h = this.hourField.getValue();
    	h = h == '' ? 0 : parseInt(h);
    	
    	var m = this.minuteField.getValue();
    	m = m == '' ? 0 : parseInt(m);
    	
    	var s = this.secondField.getValue();
    	s = s == '' ? 0 : parseInt(s);
    	this.value.setHours(h);
    	this.value.setMinutes(m);
    	this.value.setSeconds(s);
    	this.fireEvent("select", this, this.value);
    },
    
    selectDate: function(e, t){
        e.stopEvent();
        if(t.dateValue && !Ext.fly(t.parentNode).hasClass("x-date-disabled")){
            this.setValue(new Date(t.dateValue));
        }
    },
    
 	onRender: function(container, position) {
    	var m = ['<table cellspacing="0">',
                    '<tr><td class="x-date-left"><a href="#" title="', this.prevText ,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="', this.nextText ,'">&#160;</a></td></tr>',
                    '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
        var dn = this.dayNames, i;
        for(i = 0; i < 7; i++){
            var d = this.startDay+i;
            if(d > 6){
                d = d-7;
            }
            m.push('<th><span>', dn[d].substr(0,1), '</span></th>');
        }
        m[m.length] = '</tr></thead><tbody><tr>';
        for(i = 0; i < 42; i++) {
            if(i % 7 === 0 && i !== 0){
                m[m.length] = '</tr><tr>';
            }
            m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
        }
        m.push('</tr></tbody></table></td></tr>',
        	   '<tr><td colspan="3" class="x-datetime-bottom" align="center">',
        	   '<table cellspacing="0" width="100%"><tr>',
        	   '<td class="y-hour-middle" align="center"></td><td width="23" align="center" class="datetime-yms">时</td>',
        	   '<td class="y-minute-middle" align="center"></td><td width="23" align="center" class="datetime-yms">分</td>',
        	   '<td class="y-second-middle" align="center"></td><td width="23" align="center" class="datetime-yms">秒</td>',
        	   '<td class="x-datetime-button" align="center"></td>',
        	   '</tr></table>',
               '</td></tr></table><div class="x-date-mp"></div>');
    	
        var el = document.createElement("div");
        el.className = "x-date-picker";
        el.innerHTML = m.join("");
        container.dom.insertBefore(el, position);

        this.el = Ext.get(el);
        this.eventEl = Ext.get(el.firstChild);
        this.eventEl.on("mousewheel", this.handleMouseWheel,  this);
        this.eventEl.on("click", this.selectDate,  this, {delegate: "a.x-date-date"});
        
        this.prevRepeater = new Ext.util.ClickRepeater(this.el.child('td.x-date-left a'), {
            handler: this.showPrevMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.nextRepeater = new Ext.util.ClickRepeater(this.el.child('td.x-date-right a'), {
            handler: this.showNextMonth,
            scope: this,
            preventDefault:true,
            stopDefault:true
        });

        this.monthPicker = this.el.down('div.x-date-mp');
        this.monthPicker.enableDisplayMode('block');
        
        var kn = new Ext.KeyNav(this.eventEl, {
            "left" : function(e){
                e.ctrlKey ?
                    this.showPrevMonth() :
                    this.update(this.activeDate.add("d", -1));
            },

            "right" : function(e){
                e.ctrlKey ?
                    this.showNextMonth() :
                    this.update(this.activeDate.add("d", 1));
            },

            "up" : function(e){
                e.ctrlKey ?
                    this.showNextYear() :
                    this.update(this.activeDate.add("d", -7));
            },

            "down" : function(e){
                e.ctrlKey ?
                    this.showPrevYear() :
                    this.update(this.activeDate.add("d", 7));
            },

            "pageUp" : function(e){
                this.showNextMonth();
            },

            "pageDown" : function(e){
                this.showPrevMonth();
            },

            "enter" : function(e){
                e.stopPropagation();
                return true;
            },

            scope : this
        });

        this.el.unselectable();
        
        this.cells = this.el.select("table.x-date-inner tbody td");
        this.textNodes = this.el.query("table.x-date-inner tbody span");

        this.mbtn = new Ext.Button({
            text: "&#160;",
            tooltip: this.monthYearText,
            renderTo: this.el.child("td.x-date-middle", true)
        });

        this.mbtn.on('click', this.showMonthPicker, this);
        this.mbtn.el.child(this.mbtn.menuClassTarget).addClass("x-btn-with-menu");

        var dt1 = this.value || new Date();
        var today = (new Date()).dateFormat(this.format);
        var sureBtn = new Ext.Button({
            renderTo: this.el.child("td.x-datetime-button", true),
            text: this.sureText,
            handler: this.sureClick,
            scope: this
        });
        
        this.hourField = new Ext.ux.form.SpinnerField({
            renderTo: this.el.child("td.y-hour-middle", true),
            width: 40,
            minValue: 0,
            maxValue: 23,
            enableKeyEvents: true,
            value: dt1.getHours()
        });
        this.minuteField = new Ext.ux.form.SpinnerField({
            renderTo: this.el.child("td.y-minute-middle", true),
            width: 40,
            minValue: 0,
            maxValue: 59,
            value: dt1.getMinutes()
        });
        this.secondField = new Ext.ux.form.SpinnerField({
            renderTo: this.el.child("td.y-second-middle", true),
            width: 40,
            minValue: 0,
            maxValue: 59,
            value: 0
        });

        if(Ext.isIE){
            this.el.repaint();
        }
        this.update(this.value);
	},
	update : function(date){
		if(this.rendered){
	        var vd = this.activeDate;
	        this.activeDate = date;
	        if(vd && this.el){
	            var t = date.getTime();
	            if(vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear()){
	                this.cells.removeClass("x-date-selected");
	                this.cells.each(function(c){
	                   if(c.dom.firstChild.dateValue == t){
	                       c.addClass("x-date-selected");
	                       return false;
	                   }
	                });
	                return;
	            }
	        }
	        var days = date.getDaysInMonth();
	        var firstOfMonth = date.getFirstDateOfMonth();
	        var startingPos = firstOfMonth.getDay()-this.startDay;
	
	        if(startingPos <= this.startDay){
	            startingPos += 7;
	        }
	
	        var pm = date.add("mo", -1);
	        var prevStart = pm.getDaysInMonth()-startingPos;
	
	        var cells = this.cells.elements;
	        var textEls = this.textNodes;
	        days += startingPos;
	
	        // convert everything to numbers so it's fast
	        var day = 86400000;
	        var d = (new Date(pm.getFullYear(), pm.getMonth(), prevStart)).clearTime();
	        var today = new Date().clearTime().getTime();
	        var sel = date.getTime();
	        var min = this.minDate ? this.minDate.clearTime() : Number.NEGATIVE_INFINITY;
	        var max = this.maxDate ? this.maxDate.clearTime() : Number.POSITIVE_INFINITY;
	        var ddMatch = this.disabledDatesRE;
	        var ddText = this.disabledDatesText;
	        var ddays = this.disabledDays ? this.disabledDays.join("") : false;
	        var ddaysText = this.disabledDaysText;
	        var format = this.format;
	
	        var setCellClass = function(cal, cell){
	            cell.title = "";
	            var t = d.getTime();
	            cell.firstChild.dateValue = t;
	            if(t == today){
	                cell.className += " x-date-today";
	                cell.title = cal.todayText;
	            }
	            if(t == sel){
	                cell.className += " x-date-selected";
	                setTimeout(function(){
	                    try{cell.firstChild.focus();}catch(e){}
	                }, 50);
	            }
	            // disabling
	            if(t < min) {
	                cell.className = " x-date-disabled";
	                cell.title = cal.minText;
	                return;
	            }
	            if(t > max) {
	                cell.className = " x-date-disabled";
	                cell.title = cal.maxText;
	                return;
	            }
	            if(ddays){
	                if(ddays.indexOf(d.getDay()) != -1){
	                    cell.title = ddaysText;
	                    cell.className = " x-date-disabled";
	                }
	            }
	            if(ddMatch && format){
	                var fvalue = d.dateFormat(format);
	                if(ddMatch.test(fvalue)){
	                    cell.title = ddText.replace("%0", fvalue);
	                    cell.className = " x-date-disabled";
	                }
	            }
	        };
	
	        var i = 0;
	        for(; i < startingPos; i++) {
	            textEls[i].innerHTML = (++prevStart);
	            d.setDate(d.getDate()+1);
	            cells[i].className = "x-date-prevday";
	            setCellClass(this, cells[i]);
	        }
	        for(; i < days; i++){
	            intDay = i - startingPos + 1;
	            textEls[i].innerHTML = (intDay);
	            d.setDate(d.getDate()+1);
	            cells[i].className = "x-date-active";
	            setCellClass(this, cells[i]);
	        }
	        var extraDays = 0;
	        for(; i < 42; i++) {
	             textEls[i].innerHTML = (++extraDays);
	             d.setDate(d.getDate()+1);
	             cells[i].className = "x-date-nextday";
	             setCellClass(this, cells[i]);
	        }
	
	        this.mbtn.setText(this.monthNames[date.getMonth()] + " " + date.getFullYear());
	
	        this.updateTime();
	
	        if(!this.internalRender){
	            var main = this.el.dom.firstChild;
	            var w = main.offsetWidth;
	            this.el.setWidth(w + this.el.getBorderWidth("lr"));
	            Ext.fly(main).setWidth(w);
	            this.internalRender = true;
	            if(Ext.isOpera && !this.secondPass){
	                main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth+main.rows[0].cells[2].offsetWidth)) + "px";
	                this.secondPass = true;
	                this.update.defer(10, this, [date]);
	            }
	        }
		}
	},
	updateTime: function() {
		this.hourField.setValue(this.value.getHours());
		this.minuteField.setValue(this.value.getMinutes());
		this.secondField.setValue(this.value.getSeconds());
	},
	setValue: function(v) {
		this.value = v;
		this.update(this.value);
	},
	getValue: function(v) {
		var h = parseInt(this.theHours+'');
		var m = parseInt(this.theMinutes+'');
		var s = parseInt(this.theSeconds+'');
		this.value.setHours(h);
		this.value.setMinutes(m);
		this.value.setSeconds(s);
		
		return this.value;
	}
});

Ext.DatetimeMenu = Ext.extend(Ext.menu.Menu, {
    enableScrolling : false,
    hideOnClick : true,
    pickerId : null,
    cls : 'x-date-menu',
    initComponent : function(){
        this.on('beforeshow', this.onBeforeShow, this);
        if(this.strict = (Ext.isIE7 && Ext.isStrict)){
            this.on('show', this.onShow, this, {single: true, delay: 20});
        }
        Ext.apply(this, {
            plain: true,
            showSeparator: false,
            items: this.picker = new Ext.DatetimePicker(Ext.applyIf({
                internalRender: this.strict || !Ext.isIE,
                ctCls: 'x-menu-date-item',
                id: this.pickerId
            }, this.initialConfig))
        });
        this.picker.purgeListeners();
        Ext.DatetimeMenu.superclass.initComponent.call(this);
        this.relayEvents(this.picker, ['select']);
        this.on('show', this.picker.focus, this.picker);
        this.on('select', this.menuHide, this);
        if(this.handler){
            this.on('select', this.handler, this.scope || this);
        }
    },

    menuHide : function() {
        if(this.hideOnClick){
            this.hide(true);
        }
    },

    onBeforeShow : function(){
        if(this.picker){
            this.picker.hideMonthPicker(true);
        }
    },

    onShow : function(){
        var el = this.picker.getEl();
        el.setWidth(el.getWidth());
    }
});
Ext.reg('datetimemenu', Ext.DatetimeMenu);

Ext.DatetimeField = Ext.extend(Ext.form.DateField, {
	initComponent: function() {
		Ext.DatetimeField.superclass.initComponent.call(this);
	},
	safeParse : function(value, format) {
        if (/[gGhH]/.test(format.replace(/(\\.)/g, ''))) {
            return Date.parseDate(value, format);
        } else {
        	return Date.parseDate(value + ' ' + this.initTime, format + ' ' + this.initTimeFormat);
        }
    },
	onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new Ext.DatetimeMenu({
                hideOnClick: false,
                focusOnSelect: false
            });
        }
        this.onFocus();
        Ext.apply(this.menu.picker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.disabledDatesRE,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            showToday : this.showToday,
            startDay: this.startDay,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        this.menu.picker.setValue(this.getValue() || new Date());
        this.menu.show(this.el, "tl-bl?");
        this.menuEvents('on');
    }
});

Ext.reg('datetime', Ext.DatetimeField);