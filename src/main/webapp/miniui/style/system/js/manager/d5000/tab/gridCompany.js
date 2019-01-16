Ext.GridCompanyTab = function() {
	var _this = this;
	
	Ext.GridCompanyTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getGridCompanyForm(), _this.getUserGrid()]
    });
	
};

Ext.extend(Ext.GridCompanyTab, Ext.TabPanel, {
	
	init: function(organId) {
		this.getGridCompanyForm().loadOrgan(organId);
		this.getUserGrid().loadUsersByOrganId(organId);
	},
	
	getGridCompanyForm: function() {
		if(! this.gridCompanyForm) {
			this.gridCompanyForm = new Ext.GridCompanyForm();
		}
		return this.gridCompanyForm;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.D5000UserGrid();
		}
		return this.usergrid;
	}
});