mini.TreeSelectColumn = function (config) {
    return mini.copyTo(
        {
            renderer: function (e) {
                var value = !mini.isNull(e.value) ? String(e.value) : "";
            var values = value.split(",");

            var valueField = "id", textField = "text";
            var valueMaps = {};

            var editor = e.column.editor;
            if (editor && (editor.type == "treeselect")) {
                var tree = this.__editor;
                if (!tree) {

                    if (mini.isControl(editor)) {
                        tree = editor;
                    } else {
                        editor = mini.clone(editor);                            
                        tree = mini.create(editor); 
                    }
                    this.__editor = tree;
                }

                valueField = tree.getValueField();
                textField = tree.getTextField();

                valueMaps = this._valueMaps;
                
                var treeNodes = [];
                if (!valueMaps) {
                    valueMaps = {};
                    var data = tree.getData();
                    for(var i = 0; i < data.length; i++) {
	                    treeNodes.push(data[i]);
                    }
                    
                    while(treeNodes.length > 0) {
                    	var o = treeNodes.pop();
                    	valueMaps[o[valueField]] = o;
                    	
                    	for(var i = 0; !(o.children === undefined) && i < o.children.length; i++) {
                    		treeNodes.push(o.children[i]);
                    	}
                    }
                    this._valueMaps = valueMaps;
                }
            }

            var texts = [];
            for (var i = 0, l = values.length; i < l; i++) {
                var id = values[i];
                var o = valueMaps[id];
                if (o) {
                    var text = o[textField];
                    if (text === null || text === undefined) {
                        text = "";
                    }
                    texts.push(text);
                }
            }
	 		return texts.join(',');
            }
        }, config);
};
mini._Columns["treeselectcolumn"] = mini.TreeSelectColumn;

