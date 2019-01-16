Ext.VirtualNodeForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '节点信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		var _this = this;
		var store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/areano.do?method=listVirtualNodes',
		    fields: ['TYPEID','TYPENAME']  
		});
		store.load();
		
		var gradeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgangrades',
	    	fields: ['GRADEID', 'GRADENAME']
	    });
		gradeStore.load();
		
		var kindStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgankinds',
	    	fields: ['KINDID', 'KINDNAME']
	    });
		kindStore.load();
		
		var professionStore = this.professionStore = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessions',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		//professionStore.load();
		
		var areanoStore = new Ext.data.JsonStore({
			fields: ['ZONE_NO','ZONE_NAME','ORGANGRADE'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listAreas'
		});
		areanoStore.load();
		
		var twoTree = new Ext.TwoTree();
		
		this.items = [{
			fieldLabel: '节点ID',
			name: 'ORGANID',
			xtype: 'hidden'
		}, {
			fieldLabel: '节点名称',
			name: 'ORGANNAME',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '机构编码',
			name: 'ORGANCODE',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '上级单位',
			name: 'PARENTID',
			xtype:'hidden'
		}, {
			fieldLabel: '节点类型',
			hiddenName: 'ORGANTYPE',
			xtype: 'combo',
			typeAhead: true,
	        mode: 'remote',
            triggerAction: 'all',
            forceSelection: true,//必须选择一项  
	        store: store, 
            valueField :"TYPEID",  
            displayField: "TYPENAME",  
            emptyText:'请选择节点类型...',//默认值  
            blankText: '节点类型为必填项',
            editable: false,//不允许输入  
            allowBlank: false,
	        width: 250
		}, {
			fieldLabel: '<font color="red">*</font>机构级别',
			hiddenName: 'ORGANGRADE',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'GRADENAME',
	        valueField: 'GRADEID',
	        store: gradeStore,
	        allowBlank: false,
			blankText: '机构级别不能为空，请填写',
	        width: 250
		}, {
			fieldLabel: '机构类别',
			name: 'ORGANKIND',
			xtype: 'hidden',
			value: 2,
	        width: 250
		}, {
			fieldLabel: '<font color="red">*</font>区域编码',
			name: 'AREANO',
			xtype: 'hidden',
			/*hiddenName: 'AREANO',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'ZONE_NAME',
	        valueField: 'ZONE_NO',
	        store: areanoStore,
	        allowBlank: false,
			blankText: '区域编码不能为空，请填写',*/
	        width: 250
		}, {
			fieldLabel: '所属专业',
			hiddenName: 'PROFESSION_ID',
			xtype: 'lovcombo',
			store: professionStore, 
			hideOnSelect : false,   
            valueField :"PROFESSION_ID",  
            displayField: "PROFESSION_NAME",
            typeAhead : true,   
            emptyText:'请选择所属专业...',//默认值  
            editable: false,//不允许输入  
            triggerAction: 'all',
            //showSelectAll: true,//显示全部选择
	        width: 250  
		}, {
			fieldLabel: '是否启用',
			name: 'ISENABLED',
			xtype:'hidden',
			checked: true,
			width: 250,
			inputValue: 1
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.saveOrgan
		}, {
			iconCls: 'delete',
			text : '删除',
			scope: this,
			handler: this.deleteOrgan
		}/*, {
			iconCls: 'add',
			text : '节点类型维护',
			scope: this,
			handler: function() {
				if(!this.win) {
					this.win = new Ext.Window({
						title: '节点类型信息',
						width: 350,
						height: 450,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.NodeGrid({
							listeners: {
								afterModify: function() {
									store.reload();
									twoTree.getStore().reload();
									_this.cacher.clear();
								}
							}
						})
					});
				}
				this.win.show();
			}
		}, {
			iconCls: 'add',
			text : '右键菜单控制',
			scope: this,
			handler: function() {
				if(!this.rightWin) {
					this.rightWin = new Ext.Window({
						title: '右键菜单控制',
						width: 480,
						height: 350,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: twoTree
					});
				}
				this.rightWin.show();
			}
		}*/];
		
		Ext.VirtualNodeForm.superclass.initComponent.call(this);
		
		twoTree.on('afterSave', function() {
			_this.cacher.clear();
		});
	},
	
	loadOrgan: function(organId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/organ.do?method=get&organId=' + organId,
			method: 'GET'
		});
	},
	
	// 操作标志，1表示新增、2表示修改
	operFlag: 2,
    
	saveOrgan: function() {
		var _this = this;
		Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/organ.do?method=save',
			params: {organInfo: Ext.encode(this.getForm().getValues())},
			success: function (response, opts) {
				var msg = formReply(response);
				if(msg === false) return;
				
    			var tree = Ext.getCmp('navigation-tree');
    			var sm = tree.getSelectionModel();
            	var node = sm.getSelectedNode();
            	
            	if(_this.operFlag == 2) {
            		node.parentNode.reload(function(n) {
            			var selectedNode = tree.getNodeById(msg);
            			selectedNode.fireEvent('click', selectedNode);
            		});
            	} else {
            		node.reload(function(n) {
            			var selectedNode = tree.getNodeById(msg);
            			selectedNode.fireEvent('click', selectedNode);
            		});
            	}
    		},
    		failure: function() {
    			Ext.Msg.alert('系统提示', '与服务器交互失败！');
        	}
		});
		
    },
    
    deleteOrgan: function() {
    	var _this = this;
    	var organ = this.getForm().getValues();
    	
    	if(!organ.ORGANID || organ.ORGANID == '') return;
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该节点吗？',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
	    		if (buttonId == 'ok'){
			    	Ext.Ajax.request({
						url: contextpath + '/tbp/sysmanager/organ.do?method=delete&organId=' + organ.ORGANID,
						success: function (options, success, response) {
			    			var tree = Ext.getCmp('navigation-tree');
			    			var sm = tree.getSelectionModel();
			            	var node = sm.getSelectedNode();
			            	node.parentNode.reload();
			            	
			            	_this.getForm().reset();
			            	if (response.responseText == 'failure') {
    		    				Ext.MessageBox.alert('系统消息', '该节点存在下级机构或用户，请先删除下级机构或用户！'); 
    		    			}
			    		},
			    		failure: function() {
			        		Ext.MessageBox.alert('系统消息','删除节点失败！');
			        	}
					});
	    		}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
    }
});