Ext.CreateMenuForm = Ext.extend(Ext.form.FormPanel, {
	
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
			xtype: 'checkbox',
			checked: true,
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
			handler: this.saveMenu
		}, {
			iconCls: 'delete',
			text : '返回',
			scope: this,
			handler: function() {
				var panel = Ext.getCmp('managerpanel');
				
				panel.getLayout().setActiveItem(Ext.getCmp('qxpanel'));
				
				panel.doLayout();
			}
		}];
		
		Ext.CreateMenuForm.superclass.initComponent.call(this);
	},

	saveMenu: function() {
		Ext.Ajax.request({
			url: contextPath + '/tbp/sysmanager/menu.do?method=save',
			params: {menuInfo: Ext.encode(this.getForm().getValues())},
			success: function (options, success, response) {
				var tree = Ext.getCmp('menuTree');
				var sm = tree.getSelectionModel();
	        	var node = sm.getSelectedNode();
	        	node.reload();
			},
			failure: function() {
	    		alert('菜单创建失败！');
	    	}
		});
	}
});