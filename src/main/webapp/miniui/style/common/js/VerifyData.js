function dispMessage(contorl,dispInfo) {
	var message = "";
	contorl=$(contorl);
	var cnName=contorl.attr("cnName");
	if (typeof (cnName) != "undefined") {
		message = message  + cnName + "："+dispInfo;
	}else{
		message = message + "该字段"+dispInfo;
	}
	saveAble = false;
	setFocusWithMessage(contorl,message);
}

function setFocusWithMessage(contorl,mesg) {
	contorl = $(contorl);
	var relVal = contorl.attr("relationControl");
	if (typeof (relVal) != "undefined") {
		if ($("[id="+relVal+"]").length>0 || $("[name="+relVal+"]").length>0)  {
			if($("[id="+relVal+"]").length > 0)
			    var relationControl = document.getElementById(relVal);
			if($("[name="+relVal+"]").length > 0)
				var relationControl = document.getElementsByName(relVal)[0];
			var $relationControl = $(relationControl);
			relationControl.focus();
			showTips({'elm':$relationControl,'content':mesg,'timeOnScreen':3000});
		}else{
			showTips({'elm':contorl,'content':'错误：'+contorl.attr("cnName")+'缺少relationControl元素','timeOnScreen':3000,iconType:'error'});
		}
	}else{
		contorl.focus();
		showTips({'elm':contorl,'content':mesg,'timeOnScreen':3000});
	}
}

function setFocus(contorl) {
	contorl = $(contorl);
	var relVal = contorl.attr("relationControl");
	if (typeof (relVal) != "undefined") {
		if ($("[id="+relVal+"]").length>0 || $("[name="+relVal+"]").length>0)  {
			if($("[id="+relVal+"]").length > 0)
			    var relationControl = document.getElementById(relVal);
			if($("[name="+relVal+"]").length > 0)
				var relationControl = document.getElementsByName(relVal)[0];
			var $relationControl = $(relationControl);
			if($(relationControl).attr("type")!="hidden"){
				relationControl.focus();
				showTips({'elm':$relationControl,'content':'此处不能为空','timeOnScreen':3000});
			}else{
				contorl.focus();
				showTips({'elm':contorl,'content':'此处不能为空','timeOnScreen':3000});
			}
		}else{
			showTips({'elm':contorl,'content':'错误：'+contorl.attr("cnName")+'缺少relationControl元素','timeOnScreen':3000,iconType:'error'});
		}
	}else{
		contorl.focus();
		showTips({'elm':contorl,'content':'此处不能为空','timeOnScreen':3000});
	}
}

