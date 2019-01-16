Ext.UserAuthority = function() {
	var _this = this;
	
	Ext.UserAuthority.superclass.constructor.call(this, {
		title: '菜单资源信息',
		layout: 'border',
		border: false,
		items: [_this.getUserModulesTree(), _this.getUserResourcesTree()]
    });
	
};

Ext.extend(Ext.UserAuthority, Ext.Panel, {
	
	initComponent: function() {
		var _this = this;
		Ext.UserAuthority.superclass.initComponent.call(this);
		_this.getUserModulesTree().on('click', function(node, e) {
			_this.getUserResourcesTree().loadResourcesByMenuId(_this.userId, node.id);
		});
	},
	
	loadModuleAndResourceByUserId: function(userId) {
		this.userId = userId;
		this.getUserModulesTree().loadModulesByUserId(userId);
		this.getUserResourcesTree().setRootNode(new Ext.tree.TreeNode());
	},
	
	getUserModulesTree: function() {
		if(! this.usermodulestree) {
			this.usermodulestree = new Ext.UserModulesTree({
				title: '菜单信息',
				region: 'center',
				border: false
			});
		}
		return this.usermodulestree;
	},
	
	getUserResourcesTree: function() {
		if(! this.userresourcestree) {
			this.userresourcestree = new Ext.UserResourcesTree({
				title: '资源信息',
				margins: '0 5 0 0',
				split: true,
				region: 'east',
				width: 250,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.userresourcestree;
	}
	
});