Ext.D5000VirtualNodeForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '节点信息',
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
			fieldLabel: '节点ID',
			name: 'ORGANID',
			xtype: 'hidden'
		}, {
			fieldLabel: '节点名称',
			name: 'ORGANNAME',
			xtype:'textfield',
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
			xtype: 'hidden'
		}, {
			fieldLabel: '业务ID',
			name: 'BUSINESS_ID',
			xtype: 'hidden'
		}, {
			fieldLabel: '节点类型',
			hiddenName: 'ORGANTYPE',
			xtype: 'combo',
			typeAhead: true,
	        store: store, 
            valueField :"TYPEID",  
            displayField: "TYPENAME",  
            forceSelection: true,//必须选择一项  
            emptyText:'请选择节点类型...',//默认值  
            blankText: '节点类型为必填项',
            editable: false,//不允许输入  
            triggerAction: 'all',
            allowBlank: false,
	        width: 250,
	        listeners: {
		        beforequery: function(qe){
		            delete qe.combo.lastQuery;
        		}
	        }
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
			name: 'ORGANKIND',
			xtype: 'hidden',
			value: 2
		}, {
			fieldLabel: '区域编码',
			name: 'AREANO',
			xtype: 'hidden'
		}, {
			fieldLabel: '是否启用',
			name: 'ISENABLED',
			xtype: 'hidden',
			value: 1
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
	        width: 250  
		}, {
			fieldLabel: '不用的字段',
			name: 'AFFILIATEDCOMPANY',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '不用的字段',
			name: 'GRIDNAME',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '不用的字段',
			name: 'DISPATCHGRADE',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '不用的字段',
			name: 'COMPANYGRADE',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '上级发电公司',
			name: 'PARENTORGANNAME',
			xtype: 'hidden',
			readOnly: true,
            width: 250
		},  {
			fieldLabel: '不用的字段',
			name: 'PARENTORGANID',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '通信地址',
			name: 'MAILINGADDRESS',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '联系部门',
			name: 'CONTACTDEPARTMENT',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '联系电话',
			name: 'CONTACTNUMBER',
			xtype:'hidden',
			width: 250
		},{
			fieldLabel: '公司简称',
			name: 'ORGANSHORTNAME',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '邮政编码',
			name: 'POSTALCODE',
			xtype:'hidden',
			regex: /^[1-9]\d{5}(?!\d)$/,
			width: 250
		}, {
			fieldLabel: '传真',
			name: 'FAX',
			xtype:'hidden',
			width: 250
		}, {
			fieldLabel: '邮箱地址',
			name: 'EMAILADDRESS',
			xtype:'hidden',
			regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			vtypeText: '格式非法，格式如：example123@163.com',
			width: 250
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
	
	// 操作标志，1表示新增、2表示修改
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
    			Ext.Msg.alert('系统提示', '与服务器交互失败！');
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
        		alert('删除机构失败！');
        	}
		});
    	
    }
});