function checkIsPermitNull(contorl){
	contorl=$(contorl);
	var relVal = contorl.attr("isNull");
	if (typeof (relVal) != "undefined") {
		if (relVal=="true"){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function backToCheckForm(thisFormObj){
	if($(".tabs-selected").html()!= null){
		var k =-1;
		var a = $(thisFormObj).attr('name');
		for(var i=0;i<$(".tabs-panels").find("div:first-child").length;i++){
			if($(".tabs-panels").find("div:first-child:eq("+i+")").find("*[name="+a+"]").length>0){
			   k=i;
			   break;
		    }
		}
		if(k==-1)
			return;
		$(".tabs-selected").parent().find("li:eq("+k+")").find('a').click();
	}
	return;
}

//保存前检查字段填写的内容是否超出长度
function checkContentLength(obj){
	var flag = true;
	var text = obj[0];
	var length = obj.attr("maxlength");
	if(length){
		var s=text.value.replace(/([\u4e00-\u9fa5])/g,'aa');//将中文转为单字节
		if(s.length>length){
			dispMessage(text,"超过允许的输入长度");
			flag = false;
		}
	}
	return flag;
}

//依赖jquery
function sysDataCheckForm(formObj){
	var cflag = true;//能继续往下走的标记
	$(formObj).find("#string").each(function(){
		if(!checkContentLength($(this))){
			cflag = false;
			return false;
		}
		if($.trim($(this).val())==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"不能为空");
			cflag = false;
			return false;
		}
	});
	
	$(formObj).find("#num").each(function(){
		if(!checkContentLength($(this))){
			cflag = false;
			return false;
		}
		if($(this).val()==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"不能为空");
			cflag = false;
			return false;
		}else if($(this).val()!=""&&isNaN($(this).val())) {
			backToCheckForm(this);
			dispMessage($(this)[0],"必须为数字类型");
			cflag = false;
 			return false;
  		}
	});
	
	$(formObj).find("#rnum").each(function(){
		if(!checkContentLength($(this))){
			cflag = false;
			return false;
		}
		if($(this).val()==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"不能为空");
			cflag = false;
			return false;
		}else if($(this).val()!="" && !(/^-?\d+$/.test($(this).val()))) {
			backToCheckForm(this);
			dispMessage($(this)[0],"必须为整数类型(无小数位)");
			cflag = false;
 			return false;
  		}
	});
	
	$(formObj).find("#email").each(function(){
		if(!checkContentLength($(this))){
			cflag = false;
			return false;
		}
		if($(this).val()==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"不能为空");
			cflag = false;
			return false;
		}else if($(this).val()!=""&&ValidEmail($(this).val())) {
			backToCheckForm(this);
			dispMessage($(this)[0],"Email类型不正确");
			cflag = false;
			return false;
  		}
	});
	
	$(formObj).find("#date").each(function(){
		if(!checkContentLength($(this))){
			cflag = false;
			return false;
		}
		if($(this).val()==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"不能为空");
			cflag = false;
			return false;
		}else if($(this).val()!=""&&!checkDateTime($(this)[0])) {
			backToCheckForm(this);
			dispMessage($(this)[0],"日期格式异常");
			cflag = false;
			return false;
  		}
	});
	
	$(formObj).find("#combobox").each(function(){
		if($(this).val()==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"下拉框中的值不能为空");
			cflag = false;
			return false;
		}
	});
	
	$(formObj).find("#extendcombobox").each(function(){
		if($(this).val()==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this).siblings(".mainCon").find("input:first"),"下拉框中的值不能为空");
			cflag = false;
			return false;
		}
	});
	
	$(formObj).find("#extendcomboboxajax").each(function(){
		if($(this).val()==""&&!checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this).siblings(".mainCon").find("input:first"),"下拉框中的值不能为空");
			cflag = false;
			return false;
		}
	});
	
	$(formObj).find("#radiobox").each(function(){
		var checked = false;
		var radioName = $(this).attr("name");
		$('[name="'+radioName+'"]').each(function(){
			if($(this).is(":checked")){
				checked = true;
			}
		});
		if (!checked && !checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"该radiobox必须选择一项");
			cflag = false;
			return false;
		}
	});
	
	$(formObj).find("#check").each(function(){
		var checked = false;
		var checkName = $(this).attr("name");
		$('[name="'+checkName+'"]').each(function(){
			if($(this).is(":checked")){
				checked = true;
			}
		});
		if (!checked && !checkIsPermitNull($(this)[0])){
			backToCheckForm(this);
			dispMessage($(this)[0],"该checkbox必须选择一项");
			cflag = false;
			return false;
		}
	});
	
	$(formObj).find("#point").each(function(){
		if (!ValidPoint($(this)[0])){
			cflag = false;
  			return false;
  		}
	});
	
	$(formObj).find("#word").each(function(){
		if (!ValidWord($(this)[0])){
			cflag = false;
  			return false;
  		}
	});
	
	closeDisabledElement();
	return cflag;

}

