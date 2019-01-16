Ext.OrganKindGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	
	initComponent: function() {
	
		this.store = new Ext.data.JsonStore({
			fields: ['KINDID','KINDNAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgankinds'
		});
		this.store.load();
		
		this.tbar = [{
			iconCls: 'add',
			text: '����',
			scope: this,
			handler: this.addNode
		}, {
			iconCls: 'edit',
			text: '����',
			scope: this,
			handler: this.editNode
		}, {
			iconCls: 'delete',
			text: 'ɾ��',
			scope: this,
			handler: this.deleteNode
		},{
         text : '����',
         iconCls : 'edit',
         scope: this,
         handler : function(){
         	var _this = this;
		    var resultStore = this.getStore();
		    var sm = this.getSelectionModel();
			if (!sm.hasSelection()) {
				Ext.MessageBox.alert('��Ϣ��ʾ','��ѡ��һ�м�¼��');
				return;
			}
           //if(_this.getSelectionModel().lastActive + 1 == 1){
			if(sm.selection.cell[0] + 1 == 1){
	            Ext.Msg.alert("��Ϣ��ʾ","��ǰ�Ѿ��ǵ�һ�У�");
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
         text : '����',
         iconCls : 'edit',
         scope: this,
         handler : function(){
           var _this = this;
		   var resultStore = this.getStore();
		   var sm = this.getSelectionModel();
		   if (!sm.hasSelection()) {
				Ext.MessageBox.alert('��Ϣ��ʾ','��ѡ��һ�м�¼��');
				return;
		   }
           //if(sm.lastActive + 1 == resultStore.getCount()){
		   if(sm.selection.cell[0] + 1 == resultStore.getCount()){
		        Ext.Msg.alert('��Ϣ��ʾ','��ǰ�Ѿ������һ�У�');
		        return false;
           }
           var record = sm.selection.record;   
           var index = resultStore.indexOf(record);  
           if (index < resultStore.getCount() - 1) {  
              resultStore.removeAt(index);  
              resultStore.insert(index + 1, record);  
              _this.getView().refresh();//ˢ���к�  
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
	        displayMsg: '��ҳ��ʾ��{0}������{1}����¼��һ��{2}����¼',
	        emptyMsg: 'û�м�¼',
	        beforePageText: '��ǰ��',
	        afterPageText: 'ҳ����{0}ҳ'
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header: '���', width: 60}), //���������
		    {header:'�������', width:150, dataIndex:'KINDNAME', sortable: true, editor: {
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
                	//Ext.Msg.alert('ϵͳ��Ϣ', '�µĻ������˳���ѱ��棡');
                	me.fireEvent('afterModify');
                }
            },
            failure: function(response, op){
                Ext.Msg.alert('��Ϣ', response.responseText);
            }
        });
	},
	
	addNode: function() {
		var _this = this;
		var Plant = this.store.recordType;
        var p = new Plant({ KINDID:'', KINDNAME:'' });
        this.stopEditing();     //�رձ��༭״̬
        this.store.insert(_this.store.getCount(), p);     //����һ����¼
        this.startEditing(_this.store.getCount() - 1, 1);//�ѵ�һ����Ԫ���ڱ༭״̬

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
	    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
	        	}
            });
        }   
    },
	
	deleteNode: function () {
		var _this = this;
		var sm = this.getSelectionModel();
		if (!sm.hasSelection()) {
			Ext.MessageBox.alert('��Ϣ��ʾ','��ѡ����Ҫɾ���ļ���');
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
    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
        	}
		});
		
	}
  
	
});