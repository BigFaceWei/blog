Ext.ResetPasswordForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '�������',
	labelWidth: 70,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		var _this = this;
	
		this.items = [{
			xtype: 'hidden',
			name: 'USERID',
			width: 180
		}, /*{
			xtype: 'textfield',
			inputType : 'password',
			fieldLabel: '<font color="red">*</font>ԭ����',
			name: 'oldPassword',
			width: 180,
			allowBlank: false,
			blankText: '���ٴ���������'
		}, */{
			xtype: 'textfield',
			fieldLabel: '<font color="red">*</font>������',
			name: 'newPassword1',
			inputType : 'password',
			//id : 'pass1',
			allowBlank: false,
			width: 180,
			blankText: '���벻��Ϊ�գ�����д'
		}, {
			xtype: 'textfield',
			fieldLabel: '<font color="red">*</font>����ȷ��',
			name: 'newPassword2',
			inputType : 'password',
			//id : 'pass2',
			allowBlank: false,
			//vtype : 'password',
			width: 180,
			blankText: '���ٴ���������'//,
			//vtypeText: '�������벻һ��',
			//confirmTo: 'pass1'
		}, {
			xtype: 'button',
			style: {
				marginLeft: 78,
				marginTop: 10
			},
			width: 60,
			text: '����',
			scope: this,
			handler: this.changePassword
		}];
		
		this.tbar = [{
			tooltip: '<font color="red">������������롱���û���������Ϊ1</font>',
			text: '��������',
			scope: this,
			handler: this.resetPassword
		}];
		
		Ext.ResetPasswordForm.superclass.initComponent.call(this);
	},
	
	loadUser: function(userId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/user.do?method=get&userId=' + userId,
			method: 'GET'
		});
	},
	//�޸�����
	changePassword: function(){
		var _this = this;
		
		var values = this.getForm().getValues();
		if(values.newPassword1 != values.newPassword2) {
			Ext.MessageBox.alert('ϵͳ��Ϣ','������������벻һ�£����������룡');
			return;
		}
		
		Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/user.do?method=changePassword',
			params: {userPasswordInfo: Ext.encode(this.getForm().getValues())},
			success: function (response, opts) {
				if (response.responseText == 'success') {
					Ext.MessageBox.alert('ϵͳ��Ϣ', '�޸��û�����ɹ������μ������룡');
					_this.getForm().reset();
				}
    			if (response.responseText == 'failure') {
    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�û�ԭ���벻��ȷ��'); 
    			}
    		},
    		failure: function() {
    			Ext.MessageBox.alert('ϵͳ��Ϣ', '�޸��û�����ʧ�ܣ�'); 
        	}
		});
	},
	//��������
	resetPassword: function(){
    	var user = this.getForm().getValues();
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫ�����û�������',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/user.do?method=resetPassword&userId=' + user.USERID,
    					success: function (response, opts) {
    						if (response.responseText == '1') {
    							Ext.MessageBox.alert('ϵͳ��Ϣ', '�����û�����ɹ���');
    						}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', '�����û�����ʧ�ܣ�'); 
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
	}
});

/*
Ext.apply(Ext.form.VTypes,{
	password: function(val, field){
		if(field.confirmTo){
			var pwd = Ext.get(field.confirmTo);
			return (val==pwd.getValue());
		}
		return true;
	}
});*/