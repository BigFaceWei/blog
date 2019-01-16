/**
 * 菜单管理-->授权Grid
 */
Ext.MenuGrid = function() {

	var _this = this;

	this.tbar = [{
		text : '保存修改',
		iconCls : 'save',
		handler : function() {
			_this.save(_this.selectModuleId, _this.selectRoleRecord,
					_this.selectRoleGrid, _this.selectUserGrid);
		}
	}];

	Ext.MenuGrid.superclass.constructor.call(this, {
		layout : 'border',
		region : 'center',
		border : false,
		items : [_this.getRoleGrid(), _this.getUserGrid()]
	});
};

Ext.extend(Ext.MenuGrid, Ext.Panel, {

	getRoleGrid : function() {
		if (!this.roleGrid) {
			var me = this;
			var roleGrid = this.roleGrid = new Ext.grid.DynamicEditorGrid({
				title : '用户组权限',
				region : 'center',
				/*bbar : new Ext.PagingToolbar({
					displayInfo : true,
					pageSize : 10,
					prependButtons : true,
					displayMsg : '本页显示第{0}条到第{1}条记录，一共{2}条记录',
					emptyMsg : '没有记录',
					beforePageText : '当前第',
					afterPageText : '页，共{0}页'
				}),*/
				storeUrl : contextPath
						+ '/tbp/sysmanager/menu.do?method=selectGrantUsergroups&isSuperAdmin='
						+ isSuperAdmin + '&areaNo=' + areaNo
			});

			var selectModuleId = '';
			var selectRoleRecord = '';
			var selectUserGrid = '';
			var selectRoleGrid = '';
			var flag;
			var save = this.save = function() {
				var flag = me.flag;
				var selectModuleId = me.selectModuleId;
				// user
				if (selectRoleRecord != '') {
					var roleGrants = [];
					var userGrants = [];
					var isEdit = false;
					// role
					var resourceRoleArr = [];
					if (selectRoleRecord.modified != null) {// modify role
						isEdit = true;
					}

					var cm = selectRoleGrid.getColumnModel();
					for (var i = 2; i < cm.getColumnCount(); i++) {
						var dataIndex = cm.getDataIndex(i);
						if (selectRoleRecord.get(dataIndex)) {
							resourceRoleArr.push({
								resourceId : cm.getColumnId(i)
							});
						}
					}
					if (resourceRoleArr != '') {
						roleGrants.push({
							roleId : selectRoleRecord.get('ROLEID'),
							resourceRoleArr : resourceRoleArr
						});
					}

					// user
					if (selectUserGrid != '') {
						var userStore = selectUserGrid.getStore();
						userStore.each(function(record) {
							var resourceUsrArr = [];
							var cm = selectUserGrid.getColumnModel();
							for (var j = 2; j < cm.getColumnCount(); j++) {
								var dataIndex = cm.getDataIndex(j);
								if (record.modified) {// modify user
									isEdit = true;
								}

								if (record.get(dataIndex)) {
									resourceUsrArr.push({
										resourceId : cm.getColumnId(j)
									});
								}
							}

							if (resourceUsrArr != '') {
								userGrants.push({
									userId : record.get('USERID'),
									resourceUsrArr : resourceUsrArr
								});
							}
						});
					}

					if (isEdit && flag) {
						var mask = new Ext.LoadMask(Ext.getBody(), {
									msg : "数据正在保存，请稍后..."
								});
						mask.show();
						var params = {
							roleId : selectRoleRecord.get('ROLEID'),
							menuId : selectModuleId,
							roleGrants : roleGrants,
							userGrants : userGrants
						};

						// save
						Ext.Ajax.request({
							url : contextPath
									+ '/tbp/sysmanager/menu.do?method=saveMenuGrant&gradeId='+me.gradeId+'&isSuperAdmin='
									+ isSuperAdmin + '&areaNo=' + areaNo + '',
							params : {
								menuInfo : Ext.encode(params)
							},
							success : function() {
								mask.hide();
							},
							failure : function() {
								mask.hide();
							}
						});
						
					}
				}
			};

			// 选中一个用户组触发加载用户表格
			roleGrid.getSelectionModel().on('cellselect', function(sm, rowIndex, colIndex) {
				// 选择前先保存.
				var selectModuleId = me.selectModuleId;
				me.flag = true;
				save(selectModuleId, selectRoleRecord, selectRoleGrid,
						selectUserGrid);

				var userGrid = me.getUserGrid();

				var record = roleGrid.getStore().getAt(rowIndex);
				selectRoleRecord = record;
				selectRoleGrid = roleGrid;
				var store = userGrid.getStore();

				var cm = roleGrid.getColumnModel();
				var resourceIds = [];
				for (var i = 2; i < cm.getColumnCount(); i++) {
					var dataIndex = cm.getDataIndex(i);
					if (record.get(dataIndex)) {
						resourceIds.push({
							resourceId : cm.getColumnId(i)
						});
					}
				}

				var params = {
					menuId : selectModuleId,
					roleId : record.get('ROLEID'),
					resourceIds : resourceIds
				};

				store.load({
					params : {
						menuInfo : Ext.encode(params)
					}
				});
				selectUserGrid = userGrid;
				roleGrid.selectedInfo = {
					row : rowIndex,
					col : colIndex
				};
			});

			roleGrid.on('afteredit', function(e) {
				var userGrid = me.getUserGrid();
				var rowIndex = e.row;
				var record = roleGrid.getStore().getAt(rowIndex);
				if (selectRoleRecord != record) {// 在同一角色编辑不保存.
					// 选择前先保存.
					me.flag = true;
					save(selectModuleId, selectRoleRecord, selectRoleGrid,
							selectUserGrid);

					selectRoleRecord = record;
					selectRoleGrid = roleGrid;
					var store = userGrid.getStore();

					var cm = roleGrid.getColumnModel();
					var resourceIds = [];
					for (var i = 2; i < cm.getColumnCount(); i++) {
						var dataIndex = cm.getDataIndex(i);
						if (record.get(dataIndex)) {
							resourceIds.push({
								resourceId : cm.getColumnId(i)
							});
						}
					}

					var params = {
						menuId : selectModuleId,
						roleId : record.get('ROLEID'),
						resourceIds : resourceIds
					};

					store.load({
						params : {
							menuInfo : Ext.encode(params)
						}
					});
					roleGrid.selectedInfo = {
						row : e.row,
						col : e.column
					};
				} else {
					var colIndex = e.column;
					var dataIndex = roleGrid.getColumnModel()
							.getDataIndex(colIndex);
					var userDataIndex = userGrid.getColumnModel()
							.getDataIndex(colIndex);
					if (colIndex > 1) {
						var store = userGrid.getStore();
						for (var i = 0, size = store.getCount(); i < size; i++) {
							var userRecord = store.getAt(i);
							userRecord.set(userDataIndex, record.get(dataIndex));
							userRecord.commit(true);
						}
					}
				}
			});
		}

		return this.roleGrid;
	},

	getUserGrid : function() {
		if (!this.userGrid) {
			var me = this;
			var userGrid = this.userGrid = new Ext.grid.DynamicEditorGrid({
				title : '用户权限',
				region : 'south',
				split : true,
				margin : '3 0 0 0',
				height : 250,
				/*bbar : new Ext.PagingToolbar({
					displayInfo : true,
					pageSize : 10,
					prependButtons : true,
					displayMsg : '本页显示第{0}条到第{1}条记录，一共{2}条记录',
					emptyMsg : '没有记录',
					beforePageText : '当前第',
					afterPageText : '页，共{0}页'
				}),*/
				storeUrl : contextPath
						+ '/tbp/sysmanager/menu.do?method=selectUsers&isSuperAdmin='
						+ isSuperAdmin + '&areaNo=' + areaNo
			});

			userGrid.on('afteredit', function(e) {
				var roleGrid = me.getRoleGrid();
				var colIndex = e.column;
				var dataIndex = userGrid.getColumnModel()
						.getDataIndex(colIndex);
				if (colIndex > 1 && roleGrid.selectedInfo) {
					var allTrue = true;
					var store = userGrid.getStore();
					for (var i = 0, size = store.getCount(); i < size; i++) {//勾选所有用户
						var record = store.getAt(i);
						var state = record.get(dataIndex);
						allTrue = allTrue && state;
					}

					if (allTrue) {
						var record = roleGrid.getStore().getAt(roleGrid.selectedInfo.row);
						record.set(dataIndex, true);
						record.commit(true);
					} else {
						var record = roleGrid.getStore().getAt(roleGrid.selectedInfo.row);
						record.set(dataIndex, false);
						record.commit(true);
					}

				}
				selectUserGrid = userGrid;
			});
		}
		return this.userGrid;
	},
	
	loadGrid : function(moduleId, gradeId) {
		var _this = this;
		if (this.selectModuleId == moduleId ) {
			_this.flag = true; 
		} else {
			_this.flag = true;
			_this.save(_this.selectModuleId, _this.selectRoleRecord,
					_this.selectRoleGrid, _this.selectUserGrid);
			_this.flag = false;
		}
		this.gradeId = gradeId;
		var roleGrid = this.getRoleGrid();
		var store = roleGrid.getStore();
		var params = {
			menuId : moduleId,
			start : 0,
			limit : 10
		};
		if (moduleId != '' && moduleId != undefined) {
			store.load({
				params : {
					menuInfo : Ext.encode(params)
				},
				callback : function() {
					if (store.getCount() > 0) {// select one
						roleGrid.getSelectionModel().select(0, 1);
						roleGrid.selectedInfo = {
							row : 0,
							col : 1
						};
					} else {
							_this.getUserGrid().getStore().removeAll();
						}
				}
			});
			this.selectModuleId = moduleId;
		}

	}

});