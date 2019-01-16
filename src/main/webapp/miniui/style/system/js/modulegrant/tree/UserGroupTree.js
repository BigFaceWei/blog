Ext.UserGroupTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	initComponent: function() {
		
		this.tbar = ['�û�������',{
			xtype: 'textfield',
			name: 'roleCnName',
			width: 130
		}, {
			iconCls: 'search',
			text: '��ѯ',
			scope: this,
			handler: this.queryRole
		}];
		
		Ext.UserGroupTree.superclass.initComponent.call(this);
		
		this.addEvents('afterNodeChecked');
	},
	
	loadMenuUserGroup: function(menuId, moduleId, gradeId, roleCnName){
		
		var _this = this;
		this.menuId = menuId;
		this.moduleId = moduleId;
		this.gradeId = gradeId;
		
		Ext.apply(this.plugins[0], {
			doCheck: function(node, checked) {
				var masker = new Ext.LoadMask(_this.getEl(), {
		        	msg: '���ڱ��棬���Ժ�...'
		        });
		        masker.show();
		        
		        var method = 'updateUserGroups';
		        if(node.isLeaf() === false) {
					method = 'updateUsergroupsByPro';
		        }
		        Ext.Ajax.request({
		     	   url: contextPath + '/tbp/sysmanager/menu.do?method='+method+'&areaNo='+areaNo+'&isSuperAdmin='+isSuperAdmin+'&gradeId='+gradeId+'&moduleId=' + moduleId,
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
		});
		
		if(!(gradeId && menuId)) return;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			id: 'menuUsergroups',
			loader: new Ext.tree.TreeLoader({
				url : contextPath + '/tbp/sysmanager/menu.do?method=usergroups&areaNo='+areaNo+'&isSuperAdmin='+isSuperAdmin+'&gradeId='+gradeId+'&menuId=' + menuId + '&moduleId=' + moduleId +'',
				method: 'POST',
				baseParams: {roleCnName: roleCnName},
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							loader.baseParams.professionId = node.id;
						} else {
							loader.baseParams.professionId = null;
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
	
	queryRole: function() {
    	var _this = this;
    	var roleCnName = Ext.get('roleCnName').getValue();
    	this.roleCnName = roleCnName;
    	_this.loadMenuUserGroup(_this.menuId, _this.moduleId, _this.gradeId, roleCnName);
    }
});