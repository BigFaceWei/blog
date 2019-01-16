Ext.OrganTab = function() {
	var _this = this;
	
	Ext.OrganTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getOrganForm(), _this.getUserGrid()]
    });
	
};

Ext.extend(Ext.OrganTab, Ext.TabPanel, {
	
	init: function(organId) {
		this.getOrganForm().loadOrgan(organId);
		this.getUserGrid().loadUsersByOrganId(organId);
	},
	
	getOrganForm: function() {
		if(! this.organform) {
			this.organform = new Ext.OrganForm();
		}
		return this.organform;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.UserGrid();
		}
		return this.usergrid;
	}
});