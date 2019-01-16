/**
 * 授权管理--用户组授权
 * @class Ext.RoleGrantTree
 * @extends Ext.tree.TreePanel
 */
Ext.RoleGrantTree = Ext.extend(Ext.tree.TreePanel, {
	
	animate: false,
	autoScroll: true,
	useArrows: true,
	rootVisible: true,
	
	initComponent: function() {
		var _this = this;
		
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
		
		this.root = new Ext.tree.TreeNode({
			text: '所有角色',
			expanded: true	
		});
		
		Ext.RoleGrantTree.superclass.initComponent.call(this);
		
	},
	
	loadUsergroupByGradeId: function(organGrade, roleCnName){
		this.organGrade = organGrade;
		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			//id: 'RoleGrantTree',
			text: '所有角色',
			expanded: true,
			loader: new Ext.tree.TreeLoader({
				url: contextpath + '/tbp/sysmanager/manager.do?method=buildTree&roleType=WKF',
				method: 'POST',
				baseParams: {roleCnName: roleCnName},
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
    	var roleCnName = Ext.get('roleCnName').getValue();
    	this.roleCnName = roleCnName;
    	_this.loadUsergroupByGradeId(_this.organGrade, roleCnName);
    }
	
});
