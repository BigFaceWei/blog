/**
 * 核电站
 * @class Ext.NDcForm
 * @extends Ext.form.FormPanel
 */
Ext.NDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '核电站信息',
	labelWidth: 120,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	autoScroll : true,
	
	initComponent: function() {
	
		this.items = [{
			xtype : 'fieldset', title : "第一组", autoHeight : true, collapsible: true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '电厂ID', 		name : 'station_id', xtype : 'hidden'},
						{ fieldLabel: '铭牌装机容量(MW)', name : 'mpinstallcap', allowDecimals : false},
						{ fieldLabel: '核定装机容量(MW)', name : 'hdinstallcap', allowDecimals : false},
						{ fieldLabel: '主变台数(台)', name : 'maintransnum', allowDecimals : false},
						{ fieldLabel: '铭牌主变容量(MW)', name: 'mptrancap'},
						{ fieldLabel: '机组进相深度',	name: 'jzdepth'}
					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '母线接线方式概述',name: 'mlinesummary'},
						{ fieldLabel: '正常接线方式概述',name: 'nlinesummary'},
						{ fieldLabel: '母差保护方式概述',name: 'mcpsummary'},
						{ fieldLabel: '出线线路概述',	name: 'cxsummary'}
					]
				}]
			}]
		}];
		
		Ext.NDcForm.superclass.initComponent.call(this);
	},
	
	loadNDc: function(stationId, stationType) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=getStationExtend',
			method: 'GET',
			params: {stationId: stationId, stationType: stationType} 
		});
	}
	
});