Ext.DispatchOrganTab = function() {
	var _this = this;
	
	Ext.DispatchOrganTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getDispatchOrganForm(), _this.getUserGrid()]
    });
	
};

Ext.extend(Ext.DispatchOrganTab, Ext.TabPanel, {
	
	init: function(dispatchOrganId) {
		this.getDispatchOrganForm().loadOrgan(dispatchOrganId);
		this.getUserGrid().loadUsersByOrganId(dispatchOrganId);
	},
	
	getDispatchOrganForm: function() {
		if(! this.dispatchOrganform) {
			this.dispatchOrganform = new Ext.DispatchOrganForm();
		}
		return this.dispatchOrganform;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.D5000UserGrid();
		}
		return this.usergrid;
	}
});