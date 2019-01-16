Ext.ProfessionTab = function() {
	var _this = this;
	
	Ext.ProfessionTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getProfessionForm(), _this.getProfessionGrant()]
    });
	
};

Ext.extend(Ext.ProfessionTab, Ext.TabPanel, {
	
	init: function(organgrade,professionId) {
		this.getProfessionForm().loadProfession(professionId);
		this.getProfessionGrant().loadOrgansAndGrantOrgans(professionId,organgrade);
	},
	
	getProfessionForm: function() {
		if(! this.professionForm) {
			this.professionForm = new Ext.ProfessionForm();
		}
		return this.professionForm;
	},
	
	getProfessionGrant: function() {
		if(! this.professionGrant) {
			this.professionGrant = new Ext.ProfessionGrant();
		}
		return this.professionGrant;
	}
});