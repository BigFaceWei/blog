//通用滑动门tab类
function scrollDoor(){  
}  
scrollDoor.prototype = {  
	
	sd : function(menus,divs,openClass,closeClass){  
		 var _this = this;  
		 _this.menus=menus;
		 _this.divs=divs;
		 _this.openClass=openClass;
		 _this.closeClass=closeClass;
		 if(menus.length != divs.length){  
			  alert("菜单层数量和内容层数量不一样!");  
			  return false;  
		 }      
		 for(var i = 0 ; i < menus.length ; i++){   
			  _this.$(menus[i]).value = i;      
			  _this.$(menus[i]).onclick = function(){  
				   _this.selectMenus(this.value);
			  }
		 }  
	 },  
	$ : function(oid){  
		 if(typeof(oid) == "string")  
		 return document.getElementById(oid);  
		 return oid;  
	} ,
	selectMenus:function(menuid){
		try{
					var _this = this; 
					if(typeof(_clickScrollDoorMenus)!='undefined'){
				   		_clickScrollDoorMenus(_this.$(_this.menus[menuid]));
				   }
		 		   for(var j = 0 ; j < _this.menus.length ; j++){        
				    _this.$(_this.menus[j]).className = _this.closeClass;  
				    _this.$(_this.divs[j]).style.display = "none";  
				   }  
				   _this.$(_this.menus[menuid]).className = _this.openClass;
				  
				   _this.$(_this.divs[menuid]).style.display = "block";
		}catch(e){
			alert(e.message);
		}
		
	}
} 
