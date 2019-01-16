/**
 * ��Ȩ����-->רҵ����-->����������
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
		        	msg: '���ڱ��棬���Ժ�...'
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
		     			   alert('����ʧ�ܣ�');
		     		   } else {
		     			   _this.fireEvent('afterNodeChecked');
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
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			id: 'professionGrantTree',
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/manager.do?method=buildProfessionGrantTree',
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							loader.baseParams.organId = node.id;
							loader.baseParams.filterOrgan = organId;//����OrganId�Ƿ�Ϊ��������
						} else {
							loader.baseParams.organGrade = organgrade;
							loader.baseParams.professionId = professionId;
							loader.baseParams.filterOrgan = organId;//����OrganId�Ƿ�Ϊ��������
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
	}
	
});