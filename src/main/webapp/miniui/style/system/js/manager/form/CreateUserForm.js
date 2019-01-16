Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget='side'; //��ʾ�ķ�ʽ

Ext.CreateUserForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�û���Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	defaultType : 'textfield',
	
	initComponent: function() {
		this.items = [{
			fieldLabel: '�û�ID',
			name: 'USERID',
			xtype: 'hidden'
		},{
			fieldLabel: '<font color="red">*</font>�û���',
			name: 'USERNAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: '�û�������Ϊ�գ�����д'
		}, {
			fieldLabel: '�û�����',
			name: 'USERALIAS',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '�ϼ���λ',
			name: 'ORGANID',
			xtype:'hidden'
		}, {
			fieldLabel: '<font color="red">*</font>��        ��',
			name: 'PASSWORD',
			inputType : 'password',
			id : 'pass1',
			allowBlank: false,
			width: 250,
			blankText: '���벻��Ϊ�գ�����д'
		}, {
			fieldLabel: '<font color="red">*</font>�ظ�����',
			name: 'REPASSWORD',
			inputType : 'password',
			id : 'pass2',
			allowBlank: false,
			vtype : 'password',
			width: 250,
			blankText: '���ٴ���������',
			vtypeText: '�������벻һ��',
			confirmTo: 'pass1'
		}, {
			fieldLabel: '�����绰',
			name: 'OFFICEPHONE',
			xtype:'textfield',
			regex: /(^[1][3-8]\\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
			vtypeText: '��ʽ�Ƿ�����ʽ�磺18770011125��0791-88888888',
			width: 250
		}, {
			fieldLabel: '�ƶ��绰',
			name: 'MOBILEPHONE',
			xtype:'numberfield',
			regex: /^[1][3-8]\d{9}$/,
			vtypeText: '��ʽ�Ƿ�����ʽ�磺15879003936',
			width: 250
		}, {
			fieldLabel: '��������',
			name: 'EMAILADDRESS',
			xtype:'textfield',
			regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			vtypeText: '��ʽ�Ƿ�����ʽ�磺example123@163.com',
			width: 250
		}, {
			fieldLabel: '��¼IP',
			name: 'IPADDRESS',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '��¼MAC',
			name: 'MACADDRESS',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '�Ƿ����Ա',
			name: 'ISADMIN',
			xtype:'checkbox',
			width: 250,
			inputValue: 1
		}, {
			fieldLabel: '�Ƿ�����',
			name: 'ISENABLED',
			xtype:'checkbox',
			checked: true,
			width: 250,
			inputValue: 1
		}, {
			fieldLabel: '��ע',
			name: 'REMARK',
			xtype:'textarea',
			width: 400,
			height: 100
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
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
		
		if(this.getForm().isValid()){//����ͻ��˵���֤ͨ���򷵻���  
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/user.do?method=save',
				params: {userInfo: Ext.encode(this.getForm().getValues())},
				success: function (response, opts) {
					var userId = formReply(response);
					if(userId == "false") {
						Ext.Msg.alert('ϵͳ��ʾ','���û����Ѿ����ڣ�');
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
	        		alert('�û�����ʧ�ܣ�');
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