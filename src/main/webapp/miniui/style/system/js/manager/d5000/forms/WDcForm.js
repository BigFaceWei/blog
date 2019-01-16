/**
 * 水电厂
 * @class Ext.WDcForm
 * @extends Ext.form.FormPanel
 */
Ext.WDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '水电厂信息',
	labelWidth: 120,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	autoScroll : true,
	//frame: true,
	
	initComponent: function() {
	
		this.items = [{
			xtype : 'fieldset', title : "第一组", autoHeight : true, collapsible: true,
    		items : [{
    			layout: "column", border: false, 
    			items : [{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
    					{ fieldLabel: '电厂ID',  name: 'station_id', xtype : 'hidden'},
    					{ fieldLabel: '水库名称', 	name: 'reservoirname', xtype: 'textfield'/*allowDecimals : false*/}, 
    					{ fieldLabel: '所在河流', 	name: 'belongrevers' , xtype : 'textfield'},
    					{ fieldLabel: '坝址以上流域面积(km2)', name : 'uparea' },
    					{ fieldLabel: '多年平均流量(m3/s)', name: 'avgflux' }
    				]   
    			},{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
	    				{ fieldLabel: '设计入库洪水流量(m3/s)', name: 'disinflux'},
						{ fieldLabel: '设计入库洪水频率', name: 'disinrate' },				
						{ fieldLabel: '校核入库洪水流量(m3/s)', name: 'checkinflux' },					
						{ fieldLabel: '校核入库洪水频率', name: 'checkinrate' }
    				]   
    			}]
    		}]
	    },{
	    	xtype : 'fieldset', title : "第二组", autoHeight : true, collapsible: true,
	    	items : [{
	    		layout: "column", border: false,
	    		items : [{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
    					{ fieldLabel: '校核洪水位(m)', name: 'chewaterlevel' },              
						{ fieldLabel: '设计洪水位(m)', name: 'diswaterlevel' },
						{ fieldLabel: '正常蓄水位(m)', name: 'waterlevel' },              
						{ fieldLabel: '防洪高水位(m)', name: 'hwaterlevel' },              
						{ fieldLabel: '汛期限制水位(m)', name: 'lwaterlevel' },              
						{ fieldLabel: '死水位(m)',     name: 'dwaterlevel' }
    				]   
    			},{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
    					{ fieldLabel: '总库容(m3)', name: 'allcaplacity' },
    					{ fieldLabel: '正常蓄水位下库容(m3)', name: 'wlcaplacity' },
    					{ fieldLabel: '正常蓄水位下水库面积(m3)', name: 'wlarea' },
    					{ fieldLabel: '调洪库容(m3)', name: 'thcaplacity' },
    					{ fieldLabel: '调节库容(m3)', name: 'tjcaplacity' },
    					{ fieldLabel: '死库容(m3)', name: 'dcaplacity' }
    				]   
    			}]
	    	}]
	    },{
	    	xtype : 'fieldset', title : "第三组", autoHeight : true, collapsible: true,
	    	items : [{
	    		layout: "column", border: false,
	    		items : [{
		    		layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '水库调节性能', name: 'reservoirfunction', xtype : 'textfield' },              
						{ fieldLabel: '保证出力(MW)',     name: 'outputpower' },              
						{ fieldLabel: '多年平均年发电量(MWh)', name: 'avggenerating' },              
						{ fieldLabel: '综合出力系数K', name: 'outputk'}
					]   
	    		},{
	    			layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '坝型',		name: 'damtype', xtype : 'textfield' },
						{ fieldLabel: '坝顶高程(m)',	name: 'damh' },              
						{ fieldLabel: '最大坝高',	name: 'damzh' },              
						{ fieldLabel: '尾水平台高程(m)',name: 'damlh' },              
						{ fieldLabel: '泄流设备名称',name: 'xequip', xtype : 'textfield' }
	    			]   
    			}]
			}]
	    },{
	    	xtype : 'fieldset', title : "第四组", autoHeight : true, collapsible: true,
	    	items : [{
	    		layout: "column", border: false,
	    		items : [{
	    			layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
	    			items : [
	    				{ fieldLabel: '孔口尺寸(m)',	name: 'ksize', xtype : 'textfield' },
						{ fieldLabel: '底坎高程(m)',	name: 'footh' },              
						{ fieldLabel: '孔数(个)', 		name: 'knumber', allowDecimals : false },              
						{ fieldLabel: '孔口部位',	name: 'karea', xtype : 'textfield' }              
	    			]
	    		},{
	    			layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
	    			items : [
	    				{ fieldLabel: '单孔最大流量(m3/s)',name: 'dkcaplacity' },   
						{ fieldLabel: '闸门型式', name: 'gatetype', xtype : 'textfield' },
						{ fieldLabel: '全厂最大下泄流量(m3/s)', name: 'hxinflux' }
	    			]
	    		}]
	    	}]
	    }],
	    	
		Ext.WDcForm.superclass.initComponent.call(this);
	},
	
	loadWDc: function(stationId, stationType) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=getStationExtend',
			method: 'GET',
			params: {stationId: stationId, stationType: stationType} 
		});
	}
	
});