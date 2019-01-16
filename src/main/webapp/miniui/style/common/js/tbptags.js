/**
 * tbp平台标签js 封装jsp标签的部分公用js方法
 * by dengy in 2008.05.23
 */
 

	var methodArray = new Array();



	function addMethod(arrayobj,obj) {
		var len = arrayobj;
		methodArray[len]=obj;
	}

	
	function ListHandle() {
		this.leftmethodArr = new Array();
		this.rightmethodArr = new Array();
		
		  this.addleftValidator=function(obj1){
				var len = this.leftmethodArr.length;
				this.leftmethodArr[len]=obj1;
		  }
		  
		  this.addrightValidator=function(obj2){
				var len = this.rightmethodArr.length;
				this.rightmethodArr[len]=obj2;
		  }
		  
		  this.leftValidate=function(){
				if(this.leftmethodArr!='undifine'){
					for(var i=0;i< this.leftmethodArr.length;i++){
						var method= eval(this.leftmethodArr[i]);

						if(!method){
							return false;
							
						}
					}
				}
				return true;
		  }		  
		  
		  this.rightValidate=function(){
				if(this.rightmethodArr!='undifine'){
					for(var i=0;i< this.rightmethodArr.length;i++){
						var method= eval(this.rightmethodArr[i]);
						if(!method(actionId)){
							return false;
							
						}
					}
				}
				return true;
		  }		
	}
	

	function execMethod(arrayobj) {
		
		if(methodArray!='undifine'){
			for(var i=0;i< arrayobj.length;i++){
				var method= arrayobj[i];
				var flag = eval(method);
				if(!flag){
					return false;
				}
			}
		}
		return true;
	}



/**
 * 移动list列表公用js方法
 *
 **/
 
 	//对selectlist增加option 
	function addoption(obj,selname) {
			
		var selectobj = document.getElementById(selname);
		var flag = false;
		//过滤已经添加的项
		for (j=0;j<selectobj.options.length;j++) {
			if (obj.value == selectobj.options[j].value) {
				flag=true;
				break;
			}
		}
		if(!flag) {
			selectobj.add(obj);
		}			
		//selectobj.options[selectobj.options.length] = new Option(obj.text,obj.value);
	}
	
	//移除selectlist option
	function removeoption(index,selname) {
		var selectobj = document.getElementById(selname);
		selectobj.remove(index);
	}
	
	//将leftlist的项目添加至rightlist
	function moveright(leftname,rightname) {
	

		var leftsel = document.getElementById(leftname);
		var obj = new Array();
		for (i=0;i<leftsel.options.length;i++) {
			if(leftsel.options[i].selected) {
				obj[0] = leftsel.options[i].text;
				obj[1] = leftsel.options[i].value;					
				var item = new Option(obj[0],obj[1]);
				addoption(item,rightname);
				
				if(delflag == "true") {
					removeoption(i,leftname);
					i = i-1;
				}
				else {	
					leftsel.options[i].selected = false;
				}
				
			}
		
		}

		
		//var index = leftsel.selectedIndex;
	}
	
	//将rightlist的项目移除
	function moveleft(leftname,rightname) {
		var rightsel = document.getElementById(rightname);
		
		var obj = new Array();
		//if(rightsel.selectedindex> -1 ) {
		
		for (i=0;i<rightsel.options.length;i++) {

					
			if(rightsel.options[i].selected) {
			
				if(delflag == "true") {
					obj[0] = rightsel.options[i].text;
					obj[1] = rightsel.options[i].value;					
					var item = new Option(obj[0],obj[1]);				
					addoption(item,leftname);
				}

				removeoption(i,rightname);
				i=i-1
			}
			
			if(delflag == "true") {
			
			}

			
		}
		
		//};
	}
	
	//获取sel内的全部项目数组
	function getSelectOptions(selname) {
		var select = document.getElementById(selname);
		
		var aRet = new Array(); 
		
		for (i=0;i<select.options.length;i++) {
		
			aRet[i] = new Array();
			
			aRet[i][0] = select.options[i].value;
			aRet[i][1] = select.options[i].text;
		}
		
		return aRet;
	}
	
	//设置移动list标签页面hidden value 用@和,串联
	function setCheckValue(valuename,selname) {
		
		
		var aSelOpt = getSelectOptions(selname);
		
		var select = document.getElementById(selname);
		
		var hidden = document.getElementById(valuename);
		
		var ret = "";
		for (i=0;i<select.options.length;i++) {
			

			aSelOpt[i] = new Array();
			
			aSelOpt[i][0] = select.options[i].value;
			aSelOpt[i][1] = select.options[i].text;
			if(i==0) {
				ret = aSelOpt[i][0] + '@' + aSelOpt[i][1];
			}
			else {
				ret += "," + aSelOpt[i][0] + '@' + aSelOpt[i][1];
			}
		}
		hidden.value = ret;
	}
	
	
	
	
/**
 * 多级联动下拉select菜单公用js方法
 *
 **/
 		

 
		/**
		 * 设置下一层级 select标签的option集合数值
		 *
		 **/
		function   setOptions(level)   
		{
			var   XPath;   
			    
			//从select数组中取得需设置的select项目
			var   objCurrentSelect   =   RelativeSelects[level-1];  
			var   objOptions   =   objCurrentSelect.options;   //取得option集合
			//option集合清空
			while   (objOptions.length>0)   
			{   
				objOptions.remove(0);   
			}
			
			var arrayOpt;
		    
		    
			if   (level   <=   1)
			{
				eval("arrayOpt=array"+level);
				for   (i   =   0;   i   <   arrayOpt.length;   i++)   
				{   
					var   optionText   =   arrayOpt[i][1];   
					var   optionValue   =   arrayOpt[i][0]//optionText;   
					var   objOption   =   new   Option(optionText,   optionValue);   
					objOptions.add(objOption);   
				}   
			}   
			else   
			{   
				//得到父级select
				var   objParentSelect   =   RelativeSelects[level   -   2];  
				
				var   selectedIndex   =   objParentSelect.selectedIndex;  
				
				//alert("selectedIndex=" + selectedIndex);
				
				//取的父级选中的option vaule
				var parentselid = objParentSelect.options[selectedIndex].value;
				
				//alert("parentselid=" + parentselid);
				
				var hashmap;
				//alert(hashmap2.get("3"));
				
				//获取当前select对应的 hashmap 数据源  页面js对象
 				eval("hashmap = hashmap" + level);
 				
 				//根据父级的 optionvalue 从hashmap中获取对应的数组 并填充option
				arrayOpt = hashmap.get(parentselid);			
				
				for (i = 0; i < arrayOpt.length; i++)   
				{   
					var   optionText   =   arrayOpt[i][1];   
					var   optionValue   =   arrayOpt[i][0];//optionText;   
					var   objOption   =   new   Option(optionText,   optionValue);   
					objOptions.add(objOption);   
				}   
			}   
		    
		    //遍历下一层级的select
		    while(level <RelativeSelects.length) {
		    	level = level+1
		    	setOptions(level);
		    }
		    
		}   
	