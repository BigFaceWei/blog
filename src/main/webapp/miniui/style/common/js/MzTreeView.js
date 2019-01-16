//Version: 1.2
//20:31 2007-8-25 http://www.lxasp.com
//Ϊ���ڴ�������ʱ��ʡ�ı���С���޸��˽ӿڣ���ע���Сд����
//
//ԭ���� nodes["pnt_cur"]="text:�������;method:js����()";
//
//��Ϊ�� N["pnt_cur"]="T:�������;C:js����()";

//MzTreeView1.0��ҳ����, ��ʵ������ʱ�����ʵ�������������ݽ���
function MzTreeView(Tname)
{
  if(typeof(Tname) != "string" || Tname == "")
    throw(new Error(-1, '������ʵ����ʱ�������ʵ�������ñ��������ݽ�����'));
  
  //��property��
  this.url      = "#";
  this.target   = "_self";
  this.name     = Tname;
  this.wordLine = false;
  this.currentNode = null;
  this.useArrow = true;
  this.N = {};
  this.node  = {};
  this.names = "";
  this._d    = "\x0f";
  this.index = 0;
  this.divider   = "_";
  this.rootId = "";
  this.isSaveCookie = false;
  this.needClickFirstNode = false;
  this.isrow = false;
  this.imgpath = "";
  this.imgfield = "";
  this.objectparm = "";
  this.colors   =
  {
    "highLight" : "#9c9c9c",
    "highLightText" : "#000000",
    "mouseOverBgColor" : "#D4D0C8"
  };
  this.icons    = {
    L0        : 'L0.gif',  //��
    L1        : 'L1.gif',  //��
    L2        : 'L2.gif',  //��
    L3        : 'L3.gif',  //��
    L4        : 'L4.gif',  //��
    PM0       : 'P0.gif',  //����
    PM1       : 'P1.gif',  //����
    PM2       : 'P2.gif',  //����
    PM3       : 'P3.gif',  //����
    empty     : 'L5.gif',     //�հ�ͼ
    root      : 'root.gif',   //ȱʡ�ĸ��ڵ�ͼ��
    folder    : 'folder.gif', //ȱʡ���ļ���ͼ��
    file      : 'file.gif',   //ȱʡ���ļ�ͼ��
    exit      : 'exit.gif'
  };
  this.iconsExpand = {  //��Žڵ�ͼƬ��չ��ʱ�Ķ�ӦͼƬ
    PM0       : 'M0.gif',     //����
    PM1       : 'M1.gif',     //����
    PM2       : 'M2.gif',     //����
    PM3       : 'M3.gif',     //����
    folder    : 'fopen.gif',

    exit      : 'exit.gif'
  };

  //��չ document.getElementById(id) �������������
  //id Ҫ���ҵĶ��� id
  this.getElementById = function(id)
  {
    if (typeof(id) != "string" || id == "") return null;
    if (document.getElementById) return document.getElementById(id);
    if (document.all) return document.all(id);
    try {return eval(id);} catch(e){ return null;}
  };

  //MzTreeView ��ʼ����ں���
  this.toString = function()
  {
    this.browserCheck();
    this.dataFormat();
    this.setStyle();
    //this.load("0");
    
  this.node["0"] =
  {
    "id": "", //"id": "0",
    "path": this.rootId,// "path": "0",
    "isLoad": false,
    "childNodes": [],
    "childAppend": "",
    "sourceIndex": this.rootId,//"sourceIndex": "0"
    "isleaf": ""//add by dengyu   -- source in "leafnode"
  };   

    this.load("0");
    
	//alert( this.node["0"])
    var rootCN = this.node["0"].childNodes;
    
    
    var str = "<A id='"+ this.name +"_RootLink' href='#' style='DISPLAY: none'></A>";
    

    
	
    if(rootCN.length>0)
    {
    
      this.node["0"].hasChild = true;
		
		
      
      for(var i=0; i<rootCN.length; i++)
      	
      	
      str += this.nodeToHTML(rootCN[i], i==rootCN.length-1,-1);
        
        
      setTimeout(this.name +".expand('"+ rootCN[0].id +"', true); "+ 
        this.name +".focusClientNode('"+ rootCN[0].id +"'); ",10);
      
      //�۽���һ���ڵ㣬������һ��
      if(this.needClickFirstNode){
	      var firstRealNode = this.node["0"].childNodes[0].sourceIndex.split("_")[1];
	      this.focus(firstRealNode);
	  	  this.Click(firstRealNode);
      }
    }

    if (this.useArrow)  //ʹ�÷����������ת���ϼ��¼������Ӽ��ڵ�
    {
      if (document.attachEvent)
          document.attachEvent("onkeydown", this.onkeydown);
      else if (document.addEventListener)
          document.addEventListener('keydown', this.onkeydown, false);
    }
    //��ȡcookie�д�ŵ���Ϣ���Ա㱣������ԭ����״̬
    if(getcookie('mzTreeCookie')!=null){
    	var cookieInfo=getcookie('mzTreeCookie');//�õ���ǰ�ڵ��id
    	var info=cookieInfo.split("_");
    	//��ǰ�ڵ�sourceInfoId(�۽�,������id����)_��ǰ�ڵ�id��path��չ��·����
    	var path_now = this.getPath(info[1]);
    	var path_parent = this.getPath(info[0]);
    	//�����༭�������ǰ�ڵ��ҵ����Ͷ�λ����ǰ�Ľڵ�
    	//ɾ�����Ҳ������Ͷ�λ�������ڵ㣬���ǲ���˫����
    	//����һ���½ڵ㣺�Ҳ�������λ�����ڵ㲢�򿪣����ã������ܴ򿪵�ǰ�ڵ�
    	if(path_now[0]==this.rootId){
    		this.focus(info[1]);
    		this.Click(info[1]);//ʵ��������
    		//setTimeout(this.name +".expand('"+ info[2] +"', true); ",50);//չ��
    		for(i=2; i<info.length; i++){//չ��
    			setTimeout("tree.expand('"+info[i]+"', true);",50);//չ��
    			}
    	}
    	//����Ҳ�����ǰ�ڵ㣬����һ��ڵ�
    	else if(path_parent[0]==this.rootId){
    		this.focus(info[0]);
    		this.Click(info[0]);//ʵ��������
    		for(i=2; i<info.length; i++){//չ��
    			setTimeout("tree.expand('"+info[i]+"', true);",50);//չ��
    			}
    	}
    }
    return "<DIV class='MzTreeView' "+
      "onclick='"+ this.name +".clickHandle(event)' "+
      "ondblclick='"+ this.name +".dblClickHandle(event)' "+
      ">"+ str +"</DIV>";
  };
	
  this.onkeydown= function(e)
  {
    e = window.event || e; var key = e.keyCode || e.which;
    switch(key)
    {
      case 37 : eval(Tname).upperNode(); break;  //Arrow left, shrink child node
      case 38 : eval(Tname).pervNode();  break;  //Arrow up
      case 39 : eval(Tname).lowerNode(); break;  //Arrow right, expand child node
      case 40 : eval(Tname).nextNode();  break;  //Arrow down
    }
  };
};

