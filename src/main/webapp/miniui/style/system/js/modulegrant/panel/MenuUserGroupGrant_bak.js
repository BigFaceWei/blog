/**
 * �˵�����-->�û�����Ȩ
 */
Ext.MenuUserGroupGrant_bak = function() {
	var _this = this;
	
	Ext.MenuUserGroupGrant.superclass.constructor.call(this, {
		title: '�û�����Ȩ',
		layout: 'border',
		border: false,
		items: [_this.getUserGroupTree(), _this.getResourceTree()]
    });
	
};

Ext.extend(Ext.MenuUserGroupGrant_bak, Ext.Panel, {
	
	initComponent: function() {
		var _this = this;
		Ext.MenuUserGroupGrant_bak.superclass.initComponent.call(this);
		_this.getUserGroupTree().on('click', function(node, e) {
			_this.getResourceTree().loadResourceTree(node.id, _this.menuId);
		});
	},
	
	loadMenuUserGroup: function(menuId, moduleId, gradeId) {
		this.menuId = menuId;
		this.moduleId = moduleId;
		this.getUserGroupTree().loadMenuUserGroup(moduleId, gradeId);
		this.getResourceTree().setRootNode(new Ext.tree.TreeNode());
	},
	
	getUserGroupTree: function() {
		if(! this.userGroupTree) {
			this.userGroupTree = new Ext.UserGroupTree({
				title: '�û�����Ϣ',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 480,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.userGroupTree;
	},
	
	getResourceTree: function() {
		if(! this.resourceTree) {
			this.resourceTree = new Ext.ResourceTree({
				title: '��Դ��Ϣ',
				region: 'center',
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.resourceTree;
	}
	
});