/*****************
 * 
 * 
 * 
 * 	����ڵ�˵����
 * ÿ������ڵ㶼��organtype��������ʶ��
 * ͨ��node.attributes.organtype�����ã�
 * ����֯����ӵ�е�����ڵ���Ҫ�У�
 * organtypeֵ		����ĺ���
 * dummy			�����ϵ�
 * 256				�����û���
 * 257				���н�ɫ
 * 110				�����û�
 * 1				ֱ����糧
 * 2				ֱ��ˮ�糧
 * 3				ֱ����糧
 * 4				ֱ�����վ
 * 5				��ҵ�ּ�����ѹ
 * 6				���б��վ
 * 7				����
 * 
 * *****************************
 */

var formReply = function(response) {
	try {
		var reply = Ext.decode(response.responseText);
		if(reply.success != true) {
			if(reply.msg)
				Ext.Msg.alert('ϵͳ��ʾ', reply.msg);
			else
				Ext.Msg.alert('ϵͳ��ʾ', '����ʧ�ܣ�');
			return false;
		}
		return reply.msg;
	} catch(e) {
		Ext.Msg.alert('ϵͳ��ʾ', '����ʧ�ܣ�');
		return false;
	}
};

function main() {
	var menuCacher = {
		menus: {},
		clear: function() {
			delete this.menus;
			this.menus = {};
		},
		get: function(menuId, cb) {
			var _this = this;
			if(!menuId || menuId == null) return;
			if(!this.menus[menuId]) {
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/areano.do?method=virtualSelectedMenus&virtualId=' + menuId,
					success: function(response, opts) {
						var arr = Ext.decode(response.responseText);
						_this.menus[menuId] = arr;
						cb(arr);
					}
				});
			} else {
				cb(this.menus[menuId]);
			}
		}
	};
	
	
	var isOrgan = function(node) {
		return node.attributes.iconCls == 'dispatchOrgan' || node.attributes.iconCls == 'dispatchDept'
			|| node.attributes.iconCls == 'dc' || node.attributes.iconCls == 'bdz';
	};
	
	var isUser = function(node) {
		return node.attributes.iconCls == 'user' || node.attributes.iconCls == 'user_disable';
	};
	
	var isVirtualNode = function(node) {
		if(!isOrgan(node) && !isUser(node) && node.attributes.organtype != 256 && node.attributes.organtype != 110) return true;
	};
	
	var canUserCopy = function(node) {
		if(isOrgan(node)) return true;
		if(node.attributes.organtype == 110) return true;
		return false;
	};
	
	var canOrganCopy = function(node) {
		if(isOrgan(node)) return true;
		if(node.attributes.organtype != 256 && node.attributes.organtype != 110) return true;
		return false;
	};
	
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = rootpath + '/extjs/resources/images/default/s.gif';
	
	Ext.MessageBox.buttonText.yes = '��';
	Ext.MessageBox.buttonText.no = '��';
	Ext.MessageBox.buttonText.ok = 'ȷ��';
	Ext.MessageBox.buttonText.cancel = 'ȡ��';
	
	var tree = new Ext.EompTree({
		id: 'navigation-tree',
		title: '��֯���� - ' + unitName,
		width: 300,
		region: 'west',
		split: true,
		margins: '2 2 2 2',
		frame: true
	});
	
	var panel = new Ext.Panel({
		region: 'center',
		margins: '2 2 2 0',
		layout: 'card',
		border: false
	});
	
	//�ڵ������ƶ���������
	var sort = function(node, up) {
		if(isOrgan(node) || isVirtualNode(node) ) {
			var parent = node.parentNode;
			if(parent == tree.getRootNode()) return;
			
			var index = -1;
			
			var arr = [];
			for(var i=0, len = parent.childNodes.length; i<len; i++)
				if(isOrgan(parent.childNodes[i]) || isVirtualNode(parent.childNodes[i])) {
					if(parent.childNodes[i] == node) index = arr.length;
					arr.push(parent.childNodes[i].id);
				}
			
			if(up === true && index == 0) return;
			if(up !== true && index == (arr.length - 1)) return;
			var temp = arr[index];
			arr[index] = arr[up == true ? index - 1 : index + 1];
			arr[up == true ? index - 1 : index + 1] = temp;
			
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=organ',
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
		} else if(isUser(node)) {
			var parent = node.parentNode;
			if(parent == tree.getRootNode()) return;
			
			var index = -1;
			
			var arr = [];
			for(var i=0, len = parent.childNodes.length; i<len; i++)
				if(isUser(parent.childNodes[i])) {
					if(parent.childNodes[i] == node) index = arr.length;
					arr.push(parent.childNodes[i].id);
				}
			
			if(up === true && index == 0) return;
			if(up !== true && index == (arr.length - 1)) return;
			var temp = arr[index];
			arr[index] = arr[up == true ? index - 1 : index + 1];
			arr[up == true ? index - 1 : index + 1] = temp;
			
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/tree.do?method=sort&sortTable=user',
				params: {sortArray: Ext.encode(arr)},
				success: function(response, opts) {
					if(response.responseText == '1') {
						var pNode110 = node.parentNode;
		            	
						pNode110.parentNode.reload(function(n) {
		            		var allUserNode = n.findChild('organtype', 110);
		            		allUserNode.expand();
		            		
		            		var fNode = allUserNode.findChild('id', node.id);
		        			if(fNode) {
		        				fNode.fireEvent('click', fNode);
		        			}
		        		});
					}
				}
			});
		}
	};
	
	tree.on('click', function(node) {
		node.select();
		//��λ�����ŵȵ�
		var nodeId = node.id;
		if(node.attributes.iconCls == 'gridCompany' || node.attributes.iconCls == 'dispatchOrgan' 
			|| node.attributes.iconCls == 'dispatchDept' || node.attributes.iconCls == 'genco' || node.attributes.iconCls == 'otherOrgan') {
			if(!this.organ) {
				this.organ = new Ext.OrganTab();
				panel.add(this.organ);
			}
			var _this = this;
			if (!isSuperAdmin) { //��ϵͳ����Ա
				if (node.attributes.organtype == 'unit') {
					_this.organ.getOrganForm().getTopToolbar().setVisible(false);
					_this.organ.getOrganForm().getForm().findField('ORGANNAME').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANNAME').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANCODE').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANCODE').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANTYPE').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANTYPE').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANGRADE').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANGRADE').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANKIND').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANKIND').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('AREANO').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('AREANO').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('PROFESSION_ID').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('PROFESSION_ID').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ISENABLED').disable();
				} else {
					_this.organ.getOrganForm().getTopToolbar().setVisible(true);
					_this.organ.getOrganForm().getForm().findField('ORGANNAME').setReadOnly(false);
					_this.organ.getOrganForm().getForm().findField('ORGANNAME').removeClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANCODE').setReadOnly(false);
					_this.organ.getOrganForm().getForm().findField('ORGANCODE').removeClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANTYPE').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANTYPE').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANGRADE').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANGRADE').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ORGANKIND').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('ORGANKIND').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('AREANO').setReadOnly(true);
					_this.organ.getOrganForm().getForm().findField('AREANO').addClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('PROFESSION_ID').setReadOnly(false);
					_this.organ.getOrganForm().getForm().findField('PROFESSION_ID').removeClass('x-field-gray');
					_this.organ.getOrganForm().getForm().findField('ISENABLED').enable();
				}
			} 		
			this.organ.getOrganForm().loadProfression(node.id);
			panel.getLayout().setActiveItem(this.organ.getId());
			
			panel.doLayout();
			this.organ.init(nodeId);
		} else if(node.attributes.iconCls == 'dc' || node.attributes.iconCls == 'bdz' ) {	//��վ
			if(!this.station) {
				this.station = new Ext.StationTab();
				panel.add(this.station);
			}
			this.station.getStationForm().loadProfression(node.parentNode.id);
			panel.getLayout().setActiveItem(this.station.getId());
			
			panel.doLayout();
			this.station.init(nodeId);
		} else if(node.attributes.iconCls == 'user' || node.attributes.iconCls == 'user_disable') {	//�û�
			if(!this.user) {
				this.user = new Ext.UserTab();
				panel.add(this.user);
			}
			
			this.user.getUserForm().getForm().findField('ISADMIN').setVisible(false);
			panel.getLayout().setActiveItem(this.user.getId());
			
			panel.doLayout();
			this.user.init(node.id);
		} else if(node.attributes.iconCls == 'usergroup') {	//�û���
			if (isSuperAdmin) {//ϵͳ����Ա
				if(!this.usergroup) {
					this.usergroup = new Ext.UsergroupTab();
					panel.add(this.usergroup);
				}
				panel.getLayout().setActiveItem(this.usergroup.getId());
				
				panel.doLayout();
				this.usergroup.init(nodeId);
			} else {           //��ϵͳ����Ա
				if(!this.usergroupControl) {
					this.usergroupControl = new Ext.UsergroupTab();
					panel.add(this.usergroupControl);
					this.usergroupControl.getUsergroupForm().getTopToolbar().setVisible(false);
					this.usergroupControl.remove(this.usergroupControl.getUsergroupAuthority());
				}
				panel.getLayout().setActiveItem(this.usergroupControl.getId());
				panel.doLayout();
				this.usergroupControl.init(nodeId);
			}
		} else if(node.attributes.iconCls == 'role') {	//��ɫ
			if(!this.role) {
				this.role = new Ext.RoleTab();
				panel.add(this.role);
			}
			panel.getLayout().setActiveItem(this.role.getId());
			
			panel.doLayout();
			this.role.init(nodeId);
		} else if(node.attributes.iconCls == 'usergroupShare') {	//�����û���
			if (isSuperAdmin) {//ϵͳ����Ա
				if(!this.usergroupShare) {
					this.usergroupShare = new Ext.UsergroupTab();
					panel.add(this.usergroupShare);
					
					this.usergroupShare.getUsergroupForm().getTopToolbar().setVisible(false);
				}
				panel.getLayout().setActiveItem(this.usergroupShare.getId());
				
				panel.doLayout();
				this.usergroupShare.init(nodeId);
			} else {           //��ϵͳ����Ա
				if(!this.usergroupShareControl) {
					this.usergroupShareControl = new Ext.UsergroupTab();
					panel.add(this.usergroupShareControl);
					
					this.usergroupShareControl.getUsergroupForm().getTopToolbar().setVisible(false);
					this.usergroupShareControl.remove(this.usergroupShareControl.getUsergroupAuthority());
				}
				panel.getLayout().setActiveItem(this.usergroupShareControl.getId());
				panel.doLayout();
				this.usergroupShareControl.init(nodeId);
			}
		}  else if(node.attributes.iconCls == 'roleShare') {	//�����ɫ
			if(!this.roleShare) {
				this.roleShare = new Ext.RoleTab();
				panel.add(this.roleShare);
				
				this.roleShare.getRoleForm().getTopToolbar().setVisible(false);
			}
			panel.getLayout().setActiveItem(this.roleShare.getId());
			
			panel.doLayout();
			this.roleShare.init(nodeId);
		} else {	//����ڵ�
			if(node.attributes.organtype && node.attributes.organtype == '110'
				|| node.attributes.organtype == '256' || node.attributes.organtype == '257') {
				if(!this.virtualNodeSystem) {
					this.virtualNodeSystem = new Ext.VirtualNodeTab();
					this.virtualNodeSystem.getVirtualNodeForm().cacher = menuCacher;
					panel.add(this.virtualNodeSystem);
					var form = this.virtualNodeSystem.getVirtualNodeForm();
					form.getTopToolbar().setVisible(false);
					this.virtualNodeSystem.remove(this.virtualNodeSystem.getUserGrid());
				} 
				panel.getLayout().setActiveItem(this.virtualNodeSystem.getId());
				
				panel.doLayout();	
				 this.virtualNodeSystem.getVirtualNodeForm().getEl().mask();
				
				this.virtualNodeSystem.getVirtualNodeForm().getForm().setValues({ORGANNAME: node.text});
					
			} else {
				if(!this.virtualNode) {
					this.virtualNode = new Ext.VirtualNodeTab();
					this.virtualNode.getVirtualNodeForm().cacher = menuCacher;
					panel.add(this.virtualNode);
				} 
				panel.getLayout().setActiveItem(this.virtualNode.getId());
				
				panel.doLayout();
				this.virtualNode.init(nodeId);
			}
		}
	}, this);
	
	//�ڵ��Ҽ�����
	var copy = function(curNode, copyNode) {
		//�����û���������
		if(isUser(copyNode)) {
			var userId = copyNode.id;
			var organNode;
			if(isOrgan(curNode)) organNode = curNode;
			if(curNode.attributes.organtype == 110) organNode = curNode.parentNode;
			if(organNode) {
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/user.do?method=copy&userId=' + userId + '&organId=' + organNode.id,
					success: function(response, opts) {
	    				var msg = formReply(response);
	    				if(msg === false) return;
	    				
	    				organNode.reload(function(n) {
	    					var allUserNode = n.findChild('organtype', 110);
	    					allUserNode.expand();
	    					var fNode = allUserNode.findChild('id', msg);
	    					fNode.fireEvent('click', fNode);
	    					tree.getLayoutTarget().scroll('b', 60);
	    				});
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('ϵͳ��Ϣ', '�����������ʧ�ܣ�'); 
					}
				});
			}
		}
		
		if (isOrgan(copyNode)) {
			var organId = copyNode.id;
			var organNode;
			var flag = 'organ';
			if(canOrganCopy(curNode)) organNode = curNode;
			if (copyNode.attributes.iconCls == 'dc' || copyNode.attributes.iconCls == 'bdz') {
				flag = 'station';
			}
			if(organNode) {
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/organ.do?method=copy&organId=' + organId + '&parentId=' + organNode.id +'&flag=' + flag + '',
					success: function(response, opts) {
	    				var msg = formReply(response);
	    				if(msg === false) return;
	    				
	    				organNode.reload(function(n) {
	    					tree.getLayoutTarget().scroll('b', 60);
	    				});
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('ϵͳ��Ϣ', '�����������ʧ�ܣ�'); 
					}
				});
			}
		}
	};
	
	//�ڵ��Ҽ�����
	var cut = function(curNode, cutNode) {
		//�����û���������
		if(isUser(cutNode)) {
			var userId = cutNode.id;
			var organNode;
			if(isOrgan(curNode)) organNode = curNode;
			if(curNode.attributes.organtype == 110) organNode = curNode.parentNode;
			if(organNode) {
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/user.do?method=userTransfer&userId=' + userId + '&organId=' + organNode.id,
					success: function(response, opts) {
	    				var msg = formReply(response);
	    				if(msg === false) return;
	    				
	    				cutNode.parentNode.parentNode.reload();
	    				organNode.reload(function(n) {
	    					var allUserNode = n.findChild('organtype', 110);
	    					allUserNode.expand();
	    					var fNode = allUserNode.findChild('id', msg);
	    					fNode.fireEvent('click', fNode);
	    					tree.getLayoutTarget().scroll('b', 60);
	    				});
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('ϵͳ��Ϣ', '�����������ʧ�ܣ�'); 
					}
				});
			}
		}
		//������֯����
		if (isOrgan(cutNode)) {
			var organId = cutNode.id;
			var organNode;
			var flag;
			if(canOrganCopy(curNode)) organNode = curNode;
			if (cutNode.attributes.iconCls == 'dc' || cutNode.attributes.iconCls == 'bdz') {
				flag = 'station';
			}
			if(organNode) {
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/organ.do?method=organTransfer&organId=' + organId + '&parentId=' + organNode.id +'&flag=' + flag + '',
					success: function(response, opts) {
	    				var msg = formReply(response);
	    				if(msg === false) return;
	    				
	    				cutNode.parentNode.reload();
	    				organNode.reload(function(n) {
	    					tree.getLayoutTarget().scroll('b', 60);
	    				});
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('ϵͳ��Ϣ', '�����������ʧ�ܣ�'); 
					}
				});
			}
		}
	};
	
	//�ڵ��Ҽ�ɾ��
	var del = function(delNode) {
		var _this = this;
		//ɾ���û�
		if(isUser(delNode)) {
			var userId = delNode.id;
			Ext.Msg.show({
	    		title: 'ϵͳ��Ϣ',
	    		msg: '��ȷ��Ҫɾ�����û���',
	    		buttons: Ext.Msg.OKCANCEL,
	    		fn: function(buttonId){
	    			if (buttonId == 'ok'){
						Ext.Ajax.request({
							url: contextpath + '/tbp/sysmanager/user.do?method=delete&userId=' + userId + '',
							success: function(response, opts) {
			    				var tree = Ext.getCmp('navigation-tree');
	    		    			var sm = tree.getSelectionModel();
	    		            	var node = sm.getSelectedNode();
	    		            	
	    		            	node.parentNode.parentNode.reload(function(n) {
	    		            		var allUserNode = n.findChild('organtype', 110);
	    		            		if(allUserNode)
	    		            			allUserNode.expand();
	    		            	});
	    		            	
	    		            	_this.getForm().reset();
							},
							failure: function(response, opts) {
								Ext.MessageBox.alert('ϵͳ��Ϣ', '�����������ʧ�ܣ�'); 
							}
						});
					}
	    		},
    			icon: Ext.MessageBox.QUESTION
    		});	
			
		}
		
		//ɾ������
		if(isOrgan(delNode)) {
			var organId = delNode.id;
			Ext.Msg.show({
	    		title: 'ϵͳ��Ϣ',
	    		msg: '��ȷ��Ҫɾ���û�����',
	    		buttons: Ext.Msg.OKCANCEL,
	    		fn: function(buttonId){
	    			if (buttonId == 'ok'){
						Ext.Ajax.request({
							url: contextpath + '/tbp/sysmanager/organ.do?method=delete&organId=' + organId,
	    					success: function (response, opts) {
	    						if (response.responseText == 'success') {
	    							var tree = Ext.getCmp('navigation-tree');
	        		    			var sm = tree.getSelectionModel();
	        		            	var node = sm.getSelectedNode();
	        		            	node.parentNode.reload();
	        		            	
	        		            	_this.getForm().reset();
	    						}
	    		    			if (response.responseText == 'failure') {
	    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�û��������¼��������û�������ɾ���¼��������û���'); 
	    		    			}
	    		    		},
	    		    		failure: function() {
	    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ������ʧ�ܣ�'); 
	    		        	}
						});
					}
	    		},
    			icon: Ext.MessageBox.QUESTION
    		});	
			
		}
	};
	var contextMenu = new Ext.menu.Menu({
        items: [{
            id: 'create',
            iconCls: 'create',
            text: '�½�',
            menu: {
        		items:[{
        			id: 'create_dispatchOrgan',
        			iconCls: 'dispatchOrgan',
        			text: '�½�����λ��'
        		}, {
        			id: 'create_dispatchDept',
        			iconCls: 'dispatchDept',
        			text: '�½������š�'
        		}, {
        			id: 'create_user',
        			iconCls: 'user',
        			text: '�½����û���'
        		}, /*{
        			id: 'create_usergroup',
        			iconCls: 'usergroup',
        			text: '�½����û��顿'
        		}, {
        			id: 'create_role',
        			iconCls: 'role',
        			text: '�½�����ɫ��'
        		},*/ {
        			id: 'create_dc',
        			iconCls: 'cz',
        			text: '�½����糧��'
        		}, {
        			id: 'create_bdz',
        			iconCls: 'cz',
        			text: '�½������վ��'
        		}, {
        			id: 'create_dummy',
        			text: '�½�������ڵ㡿'
        		}],
                listeners: {
                    itemclick: function(item) {
			        	var sm = tree.getSelectionModel();
			        	var node = sm.getSelectedNode();
        	
                        switch (item.id) {
                            case 'create_dispatchOrgan':
                            	if(! this.unitfp) {
                            		this.unitfp = new Ext.OrganForm({operFlag: 1});
                            		panel.add(this.unitfp);
                            	}
                            	this.unitfp.getForm().reset();
                            	this.unitfp.setTitle('������λ');
                            	this.unitfp.loadProfression(node.id);
                            	this.unitfp.getForm().setValues.defer(500, this.unitfp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'unit',
                            		ORGANKIND: node.attributes.organkind,//�������
                            		ORGANGRADE: node.attributes.organgrade,//��������
                            		AREANO: node.attributes.areano,//�������
                            		PROFESSION_ID: node.attributes.profession_id,//����רҵ
                            		ISENABLED: node.attributes.isenabled
                            	}]);
                            	panel.getLayout().setActiveItem(this.unitfp.getId());
                    			panel.doLayout();
                                break;
                            case 'create_dispatchDept':
                            	if(!this.organfp) {
									this.organfp = new Ext.OrganForm({operFlag: 1});
									panel.add(this.organfp);
								}
                            	this.organfp.getForm().reset();
                            	this.organfp.setTitle('��������');
                            	this.organfp.loadProfression(node.id);
                            	this.organfp.getForm().setValues.defer(500, this.organfp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'dept',
                            		ORGANKIND: node.attributes.organkind,//�������
                            		ORGANGRADE: node.attributes.organgrade,//��������
                            		AREANO: node.attributes.areano,//�������
                            		PROFESSION_ID: node.attributes.profession_id,//����רҵ
                            		ISENABLED: node.attributes.isenabled
                            	}]);
							    this.organfp.getForm().findField('ORGANTYPE').setReadOnly(true);
							    this.organfp.getForm().findField('ORGANTYPE').addClass('x-field-gray');
							    this.organfp.getForm().findField('ORGANGRADE').setReadOnly(true);
							    this.organfp.getForm().findField('ORGANGRADE').addClass('x-field-gray');
							    this.organfp.getForm().findField('AREANO').setReadOnly(true);
							    this.organfp.getForm().findField('AREANO').addClass('x-field-gray');
							    this.organfp.getForm().findField('ORGANKIND').setReadOnly(true);
							    this.organfp.getForm().findField('ORGANKIND').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.organfp);
								panel.doLayout();
                            	break;
                            case 'create_dummy':
                            	if(!this.dummyfp) {
									this.dummyfp = new Ext.VirtualNodeForm({operFlag: 1, cacher: menuCacher});
									panel.add(this.dummyfp);
								}
                            	this.dummyfp.getForm().reset();
                            	this.dummyfp.setTitle('��������ڵ�');
                            	this.dummyfp.getForm().setValues({
                            		PARENTID: node.id,
                            		ORGANGRADE: 3,
                            		ORGANKIND: 2,
                            		ISENABLED: 1
                            	});
								panel.getLayout().setActiveItem(this.dummyfp);
								panel.doLayout();
                            	break;
                            case 'create_user':
                            	if(!this.userfp) {
									this.userfp = new Ext.CreateUserForm();
									panel.add(this.userfp);
								}
								this.userfp.getForm().reset();
								this.userfp.setTitle('�����û�');
								var organId = node.id;
								if(node.attributes.organtype && node.attributes.organtype == '110')
									organId = node.attributes.organId;
                            	this.userfp.getForm().setValues({
                            		ORGANID: organId,
                            		ISENABLED:1
                            	});
                            	this.userfp.getForm().findField('ISADMIN').setVisible(false);
								panel.getLayout().setActiveItem(this.userfp.getId());
								panel.doLayout();
                            	break;
                            case 'create_bdz':
                            	if(!this.stationfp_bdz) {
									this.stationfp_bdz = new Ext.StationForm({operFlag: 1});
									panel.add(this.stationfp_bdz);
								}
								this.stationfp_bdz.getForm().reset();
                            	this.stationfp_bdz.getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '0',
                            		organname: node.text
                            	});
								panel.getLayout().setActiveItem(this.stationfp_bdz);
								panel.doLayout();                            
                            	break;
                            case 'create_dc':
                            	if(!this.stationfp_dc) {
									this.stationfp_dc = new Ext.StationForm({operFlag: 1});
									panel.add(this.stationfp_dc);
								}
								this.stationfp_dc.getForm().reset();
                            	this.stationfp_dc.getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '1',
                            		organname: node.text
                            	});
								panel.getLayout().setActiveItem(this.stationfp_dc);
								panel.doLayout();                            
                            	break;
                            /*case 'create_usergroup':
	                            if(!this.usergroup) {
									this.usergroup = new Ext.UsergroupForm({operFlag: 1});
									panel.add(this.usergroup);
								}
	                            
	                            if(node.attributes.iconCls == 'dispatchOrgan') {
		                            this.usergroup.getForm().setValues({
	                            		ORGANID: node.id,
	                            		ROLETYPE: 'SYS'
	                            	});
	                            } else {
	                            	this.usergroup.getForm().setValues({
	                            		ORGANID: node.attributes.organId,
	                            		ROLETYPE: 'SYS'
	                            	});
	                            }
	                            
								panel.getLayout().setActiveItem(this.usergroup);
								panel.doLayout();
                            	break;
                        	case 'create_role':
	                            if(!this.workflowRole) {
									this.workflowRole = new Ext.RoleForm({operFlag: 1});
									panel.add(this.workflowRole);
								}
	                            
	                            if(node.attributes.iconCls == 'dispatchOrgan') {
		                            this.workflowRole.getForm().setValues({
	                            		ORGANID: node.id,
	                            		ROLETYPE: 'WKF'
	                            	});
	                            } else {
	                            	this.workflowRole.getForm().setValues({
	                            		ORGANID: node.attributes.organId,
	                            		ROLETYPE: 'WKF'
	                            	});
	                            }
	                            
								panel.getLayout().setActiveItem(this.workflowRole);
								panel.doLayout();
	                        	break;	*/
                        }
                    }
                }
        	}
        },{
            id: 'delete',
            iconCls: 'delete',
            text: 'ɾ��'
        },{
            id: 'expandAllUsers',
            iconCls: 'expandAll',
            text: '�û��б�'
        }, '-', {
            id: 'sortUp',
            iconCls: 'sortUp',
            text: '����'
        }, {
        	id: 'sortDown',
            iconCls: 'sortDown',
            text: '����'
        }, '-',{
            id: 'cut',
            iconCls: 'cut',
            text: '����'
        },{
            id: 'copy',
            iconCls: 'copy',
            text: '����'
        }, {
            id: 'paste',
            iconCls: 'paste',
            text: 'ճ��'
        } , '-',{
            id: 'manager',
            iconCls: 'expandAll',
            text: '��������'
        }, '-',{
            id: 'expandAll',
            iconCls: 'expandAll',
            text: 'ȫ��չ��'
        }, '-',{
            id: 'userGroupAndRoleGrant',
            iconCls: 'expandAll',
            text: '��Ȩ����'
        }],
        listeners: {
            itemclick: function(item) {
                switch (item.id) {
                    case 'delete':
                        del(this.contextNode);
                        break;
                    case 'cut':
						item.cutNode = this.contextNode;
						Ext.getCmp('copy').copyNode = null;
                        break;    
					case 'copy':
						item.copyNode = this.contextNode;
						Ext.getCmp('cut').cutNode = null;
                        break;
                    case 'paste':
                        var curNode = this.contextNode;
                    	var copyNode = Ext.getCmp('copy').copyNode;
                    	if (copyNode != null) copy(curNode, copyNode);
                    	
                    	var cutNode = Ext.getCmp('cut').cutNode;
                    	if (cutNode != null) cut(curNode, cutNode);
                        break;
                        
                    case 'expandAll':
                    	contextMenu.contextNode.expand(true);
                    	break;
                    	
                    case 'sortUp':
                    	sort(this.contextNode, true);
                    	break;
                    case 'sortDown':
                    	sort(this.contextNode, false);
                    	break;
                    	
                    case 'expandAllUsers':
                    	if(!this.usergrid) {
							this.usergrid = new Ext.UserGrid();
							panel.add(this.usergrid);
						}
						panel.getLayout().setActiveItem(this.usergrid.getId());
						
						panel.doLayout();
						this.usergrid.loadUsersByOrganId(this.contextNode.id);
                    	break;
                    case 'manager':
                    	if(!this.manager) {
							this.manager = new Ext.ManagerTab();
							panel.add(this.manager);
						}
						panel.getLayout().setActiveItem(this.manager.getId());
						
						panel.doLayout();
                    	break;
                    case 'userGroupAndRoleGrant':
                    	if(!this.userGroupAndRoleGrant) {
							this.userGroupAndRoleGrant = new Ext.UserGroupAndRoleGrantTab();
							panel.add(this.userGroupAndRoleGrant);
						}
						panel.getLayout().setActiveItem(this.userGroupAndRoleGrant.getId());
						
						panel.doLayout();
						
						this.userGroupAndRoleGrant.init(this.contextNode.attributes.organgrade, this.contextNode.id, this.contextNode.attributes.areano);
                    	break;
                }
            }
        }
    });
	tree.on('contextmenu', function(node, e) {
		e.stopEvent();
		node.select();
		contextMenu.contextNode = node;
		
		if (isSuperAdmin) {
			Ext.getCmp('manager').enable(true);
		} else {
			Ext.getCmp('manager').setVisible(false);
		}
		
		if(node.isLeaf()) {
			Ext.getCmp('expandAll').disable();
			Ext.getCmp('expandAllUsers').disable();
		} else {
			Ext.getCmp('expandAll').enable();
			Ext.getCmp('expandAllUsers').enable();
		}
		contextMenu.findById('paste').disable();
		
		Ext.getCmp('copy').setVisible(false);
		Ext.getCmp('cut').setVisible(false);
		Ext.getCmp('delete').setVisible(false);
		
		Ext.getCmp('paste').disable();
		
		//���������Ϣ���û����ҵ�ǰѡ�еĽڵ����ǻ����Ļ�
		var copyNode = Ext.getCmp('copy').copyNode;
		if(copyNode && isUser(copyNode) && canUserCopy(node))
			Ext.getCmp('paste').enable();
		//���������Ϣ�ǻ������ҵ�ǰѡ�еĽڵ����ǻ����Ļ�
		if(copyNode && isOrgan(copyNode) && canOrganCopy(node))
			Ext.getCmp('paste').enable();
		
		//���������Ϣ���û����ҵ�ǰѡ�еĽڵ����ǻ����Ļ�
		var cutNode = Ext.getCmp('cut').cutNode;
		if(cutNode && isUser(cutNode) && canUserCopy(node))
			Ext.getCmp('paste').enable();
		//���������Ϣ�ǻ������ҵ�ǰѡ�еĽڵ����ǻ����Ļ�
		if(cutNode && isOrgan(cutNode) && canOrganCopy(node))
			Ext.getCmp('paste').enable();
		
		// �½��˵� - �˵�����
		Ext.getCmp('create').setVisible(false);
		if(node.attributes.iconCls == 'dispatchOrgan') {			//��λ
			Ext.getCmp('create').setVisible(true);
			
			Ext.getCmp('create_dispatchDept').setVisible(true);
			Ext.getCmp('create_user').setVisible(true);
			if (isSuperAdmin) {
			    Ext.getCmp('create_dispatchOrgan').setVisible(true);
				Ext.getCmp('copy').setVisible(true);
				Ext.getCmp('cut').setVisible(true);
				Ext.getCmp('delete').setVisible(true);
			} else {
				Ext.getCmp('create_dispatchOrgan').setVisible(false);
				Ext.getCmp('copy').setVisible(false);
				Ext.getCmp('cut').setVisible(false);
				Ext.getCmp('delete').setVisible(false);
			}
//			Ext.getCmp('create_usergroup').setVisible(true);
//			Ext.getCmp('create_role').setVisible(true);
			Ext.getCmp('create_dc').setVisible(true);
			Ext.getCmp('create_bdz').setVisible(true);
			Ext.getCmp('create_dummy').setVisible(true);
		} else if(node.attributes.iconCls == 'dispatchDept') { 	//����
			Ext.getCmp('create').setVisible(true);
			
			Ext.getCmp('create_dispatchOrgan').setVisible(false);
			Ext.getCmp('create_dispatchDept').setVisible(true);
			Ext.getCmp('create_user').setVisible(true);
//			Ext.getCmp('create_usergroup').setVisible(false);
//			Ext.getCmp('create_role').setVisible(false);
			Ext.getCmp('create_dc').setVisible(false);
			Ext.getCmp('create_bdz').setVisible(false);
			Ext.getCmp('create_dummy').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(isUser(node)) {	//�û�
			Ext.getCmp('create').setVisible(false);
			
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);	
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'dc' || node.attributes.iconCls == 'bdz') {	//��վ
			Ext.getCmp('create').setVisible(true);
			
			Ext.getCmp('create_dispatchOrgan').setVisible(false);
			Ext.getCmp('create_dispatchDept').setVisible(false);
			Ext.getCmp('create_user').setVisible(true);
//			Ext.getCmp('create_usergroup').setVisible(false);
//			Ext.getCmp('create_role').setVisible(false);
			Ext.getCmp('create_dc').setVisible(false);
			Ext.getCmp('create_bdz').setVisible(false);
			Ext.getCmp('create_dummy').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(false);
		} else if(!node.attributes.iconCls) {  //���û��iconCls������������ڵ�
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(false);
			var ot = node.attributes.organtype;
			if ( ot == '110') {
				Ext.getCmp('create').setVisible(true);
				
				Ext.getCmp('create_dispatchOrgan').setVisible(false);
				Ext.getCmp('create_dispatchDept').setVisible(false);
				Ext.getCmp('create_user').setVisible(true);
//				Ext.getCmp('create_usergroup').setVisible(false);
//				Ext.getCmp('create_role').setVisible(false);
				Ext.getCmp('create_dc').setVisible(false);
				Ext.getCmp('create_bdz').setVisible(false);
				Ext.getCmp('create_dummy').setVisible(false);
				Ext.getCmp('copy').setVisible(false);
				Ext.getCmp('cut').setVisible(false);
				Ext.getCmp('delete').setVisible(false);
			} else {
				menuCacher.get(ot, function(arr) {
					if(arr.length > 0) {
						Ext.getCmp('create').setVisible(true);
						Ext.getCmp('create_dispatchOrgan').setVisible(false);
						Ext.getCmp('create_dispatchDept').setVisible(false);
						Ext.getCmp('create_user').setVisible(false);
//						Ext.getCmp('create_usergroup').setVisible(false);
//						Ext.getCmp('create_role').setVisible(false);
						Ext.getCmp('create_dc').setVisible(false);
						Ext.getCmp('create_bdz').setVisible(false);
						Ext.getCmp('create_dummy').setVisible(false);
						
						Ext.each(arr, function(menu) {
							var comp = Ext.getCmp(menu.id);
							if(comp) comp.setVisible(true);
						});
						
					}
				});
			}
		} else {
			Ext.getCmp('create').setVisible(false);
		}
		
		contextMenu.showAt(e.getXY());
	});

	new Ext.Viewport({
		layout: 'border',
		style: 'background-color: #fff',
		items: [tree, panel]
	});
	//����
	new Ext.KeyMap(tree.getEl(), [{
	        key: "c",
	        ctrl:true,
	        fn: function() { 
		  	  	var item = Ext.getCmp('copy');
		  	  	var sm = tree.getSelectionModel();
		  	  	var node = sm.getSelectedNode();
		  	  	if(node) item.copyNode = node;
		  	}
		}, {
	        key: "v",
	        ctrl:true,
	        fn: function() { 
		  	  	var item = Ext.getCmp('copy');
		  	  	var copyNode = item.copyNode;
		  	  	
		  	  	var sm = tree.getSelectionModel();
		  	  	var curNode = sm.getSelectedNode();
		  	  	
		  	  	if(curNode && copyNode)
		  	  		copy(curNode, copyNode);
		  	}
		}
	]);
	//����
	new Ext.KeyMap(tree.getEl(), [{
	        key: "x",
	        ctrl:true,
	        fn: function() { 
		  	  	var item = Ext.getCmp('cut');
		  	  	var sm = tree.getSelectionModel();
		  	  	var node = sm.getSelectedNode();
		  	  	if(node) item.cutNode = node;
		  	}
		}, {
	        key: "v",
	        ctrl:true,
	        fn: function() { 
		  	  	var item = Ext.getCmp('cut');
		  	  	var cutNode = item.cutNode;
		  	  	
		  	  	var sm = tree.getSelectionModel();
		  	  	var curNode = sm.getSelectedNode();
		  	  	
		  	  	if(curNode && cutNode)
		  	  		cut(curNode, cutNode);
		  	}
		}
	]);
	
}