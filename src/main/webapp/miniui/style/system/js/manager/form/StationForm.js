Ext.StationForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '��վ��Ϣ',
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
		//����һ������
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
	       
		   root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
		   		text:'�����'//,
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
					fieldLabel: '������λ',
					hiddenName: 'orga_id',
					xtype: 'treecombo',
					tree: organtree,
					selectNodeModel:'all', 
			        width: 250
				}, {
					fieldLabel: '��վ����<font color="red">*</font>',
					name: 'station_code',
					xtype: 'textfield',
					allowBlank: false,
					blankText: '��վ���벻��Ϊ��',
					width: 250
				}, {
					fieldLabel: '��վ��־',
					hiddenName: 'station_flag',
					xtype:'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        store: [[0, '���վ'], 
			                [1, '�糧']],
			        forceSelection:true,
			        emptyText:'��ѡ��վ��־...',//Ĭ��ֵ  
		            blankText: '��־����Ϊ������',
		            editable: false,//����������  
		            allowBlank: false,
			        width: 250
				}, {
					fieldLabel: '��վ����',
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
					fieldLabel: '��վӢ�ļ��',
					name: 'station_name_short',
					xtype: 'textfield',
			        width: 250
				}, {
					fieldLabel: '��������վ',
					hiddenName: 'station_to_focus_ctr',
					xtype: 'treecombo',
					tree: contenttree,
					selectNodeModel:'all', 
			        width: 250
				}, {
					fieldLabel: '����ʱ��',
					name: 'station_createdate',
					xtype:'datetime',
					format: 'Y-m-d H:i:s',
					width: 250
				}/*, {
					fieldLabel: '��ϵ�绰',
					name: 'LXDH',
					xtype:'numberfield',
					width: 250
				}*/,{
					fieldLabel: '����רҵ',
					hiddenName: 'profession_id',
					xtype: 'lovcombo',
					store: professionStore, 
					hideOnSelect : false,   
		            valueField :"PROFESSION_ID",  
		            displayField: "PROFESSION_NAME",
		            typeAhead : true,   
		            emptyText:'��ѡ������רҵ...',//Ĭ��ֵ  
		            editable: false,//����������  
		            triggerAction: 'all',
		            //showSelectAll: true,//��ʾȫ��ѡ��
			        width: 250  
				} ]
			}, {
				columnWidth: .5,
				layout: 'form',
				border: false,
				items: [{
					fieldLabel: '��վ����<font color="red">*</font>',
					name: 'station_name',
					xtype:'textfield',
					allowBlank: false,
					blankText: '��վ�����Ǳ�����',
					width: 250
				}, {
					fieldLabel: '��ѹ�ȼ�<font color="red">*</font>',
					hiddenName: 'voltage_id',
					//xtype:'combo',
					xtype: 'lovcombo',
					store: store, 
					hideOnSelect: false, 
		            valueField :"VOLTAGE_ID",  
		            displayField: "VOLTAGE_NAME",  
		            //forceSelection: true,//����ѡ��һ��  
		            emptyText:'��ѡ���ѹ�ȼ�...',//Ĭ��ֵ  
		            blankText: '��ѹ�ȼ�Ϊ������',
		            editable: false,//����������  
		            typeAhead : true,   
		            triggerAction: 'all',
		            allowBlank: false,
			        width: 250  
				}, {
					fieldLabel: '��վ����',
					hiddenName: 'station_type',
					xtype:'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        store: [[0, '���վ'], 
		        	   [1, '����վ��չ���'],
		        	   [2, '����վ'],
		        	   [3, '���վ'],
		        	   [4, 'ˮ��վ'], 
		        	   [5, 'С���'],
		        	   [6, 'Сˮ��'],
		        	   [7, '��糧'],
		        	   [8, '�˵糧']],
			        forceSelection:true,
			        emptyText:'��ѡ��վ����...',//Ĭ��ֵ  
		            blankText: '��վ����Ϊ������',
		            editable: false,//����������  
		            allowBlank: false,
			        width: 250
				}, {
					fieldLabel: '��վ���ļ��',
					name: 'station_name_jc',
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
				}, {
					fieldLabel: '�Ƿ�ɾ��',
					name: 'station_isdel',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}]
			}]
		}, {
			fieldLabel: '��ע',
			name: 'bz',
			xtype:'textarea',
			width: 600,
			height: 100
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.savaStation
		}/*, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.deleteStation
		}*/];
		
		Ext.StationForm.superclass.initComponent.call(this);
		
		// ��һ�ַ��� override beforeBlur method   
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
	
	// ������־��1��ʾ������2��ʾ�޸�
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
	        		Ext.MessageBox.alert('ϵͳ��Ϣ','��վ����ʧ�ܣ�');
	        	}
			});
		}	
	},
	
	deleteStation: function(){
		var _this = this;
		var station = this.getForm().getValues();
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���ó�վ��',
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
    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�û��������¼���վ���û�������ɾ���¼���վ���û���'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ����վʧ�ܣ�'); 
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