Ext.MenuControlGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	
	//title:'节点类型列表',
	id: 'menuControlGrid',
/*	listeners: {     
       afteredit: {     
           fn: this.afterEdit,
           scope: this
       }   
    },*/
    
	initComponent: function() {
	
		this.store = new Ext.data.Store({
			remoteSort: true,
			reader: new Ext.data.JsonReader({  
				root: 'rows',
				totalProperty: 'totalCount'
			}, ['ID','TYPEID','MENU','ISVISIBLE'])
		});
		
		this.tbar = [{
			iconCls: 'edit',
			text: '保存',
			scope: this,
			handler: this.editNode
		}];
		this.bbar = new Ext.PagingToolbar({
			store: this.store,
			displayInfo: true,
	        pageSize: 7,
	        prependButtons: true,
	        displayMsg: '本页显示第{0}条到第{1}条记录，一共{2}条记录',
	        emptyMsg: '没有记录',
	        beforePageText: '当前第',
	        afterPageText: '页，共{0}页'
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header: '序号', width: 60}), //序号生产器
		     {header:'节点类型名称', width:150, dataIndex:'TYPEID', sortable: true,renderer: function(value) {
				if(value == '1') return '直调火电厂';
				if(value == '2') return '直调水电厂';
				if(value == '3') return '直调风电厂';
				if(value == '4') return '直调变电站';
				if(value == '5') return '电业局及超高压';
				if(value == '6') return '所有变电站';
				if(value == '256') return '用户组';
				if(value == '7') return '本部';
				return value;
			}},
		    {header:'菜单名称', width:150, dataIndex:'MENU', sortable: true,renderer: function(value) {
				if(value == 'create_dispatchOrgan') return '新建单位';
				if(value == 'create_dispatchDept') return '新建部门';
				if(value == 'create_dc') return '新建电厂';
				if(value == 'create_bdz') return '新建变电站';
				if(value == 'create_user') return '新建用户';
				if(value == 'create_usergroup') return '新建用户组';
				if(value == 'create_dummy') return '新建虚拟机构';
				if(value == 'create_user') return '新建变电站';
				
				return value;
			}},
		    {header:'菜单可见', width:100, dataIndex:'ISVISIBLE', sortable: true, editor: {
		    	xtype: 'combo',
		    	typeAhead: true,
		        triggerAction: 'all',
		        forceSelection: true,
		        mode: 'local',
		    	store: [['0', '否'],
	            ['1', '是']]
		    },renderer: function(value) {
				if(value == 0) return '否';
				else if(value == 1) return '是';
				return value;
			}}
		   ];
		
		Ext.MenuControlGrid.superclass.initComponent.call(this);
	},
	
	loadMenuControl: function() {
		this.store.proxy = new Ext.data.HttpProxy({url: contextpath + '/tbp/sysmanager/tree.do?method=getNodeControlInfo'});
		this.store.load({params: {start: 0,limit: 7}});
	},
	
	editNode: function(){
		this.stopEditing();
		var store = this.getStore();
		var records = store.getModifiedRecords();
		if (records.length == 0) return;
		
        for ( var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if(record.get('ISVISIBLE') == '') {
            	this.startEditing(store.indexOf(record), 1);
            	return;
            }
            
            Ext.Ajax.request({
	            url: contextpath + '/tbp/sysmanager/tree.do?method=saveNodeControl',
	            params: {nodeInfo: Ext.encode(records[i].data)},
				success: function (response, opts) {
					store.commitChanges();
	                store.reload();
	    		},
	    		failure: function() {
	    			Ext.Msg.alert('系统提示', '与服务器交互失败！');
	        	}
            });
        }   
	}
});