//��������ͼ��汾���
MzTreeView.prototype.browserCheck = function()
{
  var ua = window.navigator.userAgent.toLowerCase(), bname;
  if(/msie/i.test(ua))
  {
    this.navigator = /opera/i.test(ua) ? "opera" : "";
    if(!this.navigator) this.navigator = "msie";
  }
  else if(/gecko/i.test(ua))
  {
    var vendor = window.navigator.vendor.toLowerCase();
    if(vendor == "firefox") this.navigator = "firefox";
    else if(vendor == "netscape") this.navigator = "netscape";
    else if(vendor == "") this.navigator = "mozilla";
  }
  else this.navigator = "msie";
  if(window.opera) this.wordLine = false;
};

//�� TreeView ��������ʽ����
MzTreeView.prototype.setStyle = function()
{
  /*
    width: 16px; \
    height: 16px; \
    width: 20px; \
    height: 20px; \
  */
  var style = "<style>"+
  "DIV.MzTreeView DIV IMG{border: 0px solid #FFFFFF;}"+
  "DIV.MzTreeView DIV SPAN IMG{border: 0px solid #FFFFFF;}";
  if(this.wordLine)
  {
    style +="\n    DIV.MzTreeView DIV\n    {\n      height: 20px;"+
      (this.navigator=="firefox" ? "line-height: 20px;" : "" ) +
      (this.navigator=="netscape" ? "" : "overflow: hidden;" ) +"\n    }\n    DIV.MzTreeView DIV SPAN\n    {\n      vertical-align: middle; font-size: 21px; height: 20px; color: #D4D0C8; cursor: default;\n    }\n    DIV.MzTreeView DIV SPAN.pm\n    {\n      width: "+ (this.navigator=="msie"||this.navigator=="opera" ? "11" : "9") +"px;\n      height: "+ (this.navigator=="netscape"?"9":(this.navigator=="firefox"?"10":"11")) +"px;\n      font-size: 7pt;\n      overflow: hidden;\n      margin-left: -16px;\n      margin-right: 5px;\n      color: #000080; \n      vertical-align: middle;\n      border: 1px solid #D4D0C8;\n      cursor: "+ (this.navigator=="msie" ? "hand" : "pointer") +";\n      padding: 0 2px 0 2px;\n      text-align: center;\n      background-color: #F0F0F0;\n    }";
  }
  style += "<\/style>";
  document.write(style);
};

//�����ڵ�Ϊ�յ�ʱ�����Ĵ���
MzTreeView.prototype.atRootIsEmpty = function()
{

	
  var RCN = this.node["0"].childNodes;
  


  for(var i=0; i<RCN.length; i++)
  {
    if(!RCN[i].isLoad) {
    	
    	
    	this.expand(RCN[i].id);
    	
    }
    if (RCN[i].T=="")
    {
      var node = RCN[i].childNodes[0], HCN  = node.hasChild;
      if(this.wordLine)
      {
        var span = this.getElementById(this.name +"_tree_"+ node.id);
        span = span.childNodes[0].childNodes[0].childNodes[0];
        span.innerHTML = RCN[i].childNodes.length>1 ? "��" : "��";
        
      }
      else
      {
        node.iconExpand  =  RCN[i].childNodes.length>1 ? HCN ? "PM0" : "L0" : HCN ? "PM3" : "L3";
        this.getElementById(this.name +"_expand_"+ node.id).src = this.icons[node.iconExpand].src;
      }
    }
  }
};

//��ʼ������Դ��������Ա����Ŀ��ټ���
MzTreeView.prototype.dataFormat = function()
{
  var a = new Array();
  for (var id in this.N) a[a.length] = id;
  this.names = a.join(this._d + this._d);
  this.totalNode = a.length; a = null;
};

//������Դ������������ݽڵ�
//id  �ͻ��˽ڵ��Ӧ��id
MzTreeView.prototype.load = function(id)
{
  var node = this.node[id], d = this.divider, _d = this._d;
  var sid = node.sourceIndex.substr(node.sourceIndex.indexOf(d) + d.length);
  var reg = new RegExp("(^|"+_d+")"+ sid +d+"[^"+_d+d +"]+("+_d+"|$)", "g");
  var cns = this.names.match(reg), tcn = this.node[id].childNodes; if (cns){
  reg = new RegExp(_d, "g"); for (var i=0; i<cns.length; i++)
  tcn[tcn.length] = this.nodeInit(cns[i].replace(reg, ""), id); }
  node.isLoad = true;
};

//��ʼ���ڵ���Ϣ, ���� this.N ����Դ���ɽڵ����ϸ��Ϣ
//sourceIndex ����Դ�еĸ��ӽڵ���ϵ��ַ��� 0_1
//parentId    ��ǰ���ڵ��ڿͻ��˵ĸ��ڵ�� id
MzTreeView.prototype.nodeInit = function(sourceIndex, parentId)
{

  this.index++;
  var source= this.N[sourceIndex], d = this.divider;
  var T  = this.getAttribute(source, "T");

  var hint  = this.getAttribute(source, "hint");

  var ctrl = this.getAttribute(source, "ctrl");       //Rexliu modify on 2007-1-23 13:50
  var checked = this.getAttribute(source, "checked"); //Rexliu modifty on 2007-1-23 14:27

  var leaf =  this.getAttribute(source, "leafnode");
  
  var sid   = sourceIndex.substr(sourceIndex.indexOf(d) + d.length);
  this.node[this.index] =
  {
    "id"    : this.index,
    "T"  : T,
    "hint"  : hint ? hint : T,
    "icon"  : this.getAttribute(source, "icon"),
    "path"  : this.node[parentId].path + d + this.index,
    "isLoad": false,
    "isExpand": false,
    "parentId": parentId, 
    "parentNode": this.node[parentId],
    "sourceIndex" : sourceIndex,
    "childAppend" : "",
    "ctrl" : ctrl,        //Rexliu modify on 2007-1-23 13:52
    "checked" : checked,   //Rexliu modify on 2007-1-23 14:28
    
    "isleaf" : leaf //add by dengyu
  };
     this.N[sourceIndex] = "index:"+ this.index +";"+ source;
     this.node[this.index].hasChild = this.names.indexOf(this._d + sid + d)>-1;
  if(this.node[this.index].hasChild)  this.node[this.index].childNodes = [];
  return this.node[this.index];
};

