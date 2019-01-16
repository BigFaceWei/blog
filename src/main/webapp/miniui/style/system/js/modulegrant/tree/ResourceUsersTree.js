Ext.ResourceUsersTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	loadResourceUsers: function(userId, menuId){
		
		Ext.apply(
				this.plugins[0], {
					saveUrl: contextPath + '/tbp/sysmanager/user.do?method=updateResources&userId=' + userId}),
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : contextPath + '/tbp/sysmanager/resource.do?method=userMenu&userId=' + userId + '&menuId=' + menuId
			})
		}));
	}
	
});

