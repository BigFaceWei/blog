Ext.ProfessionManagerOrganGrant = function() {
	var _this = this;
	
	Ext.ProfessionManagerOrganGrant.superclass.constructor.call(this, {
		//title: '专业分配信息',
		layout: 'border',
		border: false,
		items: [_this.getProfessionManagerOrganTree(), _this.getProfessionManagerHaveOrgansTree()]
    });
	
	_this.getProfessionManagerOrganTree().on('afterNodeChecked', function() {
		_this.getProfessionManagerHaveOrgansTree().loadOrgansByProfessionId(_this.professionId);
	});
	_this.getProfessionManagerHaveOrgansTree().on('afterRemove', function() {
		_this.getProfessionManagerOrganTree().loadOrgans(_this.professionId, _this.organgrade, _this.organId);
	});
};

Ext.extend(Ext.ProfessionManagerOrganGrant, Ext.Panel, {
	
	loadOrgansAndGrantOrgans: function(professionId, organgrade, organId) {
		this.professionId = professionId;
		this.organgrade = organgrade;
		this.organId = organId;
		this.getProfessionManagerOrganTree().loadOrgans(professionId, organgrade, organId);
		this.getProfessionManagerHaveOrgansTree().loadOrgansByProfessionId(professionId);
	},
	
	getProfessionManagerOrganTree: function() {
		if(! this.professionManagerOrganTree) {
			this.professionManagerOrganTree = new Ext.ProfessionManagerOrganTree({
				title: '机构树信息',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.professionManagerOrganTree;
	},
	
	getProfessionManagerHaveOrgansTree: function() {
		if(! this.professionManagerHaveOrgansTree) {
			this.professionManagerHaveOrgansTree = new Ext.ProfessionManagerHaveOrgansTree({
				title: '授权机构信息',
				region: 'center',
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.professionManagerHaveOrgansTree;
	}
	
});