/**
 * ˮ�糧
 * @class Ext.WDcForm
 * @extends Ext.form.FormPanel
 */
Ext.WDcForm = Ext.extend(Ext.form.FormPanel, {
	
	title : 'ˮ�糧��Ϣ',
	labelWidth: 120,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	autoScroll : true,
	//frame: true,
	
	initComponent: function() {
	
		this.items = [{
			xtype : 'fieldset', title : "��һ��", autoHeight : true, collapsible: true,
    		items : [{
    			layout: "column", border: false, 
    			items : [{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
    					{ fieldLabel: '�糧ID',  name: 'station_id', xtype : 'hidden'},
    					{ fieldLabel: 'ˮ������', 	name: 'reservoirname', xtype: 'textfield'/*allowDecimals : false*/}, 
    					{ fieldLabel: '���ں���', 	name: 'belongrevers' , xtype : 'textfield'},
    					{ fieldLabel: '��ַ�����������(km2)', name : 'uparea' },
    					{ fieldLabel: '����ƽ������(m3/s)', name: 'avgflux' }
    				]   
    			},{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
	    				{ fieldLabel: '�������ˮ����(m3/s)', name: 'disinflux'},
						{ fieldLabel: '�������ˮƵ��', name: 'disinrate' },				
						{ fieldLabel: 'У������ˮ����(m3/s)', name: 'checkinflux' },					
						{ fieldLabel: 'У������ˮƵ��', name: 'checkinrate' }
    				]   
    			}]
    		}]
	    },{
	    	xtype : 'fieldset', title : "�ڶ���", autoHeight : true, collapsible: true,
	    	items : [{
	    		layout: "column", border: false,
	    		items : [{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
    					{ fieldLabel: 'У�˺�ˮλ(m)', name: 'chewaterlevel' },              
						{ fieldLabel: '��ƺ�ˮλ(m)', name: 'diswaterlevel' },
						{ fieldLabel: '������ˮλ(m)', name: 'waterlevel' },              
						{ fieldLabel: '�����ˮλ(m)', name: 'hwaterlevel' },              
						{ fieldLabel: 'Ѵ������ˮλ(m)', name: 'lwaterlevel' },              
						{ fieldLabel: '��ˮλ(m)',     name: 'dwaterlevel' }
    				]   
    			},{
    				layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
    				items : [
    					{ fieldLabel: '�ܿ���(m3)', name: 'allcaplacity' },
    					{ fieldLabel: '������ˮλ�¿���(m3)', name: 'wlcaplacity' },
    					{ fieldLabel: '������ˮλ��ˮ�����(m3)', name: 'wlarea' },
    					{ fieldLabel: '�������(m3)', name: 'thcaplacity' },
    					{ fieldLabel: '���ڿ���(m3)', name: 'tjcaplacity' },
    					{ fieldLabel: '������(m3)', name: 'dcaplacity' }
    				]   
    			}]
	    	}]
	    },{
	    	xtype : 'fieldset', title : "������", autoHeight : true, collapsible: true,
	    	items : [{
	    		layout: "column", border: false,
	    		items : [{
		    		layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: 'ˮ���������', name: 'reservoirfunction', xtype : 'textfield' },              
						{ fieldLabel: '��֤����(MW)',     name: 'outputpower' },              
						{ fieldLabel: '����ƽ���귢����(MWh)', name: 'avggenerating' },              
						{ fieldLabel: '�ۺϳ���ϵ��K', name: 'outputk'}
					]   
	    		},{
	    			layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
					items : [
						{ fieldLabel: '����',		name: 'damtype', xtype : 'textfield' },
						{ fieldLabel: '�Ӷ��߳�(m)',	name: 'damh' },              
						{ fieldLabel: '���Ӹ�',	name: 'damzh' },              
						{ fieldLabel: 'βˮƽ̨�߳�(m)',name: 'damlh' },              
						{ fieldLabel: 'й���豸����',name: 'xequip', xtype : 'textfield' }
	    			]   
    			}]
			}]
	    },{
	    	xtype : 'fieldset', title : "������", autoHeight : true, collapsible: true,
	    	items : [{
	    		layout: "column", border: false,
	    		items : [{
	    			layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
	    			items : [
	    				{ fieldLabel: '�׿ڳߴ�(m)',	name: 'ksize', xtype : 'textfield' },
						{ fieldLabel: '�׿��߳�(m)',	name: 'footh' },              
						{ fieldLabel: '����(��)', 		name: 'knumber', allowDecimals : false },              
						{ fieldLabel: '�׿ڲ�λ',	name: 'karea', xtype : 'textfield' }              
	    			]
	    		},{
	    			layout : "form", columnWidth: .5, defaultType : 'numberfield', border: false, defaults : { width : 250},
	    			items : [
	    				{ fieldLabel: '�����������(m3/s)',name: 'dkcaplacity' },   
						{ fieldLabel: 'բ����ʽ', name: 'gatetype', xtype : 'textfield' },
						{ fieldLabel: 'ȫ�������й����(m3/s)', name: 'hxinflux' }
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