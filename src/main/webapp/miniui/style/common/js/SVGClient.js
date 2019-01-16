//------------------����Ϊȫ�ֱ���---------------------------------------------
var svgDoc;         //svg�ĵ�doc����
var svgWin;			//svg����
var svgRoot = null; //svg�ĵ�docElement����
var svgObj = null; //svgGraphic�ڵ�
var svgNS = "http://www.w3.org/2000/svg";//SVG�������ռ�
var xlinkNS="http://www.w3.org/1999/xlink";
var deviceSelectedColor = "blue";     //ѡ���豸��ɫ
var mapType = "sys";                     //fac��ʾһ�ν���ͼ sys��ʾ�������ͼ
var showUserPropertyInfo = 0;          //Ϊ0����ʾ�û��Զ�������,Ϊ1��ʾ�û��Զ�������
var propertyBoxWidth = 190;            //������ʾ����
var propertyBoxHeight = 110;           //������ʾ��߶�
var userPropertyArray = null;          //�û��Զ��������б�
var xmlHttp = null;           //�����Ͷ���
var selectedDevice = new Array() ;
var currentDevice = null;
var svgW,svgH,vbMaxW,vbMaxH;
var vbCX,vbCY,vbCW,vbCH,WAmp,HAmp;
var isMoving;
var orig_x; 
var orig_y; 
var orig_scale; 
var cx;
var cy;

var deviceMap = {   
	    Set : function(key,value){this[key] = value},   
	    Get : function(key){return this[key]},   
	    Contains : function(key){return this.Get(key) == null?false:true},   
	    Remove : function(key){delete this[key]}   
	}  ;

var measMap = {   
	    Set : function(key,value){this[key] = value},   
	    Get : function(key){return this[key]},   
	    Contains : function(key){return this.Get(key) == null?false:true},   
	    Remove : function(key){delete this[key]}   
	}  ;

/***************************�ṩ���õĺ���****************************************/

/**
 * ��ȡ��ǰ�����豸
 * ����ֵ����:�豸Element
 */
function getCurrentDevice()
{
	return currentDevice;
}

/**
 * ��ȡѡ���豸
 * ����ֵ����:�豸Element����
 */
function getSelectedDevice()
{
	return selectedDevice;
}

/**
 * ��ȡѡ���豸ID
 * ����ֵ����:�ַ��� ��ʽ:1,2,3
 */
function getSelectedDeviceID()
{
	var result = "";
	for (var i = 0; i < selectedDevice.length; i++)
	{
		var deviceID = getDeviceID(selectedDevice[i]);
		result = result + deviceID + ",";
	}
	if(result != "")
		result = result.substring(0, result.length-1);
	return result;
}

/**
 * ��ȡѡ���豸����
 * ����ֵ����:�ַ��� ��ʽ:a,b,c
 */
function getSelectedDeviceName()
{
	var result = "";
	for (var i = 0; i < selectedDevice.length; i++)
	{
		var deviceName= getDeviceName(selectedDevice[i]);
		result = result + deviceName + ",";
	}
	result = result.substring(0, result.length-1);
	return result;
}

/**
 * ѡ��ָ���豸
 * ����:�豸Element
 */
function selectDevice(deviceElement)
{
	if(selectedDevice.remove(deviceElement) == true)
		removeDeviceStyle(deviceElement, "stroke");
	else
	{
		setDeviceStyle(deviceElement, "stroke", deviceSelectedColor);
		selectedDevice.push(deviceElement);
	}
	setWinContent();
}

/**
 * ���ѡ���豸
 */
function clearSelect()
{
	for (var i = 0; i < selectedDevice.length; i++)
	{
		removeDeviceStyle(selectedDevice[i], "stroke");
	}
	selectedDevice.length = 0;
	setWinContent();
}

/**
 * �����豸ID��ȡ�豸Element
 * ����:�豸ID
 */
function getDeviceByID(searchDeviceID)
{
	var element = null;
	var svgDevNodeList = svgDoc.getElementsByTagName("g");
	var deviceID = "";
	for (var i = 0; i < svgDevNodeList.length; i++) {
		var deviceElement = svgDevNodeList.item(i);
		deviceID = getDeviceID(deviceElement);
		if (deviceID != "" && deviceID == searchDeviceID) {
			element = deviceElement;
			break;
		}
	}
	return element;
}

/**
 * ��ȡ�豸ID
 * ����:�豸Element
 */
function getDeviceID(deviceElement) {
	
	return getDeviceAttribute(deviceElement, "TObjectID");
}

/**
 * ��ȡ�豸����
 * ����:�豸Element
 */
function getDeviceName(deviceElement) {
	
	return getDeviceAttribute(deviceElement, "TObjectName");
}

/**
 * ��ȡ�豸����
 * ����:�豸Element
 */
function getDeviceType(deviceElement) {
	
	return getDeviceAttribute(deviceElement, "TObjectType");
}

/**
 * ��ȡ�豸��ѹ�ȼ�
 * ����:�豸Element
 */
function getDeviceVolt(deviceElement) {
	
	return getDeviceAttribute(deviceElement, "TObjectVolt");
}

/**
 * �����豸��ʽ
 * ����:�豸Element,��ʽ����,��ʽֵ
 */
function setDeviceStyle(deviceElement, styleName, styleValue) {
	setDeviceStyleEx(getDeviceGraphElement(deviceElement), styleName, styleValue);
}
function setDeviceStyleEx(graphElement, styleName, styleValue) {
	var style = "";
	if(graphElement.hasAttribute("style"))
	{
		style = graphElement.getAttribute("style");
		if(style.length >0 && style.substring(style.length-1) != ";")
			style += ";";
	}
	graphElement.setAttribute("style", style + styleName + ":" + styleValue + ";");
	var nodeList = graphElement.getChildNodes();
	for (var i = 0; i < nodeList.getLength(); i++) {
		var node = nodeList.item(i);
		if (node.getNodeName() != "#text") {
			setDeviceStyleEx(node, styleName, styleValue);
		}
	}
}

