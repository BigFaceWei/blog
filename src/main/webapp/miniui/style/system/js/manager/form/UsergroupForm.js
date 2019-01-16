Ext.UsergroupForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�û�����Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		
		var store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessions',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		store.load();
		
		this.items = [{
			fieldLabel: '�û���ID',
			name: 'ROLEID',
			xtype:'hidden'
		}, {
			fieldLabel: '<font color="red">*</font>�û�����',
			name: 'ROLENAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: '�û���������Ϊ�գ�����д'
		}, {
			fieldLabel: '����רҵ',
			hiddenName: 'PROFESSION_ID',
			xtype:'combo',
			store: store, 
            valueField :"PROFESSION_ID",  
            displayField: "PROFESSION_NAME",  
            emptyText:'��ѡ������רҵ...',//Ĭ��ֵ
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
			name: 'ROLETYPE',
			xtype:'hidden'
		}, {
			fieldLabel: '�û�������',
			name: 'DESCRIPTION',
			xtype:'textarea',
			width: 250
		}, {
			xtype: 'checkboxgroup',
			items: [{
				boxLabel: 'Ĭ���û���(�����û������ڸ��û���)',
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
		}];
		
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
		
		Ext.UsergroupForm.superclass.initComponent.call(this);
	},
	
	loadUsergroup: function(roleId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/usergroup.do?method=get&roleId=' + roleId,
			method: 'GET'
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
    			var tree = Ext.getCmp('navigation-tree');
    			var sm = tree.getSelectionModel();
            	var node = sm.getSelectedNode();
            	
            	if(_this.operFlag == 2) {
            		var pNode256 = node.parentNode;
	            	var pGroup;
	            	if(pNode256.attributes.organtype != 256) {
	            		pGroup = pNode256;
	            		pNode256 = pNode256.parentNode;
	            	}
	            	
	            	pNode256.parentNode.reload(function(n) {
	            		var allRoleNode = n.findChild('organtype', 256);
	            		allRoleNode.expand();
	            		
	            		var fNode = allRoleNode.findChild('id', node.id);
            			if(fNode) {
            				fNode.fireEvent('click', fNode);
            			} else {
            				for(var i=0, ilen = allRoleNode.childNodes.length; i<ilen; i++) {
            					var curNode = allRoleNode.childNodes[i];
            					if(curNode.isLeaf() != true) {
            						curNode.expand();
            						
            						var myNode = curNode.findChild('id', node.id);
            						if(myNode) {
            							myNode.fireEvent('click', myNode);
            							break;
            						} else {
            							curNode.collapse();
            						}
            						
            						
            					}
            				}
            			}
	            		
	            		tree.getLayoutTarget().scroll('b', 60);
            		});
            	} else {
            		if(node.attributes.organtype == 256)
            			node = node.parentNode;
            		
            		node.reload(function(n) {
            			var tree = n.getOwnerTree();
            			var allRoleNode = n.findChild('organtype', 256);
            			if(allRoleNode.isExpanded() != true) allRoleNode.expand();
            			
            			var _selectedNode = allRoleNode.findChild('id', response.responseText);
            			
            			if(!_selectedNode) {
            				
	            			for(var i=0, ilen = allRoleNode.childNodes.length; i<ilen; i++) {
	            				var iNode = allRoleNode.childNodes[i];
	            				if(iNode.isLeaf() != true) {
	            					var iexpand = iNode.isExpanded();
	            					if(iexpand != true) iNode.expand();
	            					var _selectedNode = iNode.findChild('id', response.responseText);
	            					if(_selectedNode)
	            						break;
	            					if(iexpand == false) iNode.collapse();
	            				}
	            			}
            			
            			}
            			
            			_selectedNode.fireEvent('click', _selectedNode);
            			tree.getLayoutTarget().scroll('b', 60);
	            		});
	            	}
	    		},
	    		failure: function() {
	        		alert('�û��鴴��ʧ�ܣ�');
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
    		msg: '��ȷ��Ҫɾ�����û�����',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/usergroup.do?method=delete&roleId=' + role.ROLEID,
    					success: function (options, success, response) {
    		    			var tree = Ext.getCmp('navigation-tree');
    		    			var sm = tree.getSelectionModel();
    		            	var node = sm.getSelectedNode();
    		            	
    		            	var pNode256 = node.parentNode;
    		            	var pGroup;
    		            	if(pNode256.attributes.organtype != 256) {
    		            		pGroup = pNode256;
    		            		pNode256 = pNode256.parentNode;
    		            	}
    		            	
    		            	pNode256.parentNode.reload(function(n) {
    		            		var allRoleNode = n.findChild('organtype', 256);
    		            		allRoleNode.expand();
    		            		if(pGroup) pGroup = allRoleNode.findChild('text', pGroup.text);
    		            		if(pGroup) pGroup.expand();
    		            		
    		            		if(pGroup) {
    		            			var fNode = pGroup.firstChild;
    		            			fNode.fireEvent('click', fNode);
    		            		} else {
    		            			var fNode = allRoleNode.firstChild;
    		            			while(fNode.isLeaf() != true)
    		            				fNode = fNode.nextSibling;
    		            			fNode.fireEvent('click', fNode);
    		            		}
    		            		
    		            		tree.getLayoutTarget().scroll('b', 60);
    		            	});
    		            	
    		            	_this.getForm().reset();
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ���û���ʧ�ܣ�');
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.WARNING
    			
    	});
    	
    }
    
});