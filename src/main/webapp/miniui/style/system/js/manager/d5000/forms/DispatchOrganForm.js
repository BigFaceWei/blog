Ext.apply(Ext.form.VTypes, {
	checkname : function(val, field){
		if(field.checkname){
			var organid = Ext.getCmp(field.checkname.organid).getValue(); 
			if(Ext.isEmpty(organid)){
				var st = true;
				Ext.Ajax.request({
					url: contextpath + '/tbp/sysmanager/organ.do?method=checkOrganName&organName=' + val,
					async: false,
					method: "POST", 
					success: function (response, opts) {
						if(response.responseText == 'true')
							st = false;
		    		}
				});
				return st;
			}else{
				return true;
			}
		}
	},
	checknameText: "已存在同名调度机构"
});

Ext.DispatchOrganForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '调度机构信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px;',
	autoScoll: true,
	
	initComponent: function() {
	
		var areanoStore = new Ext.data.JsonStore({
			fields: ['ZONE_NO','ZONE_NAME','ORGANGRADE'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listAreas'
		});
		areanoStore.load();
		
		var gradeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listOrgangrades',
	    	fields: ['GRADEID', 'GRADENAME']
	    });
		gradeStore.load();
		
		var dispatchGradeStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=dispatchGrade',
	    	fields: ['DIC_ID', 'DIC_NAME']
	    });
		dispatchGradeStore.load();
		
		
		var gridNameStore = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=gridName',
	    	fields: ['DIC_ID', 'DIC_NAME']
	    });
		gridNameStore.load();
		
		var profession_store = this.profession_store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessions',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		//profession_store.load();
		
		var organtree = new Ext.tree.TreePanel({ 
		   rootVisible: false, 
		   autoScroll: true,
		   autoHeight: true,
		   loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=gridCompany&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != organtree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
	       }),
	       
		   root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
	
		this.items = [{
			layout: 'column',
			border: false,
			items: [{
				columnWidth: .5,
				border: false,
				layout: 'form',
				items: [{
					fieldLabel: '调度机构ID',
					id: 'organid',
					name: 'ORGANID',
					xtype: 'hidden'
				}, {
					fieldLabel: '不用的字段',
					name: 'COMPANYGRADE',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '调度全称',
					name: 'ORGANNAME',
					xtype:'textfield',
					maxLength: 40,
					width: 250,
					checkname: {organid: 'organid'},
					vtype: 'checkname',
					validationDelay: 1000
				}, {
					fieldLabel: '所属公司',
					hiddenName: 'AFFILIATEDCOMPANY',
					xtype: 'treecombo',
					tree: organtree,
					selectNodeModel:'all',
					width: 250
				}, {
					fieldLabel: '上级调度',
					name: 'PARENTID',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '上级调度',
					name: 'PARENTORGANNAME',
					xtype: 'textfield',
					readOnly: true,
		            width: 250
				}, {
					fieldLabel: '通信地址',
					name: 'MAILINGADDRESS',
					xtype:'textfield',
					maxLength: 50,
					width: 250
				}, {
					fieldLabel: '联系部门',
					name: 'CONTACTDEPARTMENT',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '联系电话',
					name: 'CONTACTNUMBER',
					xtype:'textfield',
					regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
					regexText: '格式非法，格式如：18770011125或0791-88888888',
					width: 250
				}, {
					fieldLabel: '机构类型',
					hiddenName: 'ORGANTYPE',
					xtype: 'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        forceSelection: true,
			        mode: 'local',
			        store: [['gridCompany', '电网公司'], 
			            ['genco', '发电公司'],
			        	['unit', '调度机构'],
			            ['dept', '调度机构部门'],
			        	['dummy', '虚拟节点'],
			        	['otherOrgan', '其他机构']],
			        emptyText:'请选择机构类型...',//默认值  
		            blankText: '机构类型为必填项',
		            editable: false,//不允许输入  
		            allowBlank: false,		
			        width: 250
				}, {
					fieldLabel: '机构级别',
					hiddenName: 'ORGANGRADE',
					xtype:'combo',
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
					fieldLabel: '是否启用',
					name: 'ISENABLED',
					xtype:'checkbox',
					checked: true,
					width: 250,
					inputValue: 1
				}]
			}, {
				columnWidth: .5,
					layout: 'form',
					border: false,
					items: [{
						fieldLabel: '调度简称',
						name: 'ORGANSHORTNAME',
						xtype:'textfield',
						maxLength: 25,
						width: 250
					}, {
						fieldLabel: '电网名称',
						hiddenName: 'GRIDNAME',
						xtype: 'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        valueField: 'DIC_ID',
				        displayField: 'DIC_NAME',
				        store: gridNameStore,
				        forceSelection: true,
				        emptyText:'请选择电网名称...',//默认值  
			            blankText: '电网名称为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false,	
						width: 250
					}, {
						fieldLabel: '调度级别',
						hiddenName: 'DISPATCHGRADE',
						xtype: 'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        valueField: 'DIC_ID',
				        displayField: 'DIC_NAME',
				        store: dispatchGradeStore,
				        forceSelection: true,
				        emptyText:'请选择调度级别...',//默认值  
			            blankText: '调度级别为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false,	
				        width: 250
					}, {
						fieldLabel: '邮政编码',
						name: 'POSTALCODE',
						xtype:'numberfield',
						regex: /^[1-9]\d{5}(?!\d)$/,
						regexText: '格式非法，格式如：330018',
						width: 250
					}, {
						fieldLabel: '传&nbsp;&nbsp;&nbsp;真',
						name: 'FAX',
						xtype:'textfield',
						regex: /^(\d{3,4}-)?\d{7,8}$/,
						regexText: '格式非法，格式如：XXX-12345678或XXXX-1234567或XXXX-12345678',
						width: 250
					}, {
						fieldLabel: '邮箱地址',
						name: 'EMAILADDRESS',
						xtype:'textfield',
						regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
						regexText: '格式非法，格式如：example123@163.com',
						width: 250
					}, {
						fieldLabel: '区域编码',
						hiddenName: 'AREANO',
						xtype: 'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        forceSelection: true,
				        displayField: 'ZONE_NAME',
				        valueField: 'ZONE_NO',
				        store: areanoStore,
				        width: 250
					}, {
						fieldLabel: '所属专业',
						hiddenName: 'PROFESSION_ID',
						xtype: 'lovcombo',
						store: profession_store, 
						hideOnSelect : false,   
			            valueField :"PROFESSION_ID",  
			            displayField: "PROFESSION_NAME",
			            typeAhead : true,   
			            emptyText:'请选择所属专业...',//默认值  
			            editable: false,//不允许输入  
			            triggerAction: 'all',
				        width: 250  
				}]
			}]
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
		}];
		
		Ext.DispatchOrganForm.superclass.initComponent.call(this);
		
		// 第一种方法 override beforeBlur method   
	    Ext.override(Ext.ux.form.LovCombo, {      
	        beforeBlur: Ext.emptyFn      
	    });  
	},
	
	loadProfression: function(pId) {
		var me = this;
		Ext.apply(me.profession_store.baseParams, {
			organId: pId
		});
		me.profession_store.reload();		
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