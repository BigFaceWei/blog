/**
 * ��糧
 * @class Ext.DDcForm
 * @extends Ext.form.FormPanel
 */
Ext.WindDcForm = Ext.extend(Ext.form.FormPanel, {
	
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
					layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '�糧ID',			name: 'station_id', xtype : 'hidden'},
						{ fieldLabel: '�������վ����',	name: 'bwstationname', xtype : 'textfield'},
						{ fieldLabel: '������ѹ�ȼ�',	name: 'bwvoltage', xtype : 'combo', typeAhead : true, forceSelection:true,
							store : [
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
						{ fieldLabel: '��������̨��(̨)',name: 'maintransnum', allowDecimals : false},
						{ fieldLabel: 'Ŀǰ��������(MW)',name: 'bwcaplacity'},
						{ fieldLabel: '��ȫ��������',	name: 'bwdate', xtype: 'datetime', format: 'Y-m-d'}

					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '���װ����ϸ', name: 'dissummary'},
						{ fieldLabel: 'Ŀǰװ����ϸ', name: 'zjsummary'},
						{ fieldLabel: '���װ��̨��', name: 'disnumber', xtype : 'numberfield', allowDecimals : false},
						{ fieldLabel: '�޹������豸����',name: 'wgequiptype', xtype : 'combo', typeAhead : true, forceSelection:true,
							store : [
								['1', '�̶�����'],
								['2', 'TCR��SVC'],
								['3', 'MCR��SVC'],
								['4', 'SVG'],
								['5', '����']
							]
						},
						{ fieldLabel: '�޹���������(MW)',name: 'wgcaplacity', xtype : 'numberfield'},
						{ fieldLabel: '����������������',name: 'gensummary'}
					]
				}]
			}]
		}];
		
		Ext.WindDcForm.superclass.initComponent.call(this);
	},
	
	loadWindDc: function(stationId, stationType) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=getStationExtend',
			method: 'GET',
			params: {stationId: stationId, stationType: stationType} 
		});
	}
	
});