Ext.RoleTab = function() {
	var _this = this;
	
	Ext.RoleTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getRoleForm(), _this.getUsergroupUsersTree()]
    });
	
};

Ext.extend(Ext.RoleTab, Ext.TabPanel, {
	
	init: function(roleId, organId, organGrade, areaNo) {
		this.getRoleForm().loadUsergroup(roleId);
		this.getUsergroupUsersTree().loadUsersAndGrantUsersByRoleId(roleId, organId, areaNo);
	},
	
	getRoleForm: function() {
		if(! this.roleform) {
			//this.roleform = new Ext.RoleForm();
			this.roleform = new Ext.RoleFormNew();
		}
		return this.roleform;
	},
	
	getUsergroupUsersTree: function() {
		if(! this.usergroupuserstree) {
			this.usergroupuserstree = new Ext.UsergroupUsersAuthority();
		}
		return this.usergroupuserstree;
	}
	
});