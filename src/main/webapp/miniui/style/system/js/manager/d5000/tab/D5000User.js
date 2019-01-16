Ext.D5000UserTab = function() {
	var _this = this;
	
	Ext.D5000UserTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getUserForm(), _this.getResetPasswordForm(), _this.getUserGroupTree(), _this.getUserAuthority()]
    });
    
    this.on('tabchange', function(self, panel) {
		if(panel == _this.getResetPasswordForm()) {
			panel.getForm().reset();
		}
	});
	
};

Ext.extend(Ext.D5000UserTab, Ext.TabPanel, {
	
	init: function(userId) {
		this.getUserForm().loadUser(userId);
		this.getUserGroupTree().loadGroupsByUserId(userId);
		this.getUserAuthority().loadModuleAndResourceByUserId(userId);
		this.getResetPasswordForm().loadUser(userId);
	},
	
	getUserForm: function() {
		if(! this.userform) {
			this.userform = new Ext.D5000UserForm();
			this.userform.getForm().findField('ISADMIN').setVisible(false);
		}
		return this.userform;
	},
	
	getUserGroupTree: function() {
		if(! this.usergrouptree) {
			this.usergrouptree = new Ext.UserGroupTree();
		}
		return this.usergrouptree;
	},
	
	getUserAuthority: function() {
		if(! this.userauthority) {
			this.userauthority = new Ext.UserAuthority();
		}
		return this.userauthority;
	},
	
	getResetPasswordForm: function() {
		if(! this.resetpwdform) {
			this.resetpwdform = new Ext.ResetPasswordForm();
		}
		return this.resetpwdform;
	}
	
});