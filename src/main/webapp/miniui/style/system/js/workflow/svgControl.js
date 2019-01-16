
function svgWorkflow(){
	this.svgDoc = undefined;
	this.elements=new Array();
	this.steps=new Array();
	this.splits=new Array();
	this.joins=new Array();
}
//����
svgWorkflow.prototype.init=function(obj){
	this.svgDoc = obj.getSVGDocument();
	//��ʼ����
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
	//���ڳ�ʼ
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
	
	//������ʼ
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
//��ʾ�ƶ�
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

//����
function initAction(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//����
function svgStep(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//���
function svgSplit(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//�ϲ�
function svgJoin(){
	this.id="";
	this.name="";
	this.type="";
	this.text="";
	this.parent=undefined;
	this.outActions=new Array();
	this.inActions=new Array();
}
//����
function svgEdage(){
	this.id="";
	this.path="";
	this.parent=undefined;
	this.from=undefined;
	this.to=undefined;
}

//����
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
	for(var i=0;i<3;i++){
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