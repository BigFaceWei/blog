var focusClickColor = "#FCF3CF";
var hiddenParamMap = {};
var oldFocusedMap = {};

if(document.getElementsByTagName("TABLE")){
  tables = document.getElementsByTagName("TABLE");
  for(i=0; i<tables.length; i++){
    if(tables[i].id == ""){
      setAttribute(tables[i],"id","_table_"+i);
    }
  }
}

function focusClick(thisObj, notScroll) {
  tableObj = getParentObjByTagName(thisObj,"TABLE");
  scollToRow(tableObj, thisObj.rowIndex, focusClickColor, notScroll);
  createHiddenParamMap(thisObj);
}

function scollToRow(tableObj, selectedRowNum, backColor, notScroll){
  if(tableObj && tableObj.rows.length-1 >= selectedRowNum){
    if(notScroll) {
    }else{
      if(selectedRowNum>=2){
       rowObj = tableObj.rows[selectedRowNum - 2];
       rowObj.cells[0].scrollIntoView();
      }
    }
    rowObj = tableObj.rows[selectedRowNum];
    if(tableObj.id in oldFocusedMap){
      var rowNumAndBgcolor = oldFocusedMap[tableObj.id];
      var rowNum = rowNumAndBgcolor.substring(0,rowNumAndBgcolor.indexOf("_"));
      var bgcolors = rowNumAndBgcolor.substring(rowNumAndBgcolor.indexOf("_")+1);
      var oldRowObj = tableObj.rows[rowNum];
//      alert(rowNum +"--------"+ bgcolors);
      if(oldRowObj != null){
        for(i=0; i<oldRowObj.cells.length; i++){
          var bgcolorArray = bgcolors.split("@@");
//          alert(bgcolorArray);
          if(bgcolorArray[i] != null){
            oldRowObj.cells[i].style.backgroundColor =""+bgcolorArray[i];
          }
        }
      }
    }
    var oldBgColors = "";
    for(i=0; i<rowObj.cells.length; i++){
      oldBgColors += "@@" + rowObj.cells[i].style.backgroundColor;
      rowObj.cells[i].style.backgroundColor = backColor;
    }
    oldFocusedMap[tableObj.id] = rowObj.rowIndex +"_"+ oldBgColors.substring(2);
  }
}

function createHiddenParamMap(thisObj){
  tableObj = getParentObjByTagName(thisObj,"TABLE");
  hiddenParamMap[tableObj.id] = thisObj.rowIndex;
}

function appenHiddenInForm(formObj){
  for(var tableId in hiddenParamMap){
    var inputRow = document.createElement("input");
    setAttribute(inputRow,"name","_row_");
    setAttribute(inputRow,"id",tableId+"_row");
    inputRow.style.display = "none";
    inputRow.value = hiddenParamMap[tableId];
    formObj.appendChild(inputRow);
    var inputTable = document.createElement("input");
    setAttribute(inputTable,"name","_table_");
    setAttribute(inputTable,"id",tableId+"_table");
    inputTable.value = tableId;
    inputTable.style.display = "none";
    formObj.appendChild(inputTable);
  }
}

function removeFocusedRow(tableObj){
  if(tableObj != null){
    delete hiddenParamMap[tableObj.id];
  }
}

<c:forEach items="${paramValues._table_}" var="table_id" varStatus="status">
var row_num = "${paramValues._row_[status.count-1]}";
if(row_num != ""){
  scollToRow($id("${table_id}"), row_num, focusClickColor);
  hiddenParamMap["${table_id}"] = row_num;
}
</c:forEach>
