Ext.NodeForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�ڵ���Ϣ',
	labelWidth: 60,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
	
		var store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/areano.do?method=listVirtualNodes',
		    fields: ['TYPEID','TYPENAME']  
		});
		store.load();
		
		this.items = [{
			fieldLabel: '�ڵ�ID',
			name: 'ORGANID',
			xtype: 'hidden'
		}, {
			fieldLabel: '�ڵ�����',
			name: 'ORGANNAME',
			xtype:'textfield',
			width: 250
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.saveOrgan
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.deleteOrgan
		}];
		
		Ext.NodeForm.superclass.initComponent.call(this);
	},
	
	loadOrgan: function(organId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/organ.do?method=get&organId=' + organId,
			method: 'GET'
		});
	},
	
    
	saveOrgan: function() {
		var _this = this;
		Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/organ.do?method=save',
			params: {organInfo: Ext.encode(this.getForm().getValues())},
			success: function (response, opts) {
				
    		},
    		failure: function() {
    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
        	}
		});
	}
		
});