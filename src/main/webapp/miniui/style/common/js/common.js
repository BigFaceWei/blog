function domDisplay(domIds, enable){
  for(i=0;i<domIds.length;i++){
    if(enable){
      show(domIds[i]);
    }
    else{
      hiden(domIds[i]);
    }
  }
}

function domDisabled(domIds, enable){
  for(i=0;i<domIds.length;i++){
    if(enable){
      $id(domIds[i]).disabled = true;
    }
    else{
      $id(domIds[i]).disabled = false;
    }
  }
}

//Change td's bgColor of the selected row(tr).
function highLightRow(selectedTrObj,isLight,color){
  var rowBgcolor = isLight ? color : "";
  var tdObj = selectedTrObj.childNodes;
  if(tdObj != null){
    for (var i=0; i<tdObj.length; i++) {
      if(tdObj[i].style != null){
        tdObj[i].style.backgroundColor = rowBgcolor;
      }
    }
  }
}

var MclickColor = "#FFE5BD";
var OldSrc;
function mClick(src) {
  if (src!=OldSrc) {
    if (OldSrc!=null)
    highLightRow(OldSrc,false,MclickColor);
    OldSrc = src;
    highLightRow(OldSrc,true,MclickColor);
  }
}

//Count text's length.
function textLength(str){
  var len = 0;
  for (var i=0; i<str.length; i++){
    if (str.charCodeAt(i)>255) len+=3; else len++;
  }
  return len;
}

//Add event for DOM
function addEvent(obj, evType, fn){
 if (obj.addEventListener){
   obj.addEventListener(evType, fn, false);
   return true;
 } else if (obj.attachEvent){
   var r = obj.attachEvent("on"+evType, fn);
   return r;
 } else {
   return false;
 }
}

//Set attribute for DOM
function setAttribute(obj, name, value){
  try{
    if(obj.attributes.getNamedItem(name)==null || obj.attributes.getNamedItem(name).value == ""){
      obj.setAttribute(name,value);
    }else{
      obj.getAttribute(name).value = value;
    }
  }catch(e){
    alert(e);
  }
}

//return object getElementById
function $id(id){
  return document.getElementById(id);
}

//return object getElementsByName
function $name(name){
  return document.getElementsByName(name);
}

//return parent object by parent object's tagName
function getParentObjByTagName(thisObj,tagName){
  for(;thisObj.parentNode;){
    if(thisObj.tagName == tagName){
      return thisObj;
    }else{
      thisObj = thisObj.parentNode;
    }
  }
}

// change tr bgcolor by mouse move
function changeCellBgcolor(obj){
  for(i=0;i<obj.cells.length;i++){
    obj.cells[i].style.backgroundColor = "#FFE5BD";
  }
}

// reuser tr class by mouse move
function removeCellBgcolor(obj,className){
  for(i=0;i<obj.cells.length;i++){
    obj.cells[i].style.backgroundColor = "";
    cellClassName = className;
    if (obj.cells[i].className.indexOf("hide") > -1) {
      cellClassName = className + ' hide';
    }
    obj.cells[i].className = cellClassName;
  }
}

function getUnhidenClass(id){
  className = $id(id).className;
  if(className.indexOf("hide") > -1){  
    if(className.indexOf(" hide") > -1){ 
      className = className.replace(" hide", "");
    }else{
      className = className.replace("hide", "");
    }
  }
  return className;
}

function show(id){
  className = getUnhidenClass(id);
  $id(id).className = className;
}

function hiden(id){
  className = $id(id).className;
  if(className.length == 0){ 
    className = "hide";
  }else{
    if(className.indexOf("hide") == -1){  
      className = className + " hide";
    }
  }
  $id(id).className = className;
}

function isShow(id){
  className = $id(id).className;
  if(className.indexOf("hide") > -1){ 
    return false;
  }
  return true;
}

