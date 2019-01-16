Ext.WindDcTab = function() {
	var _this = this;
	
	Ext.WindDcTab.superclass.constructor.call(this, {
		activeTab: 0,
		plain: true,
		frame: true,
		tbar: [{
			iconCls: 'update',
			text : '����',
			scope: this,
			handler: this.savaStation
		}, {
			iconCls: 'delete',
			text : 'ɾ��',
			scope: this,
			handler: this.deleteStation
		}],
		items: [_this.getDcBaseForm(),_this.getWindDcForm()]
    });
	
};

Ext.extend(Ext.WindDcTab, Ext.TabPanel, {
	
	init: function(dcId, stationType) {
		this.getDcBaseForm().loadDc(dcId);
		this.getWindDcForm().loadWindDc(dcId, stationType);
		// ������־��1��ʾ������2��ʾ�޸�
		this.operFlag = 2;
	},
	
	getDcBaseForm: function() {
		if(! this.dcBaseForm) {
			this.dcBaseForm = new Ext.DcBaseForm();
		}
		return this.dcBaseForm;
	},
	
	getWindDcForm: function() {
		if(! this.windDcForm) {
			this.windDcForm = new Ext.WindDcForm();
		}
		return this.windDcForm;
	},
	
	savaStation: function() {
		var _this = this;
		if (this.getDcBaseForm().getForm().isValid() && this.getWindDcForm().getForm().isValid()) {
			this.setActiveTab(1);
			this.setActiveTab(0);
			Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/station.do?method=save',
				params: {
					stationInfo: Ext.encode(this.getDcBaseForm().getForm().getValues()),
					dcExtendInfo: Ext.encode(this.getWindDcForm().getForm().getValues())
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
	        		Ext.MessageBox.alert('ϵͳ��ʾ', '��վ����ʧ�ܣ�');
	        	}
			});
		} else {
			Ext.MessageBox.alert('ϵͳ��ʾ', '�����Ʊ��еı����');
		}	
	},
	
	deleteStation: function(){
		var _this = this;
		var station = this.getDcBaseForm().getForm().getValues();
    	Ext.Msg.show({
    		title: 'ϵͳ��Ϣ',
    		msg: '��ȷ��Ҫɾ���õ糧��',
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
    		    				Ext.MessageBox.alert('ϵͳ��Ϣ', '�û��������¼��糧���û�������ɾ���¼��糧���û���'); 
    		    			}
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('ϵͳ��Ϣ', 'ɾ���糧ʧ�ܣ�'); 
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    	});
	}
});