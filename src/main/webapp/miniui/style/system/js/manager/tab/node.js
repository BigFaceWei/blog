Ext.NodeTab = function() {
	var _this = this;
	
	Ext.NodeTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		items: [_this.getNodeForm()]
    });
	
};

Ext.extend(Ext.NodeTab, Ext.TabPanel, {
	
	init: function(nodeId) {
		this.getNodeForm();
	},
	
	getNodeForm: function() {
		if(! this.nodeForm) {
			this.nodeForm = new Ext.NodeForm();
		}
		return this.nodeForm;
	}
});