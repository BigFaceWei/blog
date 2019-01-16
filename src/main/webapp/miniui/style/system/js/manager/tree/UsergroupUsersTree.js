Ext.UsergroupUsersTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	initComponent: function() {
		
		this.tbar = ['用户名：',{
			xtype: 'textfield',
			name: 'queryUserName',
			width: 120
		}, {
			iconCls: 'search',
			text: '查询',
			scope: this,
			handler: this.queryUser
		},{
			iconCls: '',
			text: ' 显示全部',
			scope: this,
			handler: this.showAll
		},{
			iconCls: '',
			text: '展开所有',
			name: 'expandAll',
			scope: this,
			handler: this.expandAll
		},{
			iconCls: '',
			text: '收起所有',
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
					
					var msg = '你确定要将该机构下的所有人员加入到用户组当中?';
					if(checked == false)
						msg = '你确定要将该机构下的所有人员都不加入到用户组中?';
					
				    Ext.Msg.show({
					   title:'系统提示',
					   msg: msg,
					   buttons: Ext.Msg.OKCANCEL,
					   fn: function(buttonId) {
					       if (buttonId == 'ok') {
					       	var masker = new Ext.LoadMask(_this.getEl(), {
					        	msg: '正在保存，请稍后...'
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
					     			   Ext.MessageBox.alert('系统提示','保存失败！');
					     		   } else {
					     			   _this.fireEvent('afterNodeChecked');
					     		   } 
					     	   },
					     	   failure: function(response, opts) {
					     		   masker.hide();
					     		   Ext.destroy(masker);
					     		   Ext.MessageBox.alert('系统提示','保存失败！');
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
			        	msg: '正在保存，请稍后...'
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
			     			   Ext.MessageBox.alert('系统提示','保存失败！');
			     		   } else {
			     			   _this.fireEvent('afterNodeChecked');
			     		   } 
			     	   },
			     	   failure: function(response, opts) {
			     		   masker.hide();
			     		   Ext.destroy(masker);
			     		   Ext.MessageBox.alert('系统提示','保存失败！');
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
					        	msg: '正在加载，请稍后...'
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