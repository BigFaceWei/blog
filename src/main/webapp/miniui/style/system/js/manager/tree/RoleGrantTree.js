/**
 * ��Ȩ����--�û�����Ȩ
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
		
		this.tbar = ['��ɫ���ƣ�',{
			xtype: 'textfield',
			name: 'roleCnName',
			width: 130
		}, {
			iconCls: 'search',
			text: '��ѯ',
			scope: this,
			handler: this.queryRole
		}];
		
		this.root = new Ext.tree.TreeNode({
			text: '���н�ɫ',
			expanded: true	
		});
		
		Ext.RoleGrantTree.superclass.initComponent.call(this);
		
	},
	
	loadUsergroupByGradeId: function(organGrade, roleCnName){
		this.organGrade = organGrade;
		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			//id: 'RoleGrantTree',
			text: '���н�ɫ',
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
							loader.baseParams.nodeType = 'organgrade'; //���ݻ�����������û���
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
