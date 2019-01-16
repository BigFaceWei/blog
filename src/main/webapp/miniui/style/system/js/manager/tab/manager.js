Ext.ManagerTab = function() {
	var _this = this;
	
	Ext.ManagerTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getUsergroupManager(),_this.getRoleManager(),_this.getProfessionManager(),_this.getBasicManager()]
    });
	
};

Ext.extend(Ext.ManagerTab, Ext.TabPanel, {
	
	getUsergroupManager: function() {
		if(! this.usergroupManager) {
			this.usergroupManager = new Ext.UsergroupManager();
		}
		return this.usergroupManager;
	},
	
	getRoleManager: function() {
		if(! this.roleManager) {
			this.roleManager = new Ext.RoleManager();
		}
		return this.roleManager;
	},
	
	getProfessionManager: function() {
		if(! this.professionManager) {
			this.professionManager = new Ext.ProfessionManager();
		}
		return this.professionManager;
	},
	
	getBasicManager: function() {
		if(! this.basicManager) {
			this.basicManager = new Ext.BasicManager();
		}
		return this.basicManager;
	}
});