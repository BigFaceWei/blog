/**
 * 授权管理-->专业管理-->左边机构部门树，右边已分配的机构
 */
Ext.ProfessionOrganGrant = function() {
	var _this = this;
	
	Ext.ProfessionOrganGrant.superclass.constructor.call(this, {
		//title: '专业分配信息',
		layout: 'border',
		border: false,
		items: [_this.getProfessionOrganTree(), _this.getProfessionHaveOrgansTree()]
    });
	
	_this.getProfessionOrganTree().on('afterNodeChecked', function() {
		_this.getProfessionHaveOrgansTree().loadOrgansByProfessionId(_this.professionId, _this.organId);
	});
	_this.getProfessionHaveOrgansTree().on('afterRemove', function() {
		_this.getProfessionOrganTree().loadOrgans(_this.professionId, _this.organgrade, _this.organId);
	});
};

Ext.extend(Ext.ProfessionOrganGrant, Ext.Panel, {
	
	loadOrgansAndGrantOrgans: function(professionId, organgrade, organId) {
		this.professionId = professionId;
		this.organgrade = organgrade;
		this.organId = organId;
		this.getProfessionOrganTree().loadOrgans(professionId, organgrade, organId);
		this.getProfessionHaveOrgansTree().loadOrgansByProfessionId(professionId, organId);
	},
	
	getProfessionOrganTree: function() {
		if(! this.professionOrganTree) {
			this.professionOrganTree = new Ext.ProfessionOrganTree({
				title: '机构树信息',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 380,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.professionOrganTree;
	},
	
	getProfessionHaveOrgansTree: function() {
		if(! this.professionHaveOrgansTree) {
			this.professionHaveOrgansTree = new Ext.ProfessionHaveOrgansTree({
				title: '授权机构信息',
				region: 'center',
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.professionHaveOrgansTree;
	}
	
});