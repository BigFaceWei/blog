Ext.LDcTab = function() {
	var _this = this;
	
	Ext.LDcTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		tbar: [{
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.savaStation
		}, {
			iconCls: 'delete',
			text : '删除',
			scope: this,
			handler: this.deleteStation
		}],
		items: [_this.getDcBaseForm(),_this.getLDcForm()]
    });
	
};

Ext.extend(Ext.LDcTab, Ext.TabPanel, {
	
	init: function(dcId, stationType) {
		this.getDcBaseForm().loadDc(dcId);
		this.getLDcForm().loadLDc(dcId, stationType);
		// 操作标志，1表示新增、2表示修改
		this.operFlag = 2;
	},
	
	getDcBaseForm: function() {
		if(! this.dcBaseForm) {
			this.dcBaseForm = new Ext.DcBaseForm();
		}
		return this.dcBaseForm;
	},
	
	getLDcForm: function() {
		if(! this.lDcForm) {
			this.lDcForm = new Ext.LDcForm();
		}
		return this.lDcForm;
	},
	
	savaStation: function() {
		var _this = this;
		if (this.getDcBaseForm().getForm().isValid() && this.getLDcForm().getForm().isValid()) {
			this.setActiveTab(1);
			this.setActiveTab(0);
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/station.do?method=save',
				params: {
					stationInfo: Ext.encode(this.getDcBaseForm().getForm().getValues()),
					dcExtendInfo: Ext.encode(this.getLDcForm().getForm().getValues())
				},
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
	        		Ext.MessageBox.alert('系统提示', '厂站创建失败！');
	        	}
			});
		} else {
			Ext.MessageBox.alert('系统提示', '请完善表单中的必填项！');
		}	
	},
	
	deleteStation: function(){
		var _this = this;
		var station = this.getDcBaseForm().getForm().getValues();
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该电厂吗？',
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
        		            	
        		            	_this.getDcBaseForm().getForm().reset();
    						}
    		    			if (response.responseText == 'failure') {
    		    				Ext.MessageBox.alert('系统消息', '该机构存在下级电厂或用户，请先删除下级电厂或用户！'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('系统消息', '删除电厂失败！'); 
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
	}
});