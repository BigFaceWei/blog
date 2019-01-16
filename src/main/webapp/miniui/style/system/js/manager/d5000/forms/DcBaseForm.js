Ext.DcBaseForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '基本信息',
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
		
		var gencotree = new Ext.tree.TreePanel({ 
		   rootVisible: false, 
		   autoScroll: true,
		   autoHeight: true,
		   loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=genco&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != gencotree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
	       }),
	       
		   root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		var dispatchorgatree = new Ext.tree.TreePanel({ 
		   rootVisible: false, 
		   autoScroll: true,
		   autoHeight: true,
		   loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/tree.do?method=buildOrganTree&type=unit&isSuperAdmin='+isSuperAdmin+'',
				listeners: {
					beforeload: function(loader, node) {
						if(node != dispatchorgatree.getRootNode()) {
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
	
		this.items = [{
				name: 'station_id',
				xtype:'hidden'
			}, {
				name: 'orga_id',
				xtype: 'hidden'
			}, {
				xtype:'fieldset',     //fieldSet
	            title: '',
	            autoHeight:true,
	            collapsible: true,
	            layout: 'column',
	            items :[{
					columnWidth: .5,
					border: false,
					layout: 'form',
					items: [{
						fieldLabel: '<font color="red">*</font>发电厂调度名称',
						name: 'station_name',
						xtype:'textfield',
						allowBlank: false,
						blankText: '厂站名称是必填项',
						width: 250
					}, {
						fieldLabel: '发电厂工商注册名称',
						name: 'stationregistration',
						xtype: 'textfield',
			            width: 250
					}, {
						fieldLabel: '所属发电公司',
						hiddenName: 'belongcompany',
						xtype: 'treecombo',
						tree: gencotree,
						selectNodeModel:'all',
			            width: 250
					}, {
						fieldLabel: '资产性质',
						name: 'assetsnature',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '国家电网公司'], 
			        	   ['2', '区域电网公司'],
			        	   ['3', '省公司'], 
			        	   ['4', '县公司'],
			        	   ['5', '用户'], 
			        	   ['6', '股份制']],
				        forceSelection:true,
			            width: 250
			          }, {
						fieldLabel: '接入电网',
						hiddenName: 'accessnetwork',
						xtype: 'treecombo',
						tree: accessnetworktree,
						selectNodeModel:'all',
			            width: 250
					  }, {
						fieldLabel: '厂站标志',
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
			            allowBlank: false,
				        width: 250
					}]
					}, {
						columnWidth: .5,
						layout: 'form',
						border: false,
						items: [{
							fieldLabel: '发电厂简称',
							name: 'ddjc',
							xtype: 'textfield',
					        width: 250
						}, {
							fieldLabel: '全路径命名',
							name: 'dispatchname',
							xtype: 'textfield',
				            width: 250
						}, {
							fieldLabel: '资产单位',//选择设备所属资产单位。系统默认为当前登录人所在网省公司
							hiddenName: 'assetsunit',
							xtype: 'treecombo',
							tree: assetsunittree,
							selectNodeModel:'all',
				            width: 250
						}, {
							fieldLabel: '运行管理单位',
							hiddenName: 'runing_orga_id',
							xtype: 'treecombo',
							tree: runing_orga_tree,
							selectNodeModel:'all',
				            width: 250
						}, {
							fieldLabel: '<font color="red">*</font>厂站类型',
							hiddenName: 'station_type',
							xtype:'combo',
							typeAhead: true,
					        triggerAction: 'all',
					        store: [
				        	   [3, '火电厂'],
				        	   [4, '水电厂'], 
				        	   [7, '风电场'],
				        	   [8, '核电站'],
				        	   [9, '光伏电站'],
				        	   [10, '抽水蓄能电站']],
					        forceSelection:true,
					        emptyText:'请选择厂站类型...',//默认值  
				            blankText: '厂站类型为必填项',
				            editable: false,//不允许输入  
				            allowBlank: false,
					        width: 250
					   }]
			    }]
			 },{
				xtype:'fieldset',     //第二个fieldSet
	            //checkboxToggle:true,
	            title: '',
	            layout: 'column',
	            autoHeight:true,
	            collapsible: true,
	            items :[{
					columnWidth: .5,
					border: false,
					layout: 'form',
					items: [{
						fieldLabel: '调度机构',
						hiddenName: 'dispatchorga_id',
						xtype: 'treecombo',
						tree: dispatchorgatree,
						selectNodeModel:'all',
			            width: 250
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
				       /* store: [['1000kV', '1000kV'], 
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
				        forceSelection:true,
			            width: 250
					}, {
						fieldLabel: '投运日期',
						name: 'tyrq',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s',
			            width: 250
					}, {
						fieldLabel: '装机容量（MW）',
						name: 'installedcapacity',
						xtype: 'numberfield',
			            width: 250
					}, {
						fieldLabel: '最大出力（MW）',
						name: 'maximumoutput',
						xtype: 'numberfield',
			            width: 250
					}, {
						fieldLabel: '厂站所在省市',
						name: 'belongprovince',
						xtype: 'textfield',
			            width: 250
					}]
		           }, {
						columnWidth: .5,
						layout: 'form',
						border: false,
						items: [{
							fieldLabel: '退役日期',
							name: 'tyrq1',
							xtype: 'datetime',
							format: 'Y-m-d H:i:s',
				            width: 250
						}, {
							fieldLabel: '机组台数（台）',
							name: 'unitnumber',
							xtype: 'numberfield',
							allowDecimals : false,
				            width: 250
						}, {
							fieldLabel: '最高调度管辖权',
							hiddenName: 'highdisforshort',
							xtype: 'treecombo',
							tree: highdisforshorttree,
							selectNodeModel:'all',
				            width: 250
						}, {
							fieldLabel: '厂站所在地市',
							name: 'belongcity',
							xtype: 'textfield',
				            width: 250
						}, {
							fieldLabel: '地理位置纬度（°）',
							name: 'latitude',
							xtype: 'textfield',
					        width: 250
						}, {
							fieldLabel: '地理位置经度（°）',
							name: 'longitude',
							xtype: 'textfield',
					        width: 250
				     }]
			    }]
		    },{
		        xtype: 'fieldset',     //第三个fieldSet
	            //checkboxToggle: true,
	            title: '',
	            layout: 'column',
	            autoHeight:true,
	            collapsible: true,
	            items :[{
					columnWidth: .5,
					border: false,
					layout: 'form',
					items: [{
						fieldLabel: '通信地址',
						name: 'address',
						xtype:'textfield',
						width: 250
					}, {
						fieldLabel: '联系部门',
						name: 'contactdept',
						xtype:'textfield',
						width: 250
					}, {
						fieldLabel: '联系电话',
						name: 'lxdh',
						xtype:'textfield',
						regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
						regexText: '格式非法，格式如：18770011125或0791-88888888',
						width: 250
					}]	
	              }, {
					columnWidth: .5,
					layout: 'form',
					border: false,
					items: [{
						fieldLabel: '邮政编码',
						name: 'postalcode',
						xtype:'textfield',
						regex: /^[1-9]\d{5}(?!\d)$/,
						regexText: '格式非法，格式如：330018',
						width: 250
					}, {
						fieldLabel: '传真',
						name: 'fax',
						xtype:'numberfield',
						regex: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
						regexText: '格式非法，格式如：XXX-12345678或XXXX-1234567或XXXX-12345678',
						width: 250
					}, {
						fieldLabel: '邮箱地址',
						name: 'e_mailaddress',
						xtype:'textfield',
						regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
						regexText: '格式非法，格式如：example123@163.com',
						width: 250
					}]
		       }]
		    }/*,{
		        xtype:'fieldset',     //第4个fieldSet
	            //checkboxToggle:true,
		        layout: 'column',
	            title: '',
	            autoHeight: true,
	            collapsible: true,
	            items :[{
					columnWidth: .5,
					border: false,
					layout: 'form',
					items: [{
						fieldLabel: '<font color="red">*</font>厂站编码',
						name: 'station_code',
						xtype: 'textfield',
						allowBlank: false,
						blankText: '厂站编码不能为空',
						width: 250
					}, {
						fieldLabel: '厂站中文简称',
						name: 'station_name_jc',
						xtype: 'textfield',
				        width: 250
					}, {
						fieldLabel: '厂站标志',
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
			            allowBlank: false,
				        width: 250
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
			        	   [6, '其他']],
				        width: 250
					}, {
						fieldLabel: '创建时间',
						name: 'station_createdate',
						xtype:'datetime',
						format: 'Y-m-d H:i:s',
						width: 250
					}]
 	             }, {
					columnWidth: .5,
					layout: 'form',
					border: false,
					items: [{
						fieldLabel: '厂站所属表',
						name: 'table_id',
						xtype: 'hidden',
				        width: 250
					}, {
						fieldLabel: '记录人',
						name: 'creator',
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
					},{
						fieldLabel: '所属集控站',
						name: 'station_to_focus_ctr',
						xtype: 'textfield',
				        width: 250
					},{
						fieldLabel: '厂站英文简称',
						name: 'station_name_short',
						xtype: 'textfield',
				        width: 250
					}]
		     }]
		}, {
			fieldLabel: '备注',
			name: 'bz',
			xtype:'textarea',
			width: 600,
			height: 100
		}*/];
		
		Ext.DcBaseForm.superclass.initComponent.call(this);
	},
	
    // 操作标志，1表示新增、2表示修改
	operFlag: 2,
	
	loadDc: function(stationId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=get&stationId=' + stationId,
			method: 'GET'
		});
	}
	
});