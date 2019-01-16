Ext.StationForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '厂站信息',
	labelWidth: 80,
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
	
		var store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/voltage.do',
		    fields: ['VOLTAGE_ID','VOLTAGE_NAME']  
		});
		store.load();
		
		var professionStore = this.professionStore = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessions',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		//professionStore.load();
		//定义一个树形
		var organtree = new Ext.tree.TreePanel({ 
		   rootVisible: false, 
		   autoScroll: true,
		   autoHeight: true,
		   loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/station.do?method=getOrganTree',
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
		var contenttree = new Ext.tree.TreePanel({ 
		   rootVisible:false, 
		   autoScroll:true,
		   autoHeight:true,
		   loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/station.do?method=getOrganTree',
				listeners: {
					beforeload: function(loader, node) {
						if(node != contenttree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
	       }),
	       
		   root: new Ext.tree.AsyncTreeNode({
		   		text:'根结点'//,
		   		/*loader: new Ext.tree.TreeNode({
		   			url: contextpath + '/tbp/sysmanager/station.do?method=getOrganTree&nodeId=66'
		   		}) */ 
		   })
		});
		this.items = [{
			layout: 'column',
			width: 700,
			border: false,
			items: [{
				columnWidth: .5,
				border: false,
				layout: 'form',
				items: [{
					name: 'station_id',
					xtype:'hidden'
				}/*, {
					name: 'orga_id',
					xtype: 'hidden'
				}*/, {
					fieldLabel: '所属单位',
					hiddenName: 'orga_id',
					xtype: 'treecombo',
					tree: organtree,
					selectNodeModel:'all', 
			        width: 250
				}, {
					fieldLabel: '厂站编码<font color="red">*</font>',
					name: 'station_code',
					xtype: 'textfield',
					allowBlank: false,
					blankText: '厂站编码不能为空',
					width: 250
				}, {
					fieldLabel: '厂站标志',
					hiddenName: 'station_flag',
					xtype:'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        store: [[0, '变电站'], 
			                [1, '电厂']],
			        forceSelection:true,
			        emptyText:'请选择厂站标志...',//默认值  
		            blankText: '标志属性为必填项',
		            editable: false,//不允许输入  
		            allowBlank: false,
			        width: 250
				}, {
					fieldLabel: '厂站属性',
					hiddenName: 'station_sift',
					xtype:'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        forceSelection:true,
			        emptyText:'请选择厂站属性...',//默认值  
		            blankText: '厂站属性为必填项',
		            editable: false,//不允许输入  
		            allowBlank: false,
			        store: [[0, '默认'], 
		        	   [1, '自动化虚拟厂站'],
		        	   [2, '直调电厂'],
		        	   [3, '许可电厂'],
		        	   [4, '主站'],
		        	   [5, '直调变电站'],
		        	   [6, '其他']],
			        width: 250
				}, {
					fieldLabel: '厂站英文简称',
					name: 'station_name_short',
					xtype: 'textfield',
			        width: 250
				}, {
					fieldLabel: '所属集控站',
					hiddenName: 'station_to_focus_ctr',
					xtype: 'treecombo',
					tree: contenttree,
					selectNodeModel:'all', 
			        width: 250
				}, {
					fieldLabel: '创建时间',
					name: 'station_createdate',
					xtype:'datetime',
					format: 'Y-m-d H:i:s',
					width: 250
				}/*, {
					fieldLabel: '联系电话',
					name: 'LXDH',
					xtype:'numberfield',
					width: 250
				}*/,{
					fieldLabel: '所属专业',
					hiddenName: 'profession_id',
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
				} ]
			}, {
				columnWidth: .5,
				layout: 'form',
				border: false,
				items: [{
					fieldLabel: '厂站名称<font color="red">*</font>',
					name: 'station_name',
					xtype:'textfield',
					allowBlank: false,
					blankText: '厂站名称是必填项',
					width: 250
				}, {
					fieldLabel: '电压等级<font color="red">*</font>',
					hiddenName: 'voltage_id',
					//xtype:'combo',
					xtype: 'lovcombo',
					store: store, 
					hideOnSelect: false, 
		            valueField :"VOLTAGE_ID",  
		            displayField: "VOLTAGE_NAME",  
		            //forceSelection: true,//必须选择一项  
		            emptyText:'请选择电压等级...',//默认值  
		            blankText: '电压等级为必填项',
		            editable: false,//不允许输入  
		            typeAhead : true,   
		            triggerAction: 'all',
		            allowBlank: false,
			        width: 250  
				}, {
					fieldLabel: '厂站类型',
					hiddenName: 'station_type',
					xtype:'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        store: [[0, '变电站'], 
		        	   [1, '开关站或闭关所'],
		        	   [2, '集控站'],
		        	   [3, '火电站'],
		        	   [4, '水电站'], 
		        	   [5, '小火电'],
		        	   [6, '小水电'],
		        	   [7, '风电厂'],
		        	   [8, '核电厂']],
			        forceSelection:true,
			        emptyText:'请选择厂站类型...',//默认值  
		            blankText: '厂站类型为必填项',
		            editable: false,//不允许输入  
		            allowBlank: false,
			        width: 250
				}, {
					fieldLabel: '厂站中文简称',
					name: 'station_name_jc',
					xtype: 'textfield',
			        width: 250
				}, {
					fieldLabel: 'EMS厂站编码',
					name: 'ems_stationcode',
					xtype: 'textfield',
			        width: 250
				}, {
					fieldLabel: '修改时间',
					name: 'station_editdate',
					xtype: 'datetime',
					format: 'Y-m-d H:i:s',
					width: 250
				}, {
					fieldLabel: '是否删除',
					name: 'station_isdel',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}]
			}]
		}, {
			fieldLabel: '备注',
			name: 'bz',
			xtype:'textarea',
			width: 600,
			height: 100
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.savaStation
		}/*, {
			iconCls: 'delete',
			text : '删除',
			scope: this,
			handler: this.deleteStation
		}*/];
		
		Ext.StationForm.superclass.initComponent.call(this);
		
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
	
	loadStation: function(stationId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=get&stationId=' + stationId,
			method: 'GET'
		});
	},
	
	// 操作标志，1表示新增、2表示修改
	operFlag: 2,
	
	savaStation: function(){
		var _this = this;
		if (this.getForm().isValid()) {
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/station.do?method=save',
				params: {stationInfo: Ext.encode(this.getForm().getValues())},
				success: function (options, success, response) {
	    			var tree = Ext.getCmp('navigation-tree');
	    			var sm = tree.getSelectionModel();
	            	var node = sm.getSelectedNode();
	            	
	            	if(_this.operFlag == 2)
	            		node.parentNode.reload();
	            	else
	            		node.reload();
	    		},
	    		failure: function() {
	        		Ext.MessageBox.alert('系统消息','厂站创建失败！');
	        	}
			});
		}	
	},
	
	deleteStation: function(){
		var _this = this;
		var station = this.getForm().getValues();
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该厂站吗？',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/station.do?method=delete&stationId=' + station.station_id,
    					success: function (response, opts) {
    						if (response.responseText == 'success') {
    							var tree = Ext.getCmp('navigation-tree');
        		    			var sm = tree.getSelectionModel();
        		            	var node = sm.getSelectedNode();
        		            	node.parentNode.reload();
        		            	
        		            	_this.getForm().reset();
    						}
    		    			if (response.responseText == 'failure') {
    		    				Ext.MessageBox.alert('系统消息', '该机构存在下级厂站或用户，请先删除下级厂站或用户！'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('系统消息', '删除厂站失败！'); 
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
	}/*,
	
	function dateFormat(value){ 
	    if(null != value){ 
	        return Ext.Date.format(new Date(value),'Y-m-d H:i:s'); 
	    }else{ 
	        return null; 
	    } 
	}*/
});