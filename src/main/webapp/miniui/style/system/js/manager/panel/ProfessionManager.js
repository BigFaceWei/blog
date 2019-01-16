Ext.ProfessionManager = function() {
	var _this = this;
	
	Ext.ProfessionManager.superclass.constructor.call(this, {
		title: '专业分配管理',
		layout: 'border',
		border: false,
		items: [_this.getProfessionManagerTree(), _this.getContentPanel()]
    });
    
};

Ext.extend(Ext.ProfessionManager, Ext.Panel, {
	
	getProfessionManagerTree: function() {
		if(! this.professionManagerTree) {
			var tree = this.professionManagerTree = new Ext.ProfessionManagerTree({
				id: 'professionManagerTree',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false
			});
			
			var me = this;
			tree.on('click', function(node) {
				if(node.attributes.iconCls == 'dispatchDept') {
					if(! this.professiongrant) {
						this.professiongrant = new Ext.ProfessionManagerOrganGrant({
							region: 'center',
							border: false
						});
						me.getContentPanel().add(this.professiongrant);
					}
					
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.professiongrant.getId());
					
					me.getContentPanel().doLayout();
					this.professiongrant.loadOrgansAndGrantOrgans(node.id, node.attributes.organgrade, '');
				}
			});
			
			var contextMenu = new Ext.menu.Menu({
	        items: [{
	            id: 'create_pro',
	            iconCls: 'create',
	            text: '新建',
	            menu: {
	        		items:[{
	        			id: 'create_profession1',
	        			iconCls: 'user',
	        			text: '新建【专业】'
	        		}],
	                listeners: {
	                    itemclick: function(item) {
				        	var sm = tree.getSelectionModel();
				        	var node = sm.getSelectedNode();
	                        switch (item.id) {
	                            case 'create_profession1':
		                            if(! this.profession) {
										this.profession = new Ext.ProfessionForm({
											operFlag: 1,
											treeType: 'PRO',
											region: 'center',
											border: false
										});
										this.profession.getForm().setValues({
		                            		ORGANGRADE: node.id
		                            	});
										me.getContentPanel().add(this.profession);
									}
									//this.profession.getForm().reset();
									var l = me.getContentPanel().getLayout();
									l.setActiveItem(this.profession.getId());
									
									me.getContentPanel().doLayout();
	                            	break;	
			                    case 'sortUp':
			                    	sort(this.contextNode, true);
			                    	break;
			                    case 'sortDown':
			                    	sort(this.contextNode, false);
			                    	break;    
	                        }
	                    }
	                }
	        	}
	        }, '-', {
	            id: 'sortUp_pro',
	            iconCls: 'sortUp',
	            text: '上移'
	        }, {
	        	id: 'sortDown_pro',
	            iconCls: 'sortDown',
	            text: '下移'
	        }],
	        listeners: {
	            itemclick: function(item) {
	                switch (item.id) {
	                    case 'sortUp_pro':
	                    	sort(this.contextNode, true);
	                    	break;
	                    case 'sortDown_pro':
	                    	sort(this.contextNode, false);
	                    	break;
		                }
		            }
		        }
		    });
		    
		    tree.on('contextmenu', function(node, event) {
				node.select();
				contextMenu.contextNode = node;
				Ext.getCmp('create_pro').setVisible(false);
				
		    	if (node.isLeaf()) {
					Ext.getCmp('sortDown_pro').enable();
					Ext.getCmp('sortUp_pro').enable();
				} else {
					Ext.getCmp('sortDown_pro').enable();
				    Ext.getCmp('sortUp_pro').enable();
				    if (node.attributes.nodeflag == 'organgrade' ) {
						Ext.getCmp('sortDown_pro').disable();
						Ext.getCmp('sortUp_pro').disable();
						Ext.getCmp('create_pro').setVisible(true);
						Ext.getCmp('create_profession1').setVisible(true);
					}
					if (node.attributes.nodeflag == 'profession' ) {
						Ext.getCmp('create_pro').setVisible(true);
						Ext.getCmp('create_profession1').setVisible(false);
					}
					
				}
		      	contextMenu.showAt(event.getXY());//取得鼠标点击坐标，展示菜单
			});
			
			var isProfession = function(node) {
				if(node.attributes.nodeflag == 'profession') return true;
				return false;
			};
			
			var sort = function(node, up) {
				//专业排序
				if(isProfession(node) ) {
					var parent = node.parentNode;
					if(parent == tree.getRootNode()) return;
					
					var index = -1;
					
					var arr = [];
					for(var i=0, len = parent.childNodes.length; i<len; i++)
						if(isProfession(parent.childNodes[i])) {
							if(parent.childNodes[i] == node) index = arr.length;
							arr.push(parent.childNodes[i].id);
						}
					
					if(up === true && index == 0) return;
					if(up !== true && index == (arr.length - 1)) return;
					var temp = arr[index];
					arr[index] = arr[up == true ? index - 1 : index + 1];
					arr[up == true ? index - 1 : index + 1] = temp;
					
					Ext.Ajax.request({
						url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=profession',
						params: {sortArray: Ext.encode(arr)},
						success: function(response, opts) {
							if(response.responseText == '1') {
								node.parentNode.reload(function(n) {
									var fNode = n.findChild('id', node.id);
				        			if(fNode) {
				        				fNode.fireEvent('click', fNode);
				        			}
								});
							}
						}
					});
				}
			}
		}
		
		return this.professionManagerTree;
	},
	
	getContentPanel: function() {
		if(! this.contentPanel) {
			this.contentPanel = new Ext.Panel({
				region:'center',
				layout: 'card'
			});
		}
		return this.contentPanel;
	}
});