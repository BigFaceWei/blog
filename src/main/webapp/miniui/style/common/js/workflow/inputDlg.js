function showInputDlg(action,hidenProperty,memoName){
				var strHiden="";
				for(var key in hidenProperty){
					strHiden=strHiden+"	<input type=\"hidden\" name=\""+key+"\" value=\""+hidenProperty[key]+"\" />";
				}
	
			 	var content="text:"+
							"<form name=\"cancleForm\" method=\"post\" action=\""+action+"\" >"+
							strHiden+
							"	<table class='BottomColor' border=1 cellPadding=0 cellSpacing=0 style='background-color:transparent;margin-left:0px;' width='300' height=\"100%\">	"+
							"		<tr bgcolor=\"#6699CC\">"+
							"			<td>"+
							"				<textarea id=\"cancleMemo\" name=\""+memoName+"\" style=\"height:120px;font-size:12px;width:300px;\"></textarea>"+
							"			</td>"+
							"		</tr>"+
							"		<tr>"+
							"			<td bgcolor=\"#6699CC\" align=\"center\">"+
							"				<button type=\"submit\">确定</button>"+
							"			</td>"+
							"		</tr>"+
							"	</table>"+
							"</form>";
							
			 	dialog("请输入原因",content,"350px","auto","text");
			 }