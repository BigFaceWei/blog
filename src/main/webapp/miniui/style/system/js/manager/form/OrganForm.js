Ext.OrganForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '机构信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
	
		var gradeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgangrades',
	    	fields: ['GRADEID', 'GRADENAME']
	    });
		gradeStore.load();
		
		var typeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgantypes',
	    	fields: ['TYPEID', 'TYPENAME']
	    });
		typeStore.load();
		
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
		
		var businessStore = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getBusiness',
		    fields: ['BUSINESS_ID','BUSINESS_NAME']  
		});
		businessStore.load();
	
		this.items = [{
			fieldLabel: '机构ID',
			name: 'ORGANID',
			xtype: 'hidden'
		}, {
			fieldLabel: '<font color="red">*</font>机构名称',
			name: 'ORGANNAME',
			xtype:'textfield',
			allowBlank: false,
			blankText: '机构名称不能为空，请填写',
			width: 250
		}, {
			fieldLabel: '机构编码',
			name: 'ORGANCODE',
			xtype:'hidden',
			maxLength: 20,
			width: 250
		}, {
			fieldLabel: '上级单位',
			name: 'PARENTID',
			xtype:'hidden'
		}, {
			fieldLabel: '机构类型',
			hiddenName: 'ORGANTYPE',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'TYPENAME',
	        valueField: 'TYPEID',
	        store: typeStore,
	        allowBlank: false,
			blankText: '机构类型不能为空，请填写',
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
			hiddenName: 'ORGANKIND',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'KINDNAME',
	        valueField: 'KINDID',
	        store: kindStore,
	        width: 250//,
	        /*listeners:{//这里重载有问题
				'expand':function(combo, store, index){ 
					kindStore.reload();
				} 
			}*/
		}, {
			fieldLabel: '<font color="red">*</font>区域编码',
			hiddenName: 'AREANO',
			xtype: 'combo',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'ZONE_NAME',
	        valueField: 'ZONE_NO',
	        store: areanoStore,
	        allowBlank: false,
			blankText: '区域编码不能为空，请填写',
	        width: 250,
	        listeners: {//点击重新加载combo
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
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
	        width: 250,
	        listeners: {//点击重新加载combo
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
		}, {
			fieldLabel: '业务类型',
			hiddenName: 'BUSINESS_ID',
			xtype: 'lovcombo',
			store: businessStore, 
			hideOnSelect : false,   
            valueField :"BUSINESS_ID",  
            displayField: "BUSINESS_NAME",
            typeAhead : true,   
            emptyText:'请选择业务类型...',//默认值  
            editable: false,//不允许输入  
            triggerAction: 'all',
            //showSelectAll: true,//显示全部选择
	        width: 250,
	        listeners: {//点击重新加载combo
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
		}, {
			fieldLabel: '是否启用',
			name: 'ISENABLED',
			xtype:'checkbox',
			checked: true,
			width: 250,
			inputValue: 1
		}];
		
		this.tbar = [{
			//id: 'organUpdate',
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.saveOrgan
		}, {
			//id: 'organDelete',
			iconCls: 'delete',
			text : '删除',
			scope: this,
			handler: this.deleteOrgan
		}/*, '-', {
			text: '机构级别维护',
			iconCls: 'add',
			scope: this,
			handler: function() {
				if(!this.win) {
					this.win = new Ext.Window({
						title: '所有机构级别',
						width: 300,
						height: 400,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.OrganGradeGrid({
							listeners: {
								afterModify: function() {
									gradeStore.reload();
								}
							}
						})
					});
				}
				this.win.show();
			}
		}, {
			text: '机构类别维护',
			iconCls: 'add',
			scope: this,
			handler: function() {
				if(!this.kindWin) {
					this.kindWin = new Ext.Window({
						title: '所有机构类别',
						width: 300,
						height: 400,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.OrganKindGrid({
							listeners: {
								afterModify: function() {
									kindStore.reload();
								}
							}
						})
					});
				}
				this.kindWin.show();
			}
		}, {
			iconCls: 'add',
			text : '专业维护',
			scope: this,
			handler: function(){
				if(!this.professionWin) {
					this.professionWin = new Ext.Window({
						title: '专业类型信息',
						width: 350,
						height: 450,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.ProfessionGrid({
							listeners: {
								afterModify: function() {
									professionStore.reload();
								}
							}
						})
					});
				}
				this.professionWin.show();
			}
		}, {
			iconCls: 'add',
			text : '区域编码维护',
			scope: this,
			handler: function(){
				if(!this.areanoWin) {
					this.areanoWin = new Ext.Window({
						title: '区域编码信息',
						width: 500,
						height: 450,
						closeAction: 'hide',
						plain: true,
						modal: true,
						layout: 'fit',
						items: new Ext.AreaNoGrid({
							listeners: {
								afterModify: function() {
									areanoStore.reload();
								}
							}
						})
					});
				}
				this.areanoWin.show();
			}
		}*/];
		
		Ext.OrganForm.superclass.initComponent.call(this);
		
		// 第一种方法 override beforeBlur method   
	    Ext.override(Ext.ux.form.LovCombo, {      
	        beforeBlur: Ext.emptyFn      
	    });  
	},
	
	loadProfression: function(pId) {
		var me = this;
		Ext.apply(me.professionStore.baseParams, {
			organId: pId
		});
		me.professionStore.reload();		
	},
	
	loadOrgan: function(organId) {
		this.getForm().reset();
		var me = this;
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/organ.do?method=get&organId=' + organId,
			method: 'GET'
		});
	},
	
	// 操作标志，1表示新增、2表示修改
	operFlag: 2,
	
	saveOrgan: function() {
		var _this = this;
		if(this.getForm().isValid()){//如果客户端的验证通过则返回真  
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
	            		if (tree.getRootNode().childNodes[0] != node) {
	            			node = node.parentNode;
	            		}
	            		node.reload(function(n) {
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
		}
		
    },
    
    deleteOrgan: function() {
    	var _this = this;
    	var organ = this.getForm().getValues();
    	
    	if(!organ.ORGANID || organ.ORGANID == '') return;
    	
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该机构吗？',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/organ.do?method=delete&organId=' + organ.ORGANID,
    					success: function (response, opts) {
    						if (response.responseText == 'success') {
    							var tree = Ext.getCmp('navigation-tree');
        		    			var sm = tree.getSelectionModel();
        		            	var node = sm.getSelectedNode();
        		            	node.parentNode.reload();
        		            	
        		            	_this.getForm().reset();
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
});