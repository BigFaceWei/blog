Ext.UserGroupGrid = Ext.extend(Ext.grid.GridPanel, {
	
	title:'用户组信息',
	
	initComponent: function() {
	
		this.store = new Ext.data.Store({
			url: contextpath +'/tbp/sysmanager/userGroup.do?method=listUserGroups',
			reader: new Ext.data.JsonReader({  
				root: 'rows',
				totalProperty: 'totalCount'
			}, ['ROLEID','ROLENAME','DESCRIPTION','ORGANNAME','SHARED'])
		});
	
		this.tbar = [{
			iconCls: 'add',
			text: '新增'
		}, {
			iconCls: 'edit',
			text: '编辑',
			scope: this,
			handler: this.editUsergroup
		}];
		this.bbar = new Ext.PagingToolbar({
			store: this.store,
			displayInfo: true,
	        pageSize: 2,
	        prependButtons: true
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header : '序号', width: 40}), 
		    {header:'用户组名', width:200, dataIndex:'ROLENAME'},
		    {header:'用户组描述', width:200, dataIndex:'DESCRIPTION'},
		    {header:'所属机构', width:200, dataIndex:'ORGANNAME'},
			{header:'是否共享', width:70, dataIndex:'SHARED', renderer: function(value) {
				if(value == 0) return '否';
				else if(value == 1) return '是';
				return value;
			}
		}];
		
		Ext.UserGroupGrid.superclass.initComponent.call(this);
	},
	
	listUserGroupsByOrganId: function(organId) {
		this.store.proxy = new Ext.data.HttpProxy({url: contextpath +'/tbp/sysmanager/userGroup.do?method=listUserGroups&organId=' + organId});
		this.store.load();
	},
	
	getUsergroupForm: function() {
		if(! this.groupform) {
			this.groupform =  new Ext.UsergroupForm({
				title: '',
				border: false
			});
		}
		return this.groupform;
	},
	
	getUserTree: function() {
		if(! this.userTree) {
			this.userTree = new Ext.UserTree({
				title: '',
				border: false
			});
		}
		return this.userTree;
	},
	
	getUsergroupTab: function() {
		if(! this.usergroupTab) {
			this.usergroupTab = new Ext.UsergroupTab({
				title: '',
				border: false
			});
		}
		return this.usergroupTab;
	},
	
	getUsergroupWindow: function() {
		if(!this.win) {
			this.win = new Ext.Window({
				title: '用户组信息',
				width: 600,
				height: 400,
				closeAction: 'hide',
				plain: true,
				layout: 'fit',
				items: /*[this.getUsergroupForm(),this.getUserTree()]*/this.getUsergroupTab()
			});
		}
		return this.win;
	},
	
	editUsergroup: function(){
		var sm = this.getSelectionModel();
		var record = sm.getSelected();
		if(!record) {
			alert('请选择您要编辑的用户组！');
			return;
		}
		
		var roleId = record.get('ROLEID');
		
		var win = this.getUsergroupWindow();
//		this.getUsergroupForm().loadUsergroup(roleId);
//		this.getUserTree().loadUserTree(roleId);
		this.getUsergroupTab().init(roleId);
		win.show();
		/*var _this = this;
		Ext.Ajax.request({
    		url: '/test/services/role/usergroup/' + '0352f497-d414-4bb1-b973-a1995798615b',
    		method: 'GET',
    		success: function() {
    			_this.getUserGroupWindow().show();
    		},
    		failure: function() {}
    	});*/
    }
});