Ext.UsergroupManagerTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	initComponent: function() {
		var _this = this;
		
		this.root = new Ext.tree.AsyncTreeNode({
			text: '所有用户组',
			expanded: true			
		});
		
		this.loader = new Ext.tree.TreeLoader({
			url: contextpath + '/tbp/sysmanager/manager.do?method=buildTree&roleType=SYS&roleCnName=',
			listeners: {
				beforeload: function(loader, node) {
					if(node != _this.getRootNode()) {
						if (node.attributes.nodeflag == 'organgrade') {
							loader.baseParams.nodeType = 'profession';
							loader.baseParams.organGrade = node.id;
						} else if (node.attributes.nodeflag == 'profession') {
							loader.baseParams.nodeType = 'usergroup';
							loader.baseParams.professionId = node.id;
						}	
					} else {
						loader.baseParams.nodeType = 'organgrade';
					}
				}
			}
		});
		
		Ext.UsergroupManagerTree.superclass.initComponent.call(this);
		
		
    
	}
	
});

		