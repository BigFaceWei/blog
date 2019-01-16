Ext.DispatchDeptTab = function() {
	var _this = this;
	
	Ext.DispatchDeptTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getDispatchDeptForm(), _this.getUserGrid()]
    });
	
};

Ext.extend(Ext.DispatchDeptTab, Ext.TabPanel, {
	
	init: function(dispatchDeptId) {
		this.getDispatchDeptForm().loadOrgan(dispatchDeptId);
		this.getUserGrid().loadUsersByOrganId(dispatchDeptId);
	},
	
	getDispatchDeptForm: function() {
		if(! this.dispatchDeptform) {
			this.dispatchDeptform = new Ext.DispatchDeptForm();
		}
		return this.dispatchDeptform;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.D5000UserGrid();
		}
		return this.usergrid;
	}
});