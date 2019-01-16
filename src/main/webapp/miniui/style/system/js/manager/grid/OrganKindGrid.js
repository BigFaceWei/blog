Ext.OrganKindGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	
	initComponent: function() {
	
		this.store = new Ext.data.JsonStore({
			fields: ['KINDID','KINDNAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgankinds'
		});
		this.store.load();
		
		this.tbar = [{
			iconCls: 'add',
			text: '新增',
			scope: this,
			handler: this.addNode
		}, {
			iconCls: 'edit',
			text: '保存',
			scope: this,
			handler: this.editNode
		}, {
			iconCls: 'delete',
			text: '删除',
			scope: this,
			handler: this.deleteNode
		},{
         text : '上移',
         iconCls : 'edit',
         scope: this,
         handler : function(){
         	var _this = this;
		    var resultStore = this.getStore();
		    var sm = this.getSelectionModel();
			if (!sm.hasSelection()) {
				Ext.MessageBox.alert('信息提示','请选择一行记录！');
				return;
			}
           //if(_this.getSelectionModel().lastActive + 1 == 1){
			if(sm.selection.cell[0] + 1 == 1){
	            Ext.Msg.alert("信息提示","当前已经是第一行！");
	            return false;
           }
           var record = sm.selection.record; 
           var index = resultStore.indexOf(record);  
           if (index > 0) {  
               resultStore.removeAt(index);  
               resultStore.insert(index - 1, record);  
               _this.getView().refresh(); 
               _this.getSelectionModel().select(index - 1, 1);
           }
           this.sort();
         }
        },{
         text : '下移',
         iconCls : 'edit',
         scope: this,
         handler : function(){
           var _this = this;
		   var resultStore = this.getStore();
		   var sm = this.getSelectionModel();
		   if (!sm.hasSelection()) {
				Ext.MessageBox.alert('信息提示','请选择一行记录！');
				return;
		   }
           //if(sm.lastActive + 1 == resultStore.getCount()){
		   if(sm.selection.cell[0] + 1 == resultStore.getCount()){
		        Ext.Msg.alert('信息提示','当前已经是最后一行！');
		        return false;
           }
           var record = sm.selection.record;   
           var index = resultStore.indexOf(record);  
           if (index < resultStore.getCount() - 1) {  
              resultStore.removeAt(index);  
              resultStore.insert(index + 1, record);  
              _this.getView().refresh();//刷新行号  
              _this.getSelectionModel().select(index + 1, 1);  
       	   }
       	   this.sort();
         }
        }];
		this.bbar = new Ext.PagingToolbar({
			store: this.store,
			displayInfo: true,
	        pageSize: 10,
	        prependButtons: true,
	        displayMsg: '本页显示第{0}条到第{1}条记录，一共{2}条记录',
	        emptyMsg: '没有记录',
	        beforePageText: '当前第',
	        afterPageText: '页，共{0}页'
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header: '序号', width: 60}), //序号生产器
		    {header:'机构类别', width:150, dataIndex:'KINDNAME', sortable: true, editor: {
		    	xtype: 'textfield'
		    }}
		   ];
		
		Ext.OrganKindGrid.superclass.initComponent.call(this);
		
		
		this.addEvents('afterModify');
	},
	
	sort: function () {
		var me = this;
		var ds = this.getStore();
        var sortIndex = [];
        for (var i = 0; i < ds.getCount(); i++) {
            sortIndex.push(ds.data.items[i].data.KINDID);
        }
        Ext.Ajax.request({
            url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=organKind',
            params: {sortArray: Ext.encode(sortIndex)},
            success: function(response, op){
                if(response.responseText == '1') {
                	//Ext.Msg.alert('系统信息', '新的机构类别顺序已保存！');
                	me.fireEvent('afterModify');
                }
            },
            failure: function(response, op){
                Ext.Msg.alert('信息', response.responseText);
            }
        });
	},
	
	addNode: function() {
		var _this = this;
		var Plant = this.store.recordType;
        var p = new Plant({ KINDID:'', KINDNAME:'' });
        this.stopEditing();     //关闭表格编辑状态
        this.store.insert(_this.store.getCount(), p);     //插入一条记录
        this.startEditing(_this.store.getCount() - 1, 1);//把第一个单元格处于编辑状态

	},
	editNode: function(){
		var _this = this;
		this.stopEditing();
		
		var store = this.getStore();
		var records = store.getModifiedRecords();
		if (records.length == 0) return;
		
		var count = 0;
		
        for ( var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if(record.get('KINDNAME') == '') {
            	this.startEditing(store.indexOf(record), 1);
            	return;
            }
            
            Ext.Ajax.request({
	            url: contextpath + '/tbp/sysmanager/areano.do?method=saveOrgankind',
	            params: {nodeInfo: Ext.encode(records[i].data)},
				success: function (response, opts) {
					store.commitChanges();
	                store.reload();
	                _this.fireEvent('afterModify');
	    		},
	    		failure: function() {
	    			Ext.Msg.alert('系统提示', '与服务器交互失败！');
	        	}
            });
        }   
    },
	
	deleteNode: function () {
		var _this = this;
		var sm = this.getSelectionModel();
		if (!sm.hasSelection()) {
			Ext.MessageBox.alert('信息提示','请选择您要删除的级别！');
			return;
		}
		var rec = sm.selection.record;
	    Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/areano.do?method=deleteOrgankind&KINDID='+rec.get("KINDID"),
			success: function (response, opts) {
			    var selections = sm.getSelectedCell();     
                Ext.each(selections, function(item) {     
                	_this.fireEvent('afterModify');
                	_this.store.commitChanges();
                	_this.store.reload();
                });
    		},
    		failure: function() {
    			Ext.Msg.alert('系统提示', '与服务器交互失败！');
        	}
		});
		
	}
  
	
});