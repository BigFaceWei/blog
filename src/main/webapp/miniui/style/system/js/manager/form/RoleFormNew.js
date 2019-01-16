Ext.RoleFormNew = Ext.extend(Ext.form.FormPanel, {
	
	title : '��ɫ��Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		
		var store = this.store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessionsByOrganGrade',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		//store.load();
		
		store.on('load', function() {
			store.insert(0, new Ext.data.Record({
				PROFESSION_ID: undefined,
				PROFESSION_NAME: '��ѡ��...'
			}));
		});
		
		this.items = [{
			fieldLabel: '��ɫID',
			name: 'ROLEID',
			xtype:'hidden'
		}, {
			fieldLabel: '<font color="red">*</font>��ɫ��',
			name: 'ROLENAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: '��ɫ������Ϊ�գ�����д'
		}, {
			fieldLabel: '����רҵ',
			hiddenName: 'PROFESSION_ID',
			xtype:'combo',
			store: store, 
            valueField :"PROFESSION_ID",  
            displayField: "PROFESSION_NAME",  
            emptyText:'��ѡ������רҵ...',//Ĭ��ֵ  
            editable: false,//����������  
            triggerAction: 'all',
	        width: 250,
	        listeners: {//������¼���combo
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
		}, {
			fieldLabel: '������λ',
			name: 'ORGANID',
			xtype:'hidden'
		}, {
			fieldLabel: '��ɫ����',
			name: 'ORGANGRADE',
			xtype:'hidden'
		}, {
			fieldLabel: '��ɫ����',
			name: 'ROLETYPE',
			xtype:'hidden',
			value: 'WKF'
		}, {
			fieldLabel: '��ɫ����',
			name: 'DESCRIPTION',
			xtype:'textarea',
			width: 250
		}/*, {
			xtype: 'checkboxgroup',
			items: [{
				boxLabel: 'Ĭ�Ͻ�ɫ(�����û������ڸý�ɫ)',
				name: 'DEFAULTROLE',
				xtype:'checkbox',
				width: 250,
				inputValue: 'Y'
			}]
		}, {
			xtype: 'checkboxgroup',
			items: [{
				boxLabel: '����(�����ͬ����λ)',
				name: 'SHARED',
				xtype:'checkbox',
				width: 250,
				inputValue: 1
			}]
		}*/];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.saveUsergroup
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.removeUsergroup
		}];
		
		Ext.RoleFormNew.superclass.initComponent.call(this);
	},
	
	loadProfression: function(pId) {
		var me = this;
		Ext.apply(me.store.baseParams, {
			organgradeId: pId
		});
		me.store.reload();		
	},
	
	loadUsergroup: function(roleId) {
		var me = this;
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/usergroup.do?method=get&roleId=' + roleId,
			method: 'GET',
			success: function(form, action) {
				Ext.apply(me.store.baseParams, {
					organgradeId: action.result.data.ORGANGRADE,
					roleType: action.result.data.ROLETYPE
				});
			}
		});
	},
	
	operFlag: 2,
	
	saveUsergroup: function() {
		var _this = this;
		if (this.getForm().isValid()) {
			Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/usergroup.do?method=save',
			params: {roleInfo: Ext.encode(this.getForm().getValues())},
			success: function (response, opts) {
    			var tree = Ext.getCmp('roleManagerTree');
	    			var sm = tree.getSelectionModel();
	            	var node = sm.getSelectedNode();
	            	
	            	if(_this.operFlag == 2) {
	            		if (_this.getForm().getValues().PROFESSION_ID == '' && node.parentNode.attributes.nodeflag == 'profession') {
	            			node.parentNode.parentNode.reload(function(n) {
			        			var fNode = n.findChild('id', node.id);
			        			if(fNode) {
		            				fNode.fireEvent('click', fNode);
		            				
		            				tree.getLayoutTarget().scroll('b', 60);
		            			}
			        		});
	            		} else if ( node.parentNode.attributes.nodeflag == 'profession') {
	            			node.parentNode.parentNode.reload(function(n) {
			        			var fNode = n.findChild('id', node.id);
			        			if(fNode) {
		            				fNode.fireEvent('click', fNode);
		            				
		            				tree.getLayoutTarget().scroll('b', 60);
		            			}
			        		});
	            		} else {
			        		node.parentNode.reload(function(n) {
			        			var fNode = n.findChild('id', node.id);
			        			if(fNode) {
		            				fNode.fireEvent('click', fNode);
		            				
		            				tree.getLayoutTarget().scroll('b', 60);
		            			}
			        		});
	            		}
	            	} else {
	            		node.reload(function(n) {
		        			var fNode = n.findChild('id', response.responseText);
		        			if(fNode) {
	            				fNode.fireEvent('click', fNode);
	            				
	            				tree.getLayoutTarget().scroll('b', 60);
	            			}
		        		});
	            		
	            	}
	    		},
	    		failure: function() {
	        		Ext.Msg.alert('ϵͳ��Ϣ','��ɫ����ʧ�ܣ�');
	        	}
			});
		}
		
		
    },
    
    removeUsergroup: function() {
    	var _this = this;
    	var role = this.getForm().getValues();
    	
    	if(!role.ROLEID || role.ROLEID == '') return;
    	
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���ý�ɫ��',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/usergroup.do?method=delete&roleId=' + role.ROLEID,
    					success: function (options, success, response) {
    		    			var tree = Ext.getCmp('roleManagerTree');
    		    			var sm = tree.getSelectionModel();
    		            	var node = sm.getSelectedNode();
    		            	
    		            	node.parentNode.reload(function(n) {
    		            		var fNode = n.firstChild;
		            			while(fNode.isLeaf() != true)
		            				fNode = fNode.nextSibling;
		            				
		            			if(fNode && fNode.isLeaf() == true) fNode.fireEvent('click', fNode);
    		            		
    		            		tree.getLayoutTarget().scroll('b', 60);
    		            	});
    		            	
    		            	_this.getForm().reset();
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ����ɫʧ�ܣ�');
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.WARNING
    			
    	});
    	
    }
    
});