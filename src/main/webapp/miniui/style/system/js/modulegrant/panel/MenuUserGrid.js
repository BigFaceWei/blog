/**
 * 菜单管理-->授权Grid
 */
Ext.MenuUserGrid = function() {

	var _this = this;

	this.tbar = [{
		text : '保存修改',
		iconCls : 'save',
		handler : function() {
			_this.save(_this.selectModuleId, _this.selectRoleRecord, _this.selectRoleGrid);
		}
	}];

	Ext.MenuUserGrid.superclass.constructor.call(this, {
		layout : 'border',
		region : 'center',
		border : false,
		items : [_this.getMenuUserGrid()]
	});
};

Ext.extend(Ext.MenuUserGrid, Ext.Panel, {

	getMenuUserGrid : function() {
		if (!this.menuUserGrid) {
			var me = this;
			var menuUserGrid = this.menuUserGrid = new Ext.grid.DynamicEditorGrid({
				title : '用户权限',
				region : 'center',
				split : true,
				margin : '3 0 0 0',
				height : 250,
				storeUrl : contextPath + '/tbp/sysmanager/menu.do?method=selectUserGrant&isSuperAdmin=' + isSuperAdmin + '&areaNo=' + areaNo
			});
			
			var selectModuleId = '';
			var selectUserRecord = '';
			var selectUserGrid = '';

			menuUserGrid.getSelectionModel().on('cellselect',
					function(sm, rowIndex, colIndex) {
				var selectModuleId = me.selectModuleId;
				
				save(selectModuleId, selectUserRecord, selectUserGrid);
				
				var record = menuUserGrid.getStore().getAt(rowIndex);
				
				selectUserRecord = record;
				selectUserGrid = menuUserGrid;
				
				var cm = menuUserGrid.getColumnModel();
				var dataIndex = cm.getDataIndex(colIndex);

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
					userId : record.get('USERID'),
					resourceIds : resourceIds
				};
				menuUserGrid.selectedInfo = {
					row : rowIndex,
					col : colIndex
				};
			});
			
			menuUserGrid.on('afteredit', function(e) {
				var rowIndex = e.row;
				var record = menuUserGrid.getStore().getAt(rowIndex);
				if (selectUserRecord != record) {// 在同一角色编辑不保存.
					// 选择前先保存.
					var selectModuleId = me.selectModuleId;
					selectUserRecord = record;
					selectUserGrid = menuUserGrid;
					save(selectModuleId, selectUserRecord, selectUserGrid);


					var cm = menuUserGrid.getColumnModel();
					var dataIndex = cm.getDataIndex(e.column);

					var resourceIds = [];
					for (var i = 2; i < cm.getColumnCount(); i++) {
						var dataIndex = cm.getDataIndex(i);
						if (record.get(dataIndex)) {
							resourceIds.push({
								resourceId : cm.getColumnId(i)
							});
						}
					}

					menuUserGrid.selectedInfo = {
						row : e.row,
						col : e.column
					};
				} else {
					var colIndex = e.column;
					var dataIndex = menuUserGrid.getColumnModel()
							.getDataIndex(colIndex);
				}
			});
			
			var save = this.save = function() {
				var selectModuleId = me.selectModuleId;
				var userGrants = [];
				var isEdit = false;
				if (selectUserGrid != '') {
					var resourceUsrArr = [];
					if (selectUserRecord.modified != null) {// modify role
						isEdit = true;
					}
					var cm = selectUserGrid.getColumnModel();
					for (var i = 2; i < cm.getColumnCount(); i++) {
						var dataIndex = cm.getDataIndex(i);
						if (selectUserRecord.get(dataIndex)) {
							resourceUsrArr.push({
								resourceId : cm.getColumnId(i)
							});
						}
					}

					if (resourceUsrArr != '') {
						userGrants.push({
							roleId : selectUserRecord.get('USERID'),
							resourceUsrArr : resourceUsrArr
						});
					}
				}

				if (isEdit) {
					var mask = new Ext.LoadMask(Ext.getBody(), {
								msg : "数据正在保存，请稍后..."
							});
					mask.show();
					var params = {
						userId : selectUserRecord.get('USERID'),
						menuId : selectModuleId,
						userGrants : userGrants
					};
					// save
					Ext.Ajax.request({
						url : contextPath
								+ '/tbp/sysmanager/menu.do?method=saveMenuUserGrant&isSuperAdmin='
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
			};
		}
		return this.menuUserGrid
	},

	loadGrid : function(moduleId) {
		this.selectModuleId = moduleId;
		var menuUserGrid = this.getMenuUserGrid();
		var store = menuUserGrid.getStore();
		var params = {
			menuId : moduleId
		};
		if (moduleId != '' && moduleId != undefined) {
			store.load({
				params : {
					menuInfo : Ext.encode(params)
				}
			});
		}

	}

});