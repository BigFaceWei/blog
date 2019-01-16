Ext.UsergroupAuthority = function() {
	var _this = this;
	
	Ext.UsergroupAuthority.superclass.constructor.call(this, {
		title: '菜单资源信息',
		layout: 'border',
		border: false,
		items: [_this.getUsergroupModulesTree(), _this.getUsergroupResourcesTree()]
    });
	
};

Ext.extend(Ext.UsergroupAuthority, Ext.Panel, {
	
	initComponent: function() {
		var _this = this;
		Ext.UsergroupAuthority.superclass.initComponent.call(this);
		_this.getUsergroupModulesTree().on('click', function(node, e) {
			_this.getUsergroupResourcesTree().loadResourcesByMenuId(_this.roleId, node.id);
		});
	},
	
	loadModuleAndResourceByRoleId: function(roleId, organGrade, areaNo) {
		this.roleId = roleId;
		this.getUsergroupModulesTree().loadModulesByRoleId(roleId, organGrade, areaNo);
		this.getUsergroupResourcesTree().setRootNode(new Ext.tree.TreeNode());
	},
	
	getUsergroupModulesTree: function() {
		if(! this.usergroupmodulestree) {
			this.usergroupmodulestree = new Ext.UsergroupModulesTree({
				title: '菜单信息',
				region: 'center',
				border: false
			});
		}
		return this.usergroupmodulestree;
	},
	
	getUsergroupResourcesTree: function() {
		if(! this.usergroupresourcestree) {
			this.usergroupresourcestree = new Ext.UsergroupResourcesTree({
				title: '资源信息',
				margins: '0 5 0 0',
				split: true,
				region: 'east',
				width: 400,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.usergroupresourcestree;
	}
	
});