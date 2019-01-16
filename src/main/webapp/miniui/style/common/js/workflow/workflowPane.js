function workflowHandle(){
  this.preArr=new Array();
  this.postArr=new Array();
  this.handleArr=new Array();
  this.isload=false;
  this.workflowContext = new Array();
  this.businessData=new Array();
  this.addPreValidator=function(obj1){
		var len = this.preArr.length;
		this.preArr [len]=obj1;
  }

  this.addPostValidator=function(obj1){
		var len = this.postArr.length;
		this.postArr [len]=obj1;
  }
  this.addSaveHandle=function(handle){
  	var len = this.handleArr.length;
  	this.handleArr[len]=handle;
  }
  this.PreValidate=function(){
  	try{
		if(this.preArr!='undifine'){
			for(var i=0;i< this.preArr.length;i++){
				var method= this.preArr [i];
				if(!method()){
					return false;
					
				}
			}
		}
  	}catch(e){
  		if(e.message!="NoMsg"){
  			alert(e.message);
  		}
  		return false;
  	}
		return true;
  }
  this.PostValidate=function(actionId){
  	try{
		if(this.postArr!='undifine'){
			for(var i=0;i< this.postArr.length;i++){
				var method= this.postArr [i];
				if(!method(actionId)){
					return false;
				}
			}
		}
  	}catch(e){
  		if(e.message!="NoMsg"){
  			alert(e.message);
  		}
  		return false;
  	}
		return true;
  }
  
   this.HandleAll=function(){
	 try{
		if(this.handleArr!='undifine'){
			for(var i=0;i< this.handleArr.length;i++){
				var method= this.handleArr [i]; 
				method();
			}
		}
		return true;
  	}catch(e){
  		if(e.message!="NoMsg"){
  			alert(e.message);
  		}
  	}
  	return false;
  }
  this.putContext=function(key,value){
  	this.workflowContext[key]=value;
  }
  this.putBusinessData=function(key,value){
  	this.businessData[key]=value;
  }
  this.getBusinessData=function(){
  	var rs="";
  	for(var key in this.businessData){
  		var temp=key+"="+this.businessData[key];
  		if(rs==""){
  			rs=temp;
  		}else{
  			rs=rs+";"+temp;
  		}
  		return rs;
  	}
  }
  this.get=function(key){
  	return this.workflowContext[key];
  }
}
var workflowHandle=new workflowHandle();
var workflowContext=workflowHandle.workflowContext;

 

//�õ�iframe��document
function getIframeByPageId(pageid){
	var objFrame=document.getElementById("iframe"+pageid);
	if(typeof(objFrame)=="undefined"){
		throw new Error("û���ҵ�ҳ:"+pageid);
	}
	if(objFrame.readyState!='complete'){
		throw new Error("��û�г�ʼ�����,���Ժ�.");
	}
	var objFrameDocument=objFrame.contentWindow;
	return objFrameDocument;
}
//����Ԫ��
function findElementByName(pageid,elementName){
	var win = getIframeByPageId(pageid);
	
	var elements = win.document.getElementsByName(elementName);
	if(typeof(elements)=="undefined"){
		throw new Error('û���ҵ�'+pageid+"�µ�"+elementName+"Ԫ��.");
	}
	return elements[0];
}
//����Ԫ��
function findElementById(pageid,elementId){
	var win = getIframeByPageId(pageid);
	var element = win.document.getElementById(elementId);
	if(typeof(element)=="undefined"){
		throw new Error('û���ҵ�'+pageid+"�µ�"+elementId+"Ԫ��.");
	}
	return element;
}
//���¼���
function refreshIframe(win){
	var curhref=win.contentWindow.location.href.toString();
	
	//var p = new Poly9.URLParser(curhref);
	//var pathName=p.getPathname();
	  
	var sourRef=win.src;
	sourRef=sourRef.replace(/\t/g,"");
	sourRef=sourRef.replace(/\r/g,"");
	sourRef=sourRef.replace(/\n/g,"");
	if(curhref.indexOf(sourRef)>=0){
		return;
	}
	
	//win.contentWindow.location.href=sourRef;
}

	