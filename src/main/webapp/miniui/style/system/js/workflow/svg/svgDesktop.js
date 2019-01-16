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
//�ػ�
SVGDeskTop.prototype.drawUI=function(){
	var div = document.getElementById(this.divId);
	if(div==null || typeof(div)=='undefined'){
		alert("div��"+this.divId+"������.");
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
	this.embed.setAttribute('height',""+this.height);
}
//�Ŵ�
SVGDeskTop.prototype.zoomOut=function(){
	this.width=this.width+this.zoomstep;
	this.heigth=this.heigth+this.zoomstep;
	deskTop.drawUI('map');
}
//��ԭ
SVGDeskTop.prototype.defaultSize  =function(){
	this.width=800;
	this.heigth=600;
	deskTop.drawUI('map');
}
//��С
SVGDeskTop.prototype.shrink  =function(){
	this.width=this.width-this.zoomstep;
	this.heigth=this.heigth-this.zoomstep;
	deskTop.drawUI('map');
}
//���
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
//�����µ�SVG
SVGDeskTop.prototype.reload=function(svgurl){
	this.clear();
	this.src=svgurl;
	this.drawUI();
}