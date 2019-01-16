Ext.GencoTab = function() {
	var _this = this;
	
	Ext.GencoTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getGencoForm(), _this.getUserGrid()]
    });
	
};

Ext.extend(Ext.GencoTab, Ext.TabPanel, {
	
	init: function(organId) {
		this.getGencoForm().loadOrgan(organId);
		this.getUserGrid().loadUsersByOrganId(organId);
	},
	
	getGencoForm: function() {
		if(! this.gencoForm) {
			this.gencoForm = new Ext.GencoForm();
		}
		return this.gencoForm;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.D5000UserGrid();
		}
		return this.usergrid;
	}
});