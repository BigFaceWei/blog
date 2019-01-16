Ext.OrganForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '������Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
	
		var gradeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgangrades',
	    	fields: ['GRADEID', 'GRADENAME']
	    });
		gradeStore.load();
		
		var typeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgantypes',
	    	fields: ['TYPEID', 'TYPENAME']
	    });
		typeStore.load();
		
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
		
		var businessStore = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getBusiness',
		    fields: ['BUSINESS_ID','BUSINESS_NAME']  
		});
		businessStore.load();
	
		this.items = [{
			fieldLabel: '����ID',
			name: 'ORGANID',
			xtype: 'hidden'
		}, {
			fieldLabel: '<font color="red">*</font>��������',
			name: 'ORGANNAME',
			xtype:'textfield',
			allowBlank: false,
			blankText: '�������Ʋ���Ϊ�գ�����д',
			width: 250
		}, {
			fieldLabel: '��������',
			name: 'ORGANCODE',
			xtype:'hidden',
			maxLength: 20,
			width: 250
		}, {
			fieldLabel: '�ϼ���λ',
			name: 'PARENTID',
			xtype:'hidden'
		}, {
			fieldLabel: '��������',
			hiddenName: 'ORGANTYPE',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'TYPENAME',
	        valueField: 'TYPEID',
	        store: typeStore,
	        allowBlank: false,
			blankText: '�������Ͳ���Ϊ�գ�����д',
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
			hiddenName: 'ORGANKIND',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'KINDNAME',
	        valueField: 'KINDID',
	        store: kindStore,
	        width: 250//,
	        /*listeners:{//��������������
				'expand':function(combo, store, index){ 
					kindStore.reload();
				} 
			}*/
		}, {
			fieldLabel: '<font color="red">*</font>�������',
			hiddenName: 'AREANO',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'ZONE_NAME',
	        valueField: 'ZONE_NO',
	        store: areanoStore,
	        allowBlank: false,
			blankText: '������벻��Ϊ�գ�����д',
	        width: 250,
	        listeners: {//������¼���combo
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
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
	        width: 250,
	        listeners: {//������¼���combo
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
		}, {
			fieldLabel: 'ҵ������',
			hiddenName: 'BUSINESS_ID',
			xtype: 'lovcombo',
			store: businessStore, 
			hideOnSelect : false,   
            valueField :"BUSINESS_ID",  
            displayField: "BUSINESS_NAME",
            typeAhead : true,   
            emptyText:'��ѡ��ҵ������...',//Ĭ��ֵ  
            editable: false,//����������  
            triggerAction: 'all',
            //showSelectAll: true,//��ʾȫ��ѡ��
	        width: 250,
	        listeners: {//������¼���combo
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
		}, {
			fieldLabel: '�Ƿ�����',
			name: 'ISENABLED',
			xtype:'checkbox',
			checked: true,
			width: 250,
			inputValue: 1
		}];
		
		this.tbar = [{
			//id: 'organUpdate',
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.saveOrgan
		}, {
			//id: 'organDelete',
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.deleteOrgan
		}/*, '-', {
			text: '��������ά��',
			iconCls: 'add',
			scope: this,
			handler: function() {
				if(!this.win) {
					this.win = new Ext.Window({
						title: '���л�������',
						width: 300,
						height: 400,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.OrganGradeGrid({
							listeners: {
								afterModify: function() {
									gradeStore.reload();
								}
							}
						})
					});
				}
				this.win.show();
			}
		}, {
			text: '�������ά��',
			iconCls: 'add',
			scope: this,
			handler: function() {
				if(!this.kindWin) {
					this.kindWin = new Ext.Window({
						title: '���л������',
						width: 300,
						height: 400,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.OrganKindGrid({
							listeners: {
								afterModify: function() {
									kindStore.reload();
								}
							}
						})
					});
				}
				this.kindWin.show();
			}
		}, {
			iconCls: 'add',
			text : 'רҵά��',
			scope: this,
			handler: function(){
				if(!this.professionWin) {
					this.professionWin = new Ext.Window({
						title: 'רҵ������Ϣ',
						width: 350,
						height: 450,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.ProfessionGrid({
							listeners: {
								afterModify: function() {
									professionStore.reload();
								}
							}
						})
					});
				}
				this.professionWin.show();
			}
		}, {
			iconCls: 'add',
			text : '�������ά��',
			scope: this,
			handler: function(){
				if(!this.areanoWin) {
					this.areanoWin = new Ext.Window({
						title: '���������Ϣ',
						width: 500,
						height: 450,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.AreaNoGrid({
							listeners: {
								afterModify: function() {
									areanoStore.reload();
								}
							}
						})
					});
				}
				this.areanoWin.show();
			}
		}*/];
		
		Ext.OrganForm.superclass.initComponent.call(this);
		
		// ��һ�ַ��� override beforeBlur method   
	    Ext.override(Ext.ux.form.LovCombo, {      
	        beforeBlur: Ext.emptyFn      
	    });  
	},
	
	loadProfression: function(pId) {
		var me = this;
		Ext.apply(me.professionStore.baseParams, {
			organId: pId
		});
		me.professionStore.reload();		
	},
	
	loadOrgan: function(organId) {
		this.getForm().reset();
		var me = this;
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/organ.do?method=get&organId=' + organId,
			method: 'GET'
		});
	},
	
	// ������־��1��ʾ������2��ʾ�޸�
	operFlag: 2,
	
	saveOrgan: function() {
		var _this = this;
		if(this.getForm().isValid()){//����ͻ��˵���֤ͨ���򷵻���  
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
	            		if (tree.getRootNode().childNodes[0] != node) {
	            			node = node.parentNode;
	            		}
	            		node.reload(function(n) {
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
		}
		
    },
    
    deleteOrgan: function() {
    	var _this = this;
    	var organ = this.getForm().getValues();
    	
    	if(!organ.ORGANID || organ.ORGANID == '') return;
    	
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���û�����',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/organ.do?method=delete&organId=' + organ.ORGANID,
    					success: function (response, opts) {
    						if (response.responseText == 'success') {
    							var tree = Ext.getCmp('navigation-tree');
        		    			var sm = tree.getSelectionModel();
        		            	var node = sm.getSelectedNode();
        		            	node.parentNode.reload();
        		            	
        		            	_this.getForm().reset();
    						}
    		    			if (response.responseText == 'failure') {
    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�û��������¼��������û�������ɾ���¼��������û���'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ������ʧ�ܣ�'); 
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
    }
});