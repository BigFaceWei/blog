Ext.UsergroupManager = function() {
	var _this = this;
	
	Ext.UsergroupManager.superclass.constructor.call(this, {
		title: '用户组信息管理',
		layout: 'border',
		border: false,
		items: [_this.getUsergroupManagerTree(), _this.getContentPanel()]
    });
    
    /*_this.getUsergroupManagerTree().on('click', function(){
    	
    })*/
};

Ext.extend(Ext.UsergroupManager, Ext.Panel, {
	
	getUsergroupManagerTree: function() {
		if(! this.usergroupManagerTree) {
			var tree = this.usergroupManagerTree = new Ext.UsergroupManagerTree({
				//title: '用户组树信息',
				id: 'usergroupManagerTree',
				region: 'west',
				split: true,
				margins: '0 0 0 0',
				width: 250,
				border: false
			});
			
			var me = this;
			tree.on('click', function(node) {
				if(node.attributes.iconCls == 'usergroup') {
					if(! this.usergroup) {
						this.usergroup = new Ext.UsergroupFormNew({
							region: 'center',
							border: false
						});
						me.getContentPanel().add(this.usergroup);
					}
					this.usergroup.loadProfression(node.parentNode.parentNode.id);
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.usergroup.getId());
					
					me.getContentPanel().doLayout();
					//this.usergroup.init.defer(500, this.usergroup, [node.id]);
					this.usergroup.loadUsergroup(node.id);
				}
				if(node.attributes.iconCls == 'dispatchDept') {
					if(! this.profession) {
						this.profession = new Ext.ProfessionForm({
							region: 'center',
							border: false
						});
						me.getContentPanel().add(this.profession);
					}
					this.profession.getForm().reset();
					var l = me.getContentPanel().getLayout();
					l.setActiveItem(this.profession.getId());
					
					me.getContentPanel().doLayout();
					this.profession.loadProfession(node.id, 'SYS');
				}
			});
			
			var contextMenu = new Ext.menu.Menu({
	        items: [{
	            id: 'create_1',
	            iconCls: 'create',
	            text: '新建',
	            menu: {
	        		items:[{
	        			id: 'create_profession',
	        			iconCls: 'user',
	        			text: '新建【专业】'
	        		},{
	        			id: 'create_usergroup_1',
	        			iconCls: 'usergroup',
	        			text: '新建【用户组】'
	        		}],
	                listeners: {
	                    itemclick: function(item) {
				        	var sm = tree.getSelectionModel();
				        	var node = sm.getSelectedNode();
	                        switch (item.id) {
	                            case 'create_usergroup_1':
		                            if(! this.usergroup) {
										this.usergroup = new Ext.UsergroupFormNew({
											operFlag: 1,
											region: 'center',
											border: false
										});
										me.getContentPanel().add(this.usergroup);
									}
		                            this.usergroup.getForm().reset();
									if (node.attributes.nodeflag == 'profession') {
										this.usergroup.loadProfression(node.parentNode.id);
										this.usergroup.getForm().setValues.defer(500, this.usergroup.getForm(), [{
		                            		ORGANGRADE: node.parentNode.id,
		                            		PROFESSION_ID: node.id,
		                            		ROLETYPE: 'SYS'
		                            	}]);
									} else {
										this.usergroup.loadProfression(node.id);
										this.usergroup.getForm().setValues({
		                            		ORGANGRADE: node.id,
		                            		ROLETYPE: 'SYS'
		                            	});
									}
									
									var l = me.getContentPanel().getLayout();
									l.setActiveItem(this.usergroup.getId());
									
									me.getContentPanel().doLayout();
	                            	break;
	                            case 'create_profession':
		                            if(! this.profession) {
										this.profession = new Ext.ProfessionForm({
											operFlag: 1,
											treeType: 'SYS',
											region: 'center',
											border: false
										});
										me.getContentPanel().add(this.profession);
									}
									this.profession.getForm().reset();
									this.profession.getForm().setValues({
		                            		ORGANGRADE: node.id//,
		                            		//ROLETYPE: 'SYS'
		                            });
									var l = me.getContentPanel().getLayout();
									l.setActiveItem(this.profession.getId());
									
									me.getContentPanel().doLayout();
	                            	break;	
	                            case 'cut_1':
									item.cutNode = this.contextNode;
									Ext.getCmp('copy_1').copyNode = null;
			                        break;    
								case 'copy_1':
									item.copyNode = this.contextNode;
									Ext.getCmp('cut_1').cutNode = null;
			                        break;
			                    case 'paste':
			                        var curNode = this.contextNode;
			                    	var copyNode = Ext.getCmp('copy_1').copyNode;
			                    	if (copyNode != null) copy(curNode, copyNode);
			                    	
			                    	var cutNode = Ext.getCmp('cut_1').cutNode;
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
	            id: 'sortUp_1',
	            iconCls: 'sortUp',
	            text: '上移'
	        }, {
	        	id: 'sortDown_1',
	            iconCls: 'sortDown',
	            text: '下移'
	        }, '-',{
	            id: 'cut_1',
	            iconCls: 'cut',
	            text: '剪切'
	        }, {
	            id: 'copy_1',
	            iconCls: 'copy',
	            text: '复制'
	        }, {
	            id: 'paste_1',
	            iconCls: 'paste',
	            text: '粘帖'
	        }],
	        listeners: {
	            itemclick: function(item) {
	                switch (item.id) {
	                    case 'cut_1':
							item.cutNode = this.contextNode;
							Ext.getCmp('copy_1').copyNode = null;
	                        break;    
						case 'copy_1':
							item.copyNode = this.contextNode;
							Ext.getCmp('cut_1').cutNode = null;
	                        break;
	                    case 'paste_1':
	                        var curNode = this.contextNode;
	                    	var copyNode = Ext.getCmp('copy_1').copyNode;
	                    	if (copyNode != null) copy(curNode, copyNode);
	                    	
	                    	var cutNode = Ext.getCmp('cut_1').cutNode;
	                    	if (cutNode != null) cut(curNode, cutNode);
	                        break;
	                    case 'sortUp_1':
	                    	sort(this.contextNode, true);
	                    	break;
	                    case 'sortDown_1':
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
			
			var isUsergroup = function(node) {
				if(node.attributes.nodeflag == 'usergroup') return true;
				return false;
			};
			
			var isProfession = function(node) {
				if(node.attributes.nodeflag == 'profession') return true;
				return false;
			};
			
			var canUsergroupCopy = function(node) {
				if (isOrganGrade(node)) return true;
				if (node.attributes.nodeflag == 'profession') return true;
				return false;
			}
			
		    
			tree.on('contextmenu', function(node, event) {
				node.select();
				contextMenu.contextNode = node;
				Ext.getCmp('create_1').setVisible(false);
				Ext.getCmp('paste_1').disable();
				
				//如果复制信息是用户组，且当前选中的节点又是级别
				var copyNode = Ext.getCmp('copy_1').copyNode;
				if(copyNode && isUsergroup(copyNode) && canUsergroupCopy(node))
					Ext.getCmp('paste_1').enable();
				
				//如果剪切信息是用户组，且当前选中的节点又是级别
				var cutNode = Ext.getCmp('cut_1').cutNode;
				if(cutNode && isUsergroup(cutNode) && canUsergroupCopy(node))
					Ext.getCmp('paste_1').enable();
					
		    	if (node.isLeaf()) {
					Ext.getCmp('sortDown_1').enable();
					Ext.getCmp('sortUp_1').enable();
					Ext.getCmp('cut_1').enable();
					Ext.getCmp('copy_1').enable();
				} else {
					Ext.getCmp('sortDown_1').enable();
				    Ext.getCmp('sortUp_1').enable();
					Ext.getCmp('cut_1').disable();
					Ext.getCmp('copy_1').disable();
					if (node.attributes.nodeflag == 'organgrade' ) {
						Ext.getCmp('sortDown_1').disable();
						Ext.getCmp('sortUp_1').disable();
						Ext.getCmp('create_1').setVisible(true);
						Ext.getCmp('create_profession').setVisible(true);
						Ext.getCmp('create_usergroup_1').setVisible(true);
					}
					if (node.attributes.nodeflag == 'profession' ) {
						Ext.getCmp('create_1').setVisible(true);
						Ext.getCmp('create_profession').setVisible(false);
					}
					
				}
		      	contextMenu.showAt(event.getXY());//取得鼠标点击坐标，展示菜单
			});
			
			var sort = function(node, up) {
				//用户组排序
				if(isUsergroup(node)) {
					var parent = node.parentNode;
					if(parent == tree.getRootNode()) return;
					
					var index = -1;
					
					var arr = [];
					for(var i=0, len = parent.childNodes.length; i<len; i++)
						if(isUsergroup(parent.childNodes[i])) {
							if(parent.childNodes[i] == node) index = arr.length;
							arr.push(parent.childNodes[i].id);
						}
					
					if(up === true && index == 0) return;
					if(up !== true && index == (arr.length - 1)) return;
					var temp = arr[index];
					arr[index] = arr[up == true ? index - 1 : index + 1];
					arr[up == true ? index - 1 : index + 1] = temp;
					
					Ext.Ajax.request({
						url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=usergroup',
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
			
			var copy = function(curNode, copyNode) {
				//复制用户组到级别下
				if(isUsergroup(copyNode)) {
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
								Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
							}
						});
					}
				}
			}
			var cut = function(curNode, cutNode) {
				//剪切用户组到级别下
				if(isUsergroup(cutNode)) {
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
								Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
							}
						});
					}
				}
			}
		}
		
		return this.usergroupManagerTree;
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