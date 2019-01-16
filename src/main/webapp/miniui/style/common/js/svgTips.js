var mx=0, my=0;
var positions = new Array();

var count = 0;
function init(sec)
{
	setInterval('lifeShow('+sec+')', 100);
}
function lifeShow(sec)
{
	
	if(count < sec*10)
	{
		var i=0;
		var nodes = svgDocument.getElementsByTagName('rect');
		for(i=0; i<nodes.length; i++)
		{
			var node = nodes.item(i);
			var mouseover = node.getAttribute('onmousemove');
			var mouseout = node.getAttribute('onmouseout');
			if(mouseover && mouseover.indexOf('e_mouseover')>=0 && mouseout && mouseout.indexOf('e_mouseout')>=0)
			{
				var x = node.getAttribute('x');
				var y = node.getAttribute('y');
				var w = node.getAttribute('width');
				var h = node.getAttribute('height');
				
				mx = parseInt(x) + parseInt(w)*0.15;
				my = parseInt(y) + parseInt(h) + 10;
				
				positions[positions.length] = node.getAttribute('id') + ',' + mx + ',' + my;
				e_mouseover(evt, node.getAttribute('id'), mx, my);
			}
		}
		count++;
	}
	else if(count == sec*10)
	{
		var i=0;
		var nodes = svgDocument.getElementsByTagName('rect');
		for(i=0; i<nodes.length; i++)
		{
			var node = nodes.item(i);
			var mouseover = node.getAttribute('onmousemove');
			var mouseout = node.getAttribute('onmouseout');
			if(mouseover && mouseover.indexOf('e_mouseover')>=0 && mouseout && mouseout.indexOf('e_mouseout')>=0)
			{
				e_mouseout(evt, node.getAttribute('id'));
			}
		}
		count++;
	}
}

function e_mouseover(evt, stepId)
{
	var i=0;
	for(i=0; i<positions.length; i++)
	{
		if(positions[i].indexOf(stepId) == 0)
		{
			var arr = positions[i].split(',');
			mx = parseInt(arr[1]);
			my = parseInt(arr[2]);
			break;
		}
	}
	moveTipFrame(evt, stepId);
	traverse(moveText, stepId);
	
	showElement(svgDocument.getElementById("TipWin"+stepId));
	traverse(showElement, stepId);
}

function e_mouseout(evt, stepId)
{ 
	hiddenElement(svgDocument.getElementById("TipWin"+stepId));
	traverse(hiddenElement, stepId);
}
function traverse(callback, stepId)
{
	var arr = [];
	var visited = [];
	
	var tooltip = svgDocument.getElementById("tooltip"+stepId);
	var nodes = tooltip.getChildNodes;
	var i=0, j=-1;
	for(i=0; i<nodes.length; i++)
	{
		var node = nodes.item(i);
		if(node.nodeName != '#text' && node.nodeName != 'rect')
		{
			var ret = callback(nodes.item(i), visited);
			arr[arr.length] = ret;
			j = i;
			visited[visited.length] = node;
		}
	}
	return arr;
}

function getTooltipWinHeight(targetElement)
{
	return targetElement.getAttribute('display')+','+targetElement.getAttribute('height');
}

function getTooltipWinWidth(targetElement)
{
	return targetElement.getAttribute('display')+','+targetElement.getAttribute('width');
}

function moveTipFrame(evt, stepId)
{
	var height = 0,temp=-1, i=0;
	var arr = traverse(getTooltipWinHeight, stepId);
	for(i=0; i<arr.length; i++)
	{
		var s = arr[i].split(',');
		var hh = parseInt(s[1]);
		if(temp ==-1)
			temp = hh;
		else if(hh > temp)
			temp = hh;
		if(s[0] == 'block')
		{
			height += temp;
			temp = -1;
		}	
	}	
	height += temp;

	var targetTipWin = svgDocument.getElementById("TipWin"+stepId);
	targetTipWin.setAttribute("x", mx);
	targetTipWin.setAttribute("y", my);
	targetTipWin.setAttribute("width", calcTooltipWidth(stepId) + 20);
	targetTipWin.setAttribute("height", height + 25);
}


function hiddenElement(targetElement)
{
	var style = targetElement.getAttribute('style');
	style = style.replace("visible", "hidden");
	targetElement.setAttribute("style", style);
}

function showElement(targetElement)
{
	var style = targetElement.getAttribute('style');
	style = style.replace("hidden", "visible");
	targetElement.setAttribute("style", style);
}

function hiddenInfoElement(stepId)
{
	infoElement = svgDocument.getElementById("info_"+stepId);
	var infoStyle = infoElement.getAttribute('style');
	infoStyle = infoStyle.replace("visible", "hidden");
	infoElement.setAttribute("style", infoStyle);
	textElement = svgDocument.getElementById("text_"+stepId);
	var textStyle = textElement.getAttribute('style');
	textStyle = textStyle.replace("visible", "hidden");
	textElement.setAttribute("style", textStyle);
}

function showInfoElement(stepId)
{	
	infoElement = svgDocument.getElementById("info_"+stepId);
	var infoStyle = infoElement.getAttribute('style');
	infoStyle = infoStyle.replace("hidden", "visible");
	infoElement.setAttribute("style", infoStyle);
	textElement = svgDocument.getElementById("text_"+stepId);
	var textStyle = textElement.getAttribute('style');
	textStyle = textStyle.replace("hidden", "visible");
	textElement.setAttribute("style", textStyle);
}	

function moveText(targetElement, periorElements)
{
	var x = mx + 10, y = my + 20;
	if(periorElements.length > 0)
	{
		var display = targetElement.getAttribute('display');
		var last = periorElements[periorElements.length-1];
		if(display == 'block')
		{
			var i,maxHeight=parseInt(last.getAttribute('height'));
			for(i=periorElements.length-1; i>=0; i--)
			{
				if(periorElements[i].getAttribute('display') == 'block')
					break;
				var te = parseInt(periorElements[i].getAttribute('height'));
				if(te > maxHeight)
					maxHeight = te;
			}
			y = parseInt(last.getAttribute('y')) + maxHeight;
		}
		else
		{
			x = parseInt(last.getAttribute('x')) + parseInt(last.getAttribute('width'));
			y = parseInt(last.getAttribute('y'));
		}
		
		if(targetElement.nodeName == 'image')
			y = y - 15;
		if(last.nodeName == 'image')
			y = y + 15;
	}
	targetElement.setAttribute("x", x);
	targetElement.setAttribute("y", y);
}

function calcTooltipWidth(stepId)
{
	var i=0;
	var width = 0;
	var temp = 0;
	var arr = traverse(getTooltipWinWidth, stepId);
	for(i = 0; i<arr.length; i++)	
	{
		var s = arr[i].split(',');
		if(s[0] == 'block')
		{
			if(temp > width)
				width = temp;
			temp = 0;
		}	
		temp = temp + parseInt(s[1]);
	}	
	if(width < temp)
		width = temp;
	return width;
}