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
	checknameText: "�Ѵ���ͬ�����Ȼ�������"
});

Ext.DispatchDeptForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '���Ȼ���������Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
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
		
		var profession_store = this.profession_store = new Ext.data.JsonStore({  
		    url: contextpath + '/tbp/sysmanager/organ.do?method=getProfessions',
		    fields: ['PROFESSION_ID','PROFESSION_NAME']  
		});
		//profession_store.load();
	
		this.items = [{
			layout: 'column',
			border: false,
			items: [{
				columnWidth: .5,
				border: false,
				layout: 'form',
				items: [{
					fieldLabel: '����ID',
					name: 'ORGANID',
					id: 'organid',
					xtype: 'hidden'
				}, {
					fieldLabel: '���õ��ֶ�',
					name: 'AFFILIATEDCOMPANY',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '���õ��ֶ�',
					name: 'GRIDNAME',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '���õ��ֶ�',
					name: 'DISPATCHGRADE',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '���õ��ֶ�',
					name: 'COMPANYGRADE',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '��������',
					name: 'ORGANNAME',
					xtype:'textfield',
					maxLength: 40,
					width: 250,
					checkname: {organid: 'organid'},
					vtype: 'checkname',
					validationDelay: 1000
				}, {
					fieldLabel: '��������',
					name: 'PARENTID',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '��������',
					name: 'PARENTORGANNAME',
					xtype: 'textfield',
					readOnly: true,
		            width: 250
				}, {
					fieldLabel: '���õ��ֶ�',
					name: 'MAILINGADDRESS',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '���õ��ֶ�',
					name: 'CONTACTDEPARTMENT',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '���õ��ֶ�',
					name: 'CONTACTNUMBER',
					xtype:'hidden',
					width: 250
				}, {
					fieldLabel: '��������',
					hiddenName: 'ORGANTYPE',
					xtype: 'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        forceSelection: true,
			        mode: 'local',
			        store: [['gridCompany', '������˾'], 
			            ['genco', '���繫˾'],
			        	['unit', '���Ȼ���'],
			            ['dept', '���Ȼ�������'],
			        	['dummy', '����ڵ�'],
			        	['otherOrgan', '��������']],
			        forceSelection: true,
			        emptyText:'��ѡ���������...',//Ĭ��ֵ  
		            blankText: '��������Ϊ������',
		            editable: false,//����������  
		            allowBlank: false,		
			        width: 250
				}, {
					fieldLabel: '��������',
					hiddenName: 'ORGANGRADE',
					xtype:'combo',
					typeAhead: true,
			        triggerAction: 'all',
			        forceSelection: true,
			        displayField: 'GRADENAME',
			        valueField: 'GRADEID',
			        store: gradeStore,
			        allowBlank: false,
					blankText: '����������Ϊ�գ�����д',
			        width: 250
				}, {
					fieldLabel: '�Ƿ�����',
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
						fieldLabel: '���ż��',
						name: 'ORGANSHORTNAME',
						xtype:'textfield',
						maxLength: 25,
						width: 250
					}, {
						fieldLabel: '���õ��ֶ�',
						name: 'POSTALCODE',
						xtype:'hidden',
						width: 250
					}, {
						fieldLabel: '���õ��ֶ�',
						name: 'FAX',
						xtype:'hidden',
						width: 250
					}, {
						fieldLabel: '���õ��ֶ�',
						name: 'EMAILADDRESS',
						xtype:'hidden',
						width: 250
					}, {
						fieldLabel: '�������',
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
						fieldLabel: '����רҵ',
						hiddenName: 'PROFESSION_ID',
						xtype: 'lovcombo',
						store: profession_store, 
						hideOnSelect : false,   
			            valueField :"PROFESSION_ID",  
			            displayField: "PROFESSION_NAME",
			            typeAhead : true,   
			            emptyText:'��ѡ������רҵ...',//Ĭ��ֵ  
			            editable: false,//����������  
			            triggerAction: 'all',
				        width: 250  
				}]
			}]
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.saveOrgan
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.deleteOrgan
		}];
		
		Ext.DispatchDeptForm.superclass.initComponent.call(this);
		
		// ��һ�ַ��� override beforeBlur method   
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
	
	// ������־��1��ʾ������2��ʾ�޸�
	operFlag: 2,
	
	saveOrgan: function() {
		var _this = this;
		if(this.getForm().isValid()){//����ͻ��˵���֤ͨ���򷵻���  
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
	    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
	        	}
			});
	    }
    },
    
    deleteOrgan: function() {
    	var _this = this;
    	var organ = this.getForm().getValues();
    	
    	if(!organ.ORGANID || organ.ORGANID == '') return;
    	
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���û�����',
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
    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�û��������¼��������û�������ɾ���¼��������û���'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ������ʧ�ܣ�'); 
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
    }
});