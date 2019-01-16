Ext.D5000VirtualNodeForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�ڵ���Ϣ',
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
		
		var twoTree = new Ext.TwoTree();
		
		this.items = [{
			fieldLabel: '�ڵ�ID',
			name: 'ORGANID',
			xtype: 'hidden'
		}, {
			fieldLabel: '�ڵ�����',
			name: 'ORGANNAME',
			xtype:'textfield',
			width: 250
		}, {
			fieldLabel: '��������',
			name: 'ORGANCODE',
			xtype:'hidden',
			maxLength: 20,
			width: 250
		}, {
			fieldLabel: '�ϼ���λ',
			name: 'PARENTID',
			xtype: 'hidden'
		}, {
			fieldLabel: 'ҵ��ID',
			name: 'BUSINESS_ID',
			xtype: 'hidden'
		}, {
			fieldLabel: '�ڵ�����',
			hiddenName: 'ORGANTYPE',
			xtype: 'combo',
			typeAhead: true,
	        store: store, 
            valueField :"TYPEID",  
            displayField: "TYPENAME",  
            forceSelection: true,//����ѡ��һ��  
            emptyText:'��ѡ��ڵ�����...',//Ĭ��ֵ  
            blankText: '�ڵ�����Ϊ������',
            editable: false,//����������  
            triggerAction: 'all',
            allowBlank: false,
	        width: 250,
	        listeners: {
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
		}, {
			fieldLabel: '<font color="red">*</font>��������',
			hiddenName: 'ORGANGRADE',
			xtype: 'combo',
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
			fieldLabel: '�������',
			name: 'ORGANKIND',
			xtype: 'hidden',
			value: 2
		}, {
			fieldLabel: '�������',
			name: 'AREANO',
			xtype: 'hidden'
		}, {
			fieldLabel: '�Ƿ�����',
			name: 'ISENABLED',
			xtype: 'hidden',
			value: 1
		}, {
			fieldLabel: '����רҵ',
			hiddenName: 'PROFESSION_ID',
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
			fieldLabel: '�ϼ����繫˾',
			name: 'PARENTORGANNAME',
			xtype: 'hidden',
			readOnly: true,
            width: 250
		},  {
			fieldLabel: '���õ��ֶ�',
			name: 'PARENTORGANID',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: 'ͨ�ŵ�ַ',
			name: 'MAILINGADDRESS',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '��ϵ����',
			name: 'CONTACTDEPARTMENT',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '��ϵ�绰',
			name: 'CONTACTNUMBER',
			xtype:'hidden',
			width: 250
		},{
			fieldLabel: '��˾���',
			name: 'ORGANSHORTNAME',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '��������',
			name: 'POSTALCODE',
			xtype:'hidden',
			regex: /^[1-9]\d{5}(?!\d)$/,
			width: 250
		}, {
			fieldLabel: '����',
			name: 'FAX',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '�����ַ',
			name: 'EMAILADDRESS',
			xtype:'hidden',
			regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			vtypeText: '��ʽ�Ƿ�����ʽ�磺example123@163.com',
			width: 250
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
		
		Ext.D5000VirtualNodeForm.superclass.initComponent.call(this);
		
		twoTree.on('afterSave', function() {
			_this.cacher.clear();
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
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/organ.do?method=get&organId=' + organId,
			method: 'GET'
		});
	},
	
	// ������־��1��ʾ������2��ʾ�޸�
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
    			Ext.Msg.alert('ϵͳ��ʾ', '�����������ʧ�ܣ�');
        	}
		});
		
    },
    
    deleteOrgan: function() {
    	var _this = this;
    	var organ = this.getForm().getValues();
    	
    	if(!organ.ORGANID || organ.ORGANID == '') return;
    	
    	Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/organ.do?method=delete&organId=' + organ.ORGANID,
			success: function (options, success, response) {
    			var tree = Ext.getCmp('navigation-tree');
    			var sm = tree.getSelectionModel();
            	var node = sm.getSelectedNode();
            	node.parentNode.reload();
            	
            	_this.getForm().reset();
    		},
    		failure: function() {
        		alert('ɾ������ʧ�ܣ�');
        	}
		});
    	
    }
});