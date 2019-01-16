var oldTab = null;
var curTab = null;
function tabMouseOver(srcObj)
{
	oldTab = srcObj.className;
	srcObj.className = 'tabbed-selected';
	try {
		var func = eval('tabbedMouseOver');
		if(typeof func == 'function')
			func(srcObj);		
	} catch(e){
	
	}
}
function tabMouseOut(srcObj)
{
	srcObj.className=oldTab;
	try {
		var func = eval('tabbedMouseOut');
		if(typeof func == 'function')
			func(srcObj);		
	} catch(e){
	
	}
}
function tabClick(srcObj)
{
	oldTab = 'tabbed-selected';
	if(srcObj.className != 'tabbed-selected')
		srcObj.className = 'tabbed-selected';
	if(curTab)
		curTab.className = '';
	curTab = srcObj;
	
	try {
		var func = eval('tabbedClick');
		if(typeof func == 'function')
			func(srcObj);		
	} catch(e){
	
	}
}
function initTabs()
{
	var uls = document.getElementsByTagName('UL');
	for(i=0; i<uls.length; i++)
	{
		if(uls[i].className && uls[i].className == 'tabbed')
		{
			var lis = uls[i].getElementsByTagName('LI');
			for(j=0; j<lis.length; j++)
			{
				if(j == 0) 
				{
					/*curTab = lis[i]
					curTab.className = 'tabbed-selected';*/
					tabClick(lis[j]);
				}
				lis[j].onclick = function() {
					tabClick(this);
				}	
				lis[j].onmouseover = function() {
					tabMouseOver(this);
				}	
				lis[j].onmouseout = function() {
					tabMouseOut(this);
				}	
			}
		}	
	}
}