

Ext.override(Ext.tree.TreeNodeUI, {
	renderElements : function(n, a, targetNode, bulkRender){
	    // add some indent caching, this helps performance when rendering a large tree
	    this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
	
	    var cb = Ext.isBoolean(a.checked),
	        nel,
	        href = this.getHref(a.href),
	        buf = ['<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls,'" unselectable="on">',
	        '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
	        '<img alt="" src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />',
	        '<img alt="" src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on" />',
	        cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : '/>')) : '',
	        '<a hidefocus="on" class="x-tree-node-anchor" href="',href,'" tabIndex="1" ',
	         a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '><span unselectable="on">',n.text,"</span></a></div>",
	        '<ul class="x-tree-node-ct" style="display:none;"></ul>',
	        "</li>"].join('');
	
	    if(bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())){
	        this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
	    }else{
	        this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
	    }
	
	    this.elNode = this.wrap.childNodes[0];
	    this.ctNode = this.wrap.childNodes[1];
	    var cs = this.elNode.childNodes;
	    this.indentNode = cs[0];
	    this.ecNode = cs[1];
	    this.iconNode = cs[2];
	    var index = 3;
	    if(cb){
	        this.checkbox = cs[3];
	        // fix for IE6
	        this.checkbox.defaultChecked = this.checkbox.checked;
	        
	        //(a.indeterminate ? 'indeterminate=true ' : '')
	        this.checkbox.indeterminate = a.indeterminate;
	        ///----------------------------------
	        
	        index++;
	    }
	    this.anchor = cs[index];
	    this.textNode = cs[index].firstChild;
	},
	
	//双击勾选子节点去掉
	onDblClick : function(e){
        e.preventDefault();
        if(this.disabled){
            return;
        }
        if(this.fireEvent("beforedblclick", this.node, e) !== false){
        	if(!this.animating && this.node.isExpandable()){
                this.node.toggle();
            }
            this.fireEvent("dblclick", this.node, e);
        }
    }
});


/***
 * 
 * 三态树插件
 * @author Administrator
 * @time 2013-03-15
 * 
 */
Ext.TreePanelCheck = Ext.extend(Ext.tree.TreePanel,{
	
 	init : function(treePanel){
 		var rootNode = treePanel.getRootNode();
 		
 		//treePanel.on('expandnode',this.doLazyCheck, rootNode);
 		treePanel.on('checkchange',this.handlerCheck, this);
 		treePanel.on('load', this.loadNode, this);
 		
 		this.tree = treePanel;
 	},
 	
 	//检查子结点选中的情况
 	doChildHasChecked : function(node){
 		var childNodes = node.childNodes;
		var checkedNum = 0;
		if(childNodes || childNodes.length>0){
			for(var i=0;i<childNodes.length;i++){
				if(childNodes[i].getUI().checkbox.checked){
    				checkedNum = checkedNum + 1;
				}
			}
		}
		return checkedNum;
 	},
 	
 	//父节点选中
 	doParentCheck : function(node ,checked){
 		var checkbox = node.getUI().checkbox;
		if(typeof checkbox == 'undefined') return false;
		node.getUI().checkbox.indeterminate = false;
		node.getUI().checkbox.checked = checked;
		
		node.attributes.checked = checked;
		var childChecked = this.doChildHasChecked(node);
		if(childChecked == node.childNodes.length){
			node.getUI().checkbox.checked = true;
			node.getUI().checkbox.indeterminate = false;
		}else if(childChecked == 0){
			var indeterminate = false;
			node.eachChild(function(child){     
	        	if(child.getUI().checkbox.indeterminate){
	        		indeterminate = true;
	        		return false;
	        	}
	        }); 
			node.getUI().checkbox.checked = false;
			node.getUI().checkbox.indeterminate = indeterminate;
		}else{
			node.getUI().checkbox.checked = false;
			node.getUI().checkbox.indeterminate = true; //半选中状态
		}
		
		node.getOwnerTree().fireEvent('check', node, checked);
		var parentNode = node.parentNode;
		if( parentNode !== null){
			this.doParentCheck(parentNode,checked);
		}
 	},
 	
 	handlerCheck : function(node, checked){
 		var parentNode = node.parentNode;
        if(!Ext.isEmpty(parentNode)) {   
        	this.doParentCheck(parentNode,checked);   
        }
        node.attributes.checked = checked;
        
        var arr = [node];
        while(arr.length > 0) {
            var curNode = arr.shift();
            curNode.getUI().checkbox.checked = checked;
            curNode.attributes.checked = checked;
            
            for(var i=0, len=curNode.childNodes.length; i<len; i++)
            	arr.push(curNode.childNodes[i]);
        }
        
        
        if(Ext.isFunction(this.doCheck)) {
        	this.doCheck(node, checked);
        	return;
        }
        
        
        var params = {
        	nodeId: node.id,
        	checked: checked
        };
        
        ///alert(this.tree.getEl());
        var masker = new Ext.LoadMask(Ext.getBody(), {
        	msg: '正在保存，请稍后...'
        });
        masker.show();
        
        var _this = this;
        Ext.Ajax.request({
    	   url: _this.saveUrl,
    	   params: {requestInfo: Ext.encode(params)},
    	   success: function(response, opts) {
    		   masker.hide();
    		   Ext.destroy(masker);
    		   if(response.responseText != '1') {
    			   alert('保存失败！');
    		   } else {
    			   if(Ext.isFunction(_this.successCallback)) {
    				   _this.successCallback();
    			   }  
    		   }
    		   
    	   },
    	   failure: function(response, opts) {
    		   masker.hide();
    		   Ext.destroy(masker);
    		   alert('保存失败！');
    	   }
    	});
        
 	},
 	
 	//延迟加载选中
 	doLazyCheck : function(node){
 		if(!Ext.isEmpty(node.parentNode)){
			var nodeChecked = node.getUI().checkbox.checked;
			//node.expandChildNodes(true);
			
			if(node.getUI().checkbox.indeterminate !== true)
			{
				node.eachChild(function(child){
					child.getUI().checkbox.checked = nodeChecked;
				});
			}
		}
 	},
 	
 	loadNode: function(node) {
 		
 		var checkbox = node.getUI().checkbox;
 		if(checkbox && checkbox.checked === true)
 			return;
 		
		var allTrue = true;
 		var allFalse = false;
 		
 		if(node.childNodes.length == 0)
 			return;
		
		node.eachChild(function(child){
			var checked = child.attributes.checked;
			if(checked === true) {
				allFalse = true;
			} else {
				allTrue = false;
			}
			
		});
 		
		if(allTrue === true) {
			if(node.getUI().checkbox) 
				node.getUI().checkbox.checked = true;
		}
		if(allFalse === false) {
			
		}
		if(allTrue === false && allFalse === true) {
			var curNode = node;
			while(curNode) {
				if(curNode.getUI().checkbox) curNode.getUI().checkbox.indeterminate = true;
				curNode = curNode.parentNode;
			}
		}
		
		
		var parentNode = node.parentNode;
        if(!Ext.isEmpty(parentNode)) {   
        	this.doParentCheck(parentNode, checkbox.checked);   
        }
 	},
 	
 	getPType : function(){
 		return this.ptype;
 	}
 });
 Ext.preg('treecheck', Ext.TreePanelCheck);