Ext.grid.DynamicEditorGrid = function(config) {
	this.plugins = [];
	for(var i=0; i<30; i++) {
		this.plugins.push(new Ext.grid.CheckColumn());
	}
	
	Ext.grid.DynamicEditorGrid.superclass.constructor.call(this, config||{});
}

Ext.extend(Ext.grid.DynamicEditorGrid, Ext.grid.EditorGridPanel, {
    initComponent: function(){
    	//创建store   
        var ds = new Ext.data.Store({
            url: this.storeUrl,
            reader: new Ext.data.JsonReader()
        });
        
        var config = {
            enableColLock: false,
            loadMask: true,
            border: false,
            stripeRows: true,
            ds: ds,
            columns: []
        };
        
        //给分页PagingToolbar绑定store
        //this.bbar.bindStore(ds, true);
        
        Ext.apply(this, config);
        Ext.apply(this.initialConfig, config);
        Ext.grid.DynamicEditorGrid.superclass.initComponent.apply(this, arguments);
    },
    onRender: function(ct, position){
        this.colModel.defaultSortable = true;
        Ext.grid.DynamicEditorGrid.superclass.onRender.call(this, ct, position);
        this.store.on('load', function(){
            if (typeof(this.store.reader.jsonData.columns) === 'object') {
                var columns = [];
                if (this.rowNumberer) {
                    columns.push(new Ext.grid.RowNumberer());
                }
                if (this.checkboxSelModel) {
                    columns.push(new Ext.grid.CheckboxSelectionModel());
                }
				var cols = this.store.reader.jsonData.columns;
				columns.push(cols[0]);
				columns.push(new Ext.grid.RowWrapper(cols[1])/*new Ext.grid.RowNumberer()*/);
				for(var i=2, len=cols.length; i<len; i++) {
					var checkcolumn = Ext.apply(this.plugins[i-2], cols[i]);
					columns.push(checkcolumn);
				}
				
                this.getColumnModel().setConfig(columns);
            }
        }, this);
    }
});
