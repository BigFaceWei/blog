/*****************
 * 
 * 菜单管理
 * date:2013/07/01
 * 
 * ***************
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
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = contextPath + '/extjs/resources/images/default/s.gif';
	
	Ext.MessageBox.buttonText.yes = '是';
	Ext.MessageBox.buttonText.no = '否';
	Ext.MessageBox.buttonText.ok = '确定';
	Ext.MessageBox.buttonText.cancel = '取消';
	
	var tree = new Ext.MenuTree({
		id: 'menuTree',
		title: '菜单树',
		width: 215,
		region: 'west',
		split: true,
		margins: '2 2 2 2'
	});
	
	var panel = new Ext.Panel({
		region: 'center',
		margins: '2 2 2 0',
		layout: 'card',
		border: false
	});
	
	tree.on('click', function(node) {
		node.select();
		var nodeId = node.id;
 		
		if (node.isLeaf() == true) {//叶子节点
			if(!this.menu) {
				this.menu = new Ext.MenuTab();
				panel.add(this.menu);
			}
			
		/*	if (isSuperAdmin) {
				if (node.attributes.gradeId == gradeId) {
					this.menu.getMenuUserGroupGrant().getUserGroupTree().getTopToolbar().setVisible(true);//用户组不可见
				} else {
					this.menu.getMenuUserGroupGrant().getUserGroupTree().getTopToolbar().setVisible(false);//用户组不可见
				}
				
				this.menu.getMenuForm().getTopToolbar().setVisible(true);
			} else {
				this.menu.getMenuUserGroupGrant().getUserGroupTree().getTopToolbar().setVisible(true);
				this.menu.getMenuForm().getTopToolbar().setVisible(false);
			}*/
			panel.getLayout().setActiveItem(this.menu.getId());
			panel.doLayout();
			this.menu.init(nodeId, node.attributes.moduleId, node.attributes.gradeId);
		} else {                    //非叶子节点
			if(!this.menuForm) {
				this.menuForm = new Ext.MenuForm();
				panel.add(this.menuForm);
			}
			
			if (isSuperAdmin) {
				this.menuForm.getTopToolbar().setVisible(true);
			} else {
				this.menuForm.getTopToolbar().setVisible(false);
			}
			this.menuForm.getForm().findField('GRADEID').setReadOnly(true);
			this.menuForm.getForm().findField('GRADEID').addClass('x-field-gray');
			this.menuForm.getForm().findField('URL').setReadOnly(true);
			this.menuForm.getForm().findField('URL').addClass('x-field-gray');
			this.menuForm.getForm().findField('ISLEAF').setVisible(false);
			
			panel.getLayout().setActiveItem(this.menuForm.getId());
			panel.doLayout();
			this.menuForm.loadMenu(nodeId);
		}
	}, this);
	
	var contextMenu = new Ext.menu.Menu({
        items: [{
        	id: 'create_menu',
        	text: '新建下级菜单',
        	iconCls: 'menuItem'
        }, {
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
        }, {
            id: 'copy',
            iconCls: 'copy',
            text: '复制'
        }, {
            id: 'paste',
            iconCls: 'paste',
            text: '粘帖'
        }],
        listeners: {
            itemclick: function(item) {
            	var sm = tree.getSelectionModel();
	        	var node = sm.getSelectedNode();
	        	
            	 switch (item.id) {
	                 case 'create_menu':
	                 	if(! this.menufp) {
                    		this.menufp = new Ext.CreateMenuForm();
                    		panel.add(this.menufp);
                    	}
                    	this.menufp.getForm().reset();
                    	this.menufp.getForm().setValues({
						    PARENTID: node.id,
						    GRADEID: gradeId,
						    OPENMODE: 0,
						    ISLEAF: 1
                    	});
                    	panel.getLayout().setActiveItem(this.menufp.getId());
            			panel.doLayout();
	                    break;
	                 case 'sortUp':
	                 	sort(node, true);
	                 	break;
	                 case 'sortDown': 
	                 	sort(node, false);
	                 	break;
	                 case 'cut':
						item.cutNode = node;
						Ext.getCmp('copy').copyNode = null;
                        break;    
					case 'copy':
						item.copyNode = node;
						Ext.getCmp('cut').cutNode = null;
                        break;
                    case 'paste':
                        var curNode = node;
                    	var copyNode = Ext.getCmp('copy').copyNode;
                    	if (copyNode != null) copy(curNode, copyNode);
                    	
                    	var cutNode = Ext.getCmp('cut').cutNode;
                    	if (cutNode != null) cut(curNode, cutNode);
                        break;	
            	 }        
        	}
        }
	});
	tree.on('contextmenu', function(node, e) {
	    node.select();
		contextMenu.showAt(e.getXY());
		
		if(!isSuperAdmin || node.isLeaf() == true){
			Ext.getCmp('create_menu').disable();
		} else {
			Ext.getCmp('create_menu').enable();
		}
		
		Ext.getCmp('paste').disable();
		//如果复制信息
		var copyNode = Ext.getCmp('copy').copyNode;
		if(copyNode)
			Ext.getCmp('paste').enable();
		
		//如果剪切
		var cutNode = Ext.getCmp('cut').cutNode;
		if(cutNode)
			Ext.getCmp('paste').enable();
		
		
	});

	new Ext.Viewport({
		layout: 'border',
		style: 'background-color: #fff',
		items: [tree, panel]
	});
	
	var sort = function(node, up) {
		var parent = node.parentNode;
		if(parent == tree.getRootNode()) return;
		
		var index = -1;
		
		var arr = [];
		for(var i=0, len = parent.childNodes.length; i<len; i++) {
			if(parent.childNodes[i] == node) index = arr.length;
			arr.push(parent.childNodes[i].id);
		}
		if(up === true && index == 0) return;
		if(up !== true && index == (arr.length - 1)) return;
		var temp = arr[index];
		arr[index] = arr[up == true ? index - 1 : index + 1];
		arr[up == true ? index - 1 : index + 1] = temp;
		
		Ext.Ajax.request({
			url: contextPath + '/tbp/sysmanager/menu.do?method=sort&sortTable=menu',
			params: {sortArray: Ext.encode(arr)},
			success: function(response, opts) {
				if(response.responseText == '1')
					node.parentNode.reload();
			}
		});
	}
	
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
	
	//节点右键复制
	var copy = function(curNode, copyNode) {
		var menuId = curNode.id;
		var copyMenuId = copyNode.id;
		Ext.Ajax.request({
			url: contextPath + '/tbp/sysmanager/menu.do?method=copyMenu',
			params: {
				menuId: menuId,
				copyMenuId: copyMenuId,
				moduleId: curNode.attributes.moduleId,
				copyModuleId: copyNode.attributes.moduleId
			},
			success: function(response, opts) {
				var msg = formReply(response);
				if(msg === false) return;
				
				curNode.reload(function(n) {
					tree.getLayoutTarget().scroll('b', 60);
				});
			},
			failure: function(response, opts) {
				Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
			}
		});
	};
	
	//节点右键剪切
	var cut = function(curNode, cutNode) {
		var menuId = curNode.id;
		var cutMenuId = cutNode.id;
		Ext.Ajax.request({
			url: contextPath + '/tbp/sysmanager/menu.do?method=transferMenu',
			params: {
				menuId: menuId,
				cutMenuId: cutMenuId,
				moduleId: curNode.attributes.moduleId,
				cutModuleId: cutNode.attributes.moduleId
			},
			success: function(response, opts) {
				var msg = formReply(response);
				if(msg === false) return;
				
				cutNode.parentNode.reload();
				curNode.reload(function(n) {
					tree.getLayoutTarget().scroll('b', 60);
				});
			},
			failure: function(response, opts) {
				Ext.MessageBox.alert('系统消息', '与服务器交互失败！'); 
			}
		});
	};
}