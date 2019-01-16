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
               _this.getSelectionModel().select(index - 1, 2);
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
              _this.getSelectionModel().select(index + 1, 2);  
       	   }
       	   this.sort();
         }
        },{
        	xtype: 'tbspacer', width: 30 
    	},'��������:&nbsp;&nbsp;',{
         	xtype: 'textfield',
    		id: 'searchNo',
     		hideLabel: false
        }, '&nbsp;��������:&nbsp;',{
        	xtype: 'textfield',
    		id: 'searchName',
    		hideLabel: true
        },{
        	xtype: 'button',
        	text: 'ȷ��',
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
	        displayMsg: '��ҳ��ʾ��{0}������{1}����¼��һ��{2}����¼',
	        emptyMsg: 'û�м�¼',
	        beforePageText: '��ǰ��',
	        afterPageText: 'ҳ����{0}ҳ'
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header: '���', width: 60}), //���������
		    {header:'��������(����)', width:150, dataIndex:'ZONE_ID', hidden: true
		    },
		    {header:'��������', width:150, dataIndex:'ZONE_NO', sortable: true, editor: {
		    	xtype: 'textfield', allowBlank: false, vtype: 'alphanum'
		    }
		    },
		    {header:'��������', width:150, dataIndex:'ZONE_NAME', sortable: true, editor: {
		    	xtype: 'textfield'
		    }
		    },
		    {header:'��������', width:100, dataIndex:'ORGANGRADE', editor: {
		    	xtype: 'combo',
		    	typeAhead: true,
		        triggerAction: 'all',
		        forceSelection: true,
		        mode: 'local',
		    	store: [['1', '���Ҽ�'],
	            ['2', '����'],
	            ['3', 'ʡ��'],
	            ['4', '�ؼ�'],
	            ['5', '�ؼ�'],
	            ['6', 'ʡ��ֱ���糧'],
	            ['7', '�ص�ֱ���糧'],
	            ['8', '�ص�ֱ���糧']]
		    },renderer: function(value) {
				if(value == '1') return '���Ҽ�';
				else if(value == '2') return '����';
				else if(value == '3') return 'ʡ��';
				else if(value == '4') return '�ؼ�';
				else if(value == '5') return '�ؼ�';
				else if(value == '6') return 'ʡ��ֱ���糧';
				else if(value == '7') return '�ص�ֱ���糧';
				else if(value == '8') return '�ص�ֱ���糧';
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
                Ext.Msg.alert('��Ϣ', response.responseText);
            }
        });
	},
	
	addNode: function() {
		var _this = this;
		var Plant = this.store.recordType;
        var p = new Plant({ ZONE_NO:'', ZONE_NAME:'', ORGANGRADE:'' });
        this.stopEditing();     //�رձ��༭״̬
        this.store.insert(_this.store.getCount(), p);     //����һ����¼
        this.startEditing(_this.store.getCount() - 1, 2);//�ѵ�һ����Ԫ���ڱ༭״̬

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
						Ext.Msg.alert('ϵͳ��ʾ','����������Ѿ����ڣ�');
						return;
					}
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
			Ext.MessageBox.alert('��Ϣ��ʾ','��ѡ����Ҫɾ����������룡');
			return;
		}
		
		Ext.Msg.confirm('����', 'ȷ��Ҫɾ�����������', function(btn, text){
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
    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
        	}
		});
	}
	
});