function sysDataCheck()
{
if  ($("[id=string]").length > 0){
 	if (typeof($('[id=string]:eq(0)')[0])== "object"){
 		for(var i = 0; i < $("[id=string]").length; i ++)
  		{
      		if( $("[id=string]:eq("+i+")")[0].value == "")
     		{
     			if (!checkIsPermitNull($("[id=string]:eq("+i+")")[0])){
     				dispMessage($("[id=string]:eq("+i+")")[0],"不能为空");
     				return false;
     			}
     			
    		 } 
  		}
 	} else{

 		if( $("[id=string]")[0].value == ""){
 			if (!checkIsPermitNull($("[id=string]")[0])){
				dispMessage($("[id=string]")[0],"不能为空");
     			return false;
     		}
 		}
 	}
 }

if($("[id=num]").length > 0){
 	if (typeof($('[id=num]:eq(0)')[0])== "object"){
 		for(var i = 0; i < $("[id=num]").length; i ++)
  		{
      		if( $("[id=num]:eq("+i+")")[0].value == ""){
     			if (!checkIsPermitNull($("[id=num]:eq("+i+")")[0])){
     				dispMessage($("[id=num]:eq("+i+")")[0],"不能为空");
    				return false;
    			}
            }
			else if( isNaN($("[id=num]:eq("+i+")")[0].value)) {
				alert("数字类型不正确");
     			dispMessage($("[id=num]:eq("+i+")")[0],"必需为数字类型");
     			return false;
      		}
     	}
 	} else{
 		if( $("[id=num]")[0].value == "")
     		{
     			if (!checkIsPermitNull($("[id=num]")[0])){
     				dispMessage($("[id=num]")[0],"不能为空");
    				return false;
    			}
   			 }
		else if( isNaN($("[id=num]")[0].value)) {
				alert("数字类型不正确");
				dispMessage($("[id=num]")[0],"-必需为数字类型-");
     			return false;
      		}
      	}
 	}

if($("[id=email]").length > 0){
 	if (typeof($('[id=email]:eq(0)')[0])== "object"){
 		for(var i = 0; i < $("[id=email]").length; i ++)
  		{
      		if( $("[id=email]:eq("+i+")")[0].value == "")
     		{
     			if (!checkIsPermitNull($("[id=email]:eq("+i+")")[0])){
     				dispMessage($("[id=email]:eq("+i+")")[0],"不能为空");
     				return false;
     			}
    		 } else {
    		 	if( ValidEmail($("[id=email]:eq("+i+")")[0].value)) {
     				dispMessage($("[id=email]:eq("+i+")")[0],"Email类型不正确");
     				return false;
     			}
      		}
  		}
 	} else{

 		if( $("[id=email]")[0].value == ""){
 			if (!checkIsPermitNull($("[id=email]")[0])){
     			dispMessage($("[id=email]")[0],"不能为空");
     			return false;
     		}
 		} else {

    		 	if( ValidEmail($("[id=email]")[0].value)) {
       				dispMessage($("[id=email]")[0],"Email类型不正确");
     				return false;
     			}
      		}
 	}
 }

if($("[id=date]").length > 0){
 	if (typeof($('[id=date]:eq(0)')[0])== "object"){
 		for(var i = 0; i < $("[id=date]").length; i ++)
  		{
      		if( $("[id=date]:eq("+i+")")[0].value == "")
     		{
     			if (!checkIsPermitNull($("[id=date]:eq("+i+")")[0])){
     				dispMessage($("[id=date]:eq("+i+")")[0],"不能为空");
     				return false;
     			}
    		 } else {

    		 	if( !checkDateTime($("[id=date]:eq("+i+")")[0])) {
    		 		setFocus($("[id=date]:eq("+i+")")[0]);
       				return false;
     			}
      		}
  		}
 	} else{
 		if( $("[id=date]")[0].value == ""){
 			if (!checkIsPermitNull($("[id=date]")[0])){
 				dispMessage($("[id=date]")[0],"不能为空");
     			return false;
     		}
 		} else {
    		 	if (!checkDateTime($("[id=date]")[0])) {
    		 		setFocus($("[id=date]")[0]);
      				return false;
     			}
      		}
 	}
 }

//////////////下拉检测
if  ($("[id=combobox]").length > 0){
	if (typeof($('[id=combobox]:eq(0)')[0].length)== "undefined"){

		if ($("[id=combobox]")[0].value=="") {
			if (!checkIsPermitNull($("[id=combobox]")[0])){
				dispMessage($("[id=combobox]")[0],"下拉框中的值不能为空");
				return false;
			}
		}
	} else {
		for(var i = 0; i < $("[id=combobox]").length; i ++)
  		{
			if ($("[id=combobox]:eq("+i+")")[0].value==""){
				if (!checkIsPermitNull($("[id=combobox]:eq("+i+")")[0])){
					dispMessage($("[id=combobox]:eq("+i+")")[0],"下拉框中的值不能为空");
					return false;
				}
			}
  		}
	}
}
//模拟下拉框检测
if($("[id=extendcombobox]").length > 0){//将所有的extendcombobox
	if (typeof($('[id=extendcombobox]:eq(0)')[0].length)== "undefined"){
		var thiObj = $("[id=extendcombobox]")[0];
		if (thiObj.value=="") {
			if (!checkIsPermitNull(thiObj)){
				dispMessage($(thiObj).siblings(".mainCon").find("input:first"),"下拉框中的值不能为空");
				return false;
			}
		}
	} else {
		var thiObj = $("[id=extendcombobox]")[0];
		for(var i = 0; i < thiObj.length; i ++)
  		{
			var v = thiObj[i].value;
			if (thiObj[i].value==""){
				if (!checkIsPermitNull(thiObj[i])){
					dispMessage($(thiObj[i]).siblings(".mainCon").find("input:first"),"下拉框中的值不能为空");
					return false;
				}
			}
  		}
	}
}

//模拟下拉框（修）检测
if($("[id=extendcomboboxajax]").length > 0){//将所有的extendcombobox
	if (typeof($('[id=extendcomboboxajax]:eq(0)')[0].length)== "undefined"){
		var thiObj = $("[id=extendcomboboxajax]")[0];
		if (thiObj.value=="") {
			if (!checkIsPermitNull(thiObj)){
				dispMessage($(thiObj).siblings(".mainCon").find("input:first"),"下拉框中的值不能为空");
				return false;
			}
		}
	} else {
		var thiObj = $("[id=extendcomboboxajax]")[0];
		for(var i = 0; i < thiObj.length; i ++)
  		{
			var v = thiObj[i].value;
			if (thiObj[i].value==""){
				if (!checkIsPermitNull(thiObj[i])){
					dispMessage($(thiObj[i]).siblings(".mainCon").find("input:first"),"下拉框中的值不能为空");
					return false;
				}
			}
  		}
	}
}

if  ($("[id=radiobox]").length > 0){
	var checked = false;
 	if (typeof($('[id=radiobox]:eq(0)')[0])== "object"){
		for(var i = 0; i < $("[id=radiobox]").length; i ++)
  		{
			var radioName = $("[id=radiobox]:eq("+i+")")[0].name;//取得表单元素名
			var r=document.getElementsByName(radioName);
			for(var ii=0;ii<r.length;ii++)
            {
				if(r[ii].checked) //选中
                {
					checked = true;
					break;
                 }
            }
			if (checked == false)
            {
				dispMessage(r[0],"该radiobox必须选择一项");
				return false;
            }
      	}

 	}else{
        if ($("[id=radiobox]")[0].checked== false)
		{
			dispMessage($("[id=radiobox]")[0],"该radiobox必须选择一项");
			return false;
		}
    }
}

if  ($("[id=check]").length > 0){
	var checked = false;
 	if (typeof($('[id=check]:eq(0)')[0])== "object"){
		for(var i = 0; i < $("[id=check]").length; i ++)
  		{
			var chekcName = $("[id=check]:eq("+i+")")[0].name;//取得表单元素名
			var r=document.getElementsByName(chekcName);
			for(var ii=0;ii<r.length;ii++)
                        {
				if(r[ii].checked) //选中
                                {
					checked = true;
					break;
                                }
                        }
			if (checked == false)
                        {

				dispMessage(r[0],"该radiobox必须选择一项");
				return false;
                        }
      		}
 	} else{
        	if ($("[id=check]")[0].checked== false)
		{
			dispMessage($("[id=check]")[0],"该radiobox必须选择一项");
			return false;
		}
     }
}

if($("[id=point]").length > 0){
 	if (typeof($('[id=point]:eq(0)')[0])== "object"){
 		for(var i = 0; i < $("[id=point]").length; i ++)
  		{
     		if (!ValidPoint($("[id=point]:eq("+i+")")[0])){
      			return false;
      		}
  		}
 	} else{
		if (!ValidPoint($("[id=point]")[0])){
      		return false;
      	}
 	}
 }

if  ($("[id=word]").length > 0){
	
 	if (typeof($('[id=word]:eq(0)')[0])== "object"){
 		for(var i = 0; i < $("[id=word]").length; i ++)
  		{
      		if (!ValidWord($("[id=word]:eq("+i+")")[0])){
      			return false;
      		}
  		}
 	} else{
		if (!ValidWord($("[id=word]")[0])){
      		return false;
      	}

 	}
 }

//国调安全检查，liuhy - 2012/12/10
var check = function(value) {
	if(!value)
		return true;
	if(value.indexOf('\'') != -1 || value.indexOf('\"') != -1 || value.indexOf('>') != -1 || 
			value.indexOf('<') != -1 || value.indexOf('\\') != -1 || value.indexOf('#') != -1) {
		alert('系统提示：相关控件的值中含有敏感字符，如>、<、\'、\"、#、\\等');
		return false;
	}
	if(value.indexOf('select') != -1 && value.indexOf('from') != -1) {
		alert('系统提示：相关控件的值中含有SQL语句！');
		return false;
	}
	return true;
};
var tryCheck = function(cb) {
	try {
		if(cb() == false) return false;
		else return true;
	} catch( e ) {
		return true;
	}
};
var flag = tryCheck(function() {
	for(var i = 0; i < $("[id=string]").length; i++) 
		if(check($("[id=string]:eq("+i+")")[0].value) == false)
			return false;
}) && tryCheck(function() {
	for(var i = 0; i < $("[id=num]").length; i++) 
		if(check($("[id=num]:eq("+i+")")[0].value) == false)
			return false;
})&& tryCheck(function() {
	for(var i = 0; i < $("[id=rnum]").length; i++) 
		if(check($("[id=rnum]:eq("+i+")")[0].value) == false)
			return false;
}) && tryCheck(function() {
	for(var i = 0; i < $("[id=email]").length; i++) 
		if(check($("[id=email]:eq("+i+")")[0].value) == false)
			return false;
}) && tryCheck(function() {
	for(var i = 0; i < $("[id=date]").length; i++) 
		if(check($("[id=date]:eq("+i+")")[0].value) == false)
			return false;
}) && tryCheck(function() {
	for(var i = 0; i < $("[id=combobox]").length; i++) 
		if(check($("[id=combobox]")[0].value) == false)
			return false;
}) && tryCheck(function() {
	for(var i = 0; i < $("[id=extendcombobox]").length; i++) 
		if(check($("[id=extendcombobox]")[0].value) == false)
			return false;
}) && tryCheck(function() {
	for(var i = 0; i < $("[id=extendcomboboxajax]").length; i++) 
		if(check($("[id=extendcomboboxajax]")[0].value) == false)
			return false;
});

if(flag == false)
	return false;
//===================================end==============================

closeDisabledElement();
return true;
}

