/**
 * ��糧
 * @class Ext.FDcForm
 * @extends Ext.form.FormPanel
 */
Ext.FDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '��糧��Ϣ',
	labelWidth: 120,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	autoScroll : true,
	
	initComponent: function() {
	
		this.items = [{
			xtype : 'fieldset', title : "��һ��", autoHeight : true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '�糧ID', 		name: 'station_id', xtype : 'hidden'},
						{ fieldLabel: '������Ϣ',	name: 'enviproinfo', xtype : 'textfield'},   
						{ fieldLabel: '���ú��(t)',	name: 'hcoal'},
						{ fieldLabel: '����װ������(MW)',name: 'mpinstallcap', allowDecimals : false},    
						{ fieldLabel: '�˶�װ������(MW)',name: 'hdinstallcap', allowDecimals : false},
						{ fieldLabel: '����̨��(̨)',	name: 'maintransnum', allowDecimals : false},
						{ fieldLabel: '������������(MW)',name: 'mptrancap'} 
					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: 'ĸ�߽��߷�ʽ����',name: 'mlinesummary'},
						{ fieldLabel: 'ĸ�������',	name: 'mcpsummary'}, 
						{ fieldLabel: '������·����',	name: 'cxsummary'},   
						{ fieldLabel: '��¯̨��(̨)',	name: 'boilersnum', xtype : 'numberfield', allowDecimals : false},        
						{ fieldLabel: 'ú��',			name: 'coaltype'}]
				}]
			}]
		}];
		
		Ext.FDcForm.superclass.initComponent.call(this);
	},
	
	loadFDc: function(stationId, stationType) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=getStationExtend',
			method: 'GET',
			params: {stationId: stationId, stationType: stationType} 
		});
	}
	
});