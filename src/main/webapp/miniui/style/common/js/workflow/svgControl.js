
function svgWorkflow(){
	this.svgDoc = undefined;
	this.elements=new Array();
	this.steps=new Array();
	this.splits=new Array();
	this.joins=new Array();
	this.edages=new Array();
}
//流程
svgWorkflow.prototype.init=function(obj){
	this.svgDoc = obj.getSVGDocument();
	//初始动作
	var objList = this.svgDoc.getElementsByTagName('ellipse');
	for(var i=0;i< objList.length;i++){
			var ellipse = objList.item(i);
			var type = ellipse.getAttribute('type');
			if(type=='InitialActionCell'){
					var element = new initAction();
					element.id=ellipse.getAttribute('id');
					element.parent=this;
					element.type=ellipse.getAttribute('type');
					element.x=ellipse.getAttribute('x');
					element.y=ellipse.getAttribute('y');
					element.width=ellipse.getAttribute('width');
					element.height=ellipse.getAttribute('height');
					this.elements[element.id]=element;
			}
	}
	//环节初始
	objList = this.svgDoc.getElementsByTagName('rect');
	for(var i=0;i< objList.length;i++){
			var rect = objList.item(i);
			var type = rect.getAttribute('type');
			var element = null;
			if(type=='StepCell'){
					element = new svgStep();
					element.id=rect.getAttribute('id');
					this.steps[element.id]=element;
			}else if(type=='SplitCell'){
					element = new svgSplit();
					element.id=rect.getAttribute('id');
					this.splits[element.id]=element;
			}else if(type=='JoinCell'){
					element = new svgJoin();
					element.id=rect.getAttribute('id');
					this.joins[element.id]=element;
			}
			element.parent=this;
			element.type=rect.getAttribute('type');
			element.x=rect.getAttribute('x');
			element.y=rect.getAttribute('y');
			element.width=rect.getAttribute('width');
			element.height=rect.getAttribute('height');
			this.elements[element.id]=element;
	};
	
	//关联初始
	var edageList = this.svgDoc.getElementsByTagName('g').item(0).getElementsByTagName('path');
	//this.edages=edageList;
	for(var i=0;i<edageList.length;i++){
			var path = edageList.item(i);
			var edage=new svgEdage();
			edage.parent=this;
			edage.id=path.getAttribute('id');
			edage.path=path.getAttribute('d');
			var fromE = path.getAttribute('from');
			var toE=path.getAttribute('to');
			edage.connect(this.elements[fromE],this.elements[toE]);
			this.edages[edage.id]=edage;
	}
};
svgWorkflow.prototype.showAllPath=function(edageIds){
	if(edageIds==null){
		return;
	}
	var arr = edageIds.split(',');
	var path='';
	for(var i=0;i<arr.length;i++){
		var edage=this.edages[arr[i]];
		if(typeof(edage)!='undefined'){
			path=path+(edage.path).replace('M',' ');
		}
	}
	path='M'+path;
	this.showMovie(path);
}
//显示移动
svgWorkflow.prototype.showMovie=function(moviePath){
	var svgDoc = this.svgDoc;
	var root = svgDoc.getElementsByTagName('g').item(0);
	for(var i=0;i<8;i++){
			var s = (i+1)*0.5+"s";
			var dur=moviePath.length/6+"s";
			
			var eclipse=svgDoc.createElement("ellipse");
			eclipse.setAttribute('rx','3');
			eclipse.setAttribute('ry','1');
			eclipse.setAttribute('style','fill:red;stroke:#000000;visibility:hidden');
			eclipse.setAttribute('cx','0');
			eclipse.setAttribute('cy','0');
			var animateMotion=svgDoc.createElement("animateMotion");
			animateMotion.setAttribute('dur',dur);
			animateMotion.setAttribute('rotate','auto');			
			animateMotion.setAttribute('repeatCount','indefinite');
			animateMotion.setAttribute('style','fill:freeze;');
			animateMotion.setAttribute('begin',s);
			animateMotion.setAttribute('path',moviePath);
			animateMotion.setAttribute('calcMode','paced');

			var set=svgDoc.createElement("set");
			set.setAttribute('attributeName','visibility');
			set.setAttribute('to','visible');
			set.setAttribute('begin',s);
			

			eclipse.appendChild(animateMotion);
			eclipse.appendChild(set);
			root.appendChild(eclipse);
	}
	
}

//环节
function initAction(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//环节
function svgStep(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//拆分
function svgSplit(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//合并
function svgJoin(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//连线
function svgEdage(){
	this.id="";
	this.path="";
	this.parent=undefined;
	this.from=undefined;
	this.to=undefined;
}

//连接
svgEdage.prototype.connect=function(elementFrom,elementTo){
	this.from=elementFrom;
	this.to=elementTo;

	if(typeof(elementFrom) != 'undefined'){
		elementFrom.outActions[this.id]=this;
	}
	if(typeof(elementTo) != 'undefined'){
		elementTo.inActions[this.id]=this;
	}
}