//��XML��ʽ�ַ�������ȡ��Ϣ
//source ����Դ��Ľڵ���Ϣ�ַ���(�Ժ������չ��XML��֧��)
//name   Ҫ��ȡ��������
MzTreeView.prototype.getAttribute = function(source, name)
{
  var reg = new RegExp("(^|;|\\s)"+ name +"\\s*:\\s*([^;]*)(\\s|;|$)", "i");
  if (reg.test(source)) {
  	var a = RegExp.$2.replace(/[\x0f]/g, ";"). replace(new RegExp("��","g"),";");  
  	return a; 
  }
  else {
  	return "";
  }
};

//���ݽڵ����ϸ��Ϣ����HTML
//node   ���ڿͻ��˵Ľڵ����
//AtEnd  ����ֵ  ��ǰҪת��������ڵ��Ƿ�Ϊ���ڵ���ӽڵ㼯�е����һ��
MzTreeView.prototype.nodeToHTML = function(node, AtEnd, idx)
{
	

  var source = this.N[node.sourceIndex];
  var target = this.getAttribute(source, "target");
  var data = this.getAttribute(source, "data");
  var url  = this.getAttribute(source, "url");
  if(!url) url = this.url;
  if(data) url += (url.indexOf("?")==-1?"?":"&") + data;
  if(!target) target = this.target;

  var id   = node.id;
  var HCN  = node.hasChild, isRoot = node.parentId=="0";
  if(isRoot && node.icon=="") node.icon = "root";
  if(node.icon=="" || typeof(this.icons[node.icon])=="undefined")
    node.icon = HCN ? "folder" : "file";
  node.iconExpand  = AtEnd ? "��" : "��";
  
  //add by dengyu  �޸Ľڵ�ͼ�� ��Ҫ���ڻ����û���������ʾ
  if(node.icon != "root") {
  	if(node.isleaf != "") {
		if(node.isleaf == "0") {
  			node.icon = "folder";
  		}
  	}
  }
  
  //20:03 2007-8-25 ���Լ��Զ����HTML���ÿһ����Ǳ�ͷ���֣����ⲿ���巽�����£�
  //var MzTreeViewTH="<table class='MzTreeViewRow'><tr><td class='MzTreeViewCell0'>";
  var HTMTH="";
  try {
  if ( typeof MzTreeViewTH != "undefined" ) HTMTH=MzTreeViewTH;
  } catch(e){}

  var HTML = "<DIV noWrap='True'><NOBR>"+HTMTH;
  if(!isRoot)
  {
    node.childAppend = node.parentNode.childAppend + (AtEnd ? "��" : "��");
    if(this.wordLine)
    {
      HTML += "<SPAN>"+ node.parentNode.childAppend + (AtEnd ? "��" : "��") +"</SPAN>";
      if(HCN) HTML += "<SPAN class='pm' id='"+ this.name +"_expand_"+ id +"'>+</SPAN>";
    }
    else
    {
      node.iconExpand  = HCN ? AtEnd ? "PM2" : "PM1" : AtEnd ? "L2" : "L1";
      HTML += "<SPAN>"+ this.word2image(node.parentNode.childAppend) +"<IMG "+
        "align='absmiddle' id='"+ this.name +"_expand_"+ id +"' "+
        "src='"+ this.icons[node.iconExpand].src +"' style='cursor: "+ (!node.hasChild ? "":
        (this.navigator=="msie"||this.navigator=="opera"? "hand" : "pointer")) +"'></SPAN>";
    }
  }
  
  //ȡ��ǰ�����ⲿID
  var sid = node.sourceIndex.substr(node.sourceIndex.indexOf(this.divider) + this.divider.length);

  //2:06 2007-8-25 ����checkbox�ؼ��������Ƿ�ѡ������
  var HTMCHK="",HTMCHKED="";
  if (node.checked=='true'||node.checked=='1') HTMCHKED="checked='checked'";
  else {
	  //add by liuhy 2011-5-30
	  var checkeds = document.getElementsByName("checkeds");
	  if(checkeds && checkeds[0])
	  {
		  var asource = this.getAttribute(source, "B").split('|');
		  if(checkeds[0].value.indexOf(asource[0]) >= 0) {
			  var arr = checkeds[0].value.split(',');
			  for(i=0; i<arr.length; i++)
			  {
				  if(arr[i] == asource[0])
				  {
					  HTMCHKED="checked='checked'";
				  }
			  }
		  }
	  }
  }
  if( node.ctrl.length > 0 ) HTMCHK = "<input type='checkbox' name='"+ node.ctrl +"' value='"+ sid +
  	"' id='"+ this.name +"_checbox_"+ id +"' alt='"+id+"' style='height:15px;'"+
  	" onclick=\""+ this.name +".checkChild('"+ id +"')\" "+ HTMCHKED +">";				//Rexliu add on 2007-1-23 14:29

  //20:04 2007-8-25 ���Լ��Զ����HTML���ÿһ����ǵ�Ԫ�񲿷֣����ⲿ���巽�����£�
  //var MzTreeViewTD="\"</td><td class='MzTreeViewCell1'>\"+ sid +\"</td></tr></table>\"";
  //ע���ַ�����ʽ��Ҫ��ǰ��ı�ͷ��Ӧ
  var HTMTD="";
  try {
    if ( typeof MzTreeViewTD != "undefined" ) HTMTD=eval(MzTreeViewTD);
  } catch(e){}


//  HTML += "<IMG "+
//    "align='absMiddle' "+
//    "id='"+ this.name +"_icon_"+ id +"' "+
//    "src='"+ this.icons[node.icon].src +"'>" + HTMCHK + "<A "+
//    "class='MzTreeview' hideFocus "+
//    "id='"+ this.name +"_link_"+ id +"' ";

  HTML +=HTMCHK +"<img "+
  "align='absMiddle' "+
  "id='"+ this.name +"_icon_"+ id +"' "+
  " src='"+this.getImg(node,source)+"'>"  //zoulx,update20140305,"this.icons[node.icon].src��Ϊthis.getImg(node,source)"
  
  + "<A "+
  "class='MzTreeview' hideFocus "+
  "id='"+ this.name +"_link_"+ id +"' ";

 if(url != "#")   {
    HTML +=
    "href='"+ url +"' "+
    "target='"+ target +"' ";
 }
 	if(node.hint != "none") {
 		HTML += "title='"+ node.hint +"' ";
 	}
    //HTML += "title='"+ node.hint +"' "+
 	HTML += "onfocus=\""+ this.name +".focusLink('"+ id +"')\" "+
    "onclick=\"return "+ this.name +".nodeClick('"+ id +"')\" ondblclick=\"return "+this.name+".nodedbClick('"+id+"') \">" + ((this.isrow==false||typeof(idx)=="undefined"||idx==-1)?"":idx+".") + node.T +
  "</A>"+ HTMTD +"</NOBR></DIV>";
  if(isRoot && node.T=="") HTML = "";
//    HTML += "onfocus=\""+ this.name +".focusLink('"+ id +"')\" "+
//    "onclick=\"return "+ this.name +".nodeClick('"+ id +"')\" ondblclick=\"return "+this.name+".nodedbClick('"+id+"') \">"+ node.T +
//  "</A>"+ HTMTD +"</NOBR></DIV>";
//  if(isRoot && node.T=="") HTML = "";

  HTML = "\r\n<SPAN id='"+ this.name +"_tree_"+ id +"'>"+ HTML ;
  HTML +="<SPAN style='DISPLAY: none'></SPAN></SPAN>";

	
  return HTML;
  
  
  
};

