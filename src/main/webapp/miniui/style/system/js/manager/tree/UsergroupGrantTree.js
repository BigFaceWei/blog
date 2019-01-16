/**
 * 授权管理--用户组授权
 * @class Ext.UsergroupGrantTree
 * @extends Ext.tree.TreePanel
 */
Ext.UsergroupGrantTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	initComponent: function(organGrade) {
		var _this = this;
		
		this.tbar = ['用户组名：',{
			xtype: 'textfield',
			name: 'usergroupCnName',
			width: 130
		}, {
			iconCls: 'search',
			text: '查询',
			scope: this,
			handler: this.queryRole
		}];
		
		this.root = new Ext.tree.TreeNode({
			text: '所有用户组',
			expanded: true	
		});
		
		Ext.UsergroupGrantTree.superclass.initComponent.call(this);
		
	},
	
	loadUsergroupByGradeId: function(organGrade, usergroupCnName){
		this.organGrade = organGrade;
		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			//id: 'usergroupGrantTree',
			text: '所有用户组',
			expanded: true,
			loader: new Ext.tree.TreeLoader({
				url: contextpath + '/tbp/sysmanager/manager.do?method=buildTree&roleType=SYS',
				method: 'POST',
				baseParams: {roleCnName: usergroupCnName},
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
							loader.baseParams.nodeType = 'organgrade'; //根据机构级别过滤用户组
							loader.baseParams.organGrade = organGrade;
						}
					}
				}
			})
		}));
	},
	
	queryRole: function() {
    	var _this = this;
    	var usergroupCnName = Ext.get('usergroupCnName').getValue();
    	this.usergroupCnName = usergroupCnName;
    	_this.loadUsergroupByGradeId(_this.organGrade, usergroupCnName);
    }	
	
});

		