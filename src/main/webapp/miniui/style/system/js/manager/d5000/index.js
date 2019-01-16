/*****************
 * 
 * 
 * 
 * 	虚拟节点说明：
 * 每个虚拟节点都有organtype属性来标识，
 * 通过node.attributes.organtype来引用，
 * 本组织机构拥有的虚拟节点主要有：
 * organtype值		代表的含义
 * dummy			兼容老的
 * 256				所有用户组
 * 110				所有用户
 * 1				直调火电厂
 * 2				直调水电厂
 * 3				直调风电厂
 * 4				直调变电站
 * 5				电业局及超高压
 * 6				所有变电站
 * 7				本部
 * 
 * *****************************
 */

var formReply = function(response) {
	try {
		var reply = Ext.decode(response.responseText);
		if(reply.success != true) {
			if(reply.msg)
				Ext.Msg.alert('系统提示', reply.msg);
			else
				Ext.Msg.alert('系统提示', '保存失败！');
			return false;
		}
		return reply.msg;
	} catch(e) {
		Ext.Msg.alert('系统提示', '保存失败！');
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
			|| node.attributes.iconCls == 'bdz' || node.attributes.iconCls == 'fdc' || node.attributes.iconCls == 'wdc' 
			|| node.attributes.iconCls == 'winddc' || node.attributes.iconCls == 'ldc' || node.attributes.iconCls == 'ndc' 
			|| node.attributes.iconCls == 'ddc' || node.attributes.iconCls == 'gridCompany' || node.attributes.iconCls == 'genco'
			|| node.attributes.iconCls == 'otherOrgan';
	};
	
	var isSubStation = function(node) {
		return  node.attributes.iconCls == 'bdz' || node.attributes.iconCls == 'fdc' || node.attributes.iconCls == 'wdc' 
			|| node.attributes.iconCls == 'winddc' || node.attributes.iconCls == 'ldc' || node.attributes.iconCls == 'ndc' 
			|| node.attributes.iconCls == 'ddc';
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
	Ext.BLANK_IMAGE_URL = contextpath + '/extjs/resources/images/default/s.gif';
	
	Ext.MessageBox.buttonText.yes = '是';
	Ext.MessageBox.buttonText.no = '否';
	Ext.MessageBox.buttonText.ok = '确定';
	Ext.MessageBox.buttonText.cancel = '取消';
	
	var tree = new Ext.EompTree({
		id: 'navigation-tree',
		title: '组织机构 - ' + unitName,
		width: 215,
		region: 'west',
		split: true,
		margins: '2 2 2 2',
		frame: true
	});
	
	var panel = new Ext.Panel({
		region: 'center',
		margins: '2 2 2 0',
		layout: 'card',
		border: false,
		autoScroll: true
	});
	
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
					if(response.responseText == '1')
						node.parentNode.reload();
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
					if(response.responseText == '1')
						node.parentNode.parentNode.reload();
				}
			});
		}
	};
	
	tree.on('click', function(node) {
		node.select();
		var nodeId = node.id;
		if(node.attributes.iconCls == 'gridCompany') {
			if(!this.gridCompany) {
				this.gridCompany = new Ext.GridCompanyTab();
				panel.add(this.gridCompany);
			}
			this.gridCompany.getGridCompanyForm().loadProfression(node.id);
			this.gridCompany.getGridCompanyForm().getForm().findField('ORGANTYPE').setReadOnly(true);
		    this.gridCompany.getGridCompanyForm().getForm().findField('ORGANTYPE').addClass('x-field-gray');
			panel.getLayout().setActiveItem(this.gridCompany.getId());
			panel.doLayout();
			this.gridCompany.init(nodeId);
		} else if(node.attributes.iconCls == 'genco') {
			if(!this.genco) {
				this.genco = new Ext.GencoTab();
				panel.add(this.genco);
			}
			this.genco.getGencoForm().loadProfression(node.id);
			this.genco.getGencoForm().getForm().findField('ORGANTYPE').setReadOnly(true);
		    this.genco.getGencoForm().getForm().findField('ORGANTYPE').addClass('x-field-gray');
			panel.getLayout().setActiveItem(this.genco.getId());
			panel.doLayout();
			this.genco.init(nodeId);
		} else if(node.attributes.iconCls == 'dispatchOrgan') {
			if(!this.dispatchOrgan) {
				this.dispatchOrgan = new Ext.DispatchOrganTab();
				panel.add(this.dispatchOrgan);
			}
			this.dispatchOrgan.getDispatchOrganForm().loadProfression(node.id);
			this.dispatchOrgan.getDispatchOrganForm().getForm().findField('ORGANTYPE').setReadOnly(true);
		    this.dispatchOrgan.getDispatchOrganForm().getForm().findField('ORGANTYPE').addClass('x-field-gray');
			panel.getLayout().setActiveItem(this.dispatchOrgan.getId());
			panel.doLayout();
			this.dispatchOrgan.init(nodeId);
		}  else if(node.attributes.iconCls == 'dispatchDept') {
			if(!this.dispatchDept) {
				this.dispatchDept = new Ext.DispatchDeptTab();
				panel.add(this.dispatchDept);
			}
			this.dispatchDept.getDispatchDeptForm().loadProfression(node.id);
			this.dispatchDept.getDispatchDeptForm().getForm().findField('ORGANTYPE').setReadOnly(true);
		    this.dispatchDept.getDispatchDeptForm().getForm().findField('ORGANTYPE').addClass('x-field-gray');
			panel.getLayout().setActiveItem(this.dispatchDept.getId());
			panel.doLayout();
			this.dispatchDept.init(nodeId);
		}  else if(node.attributes.iconCls == 'otherOrgan') {
			if(!this.otherOrgan) {
				this.otherOrgan = new Ext.OtherOrganTab();
				panel.add(this.otherOrgan);
			}
			this.otherOrgan.getOtherOrganForm().loadProfression(node.id);
			this.otherOrgan.getOtherOrganForm().getForm().findField('ORGANTYPE').setReadOnly(true);
		    this.otherOrgan.getOtherOrganForm().getForm().findField('ORGANTYPE').addClass('x-field-gray');
			panel.getLayout().setActiveItem(this.otherOrgan.getId());
			panel.doLayout();
			this.otherOrgan.init(nodeId);
		} else if(node.attributes.iconCls == 'fdc') {	//火电厂
			if(!this.fdc) {
				this.fdc = new Ext.FDcTab();
				panel.add(this.fdc);
			}
			this.fdc.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
		    this.fdc.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
		    this.fdc.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
		    this.fdc.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
			this.fdc.getFDcForm().getForm().reset();
			this.fdc.getDcBaseForm().getForm().reset();
			panel.getLayout().setActiveItem(this.fdc.getId());
			panel.doLayout();
			this.fdc.init(nodeId, node.attributes.stationtype);
		} else if(node.attributes.iconCls == 'wdc') {	//水电厂
			if(!this.wdc) {
				this.wdc = new Ext.WDcTab();
				panel.add(this.wdc);
			}
			this.wdc.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
		    this.wdc.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
		    this.wdc.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
		    this.wdc.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
			this.wdc.getWDcForm().getForm().reset();
			this.wdc.getDcBaseForm().getForm().reset();
			panel.getLayout().setActiveItem(this.wdc.getId());
			panel.doLayout();
			this.wdc.init(nodeId, node.attributes.stationtype);
		} else if(node.attributes.iconCls == 'winddc') {	//风电厂
			if(!this.winddc) {
				this.winddc = new Ext.WindDcTab();
				panel.add(this.winddc);
			}
			this.winddc.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
		    this.winddc.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
		    this.winddc.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
		    this.winddc.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
			this.winddc.getWindDcForm().getForm().reset();
			this.winddc.getDcBaseForm().getForm().reset();
			panel.getLayout().setActiveItem(this.winddc.getId());
			panel.doLayout();
			this.winddc.init(nodeId, node.attributes.stationtype);
		} else if(node.attributes.iconCls == 'ndc') {	//核电站
			if(!this.ndc) {
				this.ndc = new Ext.NDcTab();
				panel.add(this.ndc);
			}
			this.ndc.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
		    this.ndc.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
		    this.ndc.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
		    this.ndc.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
			this.ndc.getNDcForm().getForm().reset();
			this.ndc.getDcBaseForm().getForm().reset();
			panel.getLayout().setActiveItem(this.ndc.getId());
			panel.doLayout();
			this.ndc.init(nodeId, node.attributes.stationtype);
		} else if(node.attributes.iconCls == 'ddc') {	//抽水蓄能电站
			if(!this.ddc) {
				this.ddc = new Ext.DDcTab();
				panel.add(this.ddc);
			}
			this.ddc.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
		    this.ddc.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
		    this.ddc.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
		    this.ddc.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
			this.ddc.getDDcForm().getForm().reset();
			this.ddc.getDcBaseForm().getForm().reset();
			panel.getLayout().setActiveItem(this.ddc.getId());
			panel.doLayout();
			this.ddc.init(nodeId, node.attributes.stationtype);
		} else if(node.attributes.iconCls == 'ldc') {	//光伏发电站
			if(!this.ldc) {
				this.ldc = new Ext.LDcTab();
				panel.add(this.ldc);
			}
			this.ldc.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
		    this.ldc.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
		    this.ldc.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
		    this.ldc.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
			this.ldc.getLDcForm().getForm().reset();
			this.ldc.getDcBaseForm().getForm().reset();
			panel.getLayout().setActiveItem(this.ldc.getId());
			panel.doLayout();
			this.ldc.init(nodeId, node.attributes.stationtype);
		} else if(node.attributes.iconCls == 'bdz') {	//变电站
			if(!this.bdz) {
				this.bdz = new Ext.BdzForm();
				//this.bdz = new Ext.BdzTab();
				panel.add(this.bdz);
			}
			this.bdz.getForm().findField('station_type').setReadOnly(true);
		    this.bdz.getForm().findField('station_flag').setReadOnly(true);
		    this.bdz.getForm().findField('station_type').addClass('x-field-gray');
		    this.bdz.getForm().findField('station_flag').addClass('x-field-gray');
			this.bdz.getForm().reset();
			panel.getLayout().setActiveItem(this.bdz);
			//this.bdz.getBdzForm().getForm().reset();
			panel.getLayout().setActiveItem(this.bdz.getId());
			panel.doLayout();
			this.bdz.loadBdz(node.id);
			//this.bdz.init(nodeId);
		} else if(node.attributes.iconCls == 'user' || node.attributes.iconCls == 'user_disable') {	//用户
			if(!this.user) {
				this.user = new Ext.D5000UserTab();
				panel.add(this.user);
			}
			this.user.getUserForm().getForm().reset();
			this.user.getUserForm().getForm().findField('ISADMIN').setVisible(false);
			panel.getLayout().setActiveItem(this.user.getId());
			panel.doLayout();
			this.user.init(node.id);
		} else {	//虚拟节点
			if(node.attributes.organtype && node.attributes.organtype == '110'
				|| node.attributes.organtype == '256' || node.attributes.organtype == '257') {
				if(!this.virtualNodeSystem) {
					this.virtualNodeSystem = new Ext.D5000VirtualNodeTab();
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
					this.virtualNode = new Ext.D5000VirtualNodeTab();
					this.virtualNode.getVirtualNodeForm().cacher = menuCacher;
					panel.add(this.virtualNode);
				}
				this.virtualNode.getVirtualNodeForm().loadProfression(node.id);
				panel.getLayout().setActiveItem(this.virtualNode.getId());
				
				panel.doLayout();
				this.virtualNode.init(nodeId);
			}
		}
	}, this);
	
	
	var copy = function(curNode, copyNode) {
		//复制用户到机构下
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
	    				curNode.reload();
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
					}
				});
			}
		}
		
		if (isOrgan(copyNode)) {
			var organId = copyNode.id;
			var organNode;
			var flag = 'organ';
			if(canOrganCopy(curNode)) organNode = curNode;
			if (isSubStation(copyNode)) {
				flag = copyNode.attributes.stationtype;
			}
			if(organNode) {
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/organ.do?method=copy&organId=' + organId + '&parentId=' + organNode.id + '&flag=' + flag + '',
					success: function(response, opts) {
	    				var msg = formReply(response);
	    				if(msg === false) return;
	    				curNode.reload();
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
					}
				});
			}
		}
	};
	
	
	var cut = function(curNode, cutNode) {
		//剪切用户到机构下
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
	    				curNode.reload();
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
					}
				});
			}
		}
		//剪切组织机构
		if (isOrgan(cutNode)) {
			var organId = cutNode.id;
			var organNode;
			var flag;
			if(canOrganCopy(curNode)) organNode = curNode;
			if (isSubStation(cutNode)) {
				flag = cutNode.attributes.stationtype;
			}
			if(organNode) {
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/organ.do?method=organTransfer&organId=' + organId + '&parentId=' + organNode.id + '&flag=' + flag + '',
					success: function(response, opts) {
	    				var msg = formReply(response);
	    				if(msg === false) return;
	    				
	    				curNode.reload();
	    				cutNode.remove();
					},
					failure: function(response, opts) {
						Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
					}
				});
			}
		}
	};
	
	var del = function(delNode) {
		var _this = this;
		//删除用户
		if(isUser(delNode)) {
			var userId = delNode.id;
			var employeeId = delNode.attributes.employeeid;
			Ext.Msg.show({
	    		title: '系统消息',
	    		msg: '您确定要删除该用户吗？',
	    		buttons: Ext.Msg.OKCANCEL,
	    		fn: function(buttonId){
	    			if (buttonId == 'ok'){
						Ext.Ajax.request({
							url: contextpath + '/tbp/sysmanager/user.do?method=delete&employeeId='+employeeId+'&userId=' + userId + '',
							success: function(response, opts) {
			    				var tree = Ext.getCmp('navigation-tree');
	    		    			var sm = tree.getSelectionModel();
	    		            	var node = sm.getSelectedNode();
	    		            	
	    		            	node.parentNode.parentNode.reload(function(n) {
	    		            		var allUserNode = n.findChild('organtype', 110);
	    		            		if(allUserNode)
	    		            			allUserNode.expand();
	    		            	});
							},
							failure: function(response, opts) {
								Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
							}
						});
					}
	    		},
    			icon: Ext.MessageBox.QUESTION
    		});	
			
		}
		
		//删除机构
		if(isOrgan(delNode)) {
			var organId = delNode.id;
			var type = delNode.attributes.iconCls;
			Ext.Msg.show({
	    		title: '系统消息',
	    		msg: '您确定要删除该机构吗？',
	    		buttons: Ext.Msg.OKCANCEL,
	    		fn: function(buttonId){
	    			if (buttonId == 'ok'){
						Ext.Ajax.request({
							url: contextpath + '/tbp/sysmanager/organ.do?method=delete&type=' + type + '&organId=' + organId,
	    					success: function (response, opts) {
	    						if (response.responseText == 'success') {
	    							var tree = Ext.getCmp('navigation-tree');
	        		    			var sm = tree.getSelectionModel();
	        		            	var node = sm.getSelectedNode();
	        		            	node.parentNode.reload();
	        		            	
	    						}
	    		    			if (response.responseText == 'failure') {
	    		    				Ext.MessageBox.alert('系统消息', '该机构存在下级机构或用户，请先删除下级机构或用户！'); 
	    		    			}
	    		    		},
	    		    		failure: function() {
	    		    			Ext.MessageBox.alert('系统消息', '删除机构失败！'); 
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
            text: '新建',
            menu: {
        		items:[{
        			id: 'create_gridCompany',
        			iconCls: 'gridCompany',
        			text: '新建【电网公司】'
        		},{
        			id: 'create_genco',
        			iconCls: 'genco',
        			text: '新建【发电公司】'
        		},{
        			id: 'create_dispatchOrgan',
        			iconCls: 'dispatchOrgan',
        			text: '新建【调度机构】'
        		},{
        			id: 'create_dispatchDept',
        			iconCls: 'dispatchDept',
        			text: '新建【调度机构部门】'
        		},{
        			id: 'create_otherOrgan',
        			iconCls: 'otherOrgan',
        			text: '新建【其他机构】'
        		},{
        			id: 'create_user',
        			iconCls: 'user',
        			text: '新建【用户】'
        		},{
        			id: 'create_dc',
        			iconCls: 'dc',
        			text: '新建【发电厂】',
        			menu: {
		        		items:[{
		        			id: 'create_dc_w',
		        			iconCls: 'wdc',
		        			text: '新建【水电厂】'
		        		},{
		        			id: 'create_dc_f',
		        			iconCls: 'fdc',
		        			text: '新建【火电厂】'
		        		},{
		        			id: 'create_dc_n',
		        			iconCls: 'ndc',
		        			text: '新建【核电站】'
		        		},{
		        			id: 'create_dc_wind',
		        			iconCls: 'winddc',
		        			text: '新建【风电厂】'
		        		},{
		        			id: 'create_dc_l',
		        			iconCls: 'ldc',
		        			text: '新建【光伏发电站】'
		        		},{
		        			id: 'create_dc_d',
		        			iconCls: 'ddc',
		        			text: '新建【抽水蓄能电站】'
		        		}],
			        	listeners: {
			        		itemclick: function(item) {
			        			var sm = tree.getSelectionModel();
			        			var node = sm.getSelectedNode();
				        		switch (item.id) {
		                        	case 'create_dc_w'://水电厂
                            	if(!this.stationfp_dc_w) {
									this.stationfp_dc_w = new Ext.WDcTab({operFlag: 1});
									panel.add(this.stationfp_dc_w);
								}
								this.stationfp_dc_w.getWDcForm().getForm().reset();
								this.stationfp_dc_w.getDcBaseForm().getForm().reset();
                            	this.stationfp_dc_w.getDcBaseForm().getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '1',
                            		organname: node.text,
                            		station_type: '4'
                            	});
                            	this.stationfp_dc_w.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
							    this.stationfp_dc_w.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
							    this.stationfp_dc_w.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
							    this.stationfp_dc_w.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.stationfp_dc_w);
								panel.doLayout();                            
                            	break;
                            case 'create_dc_f'://火电厂
                            	if(!this.stationfp_dc_f) {
									this.stationfp_dc_f = new Ext.FDcTab({operFlag: 1});
									panel.add(this.stationfp_dc_f);
								}
								this.stationfp_dc_f.getFDcForm().getForm().reset();
								this.stationfp_dc_f.getDcBaseForm().getForm().reset();
                            	this.stationfp_dc_f.getDcBaseForm().getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '1',
                            		organname: node.text,
                            		station_type: '3'
                            	});
                            	this.stationfp_dc_f.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
							    this.stationfp_dc_f.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
							    this.stationfp_dc_f.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
							    this.stationfp_dc_f.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.stationfp_dc_f);
								panel.doLayout();                            
                            	break;
                            case 'create_dc_n'://核电站
                            	if(!this.stationfp_dc_n) {
									this.stationfp_dc_n = new Ext.NDcTab({operFlag: 1});
									panel.add(this.stationfp_dc_n);
								}
								this.stationfp_dc_n.getNDcForm().getForm().reset();
								this.stationfp_dc_n.getDcBaseForm().getForm().reset();
                            	this.stationfp_dc_n.getDcBaseForm().getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '1',
                            		organname: node.text,
                            		station_type: '8'
                            	});
                            	this.stationfp_dc_n.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
							    this.stationfp_dc_n.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
							    this.stationfp_dc_n.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
							    this.stationfp_dc_n.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.stationfp_dc_n);
								panel.doLayout();                            
                            	break;
                            case 'create_dc_wind'://风电场
                            	if(!this.stationfp_dc_wind) {
									this.stationfp_dc_wind = new Ext.WindDcTab({operFlag: 1});
									panel.add(this.stationfp_dc_wind);
								}
								this.stationfp_dc_wind.getWindDcForm().getForm().reset();
								this.stationfp_dc_wind.getDcBaseForm().getForm().reset();
                            	this.stationfp_dc_wind.getDcBaseForm().getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '1',
                            		organname: node.text,
                            		station_type: '7'
                            	});
                            	this.stationfp_dc_wind.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
							    this.stationfp_dc_wind.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
							    this.stationfp_dc_wind.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
							    this.stationfp_dc_wind.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.stationfp_dc_wind);
								panel.doLayout();                            
                            	break;
                            case 'create_dc_l'://光伏发电站
                            	if(!this.stationfp_dc_l) {
									this.stationfp_dc_l = new Ext.LDcTab({operFlag: 1});
									panel.add(this.stationfp_dc_l);
								}
								this.stationfp_dc_l.getLDcForm().getForm().reset();
								this.stationfp_dc_l.getDcBaseForm().getForm().reset();
                            	this.stationfp_dc_l.getDcBaseForm().getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '1',
                            		organname: node.text,
                            		station_type: '9'
                            	});
                            	this.stationfp_dc_l.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
							    this.stationfp_dc_l.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
							    this.stationfp_dc_l.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
							    this.stationfp_dc_l.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.stationfp_dc_l);
								panel.doLayout();                            
                            	break; 
                            case 'create_dc_d'://抽水蓄能电站
                            	if(!this.stationfp_dc_d) {
									this.stationfp_dc_d = new Ext.DDcTab({operFlag: 1});
									panel.add(this.stationfp_dc_d);
								}
								this.stationfp_dc_d.getDDcForm().getForm().reset();
								this.stationfp_dc_d.getDcBaseForm().getForm().reset();
                            	this.stationfp_dc_d.getDcBaseForm().getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '1',
                            		organname: node.text,
                            		station_type: '10'
                            	});
                            	this.stationfp_dc_d.getDcBaseForm().getForm().findField('station_type').setReadOnly(true);
							    this.stationfp_dc_d.getDcBaseForm().getForm().findField('station_flag').setReadOnly(true);
							    this.stationfp_dc_d.getDcBaseForm().getForm().findField('station_type').addClass('x-field-gray');
							    this.stationfp_dc_d.getDcBaseForm().getForm().findField('station_flag').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.stationfp_dc_d);
								panel.doLayout();                            
                            	break;
			        			}
			        		}
	        			}
        			}
        		},{
        			id: 'create_bdz',
        			iconCls: 'bdz',
        			text: '新建【变电站】'
        		},{
        			id: 'create_dummy',
        			iconCls: 'dummy',
        			text: '新建【虚拟节点】'
        		}],
                listeners: {
                    itemclick: function(item) {
			        	var sm = tree.getSelectionModel();
			        	var node = sm.getSelectedNode();
        	
                        switch (item.id) {
                        	case 'create_gridCompany':
                            	if(! this.gridCompanyfp) {
                            		this.gridCompanyfp = new Ext.GridCompanyForm({operFlag: 1});
                            		panel.add(this.gridCompanyfp);
                            	}
                            	this.gridCompanyfp.getForm().reset();
                            	this.gridCompanyfp.setTitle('创建电网公司');
                            	this.gridCompanyfp.loadProfression(node.id);
                            	this.gridCompanyfp.getForm().setValues.defer(500, this.gridCompanyfp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'gridCompany',
                            		ISENABLED: 1,
                            		ORGANGRADE: node.attributes.organgrade,//机构级别
                            		AREANO: node.attributes.areano,//区域编码
                            		PROFESSION_ID: node.attributes.profession_id,//所属专业
                            		PARENTORGANNAME: node.text
                            	}]);
                            	this.gridCompanyfp.getForm().findField('ORGANTYPE').setReadOnly(true);
							    this.gridCompanyfp.getForm().findField('ORGANTYPE').addClass('x-field-gray');
                            	panel.getLayout().setActiveItem(this.gridCompanyfp.getId());
                    			panel.doLayout();
                                break;
                            case 'create_genco':
                            	if(! this.gencofp) {
                            		this.gencofp = new Ext.GencoForm({operFlag: 1});
                            		panel.add(this.gencofp);
                            	}
                            	this.gencofp.getForm().reset();
                            	this.gencofp.setTitle('创建发电公司');
                            	this.gencofp.loadProfression(node.id);
                            	this.gencofp.getForm().setValues.defer(500, this.gencofp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'genco',
                            		ISENABLED: 1,
                            		ORGANGRADE: node.attributes.organgrade,//机构级别
                            		AREANO: node.attributes.areano,//区域编码
                            		PROFESSION_ID: node.attributes.profession_id,//所属专业
                            		PARENTORGANNAME: node.text
                            	}]);
                            	this.gencofp.getForm().findField('ORGANTYPE').setReadOnly(true);
							    this.gencofp.getForm().findField('ORGANTYPE').addClass('x-field-gray');
                            	panel.getLayout().setActiveItem(this.gencofp.getId());
                    			panel.doLayout();
                                break;    
                            case 'create_dispatchOrgan':
                            	if(! this.dispatchOrganfp) {
                            		this.dispatchOrganfp = new Ext.DispatchOrganForm({operFlag: 1});
                            		panel.add(this.dispatchOrganfp);
                            	}
                            	this.dispatchOrganfp.getForm().reset();
                            	this.dispatchOrganfp.setTitle('创建调度机构');
                            	this.dispatchOrganfp.loadProfression(node.id);
                            	this.dispatchOrganfp.getForm().setValues.defer(500, this.dispatchOrganfp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'unit',
                            		ISENABLED: 1,
                            		ORGANGRADE: node.attributes.organgrade,//机构级别
                            		AREANO: node.attributes.areano,//区域编码
                            		PROFESSION_ID: node.attributes.profession_id,//所属专业
                            		PARENTORGANNAME: node.text
                            	}]);
                            	this.dispatchOrganfp.getForm().findField('ORGANTYPE').setReadOnly(true);
							    this.dispatchOrganfp.getForm().findField('ORGANTYPE').addClass('x-field-gray');
                            	panel.getLayout().setActiveItem(this.dispatchOrganfp.getId());
                    			panel.doLayout();
                                break;
                            case 'create_dispatchDept':
                            	if(!this.dispatchDeptfp) {
									this.dispatchDeptfp = new Ext.DispatchDeptForm({operFlag: 1});
									panel.add(this.dispatchDeptfp);
								}
                            	this.dispatchDeptfp.getForm().reset();
                            	this.dispatchDeptfp.setTitle('创建调度机构部门');
                            	this.dispatchDeptfp.loadProfression(node.id);
                            	this.dispatchDeptfp.getForm().setValues.defer(500, this.dispatchDeptfp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'dept',
                            		ISENABLED: 1,
                            		ORGANGRADE: node.attributes.organgrade,//机构级别
                            		AREANO: node.attributes.areano,//区域编码
                            		PROFESSION_ID: node.attributes.profession_id,//所属专业
                            		PARENTORGANNAME: node.text
                            	}]);
                            	this.dispatchDeptfp.getForm().findField('ORGANTYPE').setReadOnly(true);
							    this.dispatchDeptfp.getForm().findField('ORGANTYPE').addClass('x-field-gray');
							    this.dispatchDeptfp.getForm().findField('ORGANGRADE').setReadOnly(true);
							    this.dispatchDeptfp.getForm().findField('ORGANGRADE').addClass('x-field-gray');
							    this.dispatchDeptfp.getForm().findField('AREANO').setReadOnly(true);
							    this.dispatchDeptfp.getForm().findField('AREANO').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.dispatchDeptfp);
								panel.doLayout();
                            	break;
                            case 'create_otherOrgan':
                            	if(!this.otherOrganfp) {
									this.otherOrganfp = new Ext.OtherOrganForm({operFlag: 1});
									panel.add(this.otherOrganfp);
								}
                            	this.otherOrganfp.getForm().reset();
                            	this.otherOrganfp.setTitle('创建其他机构');
                            	this.otherOrganfp.loadProfression(node.id);
                            	this.otherOrganfp.getForm().setValues.defer(500, this.otherOrganfp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'otherOrgan',
                            		ISENABLED: 1,
                            		ORGANGRADE: node.attributes.organgrade,//机构级别
                            		AREANO: node.attributes.areano,//区域编码
                            		PROFESSION_ID: node.attributes.profession_id,//所属专业
                            		PARENTORGANNAME: node.text
                            	}]);
                            	this.otherOrganfp.getForm().findField('ORGANTYPE').setReadOnly(true);
							    this.otherOrganfp.getForm().findField('ORGANTYPE').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.otherOrganfp);
								panel.doLayout();
                            	break;
                            case 'create_dummy':
                            	if(!this.dummyfp) {
									this.dummyfp = new Ext.D5000VirtualNodeForm({operFlag: 1});
									panel.add(this.dummyfp);
								}
                            	this.dummyfp.getForm().reset();
                            	this.dummyfp.setTitle('创建虚拟节点');
                            	this.dummyfp.loadProfression(node.id);
                            	this.dummyfp.getForm().setValues.defer(500, this.dummyfp.getForm(), [{
                            		PARENTID: node.id,
                            		ORGANTYPE: 'dummy',
                            		ORGANGRADE: node.attributes.organgrade,//机构级别
                            		AREANO: node.attributes.areano,//区域编码
                            		PROFESSION_ID: node.attributes.profession_id,//所属专业
                            		ISENABLED: 1
                            	}]);
								panel.getLayout().setActiveItem(this.dummyfp);
								panel.doLayout();
                            	break;
                            case 'create_user':
                            	if(!this.userfp) {
									this.userfp = new Ext.D5000CreateUserForm();
									panel.add(this.userfp);
								}
								this.userfp.getForm().reset();
								this.userfp.getForm().findField('ISADMIN').setVisible(false);
								this.userfp.setTitle('创建用户');
								var organId = node.id;
								if(node.attributes.organtype && node.attributes.organtype == '110')
									organId = node.attributes.organId;
                            	this.userfp.getForm().setValues({
                            		ORGANID: organId,
                            		ISENABLED: 1
                            	});
								panel.getLayout().setActiveItem(this.userfp.getId());
								panel.doLayout();
                            	break;
                            case 'create_bdz':
                            	if(!this.stationfp_bdz) {
									this.stationfp_bdz = new Ext.BdzForm({operFlag: 1});
									panel.add(this.stationfp_bdz);
								}
								this.stationfp_bdz.getForm().reset();
                            	this.stationfp_bdz.getForm().setValues({
                            		orga_id: node.id,
                            		station_flag: '0',
                            		organname: node.text,
                            		station_type: '0'
                            	});
							    this.stationfp_bdz.getForm().findField('station_flag').setReadOnly(true);
							    this.stationfp_bdz.getForm().findField('station_flag').addClass('x-field-gray');
								panel.getLayout().setActiveItem(this.stationfp_bdz);
								panel.doLayout();                            
                            	break;
                            
                        }
                    }
                }
        	}
        },{
            id: 'delete',
            iconCls: 'delete',
            text: '删除'
        },{
            id: 'expandAllUsers',
            iconCls: 'expandAll',
            text: '用户列表'
        }, '-', {
            id: 'sortUp',
            iconCls: 'sortUp',
            text: '上移'
        }, {
        	id: 'sortDown',
            iconCls: 'sortDown',
            text: '下移'
        }, '-',{
            id: 'cut',
            iconCls: 'cut',
            text: '剪切'
        },{
            id: 'copy',
            iconCls: 'copy',
            text: '复制'
        }, {
            id: 'paste',
            iconCls: 'paste',
            text: '粘帖'
        },'-',{
            id: 'manager',
            iconCls: 'expandAll',
            text: '基础管理'
        },'-',{
            id: 'expandAll',
            iconCls: 'expandAll',
            text: '全部展开'
        }, '-',{
            id: 'userGroupAndRoleGrant',
            iconCls: 'expandAll',
            text: '授权管理'
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
							this.usergrid = new Ext.D5000UserGrid();
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
			Ext.getCmp('manager').disable(false);
		}
		
		if(node.isLeaf()) {
			Ext.getCmp('expandAll').disable();
			Ext.getCmp('expandAllUsers').disable();
		} else {
			Ext.getCmp('expandAll').enable();
			Ext.getCmp('expandAllUsers').enable();
		}
		contextMenu.findById('paste').disable();
		
		Ext.getCmp('create').setVisible(true);
		Ext.getCmp('copy').setVisible(false);
		Ext.getCmp('cut').setVisible(false);
		Ext.getCmp('delete').setVisible(false);
		
		Ext.getCmp('paste').disable();
		
		//如果复制信息是用户，且当前选中的节点又是机构的话
		var copyNode = Ext.getCmp('copy').copyNode;
		if(copyNode && isUser(copyNode) && canUserCopy(node))
			Ext.getCmp('paste').enable();
		//如果复制信息是机构，且当前选中的节点又是机构的话
		if(copyNode && isOrgan(copyNode) && canOrganCopy(node))
			Ext.getCmp('paste').enable();
		
		//如果复制信息是用户，且当前选中的节点又是机构的话
		var cutNode = Ext.getCmp('cut').cutNode;
		if(cutNode && isUser(cutNode) && canUserCopy(node))
			Ext.getCmp('paste').enable();
		//如果复制信息是机构，且当前选中的节点又是机构的话
		if(cutNode && isOrgan(cutNode) && canOrganCopy(node))
			Ext.getCmp('paste').enable();
		// 新建菜单 - 菜单控制
		if(node.attributes.iconCls == 'gridCompany') {			//电网公司
			Ext.getCmp('create_gridCompany').setVisible(true);
			Ext.getCmp('create_genco').setVisible(true);
			Ext.getCmp('create_dispatchOrgan').setVisible(true);
			Ext.getCmp('create_dispatchDept').setVisible(false);
			Ext.getCmp('create_otherOrgan').setVisible(true);
			Ext.getCmp('create_user').setVisible(true);
			Ext.getCmp('create_dc').setVisible(true);
			Ext.getCmp('create_bdz').setVisible(true);
			Ext.getCmp('create_dummy').setVisible(true);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'dispatchOrgan') {			//调度机构
			Ext.getCmp('create_gridCompany').setVisible(false);
			Ext.getCmp('create_genco').setVisible(false);
			Ext.getCmp('create_otherOrgan').setVisible(false);
			Ext.getCmp('create_dispatchOrgan').setVisible(true);
			Ext.getCmp('create_dispatchDept').setVisible(true);
			Ext.getCmp('create_user').setVisible(true);
			Ext.getCmp('create_dc').setVisible(true);
			Ext.getCmp('create_bdz').setVisible(true);
			Ext.getCmp('create_dummy').setVisible(true);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'dispatchDept') { 	//部门
			Ext.getCmp('create_gridCompany').setVisible(false);
			Ext.getCmp('create_genco').setVisible(false);
			Ext.getCmp('create_otherOrgan').setVisible(false);
			Ext.getCmp('create_dispatchOrgan').setVisible(false);
			Ext.getCmp('create_dispatchDept').setVisible(true);
			Ext.getCmp('create_user').setVisible(true);
			Ext.getCmp('create_dc').setVisible(false);
			Ext.getCmp('create_bdz').setVisible(false);
			Ext.getCmp('create_dummy').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(isUser(node)) {	//用户
			Ext.getCmp('create').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);	
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'bdz') {	//厂站
			Ext.getCmp('create_gridCompany').setVisible(false);
			Ext.getCmp('create_genco').setVisible(false);
			Ext.getCmp('create_otherOrgan').setVisible(false);
			Ext.getCmp('create_dispatchOrgan').setVisible(false);
			Ext.getCmp('create_dispatchDept').setVisible(false);
			Ext.getCmp('create_user').setVisible(true);
			Ext.getCmp('create_dc').setVisible(false);
			Ext.getCmp('create_bdz').setVisible(true);
			Ext.getCmp('create_dummy').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'fdc' || node.attributes.iconCls == 'wdc' || node.attributes.iconCls == 'winddc' ||
				  node.attributes.iconCls == 'ldc' || node.attributes.iconCls == 'ndc' || node.attributes.iconCls == 'ddc') {	//厂站
			Ext.getCmp('create_gridCompany').setVisible(false);
			Ext.getCmp('create_genco').setVisible(false);
			Ext.getCmp('create_otherOrgan').setVisible(false);
			Ext.getCmp('create_dispatchOrgan').setVisible(false);
			Ext.getCmp('create_dispatchDept').setVisible(false);
			Ext.getCmp('create_user').setVisible(true);
			Ext.getCmp('create_dc').setVisible(true);
			Ext.getCmp('create_bdz').setVisible(false);
			Ext.getCmp('create_dummy').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'genco') {	//发电公司
			Ext.getCmp('create_gridCompany').setVisible(false);
			Ext.getCmp('create_genco').setVisible(true);
			Ext.getCmp('create_otherOrgan').setVisible(false);
			Ext.getCmp('create_dispatchOrgan').setVisible(false);
			Ext.getCmp('create_dispatchDept').setVisible(false);
			Ext.getCmp('create_user').setVisible(true);
			Ext.getCmp('create_dc').setVisible(false);
			Ext.getCmp('create_bdz').setVisible(false);
			Ext.getCmp('create_dummy').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'otherOrgan') {	//其他机构
			Ext.getCmp('create_gridCompany').setVisible(false);
			Ext.getCmp('create_genco').setVisible(false);
			Ext.getCmp('create_otherOrgan').setVisible(true);
			Ext.getCmp('create_dispatchOrgan').setVisible(false);
			Ext.getCmp('create_dispatchDept').setVisible(false);
			Ext.getCmp('create_user').setVisible(true);
			Ext.getCmp('create_dc').setVisible(false);
			Ext.getCmp('create_bdz').setVisible(false);
			Ext.getCmp('create_dummy').setVisible(false);
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(true);
		} else if(node.attributes.iconCls == 'dummy') {			//如果没有iconCls，它就是虚拟节点
			Ext.getCmp('create_gridCompany').setVisible(false);
			Ext.getCmp('create_genco').setVisible(false);
			Ext.getCmp('create_otherOrgan').setVisible(false);
			
			Ext.getCmp('copy').setVisible(true);
			Ext.getCmp('cut').setVisible(true);
			Ext.getCmp('delete').setVisible(false);
			var ot = node.attributes.organtype;
			if ( ot == '110') {
				Ext.getCmp('create').setVisible(true);
				
				Ext.getCmp('create_dispatchOrgan').setVisible(false);
				Ext.getCmp('create_dispatchDept').setVisible(false);
				Ext.getCmp('create_user').setVisible(true);
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
	//复制
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
	//剪切
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