//��ʹ��ͼƬ��ʱ��� node.childAppend ��ת��
MzTreeView.prototype.word2image = function(word)
{
  var str = "";
  for(var i=0; i<word.length; i++)
  {
    var img = "";
    switch (word.charAt(i))
    {
      case "��" : img = "L4"; break;
      case "��" : img = "L2"; break;
      case "��" : img = "empty"; break;
      case "��" : img = "L1"; break;
      case "��" : img = "L3"; break;
      case "��" : img = "L0"; break;
    }
    if(img!="")
      str += "<IMG align='absMiddle' src='"+ this.icons[img].src +"' height='20'>";
  }
  return str;
};


//��ĳ���ڵ��µ������ӽڵ�ת������ϸ��<HTML>Ԫ�ر��
//id ���Ŀͻ��˽ڵ� id
MzTreeView.prototype.buildNode = function(id)
{
  
  if(this.node[id].hasChild)
  {
    var tcn = this.node[id].childNodes, str = "";
    for (var i=0; i<tcn.length; i++)
      str += this.nodeToHTML(tcn[i], i==tcn.length-1, (i+1));
    var temp = this.getElementById(this.name +"_tree_"+ id).childNodes;
    temp[temp.length-1].innerHTML = str;
    
    var dialogArguments = window.dialogArguments;
    if (typeof(dialogArguments) == "string") {
    var array = dialogArguments.split(",");
        for (var i in this.node) {
            var checkBoxId = this.name + "_checbox_"  + this.node[i].id; //tree_checbox_2
            var checkbox = document.getElementById(checkBoxId);
            if (typeof(checkbox) == "object" && checkbox != null) {
                for(var j=0;j<array.length;j++) {
                    if (checkbox.value == array[j]) {
                        checkbox.checked = true;
                        this.node[i].checked = true;
                        this.expand(this.node[i].id, true);
                    }
                }
            }
        }
    }
  }
};

//�ۼ����ͻ������ɵ�ĳ���ڵ���
//id  �ͻ������ڵ��id
MzTreeView.prototype.focusClientNode      = function(id)
{
 try {

  if(!this.currentNode) this.currentNode=this.node["0"];
  var a = this.getElementById(this.name +"_link_"+ id); if(a){ a.focus();
  var link = this.getElementById(this.name +"_link_"+ this.currentNode.id);
  if(link)with(link.style){color="";   backgroundColor="";}
  with(a.style){color = this.colors.highLightText;
  backgroundColor = this.colors.highLight;}
  this.currentNode= this.node[id];}

 } catch(e){}

};

//����ۼ�������Ľڵ�����ʱ�Ĵ���
//id �ͻ��˽ڵ� id
MzTreeView.prototype.focusLink= function(id)
{
  if(this.currentNode && this.currentNode.id==id) return;
  this.focusClientNode(id);
};

//���չ�����ڵ�Ķ�Ӧ����
MzTreeView.prototype.expand   = function(id, sureExpand)
{



  var node  = this.node[id];
  if(node==null||node=="") return;
  if (sureExpand && node.isExpand) return;
  if (!node.hasChild) return;
  var area  = this.getElementById(this.name +"_tree_"+ id);
  if (area)   area = area.childNodes[area.childNodes.length-1];
  if (area)
  {
    var icon  = this.icons[node.icon];
    var iconE = this.iconsExpand[node.icon];
    var Bool  = node.isExpand = sureExpand || area.style.display == "none";
    var img   = this.getElementById(this.name +"_icon_"+ id);
    
    if (img)  img.src = this.getImgexpand(node,this.N[node.sourceIndex],Bool);
    var exp   = this.icons[node.iconExpand];
    var expE  = this.iconsExpand[node.iconExpand];
    var expand= this.getElementById(this.name +"_expand_"+ id);
    if (expand)
    {
      if(this.wordLine) expand.innerHTML = !Bool ? "+"  : "-";
      else expand.src = !Bool ? exp.src : typeof(expE) =="undefined" ? exp.src  : expE.src;
    }
    if(!Bool && this.currentNode.path.indexOf(node.path)==0 && this.currentNode.id!=id)
    {
      try{this.getElementById(this.name +"_link_"+ id).click();}
      catch(e){this.focusClientNode(id);}
    }
    area.style.display = !Bool ? "none" : "block";//(this.navigator=="netscape" ? "block" : "");

    if(!node.isLoad)
    {
      this.load(id);

      if(node.id=="0") return;

      //���ӽڵ����ʱ, ���û�һ�����ڼ��ص���ʾ���
      if(node.hasChild && node.childNodes.length>200)
      {
        setTimeout(this.name +".buildNode('"+ id +"')", 1);
        var temp = this.getElementById(this.name +"_tree_"+ id).childNodes;
        temp[temp.length-1].innerHTML = "<DIV noWrap><NOBR><SPAN>"+ (this.wordLine ?
        node.childAppend +"��" : this.word2image(node.childAppend +"��")) +"</SPAN>"+
        "<IMG border='0' height='16' align='absmiddle' src='"+this.icons["file"].src+"'>"+
        "<A style='background-Color: "+ this.colors.highLight +"; color: "+
        this.colors.highLightText +"; font-size: 9pt'>���Ժ�...</A></NOBR></DIV>";
      }
      else this.buildNode(id);
    }
  }
};

//�ڵ����ӵ����¼�������
//id �ͻ������ڵ�� id
MzTreeView.prototype.nodeClick = function(id)
{
  var source = this.N[this.node[id].sourceIndex];
  
  this.focusLink(id)
  eval(this.getAttribute(source, "C"));
  //this.expand(id);
  //return !(!this.getAttribute(source, "url") && this.url=="#");
  
};

//add by dengyu in 2008-05-06 ���ӽڵ�����˫���¼�������
MzTreeView.prototype.nodedbClick = function(id)
{
  var source = this.N[this.node[id].sourceIndex];
  this.focusLink(id)
  eval(this.getAttribute(source, "DBC"));
  //return !(!this.getAttribute(source, "url") && this.url=="#");
};