function ValidPoint(point){
	point=$(point);
	var relVal = point.attr("relationControl");
	if (typeof (relVal) != "undefined") {
		if ($("[id="+relVal+"]").length>0 || $("[name="+relVal+"]").length>0)  {
			if($("[id="+relVal+"]").length > 0)
			    var relationControl = document.getElementById(relVal);
			if($("[name="+relVal+"]").length > 0)
				var relationControl = document.getElementsByName(relVal)[0];
			if (!checkIsPermitNull(point)){
				if (relationControl.isNull()){
					var $relationControl = $(relationControl);
					relationControl.focus();
					showTips({'elm':$relationControl,'content':'此处不可为空','timeOnScreen':3000});
			    	return false;
				}
			}
			return window.frames[relVal].save();	
			
		}else{
				alert("错误："+point.attr("cnName")+"缺少relationControl元素");
				return false;
		}
	}else{
		alert("错误："+point.attr("cnName")+"缺少relationControl元素");
		return false;
	}
}

function ValidWord(word){
	word = $(word);
	var relVal = word.attr("relationControl");
	if (typeof (relVal) != "undefined") {
		if ($("[id="+relVal+"]").length>0 || $("[name="+relVal+"]").length>0)  {
			if($("[id="+relVal+"]").length > 0)
			    var relationControl = document.getElementById(relVal);
			if($("[name="+relVal+"]").length > 0)
				var relationControl = document.getElementsByName(relVal)[0];
			relationControl = $(relationControl);
			
			if (!checkIsPermitNull(word)){
				if ( !window.frames[relVal].isNull()){
					var $relationControl = $(relationControl);
					word.focus();
					showTips({'elm':$relationControl,'content':'此处不可为空','timeOnScreen':3000});
			    	return false;
				}
			}
			return window.frames[relVal].save();	
		}else{
				alert("错误："+word.attr("cnName")+"缺少relationControl元素");
				return false;
		}
	}else{
		alert("错误："+word.attr("cnName")+"缺少relationControl元素");
		return false;
	}
}

