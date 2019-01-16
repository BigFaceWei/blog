/**
 * 菜单管理-->用户授权
 */
Ext.MenuUserGrant = function() {
	var _this = this;
	
	Ext.MenuUserGrant.superclass.constructor.call(this, {
		title: '用户授权',
		layout: 'border',
		border: false,
		items: [_this.getUserGrantTree(), _this.getContentPanel()]
    });
	
};

Ext.extend(Ext.MenuUserGrant, Ext.Panel, {
	
	initComponent: function() {
		var _this = this;
		Ext.MenuUserGrant.superclass.initComponent.call(this);
		_this.getUserGrantTree().on('afterNodeChecked', function(node, e) {//点击再次刷新MenuUserGrid
			var menuUserGrid = _this.getContentPanel().items.itemAt(0).getMenuUserGrid();
			var store = menuUserGrid.getStore();
			var params = {
				menuId: _this.moduleId
			};
			if(_this.moduleId!='') {
				store.load({
					params: {menuInfo: Ext.encode(params)}
				});
			}
		});
		
	},
	loadMenuUser: function(menuId, moduleId) {
		this.menuId = menuId;
		this.moduleId = moduleId;
		this.getUserGrantTree().loadUsers(moduleId, '', '');
		this.getMenuUserGrid().loadGrid(moduleId);
	},
	
	getUserGrantTree: function() {
		if(! this.userGrantTree) {
			this.userGrantTree = new Ext.UserGrantTree({
				title: '人员树信息',
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
	
	getContentPanel: function() {
		if(! this.contentPanel) {
			this.contentPanel = new Ext.Panel({
				region:'center',
				layout: 'border',
				items: this.getMenuUserGrid()
			});
		}
		return this.contentPanel;
	},
	
	getMenuUserGrid: function(){
		if(!this.menuUserGrid) {
			this.menuUserGrid = new Ext.MenuUserGrid();
		}
		return this.menuUserGrid;
	
	}
	
});