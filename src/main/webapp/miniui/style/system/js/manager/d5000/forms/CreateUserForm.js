Ext.D5000CreateUserForm = Ext.extend(Ext.form.FormPanel, {
	
	title : '�û���Ϣ',
	labelWidth: 80,
	labelAlign: 'right',
	bodyStyle: 'padding: 10px 15px; overflow: auto;',
	autoScoll: true,
	enctype: 'multipart/form-data',
	fileUpload : true,

	
	initComponent: function() {
		
		var _this = this;
		
		var nationStore = new Ext.data.JsonStore({//����
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=nation'
		});
		nationStore.load();
		
		var provinceStore = new Ext.data.JsonStore({//����
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=province'
		});
		provinceStore.load();
		
		var degreeStore = new Ext.data.JsonStore({//ѧλ
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=degree'
		});
		degreeStore.load();	
		
		var educationStore = new Ext.data.JsonStore({//ѧ��
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=education'
		});
		educationStore.load();	
		
		var policitalStore = new Ext.data.JsonStore({//������ò
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=policital'
		});
		policitalStore.load();	
		
		var postStore = new Ext.data.JsonStore({//��λ
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=post'
		});
		postStore.load();	
		
		var skilllevelStore = new Ext.data.JsonStore({//���ܵȼ�
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=skilllevel'
		});
		skilllevelStore.load();	
		
		var jobStore = new Ext.data.JsonStore({//ְ��
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=job'
		});
		jobStore.load();
		
		var titleStore = new Ext.data.JsonStore({//ְ��
			fields: ['DIC_ID','DIC_NAME'],
			url: contextpath + '/tbp/sysmanager/areano.do?method=listDic&type=title'
		});
		titleStore.load();
		
		
		//����һ������
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
	       
		   root: new Ext.tree.AsyncTreeNode({text:'���������'})
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
	       
		   root: new Ext.tree.AsyncTreeNode({text:'���������'})
		});
		
		this.items = [{
			layout: 'column',
			width: 700,
			border: false,
			items: [{
				columnWidth: .5,
				border: false,
				layout: 'form',
				items: [{
					fieldLabel: '�û�ID',
					name: 'USERID',
					xtype: 'hidden'
				}, {
					fieldLabel: '��ԱID',
					name: 'EMPLOYEEID',
					xtype: 'hidden'
				}, {
					fieldLabel: '<font color="red">*</font>�û���',
					name: 'USERNAME',
					xtype:'textfield',
					allowBlank: false,
					width: 250,
					blankText: '�û�������Ϊ�գ�����д'
				}, {
					fieldLabel: '<font color="red">*</font>��        ��',
					name: 'PASSWORD',
					inputType : 'password',
					xtype:'textfield',
/*					regex: /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/,
					regexText: '����Ϊ8-15λ�����ֺ���ĸ���',*/
					id : 'pass1',
					allowBlank: false,
					width: 250,
					blankText: '���벻��Ϊ�գ�����д'
				}, {
					fieldLabel: '�������Ȼ���',
					name: 'UNITID',
					xtype: 'hidden',
					width: 250
				}, {
					fieldLabel: '�Ա�',
					xtype: 'radiogroup',
					columns: [100, 100],
			        vertical: true,
			        items: [
			            {boxLabel: '��', name: 'SEX', inputValue: 1, checked: true},
			            {boxLabel: 'Ů', name: 'SEX', inputValue: 0}
			        ],
					width: 250
				}, {
					fieldLabel: '����',
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
					fieldLabel: '������ò',
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
					fieldLabel: '��λ',
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
					fieldLabel: '���ܵȼ�',
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
					fieldLabel: '�μӹ���ʱ��',
					name: 'WORKTIME',
					xtype: 'datetime',
					format: 'Y-m-d',
					width: 250
				}, {
					fieldLabel: '��ʼѧλ',
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
					fieldLabel: '��ҵԺУ',
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
												'<span>ѡ��ѧУ</span>' +
											'</div>' +
											'<div id="choose-a-province">' +
											'</div>' +
											'<div id="choose-a-school">' +
											'</div>' +
											'<div id="choose-box-bottom">' +
												'<input type="botton" onclick="hide()" value="�ر�" />' +
											'</div>' +
		  								'</div>' +
	  								'</div>');
							tbp.insertAfter(this.el);
						}*/
				}, {
					fieldLabel: '���ѧλ',
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
					fieldLabel: '��ͥ��ϵ�绰',
					name: 'HOMEPHONE',
					xtype:'textfield',
					regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
					regexText: '��ʽ�Ƿ�����ʽ�磺18770011125��0791-88888888',
					width: 250
				}, {
					fieldLabel: '�ƶ��绰',
					name: 'MOBILEPHONE',
					xtype:'numberfield',
					regex: /^[1][3-8]\d{9}$/,
					regexText: '��ʽ�Ƿ�����ʽ�磺15879003936',
					width: 250
				}, {
					fieldLabel: '�ϴ���Ƭ',
		            xtype : 'textfield',
					name : 'PICTURE',
					inputType : 'file',
					emptyText: 'ѡ��һ����Ƭ',
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
							          //֧��FF
							          _this.getEl().select('IMG').last().dom.src = _this.find('name', 'PICTURE')[0].getEl().dom.files.item(0).getAsDataURL();
						         }
					        },this);
				         }
					}
				}, {
					fieldLabel: '�Ƿ����Ա',
					name: 'ISADMIN',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}, {
					fieldLabel: '�û�����',
					name: 'USERTYPE',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '�Ƿ�����',
					name: 'ISENABLED',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}, {
					fieldLabel: '�Ƿ��֤�ϸ���Ա',
					name: 'ISHOLDER',
					xtype:'checkbox',
					width: 250,
					inputValue: 1
				}]
			}, {
				columnWidth: .5,
				layout: 'form',
				border: false,
				items: [{
					fieldLabel: '����',
					name: 'USERALIAS',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '<font color="red">*</font>�ظ�����',
					name: 'REPASSWORD',
					inputType : 'password',
					xtype : 'textfield',
					id : 'pass2',
					allowBlank: false,
					vtype : 'password',
					width: 250,
					blankText: '���ٴ���������',
					vtypeText: '�������벻һ��',
					confirmTo: 'pass1'
				}, {
					fieldLabel: '�������Ȳ���',
					name: 'ORGANID',
					xtype: 'hidden',
					width: 250
				}, {
					fieldLabel: '��������',
					name: 'BIRTHDAY',
					xtype: 'datetime',
					format: 'Y-m-d',
					width: 250
				}, {
					fieldLabel: '����',
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
					fieldLabel: 'ְ��',
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
			        			//Ext.get('post').getCmp('combox_post').enable();
			        		}else{
			        			_this.getForm().findField("POST").reset();
			        			_this.getForm().findField("POST").disable();
//			        			Ext.getCmp('combox_post').reset();
//			        			Ext.getCmp('combox_post').disable();
			        		}    
			        	}
			        }
				}, {
					fieldLabel: 'ְ��',
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
					fieldLabel: '���֤��',
					name: 'IDNUMBER',
					xtype:'textfield',
					regex: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
					regexText: '��ʽ�Ƿ�����ʽ�磺360121198809225577',
					width: 250
				}, {
					fieldLabel: '��ʼѧ��',
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
					fieldLabel: '��ѧרҵ',
					name: 'MAJOR',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '���ѧ��',
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
					fieldLabel: '��ѧרҵ',
					name: 'HIGHESTMAJOR',
					xtype:'textfield',
					width: 250
				}, {
					fieldLabel: '�����绰',
					name: 'OFFICEPHONE',
					xtype:'textfield',
					regex: /(^[1][3-8]\d{9})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
					regexText: '��ʽ�Ƿ�����ʽ�磺18770011125��0791-88888888',
					width: 250
				}, {
					fieldLabel: '��������',
					name: 'EMAILADDRESS',
					xtype:'textfield',
					regex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
					regexText: '��ʽ�Ƿ�����ʽ�磺example123@163.com',
					width: 250
				}, {
					fieldLabel: '��Ƭ',
					xtype : 'box',
					//id: 'picView',
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
			text : '����',
			scope: this,
			handler: this.saveUser
		}];
		
		Ext.D5000CreateUserForm.superclass.initComponent.call(this);
	},
	
	loadUser: function(userId) {
		var _this = this;
		this.getForm().load({
			url: contextpath + '/tbp/sysmanager/user.do?method=get&userId=' + userId,
			method: 'GET',
			success: function(from, action){
				var _PICTURE_URL = contextpath + '/tbp/sysmanager/user.do?method=outFile&attachId='+action.result.data.ATTACHID;
				_this.getEl().select('IMG').last().dom.src = _PICTURE_URL;
			}
		});
		
	},
	
	saveUser: function() {
		var _this = this;
		var file_path = this.find('name', 'PICTURE')[0].getValue();
        var str = file_path.substr(file_path.lastIndexOf('.') + 1, file_path.length);
        if(file_path != '' && str != 'JPG' && str != 'jpg'){
            Ext.Msg.alert('����', "�ϴ���ͼ��ֻ����jpg��ʽ��"); 
            return false;
        }     
		if (this.getForm().isValid()) {
			this.getForm().submit({
				url: contextpath + '/tbp/sysmanager/user.do?method=upLoadFile',
				method: 'POST',
				success: function(form, action) {
					var image_url = contextpath + '/tbp/sysmanager/user.do?method=outFile&attachId=' + action.result.msg; 
					_this.getEl().select('IMG').last().dom.src = image_url;
					
					var userId = action.result.userId;
					if(userId == 'false') {
						Ext.Msg.alert('ϵͳ��ʾ','���û����Ѿ����ڣ�');
						return;
					}
					
	    			var tree = Ext.getCmp('navigation-tree');
	    			var sm = tree.getSelectionModel();
	            	var node = sm.getSelectedNode();
	            	
	            	var organNode = node;
	            	if(node.attributes.organtype && node.attributes.organtype == 110)
	            		organNode = node.parentNode;
	            	if (organNode.leaf) {
	            		organNode = node.parentNode;
	            	}	
	            	organNode.reload(function(n) {
	            		var allUserNode = n.findChild('organtype', 110);
	            		if (organNode.leaf) {
	            		    allUserNode = n.findChild('id', node.id);
	            		}
	            		if (allUserNode != null) {
			    			allUserNode.expand();
			    			var _selectedNode = allUserNode.findChild('id', userId);
			    			if(_selectedNode && _selectedNode != null) {
			    				_selectedNode.fireEvent('click', _selectedNode);
				    			tree.getLayoutTarget().scroll('b', 60);
			    			}
	            		} else {
	            			node.fireEvent('click', node);
	            			tree.getLayoutTarget().scroll('b', 60);
	            		}
	        		});
				},
				failure: function(form, action) {
					Ext.MessageBox.alert('ϵͳ��Ϣ','�û��༭ʧ�ܣ�');
				}
			});
		}
    },
    
    //��������
	pop: function(){
		//�����ھ���
		this.makeCenter();
 
		//��ʼ��ʡ���б�
		this.initProvince();
 
		//Ĭ�������, ����һ��ʡ�����choosen��ʽ
		$('[province-id="1"]').addClass('choosen');
 
		//��ʼ����ѧ�б�
		this.initSchool(1);
	},
	
	//���ش���
	hideWin: function(){
		$('#choose-box-wrapper').css("display","none");
	},
 
	initProvince: function ()
	{
		var _this = this;
		//ԭ�ȵ�ʡ���б����
		$('#choose-a-province').html('');
		for(i=0;i<schoolList.length;i++)
		{
			$('#choose-a-province').append('<a class="province-item" province-id="'+schoolList[i].id+'">'+schoolList[i].name+'</a>');
		}
		//���ʡ���б����click�¼�
		$('.province-item').bind('click', function(){
				var item=$(this);
				var province = item.attr('province-id');
				var choosenItem = item.parent().find('.choosen');
				if(choosenItem)
					$(choosenItem).removeClass('choosen');
				item.addClass('choosen');
				//���´�ѧ�б�
				_this.initSchool(province);
			}
		);
	},
 
	initSchool: function (provinceID)
	{
		var _this = this;
		//ԭ�ȵ�ѧУ�б����
		$('#choose-a-school').html('');
		var schools = schoolList[provinceID-1].school;
		for(i=0;i<schools.length;i++)
		{
			$('#choose-a-school').append('<a class="school-item" school-id="'+schools[i].id+'">'+schools[i].name+'</a>');
		}
		//��Ӵ�ѧ�б����click�¼�
		$('.school-item').bind('click', function(){
				var item=$(this);
				var school = item.attr('school-id');
				//����ѡ���ѧ�ı����е�ֵ
				//$('#school-name').val(item.text());
				$('input[name="GRADUATECOLLEGES"]').val(item.text());
				//�رյ���
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

Ext.apply(Ext.form.VTypes,{
	password: function(val, field){
		if(field.confirmTo){
			var pwd = Ext.get(field.confirmTo);
			return (val==pwd.getValue());
		}
		return true;
	}
});