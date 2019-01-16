Ext.HasGrantUsersTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	initComponent: function() {
	
		this.selModel = new Ext.tree.MultiSelectionModel();
		
		this.tbar = [{
			iconCls: 'delete',
			text: '删除',
			scope: this,
			handler: this.deleteUsers
		},{
			iconCls: 'delete',
			text: '删除全部',
			scope: this,
			handler: this.deleteAllUsers
		}];
	
		Ext.HasGrantUsersTree.superclass.initComponent.call(this, arguments);
		
		this.addEvents('afterRemove');
	},
	
	loadUsersByRoleId: function(roleId, areaNo, showAll){
		var _this = this;
		this.roleId = roleId;
		this.areaNo = areaNo;
		Ext.apply(
				this.plugins[0], {
					saveUrl: contextpath + '/tbp/sysmanager/usergroup.do?method=updateUsers&roleId=' + roleId}),
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/usergroup.do?method=selectGrantUsers&showAll=' + showAll + '&areaNo=' + areaNo + '&roleId=' + roleId
			})
		}));
	},
	
	deleteUsers: function() {
		var _this = this;
		
		var sm = this.getSelectionModel();
		var userIds = [];
		
		if(sm.getSelectedNodes().length < 1) {
			alert('请选择您要删除的用户！');
			return;
		}
		
		Ext.each(sm.getSelectedNodes(), function(node) {
			userIds.push(node.id);
		});
		
		var masker = new Ext.LoadMask(this.getEl(), {
        	msg: '正在保存，请稍后...'
        });
        masker.show();
        
        Ext.Ajax.request({
     	   url: contextpath + '/tbp/sysmanager/usergroup.do?method=removeUsers',
     	   params: {roleId: _this.roleId, userIds: userIds.join(',')},
     	   success: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   if(response.responseText != '1') {
     			   alert('保存失败！');
     		   } else {
     			  _this.loadUsersByRoleId(_this.roleId, _this.areaNo);
     			 _this.fireEvent('afterRemove');
     		   } 
     	   },
     	   failure: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   alert('保存失败！');
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
        	msg: '正在保存，请稍后...'
        });
        masker.show();
        
        Ext.Ajax.request({
     	   url: contextpath + '/tbp/sysmanager/usergroup.do?method=removeUsers',
     	   params: {roleId: _this.roleId, userIds: userIds.join(',')},
     	   success: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   if(response.responseText != '1') {
     			   alert('保存失败！');
     		   } else {
     			  _this.loadUsersByRoleId(_this.roleId, _this.areaNo);
     			 _this.fireEvent('afterRemove');
     		   } 
     	   },
     	   failure: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   alert('保存失败！');
     	   }
     	});
	}
});