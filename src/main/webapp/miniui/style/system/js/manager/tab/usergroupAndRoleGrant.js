Ext.UserGroupAndRoleGrantTab = function() {
	var _this = this;
	
	Ext.UserGroupAndRoleGrantTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getUsergroupGrant(),_this.getRoleGrant(),_this.getProfessionGrant()]
    });
	
};

Ext.extend(Ext.UserGroupAndRoleGrantTab, Ext.TabPanel, {
	
	init: function(organGrade, organId, areaNo) {
		this.getUsergroupGrant().loadUsergroupTree(organGrade, organId, areaNo);
		this.getProfessionGrant().loadProfessionGrantTree(organGrade, organId);
		//this.getRoleGrant().init(organGrade);
		this.getRoleGrant().loadRoleTree(organGrade, organId, areaNo);
	},
	
	getUsergroupGrant: function() {
		if(! this.usergroupGrant) {
			this.usergroupGrant = new Ext.UsergroupGrant();
		}
		return this.usergroupGrant;
	},
	
	getRoleGrant: function() {
		if(! this.roleGrant) {
			this.roleGrant = new Ext.RoleGrant();
		}
		return this.roleGrant;
	},
	
	getProfessionGrant: function() {
		if(! this.professionGrant) {
			this.professionGrant = new Ext.ProfessionGrant();
		}
		return this.professionGrant;
	}
});