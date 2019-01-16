Ext.MenuTab = function () {
	var _this = this;
	
	Ext.MenuTab.superclass.constructor.call(this,{
		activeTab: 1,
		plain: true,
		frame: true,
		items:[_this.getMenuForm(), _this.getMenuUserGroupGrant(), _this.getMenuUserGrant()]
	});
	
	this.on('tabchange', function(tabpanel, panel) {
		if(panel == _this.getMenuUserGroupGrant())
			_this.getMenuUserGroupGrant().loadMenuUserGroup(_this.menuId, _this.moduleId, _this.gradeId);
		if(panel == _this.getMenuUserGrant()) {
			_this.getMenuUserGrant().loadMenuUser(_this.menuId, _this.moduleId);	
			_this.hasLoad = 1;
		}
	});
	
};

Ext.extend(Ext.MenuTab, Ext.TabPanel, {
	
	init: function(menuId, moduleId, gradeId) {
		this.menuId = menuId;
		this.moduleId = moduleId;
		this.gradeId = gradeId;
		this.getMenuUserGroupGrant().loadMenuUserGroup(menuId, moduleId, gradeId);
		this.getMenuForm().loadMenu(menuId);
		
		if(this.hasLoad) this.getMenuUserGrant().loadMenuUser(menuId, moduleId);
	},
	
	getMenuForm: function() {
		if(! this.menuForm) {
			this.menuForm = new Ext.MenuForm();
		}
		return this.menuForm;
	},
	
	getMenuUserGroupGrant: function() {
		if(! this.menuUserGroupGrant) {
			this.menuUserGroupGrant = new Ext.MenuUserGroupGrant();
		}
		return this.menuUserGroupGrant;
	},
	
	getMenuUserGrant: function() {
		if(! this.menuUserGrant) {
			this.menuUserGrant = new Ext.MenuUserGrant();
		}
		return this.menuUserGrant;
	}
});