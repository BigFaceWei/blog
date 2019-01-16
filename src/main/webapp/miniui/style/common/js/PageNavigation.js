function refresh_pagination(){
	
	if (typeof (parent.pagenavigation)!="undefined"){
		parent.pagenavigation.location.reload();
		return;
	}else if (typeof (parent.parent.pagenavigation)!="undefined"){
		parent.parent.pagenavigation.location.reload();
		return;
	}else if (typeof (parent.parent.parent.pagenavigation)!="undefined"){
		parent.parent.parent.pagenavigation.location.reload();
		return;
	}else if (typeof (parent.parent.parent.parent.pagenavigation)!="undefined"){
		parent.parent.parent.parent.pagenavigation.location.reload();
		return;
	}
//alert("refresh");
}
refresh_pagination();