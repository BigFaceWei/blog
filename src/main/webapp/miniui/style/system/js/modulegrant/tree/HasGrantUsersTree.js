Ext.HasGrantUsersTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	initComponent: function() {
	
		this.selModel = new Ext.tree.MultiSelectionModel();
		
		this.tbar = [{
			iconCls: 'delete',
			text: 'ɾ��',
			scope: this,
			handler: this.deleteUsers
		},{
			iconCls: 'delete',
			text: 'ɾ��ȫ��',
			scope: this,
			handler: this.deleteAllUsers
		}];
	
		Ext.HasGrantUsersTree.superclass.initComponent.call(this, arguments);
		
		this.addEvents('afterRemove');
	},
	
	loadHasGrantUsers: function(menuId){
		var _this = this;
		this.menuId = menuId;
		Ext.apply(
				this.plugins[0], {
					saveUrl: contextPath + '/tbp/sysmanager/menu.do?method=updateUsers&menuId=' + menuId}),
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : contextPath + '/tbp/sysmanager/menu.do?method=selectGrantUsers&isSuperAdmin=' + isSuperAdmin + '&areaNo=' + areaNo + '&menuId=' + menuId
			})
		}));
	},
	
	deleteUsers: function() {
		var _this = this;
		
		var sm = this.getSelectionModel();
		var userIds = [];
		
		if(sm.getSelectedNodes().length < 1) {
			alert('��ѡ����Ҫɾ�����û���');
			return;
		}
		
		Ext.each(sm.getSelectedNodes(), function(node) {
			userIds.push(node.id);
		});
		
		var masker = new Ext.LoadMask(this.getEl(), {
        	msg: '���ڱ��棬���Ժ�...'
        });
        masker.show();
        
        Ext.Ajax.request({
     	   url: contextPath + '/tbp/sysmanager/menu.do?method=removeUsers',
     	   params: {menuId: _this.menuId, userIds: userIds.join(',')},
     	   success: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   if(response.responseText != '1') {
     			   alert('����ʧ�ܣ�');
     		   } else {
     			  _this.loadHasGrantUsers(_this.menuId);
     			 _this.fireEvent('afterRemove');
     		   } 
     	   },
     	   failure: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   alert('����ʧ�ܣ�');
     	   }
     	});
	},
	
	deleteAllUsers: function() {
		var _this = this;
		
		var root = this.getRootNode();
		var userIds = [];
		
		Ext.each(root.childNodes, function(node) {
			userIds.push(node.id);
		});
		
		var masker = new Ext.LoadMask(this.getEl(), {
        	msg: '���ڱ��棬���Ժ�...'
        });
        masker.show();
        
        Ext.Ajax.request({
     	   url: contextPath + '/tbp/sysmanager/menu.do?method=removeUsers',
     	   params: {menuId: _this.menuId, userIds: userIds.join(',')},
     	   success: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   if(response.responseText != '1') {
     			   alert('����ʧ�ܣ�');
     		   } else {
     			  _this.loadHasGrantUsers(_this.menuId);
     			 _this.fireEvent('afterRemove');
     		   } 
     	   },
     	   failure: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   alert('����ʧ�ܣ�');
     	   }
     	});
	}
});