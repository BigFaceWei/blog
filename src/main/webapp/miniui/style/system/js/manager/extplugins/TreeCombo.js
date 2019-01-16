function removeValue(value, container) {
	if (value.length == 0)
		return '';

	// ȥ��ǰ�󶺺�
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
	// ��Ϊundefined�����ӳ�,,����Ҫ��,,����,
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

	// all:���н�㶼��ѡ��
	// exceptRoot��������㣬������㶼��ѡ��Ĭ�ϣ�
	// folder:ֻ��Ŀ¼����Ҷ�ӺͷǸ���㣩��ѡ
	// leaf��ֻ��Ҷ�ӽ���ѡ
	this.selectNodeModel = arguments[0].selectNodeModel || 'exceptRoot';
	/*
	 * single��ѡ ��Ĭ�ϣ� multiple ��ѡ��
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
				// this.setValue(this.getValue()+';'+node.text);// ����optionֵ
				display = this.getRawValue() + ";" + text;
				val = this.getValue() + ";" + node.id;
			}
		}
		// ѡ�����ڵ��Ĵ����¼�
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
        if (!this.list) { // �����ȳ�ʼ���б���һ��ʼ��������combotree��ֵʱ������Ҫ������������⻨�˰���ʱ��  
            this.initList();  
        }  
        // ����this.preventCollapse=true����ֹcombo����  
        var enableCollapse = function() {  
            this.preventCollapse = false;  
        };  
        // ����this.preventCollapse=false������combo����  
        var disableCollapse = function() {  
            this.preventCollapse = true;  
        };  
        this.tree = new Ext.tree.TreePanel({  
                    renderTo : this.treeId,  
                    useArrows : false,  
                    autoScroll : true,  
                    height : this.height, // �޸�IE��bug  
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
                            if (node == this.tree.root) { // ѡ�и��ڵ�  
                                if (!this.rootSelectable)  
                                    return;  
                            } else if (!node.isLeaf()) { // ѡ��Ŀ¼�ڵ�  
                                if (!this.folderSelectable)  
                                    return;  
                            } else { // ѡ��Ҷ�ӽڵ�  
                                if (!this.leafSelectable)  
                                    return;  
                            }  
                            // ��ѡ��ڵ㣬������value����getNodeValue������select�¼���ȡ����ȷ��ֵ  
                            node.select();  
                            this.setValue(node.id);  
                            enableCollapse();  
                        },  
                        // չ���������ڵ�ʱ��ֹcombo����  
                        beforeexpandnode : disableCollapse,  
                        beforecollapsenode : disableCollapse,  
                        beforeload : disableCollapse,  
                        // �ڵ���غ�չ��������combo����  
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
