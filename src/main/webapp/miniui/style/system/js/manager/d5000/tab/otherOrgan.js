Ext.OtherOrganTab = function() {
	var _this = this;
	
	Ext.OtherOrganTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getOtherOrganForm(), _this.getUserGrid()]
    });
	
};

Ext.extend(Ext.OtherOrganTab, Ext.TabPanel, {
	
	init: function(organId) {
		this.getOtherOrganForm().loadOrgan(organId);
		this.getUserGrid().loadUsersByOrganId(organId);
	},
	
	getOtherOrganForm: function() {
		if(! this.otherOrganForm) {
			this.otherOrganForm = new Ext.OtherOrganForm();
		}
		return this.otherOrganForm;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.D5000UserGrid();
		}
		return this.usergrid;
	}
});