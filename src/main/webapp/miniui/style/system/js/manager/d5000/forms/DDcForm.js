/**
 * ��ˮ���ܵ�վ
 * @class Ext.DDcForm
 * @extends Ext.form.FormPanel
 */
Ext.DDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '��ˮ���ܵ�վ',
	labelWidth: 120,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	autoScroll : true,
	
	initComponent: function() {
	
		this.items = [{
			xtype : 'fieldset', title : "��һ��", autoHeight : true, collapsible: true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '�糧ID',		name: 'station_id', xtype : 'hidden'}, 
						{ fieldLabel: '��ˮ��',		name: 'ureservoir', allowDecimals : false}, 
						{ fieldLabel: '��ˮ��',		name: 'dreservoir', allowDecimals : false}, 
						{ fieldLabel: '�������̨��(̨)',name: 'machinenum', allowDecimals : false}, 
						{ fieldLabel: '��������',	name: 'caplacitygs', xtype : 'textfield'}, 
						{ fieldLabel: '��С����(MW)',	name: 'minpower'}, 
						{ fieldLabel: '������(MW)',	name: 'maxpower'}
					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '����ƽ��������(MWh)',	name: 'avggenerating'},  
						{ fieldLabel: '����ƽ����ˮ��(m3)',	name: 'avgdraw'},  
						{ fieldLabel: '�鷢Ч�ʱ�(%)',		name: 'drawrate', allowDecimals : false, minValue : 1, maxValue : 100},  
						{ fieldLabel: '��ˮ�����ˮλ(m)',	name: 'uplevel'},  
						{ fieldLabel: '��ˮ����ˮλ(m)',	name: 'updlevel'},  
						{ fieldLabel: '��ˮ�����ˮλ(m)',	name: 'downlevel'},  
						{ fieldLabel: '��ˮ����ˮλ(m)',	name: 'downdlevel'}
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