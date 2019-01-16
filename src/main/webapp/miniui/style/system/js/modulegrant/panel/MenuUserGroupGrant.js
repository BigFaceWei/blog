/**
 * 菜单管理-->用户组授权
 */
Ext.MenuUserGroupGrant = function() {
	var _this = this;
	
	Ext.MenuUserGroupGrant.superclass.constructor.call(this, {
		title: '用户组授权',
		layout: 'border',
		border: false,
		items: [_this.getUserGroupTree(), _this.getContentPanel()]
    });
	
};

Ext.extend(Ext.MenuUserGroupGrant, Ext.Panel, {
	
	initComponent: function() {
		var _this = this;
		Ext.MenuUserGroupGrant.superclass.initComponent.call(this);
		_this.getUserGroupTree().on('afterNodeChecked', function(node, e) {//点击再次刷新roleGrid
			var roleGrid = _this.getContentPanel().items.itemAt(0).getRoleGrid();
			var userGrid = _this.getContentPanel().items.itemAt(0).getUserGrid();
			var store = roleGrid.getStore();
			var params = {
				menuId: _this.moduleId
			};
			if(_this.moduleId!='') {
				store.load({
					params: {menuInfo: Ext.encode(params)},
					callback: function() {
						if(store.getCount() > 0) {//select one 
							roleGrid.getSelectionModel().select(0, 1);
							roleGrid.selectedInfo = {row: 0, col: 1};
						} else {
							userGrid.getStore().removeAll();
						}
					}
				});
				
				//_this.selectModuleId = _this.moduleId;
			}
		});
		
	},
	
	loadMenuUserGroup: function(menuId, moduleId, gradeId) {
		this.menuId = menuId;
		this.moduleId = moduleId;
		this.getUserGroupTree().loadMenuUserGroup(menuId, moduleId, gradeId, '');
		this.getMenuGrid().loadGrid(moduleId, gradeId);
		
	},
	
	getUserGroupTree: function() {
		if(! this.userGroupTree) {
			this.userGroupTree = new Ext.UserGroupTree({
				title: '用户组树',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.userGroupTree;
	},
	
	getContentPanel: function() {
		if(! this.contentPanel) {
			this.contentPanel = new Ext.Panel({
				region:'center',
				layout: 'border',
				items: this.getMenuGrid()
			});
		}
		return this.contentPanel;
	},
	
	getMenuGrid: function(){
		if(!this.menugrid) {
			this.menugrid = new Ext.MenuGrid();
		}
		return this.menugrid;
	
	}
	
});