/**
 * ɾ���豸��ʽ
 * ����:�豸Element,��ʽ����
 */
function removeDeviceStyle(deviceElement, styleName, styleValue) {
	removeDeviceStyleEx(getDeviceGraphElement(deviceElement), styleName, styleValue);
}
function removeDeviceStyleEx(graphElement, styleName) {
	var style = "";
	if(graphElement.hasAttribute("style"))
	{
		style = graphElement.getAttribute("style");
		var styleBeginIndex = style.indexOf(styleName);
		if(styleBeginIndex != -1)
		{
			var str = style.substring(styleBeginIndex);
			var styleEndIndex = str.indexOf(";");
			style = style.substring(0, styleBeginIndex) + style.substring(styleBeginIndex+styleEndIndex+1);
			graphElement.setAttribute("style", style);
		}
	}
	var nodeList = graphElement.getChildNodes();
	for (var i = 0; i < nodeList.getLength(); i++) {
		var node = nodeList.item(i);
		if (node.getNodeName() != "#text") {
			removeDeviceStyleEx(node, styleName);
		}
	}
}

/**
 * �����豸��˸
 * ����:�豸Element,�Ƿ���˸
 */
function setDeviceFlashing(deviceElement, isFlashing) {
	
	var graphElement = getDeviceGraphElement(deviceElement);
	if(isFlashing == true)
	{
		var element = svgDoc.createElementNS(svgNS, "animate");
		element.setAttribute("attributeName", "opacity");
		element.setAttribute("from", "0");
		element.setAttribute("to", "1");
		element.setAttribute("dur", "0.5s");
		element.setAttribute("repeatCount", "indefinite");
		graphElement.appendChild(element);
	}
	else
	{
		var childNode = graphElement.getChildNodes().item(0);
		if (childNode != null)
			fSvgGraphElement.removeChild(childNode);
	}
}

//��ʼ������SVG����
function initSVG()
{
	try
	{

		//----------����ȫ���ĵ�����------------------
		svgWin = svgbox.window;
		svgDoc = svgbox.getSVGDocument();
		svgRoot = svgDoc.getDocumentElement();	
		svgObj=svgDoc.getElementById("svgGraphic");
		mapType = svgObj.getAttribute("mapType");
		
		orig_x = svgRoot.currentTranslate.x;
		orig_y = svgRoot.currentTranslate.y;
		orig_scale = svgRoot.currentScale;
		
		//���մӷ������˴��͵�����
		//-----------------����SVG�ĵ���������------------
		addListener();             //��ЭͼԪ�豸�¼����������
		initDeviceInfo();
		//initMeasurement();
		addDevicePropertyBox();      //��̬����ͼԪ�豸������ʾ��	   
		//setMeasurementValue();
	
		//------------------------------------------------
		svgW   = parseInt(svgRoot.getAttributeNS(null,"width"));
	svgH   = parseInt(svgRoot.getAttributeNS(null,"height"));
	getCurrentVB();
	vbMaxW = vbCW; 
	vbMaxH = vbCH;
	isMoving = false;
		
	
	}
	catch(e)
	{
		alert(e.description);
	}
}

/**
 * ��ʼ���豸��Ϣ
 */
function initDeviceInfo()
{
	for(var i=0; i<deviceArray.length;i=i+1)
	{
		deviceMap.Set(deviceArray[i].deviceCode, deviceArray[i]);
	}
	
	var svgDevNodeList = svgDoc.getElementsByTagName("g");
	var deviceID = "";
	for (var i = 0; i < svgDevNodeList.length; i++) {
		var deviceElement = svgDevNodeList.item(i);
		deviceID = getDeviceID(deviceElement);
		if (deviceID != "" && deviceMap.Contains(deviceID)) {
			addDeviceAttribute(deviceElement,"TObjectName",deviceMap.Get(deviceID).deviceName);
			addDeviceAttribute(deviceElement,"TObjectType",deviceMap.Get(deviceID).deviceType);
			addDeviceAttribute(deviceElement,"TObjectVolt",deviceMap.Get(deviceID).deviceVolt);
		}
	}
}

/**
 * ��ʼ��ң������
 */
function initMeasurement()
{
	for(var i=0; i<measArray.length;i=i+1)
	{
		measMap.Set(measArray[i].CIMID, measArray[i]);
	}
}

/**
 * ΪSVGͼԪ�豸�����¼����
 */
function addListener()
{
	
	//--------------------����SVGͼԪ�����¼����������������------------------
	svgRoot.addEventListener("click",deviceShapeOnClick,false);	 //����ͼԪ�豸��onclick�¼�������
	svgRoot.addEventListener("mouseover",deviceShapeOnMouseover,false);	 //�豸ͼԪ�豸�������¼�������
	svgRoot.addEventListener("mouseout",deviceShapeOnMouseout,false);	 //�豸ͼԪ�豸����뿪�¼�������
	svgRoot.addEventListener("mousedown",deviceShapeOnMousedown,false);	 //�豸ͼԪ�豸�������¼�������
	svgRoot.addEventListener("mouseup",deviceShapeOnMouseup,false);
	svgRoot.addEventListener("mousemove",deviceShapeOnMousemove,false);
  	
	var svgTextNodeList = svgDoc.getElementsByTagName("text");
	for (var i = 0; i < svgTextNodeList.length; i++) {
		var textElement = svgTextNodeList.item(i);
		textElement.setAttribute("pointer-events", "none");
	}

}



