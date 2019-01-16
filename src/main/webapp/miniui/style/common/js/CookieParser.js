var CookieHandle=function(){
	
}

CookieHandle.prototype.set=function(cookieName, cookieValue, expires){
	if (expires){
		document.cookie = this.ResponseCookies_GetCookieName(cookieName) + "=" + escape(cookieValue) + "; expires=" + expires.toGMTString();
	}
	else{
		document.cookie = this.ResponseCookies_GetCookieName(cookieName) + "=" + escape(cookieValue);
	}
}

//��ȡ�������� cookieName ͬ���� cookie ���ƣ������Сд��ͬ
//��������������� cookie���ͷ��� cookieName
CookieHandle.prototype.ResponseCookies_GetCookieName=function(cookieName){
	var lowerCookieName = cookieName.toLowerCase();
	var cookieStr = document.cookie;
	if (cookieStr == ""){
		return cookieName;
	}
	var cookieArr = cookieStr.split("; ");
	var pos = -1;
	for (var i=0; i<cookieArr.length; i++)
	{
		pos = cookieArr[i].indexOf("=");
		if (pos > 0){
			if (cookieArr[i].substring(0, pos).toLowerCase() == lowerCookieName){
				return cookieArr[i].substring(0, pos);
			}
		}
	}
	return cookieName;
}
//��ȡ������ cookie ֵ
//������ cookieName �Ĵ�Сд
//dfltValue ΪĬ�Ϸ���ֵ
//�������Ӽ�
CookieHandle.prototype.get=function(cookieName, dfltValue){
	var lowerCookieName = cookieName.toLowerCase();
	var cookieStr = document.cookie;
	if (cookieStr == ""){
		return dfltValue;
	}
	var cookieArr = cookieStr.split("; ");
	var pos = -1;
	for (var i=0; i<cookieArr.length; i++){
		pos = cookieArr[i].indexOf("=");
		if (pos > 0){
			if (cookieArr[i].substring(0, pos).toLowerCase() == lowerCookieName){
				return unescape(cookieArr[i].substring(pos+1, cookieArr[i].length));
			}
		}
	}
	return dfltValue;
}