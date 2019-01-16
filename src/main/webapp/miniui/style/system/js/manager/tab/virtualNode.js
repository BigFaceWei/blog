Ext.VirtualNodeTab = function() {
	var _this = this;
	
	Ext.VirtualNodeTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getVirtualNodeForm(), _this.getUserGrid()]
    });
	
};

Ext.extend(Ext.VirtualNodeTab, Ext.TabPanel, {
	
	init: function(organId) {
		this.getVirtualNodeForm().loadOrgan(organId);
		this.getUserGrid().loadUsersByOrganId(organId);
	},
	
	getVirtualNodeForm: function() {
		if(! this.virtualNodeForm) {
			this.virtualNodeForm = new Ext.VirtualNodeForm();
		}
		return this.virtualNodeForm;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.UserGrid();
		}
		return this.usergrid;
	}
});