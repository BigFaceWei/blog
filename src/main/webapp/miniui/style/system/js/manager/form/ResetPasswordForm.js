Ext.ResetPasswordForm = Ext.extend(Ext.form.FormPanel, {
	
	title: '密码管理',
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
			fieldLabel: '<font color="red">*</font>原密码',
			name: 'oldPassword',
			width: 180,
			allowBlank: false,
			blankText: '请再次输入密码'
		}, */{
			xtype: 'textfield',
			fieldLabel: '<font color="red">*</font>新密码',
			name: 'newPassword1',
			inputType : 'password',
			//id : 'pass1',
			allowBlank: false,
			width: 180,
			blankText: '密码不能为空，请填写'
		}, {
			xtype: 'textfield',
			fieldLabel: '<font color="red">*</font>密码确认',
			name: 'newPassword2',
			inputType : 'password',
			//id : 'pass2',
			allowBlank: false,
			//vtype : 'password',
			width: 180,
			blankText: '请再次输入密码'//,
			//vtypeText: '两次密码不一致',
			//confirmTo: 'pass1'
		}, {
			xtype: 'button',
			style: {
				marginLeft: 78,
				marginTop: 10
			},
			width: 60,
			text: '保存',
			scope: this,
			handler: this.changePassword
		}];
		
		this.tbar = [{
			tooltip: '<font color="red">点击“重置密码”后，用户密码设置为1</font>',
			text: '重置密码',
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
	//修改密码
	changePassword: function(){
		var _this = this;
		
		var values = this.getForm().getValues();
		if(values.newPassword1 != values.newPassword2) {
			Ext.MessageBox.alert('系统消息','两次输入的密码不一致，请重新输入！');
			return;
		}
		
		Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/user.do?method=changePassword',
			params: {userPasswordInfo: Ext.encode(this.getForm().getValues())},
			success: function (response, opts) {
				if (response.responseText == 'success') {
					Ext.MessageBox.alert('系统消息', '修改用户密码成功，请牢记新密码！');
					_this.getForm().reset();
				}
    			if (response.responseText == 'failure') {
    				Ext.MessageBox.alert('系统消息', '用户原密码不正确！'); 
    			}
    		},
    		failure: function() {
    			Ext.MessageBox.alert('系统消息', '修改用户密码失败！'); 
        	}
		});
	},
	//重置密码
	resetPassword: function(){
    	var user = this.getForm().getValues();
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要重置用户密码吗？',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/user.do?method=resetPassword&userId=' + user.USERID,
    					success: function (response, opts) {
    						if (response.responseText == '1') {
    							Ext.MessageBox.alert('系统消息', '重置用户密码成功！');
    						}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('系统消息', '重置用户密码失败！'); 
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