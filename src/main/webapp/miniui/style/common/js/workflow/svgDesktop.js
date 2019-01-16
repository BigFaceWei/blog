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
	this.embed.setAttribute('height',""+this.height);
}
//放大
SVGDeskTop.prototype.zoomOut=function(){
	this.width=this.width+this.zoomstep;
	this.heigth=this.heigth+this.zoomstep;
	deskTop.drawUI('map');
}
//还原
SVGDeskTop.prototype.defaultSize  =function(){
	this.width=800;
	this.heigth=600;
	deskTop.drawUI('map');
}
//缩小
SVGDeskTop.prototype.shrink  =function(){
	this.width=this.width-this.zoomstep;
	this.heigth=this.heigth-this.zoomstep;
	deskTop.drawUI('map');
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
SVGDeskTop.prototype.reload=function(svgurl){
	this.clear();
	this.src=svgurl;
	this.drawUI();
}