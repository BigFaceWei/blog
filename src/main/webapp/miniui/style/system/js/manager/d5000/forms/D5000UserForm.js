Ext.D5000UserForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '用户信息',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px; overflow: auto',
	autoScoll: true,
	enctype: 'multipart/form-data',
	fileUpload : true,
	
	initComponent: function() {
		
		var _this = this;
		
		var nationStore = new Ext.data.JsonStore({//民族
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=nation'
		});
		nationStore.load();
		
		var provinceStore = new Ext.data.JsonStore({//籍贯
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=province'
		});
		provinceStore.load();
		
		var degreeStore = new Ext.data.JsonStore({//学位
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=degree'
		});
		degreeStore.load();	
		
		var educationStore = new Ext.data.JsonStore({//学历
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=education'
		});
		educationStore.load();	
		
		var policitalStore = new Ext.data.JsonStore({//政治面貌
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=policital'
		});
		policitalStore.load();	
		
		var postStore = new Ext.data.JsonStore({//岗位
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=post'
		});
		postStore.load();	
		
		var skilllevelStore = new Ext.data.JsonStore({//技能等级
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=skilllevel'
		});
		skilllevelStore.load();	
		
		var jobStore = new Ext.data.JsonStore({//职务
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=job'
		});
		jobStore.load();
		
		var titleStore = new Ext.data.JsonStore({//职称
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=title'
		});
		titleStore.load();
		
		
		//定义一个树形
		var dispatchOrganTree = new Ext.tree.TreePanel({ 
		   rootVisible: false, 
		   autoScroll: true,
		   autoHeight: true,
		   loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/organ.do?method=getOrganTree&organType=unit',
				listeners: {
					beforeload: function(loader, node) {
						if(node != dispatchOrganTree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
	       }),
	       
		   root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		var dispatchDeptTree = new Ext.tree.TreePanel({ 
		   rootVisible: false, 
		   autoScroll: true,
		   autoHeight: true,
		   loader: new Ext.tree.TreeLoader({
				url : contextpath + '/tbp/sysmanager/organ.do?method=getOrganTree&organType=dept',
				listeners: {
					beforeload: function(loader, node) {
						if(node != dispatchDeptTree.getRootNode()) {
							loader.baseParams.nodeId = node.id;
						} else {
							loader.baseParams.rootId = unitId;
						}
					}
				}
	       }),
	       
		   root: new Ext.tree.AsyncTreeNode({text:'机构根结点'})
		});
		
		this.items = [{
			layout: 'column',
			width: 700,
			border: false,
			items: [{
				columnWidth: .5,
				border: false,
				layout: 'form',
				autoHeight : true,
				autoScorll : true,
				items: [{
					fieldLabel: '用户ID',
					name: 'USERID',
					xtype: 'hidden'
				}, {
					fieldLabel: '人员ID',
					name: 'EMPLOYEEID',
					xtype: 'hidden'
				}, {
					fieldLabel: '<font color="red">*</font>用户名',
					name: 'USERNAME',
					xtype:'textfield',
					allowBlank: false,
					width: 250,
					blankText: '用户名不能为空，请填写'
				}, {
					fieldLabel: '所属调度机构',
					hiddenName: 'UNITID',
					xtype: 'treecombo',
					tree: dispatchOrganTree,
					selectNodeModel:'all', 
					width: 250/*,
					listeners: {
						select: function(combo, record,index) {
							var unitId = combo.getValue(); 
							//ORGANID.clearValue(); //可以实现当前下拉值变更时，清空之前下拉选项中的值
//							dispatchDeptTree.getLoader().baseParams = {rootId: unitId};
	        				//dispatchDeptTree.getRootNode().reload();
						}
					}*/
				}, {
					fieldLabel: '性别',
					xtype: 'radiogroup',
					columns: [100, 100],
			        vertical: true,
			        items: [
			            {boxLabel: '男', name: 'SEX', inputValue: 1, checked: true},
			            {boxLabel: '女', name: 'SEX', inputValue: 0}
			        ],
					width: 250
				}, {
					fieldLabel: '民族',
					hiddenName: 'NATIONALITY',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: nationStore,
					width: 250
				}, {
					fieldLabel: '政治面貌',
					hiddenName: 'POLICITALSTATUS',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: policitalStore,
					width: 250
				}, {
					fieldLabel: '岗位',
					hiddenName: 'POST',
					xtype: 'combo',
					//id: 'combox_post',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: postStore,
					width: 250
				}, {
					fieldLabel: '技能等级',
					hiddenName: 'SKILLLEVEL',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: skilllevelStore,
					width: 250
				}, {
					fieldLabel: '参加工作时间',
					name: 'WORKTIME',
					xtype: 'datetime',
					format: 'Y-m-d',
					width: 250
				}, {
					fieldLabel: '初始学位',
					hiddenName: 'DEGREE',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: degreeStore,
					width: 250
				}, {
					//id: 'school-name',
					fieldLabel: '毕业院校',
					name: 'GRADUATECOLLEGES',
					xtype: 'trigger',
        	        triggerClass : 'x-form-search-trigger', 
					width: 250,
					onTriggerClick: function(field) {
						_this.pop();
					}/*,
						afterrender: function() {
							var tbp = new Ext.XTemplate('' +
									'<div id="choose-box-wrapper">' +
										'<div id="choose-box">' +
											'<div id="choose-box-title">' +
												'<span>选择学校</span>' +
											'</div>' +
											'<div id="choose-a-province">' +
											'</div>' +
											'<div id="choose-a-school">' +
											'</div>' +
											'<div id="choose-box-bottom">' +
												'<input type="botton" onclick="hide()" value="关闭" />' +
											'</div>' +
		  								'</div>' +
	  								'</div>');
							tbp.insertAfter(this.el);
						}*/
				}, {
					fieldLabel: '最高学位',
					hiddenName: 'HIGHESTDEGREE',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: degreeStore,
					width: 250
				}, {
					fieldLabel: '家庭联系电话',
					name: 'HOMEPHONE',
					xtype:'textfield',
					regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
					regexText: '格式非法，格式如：18770011125或0791-88888888',
					width: 250
				}, {
					fieldLabel: '移动电话',
					name: 'MOBILEPHONE',
					xtype:'numberfield',
					regex: /^[1][3-8]\d{9}$/,
					regexText: '格式非法，格式如：15879003936',
					width: 250
				}, {
					fieldLabel: '上传照片',
		            xtype : 'textfield',
					name : 'PICTURE',
					inputType : 'file',
		            emptyText: '选择一张照片',
					width : 250,
					listeners : {
						'render': function(){
							var pictureCmp = _this.find('name', 'PICTURE')[0].getEl();
							pictureCmp.on('change',function(field,newValue,oldValue){
						         var picPath = pictureCmp.getValue();
						         var url = 'file:///' + picPath;
						         if(Ext.isIE){
				                      var image = _this.getEl().select('IMG').last().dom;  
							          image.src = Ext.BLANK_IMAGE_URL;
							          image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url; 
						         }else{
							          //支持FF
							          _this.getEl().select('IMG').last().dom.src = _this.find('name', 'PICTURE')[0].getEl().dom.files.item(0).getAsDataURL();
						         }
					        },this);
				         }
					}
				}, {
					fieldLabel: '是否管理员',
					name: 'ISADMIN',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}, {
					fieldLabel: '用户类型',
					name: 'USERTYPE',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '是否启用',
					name: 'ISENABLED',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}, {
					fieldLabel: '是否持证上岗人员',
					name: 'ISHOLDER',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}]
			}, {
				columnWidth: .5,
				layout: 'form',
				border: false,
				autoHeight : true,
				autoScorll : true,
				items: [{
					fieldLabel: '姓名',
					name: 'USERALIAS',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '所属调度部门',
					hiddenName: 'ORGANID',
					xtype: 'treecombo',
					tree: dispatchDeptTree,
					selectNodeModel:'all', 
					width: 250
				}, {
					fieldLabel: '出生年月',
					name: 'BIRTHDAY',
					xtype: 'datetime',
					format: 'Y-m-d',
					width: 250
				}, {
					fieldLabel: '籍贯',
					hiddenName: 'NATIVEPLACE',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: provinceStore,
					width: 250
				}, {
					fieldLabel: '职务',
					hiddenName: 'JOB',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: jobStore,
					width: 250,
					listeners:{
			        	change: function(c,r,i){
			        		if(r == 9){
			        			_this.getForm().findField("POST").enable();
			        		}else{
			        			_this.getForm().findField("POST").reset();
			        			_this.getForm().findField("POST").disable();
			        		}    
			        	}
			        }
				}, {
					fieldLabel: '职称',
					hiddenName: 'TITLE',
					xtype: 'combo',
					typeAhead: true,
			        typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: titleStore,
					width: 250
				}, {
					fieldLabel: '身份证号',
					name: 'IDNUMBER',
					xtype:'textfield',
					regex: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
					regexText: '格式非法，格式如：360121198809225577',
					width: 250
				}, {
					fieldLabel: '初始学历',
					hiddenName: 'EDUCATION',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: educationStore,
					width: 250
				}, {
					fieldLabel: '所学专业',
					name: 'MAJOR',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '最高学历',
					hiddenName: 'HIGHESTEDUCATION',
					xtype: 'combo',
					typeAhead: true,
					valueField :"DIC_ID",  
			        displayField: "DIC_NAME",
			        triggerAction: 'all',
			        forceSelection: true,
			        store: educationStore,
					width: 250
				}, {
					fieldLabel: '所学专业',
					name: 'HIGHESTMAJOR',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '工作电话',
					name: 'OFFICEPHONE',
					xtype:'textfield',
					regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
					regexText: '格式非法，格式如：18770011125或0791-88888888',
					width: 250
				}, {
					fieldLabel: '电子邮箱',
					name: 'EMAILADDRESS',
					xtype:'textfield',
					regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
					regexText: '格式非法，格式如：example123@163.com',
					width: 250
				}, {
					fieldLabel: '照片',
					xtype : 'box',
					width : 125,
					height : 150,
					autoEl : {
					    tag : 'img',
					    name: 'picView',
					    src : Ext.BLANK_IMAGE_URL,  
					    style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);'
					}
				}]
			}]		
		}];
		
		this.tbar = [{
			iconCls: 'update',
			text : '保存',
			scope: this,
			handler: this.saveUser
		}, {
			iconCls: 'delete',
			text : '删除',
			scope: this,
			handler: this.deleteUser
		}];
		
		Ext.D5000UserForm.superclass.initComponent.call(this);
	},
	
	loadUser: function(userId) {
		var _this = this;
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/user.do?method=get&userId=' + userId,
			method: 'GET',
			success: function(from, action){
				var _PICTURE_URL = contextpath + '/tbp/sysmanager/user.do?method=outFile&attachId='+action.result.data.ATTACHID;
				_this.getEl().select('IMG').last().dom.src = _PICTURE_URL;
				//Ext.getCmp("picView").getEl().dom.src = _PICTURE_URL;
			}
		});
		
	},
	
	saveUser: function() {
		var _this = this;
		var file_path = this.find('name', 'PICTURE')[0].getValue();
        var str = file_path.substr(file_path.lastIndexOf('.') + 1, file_path.length);
        if(file_path != '' && str != 'JPG' && str != 'jpg'){
            Ext.Msg.alert('错误', "上传的图像只能是jpg格式！"); 
            return false;
        }     
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: contextpath + '/tbp/sysmanager/user.do?method=upLoadFile',
				method: 'POST',
				success: function(form, action) {
					var image_url = contextpath + '/tbp/sysmanager/user.do?method=outFile&attachId=' + action.result.msg; 
					_this.getEl().select('IMG').last().dom.src = image_url;
					var tree = Ext.getCmp('navigation-tree');
	    			var sm = tree.getSelectionModel();
	            	var node = sm.getSelectedNode();
					var pNode110 = node.parentNode;
					pNode110.parentNode.reload(function(n) {
	            		var allUserNode = n.findChild('organtype', 110);
	            		allUserNode.expand();
	            		var fNode = allUserNode.findChild('id', node.id);
	        			if(fNode) {
	        				fNode.fireEvent('click', fNode);
	        			}
	            		tree.getLayoutTarget().scroll('b', 60);
	        		});
				},
				failure: function(form, action) {
					Ext.MessageBox.alert('系统消息','用户编辑失败！');
				}
			});
			/*Ext.Ajax.request({
				url: contextpath + '/tbp/sysmanager/user.do?method=save',
				params: {userInfo: Ext.encode(this.getForm().getValues())},
				success: function (response, opts) {
					var tree = Ext.getCmp('navigation-tree');
	    			var sm = tree.getSelectionModel();
	            	var node = sm.getSelectedNode();
					
					var pNode110 = node.parentNode;
	            	
					pNode110.parentNode.reload(function(n) {
	            		var allUserNode = n.findChild('organtype', 110);
	            		allUserNode.expand();
	            		
	            		var fNode = allUserNode.findChild('id', node.id);
	        			if(fNode) {
	        				fNode.fireEvent('click', fNode);
	        			}
	            		
	            		tree.getLayoutTarget().scroll('b', 60);
	        		});
					
					
	    		},
	    		failure: function() {
	        		Ext.MessageBox.alert('系统消息','用户编辑失败！');
	        	}
			});*/
		}
    },
    
    deleteUser: function() {
    	var _this = this;
    	var user = this.getForm().getValues();
    	
    	if(!user.USERID || user.USERID == '') return;
    	
    	Ext.Msg.show({
    		title: '系统消息',
    		msg: '您确定要删除该用户吗？',
    		buttons: Ext.Msg.OKCANCEL,
    		fn: function(buttonId){
    			if (buttonId == 'ok'){
    				Ext.Ajax.request({
    					url: contextpath + '/tbp/sysmanager/user.do?method=delete&employeeId='+user.EMPLOYEEID+'&userId=' + user.USERID,
    					success: function (response, opts) {
    		    			var tree = Ext.getCmp('navigation-tree');
    		    			var sm = tree.getSelectionModel();
    		            	var node = sm.getSelectedNode();
    		            	
    		            	
    		            	node.parentNode.parentNode.reload(function(n) {
    		            		var allUserNode = n.findChild('organtype', 110);
    		            		if(allUserNode)
    		            			allUserNode.expand();
    		            	});
    		            	
    		            	_this.getForm().reset();
    		    		},
    		    		failure: function() {
    		    			Ext.MessageBox.alert('系统消息','与服务器交互失败！');
    		        	}
    				});
    			}
    		},
    		icon: Ext.MessageBox.QUESTION
    			
    	});
    },
    
    //弹出窗口
	pop: function(){
		//将窗口居中
		this.makeCenter();
 
		//初始化省份列表
		this.initProvince();
 
		//默认情况下, 给第一个省份添加choosen样式
		$('[province-id="1"]').addClass('choosen');
 
		//初始化大学列表
		this.initSchool(1);
	},
	
	//隐藏窗口
	hideWin: function(){
		$('#choose-box-wrapper').css("display","none");
	},
 
	initProvince: function ()
	{
		var _this = this;
		//原先的省份列表清空
		$('#choose-a-province').html('');
		for(i=0;i<schoolList.length;i++)
		{
			$('#choose-a-province').append('<a class="province-item" province-id="'+schoolList[i].id+'">'+schoolList[i].name+'</a>');
		}
		//添加省份列表项的click事件
		$('.province-item').bind('click', function(){
				var item=$(this);
				var province = item.attr('province-id');
				var choosenItem = item.parent().find('.choosen');
				if(choosenItem)
					$(choosenItem).removeClass('choosen');
				item.addClass('choosen');
				//更新大学列表
				_this.initSchool(province);
			}
		);
	},
 
	initSchool: function (provinceID)
	{
		var _this = this;
		//原先的学校列表清空
		$('#choose-a-school').html('');
		var schools = schoolList[provinceID-1].school;
		for(i=0;i<schools.length;i++)
		{
			$('#choose-a-school').append('<a class="school-item" school-id="'+schools[i].id+'">'+schools[i].name+'</a>');
		}
		//添加大学列表项的click事件
		$('.school-item').bind('click', function(){
				var item=$(this);
				var school = item.attr('school-id');
				//更新选择大学文本框中的值
				//$('#school-name').val(item.text());
				$('input[name="GRADUATECOLLEGES"]').val(item.text());
				//关闭弹窗
				_this.hideWin();
			}
		);
	},
 
	makeCenter: function ()
	{
		$('#choose-box-wrapper').css("display","block");
		$('#choose-box-wrapper').css("position","absolute");
		$('#choose-box-wrapper').css("top", Math.max(0, (($(window).height() - $('#choose-box-wrapper').outerHeight()) / 2) + $(window).scrollTop()) + "px");
		$('#choose-box-wrapper').css("left", Math.max(0, (($(window).width() - $('#choose-box-wrapper').outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		//$("#choose-box-wrapper").show();
	}

});