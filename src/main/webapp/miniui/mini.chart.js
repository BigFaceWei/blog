mini.Chart = function () {
    mini.Chart.superclass.constructor.call(this);
    this.el.className += ' mini-chart';
}

mini.extend(mini.Chart, mini.ValidatorBase, {
    uiCls: "mini-chart",
    _InputType: "text",
    url : "",
    ajaxData : null,
    _attrs : null,
    
    _create: function () {
		this.el = document.createElement("span");
    },
    
    _doLoad: function (params) {
        try {
            var url = eval(this.url);
            if (url != undefined) {
                this.url = url;
            }
        } catch (e) { }
        var url = this.url;
        var ajaxMethod = "get";

//        var obj = mini._evalAjaxData(this.ajaxData, this);
//        mini.copyTo(params, obj);

        var e = {
            url: this.url,
            async: false,
            type: this.ajaxType ? this.ajaxType : ajaxMethod,
            data: params,
            params: params,
            cache: false,
            cancel: false
        };
        if (e.data != e.params && e.params != params) {
            e.data = e.params;
        }
        var sf = this;
        var url = e.url;
        mini.copyTo(e, {
            success: function (text) {
                var data = null;
                try {
                    data = mini.decode(text);
                } catch (ex) {
                    data = []
                    if (mini_debugger == true) {
                        alert(url + "\njson is error.");
                    }
                }
                if (sf.dataField) {
                    data = mini._getMap(sf.dataField, data);
                }
                if (!data) data = [];
                var ex = { data: data, cancel: false }
                sf.fire("preload", ex);
                if (ex.cancel == true) return;

                sf.setData(ex.data);

                sf.fire("load");

                setTimeout(function () {
                    sf.doLayout();
                }, 100);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                var e = {
                    xmlHttp: jqXHR,
                    errorMsg: jqXHR.responseText,
                    errorCode: jqXHR.status
                };
                if (mini_debugger == true) {
                    alert(url + "\n" + e.errorCode + "\n" + e.errorMsg);
                }
                sf.fire("loaderror", e);
            }
        });
        if (url.indexOf(".txt") != -1 || url.indexOf(".json") != -1 || url.indexOf(".xml") != -1) {
        	this.ajaxData = mini.ajax(e).responseText;
        } else {
        	this.ajaxData= eval("(" + mini.ajax(e).responseText +")");
        }
        return this.ajaxData;
    },
    
    setUrl: function (value) {
   	    this.url = value;
    },
    
    getUrl: function () {
        return this.url;
    }, 
    
    setAttrs: function (value) {
   	    this._attrs = value;
    },
    
    getAttrs: function () {
        return this._attrs;
    },
    
    setAjaxData: function (value) {
   	    this.ajaxData = value;
    },
    
    getAjaxData: function () {
        return this.ajaxData;
    }, 
    
    getAttrs: function (el) {
        var attrs = mini.Chart.superclass.getAttrs.call(this, el);

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    var strXML = ""; 
   	    var attrs = "";
   	    $(this._attrs).each(function(i){      
 		    if($(this)[0].specified){
 		       attrs += $(this)[0].nodeName + "='" + $(this)[0].nodeValue + "' ";
 		    }
        });
    	strXML +="<chart " + attrs + ">"; 
   	    for(var i = 0; i < jsonData.length ; i++){
   	    	var name = jsonData[i].name = null ? "" : jsonData[i].name;
   	    	var color = jsonData[i].color = null ? "" : jsonData[i].color;
   	        strXML +="<set name='" + name + "' value='" + jsonData[i].value + "' color='" + color + "'/>"; 
   	    }
   	    strXML +="</chart>"; 
   	    return strXML;
    },
    
    createMultiXML : function (jsonData) {
   	    var strXML = ""; 
   	    var attrs = "";
   	    $(this._attrs).each(function(i){      
 		    if($(this)[0].specified){
 		       attrs += $(this)[0].nodeName + "='" + $(this)[0].nodeValue + "' ";
 		    }
        });
    	strXML +="<chart " + attrs + ">"; 
    	
   	    for(var i = 0; i < jsonData.length ; i++){
   	    	var name = jsonData[i].name = null ? "" : jsonData[i].name;
   	    	var color = jsonData[i].color = null ? "" : jsonData[i].color;
   	    	var dataSet = jsonData[i].dataset;
   	    	if(dataSet.length > 0 && i === 0){
   	    		strXML +="<categories>"; 
   	    		for(var j = 0; j < dataSet.length; j++){
   	    			strXML += "<category label='" + dataSet[j].name + "'/>";
   	    		}
   	    		strXML +="</categories>"; 
   	    	}
   	    	strXML +="<dataset seriesName='" + name + "' color='" + color + "'>"
   	    	for(var k = 0; k < dataSet.length; k++){
	    		strXML += "<set value='"+dataSet[k].value+"'/>";
	    	}
   	    	strXML +="</dataset>";
   	    }
   	    
   	    strXML +="</chart>"; 
   	    return strXML;
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
    	mini.Chart.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Chart, 'chart');

mini.Pie3D = function () {
	mini.Pie3D.superclass.constructor.call(this);
}

mini.extend(mini.Pie3D, mini.Chart, {
    uiCls: "mini-pie3d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart1 = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Pie3D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart1.setDataXML(jsonData); 
    	else
	        chart1.setDataXML(mini.Pie3D.superclass.createXML(jsonData));  
	    chart1.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Pie3D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Pie3D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Pie3D.superclass.setUrl(url);
    	this.ajaxData = mini.Pie3D.superclass._doLoad({});
    	this.initChart(this.id,this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Pie3D.superclass.setAttrs(el.attributes);
        var attrs = mini.Pie3D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Pie3D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Pie3D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Pie3D, 'pie3d');

mini.Pie2D = function () {
	mini.Pie2D.superclass.constructor.call(this);
}

mini.extend(mini.Pie2D, mini.Chart, {
    uiCls: "mini-pie2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Pie2D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.Pie2D.superclass.createXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Pie2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Pie2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Pie2D.superclass.setUrl(url);
    	this.ajaxData = mini.Pie2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Pie2D.superclass.setAttrs(el.attributes);
        var attrs = mini.Pie2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Pie2D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Pie2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Pie2D, 'pie2d');

mini.Column3D = function () {
	mini.Column3D.superclass.constructor.call(this);
}

mini.extend(mini.Column3D, mini.Chart, {
    uiCls: "mini-column3d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Column3D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.Column3D.superclass.createXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Column3D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Column3D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Column3D.superclass.setUrl(url);
    	this.ajaxData = mini.Column3D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Column3D.superclass.setAttrs(el.attributes);
        var attrs = mini.Column3D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Column3D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Column3D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Column3D, 'column3d');

mini.Column2D = function () {
	mini.Column2D.superclass.constructor.call(this);
}

mini.extend(mini.Column2D, mini.Chart, {
    uiCls: "mini-column2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Column2D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.Column2D.superclass.createXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Column2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Column2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Column2D.superclass.setUrl(url);
    	this.ajaxData = mini.Column2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Column2D.superclass.setAttrs(el.attributes);
        var attrs = mini.Column2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Column2D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Column2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Column2D, 'column2d');

mini.Line2D = function () {
	mini.Line2D.superclass.constructor.call(this);
}

mini.extend(mini.Line2D, mini.Chart, {
    uiCls: "mini-line2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Line.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.Line2D.superclass.createXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Line2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Line2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Line2D.superclass.setUrl(url);
    	this.ajaxData = mini.Line2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Line2D.superclass.setAttrs(el.attributes);
        var attrs = mini.Line2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Line2D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Line2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Line2D, 'line2d');

mini.Area2D = function () {
	mini.Area2D.superclass.constructor.call(this);
}

mini.extend(mini.Area2D, mini.Chart, {
    uiCls: "mini-area2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Area2D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.Area2D.superclass.createXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Area2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Area2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Area2D.superclass.setUrl(url);
    	this.ajaxData = mini.Area2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Area2D.superclass.setAttrs(el.attributes);
        var attrs = mini.Area2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Area2D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Area2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Area2D, 'area2d');

mini.Bar2D = function () {
	mini.Bar2D.superclass.constructor.call(this);
}

mini.extend(mini.Bar2D, mini.Chart, {
    uiCls: "mini-bar2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Bar2D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.Bar2D.superclass.createXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Bar2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Bar2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Bar2D.superclass.setUrl(url);
    	this.ajaxData = mini.Bar2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Bar2D.superclass.setAttrs(el.attributes);
        var attrs = mini.Bar2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Bar2D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Bar2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Bar2D, 'bar2d');

mini.Doughnut2D = function () {
	mini.Doughnut2D.superclass.constructor.call(this);
}

mini.extend(mini.Doughnut2D, mini.Chart, {
    uiCls: "mini-doughnut2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/Doughnut2D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.Doughnut2D.superclass.createXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.Doughnut2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.Doughnut2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.Doughnut2D.superclass.setUrl(url);
    	this.ajaxData = mini.Doughnut2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.Doughnut2D.superclass.setAttrs(el.attributes);
        var attrs = mini.Doughnut2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.Doughnut2D.superclass.createXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.Doughnut2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.Doughnut2D, 'doughnut2d');

mini.MSLine = function () {
	mini.MSLine.superclass.constructor.call(this);
}

mini.extend(mini.MSLine, mini.Chart, {
    uiCls: "mini-msline",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/MSLine.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.MSLine.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.MSLine.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.MSLine.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.MSLine.superclass.setUrl(url);
    	this.ajaxData = mini.MSLine.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.MSLine.superclass.setAttrs(el.attributes);
        var attrs = mini.MSLine.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.MSLine.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.MSLine.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.MSLine, 'msline');

mini.MSColumn2D = function () {
	mini.MSColumn2D.superclass.constructor.call(this);
}

mini.extend(mini.MSColumn2D, mini.Chart, {
    uiCls: "mini-mscolumn2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/MSColumn2D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.MSColumn2D.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.MSColumn2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.MSColumn2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.MSColumn2D.superclass.setUrl(url);
    	this.ajaxData = mini.MSColumn2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.MSColumn2D.superclass.setAttrs(el.attributes);
        var attrs = mini.MSColumn2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.MSColumn2D.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.MSColumn2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.MSColumn2D, 'mscolumn2d');

mini.MSColumn3D = function () {
	mini.MSColumn3D.superclass.constructor.call(this);
}

mini.extend(mini.MSColumn3D, mini.Chart, {
    uiCls: "mini-mscolumn3d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/MSColumn3D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.MSColumn3D.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.MSColumn3D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.MSColumn3D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.MSColumn3D.superclass.setUrl(url);
    	this.ajaxData = mini.MSColumn3D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.MSColumn3D.superclass.setAttrs(el.attributes);
        var attrs = mini.MSColumn3D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.MSColumn3D.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.MSColumn3D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.MSColumn3D, 'mscolumn3d');

mini.MSArea = function () {
	mini.MSArea.superclass.constructor.call(this);
}

mini.extend(mini.MSArea, mini.Chart, {
    uiCls: "mini-msarea",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/MSArea.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.MSArea.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.MSArea.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.MSArea.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.MSArea.superclass.setUrl(url);
    	this.ajaxData = mini.MSArea.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.MSArea.superclass.setAttrs(el.attributes);
        var attrs = mini.MSArea.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.MSArea.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.MSArea.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.MSArea, 'msarea');

mini.MSBar2D = function () {
	mini.MSBar2D.superclass.constructor.call(this);
}

mini.extend(mini.MSBar2D, mini.Chart, {
    uiCls: "mini-msbar2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/MSBar2D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.MSBar2D.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.MSBar2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.MSBar2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.MSBar2D.superclass.setUrl(url);
    	this.ajaxData = mini.MSBar2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.MSBar2D.superclass.setAttrs(el.attributes);
        var attrs = mini.MSBar2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.MSBar2D.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.MSBar2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.MSBar2D, 'msbar2d');

mini.MSBar3D = function () {
	mini.MSBar3D.superclass.constructor.call(this);
}

mini.extend(mini.MSBar3D, mini.Chart, {
    uiCls: "mini-msbar3d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width : 800,
    height : 600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/MSBar3D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.MSBar3D.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.MSBar3D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.MSBar3D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    },

    load: function (url) {
    	mini.MSBar3D.superclass.setUrl(url);
    	this.ajaxData = mini.MSBar3D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.MSBar3D.superclass.setAttrs(el.attributes);
        var attrs = mini.MSBar3D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.MSBar3D.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.MSBar3D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.MSBar3D, 'msbar3d');

mini.StackedColumn3D = function () {
	mini.StackedColumn3D.superclass.constructor.call(this);
}

mini.extend(mini.StackedColumn3D, mini.Chart, {
    uiCls: "mini-stackedcolumn3d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width:800,
    height:600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/StackedColumn3D.swf", "chart_"+id, this.width, this.height);  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.StackedColumn3D.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.StackedColumn3D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.StackedColumn3D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    }, 

    load: function (url) {
    	mini.StackedColumn3D.superclass.setUrl(url);
    	this.ajaxData = mini.StackedColumn3D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.StackedColumn3D.superclass.setAttrs(el.attributes);
        var attrs = mini.StackedColumn3D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.StackedColumn3D.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.StackedColumn3D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.StackedColumn3D, 'stackedcolumn3d');

mini.StackedColumn2D = function () {
	mini.StackedColumn2D.superclass.constructor.call(this);
}

mini.extend(mini.StackedColumn2D, mini.Chart, {
    uiCls: "mini-stackedcolumn2d",
    _InputType: "text",
    _attrs : null,
    url : "",
    ajaxData : null,
    width: 800,
    height:600,
    
    _create: function () {
		this.el = document.createElement("span");
    },

    initChart: function (id, jsonData) {
    	this.el.id = id;
    	var chart = new FusionCharts(getRootPath()+"/tbp/chart/FusionChartsXT/StackedColumn2D.swf", "chart_"+id, this.width, this.height, "0", "1");  
    	if (typeof jsonData == "string")
    		chart.setDataXML(jsonData); 
    	else
	        chart.setDataXML(mini.StackedColumn2D.superclass.createMultiXML(jsonData));  
	    chart.render(id); 
    },
    
    setUrl: function (value) {
    	mini.StackedColumn2D.superclass.setUrl(value);
   	    if(!(value === null || value === undefined)){
   	    	this.load(value);
   	    }
    },
    
    getUrl: function () {
        return mini.StackedColumn2D.superclass.getUrl();
    }, 
    
    setWidth: function (value) {
   	    this.width = value;
    },
    
    getWidth: function () {
        return this.width;
    }, 
    
    setHeight: function (value) {
   	    this.height = value;
    },
    
    getHeight: function () {
        return this.height;
    }, 

    load: function (url) {
    	mini.StackedColumn2D.superclass.setUrl(url);
    	this.ajaxData = mini.StackedColumn2D.superclass._doLoad({});
    	this.initChart(this.id, this.ajaxData);
    },
    
    getAttrs: function (el) {
    	mini.StackedColumn2D.superclass.setAttrs(el.attributes);
        var attrs = mini.StackedColumn2D.superclass.getAttrs.call(this, el);
        var jq = jQuery(el);

        mini._ParseString(el, attrs,
            ["width","height","url"]
        );

        return attrs;
    },
    
    createXML : function (jsonData) {
   	    return mini.StackedColumn2D.superclass.createMultiXML(jsonData);
    },
    
    destroy: function (removeEl) {
    	if(this._valueEl != null){
    		this._valueEl.destroy();
    	}
        mini.StackedColumn2D.superclass.destroy.call(this, removeEl);
    }
});
mini.regClass(mini.StackedColumn2D, 'stackedcolumn2d');




////////////////////////////////////////////////
//
//ͳһ����ͼ��
//
////////////////////////////////////////////////

mini.Eompechart = function () {
	mini.Eompechart.superclass.constructor.call(this);
}

mini.extend(mini.Eompechart, mini.Chart, {
 uiCls: "mini-eompechart",
 _InputType: "text",
 _attrs : null,
 url : "",
 ajaxData : null,
 width : 800,
 height : 600,
 titletext : "",
 resizeable : true,
 chart : null,
 values : null,
 
 _create: function () {
		this.el = document.createElement("div");
 },

 initChart: function (id) {
 	this.el.id = id;
 	chart = echarts.init(document.getElementById(id));  
     	setTimeout(function (){
 			window.onresize = function () {
 				chart.resize();
 			}
 		},200)	
 	$('#'+id).data('chartId',chart.id);
 	return chart;
 },
 
 setUrl: function (value) {
 	mini.Eompechart.superclass.setUrl(value);
	    if(!(value === null || value === undefined)){
	    	this.load(value);
	    }
 },
 
 getUrl: function () {
     return mini.Eompechart.superclass.getUrl();
 }, 
 
 setWidth: function (value) {
	    this.width = value;
 },
 
 getWidth: function () {
     return this.width;
 }, 
 
 setHeight: function (value) {
	    this.height = value;
 },
 
 getHeight: function () {
     return this.height;
 },
 
 setTitletext: function (value) {
 	this.titletext = value;
 },
 
 getTitletext: function () {
     return this.titletext;
 },
 
 setTitlesubtext: function (value) {
 	this.titlesubtext = value;
 },
 
 getTitlesubtext: function () {
     return this.titlesubtext;
 },
 
 
 setTitlexposition: function (value) {
 	this.titlexposition = value;
 },
 
 getTitlexposition: function () {
     return this.titlexposition;
 },
 
 
 setTitleyposition: function (value) {
 	this.titleyposition = value;
 },
 
 getTitleyposition: function () {
     return this.titleyposition;
 },
 
 
 setTitlelink: function (value) {
 	this.titlelink = value;
 },
 
 getTitlelink: function () {
     return this.titlelink;
 },
 
 setResizeable: function (value) {
     this.resizeable = value;
 },
 
 getResizeable: function () {
     return this.resizeable;
 },
 
 load: function (url) {
 	mini.Eompechart.superclass.setUrl(url);
 	this.ajaxData = mini.Eompechart.superclass._doLoad({});
 	this.initChart(this.id);
 	this.setOptionData();
 },
 
 
 setOptionData : function (){
 	this.setTitle();
 	chart.setOption(this.ajaxData); 
 },
 
 
 setTitle : function(){
 	if (values.titletext != null && values.titletext != undefined && values.titletext != ''){
 		this.ajaxData.title.text = values.titletext;}
		if (values.titlesubtext != null && values.titlesubtext != undefined && values.titlesubtext != ''){
			this.ajaxData.title.subtext = values.titlesubtext;}		
		if (values.titlexposition != null && values.titlexposition != undefined && values.titlexposition != ''){
			this.ajaxData.title.x = values.titlexposition;}
		if (values.titleyposition != null && values.titleyposition != undefined && values.titleyposition != ''){
			this.ajaxData.title.y = values.titleyposition;}
		if (values.titlelink != null && values.titlelink != undefined && values.titlelink != ''){
			this.ajaxData.title.link = values.titlelink;}
		
 },
 
 
 
 getAttrs: function (el) {
 	mini.Eompechart.superclass.setAttrs(el.attributes);
     var attrs = mini.Eompechart.superclass.getAttrs.call(this, el);
     var jq = jQuery(el);
     mini._ParseString(el, attrs,
         ["width","height","url","titletext","titlesubtext","titlexposition","titleyposition","titlelink"]
     );
     mini._ParseBool(el, attrs,
             ["resizeable"]
         );
     values = attrs;
     return attrs;
 },
 
 

 destroy: function (removeEl) {
 	if(this._valueEl != null){
 		this._valueEl.destroy();
 	}
     mini.Eompechart.superclass.destroy.call(this, removeEl);
 }
});
mini.regClass(mini.Eompechart, 'eompechart');

