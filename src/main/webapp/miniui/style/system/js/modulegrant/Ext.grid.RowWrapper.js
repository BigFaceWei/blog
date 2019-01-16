Ext.grid.RowWrapper = Ext.extend(Ext.grid.RowNumberer, {
	width: 130,
	renderer : function(v, p, record, rowIndex){
        if(this.rowspan){
            p.cellAttr = 'rowspan="'+this.rowspan+'"';
        }
        return '<b>' + record.get(this.dataIndex) + '</b>';
    }
});
