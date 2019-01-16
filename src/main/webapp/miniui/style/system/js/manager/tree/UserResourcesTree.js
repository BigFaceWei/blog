Ext.UserResourcesTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	/*initComponent: function() {
		var _this = this;
		this.tbar = [{
			iconCls: 'update',
			text: '����',
			scope: this,
			handler: function() {
				_this.expandAll();
				var params = [];
				params.push(_this.currentUserId);
				Ext.each(_this.getChecked(), function(node) {
					params.push(node.id);
				});
				
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/user.do?method=updateResources',
					params: {resources: Ext.encode(params)},
					success: function (response, opts) {
						if(response.responseText == '1')
							Ext.MessageBox.alert('ϵͳ��Ϣ','����ɹ���');
						else
							Ext.MessageBox.alert('ϵͳ��Ϣ',"����ʧ�ܣ�");
		    		},
		    		failure: function() {
		    			Ext.MessageBox.alert('ϵͳ��Ϣ','����ʧ�ܣ�');
		        	}
				});
			}
		}];
		Ext.UsergroupResourcesTree.superclass.initComponent.call(this);
	},
	
	currentUserId: undefined,*/
	
	loadResourcesByMenuId: function(userId, menuId){
		var _this = this;
		this.currentUserId = userId;
		
		Ext.apply(
				this.plugins[0], {
					saveUrl: contextpath + '/tbp/sysmanager/user.do?method=updateResources&userId=' + userId}),
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/resource.do?method=userMenu&userId=' + userId + '&menuId=' + menuId
			})
		}));
	}
	
});