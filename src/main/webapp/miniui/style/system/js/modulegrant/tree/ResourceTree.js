Ext.ResourceTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
/*	initComponent: function() {
		var _this = this;
		
        this.root = new Ext.tree.AsyncTreeNode({
            text: 'Ext JS',
            id: 'root',
            expanded: true
        }),
		
		Ext.ResourceTree.superclass.initComponent.call(this);
	},*/
	
	loadResourceTree: function(roleId, menuId){
/*		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			text: '²Ëµ¥×ÊÔ´',
			loader: new Ext.tree.TreeLoader({
				url : contextPath + '/tbp/sysmanager/resource.do?method=buildResourceTree&menuId=' + menuId
			})
		}));*/
		
		Ext.apply(
				this.plugins[0], {
					saveUrl: contextPath + '/tbp/sysmanager/resource.do?method=updateResources&areaNo=' + areaNo + '&roleId=' + roleId}),
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : contextPath + '/tbp/sysmanager/resource.do?method=usergroupMenu&areaNo=' + areaNo + '&roleId=' + roleId + '&menuId=' + menuId
			})
		}));
	}
	
});

