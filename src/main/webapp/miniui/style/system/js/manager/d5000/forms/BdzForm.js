Ext.BdzForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '变电站信息',
	labelWidth: 120,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	autoScroll : true,
	
	initComponent: function() {
	
		var voltageStore = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/voltage.do',
		    fields: ['VOLTAGE_ID','VOLTAGE_NAME']  
		});
		voltageStore.load();
		
		var hdispatchrighttree = new Ext.tree.TreePanel({ 
			rootVisible: false, 
			autoScroll: true,
			autoHeight: true,
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=unit&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != hdispatchrighttree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
			}),
			root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		var highdisforshorttree = new Ext.tree.TreePanel({ 
			rootVisible: false, 
			autoScroll: true,
			autoHeight: true,
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=unit&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != highdisforshorttree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
			}),
			root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		var runing_orga_tree = new Ext.tree.TreePanel({ 
			rootVisible: false, 
			autoScroll: true,
			autoHeight: true,
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=gridCompany&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != runing_orga_tree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
			}),
			root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		var assetsunittree = new Ext.tree.TreePanel({ 
			rootVisible: false, 
			autoScroll: true,
			autoHeight: true,
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=gridCompany&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != assetsunittree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
			}),
			root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		var accessnetworktree = new Ext.tree.TreePanel({ 
			rootVisible: false, 
			autoScroll: true,
			autoHeight: true,
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=gridCompany&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != accessnetworktree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
			}),
			root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		var focus_ctr_tree = new Ext.tree.TreePanel({
			rootVisible: false, 
			autoScroll: true,
			autoHeight: true,
			loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=dept&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != focus_ctr_tree.getRootNode()) {
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
			xtype : 'fieldset', title : "", autoHeight : true, collapsible: true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						name: 'station_id',
						xtype:'hidden'
					}, {
						fieldLabel: '<font color="red">*</font>变电站名称',
						name: 'station_name',
						xtype:'textfield',
						allowBlank: false,
						blankText: '厂站名称是必填项'
					}, {
						name: 'orga_id',
						xtype: 'hidden'
					}, {
						fieldLabel: '运行管理单位',
						hiddenName: 'runing_orga_id',
						xtype: 'treecombo',
						tree: runing_orga_tree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '运行班组',
						name: 'runing_team_id',
						xtype: 'textfield'
					}, {
						fieldLabel: '资产单位',
						hiddenName: 'assetsunit',
						xtype: 'treecombo',
						tree: assetsunittree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '资产性质',
						name: 'assetsnature',
						xtype: 'textfield'
					}, {
						fieldLabel: '<font color="red">*</font>厂站类型',
						hiddenName: 'station_type',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '变电站'], 
			        	   [1, '开关站或闭关所'],
			        	   [2, '集控站']],
				        forceSelection:true,
				        emptyText:'请选择厂站类型...',//默认值  
			            blankText: '厂站类型为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false
					}]
					},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [ {
						fieldLabel: '<font color="red">*</font>电压等级范围',
						hiddenName: 'voltage_range',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        emptyText:'请选择电压等级范围...',//默认值  
			            blankText: '电压等级范围为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false,
				        /*store: [['1000kV', '1000kV'], 
			        	   ['800kV', '800kV'],
			        	   ['750kV', '750kV'], 
			        	   ['500kV', '500kV'],
			        	   ['330kV', '330kV'], 
			        	   ['220kV', '220kV'],
			        	   ['110kV', '110kV'], 
			        	   ['65kV', '65kV'],
			        	   ['35kV', '35kV'], 
			        	   ['20kV', '20kV'],
			        	   ['10kV', '10kV']],*/
			            displayField: 'VOLTAGE_NAME',
						valueField: 'VOLTAGE_ID',
						store: voltageStore,
				        forceSelection:true
					}, {
						fieldLabel: '<font color="red">*</font>最高电压等级',
						hiddenName: 'voltagename',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        emptyText:'请选择最高电压等级...',//默认值  
			            blankText: '最高电压等级为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false,
				        /*store: [['1000kV', '1000kV'], 
			        	   ['800kV', '800kV'],
			        	   ['750kV', '750kV'], 
			        	   ['500kV', '500kV'],
			        	   ['330kV', '330kV'], 
			        	   ['220kV', '220kV'],
			        	   ['110kV', '110kV'], 
			        	   ['65kV', '65kV'],
			        	   ['35kV', '35kV'], 
			        	   ['20kV', '20kV'],
			        	   ['10kV', '10kV']],*/
			            displayField: 'VOLTAGE_NAME',
						valueField: 'VOLTAGE_ID',
						store: voltageStore,
				        forceSelection:true
					}, {
						fieldLabel: '值班方式',
						name: 'dutytype',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['0', '有人值班'], 
			        	   ['1', '无人值班']],
				        forceSelection:true
					}, {
						fieldLabel: '布置方式',
						name: 'arrangetype',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['0', '地下'], 
			        	   ['1', '半地下'],
			        	   ['2', '地上']],
				        forceSelection:true
					}, {
						fieldLabel: '变电站性质',
						name: 'stationtypename',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '开关站'], 
			        	   ['0', '变电站']],
				        forceSelection:true
					}, {
						fieldLabel: '<font color="red">*</font>厂站标志',
						hiddenName: 'station_flag',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '变电站'], 
				                [1, '电厂'],
				                [3, '用户变']],
				        forceSelection:true,
				        emptyText:'请选择厂站标志...',//默认值  
			            blankText: '标志属性为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false
					}]
					}]
			}]
		},{
			xtype : 'fieldset', title : "", autoHeight : true, collapsible: true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '污秽等级',
						name: 'pollutiongrade',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', 'a级'], 
			        	   ['2', 'b级'],
			        	   ['3', 'c级'],
			        	   ['4', 'd级'],
			        	   ['5', 'e级']],
				        forceSelection:true
					}, {
						fieldLabel: '投运日期',
						name: 'tyrq',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s'
					}, {
						fieldLabel: '站址',
						name: 'dlwz',
						xtype: 'textfield'
					}, {
						fieldLabel: '占地面积（㎡）',
						name: 'floorspace',
						xtype: 'numberfield',
						allowDecimals : false
					}, {
						fieldLabel: '联系电话',
						name: 'lxdh',
						xtype:'textfield',
						regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
						regexText: '格式非法，格式如：18770011125或0791-88888888',
						width: 250
					}, {
						fieldLabel: '枢纽站',
						name: 'iscenterstation',
						xtype: 'checkbox',
						inputValue: 1
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '建筑面积（㎡）',
						name: 'coveredarea',
						xtype: 'numberfield',
						allowDecimals : false
					}, {
						fieldLabel: '运行状态',
						name: 'tyztname',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['在运', '在运'], 
			        	   ['未投运', '未投运'],
			        	   ['退运', '退运']],
				        forceSelection:true
					}, {
						fieldLabel: '退运日期',
						name: 'tyrq1',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s'
					}, {
						fieldLabel: '厂站所在省市',
						name: 'belongprovince',
						xtype: 'textfield'
					}, {
						fieldLabel: '厂站所在地市',
						name: 'belongcity',
						xtype: 'textfield'
					}]
				}]
			}]
		},{
			xtype : 'fieldset', title : "", autoHeight : true, collapsible: true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '地理位置经度',
						name: 'longitude',
						xtype: 'textfield'
					}, {
						fieldLabel: '地理位置纬度',
						name: 'latitude',
						xtype: 'textfield'
					}, {
						fieldLabel: '接入电网',
						hiddenName: 'accessnetwork',
						xtype: 'treecombo',
						tree: accessnetworktree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '变电站类型',
						name: 'stationflagname',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['交流变电站', '交流变电站'], 
			        	   ['换流变电站', '换流变电站']],
				        forceSelection:true
					}, {
						fieldLabel: '变电站环境',
						name: 'station_evment',
						xtype: 'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '室内'], 
				                ['2', '室外']],
				        forceSelection:true
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '直流电压等级',
						name: 'voltage_dc',
						xtype: 'textfield'
					}, {
						fieldLabel: '换流站类型',
						name: 'convertor_type',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '常规直流'], 
				                ['2', '背靠背直流'],
				                ['3', '特高压直流']],
				        forceSelection:true
					}, {
						fieldLabel: '直流工程名称',
						name: 'dc_name',
						xtype: 'textfield'
					}, {
						fieldLabel: '主机独立',
						name: 'host_isalone',
						xtype: 'checkbox',
						inputValue: 1
					}, {
						fieldLabel: '变电站简称',
						name: 'ddjc',
						xtype: 'textfield'
					}]
				}]
			}]
		
		},{
			xtype : 'fieldset', title : "", autoHeight : true, collapsible: true,
			items : [{
				layout: "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '全路径命名',
						name: 'dispatchname',
						xtype: 'textfield'
					}, {
						fieldLabel: '最高调度简称',
						hiddenName: 'highdisforshort',
						xtype: 'treecombo',
						tree: highdisforshorttree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '变电容量（MVA）',
						name: 'transforcapacity',
						xtype: 'numberfield'
					}, {
						fieldLabel: '高压侧主变容量（MVA）',
						name: 'hcap',
						xtype: 'numberfield'
					}, {
						fieldLabel: '低压侧主变容量（MVA）',
						name: 'lcap',
						xtype: 'numberfield'
					}, {
						fieldLabel: '接入故障信息远传系统',
						name: 'isfaultsystem',
						xtype: 'checkbox',
						inputValue: 1
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '母线电压等级',
						hiddenName: 'busvoltage',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        displayField: 'VOLTAGE_NAME',
						valueField: 'VOLTAGE_ID',
						store: voltageStore,
				        /*store: [['1000kV', '1000kV'], 
			        	   ['800kV', '800kV'],
			        	   ['750kV', '750kV'], 
			        	   ['500kV', '500kV'],
			        	   ['330kV', '330kV'], 
			        	   ['220kV', '220kV'],
			        	   ['110kV', '110kV'], 
			        	   ['65kV', '65kV'],
			        	   ['35kV', '35kV'], 
			        	   ['20kV', '20kV'],
			        	   ['10kV', '10kV']],*/
				        forceSelection:true
					}, {
						fieldLabel: '接线方式',
						name: 'connectionmode',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['3/2接线', '3/2接线'], 
			        	   ['双母线分段', '双母线分段'],
			        	   ['双母线', '双母线'], 
			        	   ['双母线带旁路', '双母线带旁路'],
			        	   ['单母线', '单母线'], 
			        	   ['单母线分段', '单母线分段'],
			        	   ['内桥接线', '内桥接线'], 
			        	   ['外桥接线', '外桥接线']],
				        forceSelection:true
					}, {
						fieldLabel: '最高调度管辖权',
						hiddenName: 'hdispatchright',
						xtype: 'treecombo',
						tree: hdispatchrighttree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '中压侧主变容量（MVA）',
						name: 'mcap',
						xtype: 'numberfield'
					}, {
						fieldLabel: '所属集控站',
						hiddenName: 'station_to_focus_ctr',
						xtype: 'treecombo',
						tree: focus_ctr_tree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '接入AVC',
						name: 'isavc',
						xtype: 'checkbox',
						inputValue: 1
					}, {
						fieldLabel: '集中监控',
						name: 'isfocus',
						xtype: 'checkbox',
						inputValue: 1
					}]
				}]
			}]
		}, {
			fieldLabel: '备注',
			name: 'bz',
			xtype:'textarea',
			width: 600,
			height: 100
		}/*,{
			xtype : 'fieldset', title : "", autoHeight : true, collapsible: true,
			items : [{
				layout : "column", border: false,
				items : [{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '联系电话',
						name: 'lxdh',
						xtype:'numberfield'
					}, {
						fieldLabel: '<font color="red">*</font>厂站编码',
						name: 'station_code',
						xtype: 'textfield',
						allowBlank: false,
						blankText: '厂站编码不能为空'
					}, {
						fieldLabel: '<font color="red">*</font>厂站标志',
						hiddenName: 'station_flag',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '变电站'], 
				                [1, '电厂'],
				                [3, '用户变']],
				        forceSelection:true,
				        emptyText:'请选择厂站标志...',//默认值  
			            blankText: '标志属性为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false
					}, {
						fieldLabel: '<font color="red">*</font>厂站属性',
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
			        	   [6, '其他']]
					}, {
						fieldLabel: '厂站英文简称',
						name: 'station_name_short',
						xtype: 'textfield'
					}, {
						fieldLabel: '所属集控站',
						name: 'station_to_focus_ctr',
						xtype: 'textfield'
					}, {
						fieldLabel: '创建时间',
						name: 'station_createdate',
						xtype:'datetime',
						format: 'Y-m-d H:i:s'
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '厂站所属表',
						name: 'table_id',
						xtype: 'hidden'
					},{
						fieldLabel: '记录人',
						name: 'creator',
						xtype: 'textfield'
					},{
						fieldLabel: '<font color="red">*</font>厂站类型',
						hiddenName: 'station_type',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '变电站'], 
			        	   [1, '开关站或闭关所'],
			        	   [2, '集控站']],
				        forceSelection:true,
				        emptyText:'请选择厂站类型...',//默认值  
			            blankText: '厂站类型为必填项',
			            editable: false,//不允许输入  
			            allowBlank: false
					}, {
						fieldLabel: '厂站中文简称',
						name: 'station_name_jc',
						xtype: 'textfield'
					}, {
						fieldLabel: '修改时间',
						name: 'station_editdate',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s'
					}, {
						fieldLabel: 'EMS厂站编码',
						name: 'ems_stationcode',
						xtype: 'textfield'
					}, {
						fieldLabel: '备注',
						name: 'bz',
						xtype:'textarea',
						height: 100
					}]
				}]
			}]
		}*/];
		
		this.tbar = [{
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.savaStation
		}, {
			iconCls: 'delete',
			text : '删除',
			scope: this,
			handler: this.deleteStation
		}];
		
		Ext.BdzForm.superclass.initComponent.call(this);
	},
	
	loadBdz: function(stationId) {
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
				success: function (response, options) {
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
	    			Ext.MessageBox.alert('系统消息', '厂站创建失败！');
	        	}
			});
		} else {
			Ext.MessageBox.alert('系统提示', '请完善表单中的必填项！');
		}
	},
	
	deleteStation: function(){
		var _this = this;
		var station = this.getForm().getValues();
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该变电站吗？',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/station.do?method=delete&stationId=' + station.station_id + '&stationType=' + station.station_type,
    					success: function (response, opts) {
    						if (response.responseText == 'success') {
    							var tree = Ext.getCmp('navigation-tree');
        		    			var sm = tree.getSelectionModel();
        		            	var node = sm.getSelectedNode();
        		            	node.parentNode.reload();
        		            	
        		            	_this.getForm().reset();
    						}
    		    			if (response.responseText == 'failure') {
    		    				Ext.MessageBox.alert('系统消息', '该机构存在下级变电站或用户，请先删除下级变电站或用户！'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('系统消息', '删除变电站失败！'); 
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