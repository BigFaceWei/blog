function removeValue(value, container) {
	if (value.length == 0)
		return '';

	// 去除前后逗号
	value = value.replace(/^;/, '').replace(/;$/, '');
	container = container.replace(/^;/, '').replace(/;$/, '');

	if (container == value) {
		return '';
	}

	var sArray = container.split(';');
	for (var i = sArray.length - 1; i >= 0; --i) {
		if (sArray[i] == value)
			sArray[i] = undefined;
	}

	var result = sArray.join(';');
	// 因为undefined会连接成,,所以要将,,换成,
	result = result.replace(/;;/, ';');
	result = result.replace(/^;/, '').replace(/;$/, '');

	return result;
}

Ext.ux.ComboBoxTree = function() {
	this.treeId = Ext.id() + '-tree';
	this.maxHeight = arguments[0].maxHeight || arguments[0].height
			|| this.maxHeight;
	this.tpl = new Ext.Template('<tpl for="."><div style="height:'
			+ this.maxHeight + 'px"><div id="' + this.treeId
			+ '"></div></div></tpl>');
	this.store = new Ext.data.SimpleStore({
		fields : [],
		data : [[]]
	});
	this.selectedClass = '';
	this.mode = 'local';
	this.triggerAction = 'all';
	this.onSelect = Ext.emptyFn;
	this.editable = false;

	// all:所有结点都可选中
	// exceptRoot：除根结点，其它结点都可选（默认）
	// folder:只有目录（非叶子和非根结点）可选
	// leaf：只有叶子结点可选
	this.selectNodeModel = arguments[0].selectNodeModel || 'exceptRoot';
	/*
	 * single单选 （默认） multiple 多选的
	 */
	this.selectModel = arguments[0].selectModel || 'single';

	this.addEvents('afterchange');

	Ext.ux.ComboBoxTree.superclass.constructor.apply(this, arguments);

}

