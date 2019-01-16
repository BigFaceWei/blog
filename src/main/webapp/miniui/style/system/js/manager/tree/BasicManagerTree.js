Ext.BasicManagerTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	/*listeners: {
        click: function(n) {
            if(n.id == 'areano') {
            	Ext.Msg.alert('�������');
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
			text: '����ά��',
			expanded : true,
			children: [{
	        	id: 'areano',
	            text: '�������',
	            leaf: true
	        }, {
	        	id: 'organgrade',
	            text: '��������',
	            leaf: true
	        }, /*{
	        	id: 'organkind',
	            text: '�������',
	            leaf: true
	        },  */{
	        	id: 'organtype',
	            text: '��������',
	            leaf: true
	        },{
	        	id: 'virtualnode',
	            text: '����ڵ�����',
	            leaf: true
	        }, {
	        	id: 'menucontrol',
	            text: '����ڵ�˵�����',
	            leaf: true
	        }]
		});
		
		this.loader = new Ext.tree.TreeLoader({
			
		});
		
		Ext.BasicManagerTree.superclass.initComponent.call(this);
	}
	
});