Ext.UsergroupUsersAuthority = function() {
	var _this = this;
	
	Ext.UsergroupUsersAuthority.superclass.constructor.call(this, {
		title: '人员信息',
		layout: 'border',
		border: false,
		items: [_this.getUsergroupUsersTree(), _this.getHasGrantUsersTree()]
    });
	
	_this.getUsergroupUsersTree().on('afterNodeChecked', function() {
		var showAll = _this.getUsergroupUsersTree().showAll;
		_this.getHasGrantUsersTree().loadUsersByRoleId(_this.roleId, _this.areaNo, showAll);
	});
	_this.getHasGrantUsersTree().on('afterRemove', function() {
		_this.getUsergroupUsersTree().loadUsersByRoleId(_this.roleId, _this.organId, '', _this.areaNo, false);
	});
};

Ext.extend(Ext.UsergroupUsersAuthority, Ext.Panel, {
	
	loadUsersAndGrantUsersByRoleId: function(roleId, organId, areaNo) {
		this.roleId = roleId;
		this.organId = organId;
		this.areaNo = areaNo;
		this.getUsergroupUsersTree().loadUsersByRoleId(roleId, organId, '', areaNo, false);
		this.getHasGrantUsersTree().loadUsersByRoleId(roleId, areaNo, false);
	},
	
	getUsergroupUsersTree: function() {
		if(! this.usergroupuserstree) {
			this.usergroupuserstree = new Ext.UsergroupUsersTree({
				title: '人员树信息',
				region: 'west',
				id: "UsergroupUsersTree",
				split: true,
				margins: '0 0 0 0',
				width: 420,
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.usergroupuserstree;
	},
	
	getHasGrantUsersTree: function() {
		if(! this.hasGrantUserstree) {
			this.hasGrantUserstree = new Ext.HasGrantUsersTree({
				title: '授权人员信息',
				region: 'center',
				border: false,
				root: new Ext.tree.TreeNode()
			});
		}
		return this.hasGrantUserstree;
	}
	
});