//------------------------------ͼԪ�¼�������-------------------------------------------------
//ͼԪOnClick�¼�������
function deviceShapeOnClick(evt)
{
	var deviceElement = evt.target.parentNode;
	var deviceID = getDeviceID(deviceElement);
	var svgFile = getHref(deviceElement);
	if(mapType == "sys" && svgFile!="" && evt.detail==2)
	{
		if(selectedDevice.remove(deviceElement) == true)
			removeDeviceStyle(deviceElement, "stroke");
		setWinContent();
		var stationid = getDeviceID(deviceElement);
		if(stationid != "")
		{
			var stationname = getDeviceName(deviceElement);
			var url = "viewsvg.jsp?id="+stationid+"&file="+encodeURIComponent(svgFile);
			if(top.urlhistory === undefined)
				window.open(url);
			else
				top.urlhistory.addhistory(url,stationname,stationid);
		}
		else
			alert(svgFile+"������!");
	}
	else if (evt.button == 0 && deviceID != "")
	{
		selectDevice(deviceElement);
		
	}
}

//ͼԪ�豸Mouseover(������)�¼�������
function deviceShapeOnMouseover(evt)
{
	  try
      {
		  if(isMoving == true)
		 		return;
		    var deviceElement = evt.target.parentNode;
		    var deviceID = getDeviceID(deviceElement);
		    if (deviceID != "")
		    {
				showDevicePropertyInfo(deviceElement,evt);            //ͨ���豸���Կ���ʾ�豸��Ϣ
		    }
		    /*
		    else if (deviceType == "Text")
				showMeasurePropertyInfo(evt);
			*/
	  }
      catch(e)
      {
      		alert(e.description);
      }
}

//ͼԪ�豸Mouseout(����뿪)�¼�������
function deviceShapeOnMouseout(evt)
{
	 try
     {
		    var deviceElement = evt.target.parentNode;
			var deviceID = getDeviceID(deviceElement);
			if (deviceID != "")
				hideDevicePropertyInfo(evt);
	 }
	 catch(e)
	 {}
}

function deviceShapeOnMousedown(evt)
{
	var deviceElement = evt.target.parentNode;
	if(evt.button == 0)
	{
		var scale = svgRoot.currentScale;
		cx=evt.clientX;
	    cy=evt.clientY
		isMoving = true;
	}
	else if(evt.button == 2)
	{
		var deviceID = getDeviceID(deviceElement);
		var getUrl;
		
		if(deviceID != "")
		{
			currentDevice = deviceElement;
		}
		
		if(deviceID != "" && deviceMap.Contains(deviceID))
			getUrl = "svgmenu.jsp?devicetype="+deviceMap.Get(deviceID).deviceType;
		else
			getUrl = "svgmenu.jsp?devicetype=Default";


		var isSync = false;
		try 
		{
	  		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) 
		{
	  		try 
	  		{
	    		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	  		} 
	  		catch (ex) 
	  		{
	    		xmlHttp = null;
	  		}
		}
		
		if ((xmlHttp == null) && (typeof XMLHttpRequest != 'undefined')) 
		{
	  		xmlHttp = new XMLHttpRequest();
		}
	    
	    if(xmlHttp != null)
	    {
	        xmlHttp.open("GET",getUrl, isSync);
	    	xmlHttp.onreadystatechange = fileLoaded;
	        try
	        {
	        	xmlHttp.send(null);
			}
			catch(e)
			{
				alert("������������ݽ�������,�����Ƿ�������ȷ���ݽ����ӿ����ƣ�");
			}
	    }
	    else
	    {
	    	alert("����������汾̫��,��������IE6.0�����ϰ汾��");
	    }
	}
}

function deviceShapeOnMousemove(evt)
{
	if(isMoving == true)
	{
			var xx = evt.clientX;removeDeviceStyle
			var yy = evt.clientY;
			if(Math.abs(xx-cx) > 30 || Math.abs(yy-cy) > 30)
			{
				svgRoot.currentTranslate.x = svgRoot.currentTranslate.x + xx-cx;
				svgRoot.currentTranslate.y = svgRoot.currentTranslate.y + yy-cy;
			    cx=xx;
			    cy=yy;
			}
	}
}

function deviceShapeOnMouseup(evt)
{
	isMoving = false;
}

function getDeviceGraphElement(deviceElement) {
	var nodeList = deviceElement.getChildNodes();
	for (var i = 0; i < nodeList.length; i++)
	{
		if (nodeList.item(i).getNodeName() != "#text") 
		{
			return nodeList.item(i);
		}
	}
	return null;
}

function getDevicePos(deviceElement) {
	var pos = "";
	var x=0,y=0,tx=0,ty=0,dx=0,dy=0;
	var graphElement = getDeviceGraphElement(deviceElement);
	if(graphElement.getNodeName() == "path")
	{
		var d = graphElement.getAttribute("d");
		x = d.split(" ")[1];
		y = d.split(" ")[2];
	}
	else
	{
		x = graphElement.getAttribute("x")
		y = graphElement.getAttribute("y")
	}
	dx = parseFloat(x);
	dy = parseFloat(y);
	pos = dx + "," + dy;
	return pos;
}

function getDeviceAttribute(deviceElement, attrName) {
	var attrValue = "";
	var metadata;
	if((metadata = getChildByTagName(deviceElement, "metadata")) != null)
	{
		if(metadata.getElementsByTagName("cge:TPSR_Ref").length != 0)
		{
			var psr = metadata.getElementsByTagName("cge:TPSR_Ref").item(0);
			if(psr.hasAttribute(attrName))
				attrValue =psr.getAttribute(attrName);
		}
		
	}
	return attrValue;
}

function addDeviceAttribute(deviceElement, attrName, attrValue)
{
	var metadata;
	if((metadata = getChildByTagName(deviceElement, "metadata")) != null)
	{
		if(metadata.getElementsByTagName("cge:TPSR_Ref").length != 0)
		{
			var psr = metadata.getElementsByTagName("cge:TPSR_Ref").item(0);
			psr.setAttribute(attrName, attrValue);
		}
	}
}

