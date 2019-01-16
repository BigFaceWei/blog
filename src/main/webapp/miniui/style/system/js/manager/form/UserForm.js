Ext.UserForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�û���Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		this.items = [{
			fieldLabel: '�û�ID',
			name: 'USERID',
			xtype: 'hidden'
		}, {
			fieldLabel: '��ԱID',
			name: 'EMPLOYEEID',
			xtype: 'hidden'
		}, {
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
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
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
        		Ext.MessageBox.alert('ϵͳ��Ϣ','�û��༭ʧ�ܣ�');
        	}
		});
		
    },
    
    deleteUser: function() {
    	var _this = this;
    	var user = this.getForm().getValues();
    	
    	if(!user.USERID || user.USERID == '') return;
    	
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ�����û���',
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
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ','�����������ʧ�ܣ�');
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
    }
});