//Ϊ���ϵͳ��ʼ�ۼ�ĳ�ڵ��д�ĺ���, �õ�ĳ�ڵ�������Դ���·��
//sourceId ����Դ��Ľڵ� id
MzTreeView.prototype.getPath= function(sourceId)
{
  
Array.prototype.indexOf = function(item)
  {
    for(var i=0; i<this.length; i++)
    {
      if(this[i]==item) return i;
    }
    return -1;
  };
  var _d = this._d, d = this.divider;
  var A = new Array(), id=sourceId; A[0] = id;
  //while(id!="0" && id!="")//ʹ�á�����0Ҳ������Ϊĳ���ڵ��ǰ���У��޸���Ϊ���޳�÷����bug��������bug
  while(id!=this.rootId)
  {
    var str = "(^|"+_d+")([^"+_d+d+"]+"+d+ id +")("+_d+"|$)";
    if (new RegExp(str).test(this.names))
    {
      id = RegExp.$2.substring(0, RegExp.$2.indexOf(d));
      if(A.indexOf(id)>-1) break;
      A[A.length] = id;
    }
    else break;
  }
  return A.reverse();
};

//��Դ������ָ�� MzTreeView ��ʼ�ۼ���ĳ���ڵ�
//sourceId �ڵ�������Դ��� id
MzTreeView.prototype.focus = function(sourceId, defer)
{
  try {
	

  if (!defer)
  {
    setTimeout(this.name +".focus('"+ sourceId +"', true)", 100);
    return;
  }
  var path = this.getPath(sourceId);
  if(path[0]!=this.rootId)
  {
    alert("�ڵ� "+ sourceId +" û����ȷ�Ĺҿ���Ч���ڵ��ϣ�\r\n"+
      "�ڵ� id ���� = "+ path.join(this.divider));
    return;
  }
  var root = this.node["0"], len = path.length;
  
  for(var i=1; i<len; i++)
  {
    if(root.hasChild)
    {
      var sourceIndex= path[i-1] + this.divider + path[i];
      for (var k=0; k<root.childNodes.length; k++)
      {
        if (root.childNodes[k].sourceIndex == sourceIndex)
        {
          root = root.childNodes[k];
          
          if(i<len - 1) this.expand(root.id, true);
          else this.focusClientNode(root.id);
          break;
        }
      }
    }
  }

  }catch(e){}

};

//���ĵ����¼�������
MzTreeView.prototype.clickHandle = function(e)
{
  e = window.event || e; e = e.srcElement || e.target;
  
  switch(e.tagName)
  {
    case "IMG" :
      if(e.id)
      {
        if(e.id.indexOf(this.name +"_icon_")==0){
	          //���浱ǰ����Ϣ����ǰ�ڵ�sourceindex_��ǰ�ڵ�id·������cookie��,�Ա��ȡ����ԭ����״̬
        	if(this.isSaveCookie){
	          var cookieInfo=this.currentNode.sourceIndex+"_"+this.currentNode.path;
	          savecookie('mzTreeCookie', cookieInfo, '0');
        	}
	          this.focusClientNode(e.id.substr(e.id.lastIndexOf("_") + 1));
          }
        else if (e.id.indexOf(this.name +"_expand_")==0)
          this.expand(e.id.substr(e.id.lastIndexOf("_") + 1));
      }
      break;
    case "A" :
      //���浱ǰ�Ľڵ���Ϣ��cookie�У���ǰ�ڵ�sourceindex_��ǰ�ڵ�id·����
    	if(this.isSaveCookie){
    		var cookieInfo=this.currentNode.sourceIndex+"_"+this.currentNode.path;
    		savecookie('mzTreeCookie', cookieInfo, '0');
    	}
      if(e.id) this.focusClientNode(e.id.substr(e.id.lastIndexOf("_") + 1));
      break;
    case "SPAN" :
      if(e.className=="pm")
        this.expand(e.id.substr(e.id.lastIndexOf("_") + 1));
      break;
    default :
      if(this.navigator=="netscape") e = e.parentNode;
      if(e.tagName=="SPAN" && e.className=="pm")
        this.expand(e.id.substr(e.id.lastIndexOf("_") + 1));
      break;
  }
};

//MzTreeView ˫���¼��Ĵ�����
MzTreeView.prototype.dblClickHandle = function(e)
{
  e = window.event || e; e = e.srcElement || e.target;
  if((e.tagName=="A" || e.tagName=="IMG")&& e.id)
  {
    var id = e.id.substr(e.id.lastIndexOf("_") + 1);
    if(this.node[id].hasChild) this.expand(id);
  }
};

//�ص�����ǰ�ڵ�ĸ���ڵ�
MzTreeView.prototype.upperNode = function()
{
  if(!this.currentNode) return;
  if(this.currentNode.id=="0" || this.currentNode.parentId=="0") return;
  if (this.currentNode.hasChild && this.currentNode.isExpand)
    this.expand(this.currentNode.id, false);
  else this.focusClientNode(this.currentNode.parentId);
};

//չ����ǰ�ڵ㲢
MzTreeView.prototype.lowerNode = function()
{
  if (!this.currentNode) this.currentNode = this.node["0"];
  if (this.currentNode.hasChild)
  {
    if (this.currentNode.isExpand)
      this.focusClientNode(this.currentNode.childNodes[0].id);
    else this.expand(this.currentNode.id, true);
  }
};

//�ۼ�������ǰ�ڵ����һ�ڵ�
MzTreeView.prototype.pervNode = function()
{
try {

  if(!this.currentNode) return; var e = this.currentNode;
  if(e.id=="0") return; var a = this.node[e.parentId].childNodes;
  for(var i=0; i<a.length; i++){if(a[i].id==e.id){if(i>0){e=a[i-1];
  while(e.hasChild){this.expand(e.id, true);
  e = e.childNodes[e.childNodes.length - 1];}
  this.focusClientNode(e.id); return;} else {
  this.focusClientNode(e.parentId); return;}}}
  
}
catch(e) {

}

};

//�ۼ�������ǰ�ڵ����һ�ڵ�
MzTreeView.prototype.nextNode = function()
{
try {

  var e = this.currentNode; if(!e) e = this.node["0"];
  if (e.hasChild){this.expand(e.id, true);
  this.focusClientNode(e.childNodes[0].id); return;}
  while(typeof(e.parentId)!="undefined"){
  var a = this.node[e.parentId].childNodes;
  for(var i=0; i<a.length; i++){ if(a[i].id==e.id){
  if(i<a.length-1){this.focusClientNode(a[i+1].id); return;}
  else e = this.node[e.parentId];}}}
  
}
catch(e) {

}

};

