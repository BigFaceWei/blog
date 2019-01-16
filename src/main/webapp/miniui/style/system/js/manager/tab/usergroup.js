Ext.UsergroupTab = function() {
	var _this = this;
	
	Ext.UsergroupTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getUsergroupForm(), _this.getUsergroupUsersTree(), _this.getUsergroupAuthority()]
    });
	
};

Ext.extend(Ext.UsergroupTab, Ext.TabPanel, {
	
	init: function(roleId, organId, organGrade, areaNo) {
		this.getUsergroupForm().loadUsergroup(roleId);
		this.getUsergroupUsersTree().loadUsersAndGrantUsersByRoleId(roleId, organId, areaNo);
		this.getUsergroupAuthority().loadModuleAndResourceByRoleId(roleId, organGrade, areaNo);
	},
	
	getUsergroupForm: function() {
		if(! this.usergroupform) {
			this.usergroupform = new Ext.UsergroupFormNew();
		}
		return this.usergroupform;
	},
	
	getUsergroupUsersTree: function() {
		if(! this.usergroupuserstree) {
			this.usergroupuserstree = new Ext.UsergroupUsersAuthority();
		}
		return this.usergroupuserstree;
	},
	
	getUsergroupAuthority: function() {
		if(! this.usergroupauthority) {
			this.usergroupauthority = new Ext.UsergroupAuthority();
		}
		return this.usergroupauthority;
	}
});