Ext.UserGrid = Ext.extend(Ext.grid.GridPanel, {
	
	title:'用户列表',
	
	initComponent: function() {
	
		this.store = new Ext.data.Store({
			remoteSort: true,
			reader: new Ext.data.JsonReader({  
				root: 'rows',
				totalProperty: 'totalCount'
			}, ['USERID','USERNAME','USERALIAS','DEPTNAME','UNITNAME','ISADMIN','ISENABLED'])
		});
		
		
		this.tbar = [{
			iconCls: 'edit',
			text: '编辑',
			tooltip: '双击某行数据也可编辑',
			scope: this,
			handler: this.editUser
		}, '用户别名：',{
			xtype: 'textfield',
			name: 'queryUserCNName',
			width: 150,
			iconCls : 'search',
			handler: this.queryUser
		}, {
			iconCls: 'search',
			text: '查询',
			scope: this,
			handler: this.queryUser
		}, {
			iconCls: 'delete2',
			text: '重置',
			scope: this,
			handler: this.queryReset
		}, {
			iconCls: 'search',
			text: '显示全部',
			scope: this,
			handler: this.loadAllUsersByOrganId
		}];
		this.bbar = new Ext.PagingToolbar({
			store: this.store,
			displayInfo: true,
	        pageSize: 20,
	        prependButtons: true,
	        displayMsg: '本页显示第{0}条到第{1}条记录，一共{2}条记录',
	        emptyMsg: '没有记录',
	        beforePageText: '当前第',
	        afterPageText: '页，共{0}页'
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header: '序号', width: 40}), //序号生产器
		    {header:'用户名', width:150, dataIndex:'USERNAME', sortable: true},
		    {header:'用户别名', width:150, dataIndex:'USERALIAS', sortable: true},
		    {header:'所属部门', width:150, dataIndex:'DEPTNAME', sortable: true},
		    {header:'所属单位', width:150, dataIndex:'UNITNAME', sortable: true},
		    {header:'是否管理员', width:100, dataIndex:'ISADMIN', renderer: function(value) {
				if(value == 0) return '否';
				else if(value == 1) return '是';
				return value;
			}},
			{header:'是否启用', width:100, dataIndex:'ISENABLED', renderer: function(value) {
				if(value == 0) return '否';
				else if(value == 1) return '是';
				return value;
			}
			}];
		
		Ext.UserGrid.superclass.initComponent.call(this);
		
		this.on('dblclick', function() {
			var sm = this.getSelectionModel();
			var record = sm.getSelected();
			if(!record) return;
			
			this.editUser();
		}, this);
	},
	
	organId: undefined,
	listAll: undefined,
	
	loadUsersByOrganId: function(organId) {
		this.organId = organId;
		this.listAll = 'false';
		this.store.proxy = new Ext.data.HttpProxy({url: contextpath + '/tbp/sysmanager/organ.do?method=selectUsers&listAll=false&organId=' + organId});
		this.store.load({params: {start: 0,limit: 20}});
	},
	
	loadAllUsersByOrganId: function() {
		var organId = this.organId;
		this.listAll = 'true';
		this.store.proxy = new Ext.data.HttpProxy({url: contextpath + '/tbp/sysmanager/organ.do?method=selectUsers&listAll=true&organId=' + organId});
		this.store.load({params: {start: 0,limit: 20}});
	},
	
	getUserTab: function() {
		if(! this.userTab) {
			this.userTab = new Ext.UserTab({
				border: false
			});
		}
		return this.userTab;
	},
	
	getUserWindow: function() {
		if(!this.win) {
			this.win = new Ext.Window({
				title: '用户信息',
				width: 400,
				height: 290,
				closeAction: 'hide',
				plain: true,
				modal: true,
				layout: 'fit',
				items:this.getUserTab()
			});
		}
		return this.win;
	},
	
	editUser: function(){
		var sm = this.getSelectionModel();
		var record = sm.getSelected();
		if(!record) {
			Ext.MessageBox.alert('系统消息','请选择您要编辑的用户！');
			return;
		}
		
		var userId = record.get('USERID');
		
		var win = this.getUserWindow();
		
		this.getUserTab().init(userId);
		
		win.show();
    },
    
    queryUser: function() {
    	var _this = this;
    	var tb = this.getTopToolbar();
    	var comps = tb.find('name', 'queryUserCNName');
    	var userCNName = comps[0].getValue();
    	var organId = _this.organId;
    	var listAll = _this.listAll;
    	this.userCNName = userCNName;
    	this.store.on('beforeload', function (store, options) {  
			 store.baseParams = {
			 	'userCNName' : userCNName
			 };
		});
    	this.store.proxy = new Ext.data.HttpProxy({url: contextpath + '/tbp/sysmanager/organ.do?method=selectUsers&listAll='+listAll+'&organId=' + organId});
		this.store.load({params: {start: 0,limit: 20,userCNName: userCNName}});
    },
    
    queryReset: function() {
    	var tb = this.getTopToolbar();
    	var comps = tb.find('name', 'queryUserCNName');
    	if(comps && comps.length == 1) {
    		comps[0].setValue('');
    	}
    }
	
});