//չ���������нڵ�
MzTreeView.prototype.expandAll = function(prompt)
{
  if (typeof(prompt)=="undefined"){
  	prompt = true;
  }
//  if(this.totalNode>500 && prompt) {   //ע����ԭ��ʹ��check���Ե����б���ѡ�Ľ�㣨�¼���㣩����JS����getCheckNodeIndex("sel")ʱû��
//	  if(confirm("���Ƿ�Ҫֹͣչ��ȫ���ڵ㣿\r\n\r\n�ڵ���࣡չ���ܺ�ʱ"))
//		  return;
//   }
  if(this.node["0"].childNodes.length==0) return;
  
  var e = this.node["0"].childNodes[0];

  var isdo = t = false;
  while(e.id != "0" && e.id != "")
  {
    var p = this.node[e.parentId].childNodes
    var pn = p.length;
    if(p[pn-1].id==e.id && (isdo || !e.hasChild))
    {
    	e=this.node[e.parentId]; 
    	isdo = true;
    }
    else
    {
      if(e.hasChild && !isdo)
      {
        this.expand(e.id, true), t = false;
        for(var i=0; i<e.childNodes.length; i++)
        {
          if(e.childNodes[i].hasChild)
          {
          	e = e.childNodes[i]; 
          	t = true; 
          	break;
          }
        }
        if(!t) isdo = true;
      }
      else
      {
        isdo = false;
        for(var i=0; i<pn; i++)
        {
          if(p[i].id==e.id) 
          {
          	e = p[i+1]; 
          	break;
          }
        }
      }
    }
  }
};

//�������еĽڵ�
//չ���������нڵ�
MzTreeView.prototype.closeAll = function(prompt)
{
  this.expandAll();
  if (typeof(prompt)=="undefined"){
  	prompt = true;
  }
  if(this.totalNode>1000 && prompt) if(
    confirm("���Ƿ�Ҫֹͣ����ȫ���ڵ㣿\r\n\r\n�ڵ���࣡չ���ܺ�ʱ")) return;
  if(this.node["0"].childNodes.length==0) return;
  
  var e = this.node["0"].childNodes[0];

  var isdo = t = false;
  while(e.id != "0" && e.id != "")
  {
    var p = this.node[e.parentId].childNodes
    var pn = p.length;
    if(p[pn-1].id==e.id && (isdo || !e.hasChild))
    {
    	e=this.node[e.parentId]; 
    	isdo = true;
    }
    else
    {
      if(e.hasChild && !isdo &&e.isExpand)
      {
        this.expand(e.id, false), t = false;
        for(var i=0; i<e.childNodes.length; i++)
        {
          if(e.childNodes[i].hasChild)
          {
          	e = e.childNodes[i]; 
          	t = true; 
          	break;
          }
        }
        if(!t) isdo = true;
      }
      else
      {
        isdo = false;
        for(var i=0; i<pn; i++)
        {
          if(p[i].id==e.id) 
          {
          	e = p[i+1]; 
          	break;
          }
        }
      }
    }
  }
  this.expand(this.node["1"].id, true);
};


MzTreeView.prototype.setRootID  = function(rootid)
{
	this.rootId = rootid;
};

//����cookie������ԭ����״̬zmm
MzTreeView.prototype.saveCookie = function()
{
	this.isSaveCookie = true;
};

//�����ĵ�һ���ڵ�㿪
MzTreeView.prototype.clickFirstNode = function()
{
	this.needClickFirstNode = true;
};

//Ϊ�������ر��ͼ�꣬˳��Ϊ ���ڵ�;�ļ���Ŀ¼ͼ��;�ڵ�ͼ��;�򿪵��ļ���ͼ��
MzTreeView.prototype.setSpecialIcon = function(specialicon)
{
	var s = specialicon.split(";");
	
	this.icons["root"] = s[0];
	this.icons["folder"] = s[1];
	this.iconsExpand["folder"] = s[2];
	this.icons["file"] = s[3];
};
//
MzTreeView.prototype.setIsrow = function(isrow){
	this.isrow = (isrow=="true"||isrow==true)?true:false;
};
MzTreeView.prototype.setImg = function(imgpath,imgfield){
	this.imgpath = imgpath;
	this.imgfield = imgfield;
};
MzTreeView.prototype.setObjectparm = function(objectparm){
	this.objectparm = objectparm;
};
var img_index = null;
MzTreeView.prototype.getImg = function(node,source){
	var icon_src = this.icons[node.icon].src;
	//������ͼ��·�������Ҹ��ڵ㣬�ڵ㡢Ҷ�ӽڵ�
	if(this.imgpath.length>0&&(node.icon=="root"||node.icon=="folder"||node.icon=="file")){
		if(img_index==null){
			var aParm = this.objectparm.split(",");
			for(var i=0;i<aParm.length;i++){
				if(aParm[i]==this.imgfield){
					img_index = i;
					break;
				}
			}
			img_index = (img_index==null)?-1:img_index;
		}
		if(img_index>=0){
			var _img = this.getAttribute(source, "B").split('|')[img_index];
			if(_img.length>0){
				icon_src = this.imgpath+"/"+_img;
			}
		}
	}
	return icon_src;
};
MzTreeView.prototype.getImgexpand = function(node,source,bool){
	var icon  = this.icons[node.icon];
	var iconE = this.iconsExpand[node.icon];
	var icon_src = !bool ? icon.src :typeof(iconE)=="undefined" ? icon.src : iconE.src;

	//������ͼ��·�������Ҹ��ڵ㣬�ڵ㡢Ҷ�ӽڵ�
	if(this.imgpath.length>0&&(node.icon=="root"||node.icon=="folder"||node.icon=="file")){
		if(img_index>=0){
			var _img = this.getAttribute(source, "B").split('|')[img_index];
			if(_img.length>0){
				icon_src = this.imgpath+"/"+_img;
			}
		}
	}
	return icon_src;
};
//������Ҫ�ö���ͼƬ�����弰Ԥ�غ���
//path ͼƬ��ŵ�·����
MzTreeView.prototype.setIconPath  = function(path)
{
  var k = 0, d = new Date().getTime();
  for(var i in this.icons)
  {
    var tmp = this.icons[i];
    this.icons[i] = new Image();
    this.icons[i].src = path + tmp;
    if(k==9 && (new Date().getTime()-d)>200)
      this.wordLine = true; k++;
  }
  for(var i in this.iconsExpand)
  {
    var tmp = this.iconsExpand[i];
    this.iconsExpand[i]=new Image();
    this.iconsExpand[i].src = path + tmp;
  }
};

//��������Ĭ������
//url Ĭ������  ��������, ���ʼֵΪ #
MzTreeView.prototype.setURL     = function(url){this.url = url;};

//��������Ĭ�ϵ�Ŀ������ target
//target Ŀ������  ��������, ���ʼֵΪ _self
MzTreeView.prototype.setTarget  = function(target){this.target = target;};

