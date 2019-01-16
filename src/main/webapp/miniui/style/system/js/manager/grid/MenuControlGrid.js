Ext.MenuControlGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	
	//title:'�ڵ������б�',
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
			text: '����',
			scope: this,
			handler: this.editNode
		}];
		this.bbar = new Ext.PagingToolbar({
			store: this.store,
			displayInfo: true,
	        pageSize: 7,
	        prependButtons: true,
	        displayMsg: '��ҳ��ʾ��{0}������{1}����¼��һ��{2}����¼',
	        emptyMsg: 'û�м�¼',
	        beforePageText: '��ǰ��',
	        afterPageText: 'ҳ����{0}ҳ'
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header: '���', width: 60}), //���������
		     {header:'�ڵ���������', width:150, dataIndex:'TYPEID', sortable: true,renderer: function(value) {
				if(value == '1') return 'ֱ����糧';
				if(value == '2') return 'ֱ��ˮ�糧';
				if(value == '3') return 'ֱ����糧';
				if(value == '4') return 'ֱ�����վ';
				if(value == '5') return '��ҵ�ּ�����ѹ';
				if(value == '6') return '���б��վ';
				if(value == '256') return '�û���';
				if(value == '7') return '����';
				return value;
			}},
		    {header:'�˵�����', width:150, dataIndex:'MENU', sortable: true,renderer: function(value) {
				if(value == 'create_dispatchOrgan') return '�½���λ';
				if(value == 'create_dispatchDept') return '�½�����';
				if(value == 'create_dc') return '�½��糧';
				if(value == 'create_bdz') return '�½����վ';
				if(value == 'create_user') return '�½��û�';
				if(value == 'create_usergroup') return '�½��û���';
				if(value == 'create_dummy') return '�½��������';
				if(value == 'create_user') return '�½����վ';
				
				return value;
			}},
		    {header:'�˵��ɼ�', width:100, dataIndex:'ISVISIBLE', sortable: true, editor: {
		    	xtype: 'combo',
		    	typeAhead: true,
		        triggerAction: 'all',
		        forceSelection: true,
		        mode: 'local',
		    	store: [['0', '��'],
	            ['1', '��']]
		    },renderer: function(value) {
				if(value == 0) return '��';
				else if(value == 1) return '��';
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
	    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
	        	}
            });
        }   
	}
});