mini.BindButtonEditColumn = function (config) {
    return mini.copyTo(
        {
            renderer: function (e) {
        		var valueMaps = {};
        		var texts = [];
        		if(this._valueMaps){
        			valueMaps = this._valueMaps;
        		}
	            var value = !mini.isNull(e.value) ? String(e.value) : "";
	            var values = value.split(",");
	        	var editor = e.sender.getCellEditor(e.column, e.row);
	    		if(editor.getValue() != ''){
	    			var editorValue = editor.value.split(',');
	    			var editorText = editor.text.split(',');
	    			$.each(editorValue, function(i, item){
	    				editor.data.push({id:item, text:editorText[i]});
	    			});
					for(var i = 0; i< editor.data.length; i++){
						var item = editor.data[i];
						valueMaps[item.id] = item.text;
					}
					this._valueMaps = valueMaps;
	    			return editor.getText(); 
	    		}else{
						var flag = true;
						for(var i = 0 ;i < values.length; i++){
							var id = values[i];
							var text = valueMaps[id];
							if(text == '' || text == undefined){
								flag = false;
								texts = [];
								break;
							}else{
								texts.push(text);
							}
						}
						if(flag){
							return texts.join(",");
						}
	    				var transferred = [];
	    				$.each(e.sender.data, function(i, item){
	    					var fieldValue = item[e.field];
	    					if(fieldValue){
	    						transferred.push(fieldValue);
	    					}
	    				});
	    				if(transferred.length > 0){
	    					var url = editor.url;
	    					var transferredValueIndex = url.indexOf('transferredValue=')+17;
	    					var tableIdIndex = url.indexOf('&tableid');
	    					var transferredValueSubstr = url.substring(0, transferredValueIndex);
	    					var tableIdSubstr = url.substring(tableIdIndex, url.length);
	    					var result = transferredValueSubstr + transferred.join(",") + tableIdSubstr;
	    					url = result; 
	    					if(url.indexOf("&fieldSqlValue") != -1){
								var index = url.indexOf("&fieldSqlValue");
								url = url.substring(0,index);
							}
							var fieldSqlUrl = '';
							var fieldSqlName = $.getUrlParamByUrl('fieldSqlName',url);
							var fieldSqlValue = "";
							if(fieldSqlName != null && fieldSqlName.length > 0){
								var sqlValue =[];
								var sqlNames = fieldSqlName.split(";");
								for(var i = 0; i < sqlNames.length; i++){
									var sqlName = sqlNames[i];
									if(isHasProInArray(e.sender.getBottomColumns, sqlName)){
										if(e.row[sqlName] == null || e.row[sqlName] == ''){
										}else{
											sqlValue.push(e.row[sqlName]);
										}
									}else{
										var field = form.getField(sqlNames[i]);
										if(field.getValue() == ''){
										}else{
											sqlValue.push(field.getValue());
										}
									}
								}
								fieldSqlValue = sqlValue.join(";");
								fieldSqlUrl = "&fieldSqlValue="+fieldSqlValue;
								if(e.sender.url != (url + fieldSqlUrl)){
									editor.setUrl(url + fieldSqlUrl);
								}
							}else{
								editor.setUrl(result);
								
							}
	    					
	    					
	    					for(var i = 0; i< editor.data.length; i++){
	    						var item = editor.data[i];
	    						valueMaps[item.id] = item.text;
	    					}
	    					this._valueMaps = valueMaps;
	    					$.each(values, function(i, id){
	    						var text = valueMaps[id];
	    						texts.push(text);
	    					});
	    					return texts.join(",");
	    				}
	    		}
        	}
        }, config);
};
mini._Columns["bindbuttoneditcolumn"] = mini.BindButtonEditColumn;
mini.LazyComboboxColumn = function (config) {
	return mini.copyTo(
			{
				renderer: function (e) {
				var valueMaps = {};
				var texts = [];
				if(this._valueMaps){
					valueMaps = this._valueMaps;
				}
				var value = !mini.isNull(e.value) ? String(e.value) : "";
				var values = value.split(",");
				var editor = e.sender.getCellEditor(e.column, e.row);
				if(editor.getValue() != ''){
					var editorValue = editor.value.split(',');
					var editorText = editor.text.split(',');
					$.each(editorValue, function(i, item){
						editor.data.push({id:item, text:editorText[i]});
					});
					for(var i = 0; i< editor.data.length; i++){
						var item = editor.data[i];
						valueMaps[item.id] = item.text;
					}
					this._valueMaps = valueMaps;
					return editor.getText(); 
				}else{
						var flag = true;
						for(var i = 0 ;i < values.length; i++){
							var id = values[i];
							var text = valueMaps[id];
							if(text == '' || text == undefined){
								flag = false;
								texts = [];
								break;
							}else{
								texts.push(text);
							}
						}
						if(flag){
							return texts.join(",");
						}
						var transferred = [];
						$.each(e.sender.data, function(i, item){
							var fieldValue = item[e.field];
							if(fieldValue){
								transferred.push(fieldValue);
							}
						});
						if(transferred.length > 0){
							var url = editor.lazyurl;
							if(url.indexOf("&fieldSqlValue") != -1){
								var index = url.indexOf("&fieldSqlValue");
								url = url.substring(0,index);
							}
							var fieldSqlUrl = '';
							var fieldSqlName = $.getUrlParamByUrl('fieldSqlName',url);
							var fieldSqlValue = "";
							if(fieldSqlName != null && fieldSqlName.length > 0){
								var sqlValue =[];
								var sqlNames = fieldSqlName.split(";");
								for(var i = 0; i < sqlNames.length; i++){
									var sqlName = sqlNames[i];
									if(isHasProInArray(e.sender.getBottomColumns(), sqlName)){
										if(e.row[sqlName] == null || e.row[sqlName] == ''){
										}else{
											sqlValue.push(e.row[sqlName]);
										}
									}else{
										var field = form.getField(sqlNames[i]);
										if(field.getValue() == ''){
										}else{
											sqlValue.push(field.getValue());
										}
									}
								}
								fieldSqlValue = sqlValue.join(";");
								fieldSqlUrl = "&fieldSqlValue="+fieldSqlValue;
								if(e.sender.url != (url + fieldSqlUrl)){
									editor.setUrl(url + fieldSqlUrl + "&transferredValue="+transferred.join(","));
								}
							}else{
								var result = url + "&transferredValue="+transferred.join(",");
								editor.setUrl(result);
							}
							for(var i = 0; i< editor.data.length; i++){
								var item = editor.data[i];
								valueMaps[item.id] = item.text;
							}
							this._valueMaps = valueMaps;
							$.each(values, function(i, id){
								var text = valueMaps[id];
								texts.push(text);
							});
							return texts.join(",");
						}
				}
			}
			}, config);
};
mini._Columns["lazycomboboxcolumn"] = mini.LazyComboboxColumn;

mini.OpinionExpandColumn = function (config) {
    return mini.copyTo({ width: 30, headerAlign: "center", align: "center", draggable: false, cellStyle: "padding:0", cellCls: "mini-grid-expandCell",
        hideable: true,
        renderer: function (e) {
	        var row = e.record;
	        var formName = 'opinion_'+row.step_id+'_form';
	        var data = e.sender.data;
        	var form = new mini.Form('#'+formName);
        	var fields = form.getFields();
        	if(fields.length < 1){
        	    return "";
        	}
            return '<a class="mini-grid-ecIcon" href="javascript:#" onclick="return false"></a>';
        },
        init: function (grid) {
            grid.on("cellclick", this.__OnCellClick, this);
        },
        __OnCellClick: function (e) {
            var grid = e.sender;
            if (e.column == this && grid.isShowRowDetail) {
                if (mini.findParent(e.htmlEvent.target, "mini-grid-ecIcon")) {
                    var isShow = grid.isShowRowDetail(e.record);

                    if (!isShow) {
                        e.cancel = false;
                        grid.fire("beforeshowrowdetail", e);
                        if (e.cancel === true) return;
                    } else {
                        e.cancel = false;
                        grid.fire("beforehiderowdetail", e);
                        if (e.cancel === true) return;
                    }

                    if (grid.autoHideRowDetail) {
                        grid.hideAllRowDetail();
                    }
                    if (isShow) {
                        grid.hideRowDetail(e.record);
                    } else {
                        grid.showRowDetail(e.record);
                    }
                }
            }
        }
    }, config);
}
mini._Columns["opinionexpandcolumn"] = mini.OpinionExpandColumn;