//
//�ô������ⵥ��(�ڲ�����һ�㲻Ҫ�ⲿ����)
//1:27 2007-8-25
MzTreeView.prototype.focusClickNode      = function(id)
{
 try {

  if(!this.currentNode) this.currentNode=this.node["0"];
  var a = this.getElementById(this.name +"_link_"+ id); if(a){ a.focus();
  var link = this.getElementById(this.name +"_link_"+ this.currentNode.id);
  if(link)with(link.style){color="";   backgroundColor="";}
  with(a.style){color = this.colors.highLightText;
  backgroundColor = this.colors.highLight;}
  this.currentNode= this.node[id];
  this.nodeClick(id);
  }

 } catch(e){}

};
//�ô������ⵥ��(����ô˹���)���� tree.Click(2201)
//1:24 2007-8-25
MzTreeView.prototype.Click = function(sourceId, defer)
{
  try {

  if (!defer)
  {
    setTimeout(this.name +".Click('"+ sourceId +"', true)", 100);
    return;
  }
  var path = this.getPath(sourceId);
  if(path[0]!=this.rootId)
  {
    alert("�ڵ� "+ sourceId +" û����ȷ�Ĺҿ���Ч���ڵ��ϣ�\r\n"+
      "�ڵ� id ���� = "+ path.join(this.divider));
    return;
  }
  var root = this.node["0"], len = path.length;
  for(var i=1; i<len; i++)
  {
    if(root.hasChild)
    {
      var sourceIndex= path[i-1] + this.divider + path[i];
      for (var k=0; k<root.childNodes.length; k++)
      {
        if (root.childNodes[k].sourceIndex == sourceIndex)
        {
	        root = root.childNodes[k];
	        if(i<len - 1) this.expand(root.id, true);
	        else this.focusClickNode(root.id);
	        break;
        }
      }
    }
  }

  }catch(e){}
};

//checkbox���������Ӧ����
//REXLIU ADD ON 2007-1-24 15:29
MzTreeView.prototype.checkChild = function(id)
{
	this.selChild(id);
	this.selParent(id);
	
	//add by liuhy
	try {
		var func = eval("chxClicked");
		if(typeof(func) == 'function')
			func(window.event);
	} catch(e) {
		
	}
};

MzTreeView.prototype.selParent = function(id)
{
	var tcn = this.node[id];
	if(tcn.parentId != "0" && tcn.parentId != "")
	{
		var pnode = tcn.parentNode;
		var isChecked = false;
	  for(var i=0; i<pnode.childNodes.length; i++)
	  {
	    //ȡ��CHECKBOX
	    var ckboxID = this.name +"_checbox_"+ pnode.childNodes[i].id;
	   
	    var ckbox = this.getElementById(ckboxID);
	    
	    if(ckbox != null) {
		    if(ckbox.checked)
		    {
		    	isChecked = true;
		    	break;
		    }
	    }
	  }
	  var pckboxid = this.name +"_checbox_"+ pnode.id;
	  var pckbox = this.getElementById(pckboxid);
	  //pckbox.checked = isChecked; // ���Ҷ�ӽڵ�ʱ����Ҫ�Զ�ѡȡ���ڵ� update by dengyu
	  this.selParent(pnode.id);
	}
};

MzTreeView.prototype.selChild = function(id)
{
	var tcn = this.node[id];
	//�����ӽڵ�
	if(tcn.hasChild)
	{
		this.expand(id,true);
	  for(var i=0; i<tcn.childNodes.length; i++)
	  {
	    //ȡ��CHECKBOX
	    var pckboxID = this.name +"_checbox_"+ id;
	    var pckbox  = this.getElementById(pckboxID);
	    //ȡ��CHECKBOX
	    var ckboxID = this.name +"_checbox_"+ this.node[id].childNodes[i].id;
	    var ckbox = this.getElementById(ckboxID);
	    ckbox.checked = pckbox.checked;
	    this.selChild(this.node[id].childNodes[i].id);
	  }
	}
};


// -->

/**
 * ��ȡ��ǰ�ڵ��source��Ϣ
 * add by dengyu in 2008-05-07
 */
function getCurrentNodeSource() {
	var id = tree.currentNode.id;
	//var source = getClickNode (tree.currentNode.id);   //tree.currentNode.sourceIndex
	 var source = tree.N[tree.node[id].sourceIndex];
	
	return source;
}


//source ����Դ��Ľڵ���Ϣ�ַ���(�Ժ������չ��XML��֧��)
//name   Ҫ��ȡ��������
function getAttributeObj(source, name)
{
  var reg = new RegExp("(^|;|\\s)"+ name +"\\s*:\\s*([^;]*)(\\s|;|$)", "i");
  if (reg.test(source)) {
  	var ret = RegExp.$2.replace(/[\x0f]/g, ";").replace(new RegExp("��","g"),";");
  	 return ret;
  }
  else {
  	return "";
  }
};

/**
 * ��ȡ��ǰ�ڵ����Ϣ
 * add by dengyu in 2008-05-07
 **/
function getCurrentNode() {


	/*
 	"id"    : this.index,
    "T"  : T,
    "hint"  : hint ? hint : T,
    "icon"  : this.getAttribute(source, "icon"),
    "path"  : this.node[parentId].path + d + this.index,
    "isLoad": false,
    "isExpand": false,
    "parentId": parentId, 
    "parentNode": this.node[parentId],
    "sourceIndex" : sourceIndex,
    "childAppend" : "",
    "ctrl" : ctrl,        //Rexliu modify on 2007-1-23 13:52
    "checked" : checked,   //Rexliu modify on 2007-1-23 14:28
    
    "isleaf" : leaf //add by dengyu
    */
	var aSourceIndex = tree.currentNode.sourceIndex.split("_");
	var id = aSourceIndex[1];
	var pid = aSourceIndex[0];

	//if(pid == "0") {
		//pid = tree.rootId;
	//}
	
	var test = tree.currentNode.T;
	
	return id+","+test+","+pid
	
}
function getCurrentNodeID() {
	var aSourceIndex = tree.currentNode.sourceIndex.split("_");
	var id = aSourceIndex[1];
	return id;
}
function getCurrentNodeParentID() {
	var aSourceIndex = tree.currentNode.sourceIndex.split("_");
	var id = aSourceIndex[1];
	var pid = aSourceIndex[0];
	/*	
	if(pid == "0") {
		pid = tree.rootId;
	}
	*/
	return pid;
}
function getCurrentNodeText() {
	return tree.currentNode.T;
}

