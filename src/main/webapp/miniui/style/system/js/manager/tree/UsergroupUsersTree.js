Ext.UsergroupUsersTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	initComponent: function() {
		
		this.tbar = ['�û�����',{
			xtype: 'textfield',
			name: 'queryUserName',
			width: 120
		}, {
			iconCls: 'search',
			text: '��ѯ',
			scope: this,
			handler: this.queryUser
		},{
			iconCls: '',
			text: ' ��ʾȫ��',
			scope: this,
			handler: this.showAll
		},{
			iconCls: '',
			text: 'չ������',
			name: 'expandAll',
			scope: this,
			handler: this.expandAll
		},{
			iconCls: '',
			text: '��������',
			name: 'collapseAll',
			scope: this,
			handler: this.collapseAll
		}];
		
		Ext.UsergroupUsersTree.superclass.initComponent.call(this, arguments);
		
		this.addEvents('afterNodeChecked');
	},
	
	loadUsersByRoleId: function(roleId, organId, username, areaNo, showAll){
		
		var _this = this;
		this.roleId = roleId;
		this.organId = organId;
		this.areaNo = areaNo;
		this.showAll = showAll;
		
		Ext.apply(this.plugins[0], {
			doCheck: function(node, checked) {
				if (node.isLeaf() == false) {
					if(_this.plugins[0].rollback == 1){
						delete _this.plugins[0].rollback;
						return;
					}
					
					var msg = '��ȷ��Ҫ���û����µ�������Ա���뵽�û��鵱��?';
					if(checked == false)
						msg = '��ȷ��Ҫ���û����µ�������Ա�������뵽�û�����?';
					
				    Ext.Msg.show({
					   title:'ϵͳ��ʾ',
					   msg: msg,
					   buttons: Ext.Msg.OKCANCEL,
					   fn: function(buttonId) {
					       if (buttonId == 'ok') {
					       	var masker = new Ext.LoadMask(_this.getEl(), {
					        	msg: '���ڱ��棬���Ժ�...'
					        });
					        masker.show();
					        
					        var method = 'updateUsers';
					        if(node.isLeaf() === false)
					        	method = 'updateUsersByOrganId';
					        Ext.Ajax.request({
					     	   url: contextpath + '/tbp/sysmanager/usergroup.do?method=' + method + '&roleId=' + roleId,
					     	   params: {requestInfo: Ext.encode({nodeId: node.id, checked: checked})},
					     	   success: function(response, opts) {
					     		   masker.hide();
					     		   Ext.destroy(masker);
					     		   if(response.responseText != '1') {
					     			   Ext.MessageBox.alert('ϵͳ��ʾ','����ʧ�ܣ�');
					     		   } else {
					     			   _this.fireEvent('afterNodeChecked');
					     		   } 
					     	   },
					     	   failure: function(response, opts) {
					     		   masker.hide();
					     		   Ext.destroy(masker);
					     		   Ext.MessageBox.alert('ϵͳ��ʾ','����ʧ�ܣ�');
					     	   }
					     	});
					     	
					       } else {
					       	_this.plugins[0].rollback = 1;
					       	_this.plugins[0].handlerCheck(node, !checked);
					       }
					   },
					   icon: Ext.MessageBox.QUESTION
					});
				} else {
					var masker = new Ext.LoadMask(_this.getEl(), {
			        	msg: '���ڱ��棬���Ժ�...'
			        });
			        masker.show();
			        
			        var method = 'updateUsers';
			        if(node.isLeaf() === false)
			        	method = 'updateUsersByOrganId';
			        Ext.Ajax.request({
			     	   url: contextpath + '/tbp/sysmanager/usergroup.do?method=' + method + '&roleId=' + roleId,
			     	   params: {requestInfo: Ext.encode({nodeId: node.id, checked: checked})},
			     	   success: function(response, opts) {
			     		   masker.hide();
			     		   Ext.destroy(masker);
			     		   if(response.responseText != '1') {
			     			   Ext.MessageBox.alert('ϵͳ��ʾ','����ʧ�ܣ�');
			     		   } else {
			     			   _this.fireEvent('afterNodeChecked');
			     		   } 
			     	   },
			     	   failure: function(response, opts) {
			     		   masker.hide();
			     		   Ext.destroy(masker);
			     		   Ext.MessageBox.alert('ϵͳ��ʾ','����ʧ�ܣ�');
			     	   }
			     	});
				}
			}
		});
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			id: 'usergroupUsers',
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/usergroup.do?method=users&areaNo='+areaNo+'&showAll='+showAll+'&roleId=' + roleId,
				baseParams: {userCNName: username},
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							loader.baseParams.organId = node.id;
							loader.baseParams.loadOtherGrade = false;
						} else {
							loader.baseParams.organId = organId;
							loader.baseParams.loadOtherGrade = true;
						}
						
						/*if(!_this.loadingMasker) {
							_this.loadingMasker = new Ext.LoadMask(_this.getEl(), {
					        	msg: '���ڼ��أ����Ժ�...'
					        });
						}
						_this.loadingMasker.show();*/
					},
					
					load: function() {
						//_this.loadingMasker.hide();
					},
					
					loadexception: function() {
						//_this.loadingMasker.hide();
					}
					
				}
			})
		}));
		
	},
    
    queryUser: function() {
    	var _this = this;
    	var username = Ext.get('queryUserName').getValue();
    	_this.loadUsersByRoleId(_this.roleId, _this.organId, username, _this.areaNo, _this.showAll);
    },
    
    showAll: function() {
    	var _this = this;
    	this.showAll = true;
    	var username = Ext.get('queryUserName').getValue();
    	_this.loadUsersByRoleId(_this.roleId, _this.organId, username, _this.areaNo, _this.showAll);
    	_this.fireEvent('afterNodeChecked');
    },
    
    expandAll: function() {
    	this.getRootNode().expand(true);
    },
    
     collapseAll: function() {
    	this.getRootNode().collapse(true);
    }
	
});