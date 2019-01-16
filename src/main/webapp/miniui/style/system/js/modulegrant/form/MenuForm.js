Ext.MenuForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '菜单信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		var _this = this;
		this.items = [{
			fieldLabel: '菜单ID',
			name: 'MENUID',
			xtype: 'hidden'
		},{
			fieldLabel: '模块ID',
			name: 'MODULEID',
			xtype: 'hidden'
		},{
			fieldLabel: '<font color="red">*</font>菜单名称',
			name: 'MENUNAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: '用户名不能为空，请填写'
		}, {
			fieldLabel: '父菜单ID',
			name: 'PARENTID',
			xtype: 'hidden'
		}, {
			fieldLabel: '打开方式',
			hiddenName: 'OPENMODE',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        mode: 'local',
	        store: [['0', '框架内打开'], 
	            ['1', '新窗口打开']],
	            value: '0',
	        width: 250
		}, {
			fieldLabel: '级别',
			hiddenName: 'GRADEID',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        mode: 'local',
	        store: [[1, '国家级'], 
	                [2, '区域级'],
	        	    [3, '省级'],
	        	    [4, '地级'],
	        	    [5, '县级']],
	        width: 250
		}, {
			fieldLabel: 'URL地址',
			name: 'URL',
			xtype:'textfield',
			width: 500
		}, {
			fieldLabel: '叶节点',
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
			fieldLabel: '共享',
			name: 'ISSHARE',
			xtype:'checkbox',
			inputValue: 1
		}];
		
		this.tbar = [{
			iconCls: 'save',
			text : '保存',
			scope: this,
			handler: this.editMenu
		}, {
			iconCls: 'delete',
			text : '删除',
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
				Ext.MessageBox.alert('系统提示','菜单修改失败！');
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
    		title: '系统消息',
    		msg: '您确定要删除该菜单吗？',
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
    		    				Ext.MessageBox.alert('系统消息', '该菜单存在下级菜单，请先删除下级菜单！'); 
    		    			}
    					},
    					failure: function() {
    			    		Ext.MessageBox.alert('系统提示','菜单删除失败！');
    			    	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    			
    	});
	}
});