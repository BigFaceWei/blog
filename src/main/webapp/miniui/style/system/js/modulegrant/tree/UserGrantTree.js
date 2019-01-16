Ext.UserGrantTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	initComponent: function() {
		
		this.tbar = ['�û�����',{
			xtype: 'textfield',
			name: 'queryUserCNName',
			width: 150
		}, {
			iconCls: 'search',
			text: '��ѯ',
			scope: this,
			handler: this.queryUser
		}];
		
		Ext.UserGrantTree.superclass.initComponent.call(this, arguments);
		
		this.addEvents('afterNodeChecked');
	},
	
	loadUsers: function(menuId, organId, userCNName){
		
		var _this = this;
		this.menuId = menuId;
		this.organId = organId;
		
		Ext.apply(this.plugins[0], {
			doCheck: function(node, checked) {
				if (node.isLeaf() == false) {
					if(_this.plugins[0].rollback == 1){
						delete _this.plugins[0].rollback;
						return;
					}
					
					var msg = '��ȷ��Ҫ���û����µ�������Ա����Ȩ�ò˵�����?';
					if(checked == false)
						msg = '��ȷ��Ҫ���û����µ�������Ա��ȡ����Ȩ�ò˵���?';
					
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
					     	   url: contextPath + '/tbp/sysmanager/menu.do?method=' + method + '&menuId=' + menuId,
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
			     	   url: contextPath + '/tbp/sysmanager/menu.do?method=' + method + '&menuId=' + menuId,
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
			id: 'menuUsers',
			loader: new Ext.tree.TreeLoader({
				url : contextPath + '/tbp/sysmanager/menu.do?method=users&menuId=' + menuId,
				method: 'POST',
				baseParams: {userCNName: userCNName},
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							loader.baseParams.organId = node.id;
						} else {
							loader.baseParams.organId = unitId;
						}
						
						if(!_this.loadingMasker) {
							_this.loadingMasker = new Ext.LoadMask(_this.getEl(), {
					        	msg: '���ڼ��أ����Ժ�...'
					        });
						}
						_this.loadingMasker.show();
					},
					
					load: function() {
						_this.loadingMasker.hide();
					},
					
					loadexception: function() {
						_this.loadingMasker.hide();
					}
					
				}
			})
		}));
		
	},
    
    queryUser: function() {
    	var _this = this;
    	var userCNName = Ext.get('queryUserCNName').getValue();
    	this.userCNName = userCNName;
    	_this.loadUsers(_this.menuId, _this.organId, userCNName);
    }
	
});