Ext.UsergroupGrant = function() {
	var _this = this;
	
	Ext.UsergroupGrant.superclass.constructor.call(this, {
		title: '用户组授权管理',
		layout: 'border',
		border: false,
		items: [_this.getUsergroupGrantTree(), _this.getContentPanel()]
    });
    
};

Ext.extend(Ext.UsergroupGrant, Ext.Panel, {
	
	loadUsergroupTree: function(organGrade, organId, areaNo) {
		this.organGrade = organGrade;
		this.organId = organId;
		this.areaNo = areaNo;
		this.getUsergroupGrantTree().loadUsergroupByGradeId(organGrade, '');
		this.getUsergroup().init(null, organId, organGrade, areaNo);
	},
	
	getUsergroupGrantTree: function() {
		
		if(! this.usergroupGrantTree) {
			var tree = this.usergroupGrantTree = new Ext.UsergroupGrantTree({
				//title: '用户组树信息',
				id: 'usergroupGrantTree',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false,
				root: new Ext.tree.TreeNode()
			});
			
			var me = this;
			tree.on('click', function(node) {
				if(node.attributes.iconCls == 'usergroup') {
					/*if(! this.usergroup) {
						this.usergroup = new Ext.UsergroupTab({
							region: 'center',
							border: false
						});
						me.getContentPanel().add(this.usergroup);
					}
					//this.usergroup.getUsergroupForm().setDisabled(true);
					this.usergroup.getUsergroupForm().getTopToolbar().setVisible(false);
					this.usergroup.getUsergroupForm().getForm().findField('ROLENAME').setDisabled(true);
					this.usergroup.getUsergroupForm().getForm().findField('PROFESSION_ID').setDisabled(true);
					this.usergroup.getUsergroupForm().getForm().findField('DESCRIPTION').setDisabled(true);
					this.usergroup.getUsergroupForm().loadProfression(node.parentNode.parentNode.id);
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.usergroup.getId());
					
					me.getContentPanel().doLayout();
					this.usergroup.init(node.id, me.organId, me.organGrade, me.areaNo);*/
					me.getUsergroup().getUsergroupForm().loadProfression(me.organGrade);
					me.getUsergroup().init(node.id, me.organId, me.organGrade, me.areaNo);
				}
			});
			
			var isUsergroup = function(node) {
				if(node.attributes.nodeflag == 'usergroup') return true;
				return false;
			};
		    
		}
		
		return this.usergroupGrantTree;
	},
	
	getContentPanel: function() {
		if(! this.contentPanel) {
			this.contentPanel = new Ext.Panel({
				region:'center',
				border: false,
				layout: 'fit',
				items: this.getUsergroup()
			});
		}
		return this.contentPanel;
	},
	
	getUsergroup: function() {
		if(!this.usergroup) {
			this.usergroup = new Ext.UsergroupTab({
				region: 'center',
				border: false
			});
			//this.usergroup.getUsergroupForm().disable();
			this.usergroup.getUsergroupForm().getTopToolbar().setVisible(false);
			this.usergroup.getUsergroupForm().getForm().findField('ROLENAME').setDisabled(true);
			this.usergroup.getUsergroupForm().getForm().findField('PROFESSION_ID').setDisabled(true);
			this.usergroup.getUsergroupForm().getForm().findField('DESCRIPTION').setDisabled(true);
		}
		return this.usergroup;
	}
});