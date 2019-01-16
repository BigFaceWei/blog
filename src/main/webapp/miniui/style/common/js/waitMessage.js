var map = new Map();
	var currWin;
	function openSrc(sortid,informid,informlink){
		alert(1);
		 if(sortid="eomp-messagesortid-workflow"){
			 alert(2); 
			currWin = map.get(informid);
			if(currWin == null){
				informlink = informlink.replace(/(\*)/g,"&");
				var pathName=window.document.location.pathname;
			    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
				currWin = openScreenDialog(projectName+'/'+informlink);
				map.put(informid,currWin);
			}else{
				currWin.focus();
			}
			var h = document.getElementById(informid);
			h.href='javascript:;';
		}
	}

function Map() {
 var struct = function(key, value) {
  this.key = key;
  this.value = value;
 }
 
 var put = function(key, value){
  for (var i = 0; i < this.arr.length; i++) {
   if ( this.arr[i].key === key ) {
    this.arr[i].value = value;
    return;
   }
  }
   this.arr[this.arr.length] = new struct(key, value);
 }
 
 var get = function(key) {
  for (var i = 0; i < this.arr.length; i++) {
   if ( this.arr[i].key === key ) {
     return this.arr[i].value;
   }
  }
  return null;
 }
 
 var remove = function(key) {
  var v;
  for (var i = 0; i < this.arr.length; i++) {
   v = this.arr.pop();
   if ( v.key === key ) {
    continue;
   }
   this.arr.unshift(v);
  }
 }
 
 var size = function() {
  return this.arr.length;
 }
 
 var isEmpty = function() {
  return this.arr.length <= 0;
 } 
 this.arr = new Array();
 this.get = get;
 this.put = put;
 this.remove = remove;
 this.size = size;
 this.isEmpty = isEmpty;
}