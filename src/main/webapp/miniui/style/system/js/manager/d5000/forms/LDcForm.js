/**
 * 光伏发电站
 * @class Ext.DDcForm
 * @extends Ext.form.FormPanel
 */
Ext.LDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '光伏发电站',
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
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '电厂ID', name: 'station_id', xtype : 'hidden'},
						{ fieldLabel: '并网变电站名称', name: 'bwstationname'},
						{ fieldLabel: '并网电压等级(kV)', name: 'bwvoltage', xtype : 'combo', typeAhead : true, forceSelection:true,
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
						{ fieldLabel: '站内主变台数(台)', name: 'maintransnum', xtype : 'numberfield', allowDecimals : false},
						{ fieldLabel: '目前并网容量(MW)', name: 'bwcaplacity', xtype : 'numberfield'},
						{ fieldLabel: '设计装机明细', name: 'dissummary'},
						{ fieldLabel: '目前装机明细', name: 'zjsummary'}
					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : {width : 250},
					items : [
						{ fieldLabel: '逆变器类型', name: 'invertertype'},
						{ fieldLabel: '逆变器台数', name: 'inverternum', xtype : 'numberfield', allowDecimals : false},
						{ fieldLabel: '发电运行特殊需求',name: 'gensummary'},
						{ fieldLabel: '无功补偿容量(Mvar)',	name: 'wgequiptype', xtype : 'numberfield'},
						{ fieldLabel: '无功补偿设备类型',name: 'wgcaplacity'}
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