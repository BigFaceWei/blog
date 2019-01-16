/**
 * �������վ
 * @class Ext.DDcForm
 * @extends Ext.form.FormPanel
 */
Ext.LDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�������վ',
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
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '�糧ID', name: 'station_id', xtype : 'hidden'},
						{ fieldLabel: '�������վ����', name: 'bwstationname'},
						{ fieldLabel: '������ѹ�ȼ�(kV)', name: 'bwvoltage', xtype : 'combo', typeAhead : true, forceSelection:true,
							store: [
									['1000', '1000kV'], 
									['800', '800kV'],
									['750', '750kV'], 
									['500', '500kV'],
									['330', '330kV'], 
									['220', '220kV'],
									['110', '110kV'], 
									['65', '65kV'],
									['35', '35kV'], 
									['20', '20kV'],
									['10', '10kV']
			        	   ]
						},
						{ fieldLabel: 'վ������̨��(̨)', name: 'maintransnum', xtype : 'numberfield', allowDecimals : false},
						{ fieldLabel: 'Ŀǰ��������(MW)', name: 'bwcaplacity', xtype : 'numberfield'},
						{ fieldLabel: '���װ����ϸ', name: 'dissummary'},
						{ fieldLabel: 'Ŀǰװ����ϸ', name: 'zjsummary'}
					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '���������', name: 'invertertype'},
						{ fieldLabel: '�����̨��', name: 'inverternum', xtype : 'numberfield', allowDecimals : false},
						{ fieldLabel: '����������������',name: 'gensummary'},
						{ fieldLabel: '�޹���������(Mvar)',	name: 'wgequiptype', xtype : 'numberfield'},
						{ fieldLabel: '�޹������豸����',name: 'wgcaplacity'}
					]
				}]
			}]
		}];
		Ext.LDcForm.superclass.initComponent.call(this);
	},
	
	loadLDc: function(stationId, stationType) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=getStationExtend',
			method: 'GET',
			params: {stationId: stationId, stationType: stationType} 
		});
	}
	
});