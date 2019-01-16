Ext.RoleManager = function() {
	var _this = this;
	
	Ext.RoleManager.superclass.constructor.call(this, {
		title: '��ɫ��Ϣ����',
		layout: 'border',
		border: false,
		items: [_this.getRoleManagerTree(), _this.getContentPanel()]
    });
    
};

Ext.extend(Ext.RoleManager, Ext.Panel, {
	
	getRoleManagerTree: function() {
		if(! this.roleManagerTree) {
			var tree = this.roleManagerTree = new Ext.RoleManagerTree({
				id: 'roleManagerTree',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false
			});
			
			var me = this;
			tree.on('click', function(node) {
				if(node.attributes.iconCls == 'role') {
					if(! this.role) {
						this.role = new Ext.RoleFormNew({
							region: 'center',
							border: false
						});
						me.getContentPanel().add(this.role);
					}
					this.role.loadProfression(node.parentNode.parentNode.id);
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.role.getId());
					
					me.getContentPanel().doLayout();
					this.role.loadUsergroup(node.id);
				}
				if(node.attributes.iconCls == 'dispatchDept') {
					if(! this.profession) {
						this.profession = new Ext.ProfessionForm({
							region: 'center',
							border: false
						});
						me.getContentPanel().add(this.profession);
					}
					
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.profession.getId());
					
					me.getContentPanel().doLayout();
					this.profession.loadProfession(node.id, 'WKF');
				}
			});
			
			var contextMenu = new Ext.menu.Menu({
	        items: [{
	            id: 'create_11',
	            iconCls: 'create',
	            text: '�½�',
	            menu: {
	        		items:[{
	        			id: 'create_profession_role',
	        			iconCls: 'user',
	        			text: '�½���רҵ��'
	        		},{
	        			id: 'create_role_11',
	        			iconCls: 'role',
	        			text: '�½�����ɫ��'
	        		}],
	                listeners: {
	                    itemclick: function(item) {
				        	var sm = tree.getSelectionModel();
				        	var node = sm.getSelectedNode();
	                        switch (item.id) {
	                            case 'create_role_11':
		                            if(! this.role) {
										this.role = new Ext.RoleFormNew({
											operFlag: 1,
											region: 'center',
											border: false
										});
										me.getContentPanel().add(this.role);
									}
		                            this.role.getForm().reset();
									if (node.attributes.nodeflag == 'profession') {
										this.role.loadProfression(node.parentNode.id);
										this.role.getForm().setValues.defer(500, this.role.getForm(), [{
		                            		ORGANGRADE: node.parentNode.id,
		                            		PROFESSION_ID: node.id,
		                            		ROLETYPE: 'WKF'
		                            	}]);
									} else {
										this.role.loadProfression(node.id);
										this.role.getForm().setValues({
		                            		ORGANGRADE: node.id,
		                            		ROLETYPE: 'WKF'
		                            	});
									}
									
									var l = me.getContentPanel().getLayout();
									l.setActiveItem(this.role.getId());
									
									me.getContentPanel().doLayout();
	                            	break;
	                            case 'create_profession_role':
		                            if(! this.profession) {
										this.profession = new Ext.ProfessionForm({
											operFlag: 1,
											treeType: 'WKF',
											region: 'center',
											border: false
										});
										me.getContentPanel().add(this.profession);
									}
									this.profession.getForm().reset();
									this.profession.getForm().setValues({
	                            		ORGANGRADE: node.id//,
	                            		//ROLETYPE: 'WKF'
	                            	});
									var l = me.getContentPanel().getLayout();
									l.setActiveItem(this.profession.getId());
									
									me.getContentPanel().doLayout();
	                            	break;	
	                            case 'cut_11':
									item.cutNode = this.contextNode;
									Ext.getCmp('copy_11').copyNode = null;
			                        break;    
								case 'copy_11':
									item.copyNode = this.contextNode;
									Ext.getCmp('cut_11').cutNode = null;
			                        break;
			                    case 'paste':
			                        var curNode = this.contextNode;
			                    	var copyNode = Ext.getCmp('copy_11').copyNode;
			                    	if (copyNode != null) copy(curNode, copyNode);
			                    	
			                    	var cutNode = Ext.getCmp('cut_11').cutNode;
			                    	if (cutNode != null) cut(curNode, cutNode);
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
	            id: 'sortUp_11',
	            iconCls: 'sortUp',
	            text: '����'
	        }, {
	        	id: 'sortDown_11',
	            iconCls: 'sortDown',
	            text: '����'
	        }, '-',{
	            id: 'cut_11',
	            iconCls: 'cut',
	            text: '����'
	        }, {
	            id: 'copy_11',
	            iconCls: 'copy',
	            text: '����'
	        }, {
	            id: 'paste_11',
	            iconCls: 'paste',
	            text: 'ճ��'
	        }],
	        listeners: {
	            itemclick: function(item) {
	                switch (item.id) {
	                    case 'cut_11':
							item.cutNode = this.contextNode;
							Ext.getCmp('copy_11').copyNode = null;
	                        break;    
						case 'copy_11':
							item.copyNode = this.contextNode;
							Ext.getCmp('cut_11').cutNode = null;
	                        break;
	                    case 'paste_11':
	                        var curNode = this.contextNode;
	                    	var copyNode = Ext.getCmp('copy_11').copyNode;
	                    	if (copyNode != null) copy(curNode, copyNode);
	                    	
	                    	var cutNode = Ext.getCmp('cut_11').cutNode;
	                    	if (cutNode != null) cut(curNode, cutNode);
	                        break;
	                    case 'sortUp_11':
	                    	sort(this.contextNode, true);
	                    	break;
	                    case 'sortDown_11':
	                    	sort(this.contextNode, false);
	                    	break;
		                }
		            }
		        }
		    });
	    
	    	var isOrganGrade = function(node) {
				if(node.attributes.nodeflag == 'organgrade') return true;
				return false;
			};
			
			var isRole = function(node) {
				if(node.attributes.nodeflag == 'role') return true;
				return false;
			};
			
			var isProfession = function(node) {
				if(node.attributes.nodeflag == 'profession') return true;
				return false;
			};
			
			var canRoleCopy = function(node) {
				if (isOrganGrade(node)) return true;
				if (node.attributes.nodeflag == 'profession') return true;
				return false;
			}
			
		    
			tree.on('contextmenu', function(node, event) {
				node.select();
				contextMenu.contextNode = node;
				Ext.getCmp('create_11').setVisible(false);
				Ext.getCmp('paste_11').disable();
				
				//���������Ϣ���û��飬�ҵ�ǰѡ�еĽڵ����Ǽ���
				var copyNode = Ext.getCmp('copy_11').copyNode;
				if(copyNode && isRole(copyNode) && canRoleCopy(node))
					Ext.getCmp('paste_11').enable();
				
				//���������Ϣ���û��飬�ҵ�ǰѡ�еĽڵ����Ǽ���
				var cutNode = Ext.getCmp('cut_11').cutNode;
				if(cutNode && isRole(cutNode) && canRoleCopy(node))
					Ext.getCmp('paste_11').enable();
					
		    	if (node.isLeaf()) {
					Ext.getCmp('sortDown_11').enable();
					Ext.getCmp('sortUp_11').enable();
					Ext.getCmp('cut_11').enable();
					Ext.getCmp('copy_11').enable();
				} else {
					Ext.getCmp('sortDown_11').enable();
				    Ext.getCmp('sortUp_11').enable();
					Ext.getCmp('cut_11').disable();
					Ext.getCmp('copy_11').disable();
					if (node.attributes.nodeflag == 'organgrade' ) {
						Ext.getCmp('sortDown_11').disable();
						Ext.getCmp('sortUp_11').disable();
						Ext.getCmp('create_11').setVisible(true);
						Ext.getCmp('create_profession_role').setVisible(true);
						Ext.getCmp('create_role_11').setVisible(true);
					}
					if (node.attributes.nodeflag == 'profession' ) {
						Ext.getCmp('create_11').setVisible(true);
						Ext.getCmp('create_profession_role').setVisible(false);
					}
					
				}
		      	contextMenu.showAt(event.getXY());//ȡ����������꣬չʾ�˵�
			});
			
			var sort = function(node, up) {
				//�û�������
				if(isRole(node)) {
					var parent = node.parentNode;
					if(parent == tree.getRootNode()) return;
					
					var index = -1;
					
					var arr = [];
					for(var i=0, len = parent.childNodes.length; i<len; i++)
						if(isRole(parent.childNodes[i])) {
							if(parent.childNodes[i] == node) index = arr.length;
							arr.push(parent.childNodes[i].id);
						}
					
					if(up === true && index == 0) return;
					if(up !== true && index == (arr.length - 1)) return;
					var temp = arr[index];
					arr[index] = arr[up == true ? index - 1 : index + 1];
					arr[up == true ? index - 1 : index + 1] = temp;
					
					Ext.Ajax.request({
						url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=role',
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
				//רҵ����
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
			
			var copy = function(curNode, copyNode) {
				//�����û��鵽������
				if(isRole(copyNode)) {
					var roleId = copyNode.id;
					var organGradeNode;
					var professionId = '';
					if(isOrganGrade(curNode)) organGradeNode = curNode;
					if(curNode.attributes.nodeflag == 'profession') {
						organGradeNode = curNode.parentNode;
						professionId = curNode.id;
					}
					if(organGradeNode) {
						Ext.Ajax.request({
							url: contextpath + '/tbp/sysmanager/usergroup.do?method=copy&roleId=' + roleId + '&professionId=' + professionId + '&organGrade=' + organGradeNode.id,
							success: function(response, opts) {
			    				var msg = formReply(response);
			    				if(msg === false) return;
			    				
			    				organGradeNode.reload(function(n) {
			    					var fNode = n.findChild('id', n.id);
				        			if(fNode) {
			            				fNode.fireEvent('click', fNode);
			            				
			            				tree.getLayoutTarget().scroll('b', 60);
			            			}
			    				});
							},
							failure: function(response, opts) {
								Ext.MessageBox.alert('ϵͳ��Ϣ', '�����������ʧ�ܣ�'); 
							}
						});
					}
				}
			}
			var cut = function(curNode, cutNode) {
				//�����û��鵽������
				if(isRole(cutNode)) {
					var roleId = cutNode.id;
					var organGradeNode;
					var professionId = '';
					if(isOrganGrade(curNode)) organGradeNode = curNode;
					if(curNode.attributes.nodeflag == 'profession') {
						organGradeNode = curNode.parentNode;
						professionId = curNode.id;
					}
					if(organGradeNode) {
						Ext.Ajax.request({
							url: contextpath + '/tbp/sysmanager/usergroup.do?method=cut&roleId=' + roleId + '&professionId=' + professionId + '&organGrade=' + organGradeNode.id,
							success: function(response, opts) {
			    				var msg = formReply(response);
			    				if(msg === false) return;
			    				
			    				cutNode.parentNode.reload();
			    				organGradeNode.reload(function(n) {
			    					var fNode = n.findChild('id', n.id);
				        			if(fNode) {
			            				fNode.fireEvent('click', fNode);
			            				
			            				tree.getLayoutTarget().scroll('b', 60);
			            			}
			    				});
							},
							failure: function(response, opts) {
								Ext.MessageBox.alert('ϵͳ��Ϣ', '�����������ʧ�ܣ�'); 
							}
						});
					}
				}
			}
		}
		
		return this.roleManagerTree;
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