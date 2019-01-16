/**
 * �˵�����-->�û���Ȩ
 */
Ext.MenuUserGrant = function() {
	var _this = this;
	
	Ext.MenuUserGrant.superclass.constructor.call(this, {
		title: '�û���Ȩ',
		layout: 'border',
		border: false,
		items: [_this.getUserGrantTree(), _this.getHasGrantUsersTree(), _this.getResourceUsersTree()]
    });
	
	_this.getUserGrantTree().on('afterNodeChecked', function() {
		_this.getHasGrantUsersTree().loadHasGrantUsers(_this.moduleId);
	});
	_this.getHasGrantUsersTree().on('afterRemove', function() {
		_this.getUserGrantTree().loadUsers(_this.moduleId, '', '');
	});
	
	_this.getHasGrantUsersTree().on('click', function(node, e) {
		_this.getResourceUsersTree().loadResourceUsers(node.id, _this.menuId);
	});
};

Ext.extend(Ext.MenuUserGrant, Ext.Panel, {
	
	loadMenuUser: function(menuId, moduleId) {
		this.menuId = menuId;
		this.moduleId = moduleId;
		this.getUserGrantTree().loadUsers(moduleId, '', '');
		this.getHasGrantUsersTree().loadHasGrantUsers(moduleId);
		this.getResourceUsersTree().setRootNode(new Ext.tree.TreeNode());
	},
	
	getUserGrantTree: function() {
		if(! this.userGrantTree) {
			this.userGrantTree = new Ext.UserGrantTree({
				title: '��Ա����Ϣ',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 280,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.userGrantTree;
	},
	
	getResourceUsersTree: function() {
		if(! this.resourceUsersTree) {
			this.resourceUsersTree = new Ext.ResourceUsersTree({
				title: '��Դ��Ϣ',
				region: 'east',
				border: false,
				split: true,
				width: 250,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.resourceUsersTree;
	},
	
	getHasGrantUsersTree: function() {
		if(! this.hasGrantUserstree) {
			this.hasGrantUserstree = new Ext.HasGrantUsersTree({
				title: '��Ȩ��Ա��Ϣ',
				region: 'center',
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.hasGrantUserstree;
	}
	
});