function formatNumber(varNubr, scale) {
  var nubr = varNubr;
  if (nubr == 0) {
  } else if (nubr==null||isNaN(nubr)||trimString(""+nubr)=='') {
          alert("Can not format NaN.");
          return false;
  }

  if (scale == 0) {
  } else if ((scale!=null)&&isNaN(scale)) {
          alert("Scale can not be NaN.");
          return false;
  }

  //round first
  if (scale==null) {
  } else if (new String(scale) == '0') {
          nubr = roundNumber(nubr,0);
  } else if (trimString(scale) == '' || trimString(scale) == 0) {
  } else {
          nubr = roundNumber(nubr,scale);
  }

  var str = new String(nubr);
  var strIntPart;
  var strDecPart;
  if (str.indexOf('.')>-1) {
          strIntPart = str.substring(0,str.indexOf('.'));
          strDecPart = str.substring(str.indexOf('.'),str.length);

          if (scale==null) {
          } else if (new String(scale) == '0') {
          } else if (trimString(scale) == '' || trimString(scale) == 0) {
          } else {
                  var currDecBit = str.length - str.indexOf('.') - 1;
                  for(var i = 0; i < (scale - currDecBit); i++) {
                    strDecPart += '0';
                  }
          }

  } else {
          strIntPart = str;
          strDecPart = '';
          for(var i = 0; i < (scale); i++) {
            if (i == 0) {
              strDecPart += '.0';
            } else {
              strDecPart += '0';
            }
          }
  }

  var lastIndex_ =strIntPart.length;
  var rst = "";

  //Int Part
  var startIndex;
  while(lastIndex_>3) {
          startIndex_ = lastIndex_ - 3;
          if (strIntPart.substring(0,startIndex_) == '-') {
            rst = strIntPart.substring(startIndex_,lastIndex_)+rst;
          } else {
            rst = ","+strIntPart.substring(startIndex_,lastIndex_)+rst;
          }
          lastIndex_ = startIndex_;
  }
  rst = strIntPart.substring(0,lastIndex_)+rst;

  //Dec Part
  if (scale==null) {
          rst += strDecPart;
  } else if (new String(scale) == '0') {
  } else if (trimString(scale) == '' || trimString(scale) == 0) {
          rst += strDecPart;
  } else {
          rst += strDecPart.substring(0, scale+1);
  }
  return rst;
}

function parseNumber(str) {
  if(str==null){
    return str;
  }
  if(!str.match(/^\d{1,3}(,\d{3})*(.\d+)?$/)){
    alert("It isn't Number formated, Can not be Parsed.");
    return str;
  }
  var rst = str.replace(/,/g,'');
  return rst;
}

function roundNumber(nubr, scale) {
  if (nubr==null||trimString(nubr)==''||isNaN(nubr)) {
          alert("Can not round NaN.");
          return false;
  }
  if (new String(scale)=='0') {
  } else if (trimString(scale)==''||trimString(scale)==0||isNaN(scale)) {
          alert("Scale Can not be NaN.");
          return false;
  }
  var multiples = 1;
  var vari;
  for (var i = 0; i < scale; i++) {
    multiples = multiples * 10;
  }
  vari = Math.round(nubr * multiples)/multiples;
  return vari;
}

function trimString(str) {
  if(str==null){
    return str;
  }
  if(!isNaN(str)){
    return str;
  }
  var rst = str.replace(/ /g,'');
  return rst;
}

function screenSize(){
  self.moveTo(0,0)
  self.resizeTo(screen.availWidth,screen.availHeight)
}

function mathAdd(var1, var2){
  var varStr1 = new String(var1);
  var varStr2 = new String(var2);
  var length = 0;
  var tempDivide = 1;
  if ((tempIndex = varStr1.lastIndexOf("."))!=-1) {
    tempIndex = varStr1.length - tempIndex - 1;
    length = tempIndex;
  }
  if ((tempIndex = varStr2.lastIndexOf("."))!=-1) {
    tempIndex = varStr2.length - tempIndex - 1;
    if ( tempIndex >  length) {
      length = tempIndex;
    }
  }
  for (var i = 0; i < length; i++) {
    tempDivide = tempDivide * 10;
  }
  return (var1*tempDivide + var2*tempDivide)/tempDivide;
}

function checkCondition(checkboxId, conditionIds) {
  if ($id(checkboxId).checked) {
    for (i=0; i<conditionIds.length; i++) {
      $id(conditionIds[i]).disabled = false;
    }
  } else {
    for (i=0; i<conditionIds.length; i++) {
      $id(conditionIds[i]).disabled = true;
    }
  }
}