function getMeasAttribute(deviceElement, attrName) {
	var attrValue = "";
	var metadata;
	if((metadata = getChildByTagName(deviceElement, "metadata")) != null)
	{
		if(metadata.getElementsByTagName("cge:Meas_Ref").length != 0)
		{
			var psr = metadata.getElementsByTagName("cge:Meas_Ref").item(0);
			if(psr.hasAttribute(attrName))
				attrValue =psr.getAttribute(attrName);
		}
		
	}
	return attrValue;
}

function getChildByTagName(e, name) {
	var element = null;
	var nodeList = e.getChildNodes();
	for (var i = 0; i < nodeList.length; i++)
	{
		if (nodeList.item(i).nodeName == name) 
		{
			element =  nodeList.item(i);
			break;
		}
	}
	return element;
}

function getHref(deviceElement) {
	var href = "";
	if(deviceElement.getAttribute("href") != "")
		href = deviceElement.getAttribute("href");
	return href;
}

function delSelectDeivce(deviceID)
{
	var deviceElement = getDeviceByID(deviceID);
	if(selectedDevice.remove(deviceElement) == true)
		removeDeviceStyle(deviceElement, "stroke");
	setWinContent();
}



/*��õ�ǰViewBox�Ĳ���*/
function getCurrentVB()
{
	WAmp = 1;
	HAmp = 1;
	var vb = svgRoot.getAttributeNS(null,"viewBox").split(" ");
	if(vb == "")
	{
		vbCX=0;	vbCY=0;
		vbCW=0;	vbCH=0;
	}
	else
	{
		vbCX=parseFloat(vb[0]);	vbCY=parseFloat(vb[1]);
		vbCW=parseFloat(vb[2]);	vbCH=parseFloat(vb[3]);
	}
	vbCX =- svgRoot.currentTranslate.x;
	vbCY =- svgRoot.currentTranslate.y;
	if(vbCW == 0 || vbCH == 0)
	{
		WAmp = 1;
		HAmp = 1;
	}
	else
	{
		WAmp = vbCW/svgW;
		HAmp = vbCH/svgH;
	}
	if(svgRoot.currentScale > 1)
	{
		WAmp = WAmp/svgRoot.currentScale;
		HAmp = HAmp/svgRoot.currentScale;
	}
}

function fileLoaded(data) 
{
	if (xmlHttp.readyState == 4) 
    {	//δ��ȡ������
		if (xmlHttp.status == 404 ||xmlHttp.status == 400)
		{
			alert("�޷������趨�����ݽ��սӿ����ȡ���ݣ�");
			return;
		}
        
        //��ȡ������
        if (xmlHttp.status == 200) 
        {
           
			//var dom = xmlHttp.responseXML; 
			var newMenuRoot = svgWin.parseXML(xmlHttp.responseText,svgWin.contextMenu);
		
		svgWin.contextMenu.replaceChild(newMenuRoot.firstChild,svgWin.contextMenu.firstChild);
         }
    }
    
}

//------------------------------ͼԪ������ʾ��-------------------------------------------------
/**
 * ΪSVGͼԪ�豸����������ʾ��
 */
function addDevicePropertyBox()
{
     //�豸��ʾ�����б�Ϊ�ջ�û��ֵ����ʾĬ�����Կ�
  	 if (showUserPropertyInfo == 0) 
		  addDefaultDevicePropertyBox();	

	//��ʾ�û��Զ������Կ�
	 if (showUserPropertyInfo == 1)
		  addUserDevicePropertyBox();
}

//���Ĭ��������ʾ��
function addDefaultDevicePropertyBox()
{
	if (mapType == "fac")   //һ�ν���ͼ
	{
		addDefaultOnceMapDevicePropertyInfo();
		addDefaultOnceMapMeasurePropertyInfo();
	}
	
	else if (mapType == "sys")   //�������ͼ
		addDefaultGogeMapDevicePropertyInfo();
}

//����û��Զ���������ʾ��
function addUserDevicePropertyBox()
{
	addUserMapDevicePropertyInfo();
}

function addDefaultOnceMapDevicePropertyInfo()
{
	 
	 //�������Կ����
	 var propertyBox=svgDoc.createElement("g");
	 propertyBox.setAttribute("id","propertyInfo");	
	 propertyBox.setAttribute("visibility","hidden");					
	 svgObj.appendChild(propertyBox);
			
     //�������Կ�������
	 var gObj = svgDoc.getElementById('propertyInfo'); 
	 var rect=svgDoc.createElementNS(svgNS,"rect");
	 rect.setAttribute("id","gRect");
	 rect.setAttribute("x","0");
	 rect.setAttribute("y","0");
	 rect.setAttribute("fill","#F7F5F2");
	 rect.setAttribute("stroke","#FF2222");
	 rect.setAttribute("width",propertyBoxWidth);
	 rect.setAttribute("height",propertyBoxHeight);			
	 gObj.appendChild(rect);
   	 
   	 //��������˵����Ŀ
	 var text=svgDoc.createElementNS(svgNS,"text");
	 text.setAttribute("id","gtextInfo");
	 text.setAttribute("x","0");
	 text.setAttribute("y","0");
	 text.setAttribute("font-family","����");
	 text.setAttribute("font-size","12");	
	 gObj.appendChild(text);
			
	 //------------------�豸����---------------
	 var textObj = svgDoc.getElementById('gtextInfo'); 
	 var tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipTypeLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","18");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("�豸���ƣ� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipTypeSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("equipType"));
	 textObj.appendChild(tspan);
			
	//--------------------�豸���----------------
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipIDLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","36");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("�豸��ţ� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipIDSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("equipID"));
	 textObj.appendChild(tspan);
		
	 //-------------------��ѹ�ȼ�-----------------------
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","powerGradeLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","54");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("��ѹ�ȼ��� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","powerGradeSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("powerGrade"));
	 textObj.appendChild(tspan);
	
}

