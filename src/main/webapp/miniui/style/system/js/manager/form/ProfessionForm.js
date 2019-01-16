Ext.ProfessionForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '专业信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px',
	
	initComponent: function() {
		
		this.items = [{
			fieldLabel: '专业ID',
			name: 'PROFESSION_ID',
			xtype:'hidden'
		}, {
			fieldLabel: '专业级别',
			name: 'ORGANGRADE',
			xtype:'hidden'
		}, /*{
			fieldLabel: '专业所属角色类型',
			name: 'ROLETYPE',
			xtype:'hidden'
		}, */{
			fieldLabel: '<font color="red">*</font>专业名',
			name: 'PROFESSION_NAME',
			xtype:'textfield',
			allowBlank: false,
			width: 250,
			blankText: '专业名不能为空，请填写'
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.saveProfession
		}, {
			iconCls: 'delete',
			text : '删除',
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
		        	Ext.Msg.alert('系统消息','专业创建失败！');
		        }
			});
		}
		
    },
    
    removeProfession: function() {
    	var _this = this;
    	var profession = this.getForm().getValues();
    	
    	if(!profession.PROFESSION_ID || profession.PROFESSION_ID == '') return;
    	
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该专业吗？',
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
    		    			Ext.MessageBox.alert('系统消息', '删除专业失败！');
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.WARNING
    			
    	});
    	
    }
    
});