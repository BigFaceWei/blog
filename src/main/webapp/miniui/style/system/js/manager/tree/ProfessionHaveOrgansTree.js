/**
 * ��Ȩ����-->רҵ����-->����Ȩ�Ļ���
 */
Ext.ProfessionHaveOrgansTree = Ext.extend(Ext.tree.TreePanel, {
	
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
			handler: this.deleteOrgans
		},{
			iconCls: 'delete',
			text: 'ɾ��ȫ��',
			scope: this,
			handler: this.deleteAllOrgans
		}];
	
		Ext.ProfessionHaveOrgansTree.superclass.initComponent.call(this, arguments);
		
		this.addEvents('afterRemove');
	},
	
	loadOrgansByProfessionId: function(professionId, organId){
		var _this = this;
		this.professionId = professionId;
		Ext.apply(
				this.plugins[0], {
					saveUrl: contextpath + '/tbp/sysmanager/manager.do?method=updateOrgans&professionId=' + professionId}),
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/manager.do?method=selectGrantOrgans&professionId=' + professionId + '&filterOrganId=' +organId
			})
		}));
	},
	
	deleteOrgans: function() {
		var _this = this;
		
		var sm = this.getSelectionModel();
		var organIds = [];
		
		if(sm.getSelectedNodes().length < 1) {
			alert('��ѡ����Ҫɾ���Ļ�����');
			return;
		}
		
		Ext.each(sm.getSelectedNodes(), function(node) {
			organIds.push(node.id);
		});
		
		var masker = new Ext.LoadMask(this.getEl(), {
        	msg: '���ڱ��棬���Ժ�...'
        });
        masker.show();
        
        Ext.Ajax.request({
     	   url: contextpath + '/tbp/sysmanager/manager.do?method=removeOrgans',
     	   params: {professionId: _this.professionId, organIds: organIds.join(',')},
     	   success: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   if(response.responseText != '1') {
     			   alert('����ʧ�ܣ�');
     		   } else {
     			  _this.loadOrgansByProfessionId(_this.professionId);
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
	
	deleteAllOrgans: function() {
		var _this = this;
		
		var root = this.getRootNode();
		var organIds = [];
		
		Ext.each(root.childNodes, function(node) {
			organIds.push(node.id);
		});
		
		var masker = new Ext.LoadMask(this.getEl(), {
        	msg: '���ڱ��棬���Ժ�...'
        });
        masker.show();
        
        Ext.Ajax.request({
     	   url: contextpath + '/tbp/sysmanager/manager.do?method=removeOrgans',
     	   params: {professionId: _this.professionId, organIds: organIds.join(',')},
     	   success: function(response, opts) {
     		   masker.hide();
     		   Ext.destroy(masker);
     		   if(response.responseText != '1') {
     			   alert('����ʧ�ܣ�');
     		   } else {
     			  _this.loadOrgansByProfessionId(_this.professionId);
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