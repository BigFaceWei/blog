/**
 * 授权管理-->专业管理-->机构部门树
 */
 
Ext.ProfessionOrganTree = Ext.extend(Ext.tree.TreePanel, {
	
	rootVisible: false,
	autoScroll: true,
	useArrows: true,
	plugins : ['treecheck'],
	
	initComponent: function() {
		Ext.ProfessionOrganTree.superclass.initComponent.call(this, arguments);
		
		this.addEvents('afterNodeChecked');
	},
	
	loadOrgans: function(professionId, organgrade, organId){
		var _this = this;
		
		Ext.apply(this.plugins[0], {
			doCheck: function(node, checked) {
				var masker = new Ext.LoadMask(this.tree.getEl(), {
		        	msg: '正在保存，请稍后...'
		        });
		        masker.show();
		        
		        var method = 'updateOrgans';
		        if(node.isLeaf() === false)
		        	method = 'updateOrgansByOrganId';
		        Ext.Ajax.request({
		     	   url: contextpath + '/tbp/sysmanager/manager.do?method=' + method + '&organgrade=' + organgrade + '&filterOrganId=' + organId + '&professionId=' + professionId,
		     	   params: {requestInfo: Ext.encode({nodeId: node.id, checked: checked})},
		     	   success: function(response, opts) {
		     		   masker.hide();
		     		   Ext.destroy(masker);
		     		   if(response.responseText != '1') {
		     			   alert('保存失败！');
		     		   } else {
		     			   _this.fireEvent('afterNodeChecked');
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
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			id: 'professionGrantTree',
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/manager.do?method=buildProfessionGrantTree',
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							loader.baseParams.organId = node.id;
							loader.baseParams.filterOrgan = organId;//根据OrganId是否为空来过滤
						} else {
							loader.baseParams.organGrade = organgrade;
							loader.baseParams.professionId = professionId;
							loader.baseParams.filterOrgan = organId;//根据OrganId是否为空来过滤
						}
						
						if(!_this.loadingMasker) {
							_this.loadingMasker = new Ext.LoadMask(_this.getEl(), {
					        	msg: '正在加载，请稍后...'
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
	}
	
});