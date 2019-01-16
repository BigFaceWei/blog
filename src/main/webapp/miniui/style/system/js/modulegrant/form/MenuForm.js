Ext.MenuForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�˵���Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		var _this = this;
		this.items = [{
			fieldLabel: '�˵�ID',
			name: 'MENUID',
			xtype: 'hidden'
		},{
			fieldLabel: 'ģ��ID',
			name: 'MODULEID',
			xtype: 'hidden'
		},{
			fieldLabel: '<font color="red">*</font>�˵�����',
			name: 'MENUNAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: '�û�������Ϊ�գ�����д'
		}, {
			fieldLabel: '���˵�ID',
			name: 'PARENTID',
			xtype: 'hidden'
		}, {
			fieldLabel: '�򿪷�ʽ',
			hiddenName: 'OPENMODE',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        mode: 'local',
	        store: [['0', '����ڴ�'], 
	            ['1', '�´��ڴ�']],
	            value: '0',
	        width: 250
		}, {
			fieldLabel: '����',
			hiddenName: 'GRADEID',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        mode: 'local',
	        store: [[1, '���Ҽ�'], 
	                [2, '����'],
	        	    [3, 'ʡ��'],
	        	    [4, '�ؼ�'],
	        	    [5, '�ؼ�']],
	        width: 250
		}, {
			fieldLabel: 'URL��ַ',
			name: 'URL',
			xtype:'textfield',
			width: 500
		}, {
			fieldLabel: 'Ҷ�ڵ�',
			name: 'ISLEAF',
			xtype:'checkbox',
			inputValue: 1,
			listeners: {
				check: function(box, check){
					if (check) {
						_this.getForm().findField("OPENMODE").setReadOnly(false);
						_this.getForm().findField('OPENMODE').removeClass('x-field-gray');
						_this.getForm().findField("URL").setReadOnly(false);
						_this.getForm().findField('URL').removeClass('x-field-gray');
					} else {
						_this.getForm().findField("OPENMODE").setReadOnly(true);
						_this.getForm().findField('OPENMODE').addClass('x-field-gray');
						_this.getForm().findField("URL").setValue('');
						_this.getForm().findField("URL").setReadOnly(true);
						_this.getForm().findField('URL').addClass('x-field-gray');
					}
				}
			}
		}, {
			fieldLabel: '����',
			name: 'ISSHARE',
			xtype:'checkbox',
			inputValue: 1
		}];
		
		this.tbar = [{
			iconCls: 'save',
			text : '����',
			scope: this,
			handler: this.editMenu
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.deleteMenu
		}];
		
		Ext.MenuForm.superclass.initComponent.call(this);
	},
	
	loadMenu: function(menuId) {
		this.getForm().reset();
		this.getForm().load({
			url: contextPath + '/tbp/sysmanager/menu.do?method=get&menuId=' + menuId,
			method: 'GET'
		});
	},
	
	editMenu: function() {
		Ext.Ajax.request({
			url: contextPath + '/tbp/sysmanager/menu.do?method=save',
			params: {menuInfo: Ext.encode(this.getForm().getValues())},
			success: function (options, success, response) {
				var tree = Ext.getCmp('menuTree');
				var sm = tree.getSelectionModel();
	        	var node = sm.getSelectedNode();
	        	node.parentNode.reload();
			},
			failure: function() {
				Ext.MessageBox.alert('ϵͳ��ʾ','�˵��޸�ʧ�ܣ�');
	    	}
		});
	},
	
	deleteMenu: function() {
		var _this = this;
    	var menu = this.getForm().getValues();
    	var tree = Ext.getCmp('menuTree');
    	var sm = tree.getSelectionModel();
    	var node = sm.getSelectedNode();
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���ò˵���',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextPath + '/tbp/sysmanager/menu.do?method=delete&menuId=' + menu.MENUID + '&moduleId=' + menu.MODULEID + '',
    					success: function (response, opts) {
    						if (response.responseText == '1') {
    				        	node.parentNode.reload();
	    			        	_this.getForm().reset();
    						}
    			        	if (response.responseText == 'false') {
    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�ò˵������¼��˵�������ɾ���¼��˵���'); 
    		    			}
    					},
    					failure: function() {
    			    		Ext.MessageBox.alert('ϵͳ��ʾ','�˵�ɾ��ʧ�ܣ�');
    			    	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    			
    	});
	}
});