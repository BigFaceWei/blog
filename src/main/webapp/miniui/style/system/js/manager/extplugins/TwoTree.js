Ext.TwoTree = Ext.extend(Ext.Panel, {
	
	layout: 'border',
	
	initComponent: function() {
		var _this = this;
		var store = new Ext.data.JsonStore({
	    	url: contextpath + '/tbp/sysmanager/areano.do?method=listVirtualNodes',
	    	fields: ['TYPEID', 'TYPENAME']
	    });
		store.load();
		
		this.getStore = function() {
			return store;
		};
		
		var tree = new Ext.tree.TreePanel({
			region: 'west',
			title: '菜单信息',
			margins: '0 2 0 0',
			rootVisible: false,
			autoScroll: true,
			useArrows: true,
			border: false,
			root: new Ext.tree.TreeNode(),
			width: 230
		});
		
		var selectedTree = new Ext.tree.TreePanel({
			region: 'center',
			title: '可见的菜单',
			rootVisible: false,
			autoScroll: true,
			border: false,
			root: new Ext.tree.TreeNode(),
			useArrows: true
		});
		
		var combo = new Ext.form.ComboBox({
			fieldLabel: '虚拟节点',
			typeAhead: true,
	        triggerAction: 'all',
	        forceSelection: true,
	        displayField: 'TYPENAME',
	        valueField: 'TYPEID',
	        store: store,
	        editable: false,
	        width: 180
		});
		
		var selectedValue;
		
		this.items = [{
			region: 'north',
			xtype: 'form',
			border: false,
			height: 40,
			labelWidth: 55,
			bodyStyle: 'padding: 8px 10px',
			items: combo
		}, tree, selectedTree];
		
		this.tbar = [{
			text: '保存当前配置',
			iconCls: 'save',
			scope: this,
			handler: function() {
				if(selectedValue) {
					var selectMenus = [];
					var root = selectedTree.getRootNode();
					Ext.each(root.childNodes, function(node) {
						selectMenus.push(node.id);
					});
					
					var masker = new Ext.LoadMask(this.getEl(), {
			        	msg: '正在保存，请稍后...'
			        });
			        masker.show();
					
					Ext.Ajax.request({
						url: contextpath + '/tbp/sysmanager/areano.do?method=updateVirtualMenus',
						params: {virtualId: selectedValue, selectMenus:selectMenus.join(',')},
						success: function(response, opts) {
			     		   masker.hide();
			     		   Ext.destroy(masker);
			     		   if(response.responseText != '1') {
			     			   alert('保存失败！');
			     		   } else {
			     			   _this.fireEvent('afterSave', this);
			     		   }
			     	   	},
			     	   	failure: function(response, opts) {
			     		   masker.hide();
			     		   Ext.destroy(masker);
			     		   alert('保存失败！');
			     	   	}
					});
				}
			}
		}];
		
		Ext.TwoTree.superclass.initComponent.call(this);
		
		this.addEvents('afterSave');
	
		combo.on('select', function(cb, record, index) {
			tree.setRootNode(new Ext.tree.AsyncTreeNode({
				loader: new Ext.tree.TreeLoader({
					url : contextpath + '/tbp/sysmanager/areano.do?method=virtualMenus&virtualId=' + record.get('TYPEID')
				})
			}));
			
			selectedTree.setRootNode(new Ext.tree.AsyncTreeNode({
				loader: new Ext.tree.TreeLoader({
					url : contextpath + '/tbp/sysmanager/areano.do?method=virtualSelectedMenus&virtualId=' + record.get('TYPEID')
				})
			}));
			
			selectedValue = record.get('TYPEID');
		});
		
		
		tree.on('dblclick', function(node, e) {
			node.remove(true);
			selectedTree.getRootNode().appendChild({
				id: node.id,
				text: node.text,
				leaf: true
			});
		});
		
		selectedTree.on('dblclick', function(node, e) {
			node.remove(true);
			tree.getRootNode().appendChild({
				id: node.id,
				text: node.text,
				leaf: true
			});
		});
	}
	
	
});