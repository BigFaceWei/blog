Ext.BasicManager = function() {
	var _this = this;
	
	Ext.BasicManager.superclass.constructor.call(this, {
		title: '基础维护信息',
		layout: 'border',
		border: false,
		items: [_this.getBasicManagerTree(), _this.getContentPanel()]
    });
    
};

Ext.extend(Ext.BasicManager, Ext.Panel, {
	
	getBasicManagerTree: function() {
		if(! this.basicManagerTree) {
			var tree = this.basicManagerTree = new Ext.BasicManagerTree({
				//title: '基础维护树信息',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false
			});
			
			var me = this;
			tree.on('click', function(node) {
				if(node.id == 'areano') {
					if(! this.areano) {
						this.areano = new Ext.AreaNoGrid({
								region: 'center',
								border: false
							});
							me.getContentPanel().add(this.areano);
					}
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.areano.getId());
					me.getContentPanel().doLayout();
			    }
				if(node.id == 'organgrade') {
					if(! this.organgrade) {
						this.organgrade = new Ext.OrganGradeGrid({
								region: 'center',
								border: false
							});
							me.getContentPanel().add(this.organgrade);
					}
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.organgrade.getId());
					me.getContentPanel().doLayout();
				}
				if(node.id == 'organkind') {
					if(! this.organkind) {
						this.organkind = new Ext.OrganKindGrid({
								region: 'center',
								border: false
							});
							me.getContentPanel().add(this.organkind);
					}
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.organkind.getId());
					me.getContentPanel().doLayout();
				}
				if(node.id == 'organtype') {
					if(! this.organtype) {
						this.organtype = new Ext.OrganTypeGrid({
								region: 'center',
								border: false
							});
							me.getContentPanel().add(this.organtype);
					}
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.organtype.getId());
					me.getContentPanel().doLayout();
				}
				if(node.id == 'virtualnode') {
					if(! this.virtualnode) {
						this.virtualnode = new Ext.NodeGrid({
								region: 'center',
								border: false
							});
							me.getContentPanel().add(this.virtualnode);
					}
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.virtualnode.getId());
					me.getContentPanel().doLayout();
				}
				if(node.id == 'menucontrol') {
					if(! this.menucontrol) {
						this.menucontrol = new Ext.TwoTree({
								region: 'center',
								border: false
							});
							me.getContentPanel().add(this.menucontrol);
					}
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.menucontrol.getId());
					me.getContentPanel().doLayout();
				}
			});
		}
		return this.basicManagerTree;
	},
	
	getUsergroup: function() {
		if(! this.usergroup) {
			this.usergroup = new Ext.UsergroupTab({
				//title: '用户组信息',
				region: 'center',
				border: false
			});
		}
		return this.usergroup;
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