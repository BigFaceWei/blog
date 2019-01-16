Ext.RoleManagerTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	initComponent: function() {
		var _this = this;
		
		this.root = new Ext.tree.AsyncTreeNode({
			text: '所有角色',
			expanded : true			
		});
		
		this.tbar = ['角色名称：',{
			xtype: 'textfield',
			name: 'roleCnName',
			width: 130
		}, {
			iconCls: 'search',
			text: '查询',
			scope: this,
			handler: this.queryRole
		}];
		
		this.loader = new Ext.tree.TreeLoader({
			url: contextpath + '/tbp/sysmanager/manager.do?method=buildTree&roleType=WKF&roleCnName=',
			listeners: {
				beforeload: function(loader, node) {
					if(node != _this.getRootNode()) {
						if (node.attributes.nodeflag == 'organgrade') {
							loader.baseParams.nodeType = 'profession';
							loader.baseParams.organGrade = node.id;
						} else if (node.attributes.nodeflag == 'profession') {
							loader.baseParams.nodeType = 'usergroup';
							loader.baseParams.professionId = node.id;
						}	
					} else {
						loader.baseParams.nodeType = 'organgrade';
					}
				}
			}
		});
		
		Ext.RoleManagerTree.superclass.initComponent.call(this);
		
	},
	
	loadUsergroupByGradeId: function(organGrade, roleCnName){
		this.organGrade = organGrade;
		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			text: '所有角色',
			expanded: true,
			loader: new Ext.tree.TreeLoader({
				url: contextpath + '/tbp/sysmanager/manager.do?method=buildTree&roleType=WKF&roleCnName=' + roleCnName,
				method: 'POST',
				listeners: {
					beforeload: function(loader, node) {
						if(node != _this.getRootNode()) {
							if (node.attributes.nodeflag == 'organgrade') {
								loader.baseParams.nodeType = 'profession';
								loader.baseParams.organGrade = node.id;
							} else if (node.attributes.nodeflag == 'profession') {
								loader.baseParams.nodeType = 'usergroup';
								loader.baseParams.professionId = node.id;
							}	
						} else {
							loader.baseParams.nodeType = 'organgrade';
						}
					}
				}
			})
		}));
	},
	
	queryRole: function() {
    	var _this = this;
    	var roleCnName = Ext.get('roleCnName').getValue();
    	this.roleCnName = roleCnName;
    	_this.loadUsergroupByGradeId(_this.organGrade, roleCnName);
    }
	
});

		