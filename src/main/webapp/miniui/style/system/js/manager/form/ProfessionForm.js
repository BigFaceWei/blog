Ext.ProfessionForm = Ext.extend(Ext.form.FormPanel, {
	
	title : 'רҵ��Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		
		this.items = [{
			fieldLabel: 'רҵID',
			name: 'PROFESSION_ID',
			xtype:'hidden'
		}, {
			fieldLabel: 'רҵ����',
			name: 'ORGANGRADE',
			xtype:'hidden'
		}, /*{
			fieldLabel: 'רҵ������ɫ����',
			name: 'ROLETYPE',
			xtype:'hidden'
		}, */{
			fieldLabel: '<font color="red">*</font>רҵ��',
			name: 'PROFESSION_NAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: 'רҵ������Ϊ�գ�����д'
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.saveProfession
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.removeProfession
		}];
		
		Ext.ProfessionForm.superclass.initComponent.call(this);
	},
	
	loadProfession: function(professionId, treeType) {
		this.treeType = treeType;
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/usergroup.do?method=getProfession&professionId=' + professionId,
			method: 'GET'
		});
	},
	
	operFlag: 2,
	treeType: undefined,
	
	saveProfession: function() {
		var _this = this;
		if (this.getForm().isValid()) {
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/usergroup.do?method=saveProfession',
				params: {professionInfo: Ext.encode(this.getForm().getValues())},
				success: function (response, opts) {
					var msg = formReply(response);
					if(msg === false) return;
					
					//var roletype = _this.getForm().getValues().ROLETYPE;
					var tree;
					if (_this.treeType == 'SYS') tree = Ext.getCmp('usergroupManagerTree');
					if (_this.treeType == 'WKF') tree = Ext.getCmp('roleManagerTree');
					if (_this.treeType == 'PRO') tree = Ext.getCmp('professionManagerTree');
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
		        	Ext.Msg.alert('ϵͳ��Ϣ','רҵ����ʧ�ܣ�');
		        }
			});
		}
		
    },
    
    removeProfession: function() {
    	var _this = this;
    	var profession = this.getForm().getValues();
    	
    	if(!profession.PROFESSION_ID || profession.PROFESSION_ID == '') return;
    	
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ����רҵ��',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/usergroup.do?method=deleteProfession&professionId=' + profession.PROFESSION_ID,
    					success: function (options, success, response) {
    		    			//var roletype = _this.getForm().getValues().ROLETYPE;
							var tree;
							if (_this.treeType == 'SYS') tree = Ext.getCmp('usergroupManagerTree');
							if (_this.treeType == 'WKF') tree = Ext.getCmp('roleManagerTree');
							
    		    			var sm = tree.getSelectionModel();
    		            	var node = sm.getSelectedNode();
    		            	
    		            	var pNode = node.parentNode;
    		            	pNode.reload();
    		            	_this.getForm().reset();
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ��רҵʧ�ܣ�');
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.WARNING
    			
    	});
    	
    }
    
});