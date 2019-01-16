window.moveTo(0,0);
window.resizeTo(screen.availWidth, screen.availHeight);
//maak_code() 得到代码
function maak_code()
{
  var raam = window.open('','vmlcode','height=600,width=600');
  raam.document.open();

  with(raam.document){
  write('<html>\n');
  write('<head>\n<title>VML code</title>\n</head>\n');
  write('<body bgcolor="buttonface">\n');
  write('<center>\n<form>\n');
  write('<textarea style="width: 500px; height: 500px;">\n');

  write('<html>\n<head>\n\n');
  write('<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="v"/>\n');
  write('<style type="text/css">\nv\\:* { behavior: url(#default#VML);}\n</style>\n\n');
  write('</head>\n<body>\n\n');
  write(document.frames[0].document.body.innerHTML.replace(/<br>/gi, '\n'));
  write('\n\n</body>\n</html>\n');

  write('</textarea>\n<br>\n');
  write('<input type="button" value="Select" style="font-family: Verdana, Arial; font-size: 12px; width: 150px; margin-top: 8px;" onclick="document.forms[0].elements[0].select()">\n');
  write('</form>\n</center>\n');
  write('</body>\n');
  write('</html>');
  } 

  raam.document.close();
  raam.focus();
}

//清空
function legen()
{
  document.frames[0].document.body.innerHTML = '';
  document.frames[0].teller = 0;
}

kleurenkiezer = '';

//激活
function activeer_kiescellen()
{
  var cellen = document.getElementsByTagName('td');
  for(var i = 0; i < cellen.length; i++){
    if(cellen[i].className == 'kleur'){
    cellen[i].onclick = kies_kleur;
    }
  }
}

function voorbereiden_kleurkeuze(vul_of_rand)
{
  if(kleurenkiezer != ''){ return;}
  document.getElementById(vul_of_rand + '_cel').style.backgroundColor = '#FFFFFF';
  document.getElementById(vul_of_rand + '_cel').innerHTML = '<span style="color: #FF0033; font-size: 9px;">Choose color</span>';
  kleurenkiezer = vul_of_rand;
}

function kies_kleur()
{
  if(kleurenkiezer == ''){
  var fout = 'You have to select Fill or Stroke.\n\n';
  fout += 'You can do this by clicking on the colored square above the word "Fill" or "Stroke".\n\n';
  fout += 'After that you can select a color. ';
  fout += 'If you do not want to use a fill or stroke color, click on X.\n';
  alert(fout);
  return;
  } 

  var kleur = (this.childNodes.length > 0)? '': this.bgColor;
  var HTML = (this.childNodes.length > 0)? '<span style="color: #FF0033; font-size: 9px;">Transparent</span>': '';
  document.forms[0].elements[kleurenkiezer].value = kleur;
  document.getElementById(kleurenkiezer + '_cel').innerHTML = HTML;
  document.getElementById(kleurenkiezer + '_cel').style.backgroundColor = this.bgColor;
  kleurenkiezer = '';
}
//撒销
function verwijder_vorm_uit_tekenblad()
{
  if(document.frames[0].teller > 0){
  document.frames[0].document.getElementById('nr' + document.frames[0].teller).removeNode(true);
  document.frames[0].document.getElementsByTagName('br')[(document.frames[0].teller - 1)].removeNode(true);
  document.frames[0].teller--;
  }
}

window.onerror = function(){ return true;}

window.onload = activeer_kiescellen;

document.writeln('<xml:namespace ns="urn:schemas-microsoft-com:vml" prefix="v"/>');
document.writeln('<style type="text/css">');
document.writeln('v\\:* { behavior: url(#default#VML);}');
document.writeln('</style>');