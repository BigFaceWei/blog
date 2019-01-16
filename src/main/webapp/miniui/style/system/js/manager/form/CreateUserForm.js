Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget='side'; //提示的方式

Ext.CreateUserForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '用户信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	defaultType : 'textfield',
	
	initComponent: function() {
		this.items = [{
			fieldLabel: '用户ID',
			name: 'USERID',
			xtype: 'hidden'
		},{
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
			fieldLabel: '<font color="red">*</font>密        码',
			name: 'PASSWORD',
			inputType : 'password',
			id : 'pass1',
			allowBlank: false,
			width: 250,
			blankText: '密码不能为空，请填写'
		}, {
			fieldLabel: '<font color="red">*</font>重复密码',
			name: 'REPASSWORD',
			inputType : 'password',
			id : 'pass2',
			allowBlank: false,
			vtype : 'password',
			width: 250,
			blankText: '请再次输入密码',
			vtypeText: '两次密码不一致',
			confirmTo: 'pass1'
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
			checked: true,
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
		}];
		
		Ext.CreateUserForm.superclass.initComponent.call(this);
	},
	
	loadUser: function(userId) {
		this.getForm.reset();
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/user.do?method=get&userId=' + userId,
			method: 'GET'
		});
	},
	
	saveUser: function() {
		
		if(this.getForm().isValid()){//如果客户端的验证通过则返回真  
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/user.do?method=save',
				params: {userInfo: Ext.encode(this.getForm().getValues())},
				success: function (response, opts) {
					var userId = formReply(response);
					if(userId == "false") {
						Ext.Msg.alert('系统提示','此用户名已经存在！');
						return;
					}
					
	    			var tree = Ext.getCmp('navigation-tree');
	    			var sm = tree.getSelectionModel();
	            	var node = sm.getSelectedNode();
	            	
	            	var organNode = node;
	            	if(node.attributes.organtype && node.attributes.organtype == 110)
	            		organNode = node.parentNode;
	            		
	            	organNode.reload(function(n) {
		    			var allUserNode = n.findChild('organtype', 110);
		    			allUserNode.expand();
		    			
		    			var _selectedNode = allUserNode.findChild('id', userId);
		    			
		    			if(_selectedNode && _selectedNode != null) {
		    				
		    				_selectedNode.fireEvent('click', _selectedNode);
			    			tree.getLayoutTarget().scroll('b', 60);
		    			
		    			}
		    			
	            	});
	    		},
	    		failure: function() {
	        		alert('用户创建失败！');
	        	}
			});
	    }
	}
});

Ext.apply(Ext.form.VTypes,{
	password: function(val, field){
		if(field.confirmTo){
			var pwd = Ext.get(field.confirmTo);
			return (val==pwd.getValue());
		}
		return true;
	}
});