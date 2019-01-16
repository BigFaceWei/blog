Ext.AreaNoGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	
	initComponent: function() {
	
		this.store = new Ext.data.JsonStore({
			fields: ['ZONE_ID','ZONE_NO','ZONE_NAME','ORGANGRADE'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listAreas',
			remoteSort: true
		});
		this.store.load(/*{params: {start: 0,limit: 20}}*/);
		
		var me = this;
		
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
               _this.getSelectionModel().select(index - 1, 2);
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
              _this.getSelectionModel().select(index + 1, 2);  
       	   }
       	   this.sort();
         }
        },{
        	xtype: 'tbspacer', width: 30 
    	},'机构编码:&nbsp;&nbsp;',{
         	xtype: 'textfield',
    		id: 'searchNo',
     		hideLabel: false
        }, '&nbsp;编码名称:&nbsp;',{
        	xtype: 'textfield',
    		id: 'searchName',
    		hideLabel: true
        },{
        	xtype: 'button',
        	text: '确定',
        	iconCls: 'search',
        	handler: function(){
        		var num = Ext.getCmp('searchNo').getValue();
        		var name = Ext.getCmp('searchName').getValue();
        		me.getStore().load({params: {zoneno: num, zonename: name}});
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
		    {header:'机构编码(隐藏)', width:150, dataIndex:'ZONE_ID', hidden: true
		    },
		    {header:'机构编码', width:150, dataIndex:'ZONE_NO', sortable: true, editor: {
		    	xtype: 'textfield', allowBlank: false, vtype: 'alphanum'
		    }
		    },
		    {header:'编码名称', width:150, dataIndex:'ZONE_NAME', sortable: true, editor: {
		    	xtype: 'textfield'
		    }
		    },
		    {header:'机构级别', width:100, dataIndex:'ORGANGRADE', editor: {
		    	xtype: 'combo',
		    	typeAhead: true,
		        triggerAction: 'all',
		        forceSelection: true,
		        mode: 'local',
		    	store: [['1', '国家级'],
	            ['2', '区域级'],
	            ['3', '省级'],
	            ['4', '地级'],
	            ['5', '县级'],
	            ['6', '省调直调电厂'],
	            ['7', '地调直调电厂'],
	            ['8', '县调直调电厂']]
		    },renderer: function(value) {
				if(value == '1') return '国家级';
				else if(value == '2') return '区域级';
				else if(value == '3') return '省级';
				else if(value == '4') return '地级';
				else if(value == '5') return '县级';
				else if(value == '6') return '省调直调电厂';
				else if(value == '7') return '地调直调电厂';
				else if(value == '8') return '县调直调电厂';
				return value;
			}
			}];
		
		Ext.AreaNoGrid.superclass.initComponent.call(this);
		
		
		this.addEvents('afterModify');
	},
	
	sort: function () {
		var me = this;
		var ds = this.getStore();
        var sortIndex = [];
        for (var i = 0; i < ds.getCount(); i++) {
            sortIndex.push(ds.data.items[i].data.ZONE_ID);
        }
        Ext.Ajax.request({
            url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=areaNo',
            params: {sortArray: Ext.encode(sortIndex)},
            success: function(response, op){
                if(response.responseText == '1') {
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
        var p = new Plant({ ZONE_NO:'', ZONE_NAME:'', ORGANGRADE:'' });
        this.stopEditing();     //关闭表格编辑状态
        this.store.insert(_this.store.getCount(), p);     //插入一条记录
        this.startEditing(_this.store.getCount() - 1, 2);//把第一个单元格处于编辑状态

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
            if(record.get('ZONE_NO') == '') {
            	this.startEditing(store.indexOf(record), 2);
            	return;
            }
            if(record.get('ZONE_NAME') == '') {
            	this.startEditing(store.indexOf(record), 3);
            	return;
            }
            if(record.get('ORGANGRADE') == '') {
            	this.startEditing(store.indexOf(record), 4);
            	return;
            }
            
            Ext.Ajax.request({
	            url: contextpath + '/tbp/sysmanager/areano.do?method=saveAreaNo',
	            params: {nodeInfo: Ext.encode(records[i].data)},
				success: function (response, opts) {
					var zoneId = formReply(response);
					if(zoneId == "false") {
						Ext.Msg.alert('系统提示','此区域编码已经存在！');
						return;
					}
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
			Ext.MessageBox.alert('信息提示','请选择您要删除的区域编码！');
			return;
		}
		
		Ext.Msg.confirm('警告', '确认要删除该区域编码', function(btn, text){
		    if (btn == 'yes'){
		        _this.delNode(_this, sm);
		    }
		    if (btn == 'no'){
		        return false;
		    }
		});
		
	},
	
	delNode: function(_this, sm){
		var rec = sm.selection.record;
	    Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/areano.do?method=deleteAreaNo&areaNo='+rec.get("ZONE_ID"),
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