//ң����Ϣ��
function addDefaultOnceMapMeasurePropertyInfo()
{
	 
	 //�������Կ����
	 var propertyBox=svgDoc.createElement("g");
	 propertyBox.setAttribute("id","measureInfo");	
	 propertyBox.setAttribute("visibility","hidden");					
	 svgObj.appendChild(propertyBox);
			
     //�������Կ�������
	 var gObj = svgDoc.getElementById('measureInfo'); 
	 var rect=svgDoc.createElementNS(svgNS,"rect");
	 rect.setAttribute("id","measureRect");
	 rect.setAttribute("x","0");
	 rect.setAttribute("y","0");
	 rect.setAttribute("fill","#F7F5F2");
	 rect.setAttribute("stroke","#FF2222");
	 rect.setAttribute("width",propertyBoxWidth);
	 rect.setAttribute("height",propertyBoxHeight);			
	 gObj.appendChild(rect);
   	 
   	 //��������˵����Ŀ
	 var text=svgDoc.createElementNS(svgNS,"text");
	 text.setAttribute("id","measuretextInfo");
	 text.setAttribute("x","0");
	 text.setAttribute("y","0");
	 text.setAttribute("font-family","����");
	 text.setAttribute("font-size","12");	
	 gObj.appendChild(text);
			
	 //------------------ң������---------------
	 var textObj = svgDoc.getElementById('measuretextInfo'); 
	 var tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureNameLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","18");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("ң�����ƣ� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureNameSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("measureName"));
	 textObj.appendChild(tspan);
			
	//--------------------ң����----------------
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureIDLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","36");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("ң���ţ� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureIDSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("measureID"));
	 textObj.appendChild(tspan);
		
	 //-------------------ң������-----------------------
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureDataLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","54");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("ң�����ݣ� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureDataSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("measureData"));
	 textObj.appendChild(tspan);
	 
	 //---------------------����ʱ��--------------------------		
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureTimeLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","72");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("����ʱ�䣺 "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","measureTimeSpan");	
	 tspan.setAttribute("style","stroke:blue");		
	 tspan.appendChild(svgDoc.createTextNode("measureTime"));	
	 textObj.appendChild(tspan);
	
}

//
function addDefaultGogeMapDevicePropertyInfo()
{
	 
	 //�������Կ����
	 var propertyBox=svgDoc.createElement("g");
	 propertyBox.setAttribute("id","propertyInfo");	
	 propertyBox.setAttribute("visibility","hidden");					
	 svgObj.appendChild(propertyBox);
			
     //�������Կ�������
	 var gObj = svgDoc.getElementById('propertyInfo'); 
	 var rect=svgDoc.createElementNS(svgNS,"rect");
	 rect.setAttribute("id","gRect");
	 rect.setAttribute("x","0");
	 rect.setAttribute("y","0");
	 rect.setAttribute("fill","#F7F5F2");
	 rect.setAttribute("stroke","#FF2222");
	 rect.setAttribute("width",propertyBoxWidth);
	 rect.setAttribute("height",propertyBoxHeight);			
	 gObj.appendChild(rect);
   	 
   	 //��������˵����Ŀ
	 var text=svgDoc.createElementNS(svgNS,"text");
	 text.setAttribute("id","gtextInfo");
	 text.setAttribute("x","0");
	 text.setAttribute("y","0");
	 text.setAttribute("font-family","����");
	 text.setAttribute("font-size","12");	
	 gObj.appendChild(text);
			
	 //------------------�豸����---------------
	 var textObj = svgDoc.getElementById('gtextInfo'); 
	 var tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipTypeLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","18");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("��վ���ƣ� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipTypeSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("equipType"));
	 textObj.appendChild(tspan);
			
	//--------------------�豸���----------------
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipIDLabel");		
	 tspan.setAttribute("x","10");
	 tspan.setAttribute("y","36");
	 tspan.setAttribute("font-family","����");
	 tspan.setAttribute("font-size","12");	
	 tspan.appendChild(svgDoc.createTextNode("��վ��ţ� "));
	 textObj.appendChild(tspan);
			
	 tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 tspan.setAttribute("id","equipIDSpan");		
	 tspan.setAttribute("style","stroke:blue");
	 tspan.appendChild(svgDoc.createTextNode("equipID"));
	 textObj.appendChild(tspan);
}

