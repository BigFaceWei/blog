/**
 * 风电厂
 * @class Ext.DDcForm
 * @extends Ext.form.FormPanel
 */
Ext.WindDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '风电厂信息',
	labelWidth: 120,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	autoScroll : true,
	
	initComponent: function() {
	
		this.items = [{
			xtype : 'fieldset', title : "第一组", autoHeight : true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '电厂ID',			name: 'station_id', xtype : 'hidden'},
						{ fieldLabel: '并网变电站名称',	name: 'bwstationname', xtype : 'textfield'},
						{ fieldLabel: '并网电压等级',	name: 'bwvoltage', xtype : 'combo', typeAhead : true, forceSelection:true,
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
						{ fieldLabel: '场内主变台数(台)',name: 'maintransnum', allowDecimals : false},
						{ fieldLabel: '目前并网容量(MW)',name: 'bwcaplacity'},
						{ fieldLabel: '完全并网日期',	name: 'bwdate', xtype: 'datetime', format: 'Y-m-d'}

					]
				},{
					layout : "form", columnWidth: .5, defaultType : 'textfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '设计装机明细', name: 'dissummary'},
						{ fieldLabel: '目前装机明细', name: 'zjsummary'},
						{ fieldLabel: '设计装机台数', name: 'disnumber', xtype : 'numberfield', allowDecimals : false},
						{ fieldLabel: '无功补偿设备类型',name: 'wgequiptype', xtype : 'combo', typeAhead : true, forceSelection:true,
							store : [
								['1', '固定补偿'],
								['2', 'TCR型SVC'],
								['3', 'MCR型SVC'],
								['4', 'SVG'],
								['5', '其他']
							]
						},
						{ fieldLabel: '无功补偿容量(MW)',name: 'wgcaplacity', xtype : 'numberfield'},
						{ fieldLabel: '发电运行特殊需求',name: 'gensummary'}
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