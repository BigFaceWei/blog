/**
 * 抽水蓄能电站
 * @class Ext.DDcForm
 * @extends Ext.form.FormPanel
 */
Ext.DDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '抽水蓄能电站',
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
						{ fieldLabel: '电厂ID',		name: 'station_id', xtype : 'hidden'}, 
						{ fieldLabel: '上水库',		name: 'ureservoir', allowDecimals : false}, 
						{ fieldLabel: '下水库',		name: 'dreservoir', allowDecimals : false}, 
						{ fieldLabel: '抽蓄机组台数(台)',name: 'machinenum', allowDecimals : false}, 
						{ fieldLabel: '容量构成',	name: 'caplacitygs', xtype : 'textfield'}, 
						{ fieldLabel: '最小出力(MW)',	name: 'minpower'}, 
						{ fieldLabel: '最大出力(MW)',	name: 'maxpower'}
					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '多年平均发电量(MWh)',	name: 'avggenerating'},  
						{ fieldLabel: '多年平均抽水量(m3)',	name: 'avgdraw'},  
						{ fieldLabel: '抽发效率比(%)',		name: 'drawrate', allowDecimals : false, minValue : 1, maxValue : 100},  
						{ fieldLabel: '上水库最高水位(m)',	name: 'uplevel'},  
						{ fieldLabel: '上水库死水位(m)',	name: 'updlevel'},  
						{ fieldLabel: '下水库最高水位(m)',	name: 'downlevel'},  
						{ fieldLabel: '下水库死水位(m)',	name: 'downdlevel'}
					]
				}]
			}]
		}];
		
		Ext.DDcForm.superclass.initComponent.call(this);
	},
	
	loadDDc: function(stationId, stationType) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=getStationExtend',
			method: 'GET',
			params: {stationId: stationId, stationType: stationType} 
		});
	}
});