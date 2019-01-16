Ext.UserGroupTreeOther = Ext.extend(Ext.tree.TreePanel, {
	
	title: '�û�����Ȩ',
	width: 300,
	margins: '15 5 15 15',
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	
	initComponent: function() {
		var _this = this;
		this.tbar = [{
			iconCls: 'update',
			text: '����',
			scope: this,
			handler: function() {
			
				_this.expandAll();
			
				var params = [];
				params.push(_this.currentMenuId);
				Ext.each(_this.getChecked(), function(node) {
					params.push(node.id);
				});
				
				Ext.Ajax.request({
					url: contextPath + '/tbp/sysmanager/menu.do?method=updateUserGroupsOther&areaNo='+areaNo+'',
					params: {usergroups: Ext.encode(params)},
					success: function (response, opts) {
						if(response.responseText == '1')
							Ext.MessageBox.alert('ϵͳ��ʾ','����ɹ���');
						else
							Ext.MessageBox.alert('ϵͳ��ʾ',"����ʧ�ܣ�");
		    		},
		    		failure: function() {
		        		Ext.MessageBox.alert('ϵͳ��ʾ','����ʧ�ܣ�');
		        	}
				});
				
			}
		}];
		Ext.UserGroupTree.superclass.initComponent.call(this);
	},
	
	currentMenuId: undefined,
	
	loadMenuUserGroup: function(menuId, gradeId){
		this.currentMenuId = menuId;
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : contextPath + '/tbp/sysmanager/menu.do?method=usergroupsOther&isSuperAdmin='+isSuperAdmin+'&organId='+unitId+'&menuId=' + menuId
			})
		}));
	}
	
});