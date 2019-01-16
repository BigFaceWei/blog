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
			qtip: '重新加载',
			handler: function() {
				_this.getLoader().baseParams = {};
	        	_this.getRootNode().reload();
			}
		}, {
			id: 'restore',
			qtip: '切换到菜单权限管理页面',
			handler: function() {
				//window.location.href = contextpath + '/tbp/page/sys/grant/module-resource-grant.jsp';
				window.location.href = contextpath + '/tbp/page/sys/grant/menumanager.jsp';
			}
		}, {
			id: 'down',
			qtip: '设置过滤器',
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
				title: '配置过滤器',
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
		                {boxLabel: '用户', name: 'cfgValue', inputValue: 2},
		                {boxLabel: '厂站', name: 'cfgValue', inputValue: 3},
		                /*{boxLabel: '用户组', name: 'cfgValue', inputValue: 4},
		                {boxLabel: '角色', name: 'cfgValue', inputValue: 5},*/
		                {boxLabel: '调度机构', name: 'cfgValue', inputValue: 6},
		                {boxLabel: '调度机构部门', name: 'cfgValue', inputValue: 7}
		                
		            ]
				}],
				buttons: [{
					text: '确定',
					scope: this,
					handler: function() {
						var form = this.cfgPanel.getForm();
						
						if(Ext.isArray(form.getValues().cfgValue)) {
							this.checkboxValues = form.getValues();
						} else {
							this.checkboxValues = {cfgValue: [form.getValues().cfgValue]};
						}
						if (form.getValues().cfgValue == undefined) {
							Ext.Msg.alert('系统提示','单位必须选择!');
							return;
						}
						
						this.cfgPanel.setVisible(false);
						
						this.getLoader().baseParams = {};
						this.getRootNode().reload();
					}
				}, {
					text: '取消',
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