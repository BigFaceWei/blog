Ext.StationTab = function() {
	var _this = this;
	
	Ext.StationTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getStationForm(),_this.getUserGrid()]
    });
	
};

Ext.extend(Ext.StationTab, Ext.TabPanel, {
	
	init: function(stationId) {
		this.getStationForm().loadStation(stationId);
		this.getUserGrid().loadUsersByOrganId(stationId);
	},
	
	getStationForm: function() {
		if(! this.stationform) {
			this.stationform = new Ext.StationForm();
		}
		return this.stationform;
	},
	
	getUserGrid: function() {
		if(! this.usergrid) {
			this.usergrid = new Ext.UserGrid();
		}
		return this.usergrid;
	}
});