Ext.BasicManagerTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	/*listeners: {
        click: function(n) {
            if(n.id == 'areano') {
            	Ext.Msg.alert('区域编码');
			}
			if(n.id == 'organgrade') {
				Ext.Msg.alert('2');
			}
			if(n.id == 'organkind') {
			}
			if(n.id == 'profession') {
			}
			if(n.id == 'virtualnode') {
			}
        }
    },*/
    
	initComponent: function() {
		var _this = this;
		
		this.root = new Ext.tree.AsyncTreeNode({
			text: '基础维护',
			expanded : true,
			children: [{
	        	id: 'areano',
	            text: '区域编码',
	            leaf: true
	        }, {
	        	id: 'organgrade',
	            text: '机构级别',
	            leaf: true
	        }, /*{
	        	id: 'organkind',
	            text: '机构类别',
	            leaf: true
	        },  */{
	        	id: 'organtype',
	            text: '机构类型',
	            leaf: true
	        },{
	        	id: 'virtualnode',
	            text: '虚拟节点类型',
	            leaf: true
	        }, {
	        	id: 'menucontrol',
	            text: '虚拟节点菜单控制',
	            leaf: true
	        }]
		});
		
		this.loader = new Ext.tree.TreeLoader({
			
		});
		
		Ext.BasicManagerTree.superclass.initComponent.call(this);
	}
	
});