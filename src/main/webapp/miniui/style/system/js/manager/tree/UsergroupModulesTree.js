Ext.UsergroupModulesTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	loadModulesByRoleId: function(roleId, organGrade, areaNo){
		var _this = this;
		
		Ext.apply(
				this.plugins[0], {
					saveUrl: contextpath + '/tbp/sysmanager/usergroup.do?method=updateModules&areaNo=' + areaNo + '&roleId=' + roleId}),
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			id: 'usergroupModuleTree',
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/usergroup.do?method=modules&areaNo=' + areaNo + '&organGrade=' + organGrade + '&roleId=' + roleId,
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							loader.baseParams.menuId = node.id;
						}
					}
				}
			})
		}));
	}
	
});