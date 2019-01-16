/**
 * 授权管理-->专业管理-->左边专业树，右边是分配的面板
 */
Ext.ProfessionGrant = function() {
	var _this = this;
	
	Ext.ProfessionGrant.superclass.constructor.call(this, {
		title: '专业分配管理',
		layout: 'border',
		border: false,
		items: [_this.getProfessionGrantTree(), _this.getContentPanel()]
    });
    
};

Ext.extend(Ext.ProfessionGrant, Ext.Panel, {
	
	loadProfessionGrantTree: function(organGrade, organId) {
		this.organGrade = organGrade;
		this.organId = organId;
		this.getProfessionGrantTree().loadProfessionByOrganId(organGrade, organId);
	},
	
	getProfessionGrantTree: function() {
		if(! this.professionGrantTree) {
			var tree = this.professionGrantTree = new Ext.ProfessionGrantTree({
				id: 'professionGrantTree',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false,
				root: new Ext.tree.TreeNode()
			});
			
			var me = this;
			tree.on('click', function(node) {
				if(node.attributes.iconCls == 'dispatchDept') {
					if(! this.professiongrant) {
						this.professiongrant = new Ext.ProfessionOrganGrant({
							region: 'center',
							border: false
						});
						me.getContentPanel().add(this.professiongrant);
					}
					
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.professiongrant.getId());
					
					me.getContentPanel().doLayout();
					this.professiongrant.loadOrgansAndGrantOrgans(node.id, node.attributes.organgrade, me.organId);
				}
			});
	    
		}
		
		return this.professionGrantTree;
	},
	
	getContentPanel: function() {
		if(! this.contentPanel) {
			this.contentPanel = new Ext.Panel({
				region:'center',
				layout: 'card'
			});
		}
		return this.contentPanel;
	}
});