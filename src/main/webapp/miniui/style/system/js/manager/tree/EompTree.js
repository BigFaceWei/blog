Ext.EompTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: false,
	
	initComponent: function() {
		var _this = this;
		
		this.root = new Ext.tree.AsyncTreeNode({
			text: 'ExtJs'
		});
		
		this.loader = new Ext.tree.TreeLoader({
			url: contextpath + '/tbp/sysmanager/tree.do?method=buildTree&isSuperAdmin='+isSuperAdmin+'',
			listeners: {
				beforeload: function(loader, node) {
					if(node != _this.getRootNode()) {
						loader.baseParams.nodeId = node.id;
					} else {
						loader.baseParams.rootId = unitId;
					}
					loader.baseParams.cfgValue = Ext.encode(_this.checkboxValues.cfgValue);
				}
			}
		});
		
		this.tools = [{
			id: 'refresh',
			qtip: '���¼���',
			handler: function() {
				_this.getLoader().baseParams = {};
	        	_this.getRootNode().reload();
			}
		}, {
			id: 'restore',
			qtip: '�л����˵�Ȩ�޹���ҳ��',
			handler: function() {
				//window.location.href = contextpath + '/tbp/page/sys/grant/module-resource-grant.jsp';
				window.location.href = contextpath + '/tbp/page/sys/grant/menumanager.jsp';
			}
		}, {
			id: 'down',
			qtip: '���ù�����',
			handler: function(event, toolEl) {
				if(! this.firstShow) {
					_this.getCfgPanel().getEl().alignTo(toolEl, 'bl-br', [-210, 0]);
					this.firstShow = 1;
				}
				_this.getCfgPanel().setVisible(true);
			}
		}];
		
		Ext.EompTree.superclass.initComponent.call(this);
	},
	
	checkboxValues: {
		cfgValue: [2,3,6,7]
	},
	
	getCfgPanel: function() {
		if(! this.cfgPanel) {
			this.cfgPanel = new Ext.form.FormPanel({
				renderTo: Ext.getBody(),
				title: '���ù�����',
				width: 220,
				height: 110,
				hidden: true,
				frame: true,
				labelWidth: 2,
				items: [{
					name: 'cfgValue',
					xtype: 'checkboxgroup',
					columns: 4,
					items: [
		                {boxLabel: '�û�', name: 'cfgValue', inputValue: 2},
		                {boxLabel: '��վ', name: 'cfgValue', inputValue: 3},
		                /*{boxLabel: '�û���', name: 'cfgValue', inputValue: 4},
		                {boxLabel: '��ɫ', name: 'cfgValue', inputValue: 5},*/
		                {boxLabel: '���Ȼ���', name: 'cfgValue', inputValue: 6},
		                {boxLabel: '���Ȼ�������', name: 'cfgValue', inputValue: 7}
		                
		            ]
				}],
				buttons: [{
					text: 'ȷ��',
					scope: this,
					handler: function() {
						var form = this.cfgPanel.getForm();
						
						if(Ext.isArray(form.getValues().cfgValue)) {
							this.checkboxValues = form.getValues();
						} else {
							this.checkboxValues = {cfgValue: [form.getValues().cfgValue]};
						}
						if (form.getValues().cfgValue == undefined) {
							Ext.Msg.alert('ϵͳ��ʾ','��λ����ѡ��!');
							return;
						}
						
						this.cfgPanel.setVisible(false);
						
						this.getLoader().baseParams = {};
						this.getRootNode().reload();
					}
				}, {
					text: 'ȡ��',
					scope: this,
					handler: function() {
						this.cfgPanel.getForm().reset();
						this.cfgPanel.getForm().setValues(this.checkboxValues);
						this.cfgPanel.setVisible(false);
					}
				}]
			});
			
			this.cfgPanel.getForm().setValues(this.checkboxValues);
		}
		
		return this.cfgPanel;
	}
	
});