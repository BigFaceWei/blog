Ext.ProfessionGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	
	id: 'professionGrid',
    
	initComponent: function() {
	
		this.store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessions',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		this.store.load();
		
		/*this.store = new Ext.data.Store({
			remoteSort: true,
			reader: new Ext.data.JsonReader({  
				root: 'rows',
				totalProperty: 'totalCount'
			}, ['PROFESSION_ID','PROFESSION_NAME'])
		});*/
		
		this.tbar = [{
			iconCls: 'add',
			text: '����',
			scope: this,
			handler: this.addProfession
		}, {
			iconCls: 'edit',
			text: '����',
			scope: this,
			handler: this.editProfession
		}, {
			iconCls: 'delete',
			text: 'ɾ��',
			scope: this,
			handler: this.deleteProfession
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
               _this.getSelectionModel().select(index - 1, 1);//�ѵ�Ԫ����ѡ��״̬
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
              _this.getSelectionModel().select(index + 1, 1);  //�ѵ�Ԫ����ѡ��״̬
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
		    {header:'�ڵ�����', width:150, dataIndex:'PROFESSION_NAME', sortable: true, editor: {
		    	xtype: 'textfield'
		    }}
		   ];
		
		Ext.ProfessionGrid.superclass.initComponent.call(this);
		
		this.addEvents('afterModify');
		
	},
	
	/*loadProfessions: function() {
		this.store.proxy = new Ext.data.HttpProxy({url: contextpath + '/tbp/sysmanager/usergroup.do?method=selectProfessions'});
		this.store.load({params: {start: 0,limit: 10}});
	},*/
	sort: function () {
		var me = this;
		var ds = this.getStore();
        var sortIndex = [];
        for (var i = 0; i < ds.getCount(); i++) {
            sortIndex.push(ds.data.items[i].data.PROFESSION_ID);
        }
        Ext.Ajax.request({
            url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=profession',
            params: {sortArray: Ext.encode(sortIndex)},
            success: function(response, op){
                if(response.responseText == '1') {
                	//Ext.Msg.alert('��Ϣ', '�µ�רҵ����˳���ѱ��棡');
                	me.fireEvent('afterModify');
                }
            },
            failure: function(response, op){
                Ext.Msg.alert('��Ϣ', response.responseText);
            }
        });
	},
	
	addProfession: function() {
		var _this = this;
		var Plant = this.store.recordType;
        var p = new Plant({
        	 PROFESSION_ID:'',
             PROFESSION_NAME:''
        });
        this.stopEditing();     //�رձ��༭״̬
        this.store.insert(_this.store.getCount(), p);     //����һ����¼
        this.startEditing(_this.store.getCount() - 1, 1);//�ѵ�һ����Ԫ���ڱ༭״̬

	},
	editProfession: function(){
		var _this = this;
		
		this.stopEditing();
		
		var store = this.getStore();
		var records = store.getModifiedRecords();
		if (records.length == 0) return;
		
        for ( var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if(record.get('PROFESSION_NAME') == '') {
            	//Ext.Msg.alert('��Ϣ��ʾ','�ڵ����Ͳ���Ϊ�գ�');
            	this.startEditing(store.indexOf(record), 1);
            	return;
            }
            
            Ext.Ajax.request({
	            url: contextpath + '/tbp/sysmanager/usergroup.do?method=saveProfession',
	            params: {professionInfo: Ext.encode(records[i].data)},
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
	
	deleteProfession: function () {
		var _this = this;
		var sm = this.getSelectionModel();
		if (!sm.hasSelection()) {
			Ext.MessageBox.alert('��Ϣ��ʾ','��ѡ����Ҫɾ���Ľڵ㣡');
			return;
		}
		var rec = sm.selection.record;
		
		var nodeId = rec.get("PROFESSION_ID");
	    Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/usergroup.do?method=deleteProfession&professionId='+nodeId+'',
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