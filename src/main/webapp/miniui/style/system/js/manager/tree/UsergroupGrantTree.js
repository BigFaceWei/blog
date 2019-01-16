/**
 * ��Ȩ����--�û�����Ȩ
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
		
		this.tbar = ['�û�������',{
			xtype: 'textfield',
			name: 'usergroupCnName',
			width: 130
		}, {
			iconCls: 'search',
			text: '��ѯ',
			scope: this,
			handler: this.queryRole
		}];
		
		this.root = new Ext.tree.TreeNode({
			text: '�����û���',
			expanded: true	
		});
		
		Ext.UsergroupGrantTree.superclass.initComponent.call(this);
		
	},
	
	loadUsergroupByGradeId: function(organGrade, usergroupCnName){
		this.organGrade = organGrade;
		var _this = this;
		
		this.setRootNode(new Ext.tree.AsyncTreeNode({
			//id: 'usergroupGrantTree',
			text: '�����û���',
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
    	var usergroupCnName = Ext.get('usergroupCnName').getValue();
    	this.usergroupCnName = usergroupCnName;
    	_this.loadUsergroupByGradeId(_this.organGrade, usergroupCnName);
    }	
	
});

		