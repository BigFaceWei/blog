Ext.UserTree = Ext.extend(Ext.tree.TreePanel, {
	
	title: '用户授权信息',
	width: 300,
	margins: '15 5 15 15',
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	tbar: [{
		iconCls: 'update',
		text: '保存'
	}],
	
	loadUserTree: function(roleId){
		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : '/test/services/role/userTree/' + roleId,
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						}
					},
					load: function(loader, node) {
						if(node == _this.getRootNode()) {
							node.eachChild(function(child) {
								child.expand();
							});
						}
					}
				}
			})
		}));
	}	
	
});