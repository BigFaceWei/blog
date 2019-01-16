﻿﻿__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

function getRootPath(){
    var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return projectName;
}

var bootPATH = __CreateJSPath("boot.js");

//debugger
mini_debugger = false;   

//miniui
document.write('<script src="' + bootPATH + 'jquery-1.6.2.min.js" type="text/javascript"></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'miniui-source.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.fileboxlist.js" type="text/javascript" ></sc' + 'ript>');

document.write('<script src="' + bootPATH + 'mini.ckeditor.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.doublecalendar.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.eompbutton.js" type="text/javascript" ></sc' + 'ript>');
//document.write('<script src="' + bootPATH + 'mini.chart.all.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.chart.js" type="text/javascript" ></sc' + 'ript>');

document.write('<script src="' + bootPATH + 'mini.fileupload.js" type="text/javascript" charset="utf-8" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.weboffice.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.columnexts.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.bindbuttonedit.js" type="text/javascript" ></sc' + 'ript>');
document.write('<script src="' + bootPATH + 'mini.treepopupedit.js" type="text/javascript" ></sc' + 'ript>');
document.write('<link href="' + bootPATH + 'themes/default/miniui.css" rel="stylesheet" type="text/css" />');

document.write('<link href="' + bootPATH + 'themes/bindbuttoneidt.css" rel="stylesheet" type="text/css" />');

//skin
var skin = getCookie("miniuiSkin");
if (skin) {
	if("null" != skin) {
	    document.write('<link href="' + bootPATH + 'themes/' + skin + '/skin.css" rel="stylesheet" type="text/css" />');
	    document.write('<link href="' + bootPATH + 'themes/' + skin + '/icons.css" rel="stylesheet" type="text/css" />');
	} else {
	    document.write('<link href="' + bootPATH + 'themes/icons.css" rel="stylesheet" type="text/css" />');
	}
}else{
	document.write('<link href="' + bootPATH + 'themes/csg-style/skin.css" rel="stylesheet" type="text/css" />');
    document.write('<link href="' + bootPATH + 'themes/icons.css" rel="stylesheet" type="text/css" />');
}


////////////////////////////////////////////////////////////////////////////////////////
function getCookie(sName) {
    var aCookie = document.cookie.split("; ");
    var lastMatch = null;
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            lastMatch = aCrumb;
        }
    }
    if (lastMatch) {
        var v = lastMatch[1];
        if (v === undefined) return v;
        return unescape(v);
    }
    return null;
}