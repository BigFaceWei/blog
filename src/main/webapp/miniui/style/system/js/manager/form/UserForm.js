Ext.UserForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '用户信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		this.items = [{
			fieldLabel: '用户ID',
			name: 'USERID',
			xtype: 'hidden'
		}, {
			fieldLabel: '人员ID',
			name: 'EMPLOYEEID',
			xtype: 'hidden'
		}, {
			fieldLabel: '<font color="red">*</font>用户名',
			name: 'USERNAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: '用户名不能为空，请填写'
		}, {
			fieldLabel: '用户别名',
			name: 'USERALIAS',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '上级单位',
			name: 'ORGANID',
			xtype:'hidden'
		}, {
			fieldLabel: '工作电话',
			name: 'OFFICEPHONE',
			xtype:'textfield',
			regex: /(^[1][3-8]\\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
			vtypeText: '格式非法，格式如：18770011125或0791-88888888',
			width: 250
		}, {
			fieldLabel: '移动电话',
			name: 'MOBILEPHONE',
			xtype:'numberfield',
			regex: /^[1][3-8]\d{9}$/,
			vtypeText: '格式非法，格式如：15879003936',
			width: 250
		}, {
			fieldLabel: '电子邮箱',
			name: 'EMAILADDRESS',
			xtype:'textfield',
			regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			vtypeText: '格式非法，格式如：example123@163.com',
			width: 250
		}, {
			fieldLabel: '登录IP',
			name: 'IPADDRESS',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '登录MAC',
			name: 'MACADDRESS',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '是否管理员',
			name: 'ISADMIN',
			xtype:'checkbox',
			width: 250,
			inputValue: 1
		}, {
			fieldLabel: '是否启用',
			name: 'ISENABLED',
			xtype:'checkbox',
			width: 250,
			inputValue: 1
		}, {
			fieldLabel: '备注',
			name: 'REMARK',
			xtype:'textarea',
			width: 400,
			height: 100
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.saveUser
		}, {
			iconCls: 'delete',
			text : '删除',
			scope: this,
			handler: this.deleteUser
		}];
		
		Ext.UserForm.superclass.initComponent.call(this);
	},
	
	loadUser: function(userId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/user.do?method=get&userId=' + userId,
			method: 'GET'
		});
	},
	
	saveUser: function() {
		
		Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/user.do?method=save',
			params: {userInfo: Ext.encode(this.getForm().getValues())},
			success: function (response, opts) {
				var tree = Ext.getCmp('navigation-tree');
    			var sm = tree.getSelectionModel();
            	var node = sm.getSelectedNode();
				
				var pNode110 = node.parentNode;
            	
				pNode110.parentNode.reload(function(n) {
            		var allUserNode = n.findChild('organtype', 110);
            		allUserNode.expand();
            		
            		var fNode = allUserNode.findChild('id', node.id);
        			if(fNode) {
        				fNode.fireEvent('click', fNode);
        			}
            		
            		tree.getLayoutTarget().scroll('b', 60);
        		});
				
				
    		},
    		failure: function() {
        		Ext.MessageBox.alert('系统消息','用户编辑失败！');
        	}
		});
		
    },
    
    deleteUser: function() {
    	var _this = this;
    	var user = this.getForm().getValues();
    	
    	if(!user.USERID || user.USERID == '') return;
    	
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该用户吗？',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/user.do?method=delete&userId=' + user.USERID,
    					success: function (response, opts) {
    		    			var tree = Ext.getCmp('navigation-tree');
    		    			var sm = tree.getSelectionModel();
    		            	var node = sm.getSelectedNode();
    		            	
    		            	
    		            	node.parentNode.parentNode.reload(function(n) {
    		            		var allUserNode = n.findChild('organtype', 110);
    		            		if(allUserNode)
    		            			allUserNode.expand();
    		            	});
    		            	
    		            	_this.getForm().reset();
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('系统消息','与服务器交互失败！');
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
    }
});