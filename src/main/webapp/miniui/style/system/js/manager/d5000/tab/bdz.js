Ext.BdzTab = function() {
	var _this = this;
	
	Ext.BdzTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getBdzForm(),_this.getUserGrid()]
    });
	
};

Ext.extend(Ext.BdzTab, Ext.TabPanel, {
	
	init: function(BdzId) {
		this.getBdzForm().loadBdz(BdzId);
		this.getUserGrid().loadUsersByOrganId(BdzId);
	},
	
	getBdzForm: function() {
		if(! this.bdzform) {
			this.bdzform = new Ext.BdzForm();
		}
		return this.bdzform;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.UserGrid();
		}
		return this.usergrid;
	}
});