Ext.extend(Ext.ux.ComboBoxTree, Ext.form.ComboBox, {

	expand : function() {
		Ext.ux.ComboBoxTree.superclass.expand.call(this);
		if (this.tree.rendered) {
			return;
		}

		Ext.apply(this.tree, {
			height : this.maxHeight,
			border : false,
			autoScroll : true
		});
		if (this.tree.xtype) {
			this.tree = Ext.ComponentMgr.create(this.tree, this.tree.xtype);
		}
		this.tree.render(this.treeId);

		var root = this.tree.getRootNode();
		if (!root.isLoaded())
			root.reload();

		this.tree.on('click', this.setSingleValue, this);
		this.tree.on('checkchange', this.setMultiValue, this);
	},
	setSingleValue : function(node) {
		//this.collapse();
		var selModel = this.selectNodeModel;
		var isLeaf = node.isLeaf();

		if ((node == this.root) && selModel != 'all') {
			return;
		} else if (selModel == 'folder' && isLeaf) {
			return;
		} else if (selModel == 'leaf' && !isLeaf) {
			return;
		}
		
		 var oldNode = this.getNode(); 
         if(this.fireEvent('beforeselect', this, node, oldNode) !== false) { 
                                 this.setValue(node.id); 
                                 this.collapse(); 
  
                                 this.fireEvent('select', this, node, oldNode); 
                 (oldNode !== node) ? this.fireEvent('afterchange', this, node, oldNode) : ''; 
         } 
		/*this.node = node;
		var text = node.text;
		this.lastSelectionText = text;
		if (this.hiddenField) {
			this.hiddenField.value = node.id;
		}
		Ext.form.ComboBox.superclass.setValue.call(this, id);
		this.setValue(node.id, text);
		this.value = node.id;*/

	},
	setMultiValue : function(node, check) {

		this.node = node;
		var text = node.text;
		this.lastSelectionText = text;
		var display = text;
		var val = node.id;

		if (!node.isLeaf()) {
			return;
		}
		if (!check) {
			display = removeValue(node.text, this.getRawValue());
			val = removeValue(node.id, this.getValue());
		} else {
			if (this.getValue() == '') {
				display = text;
				val = node.id;
			} else if (this.getRawValue().indexOf(node.text) > -1) {
				return;
			} else {
				// this.setValue(this.getValue()+';'+node.text);// 设置option值
				display = this.getRawValue() + ";" + text;
				val = this.getValue() + ";" + node.id;
			}
		}
		// 选中树节点后的触发事件
		// this.fireEvent('treeselected', node);

		Ext.form.ComboBox.superclass.setValue.call(this, display);
		if (this.hiddenField) {
			this.hiddenField.value = val;
		}
		this.value = val;
	},
	
	setValue : function(id) {

		/*this.lastSelectionText = text;
		if (this.hiddenField) {
			this.hiddenField.value = id;
		}
		Ext.form.ComboBox.superclass.setValue.call(this, text);
		this.value = id;*/
        /*try {
            if(!Ext.isEmpty(id)){
                var node; 
                if(this.tree.getNodeById){
                	node = this.tree.getNodeById(id); 
                } 
		        if (node) { 
	                 this.node = node; 
	                 var text = node.text; 
	                 this.lastSelectionText = text; 
	                 if (this.hiddenField) { 
	                     this.hiddenField.value = node.id; 
	                 } 
	                 Ext.form.ComboBox.superclass.setValue.call(this, node.id); 
	                 Ext.form.ComboBox.superclass.setRawValue.call(this, text); 
		         } else { 
	                 Ext.form.ComboBox.superclass.setValue.call(this, id); 
		         } 
                         
             } 
        } catch (e) { 
  
        } 
        this.value = id; */
		
		if(id == this.text) return;
		
		var me = this;
		Ext.Ajax.request({
			url: contextpath + '/tbp/sysmanager/station.do?method=getOrganNode&organId=' + id,
			success: function(response, opts) {
				if (me.hiddenField) { 
                	me.hiddenField.value = id; 
                }
				Ext.form.ComboBox.superclass.setValue.call(me, id); 
				Ext.form.ComboBox.superclass.setRawValue.call(me, response.responseText); 
	            me.value = id;
	            me.text = response.responseText;
			}
		});
         
	},
	getValue : function() {
		var me = this;
		if (me.hiddenField && me.hiddenField.value) { 
        	return me.hiddenField.value; 
        }
		
        if(this.value) return this.value;
        
        return '';
	},

	getNode : function() {
		return this.node;
	},

	clearValue : function() {
		Ext.ux.ComboBoxTree.superclass.clearValue.call(this);
		this.node = null;
	},

	// private
	destroy : function() {
		Ext.ux.ComboBoxTree.superclass.destroy.call(this);
		Ext.destroy([this.node, this.tree]);
		delete this.node;
	},
	
	 // private  
    /*initTree : function() {  
        if (!this.list) { // 必须先初始化列表，在一开始就设置了combotree的值时尤其重要，发现这个问题花了半天时间  
            this.initList();  
        }  
        // 设置this.preventCollapse=true，防止combo收缩  
        var enableCollapse = function() {  
            this.preventCollapse = false;  
        };  
        // 设置this.preventCollapse=false，允许combo收缩  
        var disableCollapse = function() {  
            this.preventCollapse = true;  
        };  
        this.tree = new Ext.tree.TreePanel({  
                    renderTo : this.treeId,  
                    useArrows : false,  
                    autoScroll : true,  
                    height : this.height, // 修复IE的bug  
                    animate : true,  
                    enableDD : false,  
                    containerScroll : true,  
                    border : false,  
                    dataUrl : this.dataUrl,  
                    loader : this.loader,  
                    root : this.root,  
                    rootVisible : this.rootVisible,  
                    listeners : {  
                        click : function(node) {  
                            disableCollapse();  
                            if (node == this.tree.root) { // 选中根节点  
                                if (!this.rootSelectable)  
                                    return;  
                            } else if (!node.isLeaf()) { // 选中目录节点  
                                if (!this.folderSelectable)  
                                    return;  
                            } else { // 选中叶子节点  
                                if (!this.leafSelectable)  
                                    return;  
                            }  
                            // 先选择节点，再设置value，让getNodeValue方法在select事件中取到正确的值  
                            node.select();  
                            this.setValue(node.id);  
                            enableCollapse();  
                        },  
                        // 展开和收缩节点时防止combo收缩  
                        beforeexpandnode : disableCollapse,  
                        beforecollapsenode : disableCollapse,  
                        beforeload : disableCollapse,  
                        // 节点加载和展开后允许combo收缩  
                        load : enableCollapse,  
                        expandnode : enableCollapse,  
                        scope : this  
                    }  
                });  
    },  */
	
	onViewClick : function(doFocus) {
		var index = this.view.getSelectedIndexes()[0], 
		s = this.store, r = s.getAt(index);
		if (r) {
			this.onSelect(r, index);
		} else if (s.getCount() === 0) {
			this.collapse();
		}
		if (doFocus !== false) {
			this.el.focus();
		}
	}

});

Ext.reg('treecombo', Ext.ux.ComboBoxTree);
