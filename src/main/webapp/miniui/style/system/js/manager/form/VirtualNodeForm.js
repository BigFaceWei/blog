Ext.VirtualNodeForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�ڵ���Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		var _this = this;
		var store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/areano.do?method=listVirtualNodes',
		    fields: ['TYPEID','TYPENAME']  
		});
		store.load();
		
		var gradeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgangrades',
	    	fields: ['GRADEID', 'GRADENAME']
	    });
		gradeStore.load();
		
		var kindStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgankinds',
	    	fields: ['KINDID', 'KINDNAME']
	    });
		kindStore.load();
		
		var professionStore = this.professionStore = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessions',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		//professionStore.load();
		
		var areanoStore = new Ext.data.JsonStore({
			fields: ['ZONE_NO','ZONE_NAME','ORGANGRADE'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listAreas'
		});
		areanoStore.load();
		
		var twoTree = new Ext.TwoTree();
		
		this.items = [{
			fieldLabel: '�ڵ�ID',
			name: 'ORGANID',
			xtype: 'hidden'
		}, {
			fieldLabel: '�ڵ�����',
			name: 'ORGANNAME',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '��������',
			name: 'ORGANCODE',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '�ϼ���λ',
			name: 'PARENTID',
			xtype:'hidden'
		}, {
			fieldLabel: '�ڵ�����',
			hiddenName: 'ORGANTYPE',
			xtype: 'combo',
			typeAhead: true,
	        mode: 'remote',
            triggerAction: 'all',
            forceSelection: true,//����ѡ��һ��  
	        store: store, 
            valueField :"TYPEID",  
            displayField: "TYPENAME",  
            emptyText:'��ѡ��ڵ�����...',//Ĭ��ֵ  
            blankText: '�ڵ�����Ϊ������',
            editable: false,//����������  
            allowBlank: false,
	        width: 250
		}, {
			fieldLabel: '<font color="red">*</font>��������',
			hiddenName: 'ORGANGRADE',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'GRADENAME',
	        valueField: 'GRADEID',
	        store: gradeStore,
	        allowBlank: false,
			blankText: '����������Ϊ�գ�����д',
	        width: 250
		}, {
			fieldLabel: '�������',
			name: 'ORGANKIND',
			xtype: 'hidden',
			value: 2,
	        width: 250
		}, {
			fieldLabel: '<font color="red">*</font>�������',
			name: 'AREANO',
			xtype: 'hidden',
			/*hiddenName: 'AREANO',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'ZONE_NAME',
	        valueField: 'ZONE_NO',
	        store: areanoStore,
	        allowBlank: false,
			blankText: '������벻��Ϊ�գ�����д',*/
	        width: 250
		}, {
			fieldLabel: '����רҵ',
			hiddenName: 'PROFESSION_ID',
			xtype: 'lovcombo',
			store: professionStore, 
			hideOnSelect : false,   
            valueField :"PROFESSION_ID",  
            displayField: "PROFESSION_NAME",
            typeAhead : true,   
            emptyText:'��ѡ������רҵ...',//Ĭ��ֵ  
            editable: false,//����������  
            triggerAction: 'all',
            //showSelectAll: true,//��ʾȫ��ѡ��
	        width: 250  
		}, {
			fieldLabel: '�Ƿ�����',
			name: 'ISENABLED',
			xtype:'hidden',
			checked: true,
			width: 250,
			inputValue: 1
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.saveOrgan
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.deleteOrgan
		}/*, {
			iconCls: 'add',
			text : '�ڵ�����ά��',
			scope: this,
			handler: function() {
				if(!this.win) {
					this.win = new Ext.Window({
						title: '�ڵ�������Ϣ',
						width: 350,
						height: 450,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.NodeGrid({
							listeners: {
								afterModify: function() {
									store.reload();
									twoTree.getStore().reload();
									_this.cacher.clear();
								}
							}
						})
					});
				}
				this.win.show();
			}
		}, {
			iconCls: 'add',
			text : '�Ҽ��˵�����',
			scope: this,
			handler: function() {
				if(!this.rightWin) {
					this.rightWin = new Ext.Window({
						title: '�Ҽ��˵�����',
						width: 480,
						height: 350,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: twoTree
					});
				}
				this.rightWin.show();
			}
		}*/];
		
		Ext.VirtualNodeForm.superclass.initComponent.call(this);
		
		twoTree.on('afterSave', function() {
			_this.cacher.clear();
		});
	},
	
	loadOrgan: function(organId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/organ.do?method=get&organId=' + organId,
			method: 'GET'
		});
	},
	
	// ������־��1��ʾ������2��ʾ�޸�
	operFlag: 2,
    
	saveOrgan: function() {
		var _this = this;
		Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/organ.do?method=save',
			params: {organInfo: Ext.encode(this.getForm().getValues())},
			success: function (response, opts) {
				var msg = formReply(response);
				if(msg === false) return;
				
    			var tree = Ext.getCmp('navigation-tree');
    			var sm = tree.getSelectionModel();
            	var node = sm.getSelectedNode();
            	
            	if(_this.operFlag == 2) {
            		node.parentNode.reload(function(n) {
            			var selectedNode = tree.getNodeById(msg);
            			selectedNode.fireEvent('click', selectedNode);
            		});
            	} else {
            		node.reload(function(n) {
            			var selectedNode = tree.getNodeById(msg);
            			selectedNode.fireEvent('click', selectedNode);
            		});
            	}
    		},
    		failure: function() {
    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
        	}
		});
		
    },
    
    deleteOrgan: function() {
    	var _this = this;
    	var organ = this.getForm().getValues();
    	
    	if(!organ.ORGANID || organ.ORGANID == '') return;
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���ýڵ���',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
	    		if (buttonId == 'ok'){
			    	Ext.Ajax.request({
						url: contextpath + '/tbp/sysmanager/organ.do?method=delete&organId=' + organ.ORGANID,
						success: function (options, success, response) {
			    			var tree = Ext.getCmp('navigation-tree');
			    			var sm = tree.getSelectionModel();
			            	var node = sm.getSelectedNode();
			            	node.parentNode.reload();
			            	
			            	_this.getForm().reset();
			            	if (response.responseText == 'failure') {
    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�ýڵ�����¼��������û�������ɾ���¼��������û���'); 
    		    			}
			    		},
			    		failure: function() {
			        		Ext.MessageBox.alert('ϵͳ��Ϣ','ɾ���ڵ�ʧ�ܣ�');
			        	}
					});
	    		}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
    }
});