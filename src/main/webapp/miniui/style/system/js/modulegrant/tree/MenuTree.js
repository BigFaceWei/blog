Ext.MenuTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: false,
	
	initComponent: function() {
		var _this = this;
		
		this.loader = new Ext.tree.TreeLoader({
        	url: contextPath + '/tbp/sysmanager/menu.do?method=tree',
        	listeners: {
    			beforeload: function(loader, node) {
    				if(node != _this.getRootNode()) {
    					loader.baseParams.nodeId = node.id;
    				}
    				loader.baseParams.cfgValue = Ext.encode(_this.checkboxValues.cfgValue);
    			},
    			load: function(loader, node) {
    				if(node == _this.getRootNode()) {
    					node.eachChild(function(child) {
    						child.expand();
    					});
    				}
    			}
    		}
		}),
        this.root = new Ext.tree.AsyncTreeNode({
            text: 'Ext JS',
            id: 'root',
            expanded: true
        }),
        
        this.tbar = [{
        	name: 'radiogroup',
        	xtype: 'radiogroup',
        	height: 25,
            items: [
                {boxLabel: '省级菜单', name: 'cfgValue2', inputValue: 3},
                {boxLabel: '地级菜单', name: 'cfgValue2', inputValue: 4},
                {boxLabel: '县级菜单', name: 'cfgValue2', inputValue: 5}
            ],
            listeners: {
	        	'change': function(radioGroup, checkRadio){
	        		_this.checkboxValues = {cfgValue: [radioGroup.getValue().inputValue]};
	        		_this.getLoader().baseParams = {};
					_this.getRootNode().reload();
	        	},
	        	'beforerender': function(radioGroup) {
	        		if (!isSuperAdmin) {
	        			radioGroup.setVisible(false);
					}
	        	},
	        	'render': function(radioGroup) {
	        		radioGroup.setValue(gradeId);
	        	}
            }
		}];
		
		this.tools = [{
			id: 'refresh',
			qtip: '重新加载',
			handler: function() {
				_this.getLoader().baseParams = {};
	        	_this.getRootNode().reload();
			}
		}, {
			id: 'restore',
			qtip: '切换到组织机构管理页面',
			handler: function() {
				window.location.href = contextPath + '/tbp/page/sys/organ/sysmanager.jsp';
			}
		}, {
			id: 'down',
			qtip: '菜单过滤器',
			handler: function(event, toolEl) {
				if(! this.firstShow) {
					_this.getCfgPanel().getEl().alignTo(toolEl, 'bl-br', [-175, 0]);
					this.firstShow = 1;
				}
				if (isSuperAdmin) {
					_this.getCfgPanel().setVisible(true);
				}
			}
		}],
		
		Ext.MenuTree.superclass.initComponent.call(this);
	},
	
	checkboxValues: {
		cfgValue: [gradeId]
	},
	
	getCfgPanel: function() {
		if(! this.cfgPanel) {
			this.cfgPanel = new Ext.form.FormPanel({
				renderTo: Ext.getBody(),
				title: '菜单过滤器',
				width: 250,
				height: 90,
				hidden: true,
				frame: true,
				labelWidth: 2,
				items: [{
					name: 'cfgValue',
					xtype: 'radiogroup',
					columns: 3,
					items: [
		                {boxLabel: '省级菜单', name: 'cfgValue', inputValue: 3},
		                {boxLabel: '地级菜单', name: 'cfgValue', inputValue: 4},
		                {boxLabel: '县级菜单', name: 'cfgValue', inputValue: 5}
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
						if ([form.getValues().cfgValue] == '') {
						    Ext.Msg.alert('系统提示','请选择一个菜单级别！');
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