Ext.DcTab = function() {
	var _this = this;
	
	Ext.DcTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getDcForm(),_this.getUserGrid()]
    });
	
};

Ext.extend(Ext.DcTab, Ext.TabPanel, {
	
	init: function(DcId) {
		this.getDcForm().loadDc(DcId);
		this.getUserGrid().loadUsersByOrganId(DcId);
	},
	
	getDcForm: function() {
		if(! this.dcform) {
			this.dcform = new Ext.DcForm();
		}
		return this.dcform;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.UserGrid();
		}
		return this.usergrid;
	}
});