function addUserMapDevicePropertyInfo()
{
	 
	 //�������Կ����
	 var propertyBox=svgDoc.createElement("g");
	 propertyBox.setAttribute("id","propertyInfo");	
	 propertyBox.setAttribute("visibility","hidden");					
	 svgObj.appendChild(propertyBox);
			
     //�������Կ�������
	 var gObj = svgDoc.getElementById('propertyInfo'); 
	 var rect=svgDoc.createElementNS(svgNS,"rect");
	 rect.setAttribute("id","gRect");
	 rect.setAttribute("x","0");
	 rect.setAttribute("y","0");
	 rect.setAttribute("fill","#F7F5F2");
	 rect.setAttribute("stroke","#FF2222");
	 rect.setAttribute("width",propertyBoxWidth);
	 rect.setAttribute("height",propertyBoxHeight);			
	 gObj.appendChild(rect);
   	 
   	 //��������˵����Ŀ
	 var text=svgDoc.createElementNS(svgNS,"text");
	 text.setAttribute("id","gtextInfo");
	 text.setAttribute("x","0");
	 text.setAttribute("y","0");
	 text.setAttribute("font-family","����");
	 text.setAttribute("font-size","12");	
	 gObj.appendChild(text);
	 
	 if ((userPropertyArray == null) || (userPropertyArray.length <1))
	 	 return;
	 
	 var textObj = null,tspan = null;
	 var posX = 10,posY = 18;
	 var propertyInfo;
	 
	 for(var i=0;i<userPropertyArray.length;i++)
	 {
	 	propertyInfo = userPropertyArray[i].split(":");
	 	if (propertyInfo.length <2)
	 		continue;
	 	
	 	//Ϊ�ı��ڵ�
	 	if (trim(propertyInfo[0]) == "Text")
	 	{
	    	textObj = svgDoc.getElementById('gtextInfo'); 
	 		tspan=svgDoc.createElementNS(svgNS,"tspan");	
	 		tspan.setAttribute("id","label"+i);		
	 		tspan.setAttribute("x",posX);
	 		tspan.setAttribute("y",posY * (i+1));
	 		tspan.setAttribute("font-family","����");
	 		tspan.setAttribute("font-size","12");	
	 		tspan.appendChild(svgDoc.createTextNode(propertyInfo[1] + ":  "));
	 		textObj.appendChild(tspan);
			
			tspan=svgDoc.createElementNS(svgNS,"tspan");	
			tspan.setAttribute("id","valueSpan"+i);		
			tspan.setAttribute("style","stroke:blue");
			tspan.appendChild(svgDoc.createTextNode("valueType"+i));
			textObj.appendChild(tspan);
	 	}
	 }
}


//��ʾ�豸�����б�
function showDevicePropertyInfo(deviceElement, evt)
{ 
	 if (showUserPropertyInfo == 0)     //��ʾϵͳĬ���豸���Կ�
	 {
	 	 if (mapType == "fac")       //һ�ν���ͼ
		 	 showDefaultDevicePropertyInfo(deviceElement, evt);          //�������δ����ʾ�豸�����б���Ҫ������ʾĬ�������б�
	 	 
	 	 if (mapType == "sys")      //�������ͼ
		 	 showDefaultGogePropertyInfo(deviceElement, evt);          //�������δ����ʾ�豸�����б���Ҫ������ʾĬ�������б�
	 	 
	 	 return;
	 }

}

//��ʾң�������б�
function showMeasurePropertyInfo(evt)
{
	if (mapType == "fac")       //һ�ν���ͼ
		showDefaultMeasurePropertyInfo(evt);
}

//�����豸�����б�
function hideDevicePropertyInfo(evt)
{
	 
	 var gInfoObj = svgDoc.getElementById("propertyInfo");
	 var i=0;
	 var lbCnt = 0;
     var removeObj = "";
	 try
	 {
		 var nodeLength = gInfoObj.childNodes.length;
		 if (gInfoObj.childNodes.length > 2)
		 {
		 	for(i=0;i<nodeLength;i++)
			{
			   
			    lbCnt = userPropertyArray.length + i;
			    removeObj = svgDoc.getElementById("label"+lbCnt);
		 		gInfoObj.removeChild(removeObj);
		 	}
			
		 }
	 }
	 catch(e)
	 {}
	gInfoObj.setAttribute("visibility","hidden");
}

//����ң�������б�
function hideMeasurePropertyInfo(evt)
{
	 
	 var gInfoObj = svgDoc.getElementById("measureInfo");
	 var i=0;
	 var lbCnt = 0;
     var removeObj = "";
	 try
	 {
		 var nodeLength = gInfoObj.childNodes.length;
		 if (gInfoObj.childNodes.length > 2)
		 {
		 	for(i=0;i<nodeLength;i++)
			{
			   
			    lbCnt = userPropertyArray.length + i;
			    removeObj = svgDoc.getElementById("label"+lbCnt);
		 		gInfoObj.removeChild(removeObj);
		 	}
			
		 }
	 }
	 catch(e)
	 {}
	gInfoObj.setAttribute("visibility","hidden");
}


