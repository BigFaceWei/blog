Ext.DcBaseForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '������Ϣ',
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
	       
		   root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
						fieldLabel: '<font color="red">*</font>���糧��������',
						name: 'station_name',
						xtype:'textfield',
						allowBlank: false,
						blankText: '��վ�����Ǳ�����',
						width: 250
					}, {
						fieldLabel: '���糧����ע������',
						name: 'stationregistration',
						xtype: 'textfield',
			            width: 250
					}, {
						fieldLabel: '�������繫˾',
						hiddenName: 'belongcompany',
						xtype: 'treecombo',
						tree: gencotree,
						selectNodeModel:'all',
			            width: 250
					}, {
						fieldLabel: '�ʲ�����',
						name: 'assetsnature',
						xtype:'combo',
						typeAhead: true,
				        triggerAction: 'all',
				        store: [['1', '���ҵ�����˾'], 
			        	   ['2', '���������˾'],
			        	   ['3', 'ʡ��˾'], 
			        	   ['4', '�ع�˾'],
			        	   ['5', '�û�'], 
			        	   ['6', '�ɷ���']],
				        forceSelection:true,
			            width: 250
			          }, {
						fieldLabel: '�������',
						hiddenName: 'accessnetwork',
						xtype: 'treecombo',
						tree: accessnetworktree,
						selectNodeModel:'all',
			            width: 250
					  }, {
						fieldLabel: '��վ��־',
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
			            allowBlank: false,
				        width: 250
					}]
					}, {
						columnWidth: .5,
						layout: 'form',
						border: false,
						items: [{
							fieldLabel: '���糧���',
							name: 'ddjc',
							xtype: 'textfield',
					        width: 250
						}, {
							fieldLabel: 'ȫ·������',
							name: 'dispatchname',
							xtype: 'textfield',
				            width: 250
						}, {
							fieldLabel: '�ʲ���λ',//ѡ���豸�����ʲ���λ��ϵͳĬ��Ϊ��ǰ��¼��������ʡ��˾
							hiddenName: 'assetsunit',
							xtype: 'treecombo',
							tree: assetsunittree,
							selectNodeModel:'all',
				            width: 250
						}, {
							fieldLabel: '���й���λ',
							hiddenName: 'runing_orga_id',
							xtype: 'treecombo',
							tree: runing_orga_tree,
							selectNodeModel:'all',
				            width: 250
						}, {
							fieldLabel: '<font color="red">*</font>��վ����',
							hiddenName: 'station_type',
							xtype:'combo',
							typeAhead: true,
					        triggerAction: 'all',
					        store: [
				        	   [3, '��糧'],
				        	   [4, 'ˮ�糧'], 
				        	   [7, '��糡'],
				        	   [8, '�˵�վ'],
				        	   [9, '�����վ'],
				        	   [10, '��ˮ���ܵ�վ']],
					        forceSelection:true,
					        emptyText:'��ѡ��վ����...',//Ĭ��ֵ  
				            blankText: '��վ����Ϊ������',
				            editable: false,//����������  
				            allowBlank: false,
					        width: 250
					   }]
			    }]
			 },{
				xtype:'fieldset',     //�ڶ���fieldSet
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
						fieldLabel: '���Ȼ���',
						hiddenName: 'dispatchorga_id',
						xtype: 'treecombo',
						tree: dispatchorgatree,
						selectNodeModel:'all',
			            width: 250
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
						fieldLabel: 'Ͷ������',
						name: 'tyrq',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s',
			            width: 250
					}, {
						fieldLabel: 'װ��������MW��',
						name: 'installedcapacity',
						xtype: 'numberfield',
			            width: 250
					}, {
						fieldLabel: '��������MW��',
						name: 'maximumoutput',
						xtype: 'numberfield',
			            width: 250
					}, {
						fieldLabel: '��վ����ʡ��',
						name: 'belongprovince',
						xtype: 'textfield',
			            width: 250
					}]
		           }, {
						columnWidth: .5,
						layout: 'form',
						border: false,
						items: [{
							fieldLabel: '��������',
							name: 'tyrq1',
							xtype: 'datetime',
							format: 'Y-m-d H:i:s',
				            width: 250
						}, {
							fieldLabel: '����̨����̨��',
							name: 'unitnumber',
							xtype: 'numberfield',
							allowDecimals : false,
				            width: 250
						}, {
							fieldLabel: '��ߵ��ȹ�ϽȨ',
							hiddenName: 'highdisforshort',
							xtype: 'treecombo',
							tree: highdisforshorttree,
							selectNodeModel:'all',
				            width: 250
						}, {
							fieldLabel: '��վ���ڵ���',
							name: 'belongcity',
							xtype: 'textfield',
				            width: 250
						}, {
							fieldLabel: '����λ��γ�ȣ��㣩',
							name: 'latitude',
							xtype: 'textfield',
					        width: 250
						}, {
							fieldLabel: '����λ�þ��ȣ��㣩',
							name: 'longitude',
							xtype: 'textfield',
					        width: 250
				     }]
			    }]
		    },{
		        xtype: 'fieldset',     //������fieldSet
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
						fieldLabel: 'ͨ�ŵ�ַ',
						name: 'address',
						xtype:'textfield',
						width: 250
					}, {
						fieldLabel: '��ϵ����',
						name: 'contactdept',
						xtype:'textfield',
						width: 250
					}, {
						fieldLabel: '��ϵ�绰',
						name: 'lxdh',
						xtype:'textfield',
						regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
						regexText: '��ʽ�Ƿ�����ʽ�磺18770011125��0791-88888888',
						width: 250
					}]	
	              }, {
					columnWidth: .5,
					layout: 'form',
					border: false,
					items: [{
						fieldLabel: '��������',
						name: 'postalcode',
						xtype:'textfield',
						regex: /^[1-9]\d{5}(?!\d)$/,
						regexText: '��ʽ�Ƿ�����ʽ�磺330018',
						width: 250
					}, {
						fieldLabel: '����',
						name: 'fax',
						xtype:'numberfield',
						regex: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,
						regexText: '��ʽ�Ƿ�����ʽ�磺XXX-12345678��XXXX-1234567��XXXX-12345678',
						width: 250
					}, {
						fieldLabel: '�����ַ',
						name: 'e_mailaddress',
						xtype:'textfield',
						regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
						regexText: '��ʽ�Ƿ�����ʽ�磺example123@163.com',
						width: 250
					}]
		       }]
		    }/*,{
		        xtype:'fieldset',     //��4��fieldSet
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
						fieldLabel: '<font color="red">*</font>��վ����',
						name: 'station_code',
						xtype: 'textfield',
						allowBlank: false,
						blankText: '��վ���벻��Ϊ��',
						width: 250
					}, {
						fieldLabel: '��վ���ļ��',
						name: 'station_name_jc',
						xtype: 'textfield',
				        width: 250
					}, {
						fieldLabel: '��վ��־',
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
			            allowBlank: false,
				        width: 250
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
			        	   [6, '����']],
				        width: 250
					}, {
						fieldLabel: '����ʱ��',
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
						fieldLabel: '��վ������',
						name: 'table_id',
						xtype: 'hidden',
				        width: 250
					}, {
						fieldLabel: '��¼��',
						name: 'creator',
						xtype: 'textfield',
				        width: 250
					}, {
						fieldLabel: 'EMS��վ����',
						name: 'ems_stationcode',
						xtype: 'textfield',
				        width: 250
					}, {
						fieldLabel: '�޸�ʱ��',
						name: 'station_editdate',
						xtype: 'datetime',
						format: 'Y-m-d H:i:s',
						width: 250
					},{
						fieldLabel: '��������վ',
						name: 'station_to_focus_ctr',
						xtype: 'textfield',
				        width: 250
					},{
						fieldLabel: '��վӢ�ļ��',
						name: 'station_name_short',
						xtype: 'textfield',
				        width: 250
					}]
		     }]
		}, {
			fieldLabel: '��ע',
			name: 'bz',
			xtype:'textarea',
			width: 600,
			height: 100
		}*/];
		
		Ext.DcBaseForm.superclass.initComponent.call(this);
	},
	
    // ������־��1��ʾ������2��ʾ�޸�
	operFlag: 2,
	
	loadDc: function(stationId) {
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/station.do?method=get&stationId=' + stationId,
			method: 'GET'
		});
	}
	
});