Ext.RoleGrant = function() {
	var _this = this;
	
	Ext.RoleGrant.superclass.constructor.call(this, {
		title: '角色授权管理',
		layout: 'border',
		border: false,
		items: [_this.getRoleGrantTree(), _this.getContentPanel()]
    });
    
};

Ext.extend(Ext.RoleGrant, Ext.Panel, {
	
	loadRoleTree: function(organGrade, organId, areaNo) {
		this.organGrade = organGrade;
		this.organId = organId;
		this.areaNo = areaNo;
		this.getRoleGrantTree().loadUsergroupByGradeId(organGrade, '');
		this.getRole().init(null, organId, organGrade, areaNo);
	},
	
	getRoleGrantTree: function() {
		if(! this.roleGrantTree) {
			var tree = this.roleGrantTree = new Ext.RoleGrantTree({
				id: 'roleGrantTree',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false
			});
			
			var me = this;
			tree.on('click', function(node) {
				if(node.attributes.iconCls == 'role') {
					me.getRole().getRoleForm().loadProfression(node.parentNode.parentNode.id);
					me.getRole().init(node.id, me.organId, me.organGrade, me.areaNo);
				}
			});
			
		}
		
		return this.roleGrantTree;
	},
	
	getContentPanel: function() {
		if(! this.contentPanel) {
			this.contentPanel = new Ext.Panel({
				region:'center',
				border: false,
				layout: 'fit',
				items: this.getRole()
			});
		}
		return this.contentPanel;
	},
	
	getRole: function() {
		if(!this.role) {
			this.role = new Ext.RoleTab({
				region: 'center',
				border: false
			});
			this.role.getRoleForm().getTopToolbar().setVisible(false);
			this.role.getRoleForm().getForm().findField('ROLENAME').setDisabled(true);
			this.role.getRoleForm().getForm().findField('PROFESSION_ID').setDisabled(true);
			this.role.getRoleForm().getForm().findField('DESCRIPTION').setDisabled(true);
		}
		return this.role;
	}
});