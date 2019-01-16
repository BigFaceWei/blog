Ext.BdzForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '���վ��Ϣ',
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
			root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
			root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
			root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
			root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
			root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
			root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
						fieldLabel: '<font color="red">*</font>���վ����',
						name: 'station_name',
						xtype:'textfield',
						allowBlank: false,
						blankText: '��վ�����Ǳ�����'
					}, {
						name: 'orga_id',
						xtype: 'hidden'
					}, {
						fieldLabel: '���й���λ',
						hiddenName: 'runing_orga_id',
						xtype: 'treecombo',
						tree: runing_orga_tree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '���а���',
						name: 'runing_team_id',
						xtype: 'textfield'
					}, {
						fieldLabel: '�ʲ���λ',
						hiddenName: 'assetsunit',
						xtype: 'treecombo',
						tree: assetsunittree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '�ʲ�����',
						name: 'assetsnature',
						xtype: 'textfield'
					}, {
						fieldLabel: '<font color="red">*</font>��վ����',
						hiddenName: 'station_type',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '���վ'], 
			        	   [1, '����վ��չ���'],
			        	   [2, '����վ']],
				        forceSelection:true,
				        emptyText:'��ѡ��վ����...',//Ĭ��ֵ  
			            blankText: '��վ����Ϊ������',
			            editable: false,//����������  
			            allowBlank: false
					}]
					},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [ {
						fieldLabel: '<font color="red">*</font>��ѹ�ȼ���Χ',
						hiddenName: 'voltage_range',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        emptyText:'��ѡ���ѹ�ȼ���Χ...',//Ĭ��ֵ  
			            blankText: '��ѹ�ȼ���ΧΪ������',
			            editable: false,//����������  
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
						fieldLabel: '<font color="red">*</font>��ߵ�ѹ�ȼ�',
						hiddenName: 'voltagename',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        emptyText:'��ѡ����ߵ�ѹ�ȼ�...',//Ĭ��ֵ  
			            blankText: '��ߵ�ѹ�ȼ�Ϊ������',
			            editable: false,//����������  
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
						fieldLabel: 'ֵ�෽ʽ',
						name: 'dutytype',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['0', '����ֵ��'], 
			        	   ['1', '����ֵ��']],
				        forceSelection:true
					}, {
						fieldLabel: '���÷�ʽ',
						name: 'arrangetype',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['0', '����'], 
			        	   ['1', '�����'],
			        	   ['2', '����']],
				        forceSelection:true
					}, {
						fieldLabel: '���վ����',
						name: 'stationtypename',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '����վ'], 
			        	   ['0', '���վ']],
				        forceSelection:true
					}, {
						fieldLabel: '<font color="red">*</font>��վ��־',
						hiddenName: 'station_flag',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '���վ'], 
				                [1, '�糧'],
				                [3, '�û���']],
				        forceSelection:true,
				        emptyText:'��ѡ��վ��־...',//Ĭ��ֵ  
			            blankText: '��־����Ϊ������',
			            editable: false,//����������  
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
						fieldLabel: '�ۻ�ȼ�',
						name: 'pollutiongrade',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', 'a��'], 
			        	   ['2', 'b��'],
			        	   ['3', 'c��'],
			        	   ['4', 'd��'],
			        	   ['5', 'e��']],
				        forceSelection:true
					}, {
						fieldLabel: 'Ͷ������',
						name: 'tyrq',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s'
					}, {
						fieldLabel: 'վַ',
						name: 'dlwz',
						xtype: 'textfield'
					}, {
						fieldLabel: 'ռ��������O��',
						name: 'floorspace',
						xtype: 'numberfield',
						allowDecimals : false
					}, {
						fieldLabel: '��ϵ�绰',
						name: 'lxdh',
						xtype:'textfield',
						regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
						regexText: '��ʽ�Ƿ�����ʽ�磺18770011125��0791-88888888',
						width: 250
					}, {
						fieldLabel: '��Ŧվ',
						name: 'iscenterstation',
						xtype: 'checkbox',
						inputValue: 1
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '����������O��',
						name: 'coveredarea',
						xtype: 'numberfield',
						allowDecimals : false
					}, {
						fieldLabel: '����״̬',
						name: 'tyztname',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['����', '����'], 
			        	   ['δͶ��', 'δͶ��'],
			        	   ['����', '����']],
				        forceSelection:true
					}, {
						fieldLabel: '��������',
						name: 'tyrq1',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s'
					}, {
						fieldLabel: '��վ����ʡ��',
						name: 'belongprovince',
						xtype: 'textfield'
					}, {
						fieldLabel: '��վ���ڵ���',
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
						fieldLabel: '����λ�þ���',
						name: 'longitude',
						xtype: 'textfield'
					}, {
						fieldLabel: '����λ��γ��',
						name: 'latitude',
						xtype: 'textfield'
					}, {
						fieldLabel: '�������',
						hiddenName: 'accessnetwork',
						xtype: 'treecombo',
						tree: accessnetworktree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '���վ����',
						name: 'stationflagname',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['�������վ', '�������վ'], 
			        	   ['�������վ', '�������վ']],
				        forceSelection:true
					}, {
						fieldLabel: '���վ����',
						name: 'station_evment',
						xtype: 'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '����'], 
				                ['2', '����']],
				        forceSelection:true
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: 'ֱ����ѹ�ȼ�',
						name: 'voltage_dc',
						xtype: 'textfield'
					}, {
						fieldLabel: '����վ����',
						name: 'convertor_type',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '����ֱ��'], 
				                ['2', '������ֱ��'],
				                ['3', '�ظ�ѹֱ��']],
				        forceSelection:true
					}, {
						fieldLabel: 'ֱ����������',
						name: 'dc_name',
						xtype: 'textfield'
					}, {
						fieldLabel: '��������',
						name: 'host_isalone',
						xtype: 'checkbox',
						inputValue: 1
					}, {
						fieldLabel: '���վ���',
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
						fieldLabel: 'ȫ·������',
						name: 'dispatchname',
						xtype: 'textfield'
					}, {
						fieldLabel: '��ߵ��ȼ��',
						hiddenName: 'highdisforshort',
						xtype: 'treecombo',
						tree: highdisforshorttree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '���������MVA��',
						name: 'transforcapacity',
						xtype: 'numberfield'
					}, {
						fieldLabel: '��ѹ������������MVA��',
						name: 'hcap',
						xtype: 'numberfield'
					}, {
						fieldLabel: '��ѹ������������MVA��',
						name: 'lcap',
						xtype: 'numberfield'
					}, {
						fieldLabel: '���������ϢԶ��ϵͳ',
						name: 'isfaultsystem',
						xtype: 'checkbox',
						inputValue: 1
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: 'ĸ�ߵ�ѹ�ȼ�',
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
						fieldLabel: '���߷�ʽ',
						name: 'connectionmode',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['3/2����', '3/2����'], 
			        	   ['˫ĸ�߷ֶ�', '˫ĸ�߷ֶ�'],
			        	   ['˫ĸ��', '˫ĸ��'], 
			        	   ['˫ĸ�ߴ���·', '˫ĸ�ߴ���·'],
			        	   ['��ĸ��', '��ĸ��'], 
			        	   ['��ĸ�߷ֶ�', '��ĸ�߷ֶ�'],
			        	   ['���Ž���', '���Ž���'], 
			        	   ['���Ž���', '���Ž���']],
				        forceSelection:true
					}, {
						fieldLabel: '��ߵ��ȹ�ϽȨ',
						hiddenName: 'hdispatchright',
						xtype: 'treecombo',
						tree: hdispatchrighttree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '��ѹ������������MVA��',
						name: 'mcap',
						xtype: 'numberfield'
					}, {
						fieldLabel: '��������վ',
						hiddenName: 'station_to_focus_ctr',
						xtype: 'treecombo',
						tree: focus_ctr_tree,
						selectNodeModel:'all'
					}, {
						fieldLabel: '����AVC',
						name: 'isavc',
						xtype: 'checkbox',
						inputValue: 1
					}, {
						fieldLabel: '���м��',
						name: 'isfocus',
						xtype: 'checkbox',
						inputValue: 1
					}]
				}]
			}]
		}, {
			fieldLabel: '��ע',
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
						fieldLabel: '��ϵ�绰',
						name: 'lxdh',
						xtype:'numberfield'
					}, {
						fieldLabel: '<font color="red">*</font>��վ����',
						name: 'station_code',
						xtype: 'textfield',
						allowBlank: false,
						blankText: '��վ���벻��Ϊ��'
					}, {
						fieldLabel: '<font color="red">*</font>��վ��־',
						hiddenName: 'station_flag',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '���վ'], 
				                [1, '�糧'],
				                [3, '�û���']],
				        forceSelection:true,
				        emptyText:'��ѡ��վ��־...',//Ĭ��ֵ  
			            blankText: '��־����Ϊ������',
			            editable: false,//����������  
			            allowBlank: false
					}, {
						fieldLabel: '<font color="red">*</font>��վ����',
						hiddenName: 'station_sift',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        forceSelection:true,
				        emptyText:'��ѡ��վ����...',//Ĭ��ֵ  
			            blankText: '��վ����Ϊ������',
			            editable: false,//����������  
			            allowBlank: false,
				        store: [[0, 'Ĭ��'], 
			        	   [1, '�Զ������⳧վ'],
			        	   [2, 'ֱ���糧'],
			        	   [3, '��ɵ糧'],
			        	   [4, '��վ'],
			        	   [5, 'ֱ�����վ'],
			        	   [6, '����']]
					}, {
						fieldLabel: '��վӢ�ļ��',
						name: 'station_name_short',
						xtype: 'textfield'
					}, {
						fieldLabel: '��������վ',
						name: 'station_to_focus_ctr',
						xtype: 'textfield'
					}, {
						fieldLabel: '����ʱ��',
						name: 'station_createdate',
						xtype:'datetime',
						format: 'Y-m-d H:i:s'
					}]
				},{
					layout : "form", columnWidth: .5, border: false, defaults : { width : 250},
					items : [{
						fieldLabel: '��վ������',
						name: 'table_id',
						xtype: 'hidden'
					},{
						fieldLabel: '��¼��',
						name: 'creator',
						xtype: 'textfield'
					},{
						fieldLabel: '<font color="red">*</font>��վ����',
						hiddenName: 'station_type',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [[0, '���վ'], 
			        	   [1, '����վ��չ���'],
			        	   [2, '����վ']],
				        forceSelection:true,
				        emptyText:'��ѡ��վ����...',//Ĭ��ֵ  
			            blankText: '��վ����Ϊ������',
			            editable: false,//����������  
			            allowBlank: false
					}, {
						fieldLabel: '��վ���ļ��',
						name: 'station_name_jc',
						xtype: 'textfield'
					}, {
						fieldLabel: '�޸�ʱ��',
						name: 'station_editdate',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s'
					}, {
						fieldLabel: 'EMS��վ����',
						name: 'ems_stationcode',
						xtype: 'textfield'
					}, {
						fieldLabel: '��ע',
						name: 'bz',
						xtype:'textarea',
						height: 100
					}]
				}]
			}]
		}*/];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.savaStation
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
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
	
	// ������־��1��ʾ������2��ʾ�޸�
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
	    			Ext.MessageBox.alert('ϵͳ��Ϣ', '��վ����ʧ�ܣ�');
	        	}
			});
		} else {
			Ext.MessageBox.alert('ϵͳ��ʾ', '�����Ʊ��еı����');
		}
	},
	
	deleteStation: function(){
		var _this = this;
		var station = this.getForm().getValues();
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���ñ��վ��',
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
    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�û��������¼����վ���û�������ɾ���¼����վ���û���'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ�����վʧ�ܣ�'); 
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