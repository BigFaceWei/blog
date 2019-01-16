/**
 * �˵�վ
 * @class Ext.NDcForm
 * @extends Ext.form.FormPanel
 */
Ext.NDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�˵�վ��Ϣ',
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
						{ fieldLabel: '�糧ID', 		name : 'station_id', xtype : 'hidden'},
						{ fieldLabel: '����װ������(MW)', name : 'mpinstallcap', allowDecimals : false},
						{ fieldLabel: '�˶�װ������(MW)', name : 'hdinstallcap', allowDecimals : false},
						{ fieldLabel: '����̨��(̨)', name : 'maintransnum', allowDecimals : false},
						{ fieldLabel: '������������(MW)', name: 'mptrancap'},
						{ fieldLabel: '����������',	name: 'jzdepth'}
					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: 'ĸ�߽��߷�ʽ����',name: 'mlinesummary'},
						{ fieldLabel: '�������߷�ʽ����',name: 'nlinesummary'},
						{ fieldLabel: 'ĸ�����ʽ����',name: 'mcpsummary'},
						{ fieldLabel: '������·����',	name: 'cxsummary'}
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