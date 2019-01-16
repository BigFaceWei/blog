function svgWorkflow(){
	this.svgDoc = undefined;
	this.elements=new Array();
	this.steps=new Array();
	this.splits=new Array();
	this.joins=new Array();
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
	for(var i=0;i<edageList.length;i++){
			var path = edageList.item(i);
			var edage=new svgEdage();
			edage.parent=this;
			edage.id=path.getAttribute('id');
			edage.path=path.getAttribute('d');
			var fromE = path.getAttribute('from');
			var toE=path.getAttribute('to');
			edage.connect(this.elements[fromE],this.elements[toE]);
	}
};
svgWorkflow.prototype.showAllPath=function(allElementIds){
	if(allElementIds==null){
		return;
	}
	var arr = allElementIds.split(',');
	for(var i=0;i<arr.length;i++){
		this.showPath(arr[i],allElementIds);
	}
}
//显示移动
svgWorkflow.prototype.showPath=function(toElementId,allElementIds){
		var toElement=this.elements[toElementId];
		if(typeof(toElement)=='undefined'){
				return;
		}
		for(var i=0;i<toElement.inActions.length;i++){
				var edage = toElement.inActions[i];
				if(typeof(edage)!='undefined'){
					var fromElement = edage.from;
					if(typeof(fromElement)!='undefined'){
						var fromId = fromElement.id;
						if(fromElement.type=='JoinCell'){
							edage.showMovie();
							this.showPath(fromId,allElementIds);
						}else if(fromElement.type=='SplitCell'){
							edage.showMovie();
							this.showPath(fromId,allElementIds);
						}else if(fromElement.type=='InitialActionCell'){
							edage.showMovie();
						}else{
							var tempId=','+fromId+',';
							var tempAllId=','+allElementIds+',';
							if(tempAllId.indexOf(tempId)>=0){
								edage.showMovie();
							}
						}
					}
				}
		}
};
//增加单击事件


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
svgEdage.prototype.showMovie=function(){
	var svgDoc = this.parent.svgDoc;
	var root = svgDoc.getElementsByTagName('g').item(0);
	for(var i=0;i<2;i++){
			var s = (i+1)*0.5+"s";
			var eclipse=svgDoc.createElement("ellipse");
			eclipse.setAttribute('rx','3');
			eclipse.setAttribute('ry','1');
			eclipse.setAttribute('style','fill:red;stroke:#000000;visibility:hidden');
			eclipse.setAttribute('cx','0');
			eclipse.setAttribute('cy','0');

			var animateMotion=svgDoc.createElement("animateMotion");
			animateMotion.setAttribute('dur','3s');
			animateMotion.setAttribute('rotate','auto');			
			animateMotion.setAttribute('repeatCount','indefinite');
			animateMotion.setAttribute('style','fill:freeze;');
			animateMotion.setAttribute('begin',s);
			animateMotion.setAttribute('path',this.path);
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var SVGDeskTop=function(){
	this.divId="SVGMapDiv";
	this.id="SvgDeskTop";
	this.name=this.id;
	this.type="image/svg+xml";
	this.pluginspage="http://www.adobe.com/svg/viewer/install/";
	this.src="";
	this.width=800;
	this.height=600;
	this.zoomstep=100;
	this.embed=undefined;
}
//重绘
SVGDeskTop.prototype.drawUI=function(){
	var div = document.getElementById(this.divId);
	if(div==null || typeof(div)=='undefined'){
		alert("div："+this.divId+"不存在.");
		return;
	}
	
	if(typeof(this.embed)=='undefined'){
		this.embed = document.createElement("embed");
		div.appendChild(this.embed);
	}
	this.embed.setAttribute('id',this.id);
	this.embed.setAttribute('name',this.name);
	this.embed.setAttribute('type',this.type);
	this.embed.setAttribute('pluginspage',this.pluginspage);
	this.embed.setAttribute('src',this.src);
	this.embed.setAttribute('width',""+this.width);
	this.embed.setAttribute('height',this.height);
}
//放大
SVGDeskTop.prototype.zoomOut=function(){
	this.width=this.width+this.zoomstep;
	this.heigth=this.heigth+this.zoomstep;
	deskTop.drawUI();
}
//还原
SVGDeskTop.prototype.defaultSize  =function(){
	this.width=800;
	this.heigth=600;
	deskTop.drawUI();
}
//缩小
SVGDeskTop.prototype.shrink  =function(){
	this.width=this.width-this.zoomstep;
	this.heigth=this.heigth-this.zoomstep;
	deskTop.drawUI();
}
//清空
SVGDeskTop.prototype.clear=function(){
	this.id="SvgDeskTop";
	this.name=this.id;
	this.type="image/svg+xml";
	this.pluginspage="http://www.adobe.com/svg/viewer/install/";
	this.src="";
	this.width=800;
	this.height=600;
	this.zoomstep=100;
	this.embed=undefined;
}
//重载新的SVG
SVGDeskTop.prototype.reload=function(containId,svgurl){
	this.clear();
	this.divId=containId;
	this.src=svgurl;
	this.drawUI();
}

var deskTop;
function initsvg(containId,svgurl){
		deskTop = new SVGDeskTop();
		deskTop.reload(containId,svgurl);
	
}