Ext.D5000UserGrid = Ext.extend(Ext.grid.GridPanel, {
	
	title:'�û��б�',
	
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
			text: '�༭',
			tooltip: '˫��ĳ������Ҳ�ɱ༭',
			scope: this,
			handler: this.editUser
		}, '�û�������',{
			xtype: 'textfield',
			name: 'queryUserCNName',
			width: 150,
			iconCls : 'search'
		}, {
			iconCls: 'search',
			text: '��ѯ',
			scope: this,
			handler: this.queryUser
		}, {
			iconCls: 'delete2',
			text: '����',
			scope: this,
			handler: this.queryReset
		}, {
			iconCls: 'search',
			text: '��ʾȫ��',
			scope: this,
			handler: this.loadAllUsersByOrganId
		}];
		this.bbar = new Ext.PagingToolbar({
			store: this.store,
			displayInfo: true,
	        pageSize: 20,
	        prependButtons: true,
	        displayMsg: '��ҳ��ʾ��{0}������{1}����¼��һ��{2}����¼',
	        emptyMsg: 'û�м�¼',
	        beforePageText: '��ǰ��',
	        afterPageText: 'ҳ����{0}ҳ'
		});
		
		this.columns = [
		    new Ext.grid.RowNumberer({header: '���', width: 40}), //���������
		    {header:'�û���', width:150, dataIndex:'USERNAME', sortable: true},
		    {header:'�û�����', width:150, dataIndex:'USERALIAS', sortable: true},
		    {header:'��������', width:150, dataIndex:'DEPTNAME', sortable: true},
		    {header:'������λ', width:150, dataIndex:'UNITNAME', sortable: true},
		    {header:'�Ƿ����Ա', width:100, dataIndex:'ISADMIN', renderer: function(value) {
				if(value == 0) return '��';
				else if(value == 1) return '��';
				return value;
			}},
			{header:'�Ƿ�����', width:100, dataIndex:'ISENABLED', renderer: function(value) {
				if(value == 0) return '��';
				else if(value == 1) return '��';
				return value;
			}
			}];
		
		Ext.D5000UserGrid.superclass.initComponent.call(this);
		
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
		this.store.proxy = new Ext.data.HttpProxy({
			url:  contextpath + '/tbp/sysmanager/organ.do?method=selectUsers&listAll=false&organId=' + organId
		});
		this.store.load({params: {start: 0, limit: 20}});
	},
	
	loadAllUsersByOrganId: function() {
		var organId = this.organId;
		this.listAll = 'true';
		this.store.proxy = new Ext.data.HttpProxy({
			url: contextpath + '/tbp/sysmanager/organ.do?method=selectUsers&listAll=true&organId=' + organId
		});
		this.store.load({params: {start: 0, limit: 20}});
	},
	
	getUserTab: function() {
		if(! this.userTab) {
			this.userTab = new Ext.D5000UserTab({
				border: false
			});
		}
		return this.userTab;
	},
	
	getUserWindow: function() {
		if(!this.win) {
			this.win = new Ext.Window({
				title: '�û���Ϣ',
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
			Ext.MessageBox.alert('ϵͳ��Ϣ','��ѡ����Ҫ�༭���û���');
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
    	this.store.proxy = new Ext.data.HttpProxy({
    		url: contextpath + '/tbp/sysmanager/organ.do?method=selectUsers&listAll='+listAll+'&organId=' + organId,
    		method: 'POST'
    		
    	});
		this.store.load({params: {start: 0, limit: 20}});
    },
    
    queryReset: function() {
    	var tb = this.getTopToolbar();
    	var comps = tb.find('name', 'queryUserCNName');
    	if(comps && comps.length == 1) {
    		comps[0].setValue('');
    	}
    	var userCNName = comps[0].getValue();
    	this.store.on('beforeload', function (store, options) { 
			 store.baseParams = {
			 	'userCNName' : userCNName
			 };
		});
    }
	
});