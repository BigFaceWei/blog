Ext.ns('Ext.tellhow');
/***
 * Eomp树，提供树的常用功能
 * 复选、查询过滤、上下文菜单
 * 是否懒加载等等，除此以外，
 * 初始复选值、以哪个节点为根等等
 */
Ext.tellhow.EompTree = Ext.extend(Ext.tree.TreePanel, {
	/***
	 * 树类型
	 */
	treeType: 13
	
	/**
	 * 懒加载地址
	 */
	,lazyUrl: ''
	/**
	 * 全部加载地址
	 */
	,fullUrl: ''
	/**
	 *查询地址，查询的时候不是懒加载 
	 */
	,searchUrl: ''
	
	/**
	 * 根节点是否可见，常见属性
	 */
	,rootVisible: false
	
	/**
	 * 初始复选节点，每个元素都是节点的ID
	 */
	,checkedNodes : []
	/**
	 * 指定以哪个ID作为根节点的子节点
	 * 如果未设置，将加载父节点为空的所有子节点
	 */
	,rootpid: ''
	/**
	 * 查询框的宽度
	 */
	,queryWidth: 150
	/**
	 * 设置查询框是否可用
	 */
	,queryable: false
	/**
	 * 是否显示上下文菜单
	 */
	,showContext: true
	/**
	 * 是否懒加载
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
		
		//查询设置
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
		//设置加载器
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
		
		//调用父类的initComponent
		Ext.tellhow.EompTree.superclass.initComponent.call(this, arguments);
		
		//上下文菜单初始化
		if(this.showContext) {
			var menu = new Ext.menu.Menu({
			        items: [
			            {
	  		            cmd: 'reload',
	  		            iconCls: 'system_treeDemo_reload',
			                text: '重新加载'
			            }, '-' ,{
	  		            cmd: 'expand',
	  		            iconCls: 'system_treeDemo_expand',
			                text: '全部展开'
			            },{
	  		            cmd: 'collapse',
	  		          	iconCls: 'system_treeDemo_collapse',
			                text: '全部折叠'
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
				,beforeload:this.el.mask.createDelegate(this.el, ['数据加载中，请稍后...', 'x-mask-loading'])
				,load:this.el.unmask
				,loadexception:this.el.unmask
			});
		}
	},
	afterRender: function() {
		if(!this.lazy) {
			this.loader.on({
				 scope:this.el
				,beforeload:this.el.mask.createDelegate(this.el, ['数据加载中，请稍后...', 'x-mask-loading'])
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