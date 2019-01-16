/**
 * ��Ȩ����-->רҵ����-->רҵ��
 */

Ext.ProfessionGrantTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	initComponent: function() {
		var _this = this;
		
		this.root = new Ext.tree.AsyncTreeNode({
			text: '����רҵ',
			expanded : true
		});
		
		Ext.ProfessionGrantTree.superclass.initComponent.call(this);
		
	},
	
	loadProfessionByOrganId: function(organGrade, organId){
		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			text: '����רҵ',
			expanded: true,
			loader: new Ext.tree.TreeLoader({
				url: contextpath + '/tbp/sysmanager/manager.do?method=buildProfessionTree',
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							if (node.attributes.nodeflag == 'organgrade') {
								loader.baseParams.nodeType = 'profession';
								loader.baseParams.organGrade = node.id;
								loader.baseParams.organId = organId;
							}	
						} else {
							loader.baseParams.nodeType = 'organgrade';
							loader.baseParams.organGrade = organGrade;
						}
					}
				}
			})
		}));	
	}
	
});