//��ʾһ�ν���ͼĬ���豸������Ϣ
function showDefaultDevicePropertyInfo(deviceElement, evt)
{
     var svgDocument = svgbox.getSVGDocument();
	 getCurrentVB();
	 var x=0,y=0;
	 if(evt === undefined || evt == null)
	 {
		 var objXY=getDevicePos(deviceElement);
		 x=parseInt(objXY.split(",")[0]) + svgRoot.currentTranslate.x;
		 y=parseInt(objXY.split(",")[1]) + svgRoot.currentTranslate.y;
	 }
	 else
	 {
		 x = evt.clientX;
		 y = evt.clientY;
	 }
	 var tempX = x*WAmp + 10*svgRoot.currentScale;
	 var tempY = y*HAmp + 10*svgRoot.currentScale;
	 var newX=0;    //��λ��xx
	 var newY=0;
	 var offsetX=vbCX; //ƫ����xxx
	 var offsetY=vbCY;
	
	 //Ϊ���������ò���ֵ
	 var text = svgDocument.getElementById("equipTypeSpan");
	 text.firstChild.nodeValue =  dataCheck(getDeviceName(deviceElement));	
	 text = svgDocument.getElementById("equipIDSpan");
	 text.firstChild.nodeValue =  dataCheck(getDeviceID(deviceElement));
	 text = svgDocument.getElementById("powerGradeSpan");
	 text.firstChild.nodeValue =  dataCheck(getDeviceVolt(deviceElement))+"kV";
	 
	 //���ø�����ʾ������λ��
	 var txtObjInfo = svgDocument.getElementById("propertyInfo");	
	 txtObjInfo.setAttribute("visibility","visible");
	 			
	 txtObjInfo = svgDocument.getElementById("gRect");	
	 newX = 0 + tempX + offsetX;
	 newY = 0 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);
	 			
	 txtObjInfo = svgDocument.getElementById("gtextInfo");	
	 newX = 0 + tempX + offsetX;
	 newY = 0 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY); 
				
	 txtObjInfo = svgDocument.getElementById("equipTypeLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 18 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);
	 
	 txtObjInfo = svgDocument.getElementById("equipIDLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 36 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);			
				
	 txtObjInfo = svgDocument.getElementById("powerGradeLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 54 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);			
}

//��ʾһ�ν���ͼĬ��ң��������Ϣ
function showDefaultMeasurePropertyInfo(evt)
{

     var svgDocument = svgbox.getSVGDocument();
	 //var equipObj = getMeasureInfo(getDevInfoNode(evt));
     var equipObj = null;
	 var statusName = "";
	 
	 var transform = evt.target.parentNode.getChildNodes.item(1).getAttribute("transform");
	 var x = transform.substring(transform.indexOf('(')+1,transform.indexOf(','));
	 var y = transform.substring(transform.indexOf(',')+1,transform.indexOf(')'));
	 getCurrentVB();
	 var tempX = evt.clientX*WAmp + 10*svgRoot.currentScale;
	 var tempY = evt.clientY*HAmp + 10*svgRoot.currentScale;
	 var newX=0;    //��λ��xx
	 var newY=0;
	 var offsetX=vbCX; //ƫ����xxx
	 var offsetY=vbCY;
	
	 //Ϊ���������ò���ֵ
	 var text = svgDocument.getElementById("measureNameSpan");
	 text.firstChild.nodeValue =  dataCheck(equipObj.getAttribute("ObjectName"));	
	 text = svgDocument.getElementById("measureIDSpan");
	 text.firstChild.nodeValue =  dataCheck(equipObj.getAttribute("ObjectID"));
	 text = svgDocument.getElementById("measureDataSpan");
	 text.firstChild.nodeValue =  dataCheck(equipObj.getAttribute("ObjectID"));
	 text = svgDocument.getElementById("measureTimeSpan");
	 text.firstChild.nodeValue =  dataCheck(equipObj.getAttribute("MeasureTime"));
	 //���ø�����ʾ������λ��
	 var txtObjInfo = svgDocument.getElementById("measureInfo");
	 txtObjInfo.setAttribute("visibility","visible");
	 			
	 txtObjInfo = svgDocument.getElementById("measureRect");	
	 newX = 0 + tempX + offsetX;
	 newY = 0 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);
	 			
	 txtObjInfo = svgDocument.getElementById("measuretextInfo");	
	 newX = 0 + tempX + offsetX;
	 newY = 0 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY); 
				
	 txtObjInfo = svgDocument.getElementById("measureNameLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 18 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);
	 
	 txtObjInfo = svgDocument.getElementById("measureIDLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 36 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);			
				
	 txtObjInfo = svgDocument.getElementById("measureDataLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 54 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);
	 
	 txtObjInfo = svgDocument.getElementById("measureTimeLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 72 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);

}

//��ʾ�������ͼĬ�����Կ�
function showDefaultGogePropertyInfo(deviceElement, evt)
{
	 var svgDocument = svgbox.getSVGDocument();
	 getCurrentVB();
	 var x=0,y=0;
	 if(evt === undefined || evt == null)
	 {
		 var objXY=getDevicePos(deviceElement);
		 x=parseInt(objXY.split(",")[0]) + svgRoot.currentTranslate.x;
		 y=parseInt(objXY.split(",")[1]) + svgRoot.currentTranslate.y;
	 }
	 else
	 {
		 x = evt.clientX;
		 y = evt.clientY;
	 }
	 var tempX = x*WAmp + 10*svgRoot.currentScale;
	 var tempY = y*HAmp + 10*svgRoot.currentScale;
	 
	 var newX=0;    //��λ��xx
	 var newY=0;
	 var offsetX=vbCX; //ƫ����xxx
	 var offsetY=vbCY;
	 
	 //Ϊ���������ò���ֵ
	 var text = svgDoc.getElementById("equipTypeSpan");
	 text.firstChild.nodeValue =  dataCheck(getDeviceName(deviceElement));	
	 text = svgDoc.getElementById("equipIDSpan");
	 text.firstChild.nodeValue =  dataCheck(getDeviceID(deviceElement));
	 
	 //���ø�����ʾ������λ��
	 var txtObjInfo = svgDoc.getElementById("propertyInfo");	
	 txtObjInfo.setAttribute("visibility","visible");
	 			
	 txtObjInfo = svgDoc.getElementById("gRect");	
	 newX = 0 + tempX + offsetX;
	 newY = 0 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);
	 
	 txtObjInfo = svgDoc.getElementById("gtextInfo");	
	 newX = 0 + tempX + offsetX;
	 newY = 0 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY); 
				
	 txtObjInfo = svgDoc.getElementById("equipTypeLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 18 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);
	 
	 txtObjInfo = svgDoc.getElementById("equipIDLabel");	
	 newX = 10 + tempX + offsetX;
	 newY = 36 + tempY + offsetY;
	 txtObjInfo.setAttribute("x",newX);
	 txtObjInfo.setAttribute("y",newY);			
}


//���˵�null��ֵ
function dataCheck(dataValue)
{
	var data;
	if ((dataValue == null) || (dataValue == "null"))
		data = "";
	else
		data = dataValue;
	return data;
}

//ȥ���ո�
function  trim(strInput) //OK.
{
	var iLoop=0;
	var iLoop2=-1;
	var strChr;
	if((strInput == null)||(strInput == "<NULL>"))
		return "";

    if (strInput) 
    {
		for(iLoop=0;iLoop<strInput.length-1;iLoop++)
		{
			strChr=strInput.charAt(iLoop);
			if(strChr!=' ')
				break;
		}
		for(iLoop2=strInput.length-1;iLoop2>=0;iLoop2--)
		{
			strChr=strInput.charAt(iLoop2);
			if(strChr!=' ')
				break;
		}
	}

    if (iLoop <= iLoop2) 
	{
		return strInput.substring(iLoop,iLoop2+1);
	}
    else
	{
		return "";
	}
}


//ΪArray���������չremove����
Array.prototype.remove = function(obj)
{
	var result = false;
    for (var i=0 ; i < this.length ; ++i )
    {
        if (this[i] == obj )
        {
            if ( i > this.length/2 )
            {
                for (var j=i ; j < this.length-1 ; ++j )
                {
                    this[j] = this[j+1];
                }
                this.pop();
            }
            else
            {
                for (var j=i ; j > 0 ; --j )
                {
                    this[j] = this[j-1];
                }
                this.shift();
            }
            result = true;
            break;
        }
    }
    return result;
};

function searchDevice()
{
	if(mapType == "fac")
	{
		var deviceid = window.showModalDialog("searchdevice.jsp?stationid="+stationID,window,"dialogWidth:335px;status:no;dialogHeight:262px");  
		if(deviceid != null)
		{
			var deviceElement = getDeviceByID(deviceid);
			var objXY=getDevicePos(deviceElement);
			var x=parseInt(objXY.split(",")[0]);
			var y=parseInt(objXY.split(",")[1]);
			if(x > 300)
				svgRoot.currentTranslate.x = -1*(x - 300);
			if(y > 300)
				svgRoot.currentTranslate.y = -1*(y - 300);
			showDevicePropertyInfo(deviceElement);
		}
	}
	else if(mapType == "sys")
	{
		var deviceid = window.showModalDialog("searchdevice.jsp?stationid=0",window,"dialogWidth:335px;status:no;dialogHeight:262px");
		if(deviceid != null)
		{
			var deviceElement = getDeviceByID(deviceid);
			var objXY=getDevicePos(deviceElement);
			var x=parseInt(objXY.split(",")[0]);
			var y=parseInt(objXY.split(",")[1]);
			if(x > 300)
				svgRoot.currentTranslate.x = -1*(x - 300);
			if(y > 300)
				svgRoot.currentTranslate.y = -1*(y - 300);
			showDevicePropertyInfo(deviceElement);
		}
	}
}

function zoomIn()
{
	svgRoot.currentScale = 1.2*svgRoot.currentScale;
}

function zoomOut()
{
	svgRoot.currentScale = svgRoot.currentScale/1.2;
}

function originalView()
{
	svgRoot.currentScale = orig_scale;
}

function setMeasurementValue()
{
	var measureLayer = svgDoc.getElementById("MeasurementValue_Layer");
	if(measureLayer!=null)
	{
		var svgMeasNodeList = measureLayer.getElementsByTagName("g");
		for (var i = 0; i < svgMeasNodeList.length; i++) {
			var measElement = svgMeasNodeList.item(i);
			var field = getTelemeteringField(measElement);
			var measID = getMeasAttribute(measElement,"ObjectID");
			var measName = getMeasAttribute(measElement,"ObjectName");
			var cimID = getMeasDeviceCIMID(measID);
			if(measMap.Contains(cimID))
			{
				var meas = measMap.Get(cimID);
				var measValue = getMapValue(meas,field);
				setMeasurementText(measElement, measValue);
			}
		}
	}
}

function getMapValue(meas, measKey)
{
	for(index in meas) {
		if(index == measKey)
			return meas[index];
	}
}

function getMeasDeviceCIMID(measID) {
	if(measID.length <= 10)
		return "";
	var measDeviceCIMID = measID.substring(1,10);
	return measDeviceCIMID;
}

function setMeasurementText(measElement, measValue) {
	measElement.getElementsByTagName("text").item(0).getFirstChild().setNodeValue(measValue);
}

function getTelemeteringField(measElement) {
	var telemeteringField = "";
	var telemeteringID = getMeasAttribute(measElement,"ObjectID");
	var telemeteringName = getMeasAttribute(measElement,"ObjectName");
	var telemeteringNumType = telemeteringID.substring(10);
	var telemeteringNameType = telemeteringName.substring(telemeteringName.indexOf(":")+1);
	if(telemeteringNameType == "�й�")
		telemeteringField = "YG";
	else if(telemeteringNameType == "�޹�")
		telemeteringField = "WG";
	else if(telemeteringNameType == "����")
		telemeteringField = "DL";
	else if(telemeteringNameType == "��ѹ")
		telemeteringField = "DY";
	else if(telemeteringNameType == "���")
		telemeteringField = "XJ";
	else if(telemeteringNameType == "��λ")
		telemeteringField = "DW";
	else
	{
		if(telemeteringNumType == "30")
			telemeteringField = "WG";
		if(telemeteringNumType == "40")
			telemeteringField = "DL";
		else if(telemeteringNumType == "80")
			telemeteringField = "YG";
		else if(telemeteringNumType == "90")
			telemeteringField = "WG";
	}
	return telemeteringField;
}

function PowerDevice(deviceCode,deviceName,deviceType,deviceVolt)
   {
        this.deviceCode=deviceCode;
        this.deviceName=deviceName;
        this.deviceType=deviceType;
        this.deviceVolt=deviceVolt;
        this.deviceStatus=0;
        this.compStatus=0;
   }

function Measurement(equipID,kdsj,yg,yglczt,wg,wglczt,dl,dllczt,dy,dylczt,xj,xjlczt,dw,dwlczt,cimID)
{
     this.EQUIPID=equipID;
     this.KDSJ=kdsj;
     this.YG=yg;
     this.YGLCZT=yglczt;
     this.WG=wg;
     this.WGLCZT=wglczt;
     this.DL=dl;
     this.DLLCZT=dllczt;
     this.DY=dy;
     this.DYLCZT=dylczt;
     this.XJ=xj;
     this.XJLCZT=xjlczt;
     this.DW=dw;
     this.DWLCZT=dwlczt;
     this.CIMID=cimID;
}




