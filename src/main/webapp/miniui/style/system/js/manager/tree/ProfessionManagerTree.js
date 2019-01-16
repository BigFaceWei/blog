Ext.ProfessionManagerTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	initComponent: function() {
		var _this = this;
		
		this.root = new Ext.tree.AsyncTreeNode({
			text: '所有专业',
			expanded : true
		});
		
		this.loader = new Ext.tree.TreeLoader({
			url: contextpath + '/tbp/sysmanager/manager.do?method=buildProfessionTree',
			listeners: {
				beforeload: function(loader, node) {
					if(node != _this.getRootNode()) {
						if (node.attributes.nodeflag == 'organgrade') {
							loader.baseParams.nodeType = 'profession';
							loader.baseParams.organGrade = node.id;
						}	
					} else {
						loader.baseParams.nodeType = 'organgrade';
					}
				}
			}
		});
		
		Ext.ProfessionManagerTree.superclass.initComponent.call(this);
		
	}
	
});

		