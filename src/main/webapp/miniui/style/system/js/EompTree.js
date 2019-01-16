Ext.ns('Ext.tellhow');
/***
 * Eomp�����ṩ���ĳ��ù���
 * ��ѡ����ѯ���ˡ������Ĳ˵�
 * �Ƿ������صȵȣ��������⣬
 * ��ʼ��ѡֵ�����ĸ��ڵ�Ϊ���ȵ�
 */
Ext.tellhow.EompTree = Ext.extend(Ext.tree.TreePanel, {
	/***
	 * ������
	 */
	treeType: 13
	
	/**
	 * �����ص�ַ
	 */
	,lazyUrl: ''
	/**
	 * ȫ�����ص�ַ
	 */
	,fullUrl: ''
	/**
	 *��ѯ��ַ����ѯ��ʱ���������� 
	 */
	,searchUrl: ''
	
	/**
	 * ���ڵ��Ƿ�ɼ�����������
	 */
	,rootVisible: false
	
	/**
	 * ��ʼ��ѡ�ڵ㣬ÿ��Ԫ�ض��ǽڵ��ID
	 */
	,checkedNodes : []
	/**
	 * ָ�����ĸ�ID��Ϊ���ڵ���ӽڵ�
	 * ���δ���ã������ظ��ڵ�Ϊ�յ������ӽڵ�
	 */
	,rootpid: ''
	/**
	 * ��ѯ��Ŀ��
	 */
	,queryWidth: 150
	/**
	 * ���ò�ѯ���Ƿ����
	 */
	,queryable: false
	/**
	 * �Ƿ���ʾ�����Ĳ˵�
	 */
	,showContext: true
	/**
	 * �Ƿ�������
	 */
	,lazy: true
	
	,useArrows : true
	
	,autoScroll : true 
	
	,animate : false
	
	,initComponent: function() {
		if(!this.root) {
			Ext.apply(this, {
				root: new Ext.tree.AsyncTreeNode({
					 text: 'root'
				})
			});
		}
		
		//��ѯ����
		if(this.queryable) {
			Ext.apply(this, {
				bbar: [{
					id: 'search',
					xtype: 'textfield',
					width: this.queryWidth,
					listeners: {
						scope: this,
						specialkey: function(self, e) {
							if(e.getCharCode() == 13)
								this.doSearch();
						}
					}
				},{
					xtype: 'button',
					iconCls: 'system_treeDemo_query',
					scope: this,
					handler: this.doSearch
				}]
			});
			this.searchLoader = new Ext.tree.TreeLoader({
				dataUrl : this.searchUrl
			});
			this.searchLoader.baseParams.treeType = this.treeType;
			this.searchLoader.baseParams.checkedNodes = Ext.util.JSON.encode(this.checkedNodes);
			this.searchLoader.baseParams.rootpid = this.rootpid;
		}
		//���ü�����
		if(!this.loader) {
			if(this.lazy) {
				this.loader = new Ext.tree.TreeLoader({
					dataUrl : this.lazyUrl,
					listeners:{
						beforeload:{
							scope:this
							,fn:function(loader, node) {
								loader.baseParams.treeType = this.treeType;
								loader.baseParams.checkedNodes = Ext.util.JSON.encode(this.checkedNodes);
								if(node != this.getRootNode())
									loader.baseParams.nodeid = node.id;
								else
									loader.baseParams.nodeid = this.rootpid;
							}
						}
					}
				});
			} else {
				this.loader = new Ext.tree.TreeLoader({
					dataUrl : this.fullUrl,
					listeners:{
						beforeload:{
							scope:this
							,fn:function(loader, node) {
								loader.baseParams.treeType = this.treeType;
								loader.baseParams.checkedNodes = Ext.util.JSON.encode(this.checkedNodes);
								loader.baseParams.nodeid = this.rootpid;
							}
						}
					}
				});
			}
		}
		
		//���ø����initComponent
		Ext.tellhow.EompTree.superclass.initComponent.call(this, arguments);
		
		//�����Ĳ˵���ʼ��
		if(this.showContext) {
			var menu = new Ext.menu.Menu({
			        items: [
			            {
	  		            cmd: 'reload',
	  		            iconCls: 'system_treeDemo_reload',
			                text: '���¼���'
			            }, '-' ,{
	  		            cmd: 'expand',
	  		            iconCls: 'system_treeDemo_expand',
			                text: 'ȫ��չ��'
			            },{
	  		            cmd: 'collapse',
	  		          	iconCls: 'system_treeDemo_collapse',
			                text: 'ȫ���۵�'
			            }
			        ]
			    });
			    menu.on({
	  		    click:{
	  		    	scope:this, fn:function(m, item, e) {
		  		    	var node = m.node;
		  				if(!node) {
		  					node = m.parentMenu.node;
		  				}
		  				switch(item.cmd) {
		  				case 'reload':
		  					node.reload();
		  					break;
		  				case 'expand':
		  					node.expand(true);
		  					break;
		  				case 'collapse':
		  					node.collapse(true);
		  					break;
		  				default:
		  					break;
		  				}
		  			}
		  		}
		  	});
			
			this.on({
				contextmenu: {
					scope:this, 
					fn: function(node, e) {
				 		menu.node = node;
				 		node.select();
				 		menu.showAt(e.getXY());
				 	}, 
				 	stopEvent:true
				}
			});
		}
	},
	render: function(container, position) {
		Ext.tellhow.EompTree.superclass.render.call(this, container, position);
		if(this.queryable) {
			this.searchLoader.on({
				 scope:this.el
				,beforeload:this.el.mask.createDelegate(this.el, ['���ݼ����У����Ժ�...', 'x-mask-loading'])
				,load:this.el.unmask
				,loadexception:this.el.unmask
			});
		}
	},
	afterRender: function() {
		if(!this.lazy) {
			this.loader.on({
				 scope:this.el
				,beforeload:this.el.mask.createDelegate(this.el, ['���ݼ����У����Ժ�...', 'x-mask-loading'])
				,load:this.el.unmask
				,loadexception:this.el.unmask
			});
		}
		Ext.tellhow.EompTree.superclass.afterRender.call(this);
	},
	getCheckNodes: function() {
		
		return this.checkedNodes;
	},
	removeChecked: function(obj) {
		Ext.each(this.checkedNodes, function(s) {
			if(s = obj.id) {
				this.checkedNodes.remove(s);
				return false;
			}
		}, this);
	},
	getSearchLoader: function() {
		return this.searchLoader;
	},
	doSearch: function(force) {
		this.syncChecked();
		var cond = Ext.getCmp('search').getValue();
		var root = this.getRootNode();
		root.removeAll(true);
		if(!force) force = false;
		
		if(cond == '' && !force) {
			this.loader.load(root, Ext.emptyFn, this);
		} else {
			this.searchLoader.baseParams.cond = cond;
			this.searchLoader.load(root, function(node){
				node.expand(true);
			}, this);
		}
	},
	syncChecked: function() {
		var nodes = this.getChecked();
		Ext.each(nodes, function(node) {
			var flag = true;
			for(var i=0; i<this.checkedNodes.length; i++) {
				if(this.checkedNodes[i] == node.id) {
					flag = false;
					break;
				}
			}
			if(flag) {
				this.checkedNodes.push(node.id);
			}
		}, this);
	}
});