//��ȡcheckbox ѡ�нڵ��value sid���ⲿid��
function getCheckNodeID(chename)
{
	var es=document.getElementsByName(chename);
	var out="";
	var j=0;
	for(var i=0;i<es.length;i++)
	{
		if (es[i].checked) {
			if(j==0) {
				out+= es[i].value;
			}
			else {
				out+= "," + es[i].value;
			}
			
			j++;
		}
	}
	return out;
}

//��ȡcheckbox ѡ�нڵ��index���ⲿid��
function getCheckNodeIndex(chename) {
	var es=document.getElementsByName(chename);
	var out="";
	var j=0;
	for(var i=0;i<es.length;i++)
	{
		if (es[i].checked) {
			
			var array = es[i].alt;
			if(j==0) {
				out+= array;
			}
			else {
				out+= "," + array;
			}
			
			j++;
		}
	}
	return out;

}


/**
 * ��ȡ��ǰ�ڵ���û��Զ��� ���ض�ά����
 * 
 */
function getCurrentNodeClass() {
	
	
	/*if(typeof(document.all("objectparm")) == "undefined") {//firefox�²�֧��
		return;
	}*/
	if(typeof(document.getElementsByName("objectparm"))[0]=="undefined"){//��ȡ������objectparm��Ԫ�������еĵ�һ��
		return;
	}
	var id = tree.currentNode.id;
	var source = tree.N[tree.node[id].sourceIndex];

	
	var strclass;
	var aClass = new Array();
	

	//if (source.indexOf("B:") != -1) {

		var strclass  = getAttributeObj(source, "B");
	

		var aObj = strclass.split("|");
		//var aParm = document.all("objectparm").value.split(",");
		var aParm = document.getElementsByName("objectparm")[0].value.split(",");
		
		
		
		for(var i=0;i<aObj.length;i++) {

			aClass[i] = new Array(); 
			aClass[i][0] = aParm[i];
			if(aObj[i].indexOf('tbp-eomp-for-user2organ-deadloop')!=-1){//�������tbp-eomp-for-user2organ-deadloop�ַ�(Ϊ��֯��������Ա��ѭ���ӵ������ַ�)���滻Ϊ��
				aObj[i]=aObj[i].replace('tbp-eomp-for-user2organ-deadloop','');
			}
			aClass[i][1] = aObj[i];
			
		}
		
	//}
	return aClass
}

function getCurrentNodeClassByIndex(indexid) {
//	if(typeof(document.all("objectparm")) == "undefined") {
//		
//		return;
//	}
	var source = tree.N[tree.node[indexid].sourceIndex];

	var strclass;
	var aClass = new Array();
	

	//if (source.indexOf("B:") != -1) {

		var strclass  = getAttributeObj(source, "B");


		//strclass = source.substring(source.indexOf("B:")+2,source.length);

		var aObj = strclass.split("|");
		//var aParm = document.all("objectparm").value.split(","); 
		var aParm = document.getElementsByName("objectparm")[0].value.split(",");
		
		
		
		for(var i=0;i<aObj.length;i++) {

			aClass[i] = new Array(); 
			aClass[i][0] = aParm[i];
			aClass[i][1] = aObj[i];
			
		}
		
		
	//}
	return aClass
}	


/**
 * ����xml
 */
function   MzXmlDocument()   
{   
    if(document.implementation&&document.implementation.createDocument)   
    {   
        var   doc=document.implementation.createDocument("","",null);   
        doc.addEventListener("load",function(e){this.readyState=4;},false);   
        doc.readyState=4;   return   doc;   
    }   
    else   
    {   
        var   msxmls=["MSXML2","Microsoft","MSXML","MSXML3"];   
        for(var   i=0;i<msxmls.length;i++)   
            try{return   new   ActiveXObject(msxmls[i]+'.DomDocument')}catch(e){}   
        throw   new   Error("Could   not   find   an   installed   XML   parser!");   
    }   
}

function loadXmlString() {

	var   x   =   new   MzXmlDocument();   
	x.async   =   false;   
	x.load("temp.xml");   
	var   nodes   =   x.getElementsByTagName("tr");   
	var   tab   =   document.getElementById("tab");   
	for(var   i=0;   i<nodes.length;   i++)   
	{   
	        var   tr   =   tab.insertRow(tab.rows.length);   
	        var   tds   =   nodes[i].getElementsByTagName("td");   
	        for(var   k=0;   k<tds.length;   k++)   
	        {   
	                var   td   =   tr.insertCell(tr.cells.length);   
	                td.innerHTML   =   document.all   ?   tds[k].text   :   tds[k].textContent;   
	        }   
	}   
}

/**
*
* ����˵�� : ���ִ���cookie��ͨ�ú��� ��ʱ����÷��������״̬ʹ��
* �������� : 2011-02-15
* ʵ    ����
*	<input type="button" value="����cookie" onclick="savecookie('cookiename','xxx','0')" />
*	<input type="button" value="�õ�cookie" onclick="getCk('')" />
*/


/* 
* ����Cookie��ͨ�ú���������name�Ǳ���Ĳ���������Ϊ��ѡ��������������жϡ� 
* ������Cookieʱ�������ù���ʱ�����CookieΪ��ʱ�ģ������˴λỰ���� 
*/ 
function setcookie(name, value, expires, path, domain, secure) { 
	var curcookie = name + "=" + encodeURI(value) 
	+((expires) ? ";expires=" + expires.toGMTString() : "") 
	+((path) ? ";path=" + path : "") 
	+((domain) ? ";domain=" + domain : "") 
	+((secure) ? ";secure" : ""); 
	document.cookie = curcookie; 
} 

//Cookie��д�� ������cookie���֣���Ϣ��ʱ�� time=0��Ĭ�ϵ�ǰ�Ự,cookie�����ڴ���
function savecookie(cookiename,cookieInfo,time) {
	if(time=="0"){
		setcookie(cookiename,cookieInfo);
	}else{
		var now = new Date(); 
		now.setDate( now.getDate() + time);
		setcookie(cookiename,cookieInfo,now); 
	}
} 

//д������Cookie ʵ�������Ա���չ
function writeAllCookie() { 
	document.cookie = "name1=" + encodeURI("a1"); 
	document.cookie = "name2=" + encodeURI("a2"); 
	document.cookie = "name3=" + encodeURI("a3"); 
	var strInfo; 
	var cookie = document.cookie.split(";"); 
	for(var i=0; i<cookie.length; i++) { 
	var ck = cookie[i].split("="); 
	var cName = ck[0]; 
	var cValue = decodeURI(ck[1]); 
	strInfo += cName + "=" + cValue +"<br>"; 
	} 
	document.getElementById("divInfo").innerHTML = strInfo; 
} 

/*
 * ��ȡcookie����
 */
function getcookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(";", len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}



//name=""Ĭ��ȡ��ǰ��
function getCk(name){ 
	alert( getSpecificCookie(name)); 
} 