function ValidEmail(item){
     var etext
     var elen
     var i
     var aa
     etext=item
     elen=etext.length
if (elen<5)
	return true;
     i= etext.indexOf("@",0)
if (i==0 || i==-1 || i==elen-1)
	return true;
else
	{if (etext.indexOf("@",i+1)!=-1)
	return true;}
if (etext.indexOf("..",i+1)!=-1)
	return true;
     i=etext.indexOf(".",0)
if (i==0 || i==-1 || etext.charAt(elen-1)=='.')
	return true;
if ( etext.charAt(0)=='-' ||  etext.charAt(elen-1)=='-')
	return true;
if ( etext.charAt(0)=='_' ||  etext.charAt(elen-1)=='_')
	return true;
for (i=0;i<=elen-1;i++)
	{ aa=etext.charAt(i)
	if (!((aa=='.') || (aa=='@') || (aa=='-') ||(aa=='_') || (aa>='0' && aa<='9') || (aa>='a' &&  aa<='z') || (aa>='A' && aa<='Z')))
	return true;
	}
return false;
}



function checkDateTime(control){
control=$(control);
var dateStr=control.val().toString();
var format=control.attr("dataFormat");
var objName=control.attr("cnName");
var year,month,date,day,hour,minute,sec;   
var hasYear,hasMonth,hasDate,hasHour,hasMin,hasSec;
var beingYear,endYear;
var beingMonth,endMonth;
var beingDate,endDate;
var beingHour,endHour;
var beingMin,endMin;
var beingSec,endSec;
hasYear=(format.indexOf('%Y')==-1)?false:true;
hasMonth=(format.indexOf('%M')==-1)?false:true;
hasDate=(format.indexOf('%D')==-1)?false:true;
hasHour=(format.indexOf('%h')==-1)?false:true;
hasMin=(format.indexOf('%m')==-1)?false:true;
hasSec=(format.indexOf('%s')==-1)?false:true;
var newFormat=format.replace("%Y","%YYY");
if (hasYear){
beingYear=newFormat.indexOf('%YYY');
endYear=beingYear+4;
year=dateStr.substring(beingYear,endYear);
newFormat=newFormat.replace("%YYY",year);
}
if (hasMonth){
beingMonth=newFormat.indexOf('%M');
endMonth=beingMonth+2;
month=dateStr.substring(beingMonth,endMonth);
newFormat=newFormat.replace("%M",month); 
}
if (hasDate){
beingDate=newFormat.indexOf('%D');
endDate=beingDate+2;
date=dateStr.substring(beingDate,endDate); 
newFormat=newFormat.replace("%D",date); 
}
if (hasHour){
beingHour=newFormat.indexOf('%h');
endHour=beingHour+2;
hour=dateStr.substring(beingHour,endHour); 
newFormat=newFormat.replace("%h",hour); 
}
if (hasMin){
beingMin=newFormat.indexOf('%m');
endMin=beingMin+2;
minute=dateStr.substring(beingMin,endMin); 
newFormat=newFormat.replace("%m",minute); 
}
if (hasSec){
beingSec=newFormat.indexOf('%s');
endSec=beingSec+2;
sec=dateStr.substring(beingSec,endSec); 
newFormat=newFormat.replace("%s",sec); 
}

//check year    
if(year != null){    
   year = parseInt(year,10);    
     if(isNaN(year)){    
     alert(objName+"：年度 有非法字符,请处理输入!");    
    return false;    
     }    
        if(year<1900 || year>2200){    
                alert(objName+"：年份 应介于1900与2200之间，请重新输入！");    
                return false;    
        }    
}  
 
//check month    
if(month != null){    
   month = parseInt(month,10);    
     if(isNaN(month)){    
     alert(objName+"：月份 有非法字符,请处理输入!");    
    return false;    
   }    
        if(month<1 || month >12){    
                alert(objName+"：月份 应介于1与12之间，请重新输入！");    
                return false;    
        }    
}    
//check day    
 
if(day != null){    
   day = parseInt(day,10);    
     if(isNaN(day)){    
     alert(objName+"：日 有非法字符,请处理输入!");    
    return false;    
   }    
        if((day==0)||(day>31)){    
                alert(objName+"：日 必须介于1与31之间！");    
                return false;    
         }    
         else if(day>28 && day<31){    
                if(month==2){    
                                if(day!=29){    
                                        alert(objName+"："+year+"年"+month+"月无"+day+"日。");    
                                        return false;    
                                }    
                                else {    
                                        if((year%4)!=0){    
                                                alert(objName+"："+year+"年"+month+"月无"+day+"日。");    
                                                return false;    
                                         }    
                                         else {    
                                                if((year%100==0)&&(year%400!=0)){    
                                                       alert(objName+"："+year+"年"+month+"月无"+day+"日。");    
                                                       return false;    
                                                }    
                                         }    
                                }    
                        }    
                }    
   
                else if(day==31){    
                        if((month==2)||(month==4)||(month==6)||(month==9)||(month==11)){    
                                alert(objName+"："+month+"月无"+day+"日");    
                                return false;    
                        }    
                }    
}  
   
//check hour    
if(hour != null){    
   hour = parseInt(hour,10);    
     if(isNaN(hour)){    
     alert(objName+"：小时有非法字符,请处理输入!");    
    return false;    
   }    
        if(hour<0 || hour >23){    
                alert(objName+"：小时应介于0与23之间，请重新输入！");    
                return false;    
        }    
}   

//check minute    
if(minute != null){    
   minute = parseInt(minute,10);    
     if(isNaN(minute)){    
     alert(objName+"：分钟有非法字符,请处理输入!");    
    return false;    
   }    
        if(minute<0 || minute >59){    
                alert(objName+"：小时应介于0与59之间，请重新输入！");    
                return false;    
        }    
}   
//check second    
if(sec != null){    
   sec = parseInt(sec,10);    
     if(isNaN(sec)){    
     alert(objName+"：秒有非法字符,请处理输入!");    
    return false;    
   }    
        if(sec<0 || sec >59){    
                alert(objName+"：秒应介于0与59之间，请重新输入！");    
                return false;    
        }    
}    
if (dateStr==newFormat){
	return true;
}else{
	alert(objName+"：日期格式错误，正确格式为"+format+"！");  
	return false;
	}
	
}
      
function htmlTextEncoder(str)
      {
	while(true){
		if ((str.indexOf("\r\n")==-1) && (str.indexOf('\'')==-1))
		{
		return str;
		}
		str=str.replace('\r\n','\\n');
		str=str.replace('\'','‘');
        }
      }


function closeDisabledElement(){
var formObj = $('[name="tableObjectForm"]').eq(0);
formObj.find("#combobox").each(function(){
	$(this)[0].disabled=false;
});

formObj.find("#combobox_null").each(function(){
	$(this)[0].disabled=false;
});

var   inputbox=document.getElementsByTagName("input");   
for(var   i=0;i<inputbox.length;i++){   
  	if(inputbox[i].type=="text"){   
  	inputbox[i].disabled=false;
    
  	}   
}

var areatextBox=document.getElementsByTagName("TEXTAREA");   
for(var   i=0;i<areatextBox.length;i++){   
   	areatextBox[i].disabled=false;
}

}
function CheckWF(){
	closeDisabledElement();
}